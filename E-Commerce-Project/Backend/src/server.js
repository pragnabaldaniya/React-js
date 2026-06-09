require('dotenv').config();
const express = require('express');

const morgan = require('morgan');
const cors = require('cors');

require('./config/db.config');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', require('./routes/'));

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("GLOBAL ERROR HANDLER:", err);
    res.status(err.status || 500).json({
        status: err.status || 500,
        error: true,
        message: err.message || "Internal server error",
        details: err
    });
});

app.listen(PORT, (err) => {
    if (err) {
        console.log("Server is not started..", err);
        return;
    }

    console.log("Server is started...");
});
