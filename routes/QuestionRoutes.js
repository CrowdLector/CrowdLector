var express = require('express');
var router = express.Router();
var QuestionFacade = require('./QuestionFacade.js');

/*
 * GET
 */
router.get('/', QuestionFacade.list);

/*
 * GET
 */
router.get('/:id', QuestionFacade.show);

/*
 * POST
 */
router.post('/', QuestionFacade.create);

/*
 * PUT
 */
router.put('/:id', QuestionFacade.update);

/*
 * DELETE
 */
router.delete('/:id', QuestionFacade.remove);

module.exports = router;
