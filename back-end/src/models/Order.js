const moongose = require('mongoose');
const { Schema } = moongose;

const orderSchema = new Schema({
    orderDescription: {
        type: String

    },
    amount: {
        type: Number,
        required: true

    },
    address: {
        type: String,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ['Pending', 'Placed'],
        required: true
    },
    trackingId: {
        type: String,
        default: () => require('uuid').v4() // Generates a unique tracking ID

    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cartItem: [{
        type: Schema.Types.ObjectId,
        ref: 'Order'
        
    }],


}, { timestamps: true });


module.exports = moongose.models.Order || moongose.model('Order', orderSchema);