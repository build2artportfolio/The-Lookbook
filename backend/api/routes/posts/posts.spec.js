const request = require("supertest");
const server = require("../../server");
const db = require("../../../data/database");
const Users = require("../../../data/models/usersModel");
const Posts = require("../../../data/models/postsModel");
const jwt = require("jsonwebtoken");
const faker = require("faker");
//After each test, reset the users table.
afterEach(async () => {
	await db("posts").del();
	await db("users").del();
});

describe("Post Routes", () => {
	describe("GET /", () => {
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

	describe("GET /:id", () => {
		it("should return status 404 if no post found", async () => {
			//Our Posts ID incrementation starts at 1, so we know none will have the ID of 0.
			const res = await request(server).get("/api/posts/0");
			expect(res.status).toBe(404);
		});

		it("should return status 200, and the post if it is found", async () => {
			//Create user. Users model is already tested, so we are just using it to provide a valid Foreign Key to the created posts.
			const user = await Users.create({
				username: "Michael",
				password: "test"
			});
			//Generate posts with fakerJS
			const genPosts = await generatePosts(1, user.id);
			//insert generated posts for testing the API response.
			const newPost = await Posts.create(genPosts[0]);
			//Get one of the posts we just generated.
			const res = await request(server).get(`/api/posts/${newPost.id}`);
			const foundPost = await Posts.getOne({ id: newPost.id });
			expect(res.status).toBe(200);
			expect(res.body.title).toEqual(foundPost.title);
		});
	});

	describe("POST /", () => {
		it("should return status 401 if no JWT token in headers", async () => {
			let newPost = {
				title: faker.lorem.words(),
				description: faker.lorem.sentence(),
				image: faker.image.imageUrl()
			};
			const res = await request(server)
				.post("/api/posts")
				.send(newPost);
			expect(res.status).toBe(401);
		});

		it("should return status 422 if no title or image provided", async () => {
			//Create user. Users model is already tested, so we are just using it to provide a valid Foreign Key to the created posts.
			const user = await Users.create({
				username: "Michael",
				password: "test"
			});
			//Now create a JWT for the users authentication, just for testing the API's response.
			const payload = {
				id: user.id,
				username: user.username
			};
			const token = await jwt.sign(payload, process.env.JWT_SECRET, {
				expiresIn: "1d"
			});
			//
			let newPost = {
				title: faker.lorem.words(),
				description: faker.lorem.sentence()
			};
			const res = await request(server)
				.post("/api/posts")
				.send(newPost)
				.set("authorization", token);
			expect(res.status).toBe(422);
		});

		it("should return status 201 and the created post with successful authentication", async () => {
			//Create user. Users model is already tested, so we are just using it to provide a valid Foreign Key to the created posts.
			const user = await Users.create({
				username: "Michael",
				password: "test"
			});
			//Now create a JWT for the users authentication, just for testing the API's response.
			const payload = {
				id: user.id,
				username: user.username
			};
			const token = await jwt.sign(payload, process.env.JWT_SECRET, {
				expiresIn: "1d"
			});
			//
			let newPost = {
				title: faker.lorem.words(),
				description: faker.lorem.sentence(),
				image: faker.image.imageUrl()
			};
			const res = await request(server)
				.post("/api/posts")
				.send(newPost)
				.set("authorization", token);
			expect(res.status).toBe(201);
		});
	});

	describe("PUT /:id", () => {
		it("should return status 401 if no JWT token in headers", async () => {
			let newProps = {
				title: faker.lorem.words(),
				description: faker.lorem.sentence()
			};
			const res = await request(server)
				.put("/api/posts/1")
				.send(newProps);
			expect(res.status).toBe(401);
		});

		it("should return status 422 if no title or description provided", async () => {
			//Create user. Users model is already tested, so we are just using it to provide a valid Foreign Key to the created posts.
			const user = await Users.create({
				username: "Michael",
				password: "test"
			});
			//Now create a JWT for the users authentication, just for testing the API's response.
			const payload = {
				id: user.id,
				username: user.username
			};
			const token = await jwt.sign(payload, process.env.JWT_SECRET, {
				expiresIn: "1d"
			});
			//
			let newProps = {
				title: faker.lorem.words(),
				description: faker.lorem.sentence(),
				image: "test - we do not allow image edits, just upload a new image."
			};
			const res = await request(server)
				.put("/api/posts/1")
				.send(newProps)
				.set("authorization", token);
			expect(res.status).toBe(422);
		});

		it("should return status 403 and the updated post with successful authentication but no authorization", async () => {
			//Create user. Users model is already tested, so we are just using it to provide a valid JWT.
			const user = await Users.create({
				username: "Michael",
				password: "test"
			});

			const user2 = await Users.create({
				username: "JohnDoe",
				password: "test"
			});
			//Now create a JWT for the users authentication, just for testing the API's response.
			const payload = {
				id: user.id,
				username: user.username
			};
			const token = await jwt.sign(payload, process.env.JWT_SECRET, {
				expiresIn: "1d"
			});
			//Generate posts with fakerJS
			const genPosts = await generatePosts(1, user2.id);
			//insert generated posts for testing the API response.
			const newPost = await Posts.create(genPosts[0]);
			//Set properties to update
			const newProps = {
				title: "NEW TITLE NOW"
			};
			const res = await request(server)
				.put(`/api/posts/${newPost.id}`)
				.send(newProps)
				.set("authorization", token);
			expect(res.status).toBe(403);
		});

		it("should return status 201 and the updated post with successful authentication", async () => {
			//Create user. Users model is already tested, so we are just using it to provide a valid JWT.
			const user = await Users.create({
				username: "Michael",
				password: "test"
			});
			//Now create a JWT for the users authentication, just for testing the API's response.
			const payload = {
				id: user.id,
				username: user.username
			};
			const token = await jwt.sign(payload, process.env.JWT_SECRET, {
				expiresIn: "1d"
			});
			//Generate posts with fakerJS
			const genPosts = await generatePosts(1, user.id);
			//insert generated posts for testing the API response.
			const newPost = await Posts.create(genPosts[0]);
			//Set properties to update
			const newProps = {
				title: "NEW TITLE NOW"
			};
			const res = await request(server)
				.put(`/api/posts/${newPost.id}`)
				.send(newProps)
				.set("authorization", token);
			expect(res.status).toBe(201);
			expect(res.body.title).toEqual(newProps.title);
		});
	});

	describe("DELETE /:id", () => {
		it("should return status 401 if no JWT token in headers", async () => {
			let newProps = {
				title: faker.lorem.words(),
				description: faker.lorem.sentence()
			};
			const res = await request(server)
				.delete("/api/posts/1")
				.send(newProps);
			expect(res.status).toBe(401);
		});

		it("should return status 403 and the updated post with successful authentication but no authorization", async () => {
			//Create user. Users model is already tested, so we are just using it to provide a valid JWT.
			const user = await Users.create({
				username: "Michael",
				password: "test"
			});

			const user2 = await Users.create({
				username: "JohnDoe",
				password: "test"
			});
			//Now create a JWT for the users authentication, just for testing the API's response.
			const payload = {
				id: user.id,
				username: user.username
			};
			const token = await jwt.sign(payload, process.env.JWT_SECRET, {
				expiresIn: "1d"
			});
			//Generate posts with fakerJS
			const genPosts = await generatePosts(1, user2.id);
			//insert generated posts for testing the API response.
			const newPost = await Posts.create(genPosts[0]);
			const res = await request(server)
				.delete(`/api/posts/${newPost.id}`)
				.set("authorization", token);
			expect(res.status).toBe(403);
		});

		it("should return status 200 and the deleted message with successful authentication", async () => {
			//Create user. Users model is already tested, so we are just using it to provide a valid JWT.
			const user = await Users.create({
				username: "Michael",
				password: "test"
			});
			//Now create a JWT for the users authentication, just for testing the API's response.
			const payload = {
				id: user.id,
				username: user.username
			};
			const token = await jwt.sign(payload, process.env.JWT_SECRET, {
				expiresIn: "1d"
			});
			//Generate posts with fakerJS
			const genPosts = await generatePosts(1, user.id);
			//insert generated posts for testing the API response.
			const newPost = await Posts.create(genPosts[0]);
			const res = await request(server)
				.delete(`/api/posts/${newPost.id}`)
				.set("authorization", token);
			expect(res.status).toBe(200);
			expect(res.body).toEqual({ message: "Post deleted." });
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
