const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 8888;
require('dotenv').config();

let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = 'todo';

MongoClient.connect(dbConnectionStr)
  .then(client => {
    console.log(`Connected to ${dbName} Database`);
    db = client.db(dbName);
  })
  .catch(err => console.error(`Connection error: ${err}`))

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (request, response) => {
  const todoItems = await db.collection('todos').find().toArray();
  const itemsLeft = await db.collection('todos').countDocuments({completed: false});
  response.render('index.ejs', { items: todoItems, left: itemsLeft });
});

app.post('/addTodo', (request, response) => {
  db.collection('todos').insertOne({thing: request.body.todoItem, completed: false})
  .then(result => {
    console.log('Todo Added');
    response.redirect('/');
  })
  .catch(error => console.error(error));
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});