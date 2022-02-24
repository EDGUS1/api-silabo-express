const filaReferencia = (autores, libro, editorial, ciudad, anio, paginas) => ({
  text: `${autores}. ${libro}. ${editorial}. ${ciudad} ${anio}. ${paginas}p.`,
  margin: [0, 5],
});

const getReferencias = referencias => [
  {
    listType: 'none',
    text: '\tREFERENCIAS BIBLIOGRAFICAS:',
    bold: true,
    margin: [0, 20, 0, 10],
  },
  {
    ul: referencias.map(r =>
      filaReferencia(
        r.nombre,
        r.libro_nombre,
        r.editorial_nombre,
        'Madrid',
        r.libro_fecha,
        1440
      )
    ),
    fontSize: 10,
    margin: [26, 10, 40, 0],
  },
];

module.exports = getReferencias;
