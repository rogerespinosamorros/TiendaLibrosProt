const { addBookToCart, fetchCartByUser } = require('../../services/customer/cartService');

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
        res.status(response.statis).json(response.data);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    postBookToCart,
    getCartByUser
};