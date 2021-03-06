const request = require("supertest");
const db = require("../../database");
const Users = require("./index");

//After each test, reset the users table.
afterEach(async () => {
	await db("users").del();
});

describe("Users Model Functions", () => {
	describe("create()", () => {
		it("creates a user in the database based on provided user object", async () => {
			const newUser = {
				username: "Michael",
				password: "testpass" //This will be a hashed password. But we are not testing our password hashing, simply the create user method.
			};
			const createdUser = await Users.create(newUser);
			//Expect that the new created user has an id from createdUser, then the username and password provided from newUser object/Passed in user object.
			//The create function should create the user, but also return the user object.
			expect(createdUser).toEqual({ ...createdUser, ...newUser });
		});
	});

	describe("getOne()", () => {
		it("fetches a user by the filter provided", async () => {
			//Create a user in the Database, using our already tested user create method.
			//This way we can test the getOne() method with the created user's properties.
			const newUser = {
				username: "Michael",
				password: "testpass"
			};
			const createdUser = await Users.create(newUser);
			//Here we test if the filter passed into our getOne method works for one, or multiple properties.
			const fetchById = await Users.getOne({ id: createdUser.id });
			expect(fetchById).toEqual({ ...createdUser, posts: [] });
			const fetchByUsername = await Users.getOne({
				username: createdUser.username
			});
			expect(fetchByUsername).toEqual({ ...createdUser, posts: [] });
			const fetchByIdAndUsername = await Users.getOne({
				id: createdUser.id,
				username: createdUser.username
			});
			expect(fetchByIdAndUsername).toEqual({ ...createdUser, posts: [] });
		});

		it("returns null if no user is found", async () => {
			//Our database starts ID incrementation at 1, so we know no record will ever have the Id of 0.
			const fetchNoUser = await Users.getOne({ id: 0 });
			expect(fetchNoUser).toBe(null);
		});

		it("returns null if no filter parameter is provided", async () => {
			//If no filter is provided to the getOne parameter, it should return null.
			const fetchWithNoFilter = await Users.getOne();
			expect(fetchWithNoFilter).toBe(null);
		});
	});

	describe("update()", () => {
		it("should return the updated record based on the properties to update passed to it.", async () => {
			//Create user. Users model is already tested, so we are just using it to provide a valid Foreign Key to the created post.
			const user = await Users.create({
				username: "Michael",
				password: "test"
			});
			const updateProps = {
				username: "notMichaelAnymore",
				about: "About me CHANGED."
			};
			const updatedUser = await Users.update(user.id, updateProps);
			expect(updatedUser).toEqual({ ...user, ...updateProps, posts: [] });
		});

		it("should return null if nothing was updated", async () => {
			const updateProps = {
				username: "notMichaelAnymore",
				about: "About me CHANGED."
			};
			const updatedUser = await Users.update(0, updateProps);
			expect(updatedUser).toBe(null);
		});
	});

	describe("del()", () => {
		it("should return true if delete worked", async () => {
			//Create user.
			const user = await Users.create({
				username: "Michael",
				password: "test"
			});
			//Delete user
			const deleted = await Users.del(user.id);
			expect(deleted).toBe(true);
		});

		it("should return null if no record was deleted", async () => {
			//User ID incrementation begins at 1, so we know nothing exists with the ID of 0.
			const deleted = await Users.del(0);
			expect(deleted).toBe(null);
		});
	});
});
