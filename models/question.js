// import required packages
const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    targetUser:{
      type:mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    upVoting: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    downVoting: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
