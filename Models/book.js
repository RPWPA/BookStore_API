const mongoose = require('mongoose')

mongoose.Schema = {
    books:{
        name:{

        },
        publishDate:{

        },
        author:{
            authorId: {
                type: mongoose.Types.ObjectId, 
                required: true
            }
        }
    }
}