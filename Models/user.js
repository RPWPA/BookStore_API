const mongoose = require('mongoose')


mongoose.Schema = {
    user: {
        name:
        {
            type: String,
            required: true,
            trim: true,
        }, 
        birthday:
        {
            type: Date,
            require: true,
        },
        favoriteBooks:[{
            bookId:{
                type:Number,
                required: false,
            }
        }]
    }
}