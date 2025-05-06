const express = require('express'); 
require('dotenv').config();
const bodyParser = require('body-parser');
const router = require('./router/router');

const app = express(); 

app.use(bodyParser.json());
app.use(express.json({
  limit: '50mb',
  extended: true,
  parameterLimit: 50000
}));
app.use('/api', router); 

module.exports = app;
