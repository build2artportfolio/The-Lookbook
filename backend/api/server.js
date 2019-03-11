const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

server.use(cors());
server.use(helmet());
server.use(morgan("dev"));

server.get("/api", (req, res) => {
	res.status(200).json({ message: "API Live" });
});

module.exports = server;
