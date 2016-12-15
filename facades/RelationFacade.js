var RelationModel = require('../models/RelationModel.js');

/**
 * RelationController.js
 *
 * @description :: Server-side logic for managing Relations.
 */
module.exports = {

    /**
     * RelationController.list()
     */
    list: function (callback) {
        RelationModel.find(function (err, Relations) {
            if (err) {
                callback(500, {
                    message: 'Error when getting Relation.',
                    error: err
                });
            } else {
                callback(200, Relations);
            }
        });
    },

    /**
     * RelationController.show()
     */
    show: function (params, callback) {
        RelationModel.findOne({_id: params.id}, function (err, Relation) {
            if (err) {
                callback(500, {
                    message: 'Error when getting Relation.',
                    error: err
                });
            } else {
                if (!Relation) {
                    callback(404, {
                        message: 'No such Relation'
                    });
                } else {
                    callback(200, Relation);
                }
            }
        });
    },

    /**
     * RelationController.create()
     */
    create: function (params, callback) {
        var Relation = new RelationModel(params.newObj);
        Relation.save(function (err, Relation) {
            if (err) {
                callback(500, {
                    message: 'Error when creating Relation',
                    error: err
                });
            } else {
                callback(201, Relation);
            }
            
        });
    },

    /**
     * RelationController.update()
     */
    update: function (params, callback) {
        RelationModel.findOne({_id: params.id}, function (err, Relation) {
            if (err) {
                callback(500, {
                    message: 'Error when getting Relation',
                    error: err
                });
            } else {
                if (!Relation) {
                    callback(404, {
                        message: 'No such Relation'
                    });
                } else {

                    Relation.Name = params.modifiedObj.Name ? params.modifiedObj.Name : Relation.Name;
                    Relation.RepresentativePhrase = params.modifiedObj.RepresentativePhrase ? params.modifiedObj.RepresentativePhrase : Relation.RepresentativePhrase;
                    
                    Relation.save(function (err, Relation) {
                        if (err) {
                            callback(500, {
                                message: 'Error when updating Relation.',
                                error: err
                            });
                        } else {
                            callback(200, Relation);
                        }
                    });
                }
            }
            
        });
    },

    /**
     * RelationController.remove()
     */
    remove: function (params, callback) {
        RelationModel.findByIdAndRemove(params.id, function (err, Relation) {
            if (err) {
                callback(500, {
                    message: 'Error when deleting the Relation.',
                    error: err
                });
            } else {
                callback(204, null);
            }
        });
    }
};
