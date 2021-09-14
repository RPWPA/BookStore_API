const app = require('express').Router()
const users = require('../Database/Models/user')
const bcrypt = require('bcrypt')
const saltRounds = 10;

app.get('/allusers', async (req,res) => {
    const allUsers = await users.find()
    console.log(allUsers)
    res.json(allUsers)
})

app.post('/register', async (req,res) => {
    const newPass = await bcrypt.hash(req.body.password,saltRounds).then(newPass => newPass)
    let newUser = {
        "userName" : req.body.userName,
        "email" : req.body.email,
        "password": newPass,
        "birthday" : req.body.birthday,
        "favoriteBooks" : req.body.favoriteBooks,
    }

    console.log(newUser)
    var user = new users(newUser);

    await user.save().then((response) => {
        if(!response){
            res.status(400).send();
        }
        res.status(200).send(response)
    }).catch(error => {
        res.status(400).send(error)
    })

})


app.post('/login', async (req,res) => {
    const userName = req.body.userName
    const password = req.body.password

    // Getting the user
    const currentUser = await users.findOne({userName})

    console.log(currentUser)
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
            result == true? res.status(200).send(currentUser) : res.status(406).send("Username or password are incorrect")
    })
    .catch(error => {
        console.log(error)
        res.status(400).send(error)
    })
})


module.exports = app