const controller = {};

controller.login = (req, res) => {
  const { email, password } = req.body;
  console.log({ email, password });
  req.getConnection((err, conn) => {
    conn.query(
      'select * from usuario where usuario_email = ? and usuario_password = ?',
      [email, password],
      (err, response) => {
        if (err) res.json(err);
        res.json(response);
      }
    );
  });
};

controller.register = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query(
      'insert into usuario (usuario_email,usuario_password)  values (?, ?)',
      ['nuevo@gmail.com', '123456'],
      (err, response) => {
        if (err) res.json(err);
        res.json(response);
      }
    );
  });
};

controller.listar = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('select * from usuario', (err, response) => {
      if (err) res.json(err);
      res.json(response);
    });
  });
};

controller.delete = (req, res) => {
  const { id } = req.params;
  console.log(id);
  req.getConnection((err, conn) => {
    conn.query(
      'delete from usuario where usuario_id = ? ',
      [id],
      (err, response) => {
        if (err) res.json(err);
        res.json(response);
      }
    );
  });
};

module.exports = controller;
