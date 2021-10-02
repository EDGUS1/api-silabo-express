const pool = require('../database');

const controller = {};

controller.listar = async (req, res) => {
  const query = 'select * from horas_semanales';
  const respuesta = await pool.query(query);
  res.json(respuesta);
};

module.exports = controller;
