const filaReferencia = (autores, libro, editorial, ciudad, anio, paginas) => ({
  text: `${autores}. ${libro}. ${editorial}. ${ciudad} ${anio}. ${paginas}p.`,
  margin: [0, 5],
});

const getReferencias = () => [
  {
    listType: 'none',
    text: '\tREFERENCIAS BIBLIOGRAFICAS:',
    bold: true,
    margin: [0, 20, 0, 10],
  },
  {
    ul: [
      filaReferencia(
        'Thomas M. Connolly, Carolyn E. Begg',
        'Database Systems: A Practical Approach to Design, Implementation, and Management, Global Edition, 6/E',
        'Pearson',
        'Madrid',
        2014,
        1440
      ),
      filaReferencia(
        'Thomas M. Connolly, Carolyn E. Begg',
        'Database Systems: A Practical Approach to Design, Implementation, and Management, Global Edition, 6/E',
        'Pearson',
        'Madrid',
        2014,
        1440
      ),
      filaReferencia(
        'Thomas M. Connolly, Carolyn E. Begg',
        'Database Systems: A Practical Approach to Design, Implementation, and Management, Global Edition, 6/E',
        'Pearson',
        'Madrid',
        2014,
        1440
      ),
      filaReferencia(
        'Thomas M. Connolly, Carolyn E. Begg',
        'Database Systems: A Practical Approach to Design, Implementation, and Management, Global Edition, 6/E',
        'Pearson',
        'Madrid',
        2014,
        1440
      ),
    ],
    fontSize: 10,
    margin: [26, 10, 40, 0],
  },
];

module.exports = getReferencias;
