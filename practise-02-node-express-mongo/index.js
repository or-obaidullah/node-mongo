const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html');
})


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://organic-user:XEW9YuZ8p6PZfZYQ@cluster0.fi07c.mongodb.net/studentDb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const ObjectId = require('mongodb').ObjectID;

client.connect(err => {
  const collection = client.db('studentDb').collection("studentsInfo");

  //create
  app.post('/addStudent', (req,res) => {
    const student = req.body;
    collection.insertOne(student)
    .then(result => {
        res.redirect('/');
    })
  })

  //read
  app.get('/allStudent', (req,res) => {
      collection.find({})
      .toArray((err, documents) => {
        res.send(documents)
      })
  })

  //update
  app.get('/student/:id', (req, res) => {
    collection.find({_id: ObjectId(req.params.id)})
    .toArray((err, documents) => {
      res.send(documents[0])
    })
  })
  app.patch('/updateInfo/:id', (req, res) => {
    collection.updateOne({_id: ObjectId(req.params.id)},
    {
      $set: {name: req.body.name, age: req.body.age, cgpa: req.body.cgpa}
    }
    )
    .then(result => {
      res.send(result.modifiedCount> 0);
    })
  })

  //delete
  app.delete('/delete/:id', (req,res) => {
    collection.deleteOne({_id: ObjectId(req.params.id)})
    .then(result => {
        res.send(result.deletedCount > 0)
    })

  })

});




app.listen(3000)