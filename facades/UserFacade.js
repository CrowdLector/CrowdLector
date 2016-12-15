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
                callback(500, {
                    message: 'Error when getting User.',
                    error: err
                });
            } else {
                callback(200, Users);
            }
        });
    },

    /**
     * UserFacade.show()
     */
    show: function (params, callback) {
        UserModel.findOne({_id: params.id}, function (err, User) {
            if (err) {
                callback(500, {
                    message: 'Error when getting User.',
                    error: err
                });
            } else {
                if (!User) {
                    callback(404, {
                        message: 'No such User'
                    });
                } else {
                    callback(200, User);
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
                callback(500, {
                    message: 'Error when creating User',
                    error: err
                });
            } else {
                callback(201, User);
            }
        });
    },

    /**
     * UserFacade.update()
     */
    update: function (params, callback) {
        UserModel.findOne({_id: params.id}, function (err, User) {
            if (err) {
                callback(500, {
                    message: 'Error when getting User',
                    error: err
                });
            } else {
                if (!User) {
                    callback(404, {
                        message: 'No such User'
                    });
                } else {
                    User.Nome = params.modifiedObj.Nome ? params.modifiedObj.Nome : User.Nome;
        			User.Cognome = params.modifiedObj.Cognome ? params.modifiedObj.Cognome : User.Cognome;
        			User.Email = params.modifiedObj.Email ? params.modifiedObj.Email : User.Email;
        			
                    User.save(function (err, User) {
                        if (err) {
                            callback(500, {
                                message: 'Error when updating User.',
                                error: err
                            });
                        } else {
                            callback(200, User);
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
                callback(500, {
                    message: 'Error when deleting the User.',
                    error: err
                });
            } else {
                callback(204, null);
            }
        });
    }
};
