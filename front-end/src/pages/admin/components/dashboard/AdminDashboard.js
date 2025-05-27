import React, { useEffect, useState } from 'react';
import { deleteBook, getBooks } from '../../service/admin';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Button, Typography, Backdrop, CircularProgress, Paper } from '@mui/material';
import { Edit as EditionIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    height: '250px',
    objectFit: 'cover',
});

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

export default function AdminDashboard() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await getBooks();
            if (response.status === 200) {
                setBooks(response.data);
            }
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleDeleteBook = async (id) => {
        setLoading(true);
        try {
            const respone = await deleteBook(id);
            if (respone.status === 200) {
                enqueueSnackbar('Book deleted successfully', { variant: 'success', autoHideDuration: 3000 });
                fetchBooks(); // Refresh the book list after deletion
            }
        } catch (error) {
            enqueueSnackbar('Error deleting book', { variant: 'error', autoHideDuration: 3000 });
        } finally {
            setLoading(false);
        }
    }

    const handleUpdateBookClick = (id) => {
        navigate(`/admin/book/${id}/edit`);
    }



    return (
        <>
            <Box sx={{ flexGrow: 1, p: 5 }}>
                <Grid container spacing={2}>
                    {books.map((book) => (
                        <Grid item xs={12} md={6} key={book.id}>
                            <Item>
                                <Box sx={{ display: 'flex', p: 3, alignItems: 'center' }}>
                                    <Box sx={{ width: '40%', display: 'flex', justifyContent: 'center', p: 2 }}>
                                        <Img alt="complex" src={book.imageUrl} sx={{ width: '100%', height: 'auto', maxWidth: '150px' }} />
                                    </Box>
                                    <Box sx={{ width: '60%', pl: 3 }}>
                                        <Typography variant="h6" component="div">
                                            <strong>{book.title}</strong>
                                        </Typography>
                                        <Box sx={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 1, mt: 2 }}>

                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Author:
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>{book.author}</strong>
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Description:
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>{book.description}</strong>
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Price:
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>${book.price}</strong>
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Genre:
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>{book.genre}</strong>
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Condition:
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>{book.condition}</strong>
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Edition:
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>{book.edition}</strong>
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Status:
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>{book.status}</strong>
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                            <Button
                                                variant='outlined'
                                                color='primary'
                                                endIcon={<EditIcon />}
                                                onClick={() => handleUpdateBookClick(book.id)}
                                            >
                                                Update
                                            </Button>
                                            <Button
                                                variant='outlined'
                                                color='error'
                                                endIcon={<DeleteIcon />}
                                                onClick={() => handleDeleteBook(id)}
                                            >
                                                Delete
                                            </Button>
                                        </Box>



                                    </Box>
                                </Box>
                            </Item>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="success" />
            </Backdrop>
        </>
    )

}