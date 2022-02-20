const getEvaluacionAprendizaje = () => [
  {
    listType: 'none',
    text: '\tEVALUACION DEL APRENDIZAJE',
    bold: true,
    margin: [0, 20, 0, 10],
  },
  {
    listType: 'none',
    table: {
      heights: [30, '*', '*', '*', '*'],
      body: [
        [
          {
            text: 'Evaluación Académica',
            alignment: 'center',
            margin: [0, 10],
          },
          {
            text: 'Peso',
            alignment: 'center',
            margin: [0, 10],
          },
        ],
        ['Prueba de Entrada ', 'Sin nota'],
        ['Examen Parcial (EXP)', '20%'],
        ['Evaluación de proceso o Continua (EVP)', '60%'],
        ['Examen Final (EXF) ', '20%'],
      ],
    },
    fontSize: 10,
    margin: [100, 0],
  },
];

module.exports = getEvaluacionAprendizaje;
