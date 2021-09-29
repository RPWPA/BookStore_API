const mongoose = require('mongoose')

const AuthorSchema = mongoose.Schema  ({
   
        name:{
            type:String,
            required: true,
            trim: true,
            unique: true,
        },
        birthday:{
            type:String,
            required: true
        }
    
})

const author = mongoose.model('Authors',AuthorSchema);
module.exports = author