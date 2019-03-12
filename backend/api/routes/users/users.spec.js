const request = require("supertest");
const server = require("../../server");
const db = require("../../../data/database");
const Users = require("../../../data/models/usersModel");
const jwt = require("jsonwebtoken");

afterEach(async () => {
	await db("posts").del();
	await db("users").del();
});

describe("Users Routes", () => {
	describe("GET /:id", () => {
		it("should return status code 200", async () => {
			//Create user. Users model is already tested, so we are just using it to provide a valid user to get results from.
			const user = await Users.create({
				username: "Michael",
				password: "test"
			});
			const res = await request(server).get(`/api/users/${user.id}`);
			expect(res.status).toBe(200);
		});

		it("should return 404 if no user found", async () => {
			//Incrementation of ID's start at 1, so we know there is no user with ID of 0.
			const res = await request(server).get(`/api/users/0`);
			expect(res.status).toBe(404);
		});
	});

	describe("PUT /:id", () => {
		it("should return status 401 if no JWT token in headers", async () => {
			let newProps = {
				username: "NewFakeName",
				about: faker.lorem.sentence()
			};
			const res = await request(server)
				.put("/api/users/1")
				.send(newProps);
			expect(res.status).toBe(401);
		});

		it("should return status 422 if no username, password, or about properties provided.", async () => {
			//Create user. Users model is already tested.
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
			const res = await request(server)
				.put("/api/users/1")
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
				about: "NEW ABOUT NOW"
			};
			const res = await request(server)
				.put(`/api/users/${newPost.id}`)
				.send(newProps)
				.set("authorization", token);
			expect(res.status).toBe(403);
		});

		it("should return status 201 and the updated user with successful authentication", async () => {
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
			//Set properties to update
			const newProps = {
				about: `I'm cooler than most people think.`
			};
			const res = await request(server)
				.put(`/api/users/${newPost.id}`)
				.send(newProps)
				.set("authorization", token);
			expect(res.status).toBe(201);
			expect(res.body.about).toEqual(newProps.about);
		});
	});
});
