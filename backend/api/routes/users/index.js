const router = require("express").Router();
const Users = require("../../../data/models/usersModel");
const authenticate = require("../../middleware/auth").authenticate;

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

module.exports = router;
