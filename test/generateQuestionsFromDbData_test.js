var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/CrowdLector');

var RelationFacade = require('../facades/RelationFacade');
var PhraseFacade = require('../facades/PhraseFacade');
var QuestionGenerator = require('../modules/QuestionGenerator');


console.log('*** TEST with DB data ***');
console.log('Generation of questions for \"place_of_birth\" relation');

RelationFacade.findRelationByName({name : 'place_of_birth'}, function(err, data){
    if(err){
        console.log(err.message);
    } else {
        var relation = data[0];             //data is a list of relations
        PhraseFacade.listByRelationName(data[0].Name, function(err, Phrases){
            if(err)
                console.log(err.message);
            else {
                //console.log(Phrases);
                //console.log('#phrases for relation: '+Phrases.length);
                QuestionGenerator.generateQuestions(Phrases, data[0], function(err, data){
                    if(err){
                        console.log(err.message);
                    } else {
                        console.log("List of Questions:");
                        console.log(data);
                        //console.log('#question for relation: '+data.length);
                        console.log();
                    }
                });
            }

        });
    }
});
