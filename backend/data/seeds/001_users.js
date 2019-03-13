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
							username: "Bob",
							password: bcrypt.hashSync("password", 4),
							about:
								"I love photography, as well as working in my garage on my cars."
						},
						{
							username: "JohnDoe",
							password: bcrypt.hashSync("password", 4),
							about: "Nothing is more important than my lens."
						},
						{
							username: "JaneDoe",
							password: bcrypt.hashSync("password", 4),
							about: `Growing up I've always loved sunsets. Been taking pictures of every dusk since I can remember.`
						},
						{
							username: "MsPicture",
							password: bcrypt.hashSync("password", 4),
							about: "I like pictures."
						},
						{
							username: "Janet",
							password: bcrypt.hashSync("password", 4),
							about: `Deep sea diver first, underwater photographer second.`
						}
					]);
				});
		});
};
