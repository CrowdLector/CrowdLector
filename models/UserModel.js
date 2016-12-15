var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
	'Nome' : {type: String, required: false},
	'Cognome' : {type: String, required: false},
	'Email' : {type: String, required: true},
});

module.exports = mongoose.model('User', UserSchema);
