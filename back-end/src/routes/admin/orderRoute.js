const express = require('express');
const router = express.Router();
const { authenticateJWT, authorizeRole } = require('../../middlewares/authMiddlewares');
const { fetchOrders, deleteOrder } = require('../../controllers/admin/orderController');

router.get('/', authenticateJWT, authorizeRole('admin'), fetchOrders)

router.delete('/:orderId', authenticateJWT, authorizeRole('admin'), deleteOrder);



module.exports = router;