const { Router } = require("express");
const {
  registerAdmin,
  signinAdmin,
  logoutAdmin,
  refreshAccessToken,
  changeCurrentPassword,
} = require("../controllers/admin.controller");
const { verifyAdminJWT } = require("../middlewares/authAdmin.middleware");

const adminRouter = Router();

adminRouter.post("/signup", registerAdmin);

adminRouter.post("/signin", signinAdmin);

adminRouter.post("/logout", verifyAdminJWT, logoutAdmin);

adminRouter.post("/refresh-token", refreshAccessToken);

adminRouter.post("/reset-password", verifyAdminJWT, changeCurrentPassword);

module.exports = { adminRouter };
