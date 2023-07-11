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
passport.deserializeUser( async function (id, done) {
 let userId = await User.findById(id);

 if(!userId){
    console.log("Error in config/passport-local");
    return;
 }
    return done(null, userId);
 });


module.exports = passport;
