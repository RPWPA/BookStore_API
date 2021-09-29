const authors = require('../Database/Models/author');
const express = require('express');
const app = express.Router();

app.get('/getAllAuthors', (req,res) => {
    let authorList = []
    authors.find().then(result => {
        authorList = result
        res.status(200).send(authorList);
    })
    .catch(err => {
        res.status(404).send(err);
    })
})

app.post('/addAuthor', (req,res) => {
    console.log(req.body)
    const author = new authors({...req.body})
    author.save().then(res => {
        res.status(200).send(res)
    })
    .catch(err => {
        res.status(406).send(err)
    })
})

app.post('/updateAuthor', (req,res) => {
    let author = authors.findOne(req.body.name)
    author.save().then(res => {
        res.status(200).send(res)
    })
    .catch(err => {
        res.status(406).send(err)
    })
})

module.exports = app