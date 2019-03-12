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
							password: bcrypt.hashSync("password", 4),
							about:
								"I love photography, as well as working in my garage on my cars."
						},
						{
							id: 2,
							username: "JohnDoe",
							password: bcrypt.hashSync("password", 4),
							about: "Nothing is more important than my lens."
						},
						{
							id: 3,
							username: "JaneDoe",
							password: bcrypt.hashSync("password", 4),
							about: `Growing up I've always loved sunsets. Been taking pictures of every dusk since I can remember.`
						},
						{
							id: 4,
							username: "MsPicture",
							password: bcrypt.hashSync("password", 4),
							about: "I like pictures."
						},
						{
							id: 5,
							username: "Janet",
							password: bcrypt.hashSync("password", 4),
							about: `Deep sea diver first, underwater photographer second.`
						}
					]);
				});
		});
};
