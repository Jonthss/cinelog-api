const express = require('express');
const router = express.Router();


router.use('/auth', require('./auth'));

router.use('/movies', require('./movies'));
router.use('/user-lists', require('./userLists'));
router.use('/users', require('./users'));

module.exports = router;