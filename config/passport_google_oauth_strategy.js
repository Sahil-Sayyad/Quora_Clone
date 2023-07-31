const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

// Tell Passport to use a new strategy for Google login
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "1085488163659-r3lgq1j2ifthskitpscvd7j6saegqq17.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:8000/users/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        // Find a user based on their Google email
        let user = await User.findOne({ email: profile.emails[0].value });
        console.log(profile);
        if (user) {
          // If found, set this user as req.user
          return done(null, user);
        } else {
          // If not found, create the user and set it as req.user
          let newUser = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString("hex"),
            isVerified:true
          });
          return done(null, newUser);
        }
      } catch (err) {
        console.log("Error in the passport-google-oauth2-strategy: " + err);
        return done(err, null);
      }
    }
  )
);
module.exports = passport;
