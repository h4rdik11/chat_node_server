const router = require('express').Router();
const OnlineUser = require('../model/OnlineUser');

router.route('/').get((req, res) => {
    OnlineUser.find((err, user) => {
        if(err) res.status(400).send(err);
        else res.status(200).json(user);
    });
});

module.exports.routes = () => (router)