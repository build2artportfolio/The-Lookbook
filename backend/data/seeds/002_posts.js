const faker = require("faker");

const generatePosts = async () => {
	// Inserts seed entries
	let postSeeds = [];

	//Here we run a for loop in another. This creates 100 post seeds, for 5 users each.
	//We do it this way so the posts creation dates aren't in order of user. Makes the data more realistic.
	for (let i = 1; i <= 5; i++) {
		for (let k = 1; k <= 5; k++) {
			let newSeed = {
				title: faker.lorem.words(),
				description: faker.lorem.sentence(),
				imageUrl: "https://picsum.photos/300/300/?random",
				artistId: k
			};
			postSeeds.push(newSeed);
			if (i === 5 && k === 5) return postSeeds;
		}
	}
};

exports.seed = async function(knex, Promise) {
	// Deletes ALL existing entries
	const seeds = await generatePosts();
	return knex("posts")
		.del()
		.then(function() {
			return knex("posts").insert(seeds);
		});
};
