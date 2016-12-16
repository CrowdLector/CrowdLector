var mongoose = require('mongoose');
var relationFacade = require('../facades/RelationFacade.js');
var phraseFacade = require('../facades/PhraseFacade.js');

mongoose.connect('mongodb://localhost/TestLectorDB');

module.exports = {relationFacade:relationFacade, phraseFacade:phraseFacade}
