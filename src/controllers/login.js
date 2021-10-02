const pool = require('../database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const controller = {};

controller.login = async (req, res) => {
  const { email, password } = req.body;

  const respuesta = await pool.query(
    'select * from usuario where usuario_email = ? ',
    [email]
  );

  const passwordCorrect = !respuesta[0]
    ? false
    : await bcrypt.compare(password, respuesta[0].usuario_password);

  if (!(respuesta[0] && passwordCorrect))
    return res.json({ error: 'Invalid user or password' });

  const userForToken = {
    id: respuesta[0].usuario_id,
    email: respuesta[0].usuario_email,
  };

  const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
    expiresIn: 60 * 60,
  });

  res.send({
    user_email: respuesta[0].usuario_email,
    token,
  });
};

controller.register = async (req, res) => {
  const { email, password } = req.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const respuesta = await pool.query(
    'insert into usuario (usuario_email,usuario_password) values (?, ?)',
    [email, passwordHash]
  );
  res.status(201).json(respuesta);
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
