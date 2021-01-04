const express = require("express");
const bcryptjs = require("bcryptjs");

const usersModel = require("../models/users.model");

const router = express.Router();

router.post("/", async (req, res) => {
	let registerUser = new usersModel({ username: req.body.username });

	usersModel.register(registerUser, req.body.password, (err, user) => {
		if (err) {
			res.status(500).send({
				success: false,
				message: `Account not registered. Error: ${err}`,
			});
		} else {
			res.status(201).send({
				success: true,
				message: `Account registered. ID: ${user._id}`,
			});
		}
	});
});

router.get("/", (req, res) => {
	usersModel.find().then((users) => {
		res.status(200).send(users);
	});
});

router.delete("/", (req, res) => {
	const id = req.body._id;

	usersModel.findByIdAndDelete(id);
	res.send({
		deleted: true,
	});
});

module.exports = router;
