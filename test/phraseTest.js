var PhraseState = require('../modules/PhraseState.js');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/CrowdLector');


var c =[];
var nc = [];
var  ne=[];

PhraseState.PhraseState(1,function(err,c,nc,ne){
    console.log(err)
    console.log("Complete:")
    console.log(c);
    console.log("errate:")
    console.log(nc);
    console.log("non Complete:")
    console.log(ne);
});



