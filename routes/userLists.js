const express = require('express');
const router = express.Router();
const listsController = require('../controllers/userLists');
const { ensureAuth } = require('../middleware/authenticate'); 

router.get('/', listsController.getAllLists);
router.get('/:id', listsController.getListById);


router.post('/', ensureAuth, listsController.createList);
router.put('/:id', ensureAuth, listsController.updateList);
router.delete('/:id', ensureAuth, listsController.deleteList);

module.exports = router;