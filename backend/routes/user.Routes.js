const userControllers = require("./../controllers/userControllers");
const authControllers = require("./../controllers/authControllers");
const express = require("express");
const router = express.Router();

router.route("/register").post(authControllers.registerUser);
router.route("/login").post(authControllers.loginUser);

router.post("/forgotPassword", authControllers.forgotPassword);
router.post("/logout", authControllers.logout);

router
  .route("/resetPassword/:plainResetToken")
  //.get(authControllers.setPasswordChangeForm)

  .post(authControllers.resetPassword);

router.route("/").get(userControllers.getAllUsers);

module.exports = router;
