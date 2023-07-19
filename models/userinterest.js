//import required packages
const mongoose = require("mongoose");

const interestSchema = new mongoose.Schema({
  interest: {
    type: [String],
    required: true,
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true
  }
});

const Interest = mongoose.model("Interest", interestSchema);
module.exports = Interest;