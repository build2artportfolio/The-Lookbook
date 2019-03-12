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
		it("should return status code 200", () => {});
	});
});
