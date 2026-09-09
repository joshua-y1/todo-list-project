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

app.get('/', (req, res) => {
    res.send("Hello World");
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});