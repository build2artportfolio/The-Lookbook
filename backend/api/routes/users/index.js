const router = require("express").Router();
const Posts = require("../../../data/models/postsModel");
const authenticate = require("../../middleware/auth").authenticate;

module.exports = router;
