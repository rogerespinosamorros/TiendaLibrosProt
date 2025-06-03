const express = require('express');
const router = express.Router();
const { authenticateJWT, authorizeRole } = require('../../middlewares/authMiddlewares');
const { fetchOrders } = require('../../controllers/admin/orderController');

router.get('/', authenticateJWT, authorizeRole('admin'), fetchOrders)



module.exports = router;