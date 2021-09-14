const express = require('express');
const { db } = require('../Database/Database');
const books = require('../Database/Models/book')
const app = express.Router();

app.get('/allbooks', (req,res) => {
    console.log(req)
    const allBooks = books.find()
    console.log(allBooks);
    res.json(allBooks)
})

module.exports = app