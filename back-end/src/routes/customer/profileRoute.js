// routes/customer/profileRoute.js
const express = require('express');
const router = express.Router();
const { authenticateJWT, authorizeRole } = require('../../middlewares/authMiddlewares');
const { getProfile, updateProfile, deleteProfile } = require('../../controllers/customer/profileController');

// Middleware para asegurar que solo accedan usuarios logueados con rol 'customer'
router.use(authenticateJWT, authorizeRole('customer'));

router.get('/', getProfile);
router.put('/', updateProfile);
router.delete('/', deleteProfile);

module.exports = router;
