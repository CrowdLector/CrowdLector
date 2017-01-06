/**
 * Created by Macr0s on 06/01/17.
 */

var stream = require('linestream');
var BaseParser = require("./BaseParser");
var step_one = function (file, cb){
    var line = stream.create(file, { bufferSize: 300 });

    var temp = {}
    var results = [];

    line.on('data', function (line, isEnd) {
        var elements = line.split("\t");

        var name = BaseParser.simplify_name(elements[0]);

        var row = {
            name: name,
            phrase: elements[3],
            correct: parseInt(elements[5].trim())
        };

        if (typeof temp[row.name] == "undefined")
            temp[row.name] = {};

        if (typeof temp[row.name][row.phrase] == "undefined"){
            temp[row.name][row.phrase] = {
                name: row.name,
                phrase: row.phrase,
                countCorrect: 0,
                countIncorrect: 0,
                count: 0
            };

            results.push(temp[row.name][row.phrase])
        }

        temp[row.name][row.phrase].count += 1

        if (row.correct == 1)
            temp[row.name][row.phrase].countCorrect += 1;
        else
            temp[row.name][row.phrase].countIncorrect += 1;
    });

    line.on('end', function () { // emitted at the end of file
        cb(true, results)
    });

    line.on('error', function (e) { // emitted when an error occurred
        cb(false);
    });
};

module.exports = {
    parseManEvaluated: step_one,
    statManEvaluated: function (file, cb){
        step_one(file, function (status, results){
            if (!status)
                return cb(false);

            var count = {
                correct: 0,
                incorrect: 0,
                phrases: results.length,
                relations: []
            };

            var relations = {}

            results.forEach(function (r){
                count.correct += r.countCorrect;
                count.incorrect += r.countIncorrect;

                if (typeof relations[r.name] == "undefined"){
                    relations.total += 1;
                    relations[r.name] = {
                        name: r.name,
                        phrases: [],
                        lengthPhrases: {},
                        countPhrases: 0,
                        correct: 0,
                        incorrect: 0
                    }

                    count.relations.push(relations[r.name])
                }

                if (typeof relations[r.name].lengthPhrases[r.phrase] == "undefined")
                    relations[r.name].lengthPhrases[r.phrase] = 0;

                relations[r.name].phrases.push(r.phrase);
                relations[r.name].lengthPhrases[r.phrase] = r.count;
                relations[r.name].countPhrases += 1;
                relations[r.name].correct += r.countCorrect;
                relations[r.name].incorrect += r.countIncorrect;
            })

            cb(true, count);
        })
    }
};