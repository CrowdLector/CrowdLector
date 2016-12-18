var RelationModel = require('../models/RelationModel.js');

/**
 * RelationFacade.js
 *
 * @description :: Server-side logic for managing Relations.
 */
module.exports = {

    /**
     * RelationFacade.pagedList()
     */
    pagedList: function (page, resultsPerPage, callback) {
        RelationModel.find().sort({Name: -1}).skip((page-1)*resultsPerPage).limit(resultsPerPage).exec(function (err, Relations) {
            if (err) {
                callback({
                    code: 500,
                    message: 'Error when getting Relation.',
                    error: err
                }, null);
            } else {
                callback(0, Relations); //200
            }
        });
    },

    /**
     * RelationFacade.list()
     */
    list: function (callback) {
        RelationModel.find(function (err, Relations) {
            if (err) {
                callback({
                    code: 500,
                    message: 'Error when getting Relation.',
                    error: err
                }, null);
            } else {
                callback(0, Relations); //200
            }
        });
    },

    /**
     * RelationFacade.show()
     */
    show: function (params, callback) {
        RelationModel.findOne({_id: params.id}, function (err, Relation) {
            if (err) {
                callback({
                    code: 500,
                    message: 'Error when getting Relation.',
                    error: err
                }, null);
            } else {
                if (!Relation) {
                    callback({
                        code: 404,
                        message: 'No such Relation'
                    }, null);
                } else {
                    callback(0, Relation); //200
                }
            }
        });
    },

    /**
     * RelationFacade.create()
     */
    create: function (params, callback) {
        var Relation = new RelationModel(params.newObj);
        Relation.save(function (err, Relation) {
            if (err) {
                callback({
                    code: 500,
                    message: 'Error when creating Relation',
                    error: err
                }, null);
            } else {
                callback(0, Relation); //201
            }
            
        });
    },

    /**
     * RelationFacade.update()
     */
    update: function (params, callback) {
        RelationModel.findOne({_id: params.id}, function (err, Relation) {
            if (err) {
                callback({
                    code: 500,
                    message: 'Error when getting Relation',
                    error: err
                }, null);
            } else {
                if (!Relation) {
                    callback({
                        code: 404,
                        message: 'No such Relation'
                    }, null);
                } else {

                    Relation.Name = params.modifiedObj.Name ? params.modifiedObj.Name : Relation.Name;
                    Relation.RepresentativePhrase = params.modifiedObj.RepresentativePhrase ? params.modifiedObj.RepresentativePhrase : Relation.RepresentativePhrase;
                    
                    Relation.save(function (err, Relation) {
                        if (err) {
                            callback({
                                code: 500,
                                message: 'Error when updating Relation.',
                                error: err
                            }, null);
                        } else {
                            callback(0, Relation); //200
                        }
                    });
                }
            }
            
        });
    },

    /**
     * RelationFacade.remove()
     */
    remove: function (params, callback) {
        RelationModel.findByIdAndRemove(params.id, function (err, Relation) {
            if (err) {
                callback({
                    code: 500,
                    message: 'Error when deleting the Relation.',
                    error: err
                }, null);
            } else {
                callback(0, null); //204
            }
        });
    },

    findRelationByName : function(params, callback){
        RelationModel.find({'Name': params.name }, function (err, relation) {
            if (err) {
                callback({
                    code: 500,
                    message: 'Error when getting Relation.',
                    error: err
                }, null);
            } else {
                callback(0, relation); //200
            }
        });

    },

    findRelationByRepresentativePhrase : function(params, callback){
        RelationModel.find({'RepresentativePhrase': params.representativePhrase }, function (err, relation) {
            if (err) {
                callback({
                    code: 500,
                    message: 'Error when getting Relation.',
                    error: err
                }, null);
            } else {
                callback(0, relation); //200
            }
        });
    },
};