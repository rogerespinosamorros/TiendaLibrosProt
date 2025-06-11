const { getOrders } = require('../../services/admin/orderService');
const Order = require('../../models/Order');


const fetchOrders = async (req, res) => {
    try {
        const response = await getOrders();
        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        await Order.findByIdAndDelete(orderId);
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



module.exports = {
    fetchOrders, deleteOrder
};