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
	//User must provide something to change.
	if (!username && !password && !about)
		return res.status(422).json({
			message: "You must provide changes."
		});
	//User must provide current password, to change their password.
	if (password && !currentPassword)
		return res.status(422).json({
			message:
				"You must provide your current password if you want to change it to something else."
		});

	//Construct new properties that are for updating the user.
	let newProps = {};
	if (username) {
		newProps.username = username;
	}
	if (about) {
		newProps.about = about;
	}

	try {
		const findUser = await Users.getOne({ id: req.params.id });
		if (!findUser)
			return res.status(404).json({ message: "No user found with that ID." });
		//Check if the user is trying to update a user that isn't them.
		if (req.user.id !== findUser.id) {
			return res
				.status(403)
				.json({ message: "You do not have permission to modify this user." });
		}
		//If user provided password, check if their currentPass that they passed in matches their actual current password.
		if (password) {
			const passMatches = await bcrypt.compare(
				currentPassword,
				findUser.password
			);
			if (!passMatches) {
				return res
					.status(400)
					.json({ message: "Incorrect password. Can not modify user." });
			} else {
				//Create a new hash for their new password, then add it to the new properties to update the user with.
				newProps.password = await bcrypt.hash(password, 12);
				const updatedUser = await Users.update(req.params.id, newProps);
				delete updatedUser.password; //Don't return the hashed password to the user.
				return res.status(201).json(updatedUser);
			}
			//If the user didn't provide a password, just update the user.
		} else if (!password) {
			const updatedUser = await Users.update(req.params.id, newProps);
			delete updatedUser.password;
			return res.status(201).json(updatedUser);
		}
	} catch (error) {
		if (error.code === "23505") {
			//PostgreSQL Unique Constraint error. We know this is for the username, as it's the only unique column other than Id (Which they can't update)
			return res.status(400).json({ message: "Username is already taken." });
		}
		return res.status(500).json({ message: "Internal error." });
	}
});

router.delete("/:id", authenticate, async (req, res) => {
	try {
		const foundUser = await Users.getOne({ id: req.params.id });
		if (!foundUser)
			return res.status(404).json({ message: "No user found with that ID." });
		if (foundUser.id !== req.user.id)
			return res
				.status(403)
				.json({ message: "You do not have permission to do this." });
		const deleted = await Users.del(req.params.id);
		if (deleted) {
			return res.status(200).json({ message: "Account deleted." });
		} else {
			return res
				.status(500)
				.json({
					message: "Something went wrong with the deletion of the account."
				});
		}
	} catch (error) {
		return res.status(500).json({ message: "Internal error." });
	}
});

module.exports = router;
