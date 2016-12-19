var UserFacade = require('../facades/UserFacade');
var Validator = require('validator');
 


module.exports = {
	checkUser: function(user){
		if(user.Email){
			return Validator.isEmail(user.Email);
		} else {
			return false;
		}
	}


}

