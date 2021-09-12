const mongoose = require('mongoose')

const author = {
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