var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/CrowdLector');

var RelationFacade = require('../facades/RelationFacade');

RelationFacade.list(function(err, list) { if(err) console.log(err); else console.log(list) });