const { getDb } = require('../db/connect');
const { ObjectId } = require('mongodb');


const getAllUsers = async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection('users').find().toArray();
    result.forEach(user => delete user.password);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users.', error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const db = getDb();
    const userId = new ObjectId(req.params.id);
    const result = await db.collection('users').findOne({ _id: userId });
    if (result) {
      delete result.password;
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user.', error: error.message });
  }
};

// POST: Criar um novo usuário
const createUser = async (req, res) => {
  try {
    const db = getDb();
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password, 
      role: req.body.role || 'user'
    };
    if (!user.email || !user.password) {
      return res.status(400).json({ message: 'Email and password are required fields.' });
    }
    const response = await db.collection('users').insertOne(user);
    if (response.acknowledged) {
      res.status(201).json({ message: 'User created successfully!', userId: response.insertedId });
    } else {
      res.status(500).json({ message: 'An error occurred while creating the user.' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid data provided.', error: error.message });
  }
};

// PUT: Atualizar um usuário
const updateUser = async (req, res) => {
  try {
    const db = getDb();
    const userId = new ObjectId(req.params.id);
    const updatedUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role || 'user'
    };
    const response = await db.collection('users').replaceOne({ _id: userId }, updatedUser);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'User not found or no data was changed.' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid data provided.', error: error.message });
  }
};

// DELETE: Deletar um usuário
const deleteUser = async (req, res) => {
  try {
    const db = getDb();
    const userId = new ObjectId(req.params.id);
    const response = await db.collection('users').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'User deleted successfully!' });
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user.', error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};