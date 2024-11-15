// app.js
const express = require("express");
const path = require("path");

const app = express();

// Convert data into JSON format and parse URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set up static files and EJS view engine
app.use(express.static("public"));
app.set("view engine", "ejs");

// Import main router
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const port = 5001;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
