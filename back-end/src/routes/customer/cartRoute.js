const express = require('express');
const router = express.Router();
const { authenticateJWT, authorizeRole } = require('../../middlewares/authMiddlewares');
const { postBookToCart, getCartByUser, deleteBookFromCart, updateCartQuantity } = require('../../controllers/customer/cartController');

router.post('/:bookId', authenticateJWT, authorizeRole('customer'), postBookToCart);

router.get('/', authenticateJWT, authorizeRole('customer'), getCartByUser);

router.delete('/:cartItemId', authenticateJWT, authorizeRole('customer'), deleteBookFromCart)

router.put('/updateQuantity/:cartItemId', authenticateJWT, authorizeRole('customer'), updateCartQuantity);

module.exports = router;