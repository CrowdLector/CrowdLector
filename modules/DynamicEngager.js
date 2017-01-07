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
	// takes a paged list of Relations
	RelationFacade.pagedList(page, resultsPerPage, function (err, relations) {
		if (err || relations.length == 0) {
			// If there are no relations left ends the stack of recursion with an error.
			// This means that no phrases are left for that user to evaluate.
			//console.log("relations.length == 0 is true, callback")
			callback(err, []);
		}
		else {
			// For each Relation obtained check if there are phrases to show.
			relations.every(function (relation, index, relationsRef) {
				// Phrases to show will be stored in this array, reinitialized for each Relation.
				var phrasesForUser = [];
				// Gets all the phrases by Relation.Name.
				PhraseFacade.listByRelationNameAndUserNotPresent(relation.Name, userId, function (err, phrases) {
					// For each Phrase checks if it has consensus and if the given user has already evalued it.
					if (err) {
						//console.log("err on phrases, callback")
						// If there are no phrases in DB for this relation
						callback(err, []);
						return false;
					}
					else if (phrases.length == 0 && index == relationsRef.length - 1) {
						// If this is the last iteration on relation and the db returned an empty list (user has already answered to that relation)
						selectQuestions(userId, ++page, resultsPerPage, minDiff, minAns, callback);
						return false;
					}
					else {
						phrases.every(function (phrase, i, phrasesRef) {
							hasConsensus(minDiff, minAns, phrase, function (phraseHasConsensus) {
								// If user has not evalued it AND Phrase doesn't have consensus, adds it to phrasesForUser
								if (!phraseHasConsensus)
									phrasesForUser.push(phrase);
								// If this is the last iteration of the inner loop and we have results then 
								// calls the callback and ends the recursion.
								if (i == phrasesRef.length - 1 && phrasesForUser.length != 0) {
									if (!hasCalled) {
										//console.log("phrases found, callback")
										callback(0, phrasesForUser);
										hasCalled = true;
									}
									return false;
								}
								// If this is the last iteration of both loops then recursively call selectQuestions on next page
								if (i == phrasesRef.length - 1 && index == relationsRef.length - 1 && phrasesForUser.length == 0)
									selectQuestions(userId, ++page, resultsPerPage, minDiff, minAns, callback);
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
	if (phrase.Answers.length < minAns || phrase.PositiveAnswerCount == phrase.NegativeAnswerCount)
		callback(false);
	else {
		diff = Math.abs(phrase.PositiveAnswerCount - phrase.NegativeAnswerCount);
		outcome = diff >= minDiff && phrase.Answers.length >= minAns;
		callback(outcome);
	}
}

module.exports = {
	selectQuestionsForUser: function (userId, callback) { hasCalled = false; selectQuestions(userId, 1, 1, 1, 2, callback); },
	selectQuestionsForUserBuffered: function (userId, bufferSize, callback) { hasCalled = false; selectQuestions(userId, 1, bufferSize, 1, 2, callback); },
	selectQuestionsForUserBufferedOpt: function (userId, bufferSize, minDiff, minAns, callback) { hasCalled = false; selectQuestions(userId, 1, bufferSize, minDiff, minAns, callback); },
	hasConsensus: function (phrase, callback) { hasConsensus(1, 2, phrase, callback); },
	hasConsensusOpt: function (minDiff, minAns, phrase, callback) { hasConsensus(minDiff, minAns, phrase, callback); }
};