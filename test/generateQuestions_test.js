function generateQuestion(phrase, relation, callback) {
    //phrase and relation not null
    var subjectType = relation.SubjectType;
    var objectType = relation.ObjectType;
    var firstMember = "<" + subjectType + "> " + phrase.Phrase + " <" + objectType + ">";
    var secondMember = "<" + subjectType + "> " + relation.RepresentativePhrase + " <" + objectType + ">";

    var question = "Does \"" + firstMember + "\" mean that \"" + secondMember + "\"?";
    callback(question);
}

function generateQuestions(phrases, relation, callback) {
    if(relation){
        var questions = [];
        var ids = [];
        if (phrases.length==0){
            callback(0, { questions: questions, ids: ids });
        } else {
            phrases.forEach(function (currentPhrase, index, phrasesRef) {
                generateQuestion(currentPhrase, relation, function (question) {
                    questions.push({ _id: currentPhrase._id, question: question });
                    ids.push(currentPhrase._id);
                    if (index == phrasesRef.length - 1) {
                        callback(0, { questions: questions, ids: ids });
                    }
                });
            });
        }
    } else {
        callback({message: 'ERR: Cannot generate questions! Input relation not exist.'}, null);
    }

}


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
generateQuestions(listPhrase_test, relation_test, function(err, data){
    if(err){
        console.log(err.message);
    } else {
        console.log("List of Questions");
        console.log(data.questions);                  //list of questions = list of string
        console.log();
    }
});


console.log('Test2: empty phrase list');
generateQuestions([], relation_test, function(err, data){
    if(err){
        console.log(err.message);
    } else {
        console.log("Empty list of Questions");
        console.log(data.questions);                  //list of questions = list of string
        console.log();
    }
});


console.log('Test3: Error');
generateQuestions(listPhrase_test, null, function(err, data){
    if(err){
        console.log(err.message);
    } else {
        console.log("List of Questions");
        console.log(data.questions);                  //list of questions = list of string
        console.log();
    }
});