const mongoose = require('mongoose')


const UserSchema = mongoose.Schema ({
    
        userName:
        {
            type: String,
            required: true,
            trim: true,
        }, 
        password:
        {
            type: String,
            required: true,
            trim: true
        },
        email:
        {
            type:String,
            required: true,
            trim:true
        },
        birthday:
        {
            type: String,
            require: true,
        },
        favoriteBooks:[{
            bookId:{
                type: mongoose.Types.ObjectId,
                required: false,
            }
        }]
    
})

const user  = mongoose.model('Users',UserSchema);
module.exports = user