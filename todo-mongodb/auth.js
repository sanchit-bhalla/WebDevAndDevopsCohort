const jwt = require("jsonwebtoken")

// auth middleware
function auth(req, res, next) {
  const token = req.headers.authorization;

  const response = jwt.verify(token, process.env.JWT_SECRET);

  if (response) {
    req.userId = token.userId;
    next();
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
}
 module.exports = {
	 auth
 }
