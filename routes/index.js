var express = require('express');
var router = express.Router();
var UserHelper = require('../helpers/UserHelper.js');
var UserFacade = require('../facades/UserFacade.js');
var QuestionCreator = require('../helpers/QuestionCreator.js');
var PhraseFacade = require(__base + 'facades/PhraseFacade');
var Validator = require('validator');
var async = require('async');
const util = require('util');

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
                                    res.render('questions', {
                                        title: 'CrowdLector',
                                        example: data.questions.slice(0, 1)[0],
                                        questions: data.questions.slice(1, data.questions.length)
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
                        res.render('questions', {
                            title: 'CrowdLector',
                            example: data.questions.slice(0, 1)[0],
                            questions: data.questions.slice(1, data.questions.length)
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

    var errors = [];
    var keys = Object.keys(req.body);
    async.each(keys, function(item, callback){
        if (session.questions.indexOf(item) > -1){
            if (Validator.isBoolean(req.body[item])) {
				async.parallel([
					function(cb){
                        PhraseFacade.addAnswer({id: item, value: req.body[item]}, function(err, data){
							if(err){
                                errors.push({
                                    type: "Problem adding answer to phrase",
                                    id: item,
                                    answer: req.body[item],
									err: err
                                });
							}
							cb();
                        });
					},
					function(cb){
                        PhraseFacade.addUser({id: item, value: session.user}, function(err, data){
							if(err){
                                errors.push({
                                    type: "Problem adding user to phrase",
                                    id: item,
                                    user: session.user,
									err: err
                                });
							}
							cb();
                        });
					}
				], function (err, results) {
					if(err){
						errors.push({
							type: "è cascato il mondo per la seconda volta"
						});
					}
                    callback();
                });
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
                console.log(util.inspect(errors, false, null));
                res.render('error', {
                    message: "ERROR",
                    error: {
                        status: errors
                    }
                });
                req.session.destroy(function(err) {
                    // cannot access session here
                });
			} else {
    			res.render('finished', {
    				title: "CrowdLector"
				});
                req.session.destroy(function(err) {
                    // cannot access session here
                });
			}
		}
	});
});

module.exports = router;
