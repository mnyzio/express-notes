// Import express npm package
const express = require('express');
const path = require('path');
const { readFile, writeFile } = require('fs/promises');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
// const jsonDB = require('./db/db.json')

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

// API Routes
// Get route for api notes
app.get('/api/notes', (req, res) => {
    readFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

// POST route for notes
app.post('/api/notes', (req, res) => {
    console.log(req.body)

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            // Add unique id using uuid npm
            id: uuidv4().slice(0, 8)
        };

        readFile('./db/db.json', 'utf-8').then((data) => {

            // Create object from jason file
            const parsedData = JSON.parse(data);
            // Push new note into array of notes
            parsedData.push(newNote);
            // Write updated notes object to db file as string
            fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4), (err) =>
                err ? console.error(err) : console.info(`\nData written to db.json file.`)
            );
            // Complete request by sending successful response 
            res.status(200).json("Note added successfully");
        })
    } else {
        // Complete request not
        res.status(400).json("Failed to add note.")
    }
})

// DELETE route for api notes
app.delete('/api/notes/:id', (req, res) => {
    // Assign ID passed as query parameter to variable
    const idToDelete = req.params.id;
    console.log("🚀 ~ file: server.js:74 ~ app.delete ~ idToDelete:", idToDelete)

    if (idToDelete) {
        readFile('./db/db.json', 'utf-8').then((data) => {
            // Create object from jason file
            const parsedData = JSON.parse(data);

            parsedData.forEach((element, index) => {
                if (element.id === idToDelete) {

                    parsedData.splice(index, 1);

                    fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4), (err) =>
                        err ? console.error(err) : console.info(`\nData written to db.json file.`)
                    );
                    // Complete request by sending successful response 
                    res.status(200).json("Note deleted successfully");
                }
            });
        });
    }     
        
    res.status(400).json("Note id could not be found.");
    
})



// Wildcard route 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})






app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);