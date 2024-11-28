
const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));
app.set("view engine", "ejs");

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const port = 5001;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
