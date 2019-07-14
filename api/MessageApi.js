const router = require('express').Router();
const Message = require('../model/Message');
const AylienAPI = require("aylien_textapi");
const sentimentAPI = new AylienAPI({
    application_id: "a6b18ad8",
    application_key: "dd43a36ac102251bac50f5ba6df8195f"
});

router.route('/').get((req, res) => {
    Message.find({}).sort("timestamp").exec((err, messages) => {
        if(err) console.log(err);
        else res.status(200).json(messages);
    });
});

router.route('/send').post((req, res) => {
    req.body["timestamp"] = Date.now();
    const message = new Message(req.body);
    message.save()
    .then(result => res.status(200).json(result))
    .catch(err => {
        console.log(err);
    });
});

router.route('/sentimentScore').post((req, res) => {
    sentimentAPI.sentiment({
        'text' : req.body.message
    }, (err, result) => {
        if(err) res.status(400).sent(err);
        else res.status(200).json(result);
    });
});

module.exports.routes = () => (router);