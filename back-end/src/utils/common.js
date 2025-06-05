const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

//Create admin account
const createAdminAcc = async () => {
    try{
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;
        const firstName = process.env.ADMIN_FIRST_NAME;
        const lastName = process.env.ADMIN_LAST_NAME;
        const ifExistsAdmin = await User.findOne({email: email});
        if (ifExistsAdmin) {
            console.log('Admin account already exists');
            return;
        };
        const hashPassword = await bcrypt.hash(password, 10);
        const admin = new User({
            email: email,
            firstName: firstName,
            lastName: lastName,
            role: 'admin',
            password: hashPassword
        });
        await admin.save();
        console.log('Admin account created successfully');
    } catch (error) {
        console.error(`Error creating admin account: ${error}`);
    }
};

module.exports = {createAdminAcc};