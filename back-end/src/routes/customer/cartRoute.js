const express = require('express');
const router = express.Router();
const { authenticateJWT, authorizeRole } = require('../../middlewares/authMiddlewares');
const { postBookToCart, getCartByUser } = require('../../controllers/customer/cartController');

router.post('/:bookId', authenticateJWT, authorizeRole('customer'), postBookToCart);

router.get('/', authenticateJWT, authorizeRole('customer'), getCartByUser);

module.exports = router;