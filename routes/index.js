const express = require('express');

// Import modular router for notes
const notesRouter = require('./notes');

// Initialize an instance of Express.js
const app = express();

// Middleware for express router
app.use('/', notesRouter);

module.exports = app;