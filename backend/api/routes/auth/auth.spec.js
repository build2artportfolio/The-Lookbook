const request = require("supertest");
const server = require("../../server");

describe("Auth Routes", () => {
	describe("/register", () => {
		it("should return Status 400 if no username or password is provided", async () => {
			//Purposely don't provide password to test if we get 400 status code.
			const body = {
				username: "Michael"
			};
			const res = await request(server)
				.post("/api/auth/register")
				.set("Accept", "application/json")
				.send(body);
			expect(res.status).toBe(400);
		});

		it("should return Status 201 if valid username and password provided", async () => {
			const body = {
				username: "Michael",
				password: "MyPassWordHere"
			};
			const res = await request(server)
				.post("/api/auth/register")
				.set("Accept", "application/json")
				.send(body);
			expect(res.status).toBe(201);
		});

		it("should return successful register message if valid username and password provided", async () => {
			const body = {
				username: "Michael",
				password: "MyPassWordHere"
			};
			const res = await request(server)
				.post("/api/auth/register")
				.set("Accept", "application/json")
				.send(body);
			expect(res.body).toEqual({ message: "Successfully registered account." });
		});
	});
});
