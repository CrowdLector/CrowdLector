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
    // takes a paged list of Relations
    RelationFacade.pagedList(page, resultsPerPage, function (err, relations){
        if(err){
            // If there are no relations left ends the stack of recursion with an error.
            // This means that no phrases are left for that user to evaluate.
            callback(err, null);
        }
        else {
            // For each Relation obtained check if there are phrases to show.
            relations.every(function(relation, index, relationsRef){
                // Phrases to show will be stored in this array, reinitialized for each Relation.
                var phrasesForUser = [];
                // Gets all the phrases by Relation.Name.
                PhraseFacade.listByRelationName(relation.Name, function(err, phrases){
                    // For each Phrase checks if it has consensus and if the given user has already evalued it.
                    phrases.every(function(phrase, i, phrasesRef){
                        hasConsensus(phrase.Answers, function(phraseHasConsensus){
                            // debug
                            /*
                            console.log('Answers: ' + phrase.Answers + ' outcome: '  + outcome + ' user id index: ' + 
                            phrase.Users.indexOf(userId) + ' utenti per frase: ' + phrase.Users +
                            ' user id ' + userId); 
                            */
                            // If user has not evalued it AND Phrase doesn't have consensus, adds it to phrasesForUser
                            if(phrase.Users.indexOf(userId) == -1 && !phraseHasConsensus)
                                phrasesForUser.push(phrase);
                            // If this is the last iteration of the inner loop and we have results then 
                            // calls the callback and ends the recursion.
                            if(i == phrasesRef.length - 1 && phrasesForUser.length != 0) {
                                callback(0, phrasesForUser);
                                return false;
                            }
                            // If this is the last iteration of both loops then recursively call selectQuestions on next page
                            if(i == phrasesRef.length - 1 && index == relationsRef.length - 1 && phrasesForUser.length == 0)
                                selectQuestions(userId, ++page, resultsPerPage, callback);
                                return false;
                            })
                            // else continue looping on phrases
                            return true;
                    })
                });
                // If phrasesForUser has obtained stuff from at least 1 phrase then exit the loop on relations
                if(phrasesForUser.length != 0) return false;
                // else continue looping on relations
                else return true;
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
