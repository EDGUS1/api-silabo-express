const pool = require('../database');
const controller = {};

controller.listar = async (req, res) => {
  try {
    const cursos = await pool.query('select * from asignatura');
    res.json(cursos);
  } catch (e) {
    res.status(501).json({ error: e });
  }
};

controller.save = async (req, res) => {
  try {
    const {
      codigo,
      nombre,
      tipo,
      horas,
      ciclo,
      creditos,
      sumilla,
      estrategia,
      plan,
    } = req.body;
    const query =
      'insert into asignatura (asig_codigo, asig_nombre, horas_sem_id, asig_ciclo, asig_sumilla, asig_creditos, asig_estrategia_didactica, tipo_asignatura_id, plan_id) values (?,?,?,?,?,?,?,?,?)';
    const response = await pool.query(query, [
      codigo,
      nombre,
      horas,
      ciclo,
      sumilla,
      creditos,
      estrategia,
      tipo,
      plan,
    ]);
    res.json(response);
  } catch (e) {
    res.status(501).json({ error: e });
  }
};

module.exports = controller;
