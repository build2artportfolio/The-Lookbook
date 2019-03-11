require("dotenv").config(); //Load environment variables. We do this in server.js instead of index.js because the test suite imports server.js, not index.js

const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan("dev"));

server.get("/api", (req, res) => {
	res.status(200).json({ message: "API Live" });
});

server.use("/api/auth", authRoutes);
server.use("/api/posts", postRoutes);

module.exports = server;
