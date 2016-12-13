var QuestionModel = require('../models/QuestionModel.js');

/**
 * QuestionController.js
 *
 * @description :: Server-side logic for managing Questions.
 */
module.exports = {

    /**
     * QuestionController.list()
     */
    list: function (req, res) {
        QuestionModel.find(function (err, Questions) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Question.',
                    error: err
                });
            }
            return res.json(Questions);
        });
    },

    /**
     * QuestionController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        QuestionModel.findOne({_id: id}, function (err, Question) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Question.',
                    error: err
                });
            }
            if (!Question) {
                return res.status(404).json({
                    message: 'No such Question'
                });
            }
            return res.json(Question);
        });
    },

    /**
     * QuestionController.create()
     */
    create: function (req, res) {
        var Question = new QuestionModel({			Relation : req.body.Relation,			Phrase : req.body.Phrase,			Anwser : req.body.Anwser,			Utenti : req.body.Utenti
        });

        Question.save(function (err, Question) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Question',
                    error: err
                });
            }
            return res.status(201).json(Question);
        });
    },

    /**
     * QuestionController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        QuestionModel.findOne({_id: id}, function (err, Question) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Question',
                    error: err
                });
            }
            if (!Question) {
                return res.status(404).json({
                    message: 'No such Question'
                });
            }

            Question.Relation = req.body.Relation ? req.body.Relation : Question.Relation;			Question.Phrase = req.body.Phrase ? req.body.Phrase : Question.Phrase;			Question.Anwser = req.body.Anwser ? req.body.Anwser : Question.Anwser;			Question.Utenti = req.body.Utenti ? req.body.Utenti : Question.Utenti;			
            Question.save(function (err, Question) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Question.',
                        error: err
                    });
                }

                return res.json(Question);
            });
        });
    },

    /**
     * QuestionController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        QuestionModel.findByIdAndRemove(id, function (err, Question) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Question.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
