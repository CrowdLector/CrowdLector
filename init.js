/**
 * Created by Macr0s on 17/12/16.
 */

var RelationParser = require("./parsers/RelationParser");
var PhraseParser = require("./parsers/PhraseParser");
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/CrowdLector');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {

    RelationParser.createRelations("./input/phrases_representative.tsv", "./input/relations_schema.tsv",function (status, rs) {
        PhraseParser.createPhrases("./input/phrases_refactor.tsv", rs, function (status, phrases){
            console.log("loaded");
            process.exit();

        })
    });

});
