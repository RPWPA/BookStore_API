// Checking if the user is authenticated
const user = require('../Database/Models/user');
const isAuthorized = (req,res,next)  => {
    // If there is no token
    if(!req.headers.authorization)
    {
        return res.status(401).send("unauthorized");
    }

    let userId = user.verifyToken(req.headers.authorization);
    if(!userId)
    {
        console.log(_id);
        next();
    }
    else
    {
        res.status(401).send("unauthorized")
    }
    // Finding the user by the given id
    // users.findById(req.body.userId,(err, user) => {
    //     if(err)
    //     {
    //         return res.sendStatus(400);
    //     }
    //     else if(!user)
    //     {
    //         return res.status(401).send("Unauthorized");
    //     }
    //     else
    //     {
    //         // Checking if the user has the same token as the request header
    //         if(user.token === req.headers.authorization)
    //         {
    //             next()
    //         }
    //         else{
    //             return res.status(401).send("Unauthorized");
    //         }
    //     }
    // })
}

module.exports = isAuthorized