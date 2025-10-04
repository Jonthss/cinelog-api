const express = require('express');
const router = express.Router();
const listsController = require('../controllers/userLists');

router.get('/', listsController.getAllLists);
router.get('/:id', listsController.getListById);
router.post('/', listsController.createList);
router.put('/:id', listsController.updateList);
router.delete('/:id', listsController.deleteList);

module.exports = router;