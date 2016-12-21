var UserFacade = require(__base + 'facades/UserFacade');

module.exports = {

    list: function (req, res) {
        UserFacade.list(function(err, response){
            if(err){
                return res.json(response);
            } else {
                return res.status(err.code).json(err.message);
            }
        })
    },

    show: function (req, res) {
        var params = {id: req.params.id};
        UserFacade.show(params, function(err, response){
            if(err){
                return res.json(response);
            } else {
                return res.status(err.code).json(err.message);
            }
        })
    },

    create: function (req, res) {
        var params = { newObj : {
                Name : req.body.Name,
                Surname : req.body.Surname,
                Email : req.body.Email
            }
        };

        UserFacade.create(params, function(err, response){
            if(err){
                return res.json(response);
            } else {
                return res.status(err.code).json(err.message);
            }
        })
    },

    update: function (req, res) {
        var params = {
            id: req.params.id,
            modifiedObj: {
                Name : req.body.Name,
                Surname : req.body.Surname,
                Email : req.body.Email
            }
        };
        UserFacade.update(params, function(err, response){
            if(err){
                return res.json(response);
            } else {
                return res.status(err.code).json(err.message);
            }
        })
    },

    remove: function (req, res) {
        var params = {id: req.params.id};
        UserFacade.update(params, function(err, response){
            if(err){
                return res.json(response);
            } else {
                return res.status(err.code).json(err.message);
            }
        })
    }

}