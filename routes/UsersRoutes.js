var express = require('express');
var router = express.Router();
var UsersFacade = require('./UsersFacade.js');

/*
 * GET
 */
router.get('/', UsersFacade.list);

/*
 * GET
 */
router.get('/:id', UsersFacade.show);

/*
 * POST
 */
router.post('/', UsersFacade.create);

/*
 * PUT
 */
router.put('/:id', UsersFacade.update);

/*
 * DELETE
 */
router.delete('/:id', UsersFacade.remove);

module.exports = router;
