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
        PhraseModel.find({'RelationName': relationName}, function (err, Phrases) {
            if (err) {
                callback(err, null);
            } else {
                callback(0, Phrases);
            }
        });
    },

    /**
     * PhraseFacade.list()
     */
    list: function (callback) {
        PhraseModel.find(function (err, Phrases) {
            if (err) {
                callback(500, {
                    message: 'Error when getting Phrase.',
                    error: err
                });
            } else {
                callback(200, Phrases);
            }
        });
    },

    /**
     * PhraseFacade.show()
     */
    show: function (params, callback) {
        PhraseModel.findOne({_id: params.id}, function (err, Phrase) {
            if (err) {
                callback(500, {
                    message: 'Error when getting Phrase.',
                    error: err
                });
            }
            else
            {
                if (!Phrase) {
                    callback(404, {
                        message: 'No such Phrase'
                    });
                } else {
                    callback(200, Phrase);
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
                callback(500, {
                    message: 'Error when creating Phrase',
                    error: err
                });
            } else {
                callback(201, Phrase);
            }
        });
    },

    /**
     * PhraseFacade.update()
     */
    update: function (params, callback) {
        PhraseModel.findOne({_id: params.id}, function (err, Phrase) {
            if (err) {
                callback(500, {
                    message: 'Error when getting Phrase',
                    error: err
                });
            } else {
                if (!Phrase) {
                    callback(404, {
                        message: 'No such Phrase'
                    });
                } else {
                    Phrase.Relation = params.modifiedObj.Relation ? params.modifiedObj.Relation : Phrase.Relation;
                    Phrase.Phrase = params.modifiedObj.Phrase ? params.modifiedObj.Phrase : Phrase.Phrase;
                    Phrase.Anwser = params.modifiedObj.Anwser ? params.modifiedObj.Anwser : Phrase.Anwser;
                    Phrase.Users = params.modifiedObj.Users ? params.modifiedObj.Users : Phrase.Users;

                    Phrase.save(function (err, Phrase) {
                        if (err) {
                            callback(500, {
                                message: 'Error when updating Phrase.',
                                error: err
                            });
                        } else {
                            callback(200, Phrase);
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
                callback(500, {
                    message: 'Error when deleting the Phrase.',
                    error: err
                });
            } else {
                callback(204, null);
            }
        });
    }
};
