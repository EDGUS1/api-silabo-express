const express = require('express');
const cors = require('cors');
const loginRoute = require('./routes/login.routes');
const silaboRoute = require('./routes/silabo.routes');

const app = express();
app.use(cors());
app.use(express.json());

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/api/v1/auth', loginRoute);
app.use('/api/v1/silabo', silaboRoute);

app.listen(app.get('port'), () => {
  console.log('Server on http://localhost:3000');
});
