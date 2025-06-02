const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const Order = require('../../models/Order');


//Create user account
const createUser = async (userData) => {
    try {
        const email = userData.email;
        const firstName = userData.firstName;
        const lastName = userData.lastName;
        const password = userData.password;

        const ifExistsUser = await User.findOne({ email: email });
        if (ifExistsUser) {
            throw new Error('User already exists');
        };

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            email: email,
            firstName: firstName,
            lastName: lastName,
            role: 'user',
            password: hashedPassword,
        });
        const order = new Order({
            amount: 0,
            address: "Default Address",
            orderStatus: 'Pending',
            user: user
        });
        await order.save();
        await user.save();
        return user
    } catch (error) {
        console.error(`Error creating user: ${error}`);
    }
};


const loginUser = async (userData) => {
    try {
        const email = userData.email;
        const password = userData.password;

        const ifExistsUser = await User.findOne({ email: email });
        if (!ifExistsUser) {
            throw new Error('User not exists');
        };

        const itsCorrectPassword = await bcrypt.compare(password, ifExistsUser.password);
        if (!itsCorrectPassword) {
            throw new Error('Incorrect password');
        };
        const token = jwt.sign({ id: ifExistsUser._id, role: ifExistsUser.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1d' });
        return token;

    } catch (error) {
        console.error(`Error creating user: ${error}`);
    }
};

module.exports = { createUser, loginUser };