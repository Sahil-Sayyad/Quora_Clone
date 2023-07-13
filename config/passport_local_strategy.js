//import required packages
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");

//athuntication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      let user = await User.findOne({ email: email });
      if (!user || user.password != password) {
        console.log("Invalid Username / Password");
        return done(null, false);
      }
      return done(null, user);
    }
  )
);

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(async function (id, done) {
  let userId = await User.findById(id);
  if (!userId) {
    console.log("Error in config/passport-local");
    return;
  }
  return done(null, userId);
});

//check if the user is  authenticated
passport.checkAuthentication = function (req, res, next) {
  //if the user is signed in then pass on the request to next controller action.
  if (req.isAuthenticated()) {
    return next();
  }
  //if the user is not signed in
  return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }

  next();
};
module.exports = passport;
