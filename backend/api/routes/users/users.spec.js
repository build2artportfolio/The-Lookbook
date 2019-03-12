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
});
