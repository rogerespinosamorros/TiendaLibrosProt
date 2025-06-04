const express = require('express');
require('dotenv').config();
// Importing mongoose and setting strictQuery option
const mongoose = require('mongoose');
mongoose.set('strictQuery', false); // or true, depending on your needs
// ...existing code...
const { createAdminAcc } = require('./utils/common');
const authRoute = require('./routes/auth/authRoute');
const cors = require('cors');
const adminBookRoute = require('./routes/admin/bookRoute');
const adminOrderRoute = require('./routes/admin/orderRoute')
const customerBookRoute = require('./routes/customer/bookRoute');
const customerCartRoute = require('./routes/customer/cartRoute');
const customerOrderRoute = require('./routes/customer/orderRoute')


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/tiendaLibrosProt';
const corsorigin = process.env.CORS_ORIGIN;

const corsOptions = {
    origin: corsorigin,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Connect to MongoDB
mongoose.connect(mongoURI, {})
    .then(() => {
        console.log('MongoDB connected');
        createAdminAcc();
    })
    .catch(error => console.error(`MongoDB connection error: ${error}`));
    

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use('/api/auth', authRoute);

// Admin routes
app.use('/api/admin/books', adminBookRoute);
app.use('/api/admin/order', adminOrderRoute);

// Customer routes
app.use('/api/customer/books', customerBookRoute);
app.use('/api/customer/cart', customerCartRoute);
app.use('/api/customer/order', customerOrderRoute);