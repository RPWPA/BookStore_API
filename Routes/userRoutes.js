const app = require('express').Router()
const books = require('../books')


app.get('/allUsers', (req,res) => {
    res.json(books)
})

module.exports = app