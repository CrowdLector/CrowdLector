// test
/*
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/CrowdLector');*/

var RelationFacade = require('../facades/RelationFacade');
var PhraseFacade = require('../facades/PhraseFacade');

var hasCalled = false;

function selectQuestions(userId, page, resultsPerPage, minDiff, minAns, callback) {
    hasCalled = false;
    // takes a paged list of Relations
   /* RelationFacade.*/pagedList(page, resultsPerPage, function (err, relations) {
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
                /*PhraseFacade.*/listByRelationNameAndUserNotPresent(relation.Name, userId, function (err, phrases) {
                    // For each Phrase checks if it has consensus and if the given user has already evalued it.
                     if(err){
                         // If there are no phrases in DB for this relation
                         callback(err, null);
                    }
                    else {
                    phrases.every(function (phrase, i, phrasesRef) {
                        hasConsensus2(minDiff, minAns, phrase, function (phraseHasConsensus) {
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

function hasConsensus(minDiff, minAns, phrase) {
    if(phrase.Answers.length <= 1)
        return false;
    else{
    diff = Math.abs(phrase.PositiveAnswerCount - phrase.NegativeAnswerCount);
    return diff >= minDiff && (phrase.PositiveAnswerCount >= minAns || phrase.NegativeAnswerCount >= minAns);
    }
}

function hasConsensus2(minDiff, minAns, phrase, callback) {
    if(phrase.Answers.length <= 1)
        callback(false);
    else{
    diff = Math.abs(phrase.PositiveAnswerCount - phrase.NegativeAnswerCount);
    outcome = diff >= minDiff && (phrase.PositiveAnswerCount >= minAns || phrase.NegativeAnswerCount >= minAns);
    callback(outcome);
    }
}

// test

function pagedListErr(page, resultsPerPage, callback) {
    // supposed 2 results
    callback({ 
                code: 500,
                message: 'Error when getting Relation.',
                //error: err
            }, null);
}

function pagedList(page, resultsPerPage, callback) {
    // supposed 2 results
    callback(0, [
        {
            'Name': 'Spouse',
            'RepresentativePhrase': 'is married to',
            'ObjectType': 'Person',
            'SubjectType': 'Person'
        },
        {
            'Name': 'Spouse2',
            'RepresentativePhrase': 'is married to',
            'ObjectType': 'Person',
            'SubjectType': 'Person'
        }
    ]);
}

function listByRelationName(relationName, callback) {
    if (relationName == 'Spouse')
        callback(0, [
            {
                'RelationName': 'Spouse',
                'Phrase': 'met',
                'Answers': [0, 1],
                'Users': [3, 2]
            },
            {
                'RelationName': 'Spouse', // redundant for find without join
                'Phrase': 'has married',
                'Answers': [0, 0],
                'Users': [1, 3]
            }
        ]);
    else
        callback(0, [
            {
                'RelationName': 'Spouse2',
                'Phrase': 'met2',
                'Answers': [0, 1],
                'Users': [1, 3]
            },
        {
            'RelationName': 'Spouse2', // redundant for find without join
            'Phrase': 'has married2',
            'Answers': [0],
            'Users': [1]
        }
        ]);
}

function listByRelationNameAndUserNotPresent(relationName, userId, callback) {
    if (relationName == 'Spouse')
        callback(0, [
            {
                'RelationName': 'Spouse',
                'Phrase': 'met',
                'Answers': [0, 1, 0],
                'PositiveAnswerCount' : 1,
	            'NegativeAnswerCount' : 2,
                'Users': [3, 2]
            },
            {
                'RelationName': 'Spouse', // redundant for find without join
                'Phrase': 'has married',
                'Answers': [0, 0],
                'PositiveAnswerCount' : 0,
	            'NegativeAnswerCount' : 2,
                'Users': [1, 3]
            }
        ]);
    else
        callback(0, [
            {
                'RelationName': 'Spouse2',
                'Phrase': 'met2',
                'Answers': [0, 1],
                'PositiveAnswerCount' : 1,
	            'NegativeAnswerCount' : 1,
                'Users': [1, 3]
            },
        {
            'RelationName': 'Spouse2', // redundant for find without join
            'Phrase': 'has married2',
            'Answers': [0],
            'PositiveAnswerCount' : 0,
	        'NegativeAnswerCount' : 1,
            'Users': [1]
        }
        ]);
}

var testphrase = {
                'RelationName': 'Spouse',
                'Phrase': 'met',
                'Answers': [0, 1, 1, 1, 1, 0, 0],
                'PositiveAnswerCount' : 4,
	            'NegativeAnswerCount' : 3,
                'Users': [1, 3]
            }

//hasConsensus(3, [1, 1, 1, 0, 0, 0], function(outcome){ console.log(outcome) });
//console.log(hasConsensus3(1, 3, testphrase));
//selectQuestions(2, 1, 2, function (err, phrases) { if (err) console.log(err.message); else console.log(phrases); mongoose.disconnect(); });
selectQuestions(5, 1, 2, 1, 2, function (err, phrases) { if (err) console.log(err.message); else console.log(phrases);});