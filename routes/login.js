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
            return res.send("Username not found");
        }
        if (req.body.password !== check.password) {
            return res.send("Wrong Password");
        } else {
            return res.render("home"); 
        }
    } catch (error) {
        res.send("Invalid Details");
    }
});

module.exports = router;
