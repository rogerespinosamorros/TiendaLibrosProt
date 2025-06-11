const Order = require('../../models/Order');
const Book = require('../../models/Book');
const User = require('../../models/User');
const CartItem = require('../../models/CartItem');


const addBookToCart = async (userId, bookId) => {
    try {
        let activeOrder = await Order.findOne({ user: userId, orderStatus: 'Pending' }).populate({
            path: 'cartItem',
            populate: { path: 'book' }
        });

        // If no active order, create one
        if (!activeOrder) {
            activeOrder = await new Order({
                user: userId,
                orderStatus: 'Pending',
                cartItem: [],
                amount: 0,
                address: ''
            }).save();
            // Populate cartItem for consistency
            activeOrder = await Order.findById(activeOrder._id).populate({
                path: 'cartItem',
                populate: { path: 'book' }
            });
        }

        // Check if the book is already in the cart
        if (
            activeOrder.cartItem.some(
                item => item.book && item.book._id.toString() === bookId
            )
        ) {
            return { status: 409, data: 'This book is already in the cart.' };
        }

        // Find book and user
        const [book, user] = await Promise.all([
            Book.findById(bookId),
            User.findById(userId)
        ]);

        if (!book || !user) return { status: 404, data: 'Book or user not found' };

        // Create and save new cart item
        const savedCartItem = await new CartItem({
            order: activeOrder._id,
            user: user._id,
            book: book._id,
            price: book.price,
            quantity: 1
        }).save();

        // Update order
        activeOrder.amount += book.price;
        activeOrder.cartItem.push(savedCartItem._id);
        await activeOrder.save();

        return { status: 201, data: 'Book added to cart successfully' };
        } catch (error) {
            console.error('Error adding book to cart:', error);
            return { status: 500, data: 'Internal server error' };
        }
    }

const fetchCartByUser = async (userId) => {
    const activeOrder = await Order.findOne({ user: userId, orderStatus: 'Pending' })
        .populate({
            path: 'cartItem',
            populate: { path: 'book' }
        });
    if (!activeOrder) return { status: 404, data: 'Active order not found' };

    return { status: 200, data: activeOrder };

};

const removeBookFromCart = async (userId, cartItemId) => {
    try {
        const activeOrder = await Order.findOne ({ user: userId, orderStatus: 'Pending'});
        if (!activeOrder) return { status: 404, data: 'No active order found' };
        // console.log('cartItemId:', cartItemId, typeof cartItemId);
        // console.log('activeOrder.cartItem:', activeOrder.cartItem);
        activeOrder.cartItem = activeOrder.cartItem.filter(
            itemId => itemId.toString() !== cartItemId.toString()
        );

        const cartItems = await CartItem.find({ _id: { $in: activeOrder.cartItem } })
        activeOrder.amount = cartItems.reduce((sum, item) => sum + item.price, 0);
        await activeOrder.save();

        await CartItem.findByIdAndDelete(cartItemId);
        return { status: 200, data: 'Book removed from cart successfully' };

    } catch (error) {
        console.error('Error deleting book from cart:', error);
        return { status: 500, data: 'Internal server error' }
    }
};


module.exports = {
    addBookToCart, fetchCartByUser, removeBookFromCart
};