var express = require('express');
var router = express.Router();
var RelationHelper = require('../helpers/API/RelationHelper.js');

/*
 * GET
 */
router.get('/', RelationHelper.list);

/*
 * GET
 */
router.get('/:id', RelationHelper.show);

/*
 * POST
 */
router.post('/', RelationHelper.create);

/*
 * PUT
 */
router.put('/:id', RelationHelper.update);

/*
 * DELETE
 */
router.delete('/:id', RelationHelper.remove);

module.exports = router;
