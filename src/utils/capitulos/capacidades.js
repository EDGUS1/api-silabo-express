const getCapacidades = capacidades => [
  {
    listType: 'none',
    text: '\tCAPACIDADES',
    bold: true,
    margin: [0, 10, 0, 10],
  },
  {
    ul: capacidades,
    fontSize: 10,
    margin: [26, 10, 40, 0],
  },
];

module.exports = getCapacidades;
