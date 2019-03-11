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

const getOne = async filter => {
	//Return null if no filter is provided. Otherwise return the user if one is found, or null if none were found.
	if (!filter) return null;
	const foundUser = await db("users")
		.where(filter)
		.first();
	if (!foundUser) return null;
	return foundUser;
};

module.exports = {
	create,
	getOne
};
