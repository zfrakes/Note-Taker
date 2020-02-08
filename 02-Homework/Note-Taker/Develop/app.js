const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const fs = require("fs");

app.use(express.json());
app.use(express.static('public'))

app.post('/api/notes', function(req, res) {
    console.log(req.body)
     filePath = __dirname + '/db/db.json';

    // read notes db
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) throw err;
    
        notesArray = JSON.parse(data);
         newNote = req.body
    
        // add new note to notes array
        notesArray.push(newNote)
    
     
      // write to file
      fs.writeFile(filePath, JSON.stringify(notesArray), "utf8", function(err) {
          if (err) {
              console.log(err);
              return;
          }
            console.log("The file was saved!");
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
