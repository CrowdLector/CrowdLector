
//set resultsPerPage = 1
function selectQuestions(userId, page, resultsPerPage, callback) {
    /*RelationFacade.*/pagedList(page, resultsPerPage, function (err, data){
        if(err){
            callback(err, null);
        }
        else {
            data.forEach(function(relation, index, relations){
                var phrasesForUser = [];
                /*PhraseFacade.*/listByRelationName(relation.Name, function(err, phrases){
                    phrases.forEach(function(phrase, i, phrasesRef){
                        hasConsensus(phrase.Answers, function(outcome){
                            console.log('Answers: ' + phrase.Answers + ' outcome: '  + outcome + ' user id index: ' + 
                            phrase.Users.indexOf(userId) + ' utenti per frase: ' + phrase.Users +
                            ' user id ' + userId);
                            if(phrase.Users.indexOf(userId) == -1 && !outcome)
                                phrasesForUser.push(phrase);
                            if(i == phrasesRef.length - 1 && index == data.length - 1)
                                if(phrasesForUser.length == 0)
                                    selectQuestions(userId, ++page, resultsPerPage, callback);
                                else 
                                    callback(0, phrasesForUser);
                        })
                    })
                });
            })
        }
    });
}  

function hasConsensus(answers, callback) {
    var count = 0;
    if(answers.length <= 1){
        callback(false);
        return;
    }
    answers.forEach(function(answer, i, answersRef){
            count = answer ? count+1: count;
            if(i == answersRef.length - 1){
                zeros = answersRef.length - count;
                outcome = zeros != count && answersRef.length > 0;
                callback(outcome);
            } 
        });   
}

module.export = {
    selectQuestions: function(userId, callback) { selectQuestions(userId, 1, 1, callback); },
    selectQuestionsBuffered: function(userId, bufferSize, callback) { selectQuestions(userId, 1, bufferSize, callback); }
}



// test

function pagedList(page, resultsPerPage, callback) {
        // supposed 2 results
                callback(0, [{
	'Name' : 'Spouse',
	'RepresentativePhrase' : 'is married to',
	'ObjectType' : 'Person',
	'SubjectType' : 'Person'
}, {
	'Name' : 'Spouse2',
	'RepresentativePhrase' : 'is married to',
	'ObjectType' : 'Person',
	'SubjectType' : 'Person'
}]);
    }

 function listByRelationName(relationName, callback) {
     if(relationName == 'Spouse')
    callback(0, 	[{
	'RelationName' : 'Spouse',
	'Phrase' : 'met',
	'Answers' : [0,1],
	'Users' : [1,3]
            },
            {
	'RelationName' : 'Spouse', // redundant for find without join
	'Phrase' : 'has married',
	'Answers' : [0],
	'Users' : [1]
                       }]);
                       else 
                       callback(0, 	[{
	'RelationName' : 'Spouse2',
	'Phrase' : 'met2',
	'Answers' : [0,1],
	'Users' : [3]
            },
            {
	'RelationName' : 'Spouse2', // redundant for find without join
	'Phrase' : 'has married2',
	'Answers' : [0],
	'Users' : [1]
                       }]);
    }

//hasConsensus([0], function(outcome){ console.log(outcome) });
selectQuestions(1, 1, 2, function(err, phrases){console.log(phrases)});