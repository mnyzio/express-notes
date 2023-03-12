// Import express.js
const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

// Allow environment to assign a PORT or use specified PORT for express server
const PORT = process.env.PORT || 3001;

// Initialize an instance of Express.js
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for router
app.use('/', api);

// Middleware for allowing access for public folder
app.use(express.static('public'));

// Get route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

// Get route for notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

// Wildcard route 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);