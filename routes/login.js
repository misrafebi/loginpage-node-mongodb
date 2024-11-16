// src/login.js
const express = require('express');
// const bcrypt = require('bcrypt');
const router = express.Router();
const collection = require('./db'); // Import collection model from db.js

// Login user
router.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            return res.render("login", { errorMessage: "Username not found" });
        }
        if (req.body.password !== check.password) {
            return res.render("login", { errorMessage: "Wrong Password" });
        } else {
            req.session.loggined = true
            // req.session.username = check.name;
            return res.redirect('/home')
        }
    } catch (error) {
        res.render('login',{errorMessage:"Invalid Details"});
    }
});

router.get('/home', (req, res) => {
    if (!req.session.loggined) {
        return res.redirect('/login'); // Prevent access to home if not logged in
    }
    res.render("home");
});

module.exports = router;
