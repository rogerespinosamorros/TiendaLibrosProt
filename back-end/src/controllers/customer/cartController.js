const { addBookToCart } = require('../../services/customer/cartService');

const postBookToCart = async (req, res) => {
    try {
        const { userId, bookId } = req.body;
        const response = await addBookToCart(userId, bookId);
        res.status(response.status).json({ message: response.data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    postBookToCart
};