// Checking if the author exists
const mongoose = require('mongoose');
const authors = require('../Database/Models/author');
const authorCheck = (req,res,next) => 
{
    if(req.body.authorId.match(/^[0-9a-fA-F]{24}$/) && mongoose.isValidObjectId(req.body.authorId))    
    {
        authors.findById(req.body.authorId,(err, author) => {
            if(err)
            {
                res.sendStatus(400);
            }
            else if(!author)
            {
                res.status(404).send("Author is not found");
            }
        })
    }
    else
    {
        res.status(404).send("Wrong id format");
    }
    next();
}

module.exports = authorCheck
