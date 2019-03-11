const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../../../data/models/usersModel");

router.post("/login", async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password)
		return res
			.status(422)
			.json({ message: "You must provide a username and password." });

	try {
		//Check if account with username exists.
		const foundUser = await Users.getOne({ username });
		if (!foundUser)
			return res
				.status(404)
				.json({ message: "No account with those credentials." });
		//Account is found, compare passwords.
		if (password && bcrypt.compareSync(password, foundUser.password)) {
			//Passwords match, generate JWT
			//Create payload. The payload is the logged in user's information.
			const payload = {
				id: foundUser.id,
				username: foundUser.username
			};

			const options = {
				expiresIn: "1d"
			};

			const token = await jwt.sign(payload, process.env.JWT_SECRET, options);

			return res.status(200).json({ user: payload, token });
		} else {
			//Passwords don't match
			return res.status(400).json({ message: "Incorrect login credentials." });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal error." });
	}
});

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

module.exports = router;
