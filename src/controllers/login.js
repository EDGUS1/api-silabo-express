const pool = require('../database');
const controller = {};

controller.login = async (req, res) => {
  const { email, password } = req.body;
  const respuesta = await pool.query(
    'select * from usuario where usuario_email = ? and usuario_password = ?',
    [email, password]
  );
  res.json(respuesta);
};

controller.register = async (req, res) => {
  const { email, password } = req.body;
  const respuesta = await pool.query(
    'insert into usuario (usuario_email,usuario_password) values (?, ?)',
    [email, password]
  );
  res.json(respuesta);
};

controller.listar = async (req, res) => {
  try {
    const usuarios = await pool.query('select * from usuario');
    res.json(usuarios);
  } catch (e) {
    res.json({ error: e }).status(501);
  }
};

controller.delete = async (req, res) => {
  const { id } = req.params;
  const respuesta = await pool.query(
    'delete from usuario where usuario_id = ? ',
    [id]
  );
  res.json(respuesta);
};

controller.update = async (req, res) => {
  const { usuario_id, usuario_password } = req.body;
  const respuesta = await pool.query(
    'update usuario set usuario_password = ? where usuario_id = ? ',
    [usuario_password, usuario_id]
  );

  res.json(respuesta);
};

module.exports = controller;
