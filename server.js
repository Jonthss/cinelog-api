const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const routes = require('./routes');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));


app.use(passport.initialize());
app.use(passport.session());


passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.NODE_ENV === 'production' 
        ? 'https://cinelog-api.onrender.com/auth/github/callback' 
        : 'http://localhost:8080/auth/github/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));


passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((obj, done) => {
    done(null, obj);
});


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
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