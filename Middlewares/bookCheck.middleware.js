// Checking if the author exists
const mongoose = require('mongoose');
const books = require('../Database/Models/book');
const bookCheck = (req,res,next) => 
{
    console.log(req.body);
    if(req.body.bookId === undefined)
    {
        res.status(400).send("Didn't recieve bookId");
        return;
    }
    if(req.body.bookId.match(/^[0-9a-fA-F]{24}$/) && mongoose.isValidObjectId(req.body.bookId))    
    {
        books.findById(req.body.bookId,(err, book) => {
            if(err)
            {
                res.sendStatus(400);
            }
            else if(!book)
            {
                res.status(404).send("Author is not found");
                return;
            }
            else
            {
                next()
            }
        })
    }
    else
    {
        res.status(404).send("Wrong id format");
    }
}

module.exports = bookCheck