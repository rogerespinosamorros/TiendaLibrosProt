import { useState } from 'react';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Box,
    Typography,
    Container,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    Backdrop
} from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import BookIcon from '@mui/icons-material/Book';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { postBook } from "../../service/admin";
import GENRES from '../../../../utils/constants/genres';
import ROUTES from '../../../../utils/constants/routes'; // asegúrate de tenerlo arriba





const defaultTheme = createTheme()

//Validar imagen url
const isValidImageUrl = (url) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
    });
};

export default function PostBook() {
    const [conditions] = useState(["New", "Near New", "Good", "Acceptable"]);
    const genres = GENRES;


    const [book, setBook] = useState({
        title: "",
        author: "",
        description: "",
        price: 0,
        genre: "",
        condition: "",
        edition: "",
        imageUrl: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        const numericValue = (name === "price") ? parseFloat(value) : value;
        setBook({
            ...book,
            [name]: numericValue
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const validImage = await isValidImageUrl(book.imageUrl);
        if (!validImage) {
            enqueueSnackbar("Invalid image URL. Please provide a working image.", { variant: "error" });
            setLoading(false);
            return;
        }

        if (book.description.trim().length < 60) {
            enqueueSnackbar("Description must be at least 60 characters long.", { variant: "error" });
            setLoading(false);
            return;
        }


        try {
            const response = await postBook(book);
            if (response.status === 201) {
                navigate(ROUTES.ADMIN.DASHBOARD);
                enqueueSnackbar("Book posted successfully!", { variant: "success", autoHideDuration: 6000 });
            }
        } catch (error) {
            enqueueSnackbar("Failed to post book. Please try again.", { variant: "error", autoHideDuration: 6000 });
        } finally {
            setLoading(false);
        }
    };



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
                                <BookIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Post a Book
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
                                    step="0.01"
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
                                        {GENRES.map((genre) => (
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
                                        !book.imageUrl
                                    }
                                >
                                    {loading ? <CircularProgress color="success" size={24} /> : "Post Book"}
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            </Box>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="success" />
            </Backdrop>
        </>
    );
}