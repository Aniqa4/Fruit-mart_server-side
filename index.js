const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
port = process.env.PORT || 5000;

//middlewares
app.use(cors());

app.get('/', (req, res) => {
    res.send('server is running')
})


app.listen(port, (req, res) => {
    console.log(`Server is running on port : ${port}`);
})