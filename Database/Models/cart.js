const mongoose = require('mongoose')


const CartSchema = mongoose.Schema  ({
    
        userId:
        {
            type: String,
            required: true,
            trim: true,
        }, 
        bookList:[{
         bookId:{
                type: mongoose.Types.ObjectId,
                required: false,
            }
        }],
    
})

const cart = mongoose.model('Carts',CartSchema);
module.exports = {cart};