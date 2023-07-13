const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
port = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.MongoDB_USERNAME}:${process.env.MongoDB_PASSWORD}@cluster0.6dclouy.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        //collections-----------------------------------------------------------------------
        const userCollection = client.db('fruit-mart').collection('users');
        const fruitCollection = client.db('fruit-mart').collection('fruits');
        const orderCollection = client.db('fruit-mart').collection('orders');
        //----------------------------------------x------------------------------------------


        //-----------------CRUD operations related to fruit collection-----------------------
        //get all fruits
        app.get("/fruits", async (req, res) => {
            console.log(req.headers);
            const cursor = fruitCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })


        //get 6 fruits
        app.get("/new-arrivals", async (req, res) => {
            console.log(req.headers);
            const cursor = fruitCollection.find().limit(8);
            const result = await cursor.toArray();
            res.send(result);
        })




        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('server is running')
})


app.listen(port, (req, res) => {
    console.log(`Server is running on port : ${port}`);
})