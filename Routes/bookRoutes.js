const express = require('express')
const books = require('../books')
const app = express.Router();

app.get('/allBooks', (req,res) => {
    res.json(books)
})

app.get('/asdsa', (req,res) => {
    res.json(books)
})


module.exports = app