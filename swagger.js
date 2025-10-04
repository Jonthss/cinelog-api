const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'CineLog API',
        description: 'API to catalog movies, user lists, and reviews.',
    },
    host: process.env.NODE_ENV === 'production' ? 'cinelog-api.onrender.com' : 'localhost:8080',
    schemes: process.env.NODE_ENV === 'production' ? ['https'] : ['http'],
    definitions: {
        Movie: {
            title: "Inception",
            director: "Christopher Nolan",
            year: 2010,
            genre: "Sci-Fi",
            rating: 8.8
        },
        UserList: {
            listName: "My Favorites",
            ownerId: "user123",
            movies: [
                "60d5ecf3e5b3f2a8c4f9d8a1",
                "60d5ecf3e5b3f2a8c4f9d8a2"
            ]
        }
    }
};

const outputFile = './swagger-output.json'; // Where the file will be saved
const endpointsFiles = ['./routes/index.js']; // The main file that calls all other routes

// Generates swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);