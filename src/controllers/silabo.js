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
    'SELECT asg.asig_id, asg.asig_nombre, asg.asig_ciclo, asg.asig_codigo, asg.asig_creditos, asg.asig_estrategia_didactica, asg.horas_sem_id, asg.plan_id, asg.tipo_asignatura_id, asp.periodo_academico, asp.asig_periodo_modalidad, asg.asig_sumilla, asu.updated_at, asu.asig_periodo_id, asu.favorito from asignatura_usuario asu LEFT JOIN asignatura_periodo asp ON asu.asig_periodo_id = asp.asig_periodo_id LEFT JOIN asignatura asg ON asp.asig_id = asg.asig_id WHERE asu.usuario_id = ?';
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
  const { user_id, curso, asig_periodo_modalidad, periodo_academico } =
    req.body;
  /*
  lo q se esta guardando -> codigo, nombre, tipo, horas, semestre, ciclo, creditos, modalidad, sumilla
  lo que se inserta -> asignatura_id, semestre,  modalidad
  */
  const query_asignatura_periodo =
    'insert into asignatura_periodo (asig_id, asig_periodo_modalidad, periodo_academico) values (?, ?, ?)';

  const respuesta = await pool.query(query_asignatura_periodo, [
    curso.asig_id,
    asig_periodo_modalidad,
    periodo_academico,
  ]);

  const query_asignatura_usuario =
    'insert into asignatura_usuario (usuario_id, asig_periodo_id) values (?,?)';

  const respuesta2 = await pool.query(query_asignatura_usuario, [
    user_id,
    respuesta.insertId,
  ]);
  res.status(201);
  res.json(respuesta2);
};

controller.pdf = async (req, res) => {
  const { silabo_id } = req.body;

  const query =
    'select a.asig_codigo, a.asig_nombre, a.asig_ciclo, a.asig_sumilla, a.asig_creditos, a.asig_estrategia_didactica, ap.asig_periodo_modalidad, ap.periodo_academico, ta.tipo_asignatura_nombre, hs.teoria, hs.laboratorio from asignatura_periodo ap left join asignatura a on a.asig_id = ap.asig_id left join tipo_asignatura ta on ta.tipo_asignatura_id = a.tipo_asignatura_id left join horas_semanales hs on hs.horas_sem_id = a.horas_sem_id where ap.asig_periodo_id = ?';

  /* const query_docentes =
    'select * from docente d left join docente_asignatura da on da.docente_id = d.docente_id left join asignatura_periodo ap on ap.asig_periodo_id = da.asig_periodo_id where ap.asig_periodo_id = ?'; */

  const query_docentes = 'select * from docente';

  const respuesta = await pool.query(query, [silabo_id]);
  const respuesta_docente = await pool.query(query_docentes);
  // const respuesta_docente = await pool.query(query_docentes, [silabo_id]);

  generatePdf(
    { silabo: respuesta[0], docentes: respuesta_docente },
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
