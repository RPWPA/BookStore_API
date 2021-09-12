const mongoose = require('mongoose')

mongoose.Schema = {
    books:{
        name:{

        },
        publishDate:{

        },
        author:{
            authorId: {
                type: Number, 
                required: true
            }
        }
    }
}