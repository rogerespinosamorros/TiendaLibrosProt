import { useEffect, useState } from "react";
import { Backdrop, Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { getOrders, deleteOrder } from "../../service/admin";



export default function ViewOrders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await getOrders();
            if (response.status === 200) {
                setOrders(response.data);
            }
        } catch (error) {
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const formatPlacedAtDate = (postedDate) => {
        const date = new Date(postedDate);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-EU', options)
    };

    const handleDeleteOrder = async (orderId) => {
        setLoading(true);
        try {
            const response = await deleteOrder(orderId);
            if (response.status === 200) {
                setOrders(orders.filter(order => order._id !== orderId));
            }
        } catch (error) {
            console.error(error.message);
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
                <Box
                    sx={{
                        marginTop: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component='h1' variant='h5'>
                        Orders
                    </Typography>
                    </Box>
                    <TableContainer component={Paper} sx={{ width: "80%", mt: 3 }}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tracking ID</TableCell>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Amount</TableCell>
                                    <TableCell align="right">Description</TableCell>
                                    <TableCell align="right">Address</TableCell>
                                    <TableCell align="right">Placed At</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.trackingId}
                                        </TableCell>
                                        <TableCell align="right">{row.user.firstName + ' ' + row.user.lastName}</TableCell>
                                        <TableCell align="right">{row.amount}</TableCell>
                                        <TableCell align="right">{row.orderDescription}</TableCell>
                                        <TableCell align="right">{row.address}</TableCell>
                                        <TableCell align="right">{formatPlacedAtDate(row.updatedAt)}</TableCell>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleDeleteOrder(row._id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
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