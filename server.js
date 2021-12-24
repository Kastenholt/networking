require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const allowedOrigins = process.env.ALLOWED_ORIGINS;
  const { origin } = req.headers;

  if (isProduction) {
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  if (req.method === 'OPTIONS') {
    res.headers('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
  }

  next();
});

app.get('/', (req, res) => {
  res.send('Welcome to Networking Hello World page :)');
});

app.use('/api/users', require('./routes/users'));
app.use('/api/orders', require('./routes/orders'));

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((err, req, res) => {
  res.status(err.status || 500).json({ error: { message: err.message } });
});

const server = app.listen(process.env.APP_PORT, process.env.APP_HOST, () => {
  console.info(
    `Express Server started on 'http://${server.address().address}:${server.address().port}'`,
  );
});
