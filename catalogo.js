'use strict';

const productos = [
  { id: 1, nombre: 'Sansevieria', categoria: 'interior', precio: 8.5, texto: 'Resiste poca luz y poco riego.' },
  { id: 2, nombre: 'Pothos', categoria: 'interior', precio: 6, texto: 'Planta colgante de crecimiento rápido.' },
  { id: 3, nombre: 'Costilla de Adán', categoria: 'interior', precio: 14, texto: 'Hojas grandes para salas luminosas.' },
  { id: 4, nombre: 'Buganvilia', categoria: 'exterior', precio: 12, texto: 'Floración abundante a pleno sol.' },
  { id: 5, nombre: 'Lavanda', categoria: 'exterior', precio: 7.5, texto: 'Aromática, ideal para macetas al aire libre.' },
  { id: 6, nombre: 'Palma areca', categoria: 'exterior', precio: 18, texto: 'Aporta sombra y aspecto tropical.' },
  { id: 7, nombre: 'Maceta de barro 20 cm', categoria: 'macetas', precio: 4.5, texto: 'Con plato y orificio de drenaje.' },
  { id: 8, nombre: 'Maceta colgante', categoria: 'macetas', precio: 6.25, texto: 'Incluye cadena de sujeción.' }
];

const nombresCategoria = { interior: 'Interior', exterior: 'Exterior', macetas: 'Macetas' };

const $buscar = document.getElementById('buscar');
const $categoria = document.getElementById('categoria');
const $grid = document.getElementById('productos');
const $estado = document.getElementById('estado');
const $lista = document.getElementById('lista');
const $vacia = document.getElementById('lista-vacia');
const $vaciar = document.getElementById('vaciar');

let seleccion = Lista.obtener();

function crearTarjeta(p) {
  const enLista = seleccion.includes(p.id);
  const li = document.createElement('li');
  li.className = 'tarjeta';

  const img = document.createElement('div');
  img.className = 'tarjeta-img cat-' + p.categoria;
  img.setAttribute('aria-hidden', 'true');
  img.textContent = p.nombre.charAt(0);

  const cuerpo = document.createElement('div');
  cuerpo.className = 'tarjeta-cuerpo';

  const titulo = document.createElement('h3');
  titulo.textContent = p.nombre;
  const cat = document.createElement('p');
  cat.textContent = nombresCategoria[p.categoria];
  const desc = document.createElement('p');
  desc.textContent = p.texto;
  const precio = document.createElement('p');
  precio.className = 'precio';
  precio.textContent = '$' + p.precio.toFixed(2);

  const boton = document.createElement('button');
  boton.type = 'button';
  boton.className = 'boton' + (enLista ? ' boton-sec' : '');
  boton.dataset.id = p.id;
  boton.textContent = enLista ? 'Quitar de mi lista' : 'Agregar a mi lista';
  boton.setAttribute('aria-label', boton.textContent + ': ' + p.nombre);

  cuerpo.append(titulo, cat, desc, precio, boton);
  li.append(img, cuerpo);
  return li;
}

function mostrarProductos() {
  const texto = $buscar.value.trim().toLowerCase();
  const cat = $categoria.value;
  const filtrados = productos.filter(function (p) {
    return (cat === 'todas' || p.categoria === cat) && p.nombre.toLowerCase().includes(texto);
  });
  $grid.replaceChildren(...filtrados.map(crearTarjeta));
  $estado.textContent = filtrados.length === 0
    ? 'No hay productos con esos criterios. Prueba con otra búsqueda.'
    : 'Mostrando ' + filtrados.length + ' de ' + productos.length + ' productos.';
}

function mostrarLista() {
  const elegidos = productos.filter(function (p) { return seleccion.includes(p.id); });
  $lista.replaceChildren(...elegidos.map(function (p) {
    const li = document.createElement('li');
    li.append(p.nombre + ' ($' + p.precio.toFixed(2) + ')');
    const q = document.createElement('button');
    q.type = 'button';
    q.className = 'quitar';
    q.dataset.id = p.id;
    q.textContent = 'Quitar';
    q.setAttribute('aria-label', 'Quitar ' + p.nombre + ' de mi lista');
    li.append(q);
    return li;
  }));
  $vacia.hidden = elegidos.length > 0;
  $vaciar.hidden = elegidos.length === 0;
}

function alternar(id) {
  seleccion = seleccion.includes(id) ? seleccion.filter(function (x) { return x !== id; }) : seleccion.concat(id);
  Lista.guardar(seleccion);
  const foco = document.activeElement.dataset.id;
  mostrarProductos();
  mostrarLista();
  const nuevo = $grid.querySelector('button[data-id="' + foco + '"]');
  if (nuevo) nuevo.focus();
}

$buscar.addEventListener('input', mostrarProductos);
$categoria.addEventListener('change', mostrarProductos);
$grid.addEventListener('click', function (e) {
  const b = e.target.closest('button[data-id]');
  if (b) alternar(Number(b.dataset.id));
});
$lista.addEventListener('click', function (e) {
  const b = e.target.closest('button[data-id]');
  if (b) alternar(Number(b.dataset.id));
});
$vaciar.addEventListener('click', function () {
  seleccion = [];
  Lista.guardar(seleccion);
  mostrarProductos();
  mostrarLista();
  $buscar.focus();
});

mostrarProductos();
mostrarLista();
