const Users = require('./users')
const express = require('express')
const bcrypt = require('bcrypt')
const cors = require('cors')
const users = require('./users')
const app = express()
const port = 8080

const saltRounds = 10;

app.use(cors());

app.use(express.json())
app.get('/', (req,res) => {
    res.send('Hello Worldo')
})

app.post('/login', async (req,res) => {
    const userName = req.body.userName
    const password = req.body.password
    const currentUser = await users.find(row => row.userName == userName)
    console.log(currentUser)
    if(currentUser == null)
    {
        res.send("User not found").sendStatus(404)
        return
    }
    const hash = await users.find((row) => row.userName == userName).password
    console.log(password)
    console.log(hash)
        bcrypt.compare(password,hash).then(result => {
            result == true? res.send("LoggedIn").sendStatus(200) : res.send("Wrong Password").sendStatus(406) 
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