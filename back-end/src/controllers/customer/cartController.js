const { addBookToCart, fetchCartByUser, removeBookFromCart } = require('../../services/customer/cartService');

const postBookToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const bookId = req.params.bookId;
        const response = await addBookToCart(userId, bookId);
        res.status(response.status).json({ message: response.data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getCartByUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const response = await fetchCartByUser(userId);
        res.status(response.status).json(response.data);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteBookFromCart = async (req, res) => {
    console.log('Delete /api/customer/cart/:cartItemId called', req.params.cartItemId);
    try {
        const { cartItemId } = req.params;
        const userId = req.user.id;
        const response = await removeBookFromCart(userId, cartItemId);
        return res.status(response.status).json({ message: response.data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    postBookToCart,
    getCartByUser,
    deleteBookFromCart
};