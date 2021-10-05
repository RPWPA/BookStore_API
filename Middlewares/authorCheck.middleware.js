// Checking if the author exists

const authors = require('../Database/Models/author');
const authorCheck = (req,res,next) => 
{
    if(req.body.authorId.match(/^[0-9a-fA-F]{24}$/) && mongoose.isValidObjectId(req.body.authorId))    
    {
        authors.findById(req.body.authorId,(err, author) => {
            if(err)
            {
                return res.sendStatus(400);
                
            }
            else if(!author)
            {
                return res.status(404).send("Author is not found");
            }
        })
    }
    else
    {
        return res.status(404).send("Wrong id format");
    }
    next();
}

module.exports = authorCheck
