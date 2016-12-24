var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var RelationSchema = new Schema({
	'Name': { type: String, required: true },
	'RepresentativePhrase': { type: String, required: true },
	'ObjectType': { type: String, required: true },
	'SubjectType': { type: String, required: true }
});

module.exports = mongoose.model('Relation', RelationSchema);
