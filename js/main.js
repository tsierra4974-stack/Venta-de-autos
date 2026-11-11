'use strict';

// Menú para celular: abre y cierra la lista de enlaces
const botonMenu = document.querySelector('.menu-boton');
const menu = document.getElementById('menu');

botonMenu.addEventListener('click', function () {
  const abierto = menu.classList.toggle('abierto');
  botonMenu.setAttribute('aria-expanded', String(abierto));
});

// Favoritos: se guardan en el navegador (localStorage) para usarlos en varias páginas
const Favoritos = {
  clave: 'autocatalogo_favoritos',
  obtener: function () {
    try {
      return JSON.parse(localStorage.getItem(this.clave)) || [];
    } catch (e) {
      return [];
    }
  },
  guardar: function (lista) {
    try {
      localStorage.setItem(this.clave, JSON.stringify(lista));
    } catch (e) {
      // si el navegador no deja guardar, no hacemos nada
    }
  }
};
