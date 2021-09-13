const mongoose = require('mongoose')

const BookSchema = mongoose.Schema  ({
   
        name:{
            type: String,
            required: true,
            trim: true
        },
        publishDate:{
            type: Date,
            required: true
        },
        authorId:{
            type: mongoose.Types.ObjectId, 
            required: true
        },
        price: {
            type:Number,
            required: true
        },
        imagePath: {
            type:Number,
            required: true
        },
        
})

const book  = mongoose.model('Books',BookSchema);
module.exports = {book};