//import all required packages
const User = require("../models/user");
const Interest = require("../models/userinterest");
const Token = require("../models/token");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const emailMailer = require("../mailers/emailVerification");

//rendring profile page
module.exports.profile = async (req, res) => {
  return res.render("users_profile", {
    title: "Quora | Profile",
  });
};

//render specific user profile when the user click on the name of any user 

module.exports.specificProfile = async(req,res)=>{
  try{
    let sUsers = await User.findById(req.params.id);
    console.log(sUsers);
    return res.render('specific_user_profile', {
      title: "Quora | Profile",
      sUser:sUsers
    });

  }catch(err){
    console.log(`Error in specific profile controller ${err}`);
    return;
  }
}

//set profile picture 
module.exports.setProfilePicture = async(req,res)=>{
  try{
    let user = await User.findByIdAndUpdate(req.params.id,{avatar:req.file.path});
    req.flash('success', 'Profile Picture Has Been Sets Successfully');
    return res.redirect('back');

  }catch(err){
    console.log(`Error in setProfilePicture controller ${err}`);
    return;
  }
}
//render sign-in page
module.exports.signIn = async (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("sign_in", {
    title: "Quora | Sign In",
  });
};

//render sign-up page
module.exports.signUp = async (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("sign_up", {
    title: "Quora | Sign Up",
  });
};

//  Social login + local login

//get the sign up data and create new user with email
module.exports.create = async (req, res) => {
  try {
    //check password and confirm password is correct
    if (req.body.password != req.body.confirm_password) {
      console.log("password doest not match");
      req.flash("error", "Please Enter Correct Comfirm Password ");
      return res.redirect("back");
    }

    // Check if this user already exisits.
    let user = await User.findOne({ email: req.body.email });

    // Insert the new user if they do not exist yet.
    if (!user) {
      user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        isVerified: false,
      });

      // Hash the password before saving into database.
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();

      // Generating the token for user verification
      let users = await User.findOne({ email: req.body.email });
      const token = new Token({
        userId: users._id,
        token: crypto.randomBytes(16).toString("hex"),
      });
      await token.save();

      // Send varification email
      const link = `http://localhost:8000/users/confirm/${token.token}`;
      await emailMailer.emailSend(users.email, "Email Verification", link);
      await req.flash("success", "Email Verification link sent to your email");
      return res.redirect("back");
    } else {
      req.flash("success", "Email already Exists Please Login");
      return res.redirect("/users/sign-in");
    }
  } catch (err) {
    console.log("error in create user controller ", err);
    return;
  }
};

// a. Account verification by email

// Verify Email address Api
module.exports.confirmationPost = async function (req, res, next) {
  // Find a matching token
  let token = await Token.findOne({ token: req.params.token });
  if (!token) {
    req.flash(
      "error",
      "We were unable to find a valid token.Your token my have expired."
    );
    return res.redirect("/users/sign-up");
  }

  // If we found a token, find a matching user
  let user = await User.findOne({ _id: token.userId });
  if (!user) {
    req.flash("error", "We were unable to find a user for this token.");
    return res.redirect("/users/sign-up");
  }
  //if already verified then return
  if (user.isVerified) {
    req.flash("success", "Email already Exists Please Login");
    return res.redirect("/users/sign-in");
  }
  // Verify and save the user
  user.isVerified = true;
  console.log(user.isVerified);
  user.save();
  req.flash("success", "Email Verified SuccessFully Please Login");
  //delete tokon form db after email verification success
  await Token.deleteOne(token);
  return res.redirect("/users/sign-in");
};

//sign in and create session for the user
module.exports.createSession = async function (req, res) {
  try {
    req.flash("success", "Logged in Successfully");
    return res.redirect("/");
  } catch (err) {
    console.log("error in create session ", err);
    return;
  }
};

//sign out and destory session of the user
module.exports.destroySession = async function (req, res) {
  await req.flash("success", "Logged out Successfully");
  req.logout((err) => {
    if (err) {
      return done(err);
    }
  });
  console.log("user sign out successfully");
  return res.redirect("/");
};

// a. User can follow different users on the app.

//follow a user
module.exports.followUser = async (req, res) => {
  try {
    //check if user already follow to user
    let istrue = false;
    //add the current user to the followers array of the target user
    let currentUser = await User.findById(req.params.id);

    if (!currentUser.followers[0]) {
      req.flash('success','Following User Successfully');
      currentUser.followers.push(req.user._id);
      currentUser.save();
      let follower = await User.findById(req.user._id);
      follower.following.push(req.params.id);
      follower.save();
      istrue = true;
    } else {
      for (let user in currentUser.followers) {
        if (currentUser.followers[user].equals(req.user._id)) {
          istrue = true;
          console.log("follower already exist ");
          break;
        }
      }
    }
    //if user already not followed then add user to the followers array
    if (istrue == false) {
      req.flash('success','Following User Successfully');
      currentUser.followers.push(req.user._id);
      currentUser.save();
    }

    //add the target user to the following array of the current user
    let follower = await User.findById(req.user._id);

    if (istrue == false) {
       follower.following.push(req.params.id);
       follower.save();
    }
    return res.redirect("/");
  } catch (err) {
    console.log("error occured in follow user", err);
    return;
  }
};

//unfollow user
module.exports.unFollowUser = async (req, res) => {
  try {
    //check if user already follow to user
    let istrue = false;
    //remove the current user to the followers array of the target user
    let currentUser = await User.findById(req.body.currentuserid);
    console.log("current User ", currentUser);
    console.log("current User ", currentUser.followers[0]);

    if (!currentUser.followers[0]) {
      currentUser.followers.pop(req.user._id);
      currentUser.save();
      istrue = true;
    } else {
      for (let user in currentUser.followers) {
        console.log("User id ", currentUser.followers[user]);
        console.log("User req id ", req.user._id);

        if (currentUser.followers[user].equals(req.user._id)) {
          istrue = true;
          console.log("unfollower already exist ");
          break;
        }
      }
    }
    //if user already not unfollowed then remove user to the followers array
    if (istrue == false) {
      currentUser.followers.pop(req.user._id);
      currentUser.save();
    }

    //remove the target user to the following array of the current user
    let follower = await User.findById(req.user._id);

    if (istrue == false) {
      follower.following.pop(req.body.currentuserid);
      follower.save();
    }

    console.log("User unfollowed successfully ");
    return res.redirect("/");
  } catch (err) {
    console.log("error occured in unfollow user", err);
    return;
  }
};

// b. Password reset option for local login

// forrget password page
module.exports.forgetPasswordPage = function (req, res) {
  return res.render("forget_password", {
    title: "Quora | Forget Password",
  });
};

module.exports.forgetPasswordLink = async function (req, res) {
  let user = await User.findOne({ email: req.body.email });
  console.log(user);
  if (!user) {
    req.flash("error", "User Not Found Please Sign Up or Try Correct Email");
    return res.redirect("/users/sign-up");
  }

  if (req.body.password == req.body.confirm_password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    await user.updateOne({ password: user.password });
    req.flash("success", "Password Forget Sucessfully Please Login");
    return res.redirect("/users/sign-in");
  }
  return res.redirect("back");
};

//Saving user’s interests and  User’s feed according to their interests
module.exports.userInterest = async (req, res) => {
  try {
    await Interest.create({
      interest: req.body.interest,
      user: req.user._id,
    });
    console.log("interest collected ");
    return res.redirect("/");
  } catch (err) {
    console.log("error in userInterest controller ", err);
    return;
  }
};

//delete answer form the db
module.exports.delete = async(req, res)=>{
  try{
    let id = req.params.id;
    //to do later
    // await Answer.findByIdAndDelete(id);
    await User.deleteMany({});
    req.flash('success', 'all user  deleted successfully');
    return res.redirect('/');
  }catch(err){
    console.log(`error in user delete controller ${err}`);
    return;
  }
}