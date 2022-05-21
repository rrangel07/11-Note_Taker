const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

notes.get('/', (req,res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req,res) => {
    console.info(`${req.method} request received for notes`);
    console.log(req.body)
    const { tittle, text } = req.body;
    console.log(tittle,text);
    if(req.body) {
        const newNote = {
            tittle,
            text,
            id: uuid(),
        }
        readAndAppend (newNote, './db/db.json');
        res.json(`Note added to database 🚀`);
    } else {
        res.error(`Error saving the note`);
    }
});

// notes.delete('/:id', (req,res) => {
//     console.info(`${req.method} request received for notes`);

//     readFromFile('../db/db.json').then((data) => {
//         const notesArray = (JSON.parse(data)).filter(each => each.id != req.params.id)
//     });
//     //     res.json(`Note added to database 🚀`);
//     // } else {
//     //     res.error(`Error adding the `)
//     // }
// });

module.exports = notes;