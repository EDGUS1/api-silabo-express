const pool = require('../database');

const controller = {};

controller.list = async (req, res) => {
  const { id } = req.params;
  const query =
    'select * from competencia_especifica ce left join asignatura asg on asg.plan_id = ce.plan_id where asig_id = ?';
  const competencias = await pool.query(query, [id]);
  res.json(competencias);
};

module.exports = controller;
