const db = require("../../database");

const create = async post => {
	//destructure returned ID into a single variable.
	const [createdPostId] = await db("posts").insert(post, "id");
	//Return created post with user property of who created it as well.
	const createdPost = await db("posts")
		.where({ id: createdPostId })
		.first();
	const artist = await db("users")
		.select("id", "username")
		.where({ id: createdPost.artistId })
		.first();
	createdPost.artist = artist;
	delete createdPost.artistId;
	return createdPost;
};

module.exports = {
	create
};
