import { useEffect, useState } from 'react';
import { deleteBook, getBooks, searchBook } from '../../service/admin';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, Button, Typography, Backdrop, CircularProgress, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import GENRES from '../../../../utils/constants/genres';

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
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '580px', // importante que coincida
    width: '100%',       // fuerza el mismo ancho para todos
    boxSizing: 'border-box',
    overflow: 'hidden',
    textAlign: 'center',
}));









export default function AdminDashboard() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState('');
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

    const handleGenreChange = async (e) => {
        setLoading(true);
        const selectedGenre = e.target.value;
        setSelectedGenre(selectedGenre);

        try {
            if (selectedGenre === "") {
                // Si no se selecciona ningún género, recuperamos todos los libros
                await fetchBooks();
            } else {
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


    const handleDeleteBook = async (id) => {
        setLoading(true);
        try {
            const response = await deleteBook(id);
            if (response.status === 200) {
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
            <Box
                sx={{
                    minHeight: "100vh",
                    width: "100vw",
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 0,
                    background: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
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
                            id="genre"
                            value={selectedGenre}
                            onChange={handleGenreChange}
                            label="Select a genre to search"

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
                                        minHeight: 580, // altura mínima uniforme como en CustomerDashboard
                                        boxSizing: 'border-box',
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
                                    <Box sx={{ mt: 2, flexGrow: 1 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Author:</strong> {book.author || 'N/A'}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                mt: 1,
                                                minHeight: 60,
                                                maxHeight: 80,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: 'vertical',
                                                wordBreak: 'break-word',
                                            }}
                                        >
                                            <strong>Description:</strong> {book.description || 'No description available'}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            <strong>Price:</strong> ${book.price ?? '0.00'}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            <strong>Genre:</strong> {book.genre || 'N/A'}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            <strong>Condition:</strong> {book.condition || 'N/A'}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            <strong>Edition:</strong> {book.edition || 'N/A'}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            <strong>Status:</strong> {book.status || 'Unknown'}
                                        </Typography>
                                    </Box>

                                    {/* Botones */}
                                    <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            endIcon={<EditIcon />}
                                            onClick={() => handleUpdateBookClick(book._id)}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            endIcon={<DeleteIcon />}
                                            onClick={() => handleDeleteBook(book._id)}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </Item>
                            </Grid>

                        ))}
                    </Grid>
                </Box>







            </Box>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="success" />
            </Backdrop>
        </>
    )

};