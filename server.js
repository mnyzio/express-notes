// Import express npm package
const express = require('express');
const path = require('path');

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

// Wildcard route 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})






app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);