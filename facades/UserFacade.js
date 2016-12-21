var UserModel = require('../models/UserModel.js');

/**
 * UserFacade.js
 *
 * @description :: Server-side logic for managing User.
 */
module.exports = {

	/**
	 * UserFacade.list()
     * @param {function} callback Function with two parameters, err and data
	 */
	list: function (callback) {
		UserModel.find(function (err, Users) {
			if (err) {
				callback({
					code: 500,
					message: 'Error when getting User.',
					error: err
				}, null);
			} else {
				callback(0, Users); //200
			}
		});
	},

	/**
	 * UserFacade.show()
     * @param {json} params object with data
     * @param {function} callback Function with two parameters, err and data
	 */
	show: function (params, callback) {
		UserModel.findOne({_id: params.id}, function (err, User) {
			if (err) {
				callback({
					code: 500,
					message: 'Error when getting User.',
					error: err
				}, null);
			} else {
				if (!User) {
					callback({
						code: 404,
						message: 'No such User'
					}, null);
				} else {
					callback(0, User); //200
				}
			}
		});
    },

	/**
	 * UserFacade.findByEmail()
     * Find a user by given email
     * @param {json} params object with data
     * @param {function} callback Function with two parameters, err and data
	 */
	findByEmail: function (params, callback) {
		UserModel.findOne({ Email: params.email }, function (err, User) {
			if (err) {
				callback({
					code: 500,
					message: 'Error when getting User.',
					error: err
				}, null);
			} else {
				if (!User) {
					callback({
						code: 404,
						message: 'No such User'
					}, null);
				} else {
					callback(0, User); //200
				}
			}
		});
	},

	/**
	 * UserFacade.create()
     * @param {json} params object with data
     * @param {function} callback Function with two parameters, err and data
	 */
	create: function (params, callback) {
		var User = new UserModel(params.newObj);

		User.save(function (err, User) {
			if (err) {
				callback({
					code: 500,
					message: 'Error when creating User',
					error: err
				}, null);
			} else {
				callback(0, User); //201
			}
		});
	},

	/**
	 * UserFacade.update()
     * @param {json} params object with data
     * @param {function} callback Function with two parameters, err and data
	 */
	update: function (params, callback) {
		UserModel.findOne({_id: params.id}, function (err, User) {
			if (err) {
				callback({
					code: 500,
					message: 'Error when getting User',
					error: err
				}, null);
			} else {
				if (!User) {
					callback({
						code: 404,
						message: 'No such User'
					}, null);
				} else {
                    User.Name = params.modifiedObj.Name ? params.modifiedObj.Name : User.Name;
                    User.Surname = params.modifiedObj.Surname ? params.modifiedObj.Surname : User.Surname;
					User.Email = params.modifiedObj.Email ? params.modifiedObj.Email : User.Email;
					
					User.save(function (err, User) {
						if (err) {
							callback({
								code: 500,
								message: 'Error when updating User.',
								error: err
							}, null);
						} else {
							callback(0, User); //200
						}
					});
				}
			}
		});
	},

	/**
	 * UserFacade.remove()
     * @param {json} params object with data
     * @param {function} callback Function with two parameters, err and data
	 */
	remove: function (params, callback) {
		UserModel.findByIdAndRemove(params.id, function (err, User) {
			if (err) {
				callback({
					code: 500,
					message: 'Error when deleting the User.',
					error: err
				}, null);
			} else {
				callback(0, null); //204
			}
		});
	}
};
