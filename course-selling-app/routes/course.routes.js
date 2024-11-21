const { Router } = require("express");
const { verifyUserJWT } = require("../middlewares/authUser.middleware");
const {
  purchaseCourse,
  previewCourses,
} = require("../controllers/course.controller");

const courseRouter = Router();

courseRouter.post("/purchase", verifyUserJWT, purchaseCourse);

courseRouter.get("/preview", previewCourses);

module.exports = { courseRouter };
