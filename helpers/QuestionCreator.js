var QuestionGenerator = require("../modules/QuestionGenerator.js");
var DynamicEngager = require("../modules/DynamicEngager.js");

var config = require("../config.js");

module.exports = {

    generate: function (userID, callback) {
        DynamicEngager.selectQuestionsForUserBuffered(userID, config.QuestionsPerPage, function (err, data) {
            if (err) {
                //TODO Gesire l'errore
            }
            console.log(data);
            callback();
        });
    }

};