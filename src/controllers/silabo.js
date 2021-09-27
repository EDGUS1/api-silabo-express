const generatePdf = require('./../utils/contentPdf');

const controller = {};

controller.all = async (req, res) => {
  const query =
    'select asg.asig_id, asg_id.nombre, asg.asig_ciclo, asp.periodo_academico, asg.asig_sumilla, asu.updated_at from asignatura_usuario asu left join asignatura asg on asu.asignatura_id = asg.asig_id left join asignatura_periodo asp on asg.asig_id = asp.asig_id';
  const respuesta = await pool.query(query, [email, password]);
  res.json(respuesta);
};

controller.allbyid = async (req, res) => {
  const { id } = req.params;
  const query =
    'select asg.asig_id, asg_id.nombre, asg.asig_ciclo, asp.periodo_academico, asg.asig_sumilla, asu.updated_at from asignatura_usuario asu left join asignatura asg on asu.asignatura_id asg.asig_id left join asignatura_periodo asp on asg.asig_id = asp.asig_id where asu.usuario_id = ?';
  const respuesta = await pool.query(query, [id]);
  res.json(respuesta);
};

controller.save = async (req, res) => {
  const { user_id, id, modalidad, periodo } = req.body;
  /*
  lo q se esta guardando -> codigo, nombre, tipo, horas, semestre, ciclo, creditos, modalidad, sumilla
  lo que se inserta -> asignatura_id, semestre,  modalidad
  */
  const query_asignatura_periodo =
    'insert into asignatura_periodo (asig_id, asig_periodo_modalidad, periodo_academico) values (?, ?, ?)';

  const respuesta = await pool.query(query_asignatura_periodo, [
    id,
    modalidad,
    periodo,
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

controller.pdf = (req, res) => {
  const { silabo } = req.body;
  generatePdf(silabo, response => {
    res.setHeader('Content-Type', 'application/pdf');
    res.send(response);
  });
};

module.exports = controller;
