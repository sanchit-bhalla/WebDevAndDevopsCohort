const jwt = require("jsonwebtoken");

// auth middleware
function auth(req, res, next) {
  try {
    const token = req.headers.authorization;

    const response = jwt.verify(token, process.env.JWT_SECRET);

    if (response) {
      req.userId = response.id; // id bcz we use id as key in jwt.sign
      next();
    } else {
      res.status(401).send({
        message: "Unauthorized",
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Some error occured. Please try after sometime" });
  }
}
module.exports = {
  auth,
};
