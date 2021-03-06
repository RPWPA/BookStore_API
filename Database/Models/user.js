const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const UserSchema = mongoose.Schema ({
    
        userName:
        {
            type: String,
            required: true,
            trim: true,
            unique: true,
        }, 
        password:
        {
            type: String,
            required: true,
            trim: true,
        },
        email:
        {
            type:String,
            required: true,
            trim:true,
            unique: true,
        },
        birthday:
        {
            type: String,
            required: true,
        },
        token:
        {
            type: String,
            required: false
        },
        favoriteBooks:[{
               type: mongoose.Types.ObjectId,
                required: false,
        }]
    
})

// This is used with objects of the model
UserSchema.methods.generateToken = async function()
{
    if(this.token == null || this.token == undefined)
    {
        this.token = await jwt.sign({id:this._id},'sallty', {expiresIn: '31d'});
        await this.save();
    }
}

// This is used with models
UserSchema.statics.verifyToken = function(token) 
{
    return jwt.verify(token, "sallty");
}

const user  = mongoose.model('Users',UserSchema);
module.exports = user