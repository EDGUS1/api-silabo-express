const programacionUnidad = () => {
  return `
      [
        {
          "text": "UNIDAD I: MODELO ENTIDAD RELACIÓN Y NORMALIZACIÓN",
          "style": "tableHeader",
          "colSpan": 5,
          "fontSize": 9
        },
        {},
        {},
        {},
        {}
      ],
      [
        {
          "text": "Capacidades",
          "style": "tableHeader",
          "alignment": "center",
          "colSpan": 2,
          "fontSize": 9
        },
        {},
        {
          "type": "none",
          "ul": [
            "CEC01: Discrimina conceptos importantes en el desarrollo de una Base de Datos y las usa de manera adecuada",
            "CEC02: Diferencia e identifica adecuadamente los componentes de un SGBD",
            "CEC03: Aplica conceptos, principios y técnicas para el modelado de base de datos relacional.",
            "CEC01: Discrimina conceptos importantes en el desarrollo de una Base de Datos y las usa de manera adecuada",
            "CEC01: Discrimina conceptos importantes en el desarrollo de una Base de Datos y las usa de manera adecuada"
          ],
          "colSpan": 3,
          "fontSize": 9
        },
        {},
        {}
      ]
    `;
};

const celda = nombre =>
  JSON.stringify({
    text: nombre,
    style: 'tableHeader',
    alignment: 'center',
    fontSize: 9,
  });

const semana = (nombre, contenido) =>
  JSON.stringify([
    { text: nombre, fontSize: 9, rowSpan: 2 },
    {
      text: contenido,
      fontSize: 9,
      rowSpan: 2,
    },
    { text: 'ACTIVIDAES ASINCRÓNICAS', fontSize: 9 },
    { text: 'Silabo.', fontSize: 9 },
    {
      text: 'Revisión de la presentación de los contenidos.',
      fontSize: 9,
    },
  ]);

const semana2 = () =>
  JSON.stringify([
    '',
    '',
    { text: 'ACTIVIDADES SINCRÓNICAS', fontSize: 9 },
    { text: 'Plataforma Virtual', fontSize: 9 },
    { text: 'Exposición', fontSize: 9 },
  ]);

const programacionContenido = () => {
  const contenido = `
      [
        {
          "text": "Contenidos",
          "style": "tableHeader",
          "alignment": "center",
          "colSpan": 2,
          "fontSize": 9
        },
        {},
        ${celda('Actividades')},
        ${celda('Recursos')},
        ${celda('Estrategias')}
      ],
      ${semana(
        'Sem 01',
        'Propósito de los sistemas de bases de datos. Lenguajes de bases de datos. Bases de datos relacionales. Diseño de bases de datos. Modelos de datos. Bases de datos interna. Usuarios y administradores de bases de datos. Estructura general. Historia de los sistemas de base de datos '
      )},
      ${semana2()},
      ${semana(
        'Sem 02',
        'Propósito de los sistemas de bases de datos. Lenguajes de bases de datos.  '
      )},
      ${semana2()},
      ${semana(
        'Sem 03',
        'Propósito de los sistemas de bases de datos. Lenguajes de bases de datos. Bases de datos relacionales. Diseño de bases de datos. Modelos de datos. Bases de datos interna. Usuarios y administradores de bases de datos. Estructura general. Historia de los sistemas de base de datos '
      )},
      ${semana2()}
    `;

  return contenido;
};

const getProgramacion = () => {
  const cont = `[
    {
      "listType": "none",
      "text": "\\tPROGRAMACIÓN",
      "bold": true,
      "margin": [0, 10, 0, 10]
    },
    {
      "listType": "none",
      "table": {
        "widths": [30, 150, "*", "*", "*"],
        "body": [
          ${programacionUnidad()},
          ${programacionContenido()},
          ${programacionUnidad()},
          ${programacionContenido()},
          ${programacionUnidad()},
          ${programacionContenido()}  
        ]
      }
    }]
  `;

  return JSON.parse(cont);
};

module.exports = getProgramacion;
