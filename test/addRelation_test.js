relationFacade = require('./template_test').relationFacade


relationFacade.addRelation('place_of_birth', 'was born in', 'person', 'place', function(result){
    console.log(result);
    //relationFacade.findAllRelations(function(relations){
    //    console.log(relations);
    //})

});