var express = require('express');
var router = express.Router();
var RelationFacade = require('../controllers/RelationFacade.js');

/*
 * GET
 */
router.get('/', RelationFacade.list);

/*
 * GET
 */
router.get('/:id', RelationFacade.show);

/*
 * POST
 */
router.post('/', RelationFacade.create);

/*
 * PUT
 */
router.put('/:id', RelationFacade.update);

/*
 * DELETE
 */
router.delete('/:id', RelationFacade.remove);

module.exports = router;
