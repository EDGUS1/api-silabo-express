const path = require('path');

const pdfmake = require('pdfmake');
const fonts = require('./../utils/fonts');
const styles = require('./../utils/styles');
const controller = {};

controller.all = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(
      'select asg.asig_id, asg_id.nombre, asg.asig_ciclo, asp.periodo_academico, asg.asig_sumilla, asu.updated_at from asignatura_usuario asu left join asignatura asg on asu.asignatura_id = asg.asig_id left join asignatura_periodo asp on asg.asig_id = asp.asig_id',
      (err, response) => {
        if (err) res.json(err);
        res.json(response);
      }
    );
  });
};

controller.allbyid = (req, res) => {
  const { id } = req.params;

  req.getConnection((err, conn) => {
    conn.query(
      'select asg.asig_id, asg_id.nombre, asg.asig_ciclo, asp.periodo_academico, asg.asig_sumilla, asu.updated_at from asignatura_usuario asu left join asignatura asg on asu.asignatura_id asg.asig_id left join asignatura_periodo asp on asg.asig_id = asp.asig_id where asu.usuario_id = ?',
      [id],
      (err, response) => {
        if (err) res.json(err);
        res.json(response);
      }
    );
  });
};

/* controller.save = (req, res) => {
  console.log(req.body);
  const codigo, ciclo, sumilla, creditos;
  req.getConnection((err, conn) => {
    conn.query(
      'insert into asignatura (asig_codigo, asig_nombre, horas_sem_id, asig_ciclo, asig_sumilla, asig_creditos,asig_estrategia_didactica, tipo_asignatura_id, plan_id) values (?, ?)',
      [codigo, nombre, 1, ciclo, sumilla, creditos, 1, 1, 1],
      (err, response) => {
        if (err) res.json(err);
        res.json(response);
      }
    );
    res.send('ok');
  });
}; */

function crearPdf(nombre_curso) {
  contenido = [
    {
      image: path.join(__dirname, '../public/') + 'unmsm.png',
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
                  text: nombre_curso,
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

function generatePdf(docDefinition, callback) {
  try {
    /* const fontDescriptors = { ... }; */
    const printer = new pdfmake(fonts);
    /* const printer = new pdfMakePrinter(fonts); */
    const doc = printer.createPdfKitDocument(docDefinition);

    let chunks = [];

    doc.on('data', chunk => {
      chunks.push(chunk);
    });

    doc.on('end', () => {
      const result = Buffer.concat(chunks);
      callback(result);
      /* const result = Buffer.concat(chunks);
      callback('data:application/pdf;base64,' + result.toString('base64')); */
    });

    doc.end();
  } catch (err) {
    throw err;
  }
}

controller.pdf = (req, res) => {
  let docDefinition = {
    content: crearPdf('BASE DE DATOS I'),
    styles: styles,
  };
  generatePdf(docDefinition, response => {
    /* console.log(response); */

    res.setHeader('Content-Type', 'application/pdf');
    res.send(response);
  });
};
module.exports = controller;
