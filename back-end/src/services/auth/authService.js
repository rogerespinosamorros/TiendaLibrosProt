const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const Order = require('../../models/Order');


//Create user account
const createUser = async (userData) => {

    const email = userData.email;
    const password = userData.password;
    const firstName = userData.firstName;
    const lastName = userData.lastName;


    const ifExistsUser = await User.findOne({ email: email });
    if (ifExistsUser) {
        const error = new Error('El usuario ya existe');
        error.status = 406;  // Not Acceptable
        throw error;
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        email: email,
        firstName: firstName,
        lastName: lastName,
        role: 'customer',
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

};


const loginUser = async (userData) => {
    const email = userData.email;
    const password = userData.password;

    const ifExistsUser = await User.findOne({ email: email });
    if (!ifExistsUser) {
        const error = new Error('El usuario no existe');
        error.status = 401;
        throw error;
    };

    const itsCorrectPassword = await bcrypt.compare(password, ifExistsUser.password);
    if (!itsCorrectPassword) {
        const error = new Error('Contraseña incorrecta');
        error.status = 401;
        throw error;
    };
    const token = jwt.sign({ id: ifExistsUser._id, role: ifExistsUser.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' });
    return token;


};

module.exports = { createUser, loginUser };