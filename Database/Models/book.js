const mongoose = require('mongoose')

mongoose.Schema = {
    books:{
        name:{
            type: String,
            required: true,
            trim: true
        },
        publishDate:{
            type: Date,
            required: true
        },
        author:{
            authorId: {
                type: mongoose.Types.ObjectId, 
                required: true
            }
        }
    }
}