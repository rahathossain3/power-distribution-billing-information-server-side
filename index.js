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


async function run() {
    try {
        await client.connect();
        // console.log('database connected')
        //service 
        const serviceCollection = client.db('doctors_portal').collection('services');


    }
    finally {

    }


}

run().catch(console.dir);




// console.log(uri);

app.get('/', (req, res) => {
    res.send('Hello form doctor Uncle!')
})

app.listen(port, () => {
    console.log(`Doctors app listening on port ${port}`)
})