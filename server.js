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


app.get('/api/notes', (req, res) => {
    readFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})


app.post('/api/notes', (req, res) => {
    console.log(req.body)    

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            // Add unique id using uuid npm
            note_id: uuidv4()
        };        
        
        readFile('./db/db.json', 'utf-8').then((data) => {
            
            // Create object from jason file
            const parsedData = JSON.parse(data);
            
            parsedData.push(newNote);

            // Write note to db file
            fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4), (err) =>
                err ? console.error(err) : console.info(`\nData written to database.`)
            );                       

            res.status(200).json("Note added successfully");
        }) 
    } else {
        res.json("Failed to add note.")
    }
})





// Wildcard route 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})






app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);