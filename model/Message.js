const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Message = new Schema({
    sender_id: [{
        type: Schema.Types.ObjectId, 
        ref:'User'
    }],
    sender: {
        type: String
    },
    timestamp: {
        type: Date
    },
    message:{
        type: String
    }
});

module.exports = mongoose.model('Message', Message);