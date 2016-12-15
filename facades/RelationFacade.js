var RelationModel = require('../models/RelationModel.js');

/**
 * RelationController.js
 *
 * @description :: Server-side logic for managing Relations.
 */
module.exports = {

    /**
     * RelationController.list()
     */
    list: function (req, res) {
        RelationModel.find(function (err, Relations) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Relation.',
                    error: err
                });
            }
            return res.json(Relations);
        });
    },

    /**
     * RelationController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        RelationModel.findOne({_id: id}, function (err, Relation) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Relation.',
                    error: err
                });
            }
            if (!Relation) {
                return res.status(404).json({
                    message: 'No such Relation'
                });
            }
            return res.json(Relation);
        });
    },

    /**
     * RelationController.create()
     */
    create: function (req, res) {
        var Relation = new RelationModel({			Name : req.body.Name,			RepresentativePhrase : req.body.RepresentativePhrase
        });

        Relation.save(function (err, Relation) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating Relation',
                    error: err
                });
            }
            return res.status(201).json(Relation);
        });
    },

    /**
     * RelationController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        RelationModel.findOne({_id: id}, function (err, Relation) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting Relation',
                    error: err
                });
            }
            if (!Relation) {
                return res.status(404).json({
                    message: 'No such Relation'
                });
            }

            Relation.Name = req.body.Name ? req.body.Name : Relation.Name;			Relation.RepresentativePhrase = req.body.RepresentativePhrase ? req.body.RepresentativePhrase : Relation.RepresentativePhrase;			
            Relation.save(function (err, Relation) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating Relation.',
                        error: err
                    });
                }

                return res.json(Relation);
            });
        });
    },

    /**
     * RelationController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        RelationModel.findByIdAndRemove(id, function (err, Relation) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the Relation.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
