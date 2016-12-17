function generateQuestion(phrase, relation, callback) {
    /*phrase and relation not null*/
    var subjectType = relation.SubjectType;
    var objectType = relation.ObjectType;
    var firstMember = "<" + subjectType + "> " + relation.RepresentativePhrase + " <" + objectType + ">";
    var secondMember = "<" + subjectType + "> " + phrase.Phrase + " <" + objectType + ">";
    var question = "Does \"" + firstMember + "\" mean that \"" + secondMember + "\"?";
    callback(question);
}

var relationtest = {
    'Name' : 'place_of_birth',
    'RepresentativePhrase' : 'was born in',
    'ObjectType' : 'location',
    'SubjectType' : 'person'
};
var phrasetest = {
    'RelationName' : 'place_of_birth',
    'Phrase' : 'grew up in',
    'Answers' : [],
    'Users' : []
};

generateQuestion(phrasetest, relationtest, function(question){
    console.log(question);
});




/*
--- ALTERNATIVE TEST USING MONGODB ---

var mongoose = require('mongoose');
var relationFacade = require('../facades/RelationFacade.js');
var phraseFacade = require('../facades/PhraseFacade.js');
var QuestionGenerator = require('../modules/QuestionGenerator.js');

mongoose.connect('mongodb://localhost/TestLectorDB');


var params = {
    newObj : {
        Name : 'places_lived',
        RepresentativePhrase : 'resides in',
        SubjectType : 'person',
        ObjectType : 'location'
    }
};



relationFacade.create(params, function(err, relation){          //relation is the relation inserted in DB
    //console.log(relation);
    if(err==201) {                  //tutto ok
        var params2 = {
            newObj : {
                Relation: relation,
                RelationName: relation.Name,
                Phrase: 'grew up in',
                Anwser: [],
                Utenti: []
            }
        };
        phraseFacade.create(params2, function(err, phrase){
            if(err==201){
                QuestionGenerator.generateQuestion(phrase, relation, function(question){
                    console.log("Test del metodo generateQuestion");
                    console.log(question);
                });
            }
        });
    } else {
        console.log(relation);
    }
});      
*/



