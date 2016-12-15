var RelationModel = require('../models/RelationModel.js');

var mongoose = require('mongoose');



module.exports = {
    findAllRelations : function(callback){
        RelationModel.find(function (err, relations) {
                if (err)
                    return console.log(err);
                callback(relations)
            });
    },
    findRelationByName : function(name, callback){
        RelationModel.findOne({'Name': name }, function (err, relation) {
            if (err)
                return console.log(err);
            callback(relation)
        });

    },
    findRelationByRepresentativePhrase : function(representativePhrase, callback){
        RelationModel.findOne({'RepresentativePhrase': representativePhrase }, function (err, relation) {
            if (err)
                return console.log(err);
            callback(relation)
        });
    },
    addRelation : function (name, representativePhrase, subjectType, objectType, callback) {
        RelationModel.findOne({'Name':name}, function(err,result){
            if(err)
                return callback(err);
            if(result)
                return callback('Relation already exist');
            var relation = new RelationModel({'Name': name, 'RepresentativePhrase' : representativePhrase,
                        'SubjectType': subjectType, 'ObjectType': objectType});
            relation.save(function(err){
                if(err)
                    return console.log(err);
                callback(relation)
            })
        })
    }

}