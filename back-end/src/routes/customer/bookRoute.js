const express = require('express');
const router = express.Router();
const { authenticateJWT, authorizeRole } = require('../../middlewares/authMiddlewares');
const {
    getAllBooks, getBookById,
    searchBook
} = require('../../controllers/customer/bookController');



router.get('/', authenticateJWT, authorizeRole('user'), getAllBooks);

router.get('/:id', authenticateJWT, authorizeRole('user'), getBookById);


router.get('/search/:genre', authenticateJWT, authorizeRole('user'), searchBook);

module.exports = router;