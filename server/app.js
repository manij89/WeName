const express = require('express');
const router = require('./router');
const cors = require('cors');

const morgan = require('morgan');
const app = express();

// app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(router);

module.exports = app;