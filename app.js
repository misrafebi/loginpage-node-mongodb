const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const nocache = require('nocache');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(nocache());

app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    },
}));

const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');
const connectDB = require('./db/connectdb');

app.use('/admin', adminRouter);
app.use('/user', userRouter);

connectDB();

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});
