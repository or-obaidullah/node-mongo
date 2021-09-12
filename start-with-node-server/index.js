const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser')

const app = express();

app.use(cors());
app.use(bodyParser.json())


app.get('/', (req, res) => {
    const fruit = {
        product: 'Banana',
        price: 50
    }
    res.send(fruit)
})

app.get('/fruit/banana', (req,res) => {
    res.send({name:'banana', quantity: '1000'})
})
const users = ['sabed', 'asad', 'Jabed', 'Susmita', 'sabana']

app.get('/users/:id', (req,res) => {
    const id = req.params.id;
    console.log(req.query.sort);
    const name = users[id];
    res.send({id, name})
})

//post
app.post('/addUser', (req,res) => {
    //save to database
    const user = req.body;
    user.id = 55
    res.send(user);
})


app.listen(4200, ()=> console.log('Listening to port 4200'));