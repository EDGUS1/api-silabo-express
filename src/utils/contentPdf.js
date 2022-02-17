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

function crearPdf(silabo) {
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
          nombre_curso: 'silabo.nombre',
          codigo_curso: '20W0501',
          tipo: 'Obligatorio',
          teoria: 2,
          laboratorio: 3,
          semestre: '2021-2',
          ciclo: 'V',
          creditos: 4,
          modalidad: 'Virtual',
          profesores: ['profe 1', 'profe 2'],
          correos: ['profe 1', 'profe 2'],
        }),
        getSumilla(
          'Esta asignatura de formación profesional especializada, cuya naturaleza es teórica – práctica, se orienta al diseño de base de datos como componente principal de los sistemas de información modernos. Tiene el propósito de promover el uso adecuado de métodos y técnicas para el modelamiento y diseño de base de datos. Los temas centrales son: Introducción a los sistemas de Base de Datos. Modelo Entidad Relación. Modelo Relacional. Introducción a SQL.'
        ),
        getCompetencias(
          [
            'CG1. Gestiona la información y la difusión de conocimientos con adecuada comunicación oral y escrita de la propia profesión, ejerciendo el derecho de libertad de pensamiento con responsabilidad.',
            'CG2. Capacidad de análisis y síntesis en la toma de decisiones con responsabilidad, sentido crítico y autocrítico.',
            'CG3. Desempeña su profesión con liderazgo, adecuándose a los cambios y a las nuevas tendencias, comprometido con la paz, medio ambiente, equidad de género, defensa de los derechos humanos y valores democráticos',
            'CG4. Trabaja en equipo con una perspectiva transdisciplinar para comprender y transformar la realidad compleja',
            'CG5. Genera nuevos conocimientos que aportan al desarrollo de la sociedad mediante la investigación, con sentido ético',
            'CG6. Aplica conocimientos a la práctica para resolver problemas con compromiso ético',
          ],
          [
            'CE1. Desarrollo ético',
            'CE2. Capacidad de Análisis',
            'CE3. Pensamiento Crítico',
            'CE4. Comunicación oral y escrita',
            'CE9. Desarrolla y mantiene soluciones de software con actitud innovadora',
            'CE10. Aplica metodologías, métodos, técnicas y herramientas de ingeniería de software',
          ]
        ),
        getCapacidades([
          'CEC01: Discrimina conceptos importantes en el desarrollo de una Base de Datos y las usa de manera adecuada',
          'CEC02: Diferencia e identifica adecuadamente los componentes de un SGBD',
          'CEC03: Aplica conceptos, principios y técnicas para el modelado de base de datos relacional',
          'CEC04: Construye esquemas relacionales, mediante la definición lógica de tablas relacionales.',
          'CEC05: Comprende la importancia de este conocimiento para el éxito en el diseño de base de datos.',
          'CEC06: Elabora diseños de bases de datos usando herramientas CASE.',
          'CEC07: Optimiza Base de datos mediante la aplicación de la normalización',
          'CEC08: Construye modelos relacionales de BD, a partir de un caso práctico',
          'CEC09: Aplica el álgebra relacional para representación formal de operaciones sobre los datos',
          'CEC010: Aplica conocimientos del SQL para crear Bases de Datos',
          'CEC011: Construye sentencias de manipulación de datos',
          'CEC012: Define procedimientos almacenados y triggers,',
        ]),
        getProgramacion(),
        getEstrategiaDidactica(
          'Se desarrollará la asignatura siguiendo los criterios deductivos, inductivos, con la participación activa de los estudiantes. En este sentido, se utilizarán técnicas de exposición participativa, trabajo grupal y desarrollo de laboratorios. Así mismo se utilizará el Aula virtual como soporte para compartir información teórica, practica y de apoyo, se fomentará la investigación y recopilación de información por parte de los estudiantes mediante encargo de trabajos de investigación y tareas. El desarrollo de los casos prácticos y ejercicios permitirán que el alumno construya modelos y vea de modo práctico la utilidad de las metodologías aprendidas para finalmente aplicarlas en un proyecto final grupal'
        ),
        getEvaluacionAprendizaje(),
        getReferencias(),
      ],
      margin: [30, 15, 0, 0],
    },
  ];
}

function generatePdf(silabo, callback) {
  try {
    let docDefinition = {
      content: crearPdf(silabo),
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
