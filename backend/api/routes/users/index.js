const router = require("express").Router();
const Users = require("../../../data/models/usersModel");
const authenticate = require("../../middleware/auth").authenticate;
const bcrypt = require("bcryptjs");

router.get("/:id", async (req, res) => {
	try {
		const user = await Users.getOne({ id: req.params.id });
		if (!user)
			return res
				.status(404)
				.json({ message: "Can not find a user with that ID." });
		delete user.password; //Don't send back the hashed password...
		return res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: "Internal error." });
	}
});

router.put("/:id", authenticate, async (req, res) => {
	const { username, password, about, currentPassword } = req.body;
	if (!username && !password && !about)
		return res.status(422).json({
			message: "You must provide changes."
		});
	if (password && !currentPassword)
		return res.status(422).json({
			message:
				"You must provide your current password if you want to change it to something else."
		});

	let newProps = {};
	if (username) {
		newProps.username = username;
	}
	if (about) {
		newProps.about = about;
	}
	if (password) {
		newProps.password = bcrypt.hashSync(password, 12);
	}

	try {
		const findUser = await Users.getOne({ id: req.params.id });
		if (req.user.id !== findUser.id) {
			return res
				.status(403)
				.json({ message: "You do not have permission to modify this user." });
		}
		if (password && bcrypt.compareSync(password, findUser.password)) {
			const updatedUser = await Users.update(req.params.id, newProps);
			delete updatedUser.password;
			return res.status(201).json(updatedUser);
		} else if (!password) {
			const updatedUser = await Users.update(req.params.id, newProps);
			delete updatedUser.password;
			return res.status(201).json(updatedUser);
		} else {
			return res
				.status(400)
				.json({ message: "Incorrect password. Can not modify user." });
		}
	} catch (error) {
		console.log(req.params.id);
		console.log(error);
		return res.status(500).json({ message: "Internal error." });
	}
});

module.exports = router;
