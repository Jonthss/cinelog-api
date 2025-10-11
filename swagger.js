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
        },
        User: {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            password: "password123",
            role: "user"
        }
    }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

// Gera o swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);