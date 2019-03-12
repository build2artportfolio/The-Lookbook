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

const getOne = async filter => {
	if (!filter) return null;
	const foundPost = await db("posts")
		.where(filter)
		.first();
	if (!foundPost) return null;
	const artist = await db("users")
		.select("id", "username")
		.where({ id: foundPost.artistId })
		.first();
	foundPost.artist = artist;
	delete foundPost.artistId;
	return foundPost;
};

const get = async (perPage, page) => {
	const totalPosts = await db("posts")
		.count()
		.first();
	const posts = await db("posts")
		.orderBy("created_at", "desc")
		.offset(perPage * page)
		.limit(perPage);
	//Refactor into using innerJoins when limit bug is fixed.
	for (let i = 0; i < posts.length; i++) {
		let user = await db("users")
			.select("id", "username")
			.where({ id: posts[i].artistId })
			.first();
		posts[i].artist = user;
	}
	const pagesObject = {
		totalPosts: Number(totalPosts.count),
		posts
	};
	return pagesObject;
};

const update = async (id, props) => {
	if (!id || !props) return null;
	const [updatedPostId] = await db("posts")
		.where({ id })
		.update(props, "id");
	if (!updatedPostId) return null;
	const updatedPost = await getOne({ id: updatedPostId });
	return updatedPost;
};

const del = async id => {
	if (!id) return null;
	const [deleted] = await db("posts")
		.where({ id })
		.del("id");
	if (!deleted) return null;
	return true;
};

module.exports = {
	create,
	getOne,
	get,
	update,
	del
};
