const Users = require('./users')
const db = require('./Database/database')
const express = require('express')

const cors = require('cors')
const users = require('./users')
const app = express()
const port = 8080
const bookRoutes = require('./Routes/bookRoutes')
const userRoutes = require('./Routes/userRoutes')


app.use(cors());

app.use(express.json())

// app.use('/books',bookRoutes)

app.use('/users',userRoutes)

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