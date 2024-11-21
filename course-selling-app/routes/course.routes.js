const { Router } = require("express");
const { verifyUserJWT } = require("../middlewares/authUser.middleware");
const { purchaseCourse } = require("../controllers/course.controller");

const courseRouter = Router();

courseRouter.post("/purchase", verifyUserJWT, purchaseCourse);

module.exports = { courseRouter };
