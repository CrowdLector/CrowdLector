questionGenerator = require('./template_test').questionGenerator

questionGenerator.generateQuestion('grew up in', 'was died in', function(question){
    console.log("Test del metodo generateQuestion")
    console.log(question);
});