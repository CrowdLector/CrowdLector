/**
 * Created by Macr0s on 17/12/16.
 */

var stream = require('linestream');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/CrowdLector');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {

    var PhraseFadace = require("./facades/PhraseFacade");
    var UserFacade = require("./facades/UserFacade");
    var RelationFacade = require("./facades/RelationFacade");



});
