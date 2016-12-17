relationFacade = require('./template_test').relationFacade;
phraseFacade = require('./template_test').phraseFacade;
var QuestionGenerator = require('../modules/QuestionGenerator.js');

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


