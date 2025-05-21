const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const { createAdminAcc } = require('./utils/common');

const app = express();

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/tiendaLibrosProt';

mongoose.connect(mongoURI, {})
    .then(() => {
        console.log('MongoDB connected');
        createAdminAcc();
    })
    .catch(error => console.error(`MongoDB connection error: ${error}`));
    

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

