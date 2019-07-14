const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OnlineUser = new Schema({
    sender_id:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    name: {
        type: String
    },
    email: {
        type: String
    }
});

module.exports = mongoose.model('OnlineUser', OnlineUser);