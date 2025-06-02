import { useEffect, useState } from "react";
import { getCartByUser } from "../../service/customer";
import { Backdrop, Box, CircularProgress, Grid, Typography, Paper } from "@mui/material";
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


export default function Cart() {

    const [loading, setLoading] = useState(false);
    const [cartItems, setCartItems] = useState([])
    const [order, setOrder] = useState({})


    const fetchCartByUser = async () => {
        setLoading(true);
        try {
            const response = await getCartByUser();
            if (response.status === 200) {
                setOrder(response.data);
                setCartItems(response.data.cartItems);
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


    return (
        <>
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
                    <Typography variant="h4">Nothing to see here.</Typography>
                </Box>
            )}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="success" />
            </Backdrop>
        </>
    )

};