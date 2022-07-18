const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routers/index');



// EXPRESS APP 
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/', router);

require('dotenv').config();

// STATUS CODE
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Not Found'
    });
}
);

app.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message
    });
}
);
// MONGOOSE CONNECT
app.listen(process.env.PORT_NUMBER, () => {
    mongoose.connect(
        process.env.MONGO_DB_API_KEY,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log('Connected to MongoDB')
    );
}
);










