var express = require('express');
var router = express.Router();
var UserHelper = require('../helpers/UserHelper');
var UserFacade = require('../facades/UserFacade');
var QuestionManager = require('../modules/QuestionManager');
var PhraseFacade = require(__base + 'facades/PhraseFacade');
var PhraseState = require(__base + 'modules/PhraseState');
var Validator = require('validator');
var async = require('async');
const util = require('util');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'CrowdLector', info: false, jumbotron: true });
});

function renderQuestionsToShow(req, res, next, err, data, saveQuestions) {
	if (err) {
		res.render('error', err);
	}
	else if (data.length == 0) {
		res.render('message', {
			title: "CrowdLector",
			info: false,
			message: "We don't need more answers from you, thank you.",
			type: "success"
		});
	}
	else {
		saveQuestions();
		if (data.questions.length >= 20) {
			res.render('questions', {
				title: 'CrowdLector',
				info: true,
				example: data.questions.slice(0, 1)[0],
				questions: data.questions.slice(1, data.questions.length)
			});
		}
		else {
			res.render('questions', {
				title: 'CrowdLector',
				info: true,
				example: null,
				questions: data.questions
			});
		}
	}
}

router.post('/', function (req, res, next) {
	var session = req.session;
	if (req.session.user) {
		QuestionManager.generate(req.session.user, function (err, data) {
			renderQuestionsToShow(req, res, next, err, data, function () { session.questions = data.ids });
		});
	} else {
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
									message: "Database error",
									info: false
								});
							} else {
								session.user = data._id;
								QuestionManager.generate(data._id, function (err, data) {
									renderQuestionsToShow(req, res, next, err, data, function () { session.questions = data.ids });
								});
							}
						});
					} else {
						res.render('error', {
							message: "Database error",
							info: false
						});
					}
				} else {
					//TODO verifica che l'utente sia corretto
					session.user = data._id;
					QuestionManager.generate(data._id, function (err, data) {
						renderQuestionsToShow(req, res, next, err, data, function () { session.questions = data.ids });
					});
				}
			});
		} else {
			res.render('error', {
				message: "Data inserted not corrected",
				info: false
			});
		}
	}
});

router.post('/saveAnswers', function (req, res) {
	var session = req.session;
	var errors = [];
	var keys = Object.keys(req.body);
	async.each(keys, function (item, callback) {
		if (session.questions.indexOf(item) > -1) {
			if (Validator.isBoolean(req.body[item])) {
				async.parallel([
					function (cb) {
						PhraseFacade.addAnswer({ id: item, value: req.body[item] }, function (err, data) {
							if (err) {
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
					function (cb) {
						PhraseFacade.addUser({ id: item, value: session.user }, function (err, data) {
							if (err) {
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
					if (err) {
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
					answer: req.body[item],
				});
				callback();
			}
		} else {
			errors.push({
				type: "Someone changed the POST to the server, id not correct",
				id: item,
				answer: req.body[item],
			});
			callback();
		}
	}, function (err) {
		if (err) {
			console.log("è cascato il mondo");
		} else {
			if (errors.length > 0) {
				console.log("ERRORI:");
				console.log(util.inspect(errors, false, null));
				res.render('error', {
					message: "ERROR",
					error: {
						status: errors
					},
					info: false
				});
			} else {
				res.render('finished', {
					title: "CrowdLector",
					info: false
				});

			}
		}
	});
});

router.post('/resetSession', function (req, res) {
	req.session.destroy(function (err) {
		if (err) {
			res.render('error', {
				message: "ERROR",
				error: {
					status: "Errore nel distruggere la sessione",
					stack: err
				},
				info: false
			});
		} else {
			res.redirect('/');
		}
	});
});

router.get('/results', function (req, res) {
	PhraseState.PhraseStateNumber2(function (err, positives, negatives, notDecided) {
		if (err) {
			res.render('error', {
				message: "ERROR",
				error: {
					status: err.message,
					stack: err.error
				},
				info: false
			});
		} else {
			res.render('state',
				{
					positives: positives,
					negatives: negatives,
					notDecided: notDecided,
					info: false
				});
		}
	});
});



module.exports = router;
