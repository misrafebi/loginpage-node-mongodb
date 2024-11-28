// src/signup.js
const express = require('express');
// const bcrypt = require('bcrypt');
const router = express.Router();
const collection = require('./db'); // Import collection model from db.js

// Register User
router.post("/signup", async (req, res) => {
    try{
        const data = {
            name: req.body.username,
            password: req.body.password
        };
    
        // Check if the username already exists
        const existingUser = await collection.findOne({ name: data.name });
        if (existingUser) {
            res.render('signup',{errorMessage:"User already exists. Please choose a different username."})
        } 
        await collection.create(data);
        console.log("User registered successfully");
        res.render("signup",{successMessage:"User registered successfully"});
    
    }catch(error){
        console.error("Error in signup:", error);
        res.status(500).render('signup', {
            errorMessage: "An error occurred. Please try again."
        });
    }
    });

module.exports = router;
