const router = require('express').Router();
let User = require('../model/User');

router.route('/').get((req, res) => {
    User.find((err, users) => {
        if(err) console.log(err);
        else res.json(users);
    });
});

router.route('/login').post((req, res) => {
	User.findOne({email:req.body.email, password: req.body.password}, "email name _id" ,(err, user) => {
		if(err) res.status(401).json({"message":"SERVER DOWN, PLEASE TRY AGAIN LATER!"});
		else res.status(200).json(user);
	});
});

router.route('/add').post((req, res) => {
	let user = new User(req.body);
	user.save()
	.then(result => {
		res.status(200).json({...result});
	})
	.catch(err => {
		res.status(400).send("ERROR ADDING");
	});
});

module.exports.routes = () => { return router };