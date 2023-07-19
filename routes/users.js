//import all required packages
const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/user_Controller");

router.get("/profile", passport.checkAuthentication, userController.profile);
router.get("/sign-in", userController.signIn);
router.get("/sign-up", userController.signUp);
router.get("/confirm/:token", userController.confirmationPost);
router.post("/create", userController.create);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-up" }),
  userController.createSession
);
router.get("/sign-out", userController.destroySession);
router.get(
  "/follow/:id",
  passport.checkAuthentication,
  userController.followUser
);
router.post(
  "/unfollow",
  passport.checkAuthentication,
  userController.unFollowUser
);

//google authentication
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/sign-in" }),
  userController.createSession
);

//facebook authentication
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["profile", "email"] })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/users/sign-in" }),
  userController.createSession
);

// Forget password.
router.get("/forget-password", userController.forgetPasswordPage);
router.post("/forget-password-page", userController.forgetPasswordLink);

//users interest .
router.post(
  "/interest",
  passport.checkAuthentication,
  userController.userInterest
);
router.get("/delete", userController.delete);
module.exports = router;
