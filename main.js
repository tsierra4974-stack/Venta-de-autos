'use strict';

/* Menú desplegable en móvil */
(function () {
  const boton = document.querySelector('.menu-boton');
  const menu = document.getElementById('menu');
  if (!boton || !menu) return;
  boton.addEventListener('click', function () {
    const abierto = menu.classList.toggle('abierto');
    boton.setAttribute('aria-expanded', String(abierto));
  });
})();

/* Lista de interés compartida entre páginas (localStorage con respaldo) */
const Lista = {
  clave: 'raiz_lista',
  obtener() {
    try { return JSON.parse(localStorage.getItem(this.clave)) || []; }
    catch (e) { return []; }
  },
  guardar(lista) {
    try { localStorage.setItem(this.clave, JSON.stringify(lista)); }
    catch (e) { /* almacenamiento no disponible: se ignora */ }
  }
};
