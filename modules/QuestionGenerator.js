var RelationFacade = require(__base + 'facades/RelationFacade');


function generateQuestion(phrase, relation, callback) {
	//phrase and relation not null
	var subjectType = relation.SubjectType;
	var objectType = relation.ObjectType;
	var firstMember = "<b>" + subjectType + "</b> <u>" + phrase.Phrase + "</u> <b>" + objectType + "</b>";
	var secondMember = "<b>" + subjectType + "</b> <u>" + relation.RepresentativePhrase + "</u> <b>" + objectType + "</b>";

	var question = "<span class='grey'>Does </span>\u00AB... " + firstMember + " ...\u00BB <span class='grey'>mean that</span> \u00AB... " + secondMember + " ...\u00BB?";
	callback(question);
}

module.exports = {
	/**
	 * generateQuestions(phrases, relation, callback)
	 *
	 * @description :: Generate a list of questions, starting form a list of phrases
	 * and the associated relation.
	 * Each question is used for asking users if the meaning of a single phrase is equivalent to
	 * the associated relation's representative phrase.
	 *
	 */
	generateQuestions: function (phrases, relation, callback) {
		if (relation) {
			var questions = [];
			var ids = [];
			if (phrases.length == 0) {
				callback(0, { questions: questions, ids: ids });
			} else {
				phrases.forEach(function (currentPhrase, index, phrasesRef) {
					generateQuestion(currentPhrase, relation, function (question) {
						questions.push({ _id: currentPhrase._id, question: question });
						ids.push(currentPhrase._id);
						if (index == phrasesRef.length - 1) {
							callback(0, { questions: questions, ids: ids });
						}
					});
				});
			}
		} else {
			callback({ message: 'ERR: Cannot generate questions! Input relation not exist.' }, null);
		}

	}
};