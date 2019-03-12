const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
	const token = req.headers.authorization;
	if (!token) {
		res.status(401).json({ message: "You must be logged in to do this." });
	} else {
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) {
				res
					.status(401)
					.json({ message: "Your token has expired. Please log in again." });
			} else {
				//Set the request.user to the payload of the token, which is the user's ID, and Username.
				req.user = decoded;
				next();
			}
		});
	}
};

module.exports = {
	authenticate
};
