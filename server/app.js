const express = require('express');
const router = require('./router');
const cors = require('cors');
const path = require('path');

const morgan = require('morgan');
const app = express();

// app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(cors());
app.use(express.json());
app.use(router);

module.exports = app;