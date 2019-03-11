const request = require("supertest");
const server = require("../../server");
const db = require("../../../data/database");
const Users = require("../../../data/models/usersModel");

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
				.send(body);
			expect(res.status).toBe(422);
		});

		it("should return Status 201 if valid username and password provided", async () => {
			const body = {
				username: "Michael",
				password: "MyPassWordHere"
			};
			const res = await request(server)
				.post("/api/auth/register")
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
				.send(body);
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
				.send(body);
			//Attempt to create another account with the same credentials. Should not allow us to, as the username is already in use.
			const res2 = await request(server)
				.post("/api/auth/register")
				.send(body);
			expect(res2.status).toBe(400);
			expect(res2.body).toEqual({
				message: "Account with those credentials is already taken."
			});
		});
	});

	describe("/login", () => {
		it("should return Status 422 if no username or password is provided", async () => {
			//Purposely don't provide password to test if we get 422 status code.
			const body = {
				username: "Michael"
			};
			const res = await request(server)
				.post("/api/auth/login")
				.send(body);
			expect(res.status).toBe(422);
		});

		it("should return Status 400 if incorrect username and password are provided", async () => {
			//Create a user so we can test logging in incorrectly.
			const body = {
				username: "Michael",
				password: "MyPassWordHere"
			};
			const createdUser = await Users.create(body);
			const res = await request(server)
				.post("/api/auth/login")
				.send({ ...body, password: "WRONG" });

			expect(res.status).toBe(400);
		});

		it("should return status 404 if no account with username is found", async () => {
			const body = {
				username: "notReal",
				password: "fake"
			};
			const res = await request(server)
				.post("/api/auth/login")
				.send(body);

			expect(res.status).toBe(404);
		});

		it("should return status 200, the user object, and a JWT token on successful login", async () => {
			//Create a user so we can test logging in
			const body = {
				username: "Michael",
				password: "MyPassWordHere"
			};
			//API compares password hash to submitted password, so we must create a user with a hashed password.
			const createUserRequest = await request(server)
				.post("/api/auth/register")
				.send(body);
			const res = await request(server)
				.post("/api/auth/login")
				.send(body);
			expect(res.status).toBe(200);
			//Check if user object matches the created users credentials.
			//Also check if token is a string and NOT null.
			expect(res.body.user.username).toEqual(body.username);
			expect(typeof res.body.token).toEqual("string");
		});
	});
});
