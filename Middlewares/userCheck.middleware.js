// Checking if the user exists
const mongoose = require('mongoose');
const users = require('../Database/Models/user');
const userCheck =  (req,res,next) => 
{
    if(req.body.userId === undefined)
    {
        res.status(400).send("Didn't recieve userId");
        return;
    }
    if(req.body.userId.match(/^[0-9a-fA-F]{24}$/) && mongoose.isValidObjectId(req.body.userId))    
    {
         users.findById(req.body.userId,(err, user) => {
            req.user = user;
            if(err)
            {
                return res.sendStatus(400);
            }
            else if(!user)
            {
                return res.status(404).send("User is not found");
            }
            else{
              next();
            }
        })
    }
    else
    {
        return res.status(404).send("Wrong id format");
    }
}
module.exports = userCheck