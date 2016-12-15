var QuestionFacade = require('../facades/QuestionFacade.js');

module.exports = {

    list: function (req, res) {
        QuestionFacade.list(function(code, response){
            if(code==200){
                return res.json(response);
            } else {
                return res.status(code).json(response);
            }
        })
    },

    show: function (req, res) {
        var params = {id: req.params.id};
        QuestionFacade.show(params, function(code, response){
            if(code==200){
                return res.json(response);
            } else {
                return res.status(code).json(response);
            }
        })
    },

    create: function (req, res) {
        var params = {
            Relation : req.body.Relation,
            Phrase : req.body.Phrase,
            Anwser : req.body.Anwser,
            Utenti : req.body.Utenti
        };

        QuestionFacade.create(params, function(code, response){
            if(code==201){
                return res.json(response);
            } else {
                return res.status(code).json(response);
            }
        })
    },

    update: function (req, res) {
        var params = {
            id: req.params.id,
            modifiedObj: {
                Relation: req.body.Relation,
                Phrase: req.body.Phrase,
                Anwser: req.body.Anwser,
                Users: req.body.Utenti
            }
        };
        QuestionFacade.update(params, function(code, response){
            if(code==200){
                return res.json(response);
            } else {
                return res.status(code).json(response);
            }
        })
    },

    remove: function (req, res) {
        var params = {id: req.params.id};
        QuestionFacade.update(params, function(code, response){
            if(code==204){
                return res.json(response);
            } else {
                return res.status(code).json(response);
            }
        })
    }

}