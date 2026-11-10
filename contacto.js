'use strict';

const reglas = {
  nombre: { ok: function (v) { return /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' ]{3,}$/.test(v.trim()); },
            msg: 'Escribe tu nombre completo: solo letras y mínimo 3 caracteres.' },
  correo: { ok: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); },
            msg: 'Escribe un correo válido, por ejemplo nombre@dominio.com.' },
  telefono: { ok: function (v) { return /^09\d{8}$/.test(v.trim()); },
              msg: 'Escribe un celular de 10 dígitos que empiece con 09.' },
  asunto: { ok: function (v) { return v !== ''; },
            msg: 'Elige un asunto de la lista.' },
  mensaje: { ok: function (v) { return v.trim().length >= 20; },
             msg: 'El mensaje debe tener al menos 20 caracteres.' },
  acepta: { ok: function (v, campo) { return campo.checked; },
            msg: 'Debes aceptar el uso de tus datos para poder enviar.' }
};

const form = document.getElementById('formulario');
const resumen = document.getElementById('resumen');
const exito = document.getElementById('exito');

function validarCampo(id) {
  const campo = document.getElementById(id);
  const error = document.getElementById('error-' + id);
  const valido = reglas[id].ok(campo.value, campo);
  campo.setAttribute('aria-invalid', String(!valido));
  error.textContent = valido ? '' : reglas[id].msg;
  return valido;
}

Object.keys(reglas).forEach(function (id) {
  const campo = document.getElementById(id);
  campo.addEventListener('blur', function () { validarCampo(id); });
  campo.addEventListener('input', function () {
    if (campo.getAttribute('aria-invalid') === 'true') validarCampo(id);
  });
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  exito.hidden = true;
  const invalidos = Object.keys(reglas).filter(function (id) { return !validarCampo(id); });
  if (invalidos.length > 0) {
    resumen.textContent = 'Hay ' + invalidos.length + ' campo(s) por corregir. Revisa los mensajes en rojo.';
    resumen.hidden = false;
    document.getElementById(invalidos[0]).focus();
    return;
  }
  resumen.hidden = true;
  const nombre = document.getElementById('nombre').value.trim();
  exito.textContent = 'Gracias, ' + nombre + '. Recibimos tu consulta y te responderemos pronto.';
  exito.hidden = false;
  form.reset();
  Object.keys(reglas).forEach(function (id) {
    document.getElementById(id).removeAttribute('aria-invalid');
  });
  exito.focus();
});

/* Muestra los productos que el usuario eligió en el catálogo */
(function () {
  const nombres = { 1: 'Sansevieria', 2: 'Pothos', 3: 'Costilla de Adán', 4: 'Buganvilia', 5: 'Lavanda', 6: 'Palma areca', 7: 'Maceta de barro 20 cm', 8: 'Maceta colgante' };
  const elegidos = Lista.obtener().map(function (id) { return nombres[id]; }).filter(Boolean);
  if (elegidos.length > 0) document.getElementById('interes').textContent = elegidos.join(', ');
})();
