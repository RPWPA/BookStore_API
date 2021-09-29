const express = require('express');
const fs = require('fs');
const { db } = require('../Database/Database');
const books = require('../Database/Models/book');
const app = express.Router();

app.get('/allbooks', (req,res) => {
    console.log(req);
    const allBooks = books.find();
    console.log(allBooks);
    res.json(allBooks);
})

app.post('/addBook', async (req,res) => {
    console.log(req.body)
    let newBook = {
        name: req.body.name,
        publishDate: req.body.publishDate,
        price: req.body.price,
        authorId: req.body.authorId,
        image: req.body.image,
        userId: req.body.userId
    };

    // Creating the user's folder if it doesn't exist.
    const folderName = "./" + await users.findOne({userName}).userName
    if(!fs.existsSync(folderName))
    {    
        fs.mkdirSync(folderName);
    }
    
    
    
    
})

module.exports = app