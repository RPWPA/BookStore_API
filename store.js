const Users = require('./users')
const express = require('express')
const bcrypt = require('bcrypt')
const cors = require('cors')
const users = require('./users')
const app = express()

const port = 8080

app.use(cors());

app.get('/', (req,res) => {
    res.send('Hello Worldo')
})

app.post('/login', (req,res) => {
    const userName = req.headers.authorization.split(';')[0]
    const password = req.headers.authorization.split(';')[1]
    Users.findIndex(row => row.userName == userName && row.password == password) != -1 ? res.send("LoggedIn") : res.send("User Not Found") 
})


app.post('/signUp', (req,res) => {
    const email = req.headers.authorization.split(';')[0]
    const userName = req.headers.authorization.split(';')[1]
    const password = req.headers.authorization.split(';')[2]
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})