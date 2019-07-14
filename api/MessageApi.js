const router = require('express').Router();
const Message = require('../model/Message');

router.route('/').get((req, res) => {
    Message.find({}).sort("timestamp").exec((err, messages) => {
        if(err) console.log(err);
        else res.status(200).json(messages);
    });
});

router.route('/send').post((req, res) => {
    const message = new Message(req.body);
    message.save()
    .then(result => res.status(200).json(result))
    .catch(err => {
        console.log(err);
    });
});

module.exports.routes = () => (router);