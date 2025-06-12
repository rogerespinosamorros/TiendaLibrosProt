import { useEffect, useState } from "react";
import { getCartByUser, placeOrder, deleteCartItem } from "../../service/customer";
import { Backdrop, Box, CircularProgress, Grid, Typography, Paper, Button, Dialog, DialogContentText, TextField, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";


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


export default function Cart() {

    const [loading, setLoading] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [order, setOrder] = useState({});
    const [formData, setFormData] = useState({
        orderDescription: "",
        address: ""
    });
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const fetchCartByUser = async () => {
        setLoading(true);
        try {
            const response = await getCartByUser();
            if (response.status === 200) {
                setOrder(response.data);
                setCartItems(response.data.cartItem);
            }
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCartByUser();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await placeOrder(formData);
            if (response.status === 200) {
                navigate(`/customer/dashboard`);
                enqueueSnackbar("Order placed successfully!", { variant: "success", autoHideDuration: 6000 });
                setOpen(false);
            }
        } catch (error) {
            enqueueSnackbar("Getting error while placing an order", { variant: "error", autoHideDuration: 6000 });
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteCartItem = async (cartItemId) => {
        setLoading(true);
        try {
            const response = await deleteCartItem(cartItemId);
            if (response.status === 200) {
                enqueueSnackbar("Cart item deleted successfully!", { variant: "success" });
                fetchCartByUser();
            }
        } catch (error) {
            console.log(error)
            enqueueSnackbar("Error deleting cart item", { variant: "error"});
        } finally {
            setLoading(false);
        }
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
          
            {cartItems.length > 0 ? (
                <>
                
          
                    <Box sx={{ flexGrow: 1, p: 5 }}>
                        <Grid container spacing={1}>
                            <Grid container item spacing={3}>
                                {cartItems.map(item => (
                                    <Grid item xs={4}>
                                        <Item key={item.book._id}>
                                            <Img src={item.book.imageUrl} alt="product-image" style={{ width: 70, height: 70 }} />
                                            <Typography variant="h6" className={`item-name ${item.highlighted ? 'highlight' : ''}`}>
                                                Name: {item.book.title}
                                            </Typography>
                                            <Typography variant="body1" className="item-price">
                                                Price: ${item.book.price}
                                            </Typography>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                sx={{ mt:1 }}
                                                onClick={() => handleDeleteCartItem(item._id)}
                                            >
                                                Delete
                                            </Button>
                                        </Item>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Box>
                    <Box sx={{ flexGrow: 1, p: 5, display: 'flex', justifyContent: 'flex-end' }}>
                        <Grid container spacing={1} direction="column" alignItems="flex-end">
                            <Grid item>
                                <Typography>Total Amount: ${order.amount}</Typography>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" color="primary" onClick={() => setOpen(true)} sx={{ mt: 2 }}>
                                    Place Order
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                    
                </>
            ) : (
                <Box
                    sx={{
                        flexGrow: 1,
                        p: 5,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="h4">Nothing to see here. Cart is empty</Typography>
                </Box>
            )}

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit
                }}
            >
                <DialogTitle>Place Order</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Place your order by adding any special instruction in description and adress.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="address"
                        name="address"
                        label="Address"
                        type="text"
                        multiline
                        maxRows={4}
                        fullWidth
                        variant="standard"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="orderDescription"
                        name="orderDescription"
                        label="Description or Instruction"
                        type="text"
                        multiline
                        maxRows={4}
                        fullWidth
                        variant="standard"
                        value={formData.orderDescription}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button type="submit">Place Order</Button>
                </DialogActions>
            </Dialog>
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