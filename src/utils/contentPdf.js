const path = require('path');

const pdfmake = require('pdfmake');
const fonts = require('./fonts');
const styles = require('./styles');

function crearPdf(silabo) {
  contenido = [
    {
      image: path.join(__dirname, '../public/unmsm.png'),
      width: 90,
      alignment: 'center',
      margin: [0, 30, 0, 0],
    },
    {
      text: [
        'UNIVERSIDAD NACIONAL MAYOR DE SAN MARCOS\n',
        '(Universidad del Perú, DECANA DE AMÉRICA)\n',
        'FACULTAD DE INGENIERIA DE SISTEMAS E INFORMATICA\n',
        'ESCUELA PROFESIONAL DE INGENIERÍA DE SOFTWARE',
      ],
      style: 'header',
      margin: [0, 15, 0, 0],
    },
    {
      text: 'SILABO',
      style: 'header',
      margin: [0, 14, 0, 0],
    },
    {
      text: '“Adaptado en el marco de la emergencia sanitaria por el COVID-19”',
      alignment: 'center',
      fontSize: 10,
      bold: true,
    },
    {
      ol: [
        { listType: 'none', text: '1. \tINFORMACIÓN GENERAL', bold: true },
        {
          ol: [
            {
              listType: 'none',
              columns: [
                {
                  width: 30,
                  text: '1.1',
                },
                {
                  width: 160,
                  text: 'Nombre y código de la asignatura',
                },
                {
                  width: 10,
                  text: ':',
                },
                {
                  width: 200,
                  text: silabo.asig_nombre,
                },
              ],
            },
            {
              listType: 'none',
              columns: [
                {
                  width: 30,
                  text: '1.2',
                },
                {
                  width: 160,
                  text: 'Código de Asignatura',
                },
                {
                  width: 10,
                  text: ':',
                },
                {
                  width: 200,
                  text: '20W0501',
                },
              ],
            },
            {
              listType: 'none',
              columns: [
                {
                  width: 30,
                  text: '1.3',
                },
                {
                  width: 160,
                  text: 'Tipo de Asignatura ',
                },
                {
                  width: 10,
                  text: ':',
                },
                {
                  width: 200,
                  text: 'Obligatoria',
                },
              ],
            },
            {
              listType: 'none',
              columns: [
                {
                  width: 30,
                  text: '1.4',
                },
                {
                  width: 160,
                  text: 'Horas semanales',
                },
                {
                  width: 10,
                  text: ':',
                },
                {
                  width: 200,
                  text: 'Teoría 03 h, Laboratorio 02 h',
                },
              ],
            },
            {
              listType: 'none',
              columns: [
                {
                  width: 30,
                  text: '1.5',
                },
                {
                  width: 160,
                  text: 'Semestre o año académico',
                },
                {
                  width: 10,
                  text: ':',
                },
                {
                  width: 200,
                  text: '2020-2',
                },
              ],
            },
            {
              listType: 'none',
              columns: [
                {
                  width: 30,
                  text: '1.6',
                },
                {
                  width: 160,
                  text: 'Ciclo',
                },
                {
                  width: 10,
                  text: ':',
                },
                {
                  width: 200,
                  text: 'V',
                },
              ],
            },
            {
              listType: 'none',
              columns: [
                {
                  width: 30,
                  text: '1.7',
                },
                {
                  width: 160,
                  text: 'Créditos',
                },
                {
                  width: 10,
                  text: ':',
                },
                {
                  width: 200,
                  text: '04',
                },
              ],
            },
            {
              listType: 'none',
              columns: [
                {
                  width: 30,
                  text: '1.8',
                },
                {
                  width: 160,
                  text: 'Modalidad',
                },
                {
                  width: 10,
                  text: ':',
                },
                {
                  width: 200,
                  text: 'No presencial (virtual)',
                },
              ],
            },
            {
              listType: 'none',
              columns: [
                {
                  width: 30,
                  text: '1.9',
                },
                {
                  width: 160,
                  text: 'Docentes',
                },
                {
                  width: 10,
                  text: ':',
                },
                {
                  width: 200,
                  text: 'Juan Gamarra Moreno (Coordinador)',
                },
              ],
            },
            {
              listType: 'none',
              columns: [
                {
                  width: 30,
                  text: '',
                },
                {
                  width: 160,
                  text: '',
                },
                {
                  width: 10,
                  text: '',
                },
                {
                  width: 200,
                  text: 'Javier Elmer Cabrera Díaz',
                },
              ],
            },
            {
              listType: 'none',
              columns: [
                {
                  width: 30,
                  text: '1.10',
                },
                {
                  width: 160,
                  text: 'Correos institucionales',
                },
                {
                  width: 10,
                  text: ':',
                },
                {
                  width: 200,
                  text: 'juan.gamarra@unmsm.edu.pe',
                },
              ],
            },
            {
              listType: 'none',
              columns: [
                {
                  width: 30,
                  text: '',
                },
                {
                  width: 160,
                  text: '',
                },
                {
                  width: 10,
                  text: '',
                },
                {
                  width: 200,
                  text: 'jcabrerad@unmsm.edu.pe',
                },
              ],
            },
          ],
          fontSize: 10,
          margin: [15, 10, 0, 0],
        },
        { listType: 'none', text: '2. \tSUMILLA', bold: true },
        {
          listType: 'none',
          text: 'Esta asignatura de formación profesional especializada, cuya naturaleza es teórica – práctica, se orienta al diseño de base de datos como componente principal de los sistemas de información modernos. Tiene el propósito de promover el uso adecuado de métodos y técnicas para el modelamiento y diseño de base de datos. Los temas centrales son: Introducción a los sistemas de Base de Datos. Modelo Entidad Relación. Modelo Relacional. Introducción a SQL.',
          fontSize: 10,
          margin: [26, 10, 40, 0],
        },
      ],
      margin: [30, 15, 0, 0],
    },
  ];
  return contenido;
}

function generatePdf(silabo, callback) {
  try {
    let docDefinition = {
      content: crearPdf(silabo),
      styles: styles,
    };
    const printer = new pdfmake(fonts);
    const doc = printer.createPdfKitDocument(docDefinition);

    let chunks = [];

    doc.on('data', chunk => {
      chunks.push(chunk);
    });

    doc.on('end', () => {
      const result = Buffer.concat(chunks);
      callback(result);
    });

    doc.end();
  } catch (err) {
    throw err;
  }
}

module.exports = generatePdf;
