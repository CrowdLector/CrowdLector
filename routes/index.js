var express = require('express');
var router = express.Router();
var UserHelper = require('../helpers/UserHelper.js');
var UserFacade = require('../facades/UserFacade.js');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'CrowdLector' });
});

router.post('/', function (req, res, next) {
	var user = {
		Email: req.body.email,
		Name: req.body.name,
		Surname: req.body.surname
	};
	if (UserHelper.checkUser(user)) {
        UserFacade.findByEmail({ email: user.Email }, function (err, data) {
            if (err) {
                if (err.code === 404) {
                    UserFacade.create({ newObj: user }, function (err, data) {
                        if (err) {
                            res.render('error', {
                                message: "Database error"
                            });
                        } else {
                            //TODO aggiungi data._id in sessione
                            res.render('questions', {
                                title: 'CrowdLector',
                                questions: ["ciaoone", "pippo", "pluto", "qui, quo, qua"] // TODO: test stuff to avoid error on questions.jade
                            });
                        }
                    });
                } else {
                    res.render('error', {
                        message: "Database error"
                    });
                }
            } else {
                //verifica che l'utente sia corretto, aggiungi data._id in sessione
                res.render('questions', {
                    title: 'CrowdLector',
                    questions: [
                        { _id: 2, question: "ciaoone" },
                        { _id: 6, question: "pippo" },
                        { _id: 74, question: "pluto" },
                        { _id: 79, question: "qui, quo, qua" }] // TODO: test stuff to avoid error on questions.jade
                });
            }
        });
	} else {
		res.render('error', {
			message: "Data inserted not corrected"
		});
	}

});

router.post('/saveAnswers', function (req, res, next) {
    console.log(req.body);
});

module.exports = router;
