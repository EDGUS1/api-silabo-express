const itemFilaInformacion = (width, valor) => ({
  width: width,
  text: valor,
});

const filaInformacion = (numeracion, nombre, valor) =>
  JSON.stringify({
    listType: 'none',
    columns: [
      itemFilaInformacion(30, numeracion),
      itemFilaInformacion(160, nombre),
      itemFilaInformacion(10, ':'),
      itemFilaInformacion(200, valor),
    ],
  });

const filaInformacionIterable = (numeracion, nombre, valores) => {
  let devolver = [];

  for (let i = 0; i < valores.length; i++) {
    if (i == 0)
      devolver.push(
        JSON.parse(filaInformacion(numeracion, nombre, valores[i]))
      );
    else devolver.push(JSON.parse(filaInformacion('', '', valores[i])));
  }

  parse = JSON.stringify(devolver);

  return parse.substring(1, parse.length - 1);
};

const getInformacionGeneral = ({
  nombre_curso,
  codigo_curso,
  tipo,
  teoria,
  laboratorio,
  semestre,
  ciclo,
  creditos,
  modalidad,
  profesores,
  correos,
}) => {
  const cadena = `Teoría ${teoria} h, Laboratorio ${laboratorio} h`;
  const contenido = `[
      { "listType": "none", "text": "1. \\tINFORMACIÓN GENERAL", "bold": true },
      {
        "ol": [
          ${filaInformacion(
            '1.1',
            'Nombre y código de la asignatura',
            nombre_curso
          )},
          ${filaInformacion('1.2', 'Código de Asignatura', codigo_curso)},
          ${filaInformacion('1.3', 'Tipo de Asignatura', tipo)},
          ${filaInformacion('1.4', 'Horas semanales', cadena)},
          ${filaInformacion('1.5', 'Semestre o año académico', semestre)},
          ${filaInformacion('1.6', 'Ciclo', ciclo)},
          ${filaInformacion('1.7', 'Créditos', creditos)},
          ${filaInformacion('1.8', 'Modalidad', modalidad)},
          ${filaInformacionIterable('1.9', 'Docentes', profesores)},
          ${filaInformacionIterable('1.10', 'Correo institucional', correos)}
        ],
        "fontSize": 10,
        "margin": [15, 10, 0, 0]
      }
    ]`;
  return JSON.parse(contenido);
};

module.exports = getInformacionGeneral;
