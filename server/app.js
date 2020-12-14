const express = require('express');
const router = require('./router');
const cors = require('cors');
const path = require('path');

const morgan = require('morgan');
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(router);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});


module.exports = app;