const db = require("../../database");

const create = async user => {
	//Destructure the created users ID from the array received from the insert method.
	const [newUserId] = await db("users").insert(user, "id");
	//Find the created user based on the id we receieved from the insert method.
	const createdUser = await db("users")
		.where({ id: newUserId })
		.first();
	//Return the created user.
	return createdUser;
};

module.exports = {
	create
};
