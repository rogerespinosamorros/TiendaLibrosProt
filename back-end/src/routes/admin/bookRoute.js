const express = require('express');
const router = express.Router();
const { authenticateJWT, authorizeRole } = require('../../middlewares/authMiddlewares');
const {
    createBook, getAllBooks, getBookById,
    deleteBookById, updateBook, searchBook
} = require('../../controllers/admin/bookController');

router.post('/', authenticateJWT, authorizeRole('admin'), createBook);

router.get('/', authenticateJWT, authorizeRole('admin'), getAllBooks);

router.get('/:id', authenticateJWT, authorizeRole('admin'), getBookById);

router.delete('/:id', authenticateJWT, authorizeRole('admin'), deleteBookById);

router.put('/:id', authenticateJWT, authorizeRole('admin'), updateBook);

router.get('/search/:genre', authenticateJWT, authorizeRole('admin'), searchBook);

module.exports = router;