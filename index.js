const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors(
    {
        origin: [
            "http://localhost:5173"
            // "https://kajer-khoj.web.app",
            // "https://kajer-khoj.firebaseapp.com"
        ],
        credentials: true,
    }
));
app.use(express.json());



app.get('/', (req, res) => {
    res.send('Job Task Server is running...')
})

app.listen(port, () => {
    console.log(`Job Task Server is running on port : ${port}`)
})