const express = require('express')
const cors = require('cors');
// JWT 
const jwt = require('jsonwebtoken');
// dotenv config
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');


const app = express()
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());


//server user and password
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.y5m5n.mongodb.net/?retryWrites=true&w=majority`;

//mongodb client
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



/* 
// for jwt verifications 
function verifyJWT(req, res, next) {
    // 1: read authHeader
    const authHeader = req.headers.authorization;
    // 2
    if (!authHeader) {
        return res.status(401).send({ message: 'UnAuthorized access' });
    }
    //2.1: jodi token thake (get token)
    const token = authHeader.split(' ')[1];
    // 3: verify
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).send({ message: 'Forbidden access' })
        }
        req.decoded = decoded;
        //4:next
        next();
        // console.log(decoded); 
    });
    // console.log('abc');
}

 */




async function run() {
    try {
        await client.connect();
        // console.log('database connected')

        //All Biller Information
        const billerInformation = client.db('biller_information').collection('billing-list');



        //All Biller Information get all Information
        app.get('/billing-list', async (req, res) => {
            const query = {};
            const cursor = billerInformation.find(query);
            // const cursor = serviceCollection.find(query).project({ name: 1 });
            const billersInfo = await cursor.toArray();

            res.send(billersInfo);
        })



        /* 
                // get single product 
                app.get('/product/:id', async (req, res) => {
                    const id = req.params.id;
                    const query = { _id: ObjectId(id) };
                    const product = await productCollection.findOne(query);
                    res.send(product);
                })
         */

        //add new Biller info client
        app.post('/add-billing', async (req, res) => {
            const newBiller = req.body;
            const result = await billerInformation.insertOne(newBiller);
            res.send(result);
        })





    }
    finally {

    }


}

run().catch(console.dir);




// console.log(uri);

app.get('/', (req, res) => {
    res.send('Hello form Biller information!')
})

app.listen(port, () => {
    console.log(`Power Distribution app listening on port ${port}`)
})