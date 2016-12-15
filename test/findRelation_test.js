relationFacade = require('./template_test').relationFacade


relationFacade.findAllRelations(function(relations){
    console.log('Test metodo findAllRelations');
    console.log(relations);
    console.log();
});


relationFacade.findRelationByName('place_of_birth', function(relation){
    console.log('Test metodo findRelationByName');
    console.log(relation);
    console.log();
});


relationFacade.findRelationByRepresentativePhrase('was born in', function(relation){
    console.log('Test metodo findRelationByRepresentativePhrase');
    console.log(relation);
    console.log();
});


