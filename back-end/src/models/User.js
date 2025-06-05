const moongose = require('mongoose');
const { Schema } = moongose;

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
        // 'admin' or 'user'
        enum: ['customer', 'admin'],
        default: 'customer',
    }
}, {timestamps: true});

module.exports = moongose.models.User || moongose.model('User', userSchema);