const request = require("supertest");
const server = require("../../server");
const db = require("../../../data/database");

describe("Auth Routes", () => {
	//After each test, reset the users table.
	afterEach(async () => {
		await db("users").truncate();
	});
	describe("/register", () => {
		it("should return Status 422 if no username or password is provided", async () => {
			//Purposely don't provide password to test if we get 422 status code.
			const body = {
				username: "Michael"
			};
			const res = await request(server)
				.post("/api/auth/register")
				.send(body)
				.set("accept", "application/json");
			expect(res.status).toBe(422);
		});

		it("should return Status 201 if valid username and password provided", async () => {
			const body = {
				username: "Michael",
				password: "MyPassWordHere"
			};
			const res = await request(server)
				.post("/api/auth/register")
				.send(body)
				.set("Accept", "application/json");

			expect(res.status).toBe(201);
		});

		it("should return successful register message if valid username and password provided", async () => {
			const body = {
				username: "Michael",
				password: "MyPassWordHere"
			};
			const res = await request(server)
				.post("/api/auth/register")
				.send(body)
				.set("Accept", "application/json");
			expect(res.body).toEqual({ message: "Successfully registered account." });
		});

		it("should return Status 400 and a message saying credentials are already in use.", async () => {
			const body = {
				username: "Michael",
				password: "MyPassWordHere"
			};
			//Have api create one account.
			const res1 = await request(server)
				.post("/api/auth/register")
				.send(body)
				.set("Accept", "application/json");
			//Attempt to create another account with the same credentials. Should not allow us to, as the username is already in use.
			const res2 = await request(server)
				.post("/api/auth/register")
				.send(body)
				.set("Accept", "application/json");
			expect(res2.status).toBe(400);
			expect(res2.body).toEqual({
				message: "Account with those credentials is already taken."
			});
		});
	});
});
