const mongoose = require('mongoose')


const CartSchema = mongoose.Schema = {
    cart: {
        userId:
        {
            type: String,
            required: true,
            trim: true,
        }, 
        bookList:[
            {
                type: mongoose.Types.ObjectId,
                required: false,
            }
        ],
    }
}

const cart = mongoose.model('Carts',CartSchema);
module.exports = {cart};