const express = require('express');
const multer = require('multer')
const mongoose = require('mongoose')
const fs = require('fs');
const app = express.Router();
let upload = multer()

// Models
const books = require('../Database/Models/book');
const authors = require('../Database/Models/author');
const users = require('../Database/Models/user');

 
const path = require('path')

app.get('/allbooks', (req,res) => {
    const allBooks = books.find();
    res.json(allBooks);
})

app.post('/addBook', upload.single('image'),async (req,res) => {
    let newBook = {
            token: req.headers.authorization,
            title: req.body.title,
            publishDate: req.body.publishDate,
            price: req.body.price,
            authorId: req.body.authorId,
            userId: req.body.userId,
            imagePath: ''
    };

    // If not authorized
    if(!newBook.token)
    {
        return res.status(401).send("unauthorized");
    }

    // Checking if the user exists
    if(newBook.userId.match(/^[0-9a-fA-F]{24}$/) && mongoose.isValidObjectId(newBook.userId))    
    {
        users.findById(newBook.userId,(err, user) => {
            if(err)
            {
                return res.sendStatus(400);
                
            }
            else if(!user)
            {
                return res.status(404).send("User is not found");
            }
        })
    }
    else
    {
        return res.status(404).send("Wrong id format");
    }

    // Checking if the author exists
    if(newBook.authorId.match(/^[0-9a-fA-F]{24}$/) && mongoose.isValidObjectId(newBook.authorId))    
    {
        authors.findById(newBook.authorId,(err, user) => {
            if(err)
            {
                return res.sendStatus(400);
                
            }
            else if(!user)
            {
                return res.status(404).send("Author is not found");
            }
        })
    }
    else
    {
        return res.status(404).send("Wrong id format");
    }

    // Generating the folder of the user if it doesn't exist
    const folderName = path.join(__dirname , "../Users/" , newBook.userId)
    if(!fs.existsSync(folderName))
    {    
        fs.mkdirSync(folderName);
    }

    // Setting the image path and name
    newBook.imagePath = path.join(folderName,"\\",req.file.originalname)

    // Saving the image inside of it's user's folder
    fs.writeFile(newBook.imagePath, req.file.buffer,(err) => {
        if(err)
        {
            return res.status(400).send("An error occured while saving the image");
        }
        else
        {
            console.log("Asfsafnasf");
            const book = new books({...newBook})
            book.save().then(result => {
                console.log("Done");
                return res.status(200).send(result);
            })
            .catch(err => {
                console.log("Error: " + err);
                return res.status(400).send(err);
            })
        }
    })
})

module.exports = app