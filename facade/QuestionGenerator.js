var mongoose = require('mongoose');

var RelationModel = require('../models/RelationModel.js');
var QuestionModel = require('../models/QuestionModel.js');

var RelationFacade = require('./RelationFacade.js');


module.exports = {
    generateQuestion : function(phrase, representativePhrase, callback) {
        RelationFacade.findRelationByRepresentativePhrase(representativePhrase, function (relation) {
            if(relation) {
                var subjectType = relation.SubjectType;
                var objectType = relation.ObjectType;
                var firstMember = "<" + subjectType + "> " + representativePhrase + " <" + objectType + ">";
                var secondMember = "<" + subjectType + "> " + phrase + " <" + objectType + ">";
                var question = "Does \"" + firstMember + "\" mean that \"" + secondMember + "\"?";

                callback(question)
            }
            else
                return console.log("Relation Not Exist!")
        });
    }
}