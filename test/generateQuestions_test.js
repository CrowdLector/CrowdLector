var QuestionGenerator = require('../modules/QuestionGenerator');

var relation_test = {
    'Name' : 'place_of_birth',
    'RepresentativePhrase' : 'was born in',
    'ObjectType' : 'location',
    'SubjectType' : 'person'
};

var listPhrase_test = [
    {
        'RelationName' : 'place_of_birth',
        'Phrase' : 'grew up in',
        'Answers' : [],
        'Users' : []
    },
    {
        'RelationName' : 'place_of_birth',
        'Phrase' : 'is a',
        'Answers' : [],
        'Users' : []
    },
    {
        'RelationName' : 'place_of_birth',
        'Phrase' : 'was a native of',
        'Answers' : [],
        'Users' : []
    }
];

console.log('*** TEST ***');
console.log('Test1: All is ok');
QuestionGenerator.generateQuestions(listPhrase_test, relation_test, function(err, data){
    if(err){
        console.log(err.message);
    } else {
        console.log("List of Questions");
        console.log(data);                  //list of questions = list of string
        console.log();
    }
});


console.log('Test2: empty phrase list');
QuestionGenerator.generateQuestions([], relation_test, function(err, data){
    if(err){
        console.log(err.message);
    } else {
        console.log("Empty list of Questions");
        console.log(data);                  //list of questions = list of string
        console.log();
    }
});


console.log('Test3: Error');
QuestionGenerator.generateQuestions(listPhrase_test, null, function(err, data){
    if(err){
        console.log(err.message);
    } else {
        console.log("List of Questions");
        console.log(data);                  //list of questions = list of string
        console.log();
    }
});