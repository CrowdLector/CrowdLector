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
                countIncorrect: 0
            };

            results.push(temp[row.name][row.phrase])
        }

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
    parseManEvaluated: step_one
};