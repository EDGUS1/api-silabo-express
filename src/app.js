const express = require('express');
const myConnection = require('express-myconnection');
const mysql = require('mysql');
const loginRoute = require('./routes/login.routes');
require('dotenv').config();

const app = express();
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
app.use('/', loginRoute);

app.listen(app.get('port'), () => {
  console.log('Server on http://localhost:3000');
});
