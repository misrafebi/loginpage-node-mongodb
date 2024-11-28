// src/index.js
const express = require('express');
const router = express.Router();
const session = require('express-session')
const nocache = require('nocache')

router.use(session({
    secret: 'secret_key',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
}))

router.use(nocache())
router.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
    next();
});

// Import the login and signup routes
const loginRouter = require('./login');
const signupRouter = require('./signup');

// Render login and signup pages
router.get("/", (req, res) => {
    if(req.session.loggined){
        res.render('home')
    }
    res.render("login");
});

router.get('/login', (req, res) => {
    if(req.session.loggined){
        res.render('home')
    }
    res.render('login');
});

router.get("/signup", (req, res) => {
    if(req.session.loggined){
        res.render('home')
    }
    res.render("signup");
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).send("An error occurred.");
        }
        res.clearCookie("connect.sid"); 
        res.redirect('/login'); 
    });
});

const ensureLoggedIn = (req, res, next) => {
    if (!req.session.loggined) {
        return res.redirect('/login');
    }
    next();
};

router.get('/home', ensureLoggedIn, (req, res) => {
    // const username = req.session.username
    // res.render('home',{username})
    res.render('home')
});

// Use the login and signup routes
router.use(loginRouter);
router.use(signupRouter);

module.exports = router;
