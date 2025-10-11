const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviews.controllers');
const { ensureAuth } = require('../middleware/authenticate'); 


router.get('/', reviewsController.getAllReviews);
router.get('/:id', reviewsController.getReviewById);


router.post('/', ensureAuth, reviewsController.createReview);
router.put('/:id', ensureAuth, reviewsController.updateReview);
router.delete('/:id', ensureAuth, reviewsController.deleteReview);

module.exports = router;