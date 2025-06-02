const express = require('express');
const router = express.Router();
const { authenticateJWT, authorizeRole } = require('../../middlewares/authMiddlewares');
const { placeOrder } = require('../../controllers/customer/orderController');

router.post('/', authenticateJWT, authorizeRole('customer'), placeOrder);



module.exports = router;