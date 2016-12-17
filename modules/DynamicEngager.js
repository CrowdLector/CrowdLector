var RelationFacade = require('../facade/RelationFacade.js');
var PhraseFacade = require('../facade/PhraseFacade.js');
var UsersFacade = require('../facade/UsersFacade.js');

/**
 * selectQuestions(userId, page, resultsPerPage, callback)
 *
 * @description :: Selects the phrases to show to the user. 
 * Starts from a bunch of Relations (from page 1 and at least 1 resultsPerPage),
 * then verifies that there is at least 1 phrase to show to that user, 
 * if not goes to the next page, if there is at least 1 phrase, puts it in a callback.
 * Returns database error if no phrases are left for any Relation.
 * 
 * Exported version hides recursion and takes less arguments. See module.export.
 */
function selectQuestions(userId, page, resultsPerPage, callback) {
    RelationFacade.pagedList(page, resultsPerPage, function (err, data){
        if(err){
            callback(err, null);
        }
        else {
            data.forEach(function(relation, index, relations){
                var phrasesForUser = [];
                PhraseFacade.listByRelationName(relation.Name, function(err, phrases){
                    phrases.forEach(function(phrase, i, phrasesRef){
                        hasConsensus(phrase.Answers, function(outcome){
                           // console.log('Answers: ' + phrase.Answers + ' outcome: '  + outcome + ' user id index: ' + 
                           // phrase.Users.indexOf(userId) + ' utenti per frase: ' + phrase.Users +
                           // ' user id ' + userId);
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
    selectQuestionsForUser: function(userId, callback) { selectQuestions(userId, 1, 1, callback); },
    selectQuestionsForUserBuffered: function(userId, bufferSize, callback) { selectQuestions(userId, 1, bufferSize, callback); }
}
