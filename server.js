const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const routes = require('./routes');
const dotenv = require('dotenv');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // ... (other CORS headers if necessary)
    next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', routes);

mongodb.initDb((err) => {
    if (err) {
        console.error(err);
    } else {
        app.listen(port, () => {
            console.log(`Server running on port ${port} and connected to the database.`);
        });
    }
});
