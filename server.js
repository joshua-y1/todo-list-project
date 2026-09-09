const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 8888;
require('dotenv').config();

app.get('/', (req, res) => {
    res.send("Hello World");
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});