var RelationFacade = require(__base + 'facades/RelationFacade');


function generateQuestion(phrase, relation, callback) {
	//phrase and relation not null
	var subjectType = relation.SubjectType;
	var objectType = relation.ObjectType;
	var firstMember = "<" + subjectType + "> " + phrase.Phrase + " <" + objectType + ">";
	var secondMember = "<" + subjectType + "> " + relation.RepresentativePhrase + " <" + objectType + ">";
	
	var question = "Does \"" + firstMember + "\" mean that \"" + secondMember + "\"?";
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
	generateQuestions : function(phrases, relation, callback) {
		if(relation){
			var questions = [];
			if (phrases.length==0){
				callback(0, questions);
			} else {
				phrases.forEach(function (currentPhrase, index, phrasesRef) {
                    generateQuestion(currentPhrase, relation, function (question) {
                        questions.push({ _id: currentPhrase._id, question: question });
						if (index == phrasesRef.length - 1) {
							callback(0, questions);
						}
					});
				});
			}
		} else {
			callback({message: 'ERR: Cannot generate questions! Input relation not exist.'}, null);
		}

	}
};