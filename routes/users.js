const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const { ensureAuth } = require('../middleware/authenticate');

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);


router.post('/', ensureAuth, usersController.createUser);
router.put('/:id', ensureAuth, usersController.updateUser);
router.delete('/:id', ensureAuth, usersController.deleteUser);

module.exports = router;