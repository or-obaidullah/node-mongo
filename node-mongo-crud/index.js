const express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser')


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const pass = 'XEW9YuZ8p6PZfZYQ'


app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
})


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://organic-user:XEW9YuZ8p6PZfZYQ@cluster0.fi07c.mongodb.net/organicDb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const ObjectId = require('mongodb').ObjectID;

client.connect(err => {
  const collection = client.db("organicDb").collection("products");

  app.get("/products", (req, res) => {
    collection.find({})
    .toArray((err, documents) => {
      res.send(documents)
    })
  })

  app.get("/product/:id", (req, res) => {
    collection.find({_id: ObjectId(req.params.id)})
    .toArray((err, documents) => {
      res.send(documents[0])
    })
  })

  app.post("/addProduct", (req, res) => {
    const product = req.body;
    collection.insertOne(product)
    .then(result => {
      console.log('successfully send');
      res.redirect('/');
    })
  })

  app.patch('/update/:id', (req,res) => {
    collection.updateOne({_id: ObjectId(req.params.id)},
    {
      $set: {price: req.body.price, quantity: req.body.quantity}
    } )
    .then(result =>{
      res.send(result.modifiedCount > 0);
    })

  })

  app.delete('/delete/:id', (req,res) => {
    console.log(req.params.id)
    collection.deleteOne({_id: ObjectId(req.params.id)})
    .then( result => {
      res.send(result.deletedCount > 0);
    })
  })

});


app.listen(3000);