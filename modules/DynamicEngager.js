var RelationFacade = require('../facade/RelationFacade.js');
var PhraseFacade = require('../facade/PhraseFacade.js');
var UsersFacade = require('../facade/UsersFacade.js');

function checkRelationBy(userId, page, resultsPerPage, callback) {
    RelationFacade.pagedList(page, resultsPerPage, function (err, data){
        if(err){
            ;
        }
        else {
            data.forEach(selectQuestionsByRelation)
        }
    });
} 

function selectQuestionsByRelation(relation, index, relations){
    //TODO PhraseFacade.listByRelationName();
}

module.export = {
    a: function() {}
}