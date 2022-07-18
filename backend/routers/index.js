const express = require('express');
const mongoose = require('mongoose');
const Product = require('../database/mongodb');
const Order = require('../database/orderdb');
const router = express.Router();

// GET REQUEST
router.get('/product', (req, res) => {
    Product.find()
        .then(products => {
            res.json(products);
        })
        .catch(err => {
            res.json(err);
        }
        );
}
);


// PRODUCTS GET REQUEST
router.get('/product/:id', (req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            res.json(product);
        })
        .catch(err => {
            res.json(err);
        }
        );
}
);

//BASKET GET REQUEST
router.get('/basket', (req, res) => {
    Order.find()
        .then(orders => {
            res.json(orders);
        }
        )
        .catch(err => {
            res.json(err);
        }
        );
}
);




// POST REQUEST
router.post('/admin/product/:id', (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
        createdAt: Date.now()
    });
    product.save()
        .then(product => {
            res.json(product);
        }
        )
        .catch(err => {
            res.json(err);
        }
        );
}
);

// PUT REQUEST
router.put('/admin/product/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body)
        .then(product => {
            res.json(product);
        }
        )
        .catch(err => {
            res.json(err);
        }
        );
}
);

// DELETE REQUEST
router.delete('/admin/product/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id)
        .then(product => {
            res.json(product);
        }
        )
        .catch(err => {
            res.json(err);
        }
        );
}
);

// ORDER POST REQUEST
router.post('/basket', async (req, res) => {
    try {
        const item = await Order.create(req.body); // Order nun bodysine post isteği atıyoruz.
        res.status(201).send(item);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});


// POST PRODUCT 
router.post('/admin/create', async (req, res) => {
    try {
        const item = await Product.create(req.body); // Product nun bodysine post isteği atıyoruz.
        res.status(201).send(item);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}
);




module.exports = router;