const {login, signUp} = require('../../controllers/auth/authController');
const express = require('express');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);

module.exports = router;