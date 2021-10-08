const pool = require('../database');

const controller = {};

controller.especifica = async (req, res) => {
  const { id } = req.params;
  const query =
    'select ce.comp_esp_id, ce.comp_esp_codigo, ce.comp_esp_nombre, ce.plan_id from competencia_especifica ce left join asignatura asg on asg.plan_id = ce.plan_id where asg.asig_id = ?';
  const competencias = await pool.query(query, [id]);
  res.json(competencias);
};

controller.general = async (req, res) => {
  const { id } = req.params;
  const query =
    'select cg.comp_gnral_id, cg.comp_gnral_codigo, cg.comp_gnral_nombre, cg.plan_id from competencia_general cg left join asignatura asg on asg.plan_id = cg.plan_id where asg.asig_id = ?';
  const competencias = await pool.query(query, [id]);
  res.json(competencias);
};

module.exports = controller;
