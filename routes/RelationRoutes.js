var express = require('express');
var router = express.Router();
var RelationController = require('../controllers/RelationController.js');

/*
 * GET
 */
router.get('/', RelationController.list);

/*
 * GET
 */
router.get('/:id', RelationController.show);

/*
 * POST
 */
router.post('/', RelationController.create);

/*
 * PUT
 */
router.put('/:id', RelationController.update);

/*
 * DELETE
 */
router.delete('/:id', RelationController.remove);

module.exports = router;
