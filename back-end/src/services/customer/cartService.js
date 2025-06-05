const Order = require('../../models/Order');
const Book = require('../../models/Book');
const User = require('../../models/User');
const CartItem = require('../../models/cartItem');


const addBookToCart = async (userId, bookId) => {
    const activeOrder = await Order.findOne({ user: userId, orderStatus: 'Pending' }).populate('cartItem');
    if (!activeOrder) return { status: 404, data: 'No active order found for this user.' };

    if (activeOrder.cartItem.some(item => item.book.toString() === bookId))
        return { status: 409, data: 'This book is already in the cart.' };

    const [book, user] = await Promise.all([
        Book.findById(bookId),
        User.findById(userId)
    ]);

    if (!book || !user) return { status: 404, data: 'Book or user not found' };

    const savedCartItem = await new CartItem({
        order: activeOrder,
        user,
        book,
        price: book.price,
        quantity: 1
    }).save();

    activeOrder.amount += book.price;
    activeOrder.cartItem.push(savedCartItem);
    await activeOrder.save();
    return { status: 201, data: 'Book added to cart successfully' };

};

const fetchCartByUser = async (userId) => {
    const activeOrder = await Order.findOne({ user: userId, orderStatus: 'Pending' })
        .populate({
            path: 'cartItem',
            populate: { path: 'book' }
        });
    if (!activeOrder) return { status: 404, data: 'Active order not found' };

    return { status: 200, data: activeOrder };

};


module.exports = {
    addBookToCart, fetchCartByUser
};