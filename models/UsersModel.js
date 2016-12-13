var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UsersSchema = new Schema({	'Nome' : String,	'Cognome' : String,	'Email' : String});

module.exports = mongoose.model('Users', UsersSchema);
