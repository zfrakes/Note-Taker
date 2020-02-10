const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const fs = require("fs");
let notesArray=[];

app.use(express.urlencoded());
app.use(express.static('public'))

app.post('/api/notes', function(req, res) {
    filePath = __dirname + '/db/db.json';

   // read notes from file
   fs.readFile(filePath, 'utf8', function (err, data) {
       if (err) throw err;
       notesArray = JSON.parse(data);
       newNote = req.body
     
         // Assign id to 1 plus previoud note's id
         newNoteId = 0
         if (notesArray.length > 0) {
           newNoteId = notesArray[notesArray.length-1].id + 1
       }
         newNote.id = newNoteId
   
       // add new note to notes array
       notesArray.push(newNote)
   
    
     // write to file
     fs.writeFile(filePath, JSON.stringify(notesArray), "utf8", function(err) {
         if (err) {
             console.log(err);
             return;
         }
           console.log("The file was saved!");
           res.status(200).send(newNote);
     });
 });
});

app.delete('/api/notes/:id', function(req, res) {
	noteToDeleteId = req.params.id
	filePath = __dirname + '/db/db.json';

    // read notes from file
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) throw err;
        notesArray = JSON.parse(data);
      
      	// remove note from notes array
      	newNotesArray = notesArray.filter( function(note) { return note.id != noteToDeleteId } )
     console.log(newNotesArray)
     console.log(noteToDeleteId)
      // write to file
      fs.writeFile(filePath, JSON.stringify(newNotesArray), "utf8", function(err) {
          if (err) {
              console.log(err);
              return;
          }
        	console.log("The file was saved!");
        	res.status(204).send();
      });
  });
});

app.get('/api/notes', function(req, res) {
    fs.readFile('db/db.json', (err, data) => {
    	if (err) throw err;
    	let notesData = JSON.parse(data);
    	res.send(notesData);
	});
});



app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/notes.html'));
});

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
