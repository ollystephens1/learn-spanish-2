// Load dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Word = require('./server/schemas/wordSchema.js');
var random = require('mongoose-simple-random');



// Initialise App
var app = express();

// Set default public directory
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// Load connection to mongodb
mongoose.connect('mongodb://localhost/learn-spanish');
var db = mongoose.connection;

// Test mongo connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // Connected! 
    console.log("Successfully connected to mongodb");
});



/******************** ROUTES **********************/

// Handles play request
app.get('/play', function(req, res) {
  Word.findOneRandom(function(err, word) {
    if (err) console.log(err);
    res.json(word); 
  });
});


// Handles dictionary request
app.get('/dictionary', function(req, res) {  
  Word.find(function (err, words) {
    if (err) return console.error(err)
      res.json(words); // Send all words to Angular
  });
});


// Handles dictionary live search
app.get('/filterWords/:q', function(req, res) {
  var q = req.params.q;
  Word.find({eng: new RegExp(q, 'i')}, function(err, words) {
    if (err) return console.error(err);
      res.json(words); // Send word back to Angular as confirmation
      console.log(words);
  });
});


// Handles adding a new word 
app.post('/add', function(req, res) {  
    var word = new Word(req.body);
    word.save(function (err, word) {
      if (err) return console.error(err);
        res.json(word); // Send word back to Angular as confirmation
        console.log(word);
    });
});


// Handles deleting a word
app.delete('/dictionary/:id', function(req, res) {
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



/******************** SERVER **********************/

// Launch server
app.listen(3000, function() {
	console.log("Learn Spanish running on port 3000");
});



