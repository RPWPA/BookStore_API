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

app.post('/getAuthorById', async (req,res) => {
    console.log(req.body.authorId)
    await authors.findById(req.body.authorId).exec()
    .then(result => {
        if(!result)
            res.sendStatus(404)
        else{
            res.status(200).send(result)
        }
    })
    .catch(err => {
        console.log(err);
        res.status(404).send(err)
    })
})

app.post('/addAuthor', (req,res) => {
    console.log(req.body)
    const author = new authors({...req.body})
    author.save().then(result => {
        res.status(200).send(result)
    })
    .catch(err => {
        res.status(400).send(err)
    })
})

app.post('/updateAuthor', (req,res) => {
    authors.updateOne({where: {_id : req.body.authorId}}, {name: req.body.name, birthday: req.body.birthday}).then(result => {
        res.status(200).send(result)
    })
    .catch(err => {
        res.status(400).send(err)
    })
})

module.exports = app