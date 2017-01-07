/**
 * Created by Macr0s on 06/01/17.
 */

var manEvaluatedParser = require("./parsers/ManEvaluatedParser");
var config = require("./config");
var PhraseFacade = require("./facades/PhraseFacade");

var mongoose = require('mongoose');

function countUnknowPhrases(file_relations, db_relations) {
    var count = {
        found: 0,
        countLength: [],
        factCountFound: 0,
        notFound: 0
    };

    file_relations.forEach(function (file_relation){
        db_relations.forEach(function (db_relation){
            if (file_relation.name == db_relation.name){
                file_relation.phrases.forEach(function (file_phrase) {
                    if (db_relation.phrases.indexOf(file_phrase) == -1)
                        count.notFound +=1;
                    else{
                        count.found += 1;
                        count.countLength.push({
                            count: file_relation.lengthPhrases[file_phrase],
                            name: file_relation.name,
                            phrase: file_phrase
                        });
                        count.factCountFound +=  file_relation.lengthPhrases[file_phrase]
                    }
                })
            }
        });
    });

    return count;
}

mongoose.connect('mongodb://localhost/CrowdLector');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    /*
    manEvaluatedParser.statManEvaluated("./input/man_evaluated.tsv", function (status, file) {
        PhraseFacade.stats(config.minNumberOfAnswers, config.minDiff, function (error, db) {
            console.log("Correct count original:", file.correct);
            console.log("Incorrect count original: ", file.incorrect);
            console.log();
            console.log("Correct count after crowd:", db.correct);
            console.log("Incorrect count after crowd: ", db.incorrect);
            console.log();
            var temp = countUnknowPhrases(file.relations, db.relations);

            console.log("Fatti non corrispondenti a frasi valutate da crowd", temp.notFound);
            console.log("Frasi valutete", temp.found);
            console.log("Fatti trovati", temp.factCountFound);
            console.log();
            console.log("Frasi valutate da crow non corrispondenti a fatti", countUnknowPhrases(db.relations, file.relations).notFound)
            console.log();

            var count_relation = 0
            file.relations.forEach(function (file_relation){
                db.relations.forEach(function (db_relation){
                    if (file_relation.name == db_relation.name){
                        console.log("Relation:", db_relation.name);
                        console.log("Correct count original:", file_relation.correct);
                        console.log("Incorrect count original: ", file_relation.incorrect);
                        console.log("Correct count after crowd:", db_relation.correct);
                        console.log("Incorrect count after crowd: ", db_relation.incorrect);
                        console.log();
                        count_relation += 1;
                    }
                });
            });

            console.log("Relazioni presenti sul file e nel db", count_relation);
        })
    });*/

    manEvaluatedParser.parseManEvaluated("./input/man_evaluated.tsv", function (status, results) {
        PhraseFacade.listPositive(config.minNumberOfAnswers, config.minDiff, function (error, data){
            var mapRelations = {};
            var relations = [];

            results.forEach(function (result){
                if (typeof mapRelations[result.name] == "undefined"){
                    mapRelations[result.name] = {
                        name: result.name,
                        file_correct: 0,
                        file_incorrect: 0,
                        db_correct: 0,
                        db_incorrect: 0
                    }

                    relations.push(mapRelations[result.name]);
                }

                mapRelations[result.name].file_correct += result.countCorrect;
                mapRelations[result.name].file_incorrect += result.countIncorrect;

                data.forEach(function (e){
                    if (result.name == e.RelationName && e.Phrase == result.phrase){
                        mapRelations[result.name].db_correct += result.countCorrect;
                        mapRelations[result.name].db_incorrect += result.countIncorrect;
                    }
                })
            })

            var file_correct = 0;
            var file_incorrect = 0;
            var db_correct = 0;
            var db_incorrect = 0;

            relations.forEach(function (relation){
                console.log("Relation:", relation.name);
                console.log("Correct count original:", relation.file_correct);
                console.log("Incorrect count original: ", relation.file_incorrect);
                console.log("Correct count after crowd:", relation.db_correct);
                console.log("Incorrect count after crowd: ", relation.db_incorrect);
                console.log();

                file_correct += relation.file_correct;
                file_incorrect += relation.file_incorrect;
                db_correct += relation.db_correct;
                db_incorrect += relation.db_incorrect;
            })

            console.log("Totali");
            console.log("Correct count original:", file_correct);
            console.log("Incorrect count original: ", file_incorrect);
            console.log("Correct count after crowd:", db_correct);
            console.log("Incorrect count after crowd: ", db_incorrect);
            console.log();
        })
    })
})

