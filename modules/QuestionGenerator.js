var RelationFacade = require('../facades/RelationFacade.js');


module.exports = {
    generateQuestion : function(phrase, relation, callback) {
        /*phrase and relation not null*/
        var subjectType = relation.SubjectType;
        var objectType = relation.ObjectType;
        var firstMember = "<" + subjectType + "> " + relation.RepresentativePhrase + " <" + objectType + ">";
        var secondMember = "<" + subjectType + "> " + phrase.Phrase + " <" + objectType + ">";
        var question = "Does \"" + firstMember + "\" mean that \"" + secondMember + "\"?";
        callback(question);
    }
};