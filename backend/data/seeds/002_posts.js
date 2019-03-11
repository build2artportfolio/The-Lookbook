const faker = require("faker");

const generatePosts = async () => {
	// Inserts seed entries
	let postSeeds = [];
	let currentPostId = 1;

	//Here we run a for loop in another. This creates 5 post seeds, for 5 users each.
	//We do it this way so the posts creation dates aren't in order of user. Makes the data more realistic.
	for (let i = 1; i <= 5; i++) {
		for (let k = 1; k <= 5; k++) {
			let newSeed = {
				id: currentPostId,
				title: faker.lorem.words(),
				description: faker.lorem.sentence(),
				imageUrl: faker.image.imageUrl(),
				artistId: k
			};
			postSeeds.push(newSeed);
			currentPostId += 1;
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
