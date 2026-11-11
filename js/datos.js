'use strict';

// Lista de autos del catálogo (datos de ejemplo, referenciales)
const autos = [
  { id: 1, marca: 'Toyota', modelo: 'Corolla', tipo: 'Sedán', combustible: 'Gasolina', origen: 'Japón',
    texto: 'Sedán compacto muy popular por su economía y su fiabilidad.' },
  { id: 2, marca: 'Toyota', modelo: 'Hilux', tipo: 'Camioneta', combustible: 'Diésel', origen: 'Japón',
    texto: 'Camioneta de trabajo conocida por su resistencia.' },
  { id: 3, marca: 'Toyota', modelo: 'Prius', tipo: 'Hatchback', combustible: 'Híbrido', origen: 'Japón',
    texto: 'Uno de los primeros híbridos masivos, pensado para gastar poco combustible.' },
  { id: 4, marca: 'Chevrolet', modelo: 'Spark', tipo: 'Hatchback', combustible: 'Gasolina', origen: 'Estados Unidos',
    texto: 'Auto pequeño, fácil de manejar y estacionar en la ciudad.' },
  { id: 5, marca: 'Kia', modelo: 'Sportage', tipo: 'SUV', combustible: 'Gasolina', origen: 'Corea del Sur',
    texto: 'SUV familiar con buen espacio interior.' },
  { id: 6, marca: 'Hyundai', modelo: 'Tucson', tipo: 'SUV', combustible: 'Gasolina', origen: 'Corea del Sur',
    texto: 'SUV compacto de diseño moderno.' },
  { id: 7, marca: 'Mazda', modelo: 'CX-5', tipo: 'SUV', combustible: 'Gasolina', origen: 'Japón',
    texto: 'SUV compacto conocido por su buen manejo.' },
  { id: 8, marca: 'Ford', modelo: 'F-150', tipo: 'Camioneta', combustible: 'Gasolina', origen: 'Estados Unidos',
    texto: 'Camioneta grande, durante muchos años una de las más vendidas en su país.' },
  { id: 9, marca: 'Volkswagen', modelo: 'Golf', tipo: 'Hatchback', combustible: 'Gasolina', origen: 'Alemania',
    texto: 'Hatchback compacto europeo, referente de su categoría.' },
  { id: 10, marca: 'Tesla', modelo: 'Model 3', tipo: 'Sedán', combustible: 'Eléctrico', origen: 'Estados Unidos',
    texto: 'Sedán 100 % eléctrico, sin motor de gasolina.' },
  { id: 11, marca: 'Jeep', modelo: 'Wrangler', tipo: 'SUV', combustible: 'Gasolina', origen: 'Estados Unidos',
    texto: 'Todoterreno preparado para caminos difíciles.' },
  { id: 12, marca: 'Porsche', modelo: '911', tipo: 'Deportivo', combustible: 'Gasolina', origen: 'Alemania',
    texto: 'Deportivo clásico de Porsche con el motor en la parte trasera.' }
];
