const express = require('express');
const router = express.Router();
const { authenticateJWT, authorizeRole } = require('../../middlewares/authMiddlewares');
const {
    getAllBooks, getBookById,
    searchBook
} = require('../../controllers/customer/bookController');



router.get('/', authenticateJWT, authorizeRole('customer'), getAllBooks);

router.get('/:id', authenticateJWT, authorizeRole('customer'), getBookById);


router.get('/search/:genre', authenticateJWT, authorizeRole('customer'), searchBook);

module.exports = router;