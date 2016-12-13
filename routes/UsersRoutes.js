var express = require('express');
var router = express.Router();
var UsersController = require('../controllers/UsersController.js');

/*
 * GET
 */
router.get('/', UsersController.list);

/*
 * GET
 */
router.get('/:id', UsersController.show);

/*
 * POST
 */
router.post('/', UsersController.create);

/*
 * PUT
 */
router.put('/:id', UsersController.update);

/*
 * DELETE
 */
router.delete('/:id', UsersController.remove);

module.exports = router;
