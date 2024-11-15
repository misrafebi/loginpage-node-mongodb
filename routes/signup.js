// src/signup.js
const express = require('express');
// const bcrypt = require('bcrypt');
const router = express.Router();
const collection = require('./db'); // Import collection model from db.js

// Register User
router.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    };

    // Check if the username already exists
    const existingUser = await collection.findOne({ name: data.name });
    if (existingUser) {
        return res.send('User already exists. Please choose a different username.');
    } 

    // Hash the password and save the user
    // const saltRounds = 10;
    // data.password = await bcrypt.hash(data.password, saltRounds);

    await collection.create(data);
    console.log("User registered successfully");
    res.send("User registered successfully");
});

module.exports = router;
