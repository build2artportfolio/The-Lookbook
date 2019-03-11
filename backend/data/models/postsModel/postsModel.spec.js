const db = require("../../database");
const Posts = require("./index");
const Users = require("../usersModel");
const faker = require("faker");

describe("Posts Model Functions", () => {
	afterEach(async () => {
		await db("posts").del();
		await db("users").del();
	});
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
});
