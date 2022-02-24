const path = require('path');

const pdfmake = require('pdfmake');
const fonts = require('./style/fonts');
const styles = require('./style/styles');

const getInformacionGeneral = require('./capitulos/informacionGeneral');
const getSumilla = require('./capitulos/sumilla');
const getCompetencias = require('./capitulos/competencia');
const getCapacidades = require('./capitulos/capacidades');
const getProgramacion = require('./capitulos/programacion');
const getEstrategiaDidactica = require('./capitulos/estrategias');
const getEvaluacionAprendizaje = require('./capitulos/evaluacion');
const getReferencias = require('./capitulos/referencias');

function crearPdf({
  silabo,
  nombres,
  correos,
  capacidades,
  compe_general,
  compe_espec,
  referencias,
}) {
  return [
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
        getInformacionGeneral({
          nombre_curso: silabo.asig_nombre,
          codigo_curso: silabo.asig_codigo,
          tipo: silabo.tipo_asignatura_nombre,
          teoria: silabo.teoria,
          laboratorio: silabo.laboratorio,
          semestre: silabo.periodo_academico,
          ciclo: silabo.asig_ciclo,
          creditos: silabo.asig_creditos,
          modalidad: silabo.asig_periodo_modalidad,
          profesores: nombres,
          correos: correos,
        }),
        getSumilla(silabo.asig_sumilla),
        getCompetencias(compe_general, compe_espec),
        getCapacidades(capacidades),
        getProgramacion(),
        getEstrategiaDidactica(silabo.asig_estrategia_didactica),
        getEvaluacionAprendizaje(),
        getReferencias(referencias),
      ],
      margin: [30, 15, 0, 0],
    },
  ];
}

function generatePdf(
  { silabo, docentes, capacidades, cgenerales, cespecificos, referencias },
  callback
) {
  const nombres = docentes.map(
    d =>
      d.docente_nombre +
      ' ' +
      d.docente_apellido_paterno +
      ' ' +
      d.docente_apellido_materno
  );

  const correos = docentes.map(d => d.docente_correo);
  const listaCapacidades = capacidades.map(
    c => c.capacidad_codigo + ': ' + c.capacidad_nombre
  );

  const compe_general = cgenerales.map(
    c => c.comp_gnral_codigo + '. ' + c.comp_gnral_nombre
  );
  const compe_espec = cespecificos.map(
    c => c.comp_esp_codigo + '. ' + c.comp_esp_nombre
  );
  try {
    let docDefinition = {
      content: crearPdf({
        silabo,
        nombres,
        correos,
        capacidades: listaCapacidades,
        compe_general,
        compe_espec,
        referencias,
      }),
      styles: styles,
      pageMargins: [40, 60, 10, 100],
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
