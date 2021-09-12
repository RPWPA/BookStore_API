const mongoose = require('mongoose')

const AuthorSchema = mongoose.Schema = {
    author = {
        name:{
            type:String,
            required: true,
            trim: true
        },
        age:{
            type:Number,
            required: false
        }
    }
} 

const author = mongoose.model('Authors',AuthorSchema);
module.exports = {author}