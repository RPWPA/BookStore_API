const mongoose = require('mongoose')


mongoose.Schema = {
    cart: {
        userId:
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
                type: mongoose.Types.ObjectId,
                required: false,
            }
        }]
    }
}