var express = require('express');
var router = express.Router();
var QuestionHelper = require('../helpers/QuestionHelper.js');

/*
 * GET
 */
router.get('/', QuestionHelper.list);

/*
 * GET
 */
router.get('/:id', QuestionHelper.show);

/*
 * POST
 */
router.post('/', QuestionHelper.create);

/*
 * PUT
 */
router.put('/:id', QuestionHelper.update);

/*
 * DELETE
 */
router.delete('/:id', QuestionHelper.remove);

module.exports = router;
