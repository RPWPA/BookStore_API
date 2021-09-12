const mongoose = require('mongoose')


const UserSchema = mongoose.Schema = {
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
                type: mongoose.Types.ObjectId,
                required: false,
            }
        }]
    }
}

const user  = mongoose.model('Users',UserSchema);
module.exports = {user};