const swaggerAutogen = require('swagger-autogen')();
const isProduction = process.env.NODE_ENV === 'production';

const host = isProduction ? 'cinelog-api.onrender.com' : 'localhost:8080';
const schemes = isProduction ? ['https'] : ['http'];

// --- LOGS PARA DEPURACAO ---
console.log('--- EXECUTANDO GERADOR SWAGGER ---');
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`Host configurado para: ${host}`);
console.log(`Schemes configurados para: ${schemes}`);
console.log('---------------------------------');
// ----------------------------

const doc = {
  info: {
    title: 'CineLog API',
    description: 'API to catalog movies, user lists, and reviews.',
  },
  host: host,
  schemes: schemes,
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
        password: "securepassword123",
        role: "user"
      }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('Arquivo swagger-output.json gerado com sucesso.');
});