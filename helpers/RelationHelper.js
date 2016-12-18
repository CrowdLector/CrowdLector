var RelationFacade = require('../facades/RelationFacade');

module.exports = {
	
	list: function (req, res) {
        RelationFacade.list(function(err, response){
            if(err){
                return res.json(response);
            } else {
                return res.status(err.code).json(err.message);
            }
        })
    },

    show: function (req, res) {
        var params = {id: req.params.id};
        RelationFacade.show(params, function(err, response){
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
				RepresentativePhrase : req.body.RepresentativePhrase
            }
        };

        RelationFacade.create(params, function(err, response){
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
                RepresentativePhrase: req.body.RepresentativePhrase,
                Name: req.body.Name
            }
        };
        RelationFacade.update(params, function(err, response){
            if(err){
                return res.json(response);
            } else {
                return res.status(err.code).json(err.message);
            }
        })
    },

    remove: function (req, res) {
        var params = {id: req.params.id};
        RelationFacade.update(params, function(err, response){
            if(err){
                return res.json(response);
            } else {
                return res.status(err.code).json(err.message);
            }
        })
    }
}