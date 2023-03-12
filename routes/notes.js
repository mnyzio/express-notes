const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFile, writeFile } = require('fs/promises');
const fs = require('fs');

// API Routes
// Get route for api notes
notes.get('/api/notes', (req, res) => {
    readFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

// POST route for notes
notes.post('/api/notes', (req, res) => {

    // Unpack key, value pairs from req.body
    const { title, text } = req.body;
    
    if (req.body) {
        // Craete new note as an object
        const newNote = {
            title,
            text,
            // Add unique id for each object using uuid npm
            id: uuidv4().slice(0, 8)
        };

        // readFile that returns promise
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
notes.delete('/api/notes/:id', (req, res) => {
    // Assign ID passed as query parameter to variable
    const idToDelete = req.params.id;

    // Check to make sure note id was passed in query params
    if (idToDelete) {
        // readFile that returns promise
        readFile('./db/db.json', 'utf-8').then((data) => {
            // Create object from jason file
            const parsedData = JSON.parse(data);
            
            // Loop through parsedData to find records with id passed in query             
            parsedData.forEach((element, index) => {
                if (element.id === idToDelete) {
                    // Remove one record at current index from array
                    parsedData.splice(index, 1);
                    // Write new array of objects to db.json file as string
                    fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4), (err) =>
                        err ? console.error(err) : console.info(`\nData written to db.json file.`)
                    );
                    // Complete request by sending successful response 
                    res.status(200).json("Note deleted successfully");
                }
            });
        });
        return
    }     

    res.status(400).json("Note id could not be found.");
    
})

module.exports = notes;