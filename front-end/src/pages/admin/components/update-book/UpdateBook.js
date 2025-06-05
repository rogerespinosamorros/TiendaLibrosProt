import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
    Avatar,
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Container,
    CssBaseline,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import { getBookById, updateBook } from '../../service/admin';
import { useSnackbar } from 'notistack';
import { Edit } from '@mui/icons-material';



const defaultTheme = createTheme();

export default function UpdateBook() {
     const { id } = useParams();
    const [conditions] = useState(["New", "Near New", "Good", "Acceptable"]);
    const [genres] = useState([
        "Fiction",
        "Non-Fiction",
        "Mistery",
        "Thriller",
        "Science Fiction",
        "Fantasy",
        "Historical Fiction",
        "Romance",
        "Horror",
        "Biography",
        "Memoir",
        "Self-Help",
        "Health & Wellness",
        "Travel",
        "Science",
        "Philosophy",
        "Psychology",
        "Poetry",
        "Religion & Spirituality",
        "Cooking",
        "Art & Photography",
        "Children's Literature",
        "Young Adult",
        "Graphic Novel",
        "Drama",
        "Business & Economics",
        "Education",
        "Politics",
        "Law",
        "Anthology",
        "Adventure",
        "Classics",
        "Short Stories",
        "Humor",
        "Sports",
        "Comics",
        "Music",
        "True Crime",
        "Technology"
    ]);
    const [statuses] = useState(["Available", "Sold"]);

    const [book, setBook] = useState({
        title: "",
        author: "",
        description: "",
        price: 0,
        genre: "",
        condition: "",
        edition: "",
        imageUrl: "",
        status: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();  

    const fetchBook = async () => {
        setLoading(true);
        try {
            const response = await getBookById(id);
            if (response.status === 200) {
                setBook(response.data);
            }
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBook();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const numericValue = (name === 'price') ? parseInt(value, 10) : value;
        setBook({
            ...book,
            [name]: numericValue
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
             const response = await updateBook(id, book);
             if (response.status === 200) {
                 navigate(`/admin/dashboard`);
                 enqueueSnackbar('Book updated successfully', { variant: 'success', autoHideDuration: 6000 });
             }
        } catch (error) {
            enqueueSnackbar('Error updating book', { variant: 'error', autoHideDuration: 6000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <Edit />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Update Book
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="imageUrl"
                                label="Enter Image URL"
                                name="imageUrl"
                                autoComplete="imageUrl"
                                type="text"
                                autoFocus
                                value={book.imageUrl}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="title"
                                label="Enter Title"
                                name="title"
                                autoComplete="title"
                                type="text"
                                value={book.title}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="author"
                                label="Enter Author"
                                name="author"
                                autoComplete="author"
                                type="text"
                                value={book.author}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="description"
                                label="Enter Description"
                                name="description"
                                autoComplete="description"
                                type="text"
                                value={book.description}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="price"
                                label="Enter Price"
                                name="price"
                                autoComplete="price"
                                type="number"
                                value={book.price}
                                onChange={handleInputChange}
                            />
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="genre-label">Select genre</InputLabel>
                                <Select
                                    labelId="genre-label"
                                    id="genre"
                                    value={book.genre}
                                    onChange={handleInputChange}
                                    name="genre"
                                    label="Select genre"
                                >
                                    <MenuItem value="">Select a genre</MenuItem>
                                    {genres.map((genre) => (
                                        <MenuItem key={genre} value={genre}>
                                            {genre}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="condition-label">Select condition</InputLabel>
                                <Select
                                    labelId="condition-label"
                                    id="condition"
                                    value={book.condition}
                                    onChange={handleInputChange}
                                    name="condition"
                                    label="Select condition"
                                >
                                    <MenuItem value="">Select a condition</MenuItem>
                                    {conditions.map((condition) => (
                                        <MenuItem key={condition} value={condition}>
                                            {condition}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="edition"
                                label="Enter Edition"
                                name="edition"
                                autoComplete="edition"
                                type="text"
                                value={book.edition}
                                onChange={handleInputChange}
                            />
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="status-label">Select status</InputLabel>
                                <Select
                                    labelId="status-label"
                                    id="status"
                                    value={book.status}
                                    onChange={handleInputChange}
                                    name="status"
                                    label="Select status"
                                >
                                    <MenuItem value="">Select a status</MenuItem>
                                    {statuses.map((status) => (
                                        <MenuItem key={status} value={status}>
                                            {status}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={
                                    !book.title ||
                                    !book.author ||
                                    !book.description ||
                                    !book.price ||
                                    !book.genre ||
                                    !book.condition ||
                                    !book.edition ||
                                    !book.imageUrl ||
                                    !book.status 
                                }
                            >
                                {loading ? <CircularProgress color="success" size={24} /> : "Update Book"}
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="success" />
            </Backdrop>
        </>
    );
};
    
