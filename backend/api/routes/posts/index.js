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
		console.log(error);
		return res.status(500).json({ message: "Internal error." });
	}
});

module.exports = router;
