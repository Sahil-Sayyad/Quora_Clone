//import required packages
const Question = require("../models/question");

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


  return res.render("home", {
    title: "Quora",
    questions: questions,
  });
};

