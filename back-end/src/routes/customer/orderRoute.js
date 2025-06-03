const express = require('express');
const router = express.Router();
const { authenticateJWT, authorizeRole } = require('../../middlewares/authMiddlewares');
const { placeOrder, fetchOrdersByUser } = require('../../controllers/customer/orderController');

router.post('/', authenticateJWT, authorizeRole('customer'), placeOrder);

router.get('/', authenticateJWT, authorizeRole('customer'), fetchOrdersByUser)



module.exports = router;