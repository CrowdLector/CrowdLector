var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CrowdLector'});
});

router.post('/', function(req, res, next) {
  // TODO: do stuff with email
  res.render('questions', { 
    title: 'CrowdLector', 
    questions:["ciaoone", "pippo", "pluto", "qui, quo, qua"] // TODO: test stuff to avoid error on questions.jade
  });
});

module.exports = router;
