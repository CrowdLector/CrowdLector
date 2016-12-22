var PhraseFacade = require('../facades/PhraseFacade.js');

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
function phraseState(minNumber,callback) {
    // takes a paged list of Phrase
    PhraseFacade.listPositive(minNumber,function(err,positives){
        if (err)
            callback(err,null,null,null);
        else{
            PhraseFacade.listNegative(minNumber,function(err,negatives){
                if (err)
                    callback(err,positives,null,null);
                else{
                    PhraseFacade.listNotDecided(minNumber,function(err,notDecided){
                        if (err)
                            callback(err,positives,negatives,null);
                        else{
                            callback(0,positives,negatives,notDecided);
                        }
                    });
                }
            });
        }
    });
}

module.exports={
    PhraseStateNumber2: function(callback){ phraseState(2,callback); },
    PhraseState: function(minNumber, callback){ phraseState(minNumber,callback); }
};