const db = require('./Database/database')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 8080

const bookRoutes = require('./Routes/bookRoutes')
const userRoutes = require('./Routes/userRoutes')



app.use(cors());

app.use(express.json())

// app.use('/books',bookRoutes)

app.use('/users',userRoutes)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

module.exports = app