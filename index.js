require('dotenv').config();
const PORT = process.env.PORT;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const db = require('./queries');


app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);


app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
});

app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserbyID);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users', db.deleteAllUsers);
app.delete('/users/:id', db.deleteUser);


app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`)
});
