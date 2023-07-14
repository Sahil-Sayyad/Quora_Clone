//import all required packages
const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/user_Controller");

router.get("/profile", passport.checkAuthentication, userController.profile);
router.get("/sign-in", userController.signIn);
router.get("/sign-up", userController.signUp);

router.post("/create", userController.create);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-up" }),
  userController.createSession
);
router.get("/sign-out", userController.destroySession);
router.post(
  "/follow/:id",
  passport.checkAuthentication,
  userController.followUser
);
router.post(
  "/unfollow/:id",
  passport.checkAuthentication,
  userController.unfollowUser
);

module.exports = router;
