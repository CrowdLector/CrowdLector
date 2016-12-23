var RelationFacade = require(__base + 'facades/RelationFacade');
var PhraseFacade = require(__base + 'facades/PhraseFacade');

var hasCalled = false;

/**
 * selectQuestions(userId, page, resultsPerPage, minDiff, minAns, callback)
 *
 * @description :: Selects the phrases to show to the user. 
 * Starts from a bunch of Relations (from page 1 and at least 1 resultsPerPage),
 * then verifies that there is at least 1 phrase to show to that user, 
 * if not goes to the next page, if there is at least 1 phrase, puts it in a callback.
 * Returns database error if no phrases are left for any Relation.
 * 
 * Exported version hides recursion and takes less arguments. See module.export.
 */
function selectQuestions(userId, page, resultsPerPage, minDiff, minAns, callback) {
    hasCalled = false;
    // takes a paged list of Relations
    RelationFacade.pagedList(page, resultsPerPage, function (err, relations) {
        if(err){
            // If there are no relations left ends the stack of recursion with an error.
            // This means that no phrases are left for that user to evaluate.
            callback(err, null);
        }
        else {
            // For each Relation obtained check if there are phrases to show.
            relations.every(function (relation, index, relationsRef) {
                // Phrases to show will be stored in this array, reinitialized for each Relation.
                var phrasesForUser = [];
                // Gets all the phrases by Relation.Name.
                PhraseFacade.listByRelationNameAndUserNotPresent(relation.Name, userId, function (err, phrases) {
                    // For each Phrase checks if it has consensus and if the given user has already evalued it.
                     if(err){
                         // If there are no phrases in DB for this relation
                         callback(err, null);
                    }
                    else {
                    phrases.every(function (phrase, i, phrasesRef) {
                        hasConsensus(minDiff, minAns, phrase, function (phraseHasConsensus) {
                            // debug
                            /*
                            console.log('Answers: ' + phrase.Answers + ' phraseHasConsensus: '  + phraseHasConsensus + ' user id index: ' + 
                            phrase.Users.indexOf(userId) + ' utenti per frase: ' + phrase.Users +
                            ' user id ' + userId); 
                            */
                            // If user has not evalued it AND Phrase doesn't have consensus, adds it to phrasesForUser
                            if (!phraseHasConsensus)
                                phrasesForUser.push(phrase);
                            // If this is the last iteration of the inner loop and we have results then 
                            // calls the callback and ends the recursion.
                            if (i == phrasesRef.length - 1 && phrasesForUser.length != 0) {
                                if (!hasCalled) {
                                    callback(0, phrasesForUser);
                                    hasCalled = true;
                                }
                                return false;
                            }
                            // If this is the last iteration of both loops then recursively call selectQuestions on next page
                            if (i == phrasesRef.length - 1 && index == relationsRef.length - 1 && phrasesForUser.length == 0)
                                selectQuestions(userId, ++page, resultsPerPage, callback);
                            relationsRef = []; // reset array to free space
                            phrasesRef = []; // reset array to free space
                            return false;
                        });
                        // else continue looping on phrases
                        return true;
                    });
                }
                });
                // If phrasesForUser has obtained stuff from at least 1 phrase then exit the loop on relations
                if (phrasesForUser.length != 0) return false;
                // else continue looping on relations
                else return true;
            });
        }
    });
}

function hasConsensus_old(answers, callback) {
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

/**
 * hasConsensus(minDiff, minAns, phrase, callback)
 *
 * @description :: Returns true if there is consensus between answers for that phrase,
 * false otherwise.
 * Takes minDiff (minimum difference between answers) and minAns (minimum number of answers)
 * as parameters to check the consensus.
 * 
 * 2 exported version available: 1 with initialized parameters, 1 with open parameters.
 */
function hasConsensus(minDiff, minAns, phrase, callback) {
    if(phrase.Answers.length <= 1)
        callback(false);
    else{
    diff = Math.abs(phrase.PositiveAnswerCount - phrase.NegativeAnswerCount);
    outcome = diff >= minDiff && (phrase.PositiveAnswerCount >= minAns || phrase.NegativeAnswerCount >= minAns);
    callback(outcome);
    }
}

module.exports = {
    selectQuestionsForUser: function (userId, callback) { selectQuestions(userId, 1, 1, 1, 2, callback); },
    selectQuestionsForUserBuffered: function (userId, bufferSize, callback) { selectQuestions(userId, 1, bufferSize, 1, 2, callback); },
    selectQuestionsForUserBufferedOpt: function (userId, bufferSize,  minDiff, minAns, callback) { selectQuestions(userId, 1, bufferSize, minDiff, minAns, callback); },
    hasConsensus: function (phrase, callback) { hasConsensus(1, 2, phrase, callback); },
    hasConsensus: function (minDiff, minAns, phrase, callback) { hasConsensus(minDiff, minAns, phrase, callback); }
};