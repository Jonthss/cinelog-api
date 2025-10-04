const { getDb } = require('../db/connect');
const { ObjectId } = require('mongodb');

// GET ALL: Get all movies
const getAllMovies = async (req, res) => {
    try {
        const db = getDb();
        const result = await db.collection('movies').find().toArray();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movies.', error: error.message });
    }
};

// GET SINGLE: Get a single movie by ID
const getMovieById = async (req, res) => {
    try {
        const db = getDb();
        const movieId = new ObjectId(req.params.id);
        const result = await db.collection('movies').findOne({ _id: movieId });
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Movie not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching the movie.', error: error.message });
    }
};

// POST: Create a new movie
const createMovie = async (req, res) => {
    try {
        const db = getDb();
        const movie = {
            title: req.body.title,
            director: req.body.director,
            year: req.body.year,
            genre: req.body.genre,
            rating: req.body.rating
        };
        const response = await db.collection('movies').insertOne(movie);
        if (response.acknowledged) {
            res.status(201).json({ message: 'Movie created successfully!', movieId: response.insertedId });
        } else {
            res.status(500).json({ message: 'An error occurred while creating the movie.' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid data provided.', error: error.message });
    }
};

// PUT: Update an existing movie
const updateMovie = async (req, res) => {
    try {
        const db = getDb();
        const movieId = new ObjectId(req.params.id);
        const updatedMovie = {
            title: req.body.title,
            director: req.body.director,
            year: req.body.year,
            genre: req.body.genre,
            rating: req.body.rating
        };
        const response = await db.collection('movies').replaceOne({ _id: movieId }, updatedMovie);
        if (response.modifiedCount > 0) {
            res.status(204).send(); // 204 No Content is a standard response for success with no body
        } else {
            res.status(404).json({ message: 'Movie not found or no data was changed.' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid data provided.', error: error.message });
    }
};

// DELETE: Delete a movie
const deleteMovie = async (req, res) => {
    try {
        const db = getDb();
        const movieId = new ObjectId(req.params.id);
        const response = await db.collection('movies').deleteOne({ _id: movieId });
        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'Movie deleted successfully!' });
        } else {
            res.status(404).json({ message: 'Movie not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting the movie.', error: error.message });
    }
};

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie
};
