const express = require('express');
const path = require('path');
const cors = require('cors');

const loginRoute = require('./routes/login.routes');
const silaboRoute = require('./routes/silabo.routes');
const cursoRoute = require('./routes/curso.routes');
const hoursRoute = require('./routes/hours.routes');
const planRoute = require('./routes/plan.routes');
const competenciaRoute = require('./routes/competencia.routes');
const docenteRoute = require('./routes/docente.routes');

const app = express();

app.use(
  cors({
    origin: 'https://silaboangular.netlify.app',
  })
);
app.use(express.json());

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, 'public')));

//routes
app.use('/api/v1/auth', loginRoute);
app.use('/api/v1/silabo', silaboRoute);
app.use('/api/v1/curso', cursoRoute);
app.use('/api/v1/hours', hoursRoute);
app.use('/api/v1/plan', planRoute);
app.use('/api/v1/competencia', competenciaRoute);
app.use('/api/v1/docente', docenteRoute);

app.listen(app.get('port'), () => {
  console.log(`Server on http://localhost:${app.get('port')}`);
});
