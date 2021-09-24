const express = require('express');
const myConnection = require('express-myconnection');
const mysql = require('mysql');
const cors = require('cors');
const loginRoute = require('./routes/login.routes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

//settings
app.use(
  myConnection(
    mysql,
    {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE,
    },
    'single'
  )
);
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/api/v1/auth', loginRoute);

app.listen(app.get('port'), () => {
  console.log('Server on http://localhost:3000');
});
