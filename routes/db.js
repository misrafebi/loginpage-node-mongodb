

// src/db.js
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/LOGIN_USERS_p1", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database Connected Successfully");
}).catch((err) => {
    console.log("Database cannot be Connected", err);
});

// Define the schema and create the model
const Loginschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = mongoose.model("users", Loginschema);

module.exports = collection;
