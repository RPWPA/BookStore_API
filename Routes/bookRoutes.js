const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const fs = require('fs');
const app = express.Router();
let upload = multer();

// Models
const books = require('../Database/Models/book');
const users = require('../Database/Models/user');
// Authorization Middlewares
const isAuthorized = require('../Middlewares/authorization.middleware');
const authorCheck = require('../Middlewares/authorCheck.middleware');
const bookCheck = require('../Middlewares/bookCheck.middleware');

// For handeling navigating through the server
const path = require('path');
const userCheck = require('../Middlewares/userCheck.middleware');

app.get('/getAllBooks', (req,res) => {
    books.find().then((allBooks) => {
        res.json(allBooks)
    })
    .catch((err) => {
        res.status(404).send(err)
    })
    }
)

app.post('/addBook',isAuthorized, upload.single('image'), authorCheck, async (req,res) => {

    checkIncomingBookData(req,res)

    let newBook = {
            token: req.headers.authorization,
            title: req.body.title,
            publishDate: req.body.publishDate,
            price: req.body.price,
            authorId: req.body.authorId,
            userId: req.body.userId,
            imagePath: ''
    };

    // Generating the path for the image
    newBook.imagePath = await generateFolder(newBook.userId, req.file.originalname);
    // Saving the image inside of it's user's folder
    writeImage(newBook.imagePath,req.file.buffer, newBook,res);
})

app.get("/getBook", bookCheck, (req,res) => {
    books.findById(req.body.bookId, (err,book) => {
        if(err)
        {    
            res.status(404).send(err)
        }
        else
        {
            res.send(book)
        }
    }
)})

app.put("/updateBook", isAuthorized, upload.single('image'), bookCheck, (req,res) => {
    
    checkIncomingBookData(req,res)
    books.findById(req.body.bookId, (err) => {
        if(err)
        {    
            res.status(404).send(err)
        }
        else
        {
            books.updateOne({_id : req.body.bookId}, { title: req.body.title, publishDate: req.body.publishDate, authorId: req.body.authorId, price: req.body.price, imagePath: req.body.imagePath}).then(result => {
                res.status(200).send(result)
            })
        }
    })
})

/* #region Different way to implement addToFavorites */
/*app.post("/addToFavorites", isAuthorized, bookCheck, userCheck,async (req,res) => {
    
    var find = [];
    var tmp =users.findOne({_id:req.body.userId});
    find.push(tmp);

    Promise.all(find).then(user=>{
        add(user[0], req).then(arr=>{
            users.findByIdAndUpdate(req.body.userId, {$set:{favoriteBooks:  arr}},{new:true},(err, user) => {
                if(err)
                {
                    res.status(404).send(err)
                }
                else
                {
                    console.log(user.favoriteBooks);
                    res.status(200).send(user)
                }
            })
        }).catch(err=>{
            console.log(err);
        })
    })
})

var add = (user, req)=>{
    return new Promise((resolve,reject)=>{
        let favoriteBooks = [];
        favoriteBooks = user.favoriteBooks
        console.log(favoriteBooks);
        let s = favoriteBooks.length;
        favoriteBooks = [...favoriteBooks, req.body.bookId]
        console.log(favoriteBooks);
        if(favoriteBooks.length === s)
            reject("not same size");
        else
            resolve(favoriteBooks);

    });
} 
 */
/* #endregion */

app.post("/addToFavorites", isAuthorized, bookCheck, userCheck,async (req,res) => {
    let favoriteBooks = []
    users.findOne({_id:req.body.userId}).then(user => {
        favoriteBooks = user.favoriteBooks
        if(!favoriteBooks.includes(req.body.bookId))
            favoriteBooks.push(req.body.bookId)
        users.findByIdAndUpdate(req.body.userId, {favoriteBooks},{new:true},(err, user) => {
            if(err)
            {
                res.status(404).send(err)
            }
            else
            {
                res.status(200).send(user)
            }
        })
    })
     
    
    
})
const writeImage = (imagePath, buffer, newBook ,res) => {
    // Saving the image inside of it's user's folder
    fs.writeFile(imagePath, buffer,(err) => {
        if(err)
        {
            return res.status(400).send("An error occured while saving the image");
        }
        else
        {
            const book = new books({...newBook});
            book.save().then(result => {
                return res.status(200).send(result);
            })
            .catch(err => {
                return res.status(400).send(err);
            })
        }
    })
}

const generateFolder = (userId, fileName) => {

    // Generating the folder of the  user if it doesn't exist
    const folderName = path.join(__dirname , "../Users/" , userId);
    if(!fs.existsSync(folderName))
    {    
        fs.mkdirSync(folderName);
    }
    
    // Setting the image path and name
    return path.join(folderName,"\\",fileName);
}

const checkIncomingBookData = (req,res) => {
    // Must be cleaned!
    if(req.body.title === "" || req.body.title === undefined)
    {
        res.status(400).send("title is not found")
        return;
    }

    if(req.body.publishDate === "" || req.body.publishDate === undefined)
    {
        res.status(400).send("publishDate is not found")
        return;
    }

    if(req.body.authorId === "" || req.body.authorId === undefined)
    {
        res.status(400).send("authorId is not found")
        return;
    }

    if(req.body.price === "" || req.body.price === undefined)
    {
        res.status(400).send("price is not found")
        return;
    }

    if(req.file.originalname === "" || req.file.originalname === undefined)
    {
        res.status(400).send("image is not found")
        return;
    }
}

module.exports = app