const generatePdf = require('./../utils/contentPdf');

const controller = {};

controller.all = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(
      'select asg.asig_id, asg_id.nombre, asg.asig_ciclo, asp.periodo_academico, asg.asig_sumilla, asu.updated_at from asignatura_usuario asu left join asignatura asg on asu.asignatura_id = asg.asig_id left join asignatura_periodo asp on asg.asig_id = asp.asig_id',
      (err, response) => {
        if (err) res.json(err);
        res.json(response);
      }
    );
  });
};

controller.allbyid = (req, res) => {
  const { id } = req.params;

  req.getConnection((err, conn) => {
    conn.query(
      'select asg.asig_id, asg_id.nombre, asg.asig_ciclo, asp.periodo_academico, asg.asig_sumilla, asu.updated_at from asignatura_usuario asu left join asignatura asg on asu.asignatura_id asg.asig_id left join asignatura_periodo asp on asg.asig_id = asp.asig_id where asu.usuario_id = ?',
      [id],
      (err, response) => {
        if (err) res.json(err);
        res.json(response);
      }
    );
  });
};

/* controller.save = (req, res) => {
  console.log(req.body);
  const codigo, ciclo, sumilla, creditos;
  req.getConnection((err, conn) => {
    conn.query(
      'insert into asignatura (asig_codigo, asig_nombre, horas_sem_id, asig_ciclo, asig_sumilla, asig_creditos,asig_estrategia_didactica, tipo_asignatura_id, plan_id) values (?, ?)',
      [codigo, nombre, 1, ciclo, sumilla, creditos, 1, 1, 1],
      (err, response) => {
        if (err) res.json(err);
        res.json(response);
      }
    );
    res.send('ok');
  });
}; */

controller.pdf = (req, res) => {
  const { silabo } = req.body;
  generatePdf(silabo, response => {
    res.setHeader('Content-Type', 'application/pdf');
    res.send(response);
  });
};
module.exports = controller;
