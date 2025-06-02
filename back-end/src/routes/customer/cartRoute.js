const express = require('express');
const router = express.Router();
const { authenticateJWT, authorizeRole } = require('../../middlewares/authMiddlewares');
const { postBookToCart } = require('../../controllers/customer/cartController');

router.post('/:bookId', authenticateJWT, authorizeRole('customer'), postBookToCart);

module.exports = router;