var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var PhraseSchema = new Schema({
	'Relation' : {
		type: Schema.Types.ObjectId,
		ref: 'Relation'
	},
	'RelationName': { type: String, required: true }, // redundant for find without join
	'Phrase': { type: String, required: true },
	'Score': { type: Number, default: 0 },
	'Answers' : [Boolean],
	'PositiveAnswerCount': { type: Number, default: 0 },
	'NegativeAnswerCount': { type: Number, default: 0 },
	'Users': [Schema.Types.ObjectId],
	'ManualEvaluation': { type: String }
});

module.exports = mongoose.model('Phrase', PhraseSchema);