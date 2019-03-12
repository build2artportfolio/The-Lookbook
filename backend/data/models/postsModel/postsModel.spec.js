const db = require("../../database");
const Posts = require("./index");
const Users = require("../usersModel");
const faker = require("faker");

afterEach(async () => {
	await db("posts").del();
	await db("users").del();
});

describe("Posts Model Functions", () => {
	describe("create()", () => {
		it("should create a post in the database based on the provided post object", async () => {
			//Create user. Users model is already tested, so we are just using it to provide a valid Foreign Key to the created post.
			const user = await Users.create({
				username: "Michael",
				password: "test"
			});
			const postObject = {
				title: faker.lorem.words(),
				description: faker.lorem.sentence(),
				imageUrl: faker.image.imageUrl(),
				artistId: user.id
			};
			const createdPost = await Posts.create(postObject);
			//We don't expect the artistId back, as we will get an artist object in place of it.
			//Because of this, we delete it.
			delete postObject.artistId;
			delete createdPost.artistId;
			//Expect the created post to have all the properties of the postObject.
			expect(createdPost).toEqual({ ...createdPost, ...postObject });
		});

		it("should create a post in the database even if description is not provided", async () => {
			//Create user. Users model is already tested, so we are just using it to provide a valid Foreign Key to the created post.
			const user = await Users.create({
				username: "Michael",
				password: "test"
			});
			const postObject = {
				title: faker.lorem.words(),
				imageUrl: faker.image.imageUrl(),
				artistId: user.id
			};
			const createdPost = await Posts.create(postObject);
			//We don't expect the artistId back, as we will get an artist object in place of it.
			//Because of this, we delete it.
			delete postObject.artistId;
			delete createdPost.artistId;
			//Expect the created post to have all the properties of the postObject.
			expect(createdPost).toEqual({ ...createdPost, ...postObject });
		});
	});

	describe("getOne()", () => {
		it("should return one Post based on the filter properties provided", async () => {
			//Create a post for us to fetch first.
			//Create user. Users model is already tested, so we are just using it to provide a valid Foreign Key to the created post.
			const user = await Users.create({
				username: "Michael",
				password: "test"
			});
			const postObject = {
				title: faker.lorem.words(),
				imageUrl: faker.image.imageUrl(),
				artistId: user.id
			};
			const createdPost = await Posts.create(postObject);
			//We don't expect the artistId property, as we get an artist object instead. So we delete the property from this so it's not expected.
			delete createdPost.artistId;
			//Now we test the getOne() method.
			const getPost = await Posts.getOne({ id: createdPost.id });
			const expected = {
				...createdPost,
				artist: {
					id: user.id,
					username: user.username
				}
			};
			expect(getPost).toEqual(expected);
		});

		it("should return null if no Post found", async () => {
			//Our Post ID incrementation starts at 1, so we know a post with ID 0 won't ever be present.
			const foundPost = await Posts.getOne({ id: 0 });
			expect(foundPost).toBe(null);
		});
	});

	describe("get()", () => {
		it("should return the proper object depending on page size, and page number parameters provided.", async () => {
			//Create user. Users model is already tested, so we are just using it to provide a valid Foreign Key to the created post.
			const user = await Users.create({
				username: "Michael",
				password: "test"
			});
			//Generate posts with fakerJS
			const genPosts = await generatePosts(100, user.id);
			//insert generated posts
			await db("posts").insert(genPosts);
			//Set pagination values
			const postsPerPage = 5;
			const pageNumber = 1;
			//Execute Posts.get with pagination values
			const fetchedPosts = await Posts.get(postsPerPage, pageNumber);
			//Test if the properties are accurate compared to the posts we generated.
			expect(fetchedPosts.totalPosts).toBe(100);
			expect(fetchedPosts.posts.length).toBe(5);
		});
	});

	describe("update()", () => {
		it("should return the updated record based on the properties to update passed to it.", async () => {
			//Create user. Users model is already tested, so we are just using it to provide a valid Foreign Key to the created post.
			const user = await Users.create({
				username: "Michael",
				password: "test"
			});
			const postObject = {
				title: faker.lorem.words(),
				description: faker.lorem.sentence(),
				imageUrl: faker.image.imageUrl(),
				artistId: user.id
			};
			const createdPost = await Posts.create(postObject);
			const updateProps = { title: "NewTitle", description: "NewDesc" };
			const updatedPost = await Posts.update(createdPost.id, updateProps);
			expect(updatedPost).toEqual({ ...createdPost, ...updatedPost });
		});

		it("should return null if nothing was updated", async () => {
			const updateProps = { title: `Pranked, this isn't real.` };
			const updatedPost = await Posts.update(0, updateProps);
			expect(updatedPost).toBe(null);
		});
	});

	describe("del()", () => {
		it("should return true if delete worked", async () => {
			//Create user. Users model is already tested, so we are just using it to provide a valid Foreign Key to the created post.
			const user = await Users.create({
				username: "Michael",
				password: "test"
			});
			const postObject = {
				title: faker.lorem.words(),
				description: faker.lorem.sentence(),
				imageUrl: faker.image.imageUrl(),
				artistId: user.id
			};
			const createdPost = await Posts.create(postObject);
			//Delete post
			const deleted = await Posts.del(createdPost.id);
			expect(deleted).toBe(true);
		});

		it("should return null if no record was deleted", async () => {
			//Post ID incrementation begins at 1, so we know nothing exists with the ID of 0.
			const deleted = await Posts.del(0);
			expect(deleted).toBe(null);
		});
	});
});

const generatePosts = (amount, userId) => {
	let postSeeds = [];
	for (let k = 1; k <= amount; k++) {
		let newSeed = {
			title: faker.lorem.words(),
			description: faker.lorem.sentence(),
			imageUrl: faker.image.imageUrl(),
			artistId: userId
		};
		postSeeds.push(newSeed);
		if (k === amount) return postSeeds;
	}
};
