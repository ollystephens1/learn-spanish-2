// Load dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Word = require('./server/schemas/wordSchema.js');

// Initialise App
var app = express();

// Set default public directory
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

// Load connection to mongodb
mongoose.connect('mongodb://localhost/learn-spanish');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
// Test mongo connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // Connected! 
    console.log("Successfully connected to mongodb");
});



/******************** ROUTES **********************/

// Handles dictionary request
app.get('/test', function(req, res) {  
  Word.find(function (err, words) {
    if (err) return console.error(err)
      res.json(words); // Send all words to Angular
  });
});


// Handles adding a new word 
app.post('/test', function(req, res) {  
    var word = new Word(req.body);
    word.save(function (err, word) {
      if (err) return console.error(err);
        res.json(word); // Send word back to Angular 
    });
});


app.delete('/test/:id', function(req, res) {
    var id = req.params.id;
    Word.remove({ _id: id }, function(err) {
        if (!err) {
            console.log(id);
            res.json(id);
        } else {
            console.log("Something went wrong...");
        }
    });
});


// Launch server
app.listen(3000, function() {
	console.log("Learn Spanish running on port 3000");
});



















