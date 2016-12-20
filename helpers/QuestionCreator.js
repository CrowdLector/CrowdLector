var QuestionGenerator = require(__base + "modules/QuestionGenerator");
var DynamicEngager = require(__base + "modules/DynamicEngager");
var RelationFacade = require(__base + "facades/RelationFacade");

var config = require("../config.js");

module.exports = {

    generate: function (userID, callback) {
        DynamicEngager.selectQuestionsForUserBuffered(userID, config.QuestionsPerPage, function (err, Phrases) {
            if (err) {
                //TODO Gesire l'errore
                callback(err, null);
            } else {
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