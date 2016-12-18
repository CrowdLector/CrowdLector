var RelationFacade = require('../facade/RelationFacade.js');
var PhraseFacade = require('../facade/PhraseFacade.js');
var UsersFacade = require('../facade/UsersFacade.js');

/**
 * phraseState (page, resultsPerPage,phrasesCorrect,phrasesWrong,phrasesNotEnded, callback)
 *
 * @description :: Sort in three array the phrases: correct, wrong and not ended. 
 * Starts from a bunch of Phrases (from page 1 and at least 1 resultsPerPage),
 * then verifies that there is at least 1 phrase to show to that user, 
 * if not goes to the next page, if there is at least 1 phrase, puts it in a callback.
 * Returns database error if no phrases are left for any Relation.
 * 
 * Exported version hides recursion and takes less arguments. See module.export.
 */
function phraseState(page, resultsPerPage,phrasesCorrect,phrasesWrong,phrasesNotEnded, callback) {
    // takes a paged list of Phrase
    PhraseFacade.pagedList(page, resultsPerPage, function (err, phrases){
        if(err){
            // controlla se ho frasi. se non ne ho vuol dire che lo schema è vuoto
            callback(err, phrasesNotEnded,phrasesCorrect,phrasesWrong);
        }
        else {
            // For each phrase obtained check the array of answer 
            phrases.every(function(phrase, index, phraseRef){
                        isEnded(phrase.Answers, function(restultEnded){
                            // if phrases is not ended
                            if(resultEnded==0)
                                phrasesNotEnded.push(phrase);
                            else
                                //if phrases is ended and correct
                                if(resultEnded==1)
                                    phrasesCorrect.push(phrase)
                                else
                                //if phrases is ended and wrong
                                    phrasesWrong.push(phrase)
                            // last iteration
                            // calls the callback and ends the recursion.
                           /* if(phrasesRef.length == 0) {
                                callback(0, phrasesNotEnded,phrasesCorrect,phrasesWrong);
                                return false;
                            }*/
                            // next page
                            if(index == phrasesRef.length - 1 && phrasesRef.length != 0)
                                phraseState(++page, resultsPerPage, phrasesCorrect,phrasesWrong,phrasesNotEnded, callback);
                                return false;
                            })
                            // else continue looping on phrases
                            return true;
                    })
                // If phrasesForUser has obtained stuff from at least 1 phrase then exit the loop on relations
                if(phrasesForUser.length != 0) return false;
                // else continue looping on relations
                else return true;
        }
    });
}  

/**
 * isEnded(answers, callback) 
 *
 * @description :: Decide if a phrase is ended and correct(1), ended and wrong (2) or not ended (0). 
 */
function isEnded(answers, callback) {
    var count = 0;
    if(answers.length <= 2){
        callback(false);
        return;
    }
    answers.forEach(function(answer, i, answersRef){
            count = answer ? count+1: count;
            if(i == answersRef.length - 1){
                zeros = answersRef.length - count;
                if (zeros==count){
                    callback(0)
                }
                else{
                    if(zeros<count){
                        callback(1)
                    }
                    else{
                        callback(2)
                    }

            } 
            }
        });   
}


module.export = {
    phraseStateForUser: function(callback) { phraseState(1, 1,[],[],[], callback); },
    phraseStateForUserBuffered: function(bufferSize, callback) { phraseState(1, bufferSize,[],[],[], callback); },
    isEnded: function(phrase, callback){isEnded(phrase.Answers, callback);}
}
