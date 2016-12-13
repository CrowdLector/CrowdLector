var UsersModel = require('../models/UsersModel.js');

/**
 * UsersController.js
 *
 * @description :: Server-side logic for managing Userss.
 */
module.exports = {

    /**
     * UsersController.list()
     */
    list: function (req, res) {
        UsersModel.find(function (err, Userss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Users.',
                    error: err
                });
            }
            return res.json(Userss);
        });
    },

    /**
     * UsersController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        UsersModel.findOne({_id: id}, function (err, Users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Users.',
                    error: err
                });
            }
            if (!Users) {
                return res.status(404).json({
                    message: 'No such Users'
                });
            }
            return res.json(Users);
        });
    },

    /**
     * UsersController.create()
     */
    create: function (req, res) {
        var Users = new UsersModel({			Nome : req.body.Nome,			Cognome : req.body.Cognome,			Email : req.body.Email
        });

        Users.save(function (err, Users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Users',
                    error: err
                });
            }
            return res.status(201).json(Users);
        });
    },

    /**
     * UsersController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        UsersModel.findOne({_id: id}, function (err, Users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Users',
                    error: err
                });
            }
            if (!Users) {
                return res.status(404).json({
                    message: 'No such Users'
                });
            }

            Users.Nome = req.body.Nome ? req.body.Nome : Users.Nome;			Users.Cognome = req.body.Cognome ? req.body.Cognome : Users.Cognome;			Users.Email = req.body.Email ? req.body.Email : Users.Email;			
            Users.save(function (err, Users) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Users.',
                        error: err
                    });
                }

                return res.json(Users);
            });
        });
    },

    /**
     * UsersController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        UsersModel.findByIdAndRemove(id, function (err, Users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Users.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
