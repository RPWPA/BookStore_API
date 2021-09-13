const Users = require('./users')
const db = require('./Database/database')
const express = require('express')
const bcrypt = require('bcrypt')
const cors = require('cors')
const users = require('./users')
const app = express()
const port = 8080
const bookRoutes = require('./Routes/bookRoutes')
const userRoutes = require('./Routes/userRoutes')

const saltRounds = 10;

app.use(cors());

app.use(express.json())

app.use('books',bookRoutes)

app.use('users',userRoutes)

app.post('/login', async (req,res) => {
    // Input data
    const userName = req.body.userName 
    const password = req.body.password
    
    // Getting the user
    const currentUser = await users.find(row => row.userName == userName)

    // Checking for Validity
    if(currentUser == null)
    {
        res.statusCode(404).send("User not found")
        return
    }
    
    // Checking if the password matches
    const hash = await users.find((row) => row.userName == userName).password
        bcrypt.compare(password,hash).then(result => {
            // Tenary expression to check the validity of the password in comparison to the username. 
            result == true? res.status(200).send("Found User") : res.status(406).send("Wrong Password")
        })
})


app.post('/signUp', (req,res) => {
    bcrypt.hash(req.body.password,saltRounds).then((newPass) => {
        req.body.password = newPass
    })
    .then(() => {
        users.push(req.body)
        res.sendStatus(200);
    })
    .catch(err => {
        console.log(err)
        res.sendStatus(406)
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

module.exports = app