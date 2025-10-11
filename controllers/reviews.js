const { getDb } = require('../db/connect');
const { ObjectId } = require('mongodb');

// GET: Obter todas as reviews
const getAllReviews = async (req, res) => {
    try {
        const db = getDb();
        const result = await db.collection('reviews').find().toArray();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews.', error: error.message });
    }
};

// GET: Obter uma única review pelo ID
const getReviewById = async (req, res) => {
    try {
        const db = getDb();
        const reviewId = new ObjectId(req.params.id);
        const result = await db.collection('reviews').findOne({ _id: reviewId });
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Review not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching the review.', error: error.message });
    }
};

// POST: Criar uma nova review
const createReview = async (req, res) => {
    try {
        const db = getDb();
        const review = {
            userId: req.body.userId,  
            movieId: req.body.movieId,   
            rating: req.body.rating,     
            comment: req.body.comment,  
            createdAt: new Date()       
        };

        // Validação dos dados
        if (!review.userId || !review.movieId || !review.rating) {
            return res.status(400).json({ message: 'userId, movieId, and rating are required fields.' });
        }
        if (typeof review.rating !== 'number' || review.rating < 1 || review.rating > 10) {
            return res.status(400).json({ message: 'Rating must be a number between 1 and 10.' });
        }

        const response = await db.collection('reviews').insertOne(review);
        if (response.acknowledged) {
            res.status(201).json({ message: 'Review created successfully!', reviewId: response.insertedId });
        } else {
            res.status(500).json({ message: 'An error occurred while creating the review.' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid data provided.', error: error.message });
    }
};

// PUT: Atualizar uma review existente
const updateReview = async (req, res) => {
    try {
        const db = getDb();
        const reviewId = new ObjectId(req.params.id);
        const updatedReview = {
            userId: req.body.userId,
            movieId: req.body.movieId,
            rating: req.body.rating,
            comment: req.body.comment,
            // Não atualizamos o createdAt, mas podemos adicionar um updatedAt se quisermos
        };

        // Validação dos dados
        if (!updatedReview.userId || !updatedReview.movieId || !updatedReview.rating) {
            return res.status(400).json({ message: 'userId, movieId, and rating are required fields.' });
        }

        const response = await db.collection('reviews').replaceOne({ _id: reviewId }, updatedReview);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Review not found or no data was changed.' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid data provided.', error: error.message });
    }
};

// DELETE: Deletar uma review
const deleteReview = async (req, res) => {
    try {
        const db = getDb();
        const reviewId = new ObjectId(req.params.id);
        const response = await db.collection('reviews').deleteOne({ _id: reviewId });
        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'Review deleted successfully!' });
        } else {
            res.status(404).json({ message: 'Review not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting the review.', error: error.message });
    }
};

module.exports = {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
};