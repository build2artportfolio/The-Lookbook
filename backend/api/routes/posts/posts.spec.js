const request = require("supertest");
const server = require("../../server");
const db = require("../../../data/database");
const Users = require("../../../data/models/usersModel");
const Posts = require("../../../data/models/postsModel");
const faker = require("faker");
//After each test, reset the users table.
afterEach(async () => {
	await db("posts").del();
	await db("users").del();
});

describe("Post Routes", () => {
	describe("/", () => {
		it("should return status 200", async () => {
			const res = await request(server).get("/api/posts");
			expect(res.status).toBe(200);
		});

		it("should return 20 posts if no pagination headers are provided", async () => {
			//Create user. Users model is already tested, so we are just using it to provide a valid Foreign Key to the created posts.
			const user = await Users.create({
				username: "Michael",
				password: "test"
			});
			//Generate posts with fakerJS
			const genPosts = await generatePosts(100, user.id);
			//insert generated posts for testing the API response.
			await db("posts").insert(genPosts);
			const res = await request(server).get("/api/posts");
			expect(res.body.totalPosts).toBe(100);
			expect(res.body.posts.length).toBe(20);
		});

		it("should return posts based on pagination values provided in headers", async () => {
			//Create user. Users model is already tested, so we are just using it to provide a valid Foreign Key to the created posts.
			const user = await Users.create({
				username: "Michael",
				password: "test"
			});
			//Generate posts with fakerJS
			const genPosts = await generatePosts(100, user.id);
			//insert generated posts for testing the API response.
			await db("posts").insert(genPosts);
			const res = await request(server)
				.get("/api/posts")
				.set("pagesize", "17")
				.set("page", "4");
			expect(res.body.totalPosts).toBe(100);
			expect(res.body.posts.length).toBe(17);
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
