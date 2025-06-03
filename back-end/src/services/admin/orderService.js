const Order = require("../../models/order");

const getOrders = async () => {
    const orders = await Order.find({ orderStatus: 'Placed'});

    if (orders.length < 0) return { status: 404, data: 'Orders not found'};

    return { status: 200, data: orders };
};

module.exports = { getOrders }

