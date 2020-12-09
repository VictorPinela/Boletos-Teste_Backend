const express = require('express');

const Codigo = [];
const Info = [];

// App
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load routes
const indexRoutes = require('./routes/index-routes');
app.use('/', indexRoutes);

const boletosRoutes = require('./routes/boleto-routes');
app.use('/boletos', boletosRoutes);

module.exports = app;