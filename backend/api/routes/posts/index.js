const router = require("express").Router();
const Posts = require("../../../data/models/postsModel");
const authenticate = require("../../middleware/auth").authenticate;

router.get("/", async (req, res) => {
	let { pagesize, page } = req.headers;
	//If no pagesize or page headers are set, default to page 0, 20 per page.
	if (!pagesize) {
		pagesize = 20;
	}
	if (!page) {
		page = 0;
	}

	try {
		const posts = await Posts.get(pagesize, page);
		return res.status(200).json(posts);
	} catch (error) {
		return res.status(500).json({ message: "Internal error." });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const foundPost = await Posts.getOne({ id: req.params.id });
		if (!foundPost)
			return res.status(404).json({ message: "No post with that ID found." });
		res.status(200).json(foundPost);
	} catch (error) {
		return res.status(500).json({ message: "Internal error." });
	}
});

router.post("/", authenticate, async (req, res) => {
	const { title, description, image } = req.body;
	if (!title || !image)
		return res.status(422).json({
			message: "You must provide a title and image to create a post."
		});

	try {
		const newPost = {
			title,
			description,
			imageUrl: image,
			artistId: req.user.id
		};
		const createdPost = await Posts.create(newPost);
		return res.status(201).json(createdPost);
	} catch (error) {
		return res.status(500).json({ message: "Internal error." });
	}
});

router.put("/:id", authenticate, async (req, res) => {
	const { title, description, image } = req.body;
	if (!title && !description)
		return res.status(422).json({
			message: "You must provide a title or description to update a post with."
		});
	if (image)
		return res.status(422).json({
			message:
				"We do not allow image edits. Please upload the image you want instead."
		});
	let newProps = {};
	if (title) {
		newProps.title = title;
	}
	if (description) {
		newProps.description = description;
	}

	try {
		const findPost = await Posts.getOne({ id: req.params.id });
		if (req.user.id !== findPost.artist.id) {
			return res
				.status(403)
				.json({ message: "You do not have permission to modify this post." });
		}
		const updatedPost = await Posts.update(req.params.id, newProps);
		return res.status(201).json(updatedPost);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal error." });
	}
});

module.exports = router;
