// src/index.js
const express = require('express');
const router = express.Router();

// Import the login and signup routes
const loginRouter = require('./login');
const signupRouter = require('./signup');

// Render login and signup pages
router.get("/", (req, res) => {
    res.render("login");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

// Use the login and signup routes
router.use(loginRouter);
router.use(signupRouter);

module.exports = router;
