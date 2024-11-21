const { Router } = require("express");
const {
  registerAdmin,
  signinAdmin,
  logoutAdmin,
  refreshAccessToken,
  changeCurrentPassword,
  createCourse,
  updateCourse,
  getCreatedCourses,
} = require("../controllers/admin.controller");
const { verifyAdminJWT } = require("../middlewares/authAdmin.middleware");

const adminRouter = Router();

adminRouter.post("/signup", registerAdmin);

adminRouter.post("/signin", signinAdmin);

adminRouter.post("/logout", verifyAdminJWT, logoutAdmin);

adminRouter.post("/refresh-token", refreshAccessToken);

adminRouter.post("/reset-password", verifyAdminJWT, changeCurrentPassword);

adminRouter.post("/course", verifyAdminJWT, createCourse);

adminRouter.patch("/course/:id", verifyAdminJWT, updateCourse);

adminRouter.get("/courses", verifyAdminJWT, getCreatedCourses);

module.exports = { adminRouter };
