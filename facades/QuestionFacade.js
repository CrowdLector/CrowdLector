var QuestionModel = require('../models/QuestionModel.js');

/**
 * QuestionHelper.js
 *
 * @description :: Server-side logic for managing Questions.
 */
module.exports = {

    /**
     * QuestionFacade.list()
     */
    list: function (callback) {
        QuestionModel.find(function (err, Questions) {
            if (err) {
                callback(500, {
                    message: 'Error when getting Question.',
                    error: err
                });
            } else {
                callback(200, Questions);
            }
        });
    },

    /**
     * QuestionFacade.show()
     */
    show: function (params, callback) {
        QuestionModel.findOne({_id: params.id}, function (err, Question) {
            if (err) {
                callback(500, {
                    message: 'Error when getting Question.',
                    error: err
                });
            }
            else
            {
                if (!Question) {
                    callback(404, {
                        message: 'No such Question'
                    });
                } else {
                    callback(200, Question);
                }
            }
        });
    },

    /**
     * QuestionFacade.create()
     */
    create: function (params, callback) {
        var Question = new QuestionModel( params.newObj );

        Question.save(function (err, Question) {
            if (err) {
                callback(500, {
                    message: 'Error when creating Question',
                    error: err
                });
            } else {
                callback(201, Question);
            }
        });
    },

    /**
     * QuestionFacade.update()
     */
    update: function (params, callback) {
        QuestionModel.findOne({_id: params.id}, function (err, Question) {
            if (err) {
                callback(500, {
                    message: 'Error when getting Question',
                    error: err
                });
            } else {
                if (!Question) {
                    callback(404, {
                        message: 'No such Question'
                    });
                } else {
                    Question.Relation = params.modifiedObj.Relation ? params.modifiedObj.Relation : Question.Relation;
                    Question.Phrase = params.modifiedObj.Phrase ? params.modifiedObj.Phrase : Question.Phrase;
                    Question.Anwser = params.modifiedObj.Anwser ? params.modifiedObj.Anwser : Question.Anwser;
                    Question.Users = params.modifiedObj.Users ? params.modifiedObj.Users : Question.Users;

                    Question.save(function (err, Question) {
                        if (err) {
                            callback(500, {
                                message: 'Error when updating Question.',
                                error: err
                            });
                        } else {
                            callback(200, Question);
                        }
                    });
                }
            }
        });
    },

    /**
     * QuestionFacade.remove()
     */
    remove: function (params, callback) {
        QuestionModel.findByIdAndRemove(params.id, function (err, Question) {
            if (err) {
                callback(500, {
                    message: 'Error when deleting the Question.',
                    error: err
                });
            } else {
                callback(204, null);
            }
        });
    }
};
