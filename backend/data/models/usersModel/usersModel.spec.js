const request = require("supertest");
const db = require("../../database");
const Users = require("./index");

describe("Users Model Functions", () => {
	//After each test, reset the users table.
	afterEach(async () => {
		await db("users").truncate();
	});
	describe("create()", () => {
		it("creates a user in the database based on provided user object", async () => {
			const newUser = {
				username: "Michael",
				password: "testpass"
			};
			const createdUser = await Users.create(newUser);
			//Expect that the new created user has an id from createdUser, then the username and password provided from newUser object/Passed in user object.
			expect(createdUser).toEqual({ ...createdUser, ...newUser });
		});
	});
});
