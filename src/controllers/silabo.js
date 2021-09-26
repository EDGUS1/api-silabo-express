const controller = {};

controller.all = async (req, res) => {
  const respuesta = await pool.query(
    'select asg.asig_id, asg_id.nombre, asg.asig_ciclo, asp.periodo_academico, asg.asig_sumilla, asu.updated_at from asignatura_usuario asu left join asignatura asg on asu.asignatura_id = asg.asig_id left join asignatura_periodo asp on asg.asig_id = asp.asig_id',
    [email, password]
  );
  res.json(respuesta);
};

controller.allbyid = async (req, res) => {
  const { id } = req.params;
  const respuesta = await pool.query(
    'select asg.asig_id, asg_id.nombre, asg.asig_ciclo, asp.periodo_academico, asg.asig_sumilla, asu.updated_at from asignatura_usuario asu left join asignatura asg on asu.asignatura_id asg.asig_id left join asignatura_periodo asp on asg.asig_id = asp.asig_id where asu.usuario_id = ?',
    [id]
  );
  res.json(respuesta);
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
};
 */
module.exports = controller;
