const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies');

router.get('/', moviesController.getAllMovies);
router.post('/', moviesController.createMovie);
router.get('/:id', moviesController.getMovieById);
router.put('/:id', moviesController.updateMovie);
router.delete('/:id', moviesController.deleteMovie);

module.exports = router;