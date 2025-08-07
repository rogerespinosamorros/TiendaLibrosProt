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

        if (!activeOrder) {
            activeOrder = await new Order({
                user: userId,
                orderStatus: 'Pending',
                cartItem: [],
                amount: 0,
                address: ''
            }).save();

            activeOrder = await Order.findById(activeOrder._id).populate({
                path: 'cartItem',
                populate: { path: 'book' }
            });
        }

        // ⚠️ Cargar primero el libro y el usuario
        const [book, user] = await Promise.all([
            Book.findById(bookId),
            User.findById(userId)
        ]);

        if (!book || !user) return { status: 404, data: 'Book or user not found' };

        let existingCartItem = await CartItem.findOne({
            order: activeOrder._id,
            user: userId,
            book: bookId
        });

        if (existingCartItem) {
            existingCartItem.quantity += 1;
            existingCartItem.price += book.price;
            await existingCartItem.save();
        } else {
            existingCartItem = await new CartItem({
                order: activeOrder._id,
                user: user._id,
                book: book._id,
                price: book.price,
                quantity: 1
            }).save();

            activeOrder.cartItem.push(existingCartItem._id);
        }

        const cartItems = await CartItem.find({ _id: { $in: activeOrder.cartItem } });
        activeOrder.amount = cartItems.reduce((sum, item) => sum + item.price, 0);
        await activeOrder.save();

        return { status: 201, data: 'Book added to cart successfully' };

    } catch (error) {
        console.error('Error adding book to cart:', error);
        return { status: 500, data: 'Internal server error' };
    }
};

const fetchCartByUser = async (userId) => {
    try {
        const activeOrder = await Order.findOne({ user: userId, orderStatus: 'Pending' })
            .populate({
                path: 'cartItem',
                populate: { path: 'book' }
            });
        if (!activeOrder) return { status: 404, data: 'Active order not found' };

        return { status: 200, data: activeOrder };
    } catch (error) {
        console.error('Error fetching cart:', error);
        return { status: 500, data: 'Internal server error' };
    }
};

const removeBookFromCart = async (userId, cartItemId) => {
    try {
        const activeOrder = await Order.findOne({ user: userId, orderStatus: 'Pending' });
        if (!activeOrder) return { status: 404, data: 'No active order found' };

        activeOrder.cartItem = activeOrder.cartItem.filter(
            itemId => itemId.toString() !== cartItemId.toString()
        );

        const cartItems = await CartItem.find({ _id: { $in: activeOrder.cartItem } });
        activeOrder.amount = cartItems.reduce((sum, item) => sum + item.price, 0);
        await activeOrder.save();

        await CartItem.findByIdAndDelete(cartItemId);
        return { status: 200, data: 'Book removed from cart successfully' };

    } catch (error) {
        console.error('Error deleting book from cart:', error);
        return { status: 500, data: 'Internal server error' };
    }
};

const updateCartItemQuantity = async (userId, cartItemId, action) => {
    try {
        const cartItem = await CartItem.findById(cartItemId).populate('book');
        if (!cartItem) return { status: 404, data: 'Cart item not found' };

        // Validar propiedad del carrito
        const order = await Order.findById(cartItem.order);
        if (!order || order.user.toString() !== userId) {
            return { status: 403, data: 'Not authorized to modify this cart item' };
        }

        if (action === 'increase') {
            cartItem.quantity += 1;
            cartItem.price += cartItem.book.price;
        } else if (action === 'decrease' && cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            cartItem.price -= cartItem.book.price;
        }

        await cartItem.save();

        // Recalcular total del pedido
        const allItems = await CartItem.find({ _id: { $in: order.cartItem } });
        order.amount = allItems.reduce((sum, item) => sum + item.price, 0);
        await order.save();

        return { status: 200, data: 'Quantity updated' };

    } catch (error) {
        console.error('Error updating cart quantity:', error);
        return { status: 500, data: 'Internal server error' };
    }
};

module.exports = {
    addBookToCart,
    fetchCartByUser,
    removeBookFromCart,
    updateCartItemQuantity
};
