var PhraseModel = require('../models/PhraseModel.js');

/**
 * PhraseHelper.js
 *
 * @description :: Server-side logic for managing Phrases.
 */
module.exports = {

    /**
     * PhraseFacade.pagedList()
     * @param {number} page Number of the page to retreive
     * @param {number} resultsPerPage Number of items per page
     * @param {function} callback Function with two parameters, err and data
     */
	pagedList: function (page, resultsPerPage, callback) {
		PhraseModel.find().sort({ RelationName: -1 }).skip((page - 1) * resultsPerPage).limit(resultsPerPage).exec(function (err, Phrases) {
			if (err) {
				callback({
					code: 500,
					message: 'Error when getting Relation.',
					error: err
				}, null);
			} else {
				callback(0, Phrases); //200
			}
		});
	},

	/**
	* PhraseFacade.listByRelationName()
	* @param {string} relationName Name of the relation to be retreived
	* @param {function} callback Function with two parameters, err and data
	*/
	listByRelationName: function (relationName, callback) {
		PhraseModel.find({ 'RelationName': relationName }).populate('Users').sort({ 'Score': -1 }).exec(function (err, Phrases) {
			if (err) {
				callback({
					code: 500,
					message: 'Error when getting Phrase.',
					error: err
				}, null);
			} else {
				callback(0, Phrases); //200
			}
		});
	},

    /**
     * PhraseFacade.listPositive()
     * @param {string} minNumber min number of Answer before being counted as positive 
     * @param {function} callback Function with two parameters, err and data
     */
	listPositive: function (minNumber, minDiff, callback) {
		PhraseModel.find({ $where: "this.PositiveAnswerCount>this.NegativeAnswerCount && this.PositiveAnswerCount>=" + minNumber + "&& (this.PositiveAnswerCount-this.NegativeAnswerCount >= " + minDiff + " || this.NegativeAnswerCount-this.PositiveAnswerCount >= " + minDiff + ")" })
			.sort({ 'Score': -1 }).exec(function (err, Phrases) {
			if (err) {
				callback({
					code: 500,
					message: 'Error when getting Phrase.',
					error: err
				}, null);
			} else {
				callback(0, Phrases); //200
			}
		});
	},

    /**
     * PhraseFacade.listNegative()
     * @param {string} minNumber min number of Answer before being counted as negative 
     * @param {function} callback Function with two parameters, err and data
     */
	listNegative: function (minNumber, minDiff, callback) {
		PhraseModel.find({ $where: "this.PositiveAnswerCount<this.NegativeAnswerCount && this.NegativeAnswerCount >= " + minNumber + "&& (this.PositiveAnswerCount - this.NegativeAnswerCount >= " + minDiff + " || this.NegativeAnswerCount - this.PositiveAnswerCount >= " + minDiff + ")" })
			.sort({ 'Score': -1 }).exec(function (err, Phrases) {
			if (err) {
				callback({
					code: 500,
					message: 'Error when getting Phrase.',
					error: err
				}, null);
			} else {
				callback(0, Phrases); //200
			}
		});
	},

    /**
     * PhraseFacade.listNotDecided()
     * @param {string} minNumber min number of Answer before being counted  
     * @param {function} callback Function with two parameters, err and data
     */
	listNotDecided: function (minNumber, minDiff, callback) {
		PhraseModel.find({ $where: "this.PositiveAnswerCount==this.NegativeAnswerCount || (this.NegativeAnswerCount + this.PositiveAnswerCount)<" + minNumber + "|| (this.PositiveAnswerCount - this.NegativeAnswerCount < " + minDiff + " && this.NegativeAnswerCount - this.PositiveAnswerCount < " + minDiff + ")" })
			.sort({ 'Score': -1 }).exec(function (err, Phrases) {
			if (err) {
				callback({
					code: 500,
					message: 'Error when getting Phrase.',
					error: err
				}, null);
			} else {
				callback(0, Phrases); //200
			}
		});
	},



    /**
     * PhraseFacade.listByRelationNameAndUserNotPresent()
     * @param {string} relationName Name of the relation to be retreived
     * @param {string} userId Id of the user that doesn't have to be in the Users array
     * @param {function} callback Function with two parameters, err and data
     */
	listByRelationNameAndUserNotPresent: function (relationName, userId, callback) {
		PhraseModel.find({ 'RelationName': relationName, 'Users': { $ne: userId } }).sort({ 'Score': -1 }).exec(function (err, Phrases) {
			if (err) {
				callback({
					code: 500,
					message: 'Error when getting Phrase.',
					error: err
				}, null);
			} else {
				callback(0, Phrases); //200
			}
		});
	},

    /**
     * PhraseFacade.list()
     * @param {function} callback Function with two parameters, err and data
     */
	list: function (callback) {
		PhraseModel.find(function (err, Phrases) {
			if (err) {
				callback({
					code: 500,
					message: 'Error when getting Phrase.',
					error: err
				}, null);
			} else {
				callback(0, Phrases); //200
			}
		});
	},

    /**
     * PhraseFacade.show()
     * @param {object} params Object to store parameters of the function 
     * @param {function} callback Function with two parameters, err and data
     */
	show: function (params, callback) {
		PhraseModel.findOne({ _id: params.id }, function (err, Phrase) {
			if (err) {
				callback({
					code: 500,
					message: 'Error when getting Phrase.',
					error: err
				}, null);
			}
			else {
				if (!Phrase) {
					callback({
						code: 404,
						message: 'No such Phrase'
					}, null);
				} else {
					callback(0, Phrase); //200
				}
			}
		});
	},

    /**
     * PhraseFacade.create()
     * @param {json} params object with data
     * @param {function} callback Function with two parameters, err and data
     */
	create: function (params, callback) {
		var Phrase = new PhraseModel(params.newObj);

		Phrase.save(function (err, Phrase) {
			if (err) {
				callback({
					code: 500,
					message: 'Error when creating Phrase',
					error: err
				}, null);
			} else {
				callback(0, Phrase); //201
			}
		});
	},

    /**
     * PhraseFacade.update()
     * @param {json} params object with data
     * @param {function} callback Function with two parameters, err and data
     */
	update: function (params, callback) {
		PhraseModel.findOne({ _id: params.id }, function (err, Phrase) {
			if (err) {
				callback({
					code: 500,
					message: 'Error when getting Phrase',
					error: err
				}, null);
			} else {
				if (!Phrase) {
					callback({
						code: 404,
						message: 'No such Phrase'
					}, null);
				} else {
					Phrase.Relation = params.modifiedObj.Relation ? params.modifiedObj.Relation : Phrase.Relation;
					Phrase.Phrase = params.modifiedObj.Phrase ? params.modifiedObj.Phrase : Phrase.Phrase;
					Phrase.Score = params.modifiedObj.Score ? params.modifiedObj.Score : Phrase.Score;
					Phrase.Answer = params.modifiedObj.Answer ? params.modifiedObj.Answer : Phrase.Answer;
					Phrase.Users = params.modifiedObj.Users ? params.modifiedObj.Users : Phrase.Users;

					Phrase.save(function (err, Phrase) {
						if (err) {
							callback({
								code: 500,
								message: 'Error when updating Phrase.',
								error: err
							}, null);
						} else {
							callback(0, Phrase); //200
						}
					});
				}
			}
		});
	},

    /**
     * PhraseFacade.remove()
     * @param {json} params object with data
     * @param {function} callback Function with two parameters, err and data
     */
	remove: function (params, callback) {
		PhraseModel.findByIdAndRemove(params.id, function (err, Phrase) {
			if (err) {
				callback({
					code: 500,
					message: 'Error when deleting the Phrase.',
					error: err
				}, null);
			} else {
				callback(0, null); //204
			}
		});
	},

	addAnswer: function (params, callback) {
		var query;
		if (params.value == 1)
			query = { $push: { "Answers": params.value }, $inc: { "PositiveAnswerCount": 1 } };
		else
			query = { $push: { "Answers": params.value }, $inc: { "NegativeAnswerCount": 1 } };
		PhraseModel.update({ _id: params.id }, query, function (err, model) {
			if (err) {
				callback({
					code: 500,
					message: 'Error when adding Answer to the Phrase.',
					error: err
				}, null);
			} else {
				callback(0, model); //204
			}
		});
	},

	addUser: function (params, callback) {
		PhraseModel.update({ _id: params.id }, { $push: { "Users": params.value } }, function (err, model) {
			if (err) {
				callback({
					code: 500,
					message: 'Error when adding User to the Phrase.',
					error: err
				}, null);
			} else {
				callback(0, model); //204
			}
		});
	}
};
