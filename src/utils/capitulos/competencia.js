const getCompetencias = (competencias_generales, competencias_especificas) => [
  {
    listType: 'none',
    text: '\tCOMPETENCIAS',
    bold: true,
    margin: [0, 10, 0, 10],
  },
  { listType: 'none', text: '3.1   GENERALES', bold: true },
  {
    listType: 'none',
    text: 'La asignatura contribuye en las siguientes competencias específicas del egresado:',
    fontSize: 10,
    margin: [26, 10, 40, 0],
  },
  {
    ul: competencias_generales,
    fontSize: 10,
    margin: [26, 10, 40, 0],
  },
  {
    listType: 'none',
    text: '3.2   ESPECIFICAS',
    bold: true,
    margin: [0, 10, 0, 10],
  },
  {
    listType: 'none',
    text: 'La asignatura contribuye en las siguientes competencias específicas del egresado:',
    fontSize: 10,
    margin: [26, 10, 40, 0],
  },
  {
    ul: competencias_especificas,
    fontSize: 10,
    margin: [26, 10, 40, 0],
  },
];

module.exports = getCompetencias;
