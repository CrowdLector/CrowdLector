var QuestionGenerator = require(__base + "modules/QuestionGenerator");
var DynamicEngager = require(__base + "modules/DynamicEngager");
var RelationFacade = require(__base + "facades/RelationFacade");

var config = require("../config.js");

module.exports = {

	generate: function (userID, callback) {
		DynamicEngager.selectQuestionsForUserBufferedOpt(userID, config.QuestionsPerPage, config.minDiff, config.minNumberOfAnswers, function (err, Phrases) {
			if (err) {
				callback(err, null);
			}
			else if (Phrases.length == 0) {
				callback(0, []);
			}
			else {
				RelationFacade.show({ id: Phrases[0].Relation }, function (err, relationObj) {
					if (err) {
						//TODO gestire l'errore
						callback(err, null);
					} else {
						QuestionGenerator.generateQuestions(Phrases, relationObj, function (err, data) {
							if (err) {
								//TODO gestire l'errore
								callback(err, null);
							} else {
								callback(0, data);
							}
						});
					}
				});
			}
		});
	}

};