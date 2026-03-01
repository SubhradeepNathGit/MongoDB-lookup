require('dotenv').config();
const express = require('express');
const connectDB = require('./app/config/db');
const morgan = require('morgan');
const app = express();
connectDB();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./app/routes'));

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`);
});