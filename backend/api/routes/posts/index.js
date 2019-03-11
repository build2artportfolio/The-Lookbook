const router = require("express").Router();
const Posts = require("../../../data/models/postsModel");

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

module.exports = router;
