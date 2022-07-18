const mongoose = require('mongoose');

// CREATE A MONGODB SCHEMA
const productShema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false

    },
    createdAt: {
        type: Date,
        default: Date.now

    }
}
);

const Product = mongoose.model('Product', productShema);


module.exports = Product;
