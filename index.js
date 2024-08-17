const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
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



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASS}@cluster0.qexkjce.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

    const allproductcollection = client.db('productDB').collection('products');

    app.get('/products', async (req, res) => {
      const Brand = req.query.Brand_Name; 
      const CategoryName = req.query.Category_Name;
      const Pricerange = req.query.Price;
      const sortOption = req.query.sorting;
      const page = parseInt(req.query.page) || 1; 
      const limit = parseInt(req.query.limit) || 10;
      let query = {};
    
      if (Brand) {
        query = { Brand_Name: Brand }; 
      }
      if (CategoryName) {

        query.Category_Name = CategoryName;
         
      }
      if(Pricerange){
        const [minPrice, maxPrice] = Pricerange.split('-').map(Number);
        query.Price = { $gte: minPrice, $lte:maxPrice};
      }
      let sortQuery = {};

      if (sortOption) {
        if (sortOption === "Low to High") {
          sortQuery.Price = 1; 
        } else if (sortOption === "High to Low") {
          sortQuery.Price = -1; 
        } else if (sortOption === "Newest first") {
          sortQuery.Product_Creation_date = -1; 
        }
      }

      const skip = (page - 1) * limit;

      
      const cursor = allproductcollection
        .find(query)
        .sort(sortQuery)
        .skip(skip)
        .limit(limit);

      const result = await cursor.toArray();
      const totalItems = await allproductcollection.countDocuments(query); 
      const totalPages = Math.ceil(totalItems / limit); 

      res.send({
        products: result,
        totalItems,
        totalPages,
        currentPage:page,
});
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Job Task Server is running...')
})

app.listen(port, () => {
    console.log(`Job Task Server is running on port : ${port}`)
})