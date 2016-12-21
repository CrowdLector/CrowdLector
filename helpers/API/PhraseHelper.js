var PhraseFacade = require(__base + 'facades/PhraseFacade');

module.exports = {

    list: function (req, res) {
        PhraseFacade.list(function (err, response) {
            if (err) {
                return res.json(response);
            } else {
                return res.status(err.code).json(err.message);
            }
        });
    },

    show: function (req, res) {
        var params = { id: req.params.id };
        PhraseFacade.show(params, function (err, response) {
            if (err) {
                return res.json(response);
            } else {
                return res.status(err.code).json(err.message);
            }
        });
    },

    create: function (req, res) {
        var params = {
            newObj: {
                Relation: req.body.Relation,
                Phrase: req.body.Phrase,
                Score: req.body.Score,
                Anwser: req.body.Anwser,
                Utenti: req.body.Utenti
            }
        };

        PhraseFacade.create(params, function (err, response) {
            if (err) {
                return res.json(response);
            } else {
                return res.status(err.code).json(err.message);
            }
        });
    },

    update: function (req, res) {
        var params = {
            id: req.params.id,
            modifiedObj: {
                Relation: req.body.Relation,
                Phrase: req.body.Phrase,
                Score: req.body.Score,
                Anwser: req.body.Anwser,
                Users: req.body.Utenti
            }
        };
        PhraseFacade.update(params, function (err, response) {
            if (err) {
                return res.json(response);
            } else {
                return res.status(err.code).json(err.message);
            }
        });
    },

    remove: function (req, res) {
        var params = { id: req.params.id };
        PhraseFacade.update(params, function (err, response) {
            if (err) {
                return res.json(response);
            } else {
                return res.status(err.code).json(err.message);
            }
        });
    }

};