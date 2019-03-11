const db = require("../../database");
const Posts = require("./index");
const faker = require("faker");

describe("Posts Model Functions", () => {
	afterEach(() => {
		db("posts").truncate();
	});
	describe("create()", () => {
		it("should create a post in the database based on the provided post object", async () => {
			const postObject = {
				title: faker.lorem.words(),
				description: faker.lorem.sentence(),
				imageUrl: faker.image.imageUrl(),
				artistId: 1
			};
			const createdPost = await Posts.create(postObject);
			//Expect the created post to have all the properties of the postObject.
			expect(createdPost).toEqual({ ...createdPost, ...postObject });
		});

		it("should create a post in the database even if description is not provided", async () => {
			const postObject = {
				title: faker.lorem.words(),
				imageUrl: faker.image.imageUrl(),
				artistId: 1
			};
			const createdPost = await Posts.create(postObject);
			//Expect the created post to have all the properties of the postObject.
			expect(createdPost).toEqual({ ...createdPost, ...postObject });
		});
	});
});
