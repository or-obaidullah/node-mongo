const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req,res) => {
    const student = [{name:'obaidur', class:'bsc in cse'},
    {name:'kalam', class:'eleven'},
    {name:'salam', class:'eight'}
]
    res.send(student);
})

app.get('/product', (req,res) => {
    const product = {name: 'Alo', price: '20'}
    res.send(product)
})

const users = ['kobir', 'robin', 'selim', 'sakib']
app.get('/product/:id', (req,res) => {
    const id = req.params.id;
    const name = users[id];
    res.send({id, name});
})

app.post('/adduser', (req,res) => {
    const user = req.body;
    res.send(user);
})

app.listen(3000)