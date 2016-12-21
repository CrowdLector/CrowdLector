var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
	'Name' : {type: String, required: false},
	'Surname' : {type: String, required: false},
	'Email' : {type: String, required: true, unique: true},
});

module.exports = mongoose.model('User', UserSchema);
