const mongoose = require('mongoose')

mongoose.Schema = {
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