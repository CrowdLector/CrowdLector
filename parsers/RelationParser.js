/**
 * Created by Macr0s on 18/12/16.
 */

var stream = require('linestream');
var BaseParser = require("./BaseParser");

var stage_three = function (rs, types, file, cb){
    var line = stream.create(file, { bufferSize: 300 });
    var ts = {}


    line.on('data', function (line, isEnd) {
        var elements = line.split("\t");

        if (types.indexOf(elements[0].trim()) != -1)
            ts[elements[0]] = elements[1].trim().replace("\"", "").replace("\"", "");
    });

    line.on('end', function () { // emitted at the end of file

        var rs2 = [];

        rs.forEach(function (r){
            rs2.push({
                SubjectType: ts[r.SubjectType],
                ObjectType: ts[r.ObjectType],
                RepresentativePhrase: r.RepresentativePhrase,
                Name: r.Name
            });
        });

        cb(true, rs2);
    });

    line.on('error', function (e) { // emitted when an error occurred
        cb(false);
    });
}

var stage_two = function (file, relations, cb) {
    var line = stream.create(file, { bufferSize: 300 });
    var rs = [];
    var types = [];

    line.on('data', function (line, isEnd) {
        var elements = line.split("\t");

        var name = BaseParser.simplify_name(elements[0]);

        if (typeof relations[name] != "undefined") {
            relations[name].SubjectType = elements[1].trim();
            relations[name].ObjectType = elements[2].trim();

            if (types.indexOf(elements[1].trim()) == -1)
                types.push(elements[1].trim());

            if (types.indexOf(elements[2].trim()) == -1)
                types.push(elements[2].trim());

            rs.push(relations[name]);
        }
    });

    line.on('end', function () { // emitted at the end of file
        cb(true, rs, types);
    });

    line.on('error', function (e) { // emitted when an error occurred
        cb(false);
    });
};

var stage_one = function (file, cb) {
    var line = stream.create(file, { bufferSize: 300 });

    var relations = {};

    line.on('data', function (line, isEnd) {
        var elements = line.split("\t");
        var name = BaseParser.simplify_name(elements[0]);

        relations[name] = {
            RepresentativePhrase: elements[1].trim(),
            Name: name
        };
    });

    line.on('end', function () { // emitted at the end of file
        cb(true, relations);
    });

    line.on('error', function (e) { // emitted when an error occurred
        cb(false);
    });

};

var simplify_access = function (elements) {
    var relations = {};

    elements.forEach(function (e) {
        relations[e.Name] = e;
    });

    return relations;
};

module.exports = {
    createRelations: function (file_pharses_rappresentative, file_relation_schema, file_types_labels, cb) {
        var RelationModel = require("../models/RelationModel");

        stage_one(file_pharses_rappresentative, function (status, relations) {
            if (!status)
                return cb(false);

            stage_two(file_relation_schema, relations, function (status, rs, types) {
                if (!status)
                    return cb(false);

                stage_three(rs, types, file_types_labels, function (status, rs) {
                    if (!status)
                        return cb(false);

                    console.log("Relations loaded", rs.length);

                    RelationModel.collection.insert(rs, function (err, list) {
                        if (err) return cb(false);
                        else return cb(true, simplify_access(list.ops));

                    });

                })




            });
        });
    }
};