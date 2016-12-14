var QuestionFacade = require('../controllers/QuestionFacade.js');

module.exports = {

	list: function (req, res) {
        QuestionFacade.list(function(code, response){
        	if(code==200){
        		return res.json(response);
        	} else {
        		return res.status(code).json(response);
        	}
        })
    }
}