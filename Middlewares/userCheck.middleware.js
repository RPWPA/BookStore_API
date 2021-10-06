// Checking if the user exists
const mongoose = require('mongoose');
const users = require('../Database/Models/user');
const userCheck = (req,res,next) => 
{
    console.log(req.body);
    if(req.body.userId.match(/^[0-9a-fA-F]{24}$/) && mongoose.isValidObjectId(req.body.userId))    
    {
        users.findById(req.body.userId,(err, user) => {
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
    next();
}
module.exports = userCheck