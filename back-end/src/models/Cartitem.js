const moongose = require('mongoose');
const { Schema } = moongose;

const cartItemSchema = new Schema({
    price: {
        type: Number

    },
    quantity: {
        type: Number

    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        default: null

    },


}, { timestamps: true });

const CartItem = moongose.model('CartItem', cartItemSchema);
module.exports = CartItem;
