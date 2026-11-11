'use strict';

// Elementos de la página
const buscar = document.getElementById('buscar');
const filtroTipo = document.getElementById('tipo');
const filtroCombustible = document.getElementById('combustible');
const contenedorAutos = document.getElementById('autos');
const estado = document.getElementById('estado');
const listaFav = document.getElementById('favoritos');
const favVacio = document.getElementById('fav-vacio');
const botonVaciar = document.getElementById('vaciar');

// ids de los autos favoritos (se leen de localStorage)
let favoritos = Favoritos.obtener();

// Crea la tarjeta de un auto con createElement
function crearTarjeta(auto) {
  const esFavorito = favoritos.includes(auto.id);

  const li = document.createElement('li');
  li.className = 'tarjeta';

  const marca = document.createElement('div');
  marca.className = 'tarjeta-marca t-' + auto.tipo;
  marca.setAttribute('aria-hidden', 'true');
  marca.textContent = auto.marca;

  const cuerpo = document.createElement('div');
  cuerpo.className = 'tarjeta-cuerpo';

  const titulo = document.createElement('h3');
  titulo.textContent = auto.marca + ' ' + auto.modelo;

  const descripcion = document.createElement('p');
  descripcion.textContent = auto.texto;
  const tipo = document.createElement('p');
  tipo.textContent = 'Tipo: ' + auto.tipo;
  const comb = document.createElement('p');
  comb.textContent = 'Combustible: ' + auto.combustible;
  const origen = document.createElement('p');
  origen.textContent = 'País de la marca: ' + auto.origen;

  const boton = document.createElement('button');
  boton.type = 'button';
  boton.className = esFavorito ? 'boton boton-sec' : 'boton';
  boton.dataset.id = auto.id;
  boton.textContent = esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos';
  boton.setAttribute('aria-label', boton.textContent + ': ' + auto.marca + ' ' + auto.modelo);

  cuerpo.append(titulo, descripcion, tipo, comb, origen, boton);
  li.append(marca, cuerpo);
  return li;
}

// Filtra los autos según lo que escribió o eligió el usuario
function mostrarAutos() {
  const texto = buscar.value.trim().toLowerCase();
  const tipo = filtroTipo.value;
  const combustible = filtroCombustible.value;

  const resultado = autos.filter(function (auto) {
    const nombre = (auto.marca + ' ' + auto.modelo).toLowerCase();
    const coincideNombre = nombre.includes(texto);
    const coincideTipo = tipo === 'todos' || auto.tipo === tipo;
    const coincideComb = combustible === 'todos' || auto.combustible === combustible;
    return coincideNombre && coincideTipo && coincideComb;
  });

  contenedorAutos.replaceChildren(...resultado.map(crearTarjeta));

  if (resultado.length === 0) {
    estado.textContent = 'No se encontraron autos con esos filtros.';
  } else {
    estado.textContent = 'Mostrando ' + resultado.length + ' de ' + autos.length + ' autos.';
  }
}

// Dibuja la lista de favoritos
function mostrarFavoritos() {
  const elegidos = autos.filter(function (auto) {
    return favoritos.includes(auto.id);
  });

  listaFav.replaceChildren(...elegidos.map(function (auto) {
    const li = document.createElement('li');
    li.append(auto.marca + ' ' + auto.modelo + ' ');
    const quitar = document.createElement('button');
    quitar.type = 'button';
    quitar.className = 'quitar';
    quitar.dataset.id = auto.id;
    quitar.textContent = 'Quitar';
    quitar.setAttribute('aria-label', 'Quitar ' + auto.marca + ' ' + auto.modelo + ' de favoritos');
    li.append(quitar);
    return li;
  }));

  favVacio.hidden = elegidos.length > 0;
  botonVaciar.hidden = elegidos.length === 0;
}

// Agrega o quita un auto de favoritos
function cambiarFavorito(id) {
  if (favoritos.includes(id)) {
    favoritos = favoritos.filter(function (x) { return x !== id; });
  } else {
    favoritos.push(id);
  }
  Favoritos.guardar(favoritos);
  mostrarAutos();
  mostrarFavoritos();
}

// Eventos
buscar.addEventListener('input', mostrarAutos);
filtroTipo.addEventListener('change', mostrarAutos);
filtroCombustible.addEventListener('change', mostrarAutos);

// Un solo "click" en el contenedor sirve para todos los botones (delegación de eventos)
contenedorAutos.addEventListener('click', function (e) {
  const boton = e.target.closest('button[data-id]');
  if (boton) {
    const id = Number(boton.dataset.id);
    cambiarFavorito(id);
    // devolvemos el foco al botón para quien usa teclado
    const nuevo = contenedorAutos.querySelector('button[data-id="' + id + '"]');
    if (nuevo) nuevo.focus();
  }
});

listaFav.addEventListener('click', function (e) {
  const boton = e.target.closest('button[data-id]');
  if (boton) cambiarFavorito(Number(boton.dataset.id));
});

botonVaciar.addEventListener('click', function () {
  favoritos = [];
  Favoritos.guardar(favoritos);
  mostrarAutos();
  mostrarFavoritos();
  buscar.focus();
});

// Al cargar la página
mostrarAutos();
mostrarFavoritos();
