const pool = require('../database');
const generatePdf = require('./../utils/contentPdf');

const controller = {};

/* controller.all = async (req, res) => {
  const query =
    'select asg.asig_id, asg_id.nombre, asg.asig_ciclo, asp.periodo_academico, asg.asig_sumilla, asu.updated_at from asignatura_usuario asu left join asignatura asg on asu.asignatura_id = asg.asig_id left join asignatura_periodo asp on asg.asig_id = asp.asig_id';
  const respuesta = await pool.query(query);
  res.json(respuesta);
}; */

controller.allbyid = async (req, res) => {
  const { id } = req.params;
  const query =
    'SELECT asg.asig_id, asg.asig_nombre, asg.asig_ciclo, asg.asig_codigo, asg.asig_creditos, asg.asig_estrategia_didactica, asg.horas_sem_id, asg.plan_id, asg.tipo_asignatura_id, asp.periodo_academico, asp.asig_periodo_modalidad, asg.asig_sumilla, asu.updated_at, asu.asig_periodo_id, asu.favorito from asignatura_usuario asu LEFT JOIN asignatura_periodo asp ON asu.asig_periodo_id = asp.asig_periodo_id LEFT JOIN asignatura asg ON asp.asig_id = asg.asig_id WHERE asu.usuario_id = ? order by asig_periodo_id desc';
  const respuesta = await pool.query(query, [id]);

  const silabos = respuesta.map(r => ({
    updated_at: r.updated_at,
    asig_periodo_id: r.asig_periodo_id,
    favorito: r.favorito,
    periodo_academico: r.periodo_academico,
    asig_periodo_modalidad: r.asig_periodo_modalidad,
    curso: {
      asig_codigo: r.asig_codigo,
      asig_creditos: r.asig_creditos,
      asig_estrategia_didactica: r.asig_estrategia_didactica,
      asig_ciclo: r.asig_ciclo,
      asig_id: r.asig_id,
      asig_nombre: r.asig_nombre,
      asig_sumilla: r.asig_sumilla,
      horas_sem_id: r.horas_sem_id,
      plan_id: r.plan_id,
      tipo_asignatura_id: r.tipo_asignatura_id,
    },
  }));

  res.json(silabos);
};

controller.save = async (req, res) => {
  const {
    user_id,
    curso,
    asig_periodo_modalidad,
    periodo_academico,
    docentes,
    competencias,
    capacidades,
    referencias,
  } = req.body;

  const query_asignatura_periodo =
    'INSERT INTO asignatura_periodo (asig_id, asig_periodo_modalidad, periodo_academico) VALUES (?, ?, ?)';

  const respuesta = await pool.query(query_asignatura_periodo, [
    curso.asig_id,
    asig_periodo_modalidad,
    periodo_academico,
  ]);

  const query_asignatura_usuario =
    'INSERT INTO asignatura_usuario (usuario_id, asig_periodo_id) VALUES (?,?)';

  const respuesta2 = await pool.query(query_asignatura_usuario, [
    user_id,
    respuesta.insertId,
  ]);

  // Por default el primer docente es el responsable
  for (let i = 0; i < docentes.length; i++) {
    const query_docente_asignatura =
      'INSERT INTO docente_asignatura (docente_asignatura_responsable, docente_id, asig_periodo_id) VALUES (?,?,?)';
    await pool.query(query_docente_asignatura, [
      i === 0 ? 1 : 0,
      docentes[i].docente_id,
      respuesta.insertId,
    ]);
  }

  for (let i = 0; i < competencias.length; i++) {
    const query_competencia_asignada =
      'INSERT INTO competencia_asignada (comp_esp_id, asig_periodo_id) VALUES (?,?)';
    await pool.query(query_competencia_asignada, [
      competencias[i].comp_esp_id,
      respuesta.insertId,
    ]);
  }

  for (let i = 0; i < capacidades.length; i++) {
    const query_capacidad =
      'INSERT INTO capacidad (capacidad_codigo, capacidad_nombre, asig_periodo_id) VALUES (?,?,?)';
    await pool.query(query_capacidad, [
      `CEC${i < 9 ? '0' + (i + 1) : i + 1}`,
      capacidades[i].capacidad_nombre,
      respuesta.insertId,
    ]);
  }

  for (let i = 0; i < referencias.length; i++) {
    const response_editorial = await pool.query(
      'INSERT INTO editorial (editorial_nombre) values (?)',
      [referencias[i].editorial_nombre]
    );

    const reponse_libro = await pool.query(
      'INSERT INTO libro (libro_nombre, libro_fecha, editorial_id ,edicion) values (?,?,?,?)',
      [
        referencias[i].libro_nombre,
        referencias[i].libro_fecha,
        response_editorial.insertId,
        referencias[i].edicion,
      ]
    );

    await pool.query(
      'INSERT INTO referencia (libro_id, asig_periodo_id) values (?,?)',
      [reponse_libro.insertId, respuesta.insertId]
    );

    for (let j = 0; j < referencias[i].autores.length; j++) {
      const response_autor = await pool.query(
        'INSERT INTO autor (autor_nombre, autor_apellido_paterno) values (?,?)',
        [referencias[i].autores[j].nombre, referencias[i].autores[j].apellido]
      );

      await pool.query(
        'INSERT INTO libro_autor (libro_id, autor_id) values (?,?)',
        [reponse_libro.insertId, response_autor.insertId]
      );
    }
  }

  res.status(201).json(respuesta2);
};

controller.pdf = async (req, res) => {
  const { silabo_id } = req.body;

  const query =
    'SELECT a.asig_codigo, a.asig_nombre, a.asig_ciclo, a.asig_sumilla, a.asig_creditos, a.asig_estrategia_didactica, ap.asig_periodo_modalidad, ap.periodo_academico, ta.tipo_asignatura_nombre, hs.teoria, hs.laboratorio from asignatura_periodo ap LEFT JOIN asignatura a ON a.asig_id = ap.asig_id LEFT JOIN tipo_asignatura ta ON ta.tipo_asignatura_id = a.tipo_asignatura_id LEFT JOIN horas_semanales hs ON hs.horas_sem_id = a.horas_sem_id WHERE ap.asig_periodo_id = ?';

  const query_docentes =
    'select * from docente d left join docente_asignatura da on da.docente_id = d.docente_id left join asignatura_periodo ap on ap.asig_periodo_id = da.asig_periodo_id where ap.asig_periodo_id = ?';

  const query_capacidad = 'SELECT * FROM capacidad where asig_periodo_id = ?';
  const query_general =
    'SELECT * FROM competencia_general cg inner join plan p on p.plan_id = cg.plan_id inner join asignatura a on a.plan_id = p.plan_id inner join asignatura_periodo ap on ap.asig_id = a.asig_id where ap.asig_periodo_id = ?';
  const query_especifico =
    'SELECT * FROM competencia_especifica ce inner join competencia_asignada ca on ce.comp_esp_id = ca.comp_esp_id where ca.asig_periodo_id = ?';
  const query_referencia =
    "SELECT l.libro_nombre, l.libro_fecha, l.edicion, e.editorial_nombre, (select GROUP_CONCAT(a.autor_nombre, ' ' ,a.autor_apellido_paterno SEPARATOR ', ') from autor a inner join libro_autor la on la.autor_id = a.autor_id where la.libro_id = l.libro_id) as nombre from referencia r inner join libro l on r.libro_id = l.libro_id inner join editorial e on e.editorial_id = l.editorial_id where r.asig_periodo_id = ?";

  const respuesta = await pool.query(query, [silabo_id]);
  const respuesta_docente = await pool.query(query_docentes, [silabo_id]);
  const respuesta_capacidad = await pool.query(query_capacidad, [silabo_id]);
  const respuesta_general = await pool.query(query_general, [silabo_id]);
  const respuesta_especifico = await pool.query(query_especifico, [silabo_id]);
  const respuesta_referencia = await pool.query(query_referencia, [silabo_id]);

  generatePdf(
    {
      silabo: respuesta[0],
      docentes: respuesta_docente,
      capacidades: respuesta_capacidad,
      cgenerales: respuesta_general,
      cespecificos: respuesta_especifico,
      referencias: respuesta_referencia,
    },
    response => {
      res.setHeader('Content-Type', 'application/pdf');
      res.send(response);
    }
  );
};

controller.delete = async (req, res) => {
  const { id } = req.params;
  const respuesta = await pool.query(
    'delete from asignatura_usuario where asig_periodo_id = ? ',
    [id]
  );
  res.json(respuesta);
};

controller.favorito = async (req, res) => {
  const { id, favorito } = req.body;
  const respuesta = await pool.query(
    'update asignatura_usuario set favorito = ? where asig_periodo_id = ? ',
    [favorito, id]
  );

  res.json(respuesta);
};

module.exports = controller;
