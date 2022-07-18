const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    product: {
        type: Array,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: false

    },
    createdAt: {
        type: Date,
        default: Date.now
    }

}
);



const Order = mongoose.model('Order', orderSchema);


module.exports = Order;