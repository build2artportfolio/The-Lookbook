const bcrypt = require("bcryptjs");

exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex("posts")
		.del()
		.then(function() {
			return knex("users")
				.del()
				.then(() => {
					// Inserts seed entries
					return knex("users").insert([
						{
							id: 1,
							username: "Bob",
							password: bcrypt.hashSync("password", 4)
						},
						{
							id: 2,
							username: "JohnDoe",
							password: bcrypt.hashSync("password", 4)
						},
						{
							id: 3,
							username: "JaneDoe",
							password: bcrypt.hashSync("password", 4)
						},
						{
							id: 4,
							username: "MsPicture",
							password: bcrypt.hashSync("password", 4)
						},
						{
							id: 5,
							username: "Janet",
							password: bcrypt.hashSync("password", 4)
						}
					]);
				});
		});
};
