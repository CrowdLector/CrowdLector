var express = require('express');
var router = express.Router();
var UserHelper = require('../helpers/UserHelper.js');
var UserFacade = require('../facades/UserFacade.js');
var QuestionCreator = require('../helpers/QuestionCreator.js');
var Validator = require('validator');
var async = require('async');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'CrowdLector' });
});

router.post('/', function (req, res, next) {
	var session = req.session;
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
							session.user = data._id;
                            QuestionCreator.generate(data._id, function (err, data) {
                                if (err) {
                                    res.render('error', err);
                                } else {
                                    session.questions = data.ids;
                                    session.questions.push(1);
                                    res.render('questions', {
                                        title: 'CrowdLector',
                                        example: {_id: 1, question:"Sono una domanda di esempio"},
                                        questions: data.questions
                                    });
                                }
                            });
						}
					});
				} else {
					res.render('error', {
						message: "Database error"
					});
				}
			} else {
				//TODO verifica che l'utente sia corretto
				session.user = data._id;
				QuestionCreator.generate(data._id, function (err, data) {
					if (err) {
						res.render('error', err);
                    } else {
                        session.questions = data.ids;
                        session.questions.push(1);
                        res.render('questions', {
                            title: 'CrowdLector',
                            example: {_id: 1, question:"Sono una domanda di esempio"},
                            questions: data.questions
                        });
					}
				});
			}
		});
	} else {
		res.render('error', {
			message: "Data inserted not corrected"
		});
	}

});

router.post('/saveAnswers', function (req, res) {
	var session = req.session;

    console.log(req.body);
    console.log("Mi sono salvato in sessione questi id");
    console.log(session.questions);

    var errors = [];

    var keys = Object.keys(req.body);
    async.each(keys, function(item, callback){
        console.log(item);
        if (session.questions.indexOf(item) > -1){
            if (Validator.isBoolean(req.body[item])) {
                //Pusho la risposta nel db,
				callback();
            } else {
                errors.push({
                    type: "Someone changed the POST to the server, not boolean",
                    id: item,
                    answer: req.body[item]
                });
                callback();
            }
        } else {
            errors.push({
                type: "Someone changed the POST to the server, id not correct",
                id: item,
                answer: req.body[item]
            });
            callback();
        }
	}, function(err){
    	if(err){
    		console.log("è cascato il mondo");
		} else {
    		if(errors.length > 0){
                console.log("ERRORI:");
                console.log(errors);
                res.render('error', {
                    message: "ERROR",
                    error: {
                        status: errors
                    }
                });
			} else {
    			res.render('message', {
    				type: "success",
					message: "You have completed all the questions, GG!"
				});
			}
		}
	});
});

module.exports = router;
