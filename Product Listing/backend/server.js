const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); 

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const userRoute = require('./routes/user.route'); 
app.use('/api/users', userRoute);

app.get('/', (req, res) => {
    res.send('Sentinel AI Server is Running and Database is Connected! ');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(` Server is flying on port ${PORT}`);
});