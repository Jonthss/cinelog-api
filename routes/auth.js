const express = require('express');
const passport = require('passport');
const router = express.Router();


const ensureAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/login'); 
};


router.get('/login', passport.authenticate('github', { scope: [ 'user:email' ] }));


router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { 
            return next(err); 
        }
        req.session.destroy((err) => {
            if (err) {
                console.log('Error destroying session during logout:', err);
                return next(err);
            }
            res.clearCookie('connect.sid'); 
            res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <title>Logged Out</title>
                <style>
                    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; text-align: center; margin-top: 50px; background-color: #f6f8fa; }
                    h1 { color: #24292e; } p { color: #586069; }
                    .container { max-width: 600px; margin: auto; padding: 20px; }
                    .links a { display: inline-block; margin: 10px; padding: 12px 24px; background-color: #0366d6; color: white; text-decoration: none; border-radius: 6px; }
                </style>
                </head>
                <body>
                <div class="container">
                    <h1>You have been successfully logged out!</h1>
                    <div class="links">
                        <a href="/">Go to Home Page</a>
                        <a href="/auth/login">Log in again</a>
                    </div>
                </div>
                </body>
                </html>
            `);
        });
    });
});


router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs',
  successRedirect: '/auth/welcome'
}));


router.get('/welcome', ensureAuth, (req, res) => {
    const userName = req.user.displayName || req.user.username;
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Welcome!</title>
            <style>
                 body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; text-align: center; margin-top: 50px; background-color: #f6f8fa; }
                 h1 { color: #24292e; } p { color: #586069; }
                 .container { max-width: 600px; margin: auto; padding: 20px; }
                 .links a { display: inline-block; margin: 10px; padding: 12px 24px; background-color: #0366d6; color: white; text-decoration: none; border-radius: 6px; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Welcome, ${userName}!</h1>
                <p>You are now logged in.</p>
                <div class="links">
                    <a href="/api-docs">API Documentation</a>
                    <a href="/auth/logout">Logout</a>
                </div>
            </div>
        </body>
        </html>
    `);
});

module.exports = router;