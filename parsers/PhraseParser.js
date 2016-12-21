/**
 * Created by Macr0s on 18/12/16.
 */

var stream = require('linestream');
var BaseParser = require("./BaseParser");

var stage_one = function (file, relations, cb) {
    var line = stream.create(file, { bufferSize: 300 });

    var phrases = [];

    line.on('data', function (line, isEnd) {
        var elements = line.split("\t");

        var name = BaseParser.simplify_name(elements[0]);

        if (typeof relations[name] != "undefined") {

            if (typeof relations[name].count == "undefined")
                relations[name].count = 0;

            relations[name].count += 1;

            phrases.push({
                Relation: relations[name]._id,
                RelationName: name,
                Phrase: elements[1].trim(),
                Score: parseFloat(elements[3]),
                Answers: [],
                Users: []                
            });
        }
    });

    line.on('end', function () { // emitted at the end of file

        Object.keys(relations).forEach(function (e) {
            console.log("Relation", relations[e].Name, "has", relations[e].count, "phrases");
        });

        cb(true, phrases);
    });

    line.on('error', function (e) { // emitted when an error occurred
        cb(false);
    });

};

module.exports = {
    createPhrases: function (file_phrases_refactor, relations, cb) {
        var PhraseModel = require("../models/PhraseModel");

        stage_one(file_phrases_refactor, relations, function (status, phrases) {

            console.log("Phrases loaded", phrases.length);

            PhraseModel.collection.insert(phrases, function (err, list) {
                if (err) return cb(false);
                else return cb(true, list.ops);

            });
        });
    }
};