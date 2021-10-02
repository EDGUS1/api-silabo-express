const pool = require('../database');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const controller = {};

controller.login = async (req, res) => {
  const { email, password } = req.body;
  /* console.log(req.ip);
  console.log(req.ips);
  console.log(req.originalUrl); */
  const respuesta = await pool.query(
    'select * from usuario where usuario_email = ? and usuario_password = ?',
    [email, password]
  );

  if (!respuesta[0]) return res.json({ error: 'Not found' });

  const userForToken = {
    id: respuesta[0].usuario_id,
    email: respuesta[0].usuario_email,
  };

  const token = jwt.sign(userForToken, process.env.JWT_SECRET);
  res.send({
    user_email: respuesta[0].usuario_email,
    token,
  });
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
