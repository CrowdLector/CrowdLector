var express = require('express');

var api = {
    setApp: function(app){
        app.use("/api/users",require('./UsersRoutes'));
        app.use("/api/phrases",require('./PhraseRoutes'));
        app.use("/api/relations",require('./RelationRoutes'));
    }
};

module.exports = api;