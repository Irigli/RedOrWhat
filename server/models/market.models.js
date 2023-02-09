const mongoose = require('mongoose');

const RedOreWhatSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'The name of the wine is required']
    },
    type:{
        type:String,
        enum: ['Red', 'White', 'Roze', 'Spumante'],
        required: [true, 'The type of the wine is required']
    },
    price:{
        type:Number,
        required: true
    },
    image:{
        type:String,
    },
    place:{
        type:String
    },
    description:{
        type:String
    }
}, {timestamps: true})

module.exports = mongoose.model('RedOreWhat', RedOreWhatSchema)