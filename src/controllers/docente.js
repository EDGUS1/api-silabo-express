const pool = require('../database');

const controller = {};

controller.list = async (req, res) => {
  const query = 'select * from docente';
  const respuesta = await pool.query(query);
  res.json(respuesta);
};

module.exports = controller;
