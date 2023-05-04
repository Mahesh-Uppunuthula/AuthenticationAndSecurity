const { Db } = require('mongodb');
const mongoose = require('mongoose');
const DB_NAME = 'SECRETES_DB';
mongoose.connect('mongodb://127.0.0.1:27017/'+ DB_NAME);