var PhraseFacade = require('../facades/PhraseFacade.js');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/CrowdLector');



PhraseFacade.pagedList(10, 10, function (err, phrases){
    console.log(phrases)
});
