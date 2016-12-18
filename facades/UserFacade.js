var UserModel = require('../models/UserModel.js');

/**
 * UserFacade.js
 *
 * @description :: Server-side logic for managing User.
 */
module.exports = {

    /**
     * UserFacade.list()
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
     * UserFacade.create()
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
                    User.Nome = params.modifiedObj.Nome ? params.modifiedObj.Nome : User.Nome;
        			User.Cognome = params.modifiedObj.Cognome ? params.modifiedObj.Cognome : User.Cognome;
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
