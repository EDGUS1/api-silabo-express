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

module.exports = controller;
