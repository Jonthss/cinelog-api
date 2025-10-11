const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies');
const { ensureAuth } = require('../middleware/authenticate'); 

router.get('/', moviesController.getAllMovies);
router.get('/:id', moviesController.getMovieById);

router.post('/', ensureAuth, moviesController.createMovie);
router.put('/:id', ensureAuth, moviesController.updateMovie);
router.delete('/:id', ensureAuth, moviesController.deleteMovie);

module.exports = router;