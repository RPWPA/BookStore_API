const app = require('express').Router()
const users = require('../Database/Models/user')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const jwt = require('jsonwebtoken')

// Middlewares
const userCheck = require('../Middlewares/userCheck.middleware');
const isAuthorized = require('../Middlewares/authorization.middleware');


// Return all users
app.get('/allusers', async (req,res) => {
    const allUsers = await users.find()
    res.json(allUsers)
})

// Registeration Function
app.post('/register', async (req,res) => {

    await checkIncomingPassword();

    const newPass = await bcrypt.hash(req.body.password,saltRounds).then(newPass => newPass)
    let newUser = {
        "userName" : req.body.userName,
        "email" : req.body.email,
        "password": newPass,
        "birthday" : req.body.birthday,
        "favoriteBooks" : req.body.favoriteBooks,
    }

    var user = new users(newUser);
    user.save().then((response) => {
        console.log(response)
        if(!response){
            console.log(response)
            res.status(400).send();
        }
        else{
            console.log(response)
        }
        res.status(200).send(response)
    }).catch(error => {
        console.log(error)
        res.status(400).send(error)
    })

})

// Login Function
app.post('/login', async (req,res) => {
    // Checking for the token
    const authorization = req.headers.authorization;
    if(authorization !== undefined)
    {
        const requestToken = authorization
        const user = await users.findOne(requestToken)
        if(user != null || user != undefined)
        {
            res.status(200).send(user);
            return;
        }
    }
    
    const userName = req.body.userName
    const password = req.body.password

    // Getting the user
    const currentUser = await users.findOne(userName)

    // Checking for Validity
    if(currentUser == null)
    {
        res.status(404).send("Username or password are incorrect")
        return
    }
    
    // Checking if the password matches
    const hash = currentUser.password

    bcrypt.compare(password,hash).then(result => {
        // Tenary expression to check the validity of the password in comparison to the username. 
        if(result)
        { 
            currentUser.generateToken();
            res.status(200).send(currentUser);
        } 
        else 
        {
            res.status(406).send("Username or password are incorrect")
        }
    })
    .catch(error => {
        console.log(error)
        res.status(400).send(error)
    })
})

// Updating User
app.put('/updateUser', isAuthorized, userCheck, async (req,res) => {
    if(req.body.birthday === "" || req.body.birthday === undefined)
    {
        res.status(400).send("birthday is not found")
        return
    }
    else if(req.body.email === ""  || req.body.email === undefined  )
    {
        res.status(400).send("email is not found")
        return
    }
    users.updateOne({_id : req.body.userId}, { email: req.body.email, birthday: req.body.birthday}).then(result => {
        res.status(200).send(result)
    })
    .catch(err => {
        res.status(404).send("User is not found")
    })
})

// Deleting User
app.delete('/deleteUser', isAuthorized, userCheck, async(req,res) => {
    users.findOneAndDelete(req.body.userId, (err, user) => {
        if(err)
        {
            res.status(404).send("User is not found")
            return;
        }
        else
        {
            res.status(200).send(user)
            return;
        }
    })
})

// Changing Password
app.put('/changePassword', isAuthorized, userCheck, async(req,res) => {
    await checkIncomingPassword(req,res)
    const newPass = await bcrypt.hash(req.body.password,saltRounds).then(newPass => newPass)
    users.updateOne({_id : req.body.userId}, { password: newPass}).then(result => {
        res.status(200).send(result)
    })
    .catch(err => {
        res.status(404).send(err)
    })
})

// Checking value of the incoming passwords
const checkIncomingPassword = (req,res) => {
    if(req.body.password === "" || req.body.password === undefined)
    {
        res.status(400).send("password was not found")
        return;
    }
    if(req.body.password !== req.body.checkPassword) {
        res.status(400).send("passwords don't match")
        return;
    }
}

module.exports = app