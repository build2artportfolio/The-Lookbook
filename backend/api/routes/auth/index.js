const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../../../data/models/usersModel");

router.post("/register", async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password)
		return res
			.status(422)
			.json({ message: "You must provide a username and password." });

	try {
		//Create hashed password;
		const hashedPass = await bcrypt.hash(password, 12);
		const user = {
			username,
			password: hashedPass
		};
		//Create user
		const createdUser = await Users.create(user);
		//Notify successful registration.
		return res
			.status(201)
			.json({ message: "Successfully registered account." });
	} catch (error) {
		if (error.code === "23505") {
			return res
				.status(400)
				.json({ message: "Account with those credentials is already taken." });
		} else {
			return res.status(500).json({ message: "Internal error." });
		}
	}
});

router.post("/login", async (req, res) => {});

module.exports = router;
