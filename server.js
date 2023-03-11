// Import express npm package
const express = require('express');
const path = require('path');
const { readFile, writeFile } = require('fs/promises');
const jsonDB = require('./db/db.json')

// Specify PORT for express server
const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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


app.get('/api/notes', (req, res) => {
    readFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})








// Wildcard route 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})






app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);