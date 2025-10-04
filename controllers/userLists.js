const { getDb } = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAllLists = async (req, res) => {
    try {
        const db = getDb();
        const result = await db.collection('userLists').find().toArray();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching lists.', error: error.message });
    }
};

const getListById = async (req, res) => {
    try {
        const db = getDb();
        const listId = new ObjectId(req.params.id);
        const result = await db.collection('userLists').findOne({ _id: listId });
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'List not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching the list.', error: error.message });
    }
};

const createList = async (req, res) => {
    try {
        const db = getDb();
        const userList = {
            listName: req.body.listName,
            ownerId: req.body.ownerId, 
            movies: req.body.movies || [] 
        };

        if (!userList.listName || !userList.ownerId) {
            return res.status(400).json({ message: 'listName and ownerId are required fields.' });
        }

        const response = await db.collection('userLists').insertOne(userList);
        if (response.acknowledged) {
            res.status(201).json({ message: 'List created successfully!', listId: response.insertedId });
        } else {
            res.status(500).json({ message: 'An error occurred while creating the list.' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid data provided.', error: error.message });
    }
};

const updateList = async (req, res) => {
    try {
        const db = getDb();
        const listId = new ObjectId(req.params.id);
        const updatedList = {
            listName: req.body.listName,
            ownerId: req.body.ownerId,
            movies: req.body.movies || []
        };

        if (!updatedList.listName || !updatedList.ownerId) {
            return res.status(400).json({ message: 'listName and ownerId are required fields.' });
        }
        
        const response = await db.collection('userLists').replaceOne({ _id: listId }, updatedList);
        if (response.modifiedCount > 0) {
            res.status(204).send(); 
        } else {
            res.status(404).json({ message: 'List not found or no data was changed.' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid data provided.', error: error.message });
    }
};

const deleteList = async (req, res) => {
    try {
        const db = getDb();
        const listId = new ObjectId(req.params.id);
        const response = await db.collection('userLists').deleteOne({ _id: listId });
        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'List deleted successfully!' });
        } else {
            res.status(404).json({ message: 'List not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting the list.', error: error.message });
    }
};

module.exports = {
    getAllLists,
    getListById,
    createList,
    updateList,
    deleteList
};
