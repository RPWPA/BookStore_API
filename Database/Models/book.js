const mongoose = require('mongoose')

const BookSchema = mongoose.Schema  ({
   
        title:{
            type: String,
            required: true,
            trim: true
        },
        publishDate:{
            type: String,
            required: true
        },
        authorId:{
            type: mongoose.Types.ObjectId, 
            required: true
        },
        userId:{
            type: mongoose.Types.ObjectId, 
            required: true
        },
        price: {
            type:Number,
            required: true
        },
        imagePath: {
            type:String,
            required: true
        },
        
})

const book  = mongoose.model('Books',BookSchema);
module.exports = book;