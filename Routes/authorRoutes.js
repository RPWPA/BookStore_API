const authors = require('../Database/Models/author');
const express = require('express');
const app = express.Router();

// Authorization
const isAuthorized = require('../Middlewares/authorization.middleware');
const authorCheck = require('../Middlewares/authorCheck.middleware');

app.get('/getAllAuthors', (req,res) => {
    authors.find().then(result => {
        res.status(200).send(result);
    })
    .catch(err => {
        res.status(404).send(err);
    })
})

app.post('/getAuthorById', (req,res) => {
    authors.findById(req.body.authorId).exec()
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

app.post('/addAuthor', isAuthorized,(req,res) => {
    if(!req.body.name)
    {
        res.status(400).end("name is required");
        return;
    }
    if(!req.body.birthday)
    {
        res.status(400).end("birthday is required");
        return;
    }
    const author = new authors({...req.body})
    author.save().then(result => {
        res.status(200).send(result)
    })
    .catch(err => {
        res.status(400).send(err)
    })
})

app.post('/updateAuthor', isAuthorized, authorCheck,(req,res) => {
    if(!req.body.name)
    {
        res.status(400).end("name is required");
        return;
    }
    if(!req.body.birthday)
    {
        res.status(400).end("birthday is required");
        return;
    }
    
    authors.updateOne({_id : req.body.authorId}, { name: req.body.name, birthday: req.body.birthday}).then(result => {
        res.status(200).send(result)
    })
    .catch(err => {
        res.status(404).send("Author is not found")
    })
})

module.exports = app