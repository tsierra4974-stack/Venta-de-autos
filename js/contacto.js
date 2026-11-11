'use strict';

// Reglas de validación de cada campo
const reglas = {
  nombre: {
    valido: function (v) { return /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' ]{3,}$/.test(v.trim()); },
    mensaje: 'Escribe tu nombre completo: solo letras y mínimo 3 caracteres.'
  },
  correo: {
    valido: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); },
    mensaje: 'Escribe un correo válido, por ejemplo nombre@dominio.com.'
  },
  telefono: {
    valido: function (v) { return /^09\d{8}$/.test(v.trim()); },
    mensaje: 'Escribe un celular de 10 dígitos que empiece con 09.'
  },
  asunto: {
    valido: function (v) { return v !== ''; },
    mensaje: 'Elige un asunto de la lista.'
  },
  mensaje: {
    valido: function (v) { return v.trim().length >= 20; },
    mensaje: 'El mensaje debe tener al menos 20 caracteres.'
  },
  acepta: {
    valido: function (v, campo) { return campo.checked; },
    mensaje: 'Debes aceptar el uso de tus datos para poder enviar.'
  }
};

const formulario = document.getElementById('formulario');
const resumen = document.getElementById('resumen');
const exito = document.getElementById('exito');

// Valida un campo y muestra o quita su mensaje de error
function validarCampo(id) {
  const campo = document.getElementById(id);
  const error = document.getElementById('error-' + id);
  const esValido = reglas[id].valido(campo.value, campo);

  campo.setAttribute('aria-invalid', String(!esValido));
  error.textContent = esValido ? '' : reglas[id].mensaje;
  return esValido;
}

// Validamos cuando el usuario sale del campo y mientras corrige un error
Object.keys(reglas).forEach(function (id) {
  const campo = document.getElementById(id);
  campo.addEventListener('blur', function () { validarCampo(id); });
  campo.addEventListener('input', function () {
    if (campo.getAttribute('aria-invalid') === 'true') validarCampo(id);
  });
});

// Al enviar el formulario
formulario.addEventListener('submit', function (e) {
  e.preventDefault();
  exito.hidden = true;

  const conError = Object.keys(reglas).filter(function (id) {
    return !validarCampo(id);
  });

  if (conError.length > 0) {
    resumen.textContent = 'Hay ' + conError.length + ' campo(s) por corregir. Revisa los mensajes en rojo.';
    resumen.hidden = false;
    document.getElementById(conError[0]).focus();
    return;
  }

  resumen.hidden = true;
  const nombre = document.getElementById('nombre').value.trim();
  exito.textContent = 'Gracias, ' + nombre + '. Recibimos tu consulta y te responderemos pronto.';
  exito.hidden = false;
  formulario.reset();
  Object.keys(reglas).forEach(function (id) {
    document.getElementById(id).removeAttribute('aria-invalid');
  });
  exito.focus();
});

// Muestra los autos que se marcaron como favoritos en el catálogo
const elegidos = autos.filter(function (auto) {
  return Favoritos.obtener().includes(auto.id);
});
if (elegidos.length > 0) {
  document.getElementById('interes').textContent = elegidos.map(function (auto) {
    return auto.marca + ' ' + auto.modelo;
  }).join(', ');
}
