// Initialise "Word" schema as Model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define "Word" object schema
var wordSchema = mongoose.Schema({
	eng: String,
	esp: String,
	type: String,
});

module.exports = mongoose.model('Word', wordSchema);