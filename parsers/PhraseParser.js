/**
 * Created by Macr0s on 18/12/16.
 */

var stream = require('linestream');

var stage_one = function (file, relations, cb){
    var line = stream.create(file, {bufferSize: 300})

    phrases = [];

    line.on('data', function(line, isEnd) {
        var elements = line.split("\t");

        if (typeof relations[elements[0].trim()] != "undefined" &&
            relations[elements[0].trim()].RepresentativePhrase != elements[1].trim()){
            phrases.push({
                Relation: relations[elements[0]]._id,
                RelationName: relations[elements[0]].Name,
                Phrase: elements[1].trim(),
                Score: parseFloat(elements[3])
            })
        }
    })

    line.on('end', function() { // emitted at the end of file
        cb(true, phrases);
    });

    line.on('error', function(e) { // emitted when an error occurred
        cb(false);
    });

}

module.exports =  {
    createPhrases: function (file_phrases_refactor, relations, cb) {
        var PhraseModel = require("../models/PhraseModel");

        stage_one(file_phrases_refactor, relations, function (status, phrases) {
            PhraseModel.collection.insert(phrases, function(err, list) {
                if (err) return cb(false);
                else return cb(true,list.ops);

            });
        });
    }
}