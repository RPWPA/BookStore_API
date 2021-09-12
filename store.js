const Users = require('./users')
const express = require('express')
const bcrypt = require('bcrypt')
const cors = require('cors')
const users = require('./users')
const app = express()
const port = 8080

const books = require('./books')

const saltRounds = 10;

app.use(cors());

app.use(express.json())


app.get('/', )

app.post('/login', async (req,res) => {
    const userName = req.body.userName
    const password = req.body.password
    const currentUser = await users.find(row => row.userName == userName)
    if(currentUser == null)
    {
        res.statusCode(404).send("User not found")
        return
    }
    const hash = await users.find((row) => row.userName == userName).password
        bcrypt.compare(password,hash).then(result => {
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

app.get('/allBooks', (req,res) => {
    res.json(books)
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

module.exports = app