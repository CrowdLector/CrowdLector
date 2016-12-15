var RelationFacade = require('../facades/RelationFacade.js');

module.exports = {
	
	list: function (req, res) {
        RelationFacade.list(function(code, response){
            if(code==200){
                return res.json(response);
            } else {
                return res.status(code).json(response);
            }
        })
    },

    show: function (req, res) {
        var params = {id: req.params.id};
        RelationFacade.show(params, function(code, response){
            if(code==200){
                return res.json(response);
            } else {
                return res.status(code).json(response);
            }
        })
    },

    create: function (req, res) {
        var params = { newObj : {
				Name : req.body.Name,
				RepresentativePhrase : req.body.RepresentativePhrase
            }
        };

        RelationFacade.create(params, function(code, response){
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
                RepresentativePhrase: req.body.RepresentativePhrase,
                Name: req.body.Name
            }
        };
        RelationFacade.update(params, function(code, response){
            if(code==200){
                return res.json(response);
            } else {
                return res.status(code).json(response);
            }
        })
    },

    remove: function (req, res) {
        var params = {id: req.params.id};
        RelationFacade.update(params, function(code, response){
            if(code==204){
                return res.json(response);
            } else {
                return res.status(code).json(response);
            }
        })
    }
}