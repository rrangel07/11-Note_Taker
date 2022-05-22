const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

notes.get('/', (req,res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req,res) => {
    console.info(`${req.method} request received for notes`);
    console.log(req.body)
    const { title, text } = req.body;
    console.log(title,text);
    if(req.body) {
        const newNote = {
            title,
            text,
            id: uuid(),
        }
        readAndAppend (newNote, './db/db.json');
        res.json(`Note added to database 🚀`);
    } else {
        res.error(`Error saving the note`);
    }
});

notes.delete('/:id', (req,res) => {
    let exists = false;
    let pos;
    console.info(`${req.method} request received for notes`);

    readFromFile('./db/db.json').then((data) => {
        const notesArray = JSON.parse(data);
        notesArray.forEach((ele,index) => {
            if (ele.id === req.params.id){
                exists = true;
                pos= index;
            }
        });
        console.log(pos);
        if (exists) {
            notesArray.splice(pos,1);
            writeToFile('./db/db.json', notesArray);
            res.json('Note deleted')
        } else {
            res.json('Note not found')
        }
    });


});

module.exports = notes;