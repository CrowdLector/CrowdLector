var QuestionGenerator = require(__base + "modules/QuestionGenerator");
var DynamicEngager = require(__base + "modules/DynamicEngager");

var config = require("../config.js");

module.exports = {

    generate: function (userID, callback) {
        DynamicEngager.selectQuestionsForUserBuffered(userID, config.QuestionsPerPage, function (err, data) {
            if (err) {
                //TODO Gesire l'errore
            }
            console.log(data);
            callback(0, null);
        });
    }

};