const express = require('express');
const routeMovies = require('./routes/movies');

const app = express();

app.use(express.json());

app.use('/movies', routeMovies);

module.exports = app;