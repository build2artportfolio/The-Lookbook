const request = require("supertest");
const server = require("../../server");
const db = require("../../../data/database");
const Users = require("../../../data/models/usersModel");
const Posts = require("../../../data/models/postsModel");

//After each test, reset the users table.
afterEach(async () => {
	await db("posts").del();
});

describe.skip("Post Routes", () => {
	describe("/", () => {
		it("should return status 200", async () => {
			const res = await request(server).get("/api/posts");
			expect(res.status).toBe(200);
		});
	});
});
