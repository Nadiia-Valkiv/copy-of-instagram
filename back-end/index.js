const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./authRouter.js');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors())

app.use(express.json());
app.use('/auth', authRouter);



const start = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/mydb')
        app.listen(PORT, () => console.log(`server started on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
};

start();


