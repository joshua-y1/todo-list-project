const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 8888;
require('dotenv').config();

// SERVER SETUP
let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = 'todo';

MongoClient.connect(dbConnectionStr)
  .then(client => {
    console.log(`Connected to ${dbName} Database`);
    db = client.db(dbName);
  })
  .catch(err => console.error(`Connection error: ${err}`))

//   MIDDLEWARE
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// READ
app.get('/', async (request, response) => {
  const todoItems = await db.collection('todos').find().toArray();
  const itemsLeft = await db.collection('todos').countDocuments({completed: false});
  response.render('index.ejs', { items: todoItems, left: itemsLeft });
});

// CREATE
app.post('/addTodo', (request, response) => {
  db.collection('todos').insertOne({thing: request.body.todoItem, completed: false})
  .then(result => {
    console.log('Todo Added');
    response.redirect('/');
  })
  .catch(error => console.error(error));
});

// UPDATE
app.put('/markComplete', (request, response) => {
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{
      $set: {
        completed: true
      }    
    },{
        sort: {_id: -1},
        upsert: false  
    })
    .then(result => {
        console.log('Marked Complete');
        response.json('Marked Complete');
    })
    .catch(error => console.error(error));
})

app.put('/markUnComplete', (request, response) => {
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{
      $set: {
        completed: false
      }    
    },{
        sort: {_id: -1},
        upsert: false  
    })
    .then(result => {
        console.log('Marked Complete');
        response.json('Marked Complete');
    })
    .catch(error => console.error(error));
})

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});