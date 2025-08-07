const {
  addBookToCart,
  fetchCartByUser,
  removeBookFromCart,
  updateCartItemQuantity
} = require('../../services/customer/cartService');

const postBookToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookId = req.params.bookId;
    const response = await addBookToCart(userId, bookId);
    res.status(response.status).json({ message: response.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCartByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const response = await fetchCartByUser(userId);
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBookFromCart = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const userId = req.user.id;
    const response = await removeBookFromCart(userId, cartItemId);
    res.status(response.status).json({ message: response.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCartQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cartItemId } = req.params;
    const { action } = req.body; // 'increase' o 'decrease'

    const response = await updateCartItemQuantity(userId, cartItemId, action);
    res.status(response.status).json({ message: response.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postBookToCart,
  getCartByUser,
  deleteBookFromCart,
  updateCartQuantity
};
