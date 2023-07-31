//import required packages
const Question = require("../models/question");
const User = require("../models/user");
const Answer = require("../models/answer");
const Token = require("../models/token");
const Interest = require("../models/userinterest");

module.exports.home = async (req, res) => {
  let questions = await Question.find({})
    .populate("user")
    .populate("targetUser")
    .populate({
      path: "answers",
      populate: [
        {
          path: "user",
          model: "User",
        },
        {
          path: "comments",
          populate: {
            path: "user",
            model: "User",
          },
        },
      ],
    });

  let users = await User.find({});

  return res.render("home", {
    title: "Quora",
    questions: questions,
    all_users: users,
  });
};

//these controllers for the admin user
module.exports.deleteTokon = async (req, res) => {
  try {
    await Token.deleteMany({});
    req.flash("success", "all token are deleted");
    return res.redirect("/");
  } catch (err) {
    console.log(`error in token delete controller ${err}`);
  }
};
module.exports.deleteInterest = async (req, res) => {
  try {
    await Interest.deleteMany({});
    req.flash("success", "all Interest are deleted");
    return res.redirect("/");
  } catch (err) {
    console.log(`error in token delete controller ${err}`);
  }
};
