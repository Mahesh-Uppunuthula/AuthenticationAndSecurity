require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs')
const mongoose = require('mongoose');
const md5 = require('md5');
require('./db.connect');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

// Routes
const homeRoute = require('./routes/homeRoute');
const loginRoute = require('./routes/loginRoute');
const registerRoute = require('./routes/registerRoute');

app.use('/', homeRoute);
app.use('/login', loginRoute);
app.use('/register', registerRoute);

app.listen(3000, ()=>{
    console.log("server started on port 3000");
})