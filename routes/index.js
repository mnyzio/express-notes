const express = require('express');

// Import modular router for notes
const notesRouter = require('./notes');

const app = express();

app.use('/', notesRouter);

module.exports = app;