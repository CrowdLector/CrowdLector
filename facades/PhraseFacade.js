var PhraseModel = require('../models/PhraseModel.js');

/**
 * PhraseHelper.js
 *
 * @description :: Server-side logic for managing Phrases.
 */
module.exports = {

     /**
     * PhraseFacade.listByRelationName()
     */
    listByRelationName: function (relationName, callback) {
        PhraseModel.find({'RelationName': relationName}).populate('Users').exec(function (err, Phrases) {
            if (err) {
                callback({
                    code: 500,
                    message: 'Error when getting Phrase.',
                    error: err
                }, null);
            } else {
                callback(0, Phrases); //200
            }
        });
    },

    /**
     * PhraseFacade.list()
     */
    list: function (callback) {
        PhraseModel.find(function (err, Phrases) {
            if (err) {
                callback({
                    code: 500,
                    message: 'Error when getting Phrase.',
                    error: err
                }, null);
            } else {
                callback(0, Phrases); //200
            }
        });
    },

    /**
     * PhraseFacade.show()
     */
    show: function (params, callback) {
        PhraseModel.findOne({_id: params.id}, function (err, Phrase) {
            if (err) {
                callback({
                    code: 500,
                    message: 'Error when getting Phrase.',
                    error: err
                }, null);
            }
            else
            {
                if (!Phrase) {
                    callback({
                        code: 404,
                        message: 'No such Phrase'
                    }, null);
                } else {
                    callback(0, Phrase); //200
                }
            }
        });
    },

    /**
     * PhraseFacade.create()
     */
    create: function (params, callback) {
        var Phrase = new PhraseModel( params.newObj );

        Phrase.save(function (err, Phrase) {
            if (err) {
                callback({
                    code: 500,
                    message: 'Error when creating Phrase',
                    error: err
                }, null);
            } else {
                callback(0, Phrase); //201
            }
        });
    },

    /**
     * PhraseFacade.update()
     */
    update: function (params, callback) {
        PhraseModel.findOne({_id: params.id}, function (err, Phrase) {
            if (err) {
                callback({
                    code: 500,
                    message: 'Error when getting Phrase',
                    error: err
                }, null);
            } else {
                if (!Phrase) {
                    callback({
                        code: 404,
                        message: 'No such Phrase'
                    }, null);
                } else {
                    Phrase.Relation = params.modifiedObj.Relation ? params.modifiedObj.Relation : Phrase.Relation;
                    Phrase.Phrase = params.modifiedObj.Phrase ? params.modifiedObj.Phrase : Phrase.Phrase;
                    Phrase.Score = params.modifiedObj.Score ? params.modifiedObj.Score: Phrase.Score;
                    Phrase.Anwser = params.modifiedObj.Anwser ? params.modifiedObj.Anwser : Phrase.Anwser;
                    Phrase.Users = params.modifiedObj.Users ? params.modifiedObj.Users : Phrase.Users;

                    Phrase.save(function (err, Phrase) {
                        if (err) {
                            callback({
                                code: 500,
                                message: 'Error when updating Phrase.',
                                error: err
                            }, null);
                        } else {
                            callback(0, Phrase); //200
                        }
                    });
                }
            }
        });
    },

    /**
     * PhraseFacade.remove()
     */
    remove: function (params, callback) {
        PhraseModel.findByIdAndRemove(params.id, function (err, Phrase) {
            if (err) {
                callback({
                    code: 500,
                    message: 'Error when deleting the Phrase.',
                    error: err
                }, null);
            } else {
                callback(0, null); //204
            }
        });
    }
};
