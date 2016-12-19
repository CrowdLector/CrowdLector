var express = require('express');
var router = express.Router();
var PhraseHelper = require('../helpers/API/PhraseHelper.js');

/*
 * GET
 */
router.get('/', PhraseHelper.list);

/*
 * GET
 */
router.get('/:id', PhraseHelper.show);

/*
 * POST
 */
router.post('/', PhraseHelper.create);

/*
 * PUT
 */
router.put('/:id', PhraseHelper.update);

/*
 * DELETE
 */
router.delete('/:id', PhraseHelper.remove);

module.exports = router;
