import { useEffect, useState } from 'react';
import { getBooks, searchBook, addBookToCart } from '../../service/customer';
import { useSnackbar } from 'notistack';

import {
    Box,
    Grid,
    Button,
    Typography,
    Backdrop,
    CircularProgress,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import GENRES from '../../../../utils/constants/genres';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '520px',
    boxSizing: 'border-box',
    overflow: 'hidden',
    textAlign: 'center',
}));

export default function CustomerDashboard() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState('');
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
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleGenreChange = async (e) => {
        const selectedGenre = e.target.value;
        setSelectedGenre(selectedGenre);
        setLoading(true);

        try {
            if (selectedGenre === '') {
                // Si no hay género seleccionado, vuelve a cargar todos los libros
                await fetchBooks();
            } else {
                // Si hay género seleccionado, realiza la búsqueda
                const response = await searchBook(selectedGenre);
                if (response.status === 200) {
                    setBooks(response.data);
                }
            }
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };


    const handleAddBookToCart = async (bookId) => {
        setLoading(true);
        try {
            const response = await addBookToCart(bookId);
            if (response.status === 201) {
                enqueueSnackbar('Book added to cart successfully!', {
                    variant: 'success',
                    autoHideDuration: 6000,
                });
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                enqueueSnackbar('Book already exists in cart.', {
                    variant: 'error',
                    autoHideDuration: 6000,
                });
            } else {
                enqueueSnackbar('Error while adding book to cart.', {
                    variant: 'error',
                    autoHideDuration: 6000,
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Box
                sx={{
                    minHeight: '100vh',
                    width: '100vw',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 0,
                    background: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
                }}
            >
                <Grid
                    sx={{
                        marginTop: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <FormControl sx={{ mt: 2, width: 400 }} margin="normal">
                        <InputLabel id="genre-label">Select genre to search</InputLabel>
                        <Select
                            labelId="genre-label"
                            id="genre-select"
                            value={selectedGenre}
                            label="Select genre to search"
                            onChange={handleGenreChange}
                        >
                            <MenuItem value="">Select a genre</MenuItem>
                            {GENRES.map((genre) => (
                                <MenuItem key={genre} value={genre}>
                                    {genre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Box sx={{ flexGrow: 1, px: 2, py: 4, width: '100%' }}>
                    <Grid container spacing={4} justifyContent="center">
                        {books.map((book) => (
                            <Grid item xs={12} sm={6} md={4} key={book._id} sx={{ display: 'flex' }}>
                                <Item
                                    sx={{
                                        width: '100%',
                                        maxWidth: 600,
                                        margin: '0 auto',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        height: '100%',
                                        minHeight: 580, // ajusta según el contenido que tengas
                                    }}
                                >
                                    {/* Imagen centrada */}
                                    <Box
                                        sx={{
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            mb: 2,
                                        }}
                                    >
                                        <img
                                            src={book.imageUrl}
                                            alt={book.title}
                                            style={{
                                                width: '150px',
                                                height: '220px',
                                                objectFit: 'cover',
                                            }}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = '/default-book.png';
                                            }}
                                        />
                                    </Box>

                                    {/* Título */}
                                    <Typography variant="h6" sx={{ textAlign: 'center', wordBreak: 'break-word' }}>
                                        <strong>{book.title}</strong>
                                    </Typography>

                                    {/* Texto informativo */}
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Author:</strong> {book.author}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                mt: 1,
                                                maxHeight: 60,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                wordBreak: 'break-word',
                                            }}
                                        >
                                            <strong>Description:</strong> {book.description}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            <strong>Price:</strong> ${book.price}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            <strong>Genre:</strong> {book.genre}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            <strong>Condition:</strong> {book.condition}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            <strong>Edition:</strong> {book.edition}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            <strong>Status:</strong> {book.status}
                                        </Typography>
                                    </Box>

                                    {/* Botón */}
                                    {book.status === 'Available' && (
                                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                endIcon={<AddShoppingCartIcon />}
                                                onClick={() => handleAddBookToCart(book._id)}
                                            >
                                                Add to Cart
                                            </Button>
                                        </Box>
                                    )}
                                </Item>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

            </Box>

            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="success" />
            </Backdrop>
        </>
    );
}
