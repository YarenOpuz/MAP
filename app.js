const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
const dotenv = require('dotenv');
const limiter = require('./middlewares/rateLimit');
const globalExceptionHandler = require('./middlewares/globalExceptionHandler');
app.use(bodyParser.json());
app.use('/', limiter);
dotenv.config()

const DB_CONNECTION = process.env.DB_CONNECTION;

const mapsRoute = require('./routes/maps');

app.use('/maps', mapsRoute);

app.get('/', (req, res) => {
  res.send('hello world');
});



mongoose.connect(DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB bağlantı hatası:'));
db.once('open', function () {
  console.log('MongoDB bağlantısı başarıyla kuruldu');
});


app.use(globalExceptionHandler);

app.listen(3000);