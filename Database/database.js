var mongoose = require('mongoose')

var mongoDB = 'mongodb://localhost:27017/BookStore'
mongoose.connect(mongoDB).catch(err=>{
    console.log(err)
})

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MomgoDB connection error:'))

module.exports = {db}