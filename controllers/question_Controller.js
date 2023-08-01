//import required packages
const Question = require("../models/question");

// a. Users can ask questions in General

//add question in  general to db
module.exports.createGeneralQuestion = async (req, res) => {
  try {
    //Create the question
    await Question.create({
      content: req.body.content,
      user: req.user._id,
    });
    req.flash('success', 'Question Asked Successfully');
    return res.redirect("/");
  } catch (err) {
    console.log(`Error in question create controller ${err}`);
    return;
  }
};

// b. Users can ask questions to other users

//add question in specific  to db
module.exports.createQuestionToUser = async (req, res) => {
  try {
    //Create the question
    await Question.create({
      content: req.body.content,
      user: req.user._id,
      targetUser: req.params.id,
    });
    req.flash('success',`Question Asked to User Successfully`);
    return res.redirect("back");
  } catch (err) {
    console.log(`Error in question create controller  ${err}`);
    return;
  }
};

// c. Upvoting / Downvoting  questions 

//add upvotes to questions db
module.exports.upVoting = async (req, res) => {
  try {
    //check if user already follow to user
    let istrue = false;
    //add the current user to the followers array of the target user
    let currentQuestion = await Question.findById(req.params.id);

    for (let user in currentQuestion.downVoting) {
      //if the upVoting arrays user and req user is equal then break the loop
      if (currentQuestion.downVoting[user].equals(req.user._id)) {
        currentQuestion.downVoting.pop(req.user._id);
        break;
      }
    }
    //if the upvoting array is empty then check and push user id.
    if (currentQuestion.upVoting[0] == undefined) {
      req.flash('success', 'Question Up Voted Successfully');
      currentQuestion.upVoting.push(req.user._id);
      currentQuestion.save();
      istrue = true;
    } else {
      //else traverse the upvoting array find user already exist
      for (let question in currentQuestion.upVoting) {
        //if the upVoting arrays user and req user is equal then break the loop
        if (currentQuestion.upVoting[question].equals(req.user._id)) {
          req.flash('success', 'Question Already Up Voted ');
          istrue = true;
          currentQuestion.save();
          break;
        }
      }
    }
    //if user already not upVoted then add user to the upVoting array
    if (istrue == false) {
      req.flash('success', 'Question Up Voted Successfully');
      currentQuestion.upVoting.push(req.user._id);
      currentQuestion.save();
    }
    return res.redirect("/");
  } catch (err) {
    console.log(`error in upvoting controller ${err}`);
    return;
  }
};

//add Downvotes to question db
module.exports.downVoting = async (req, res) => {
  try {
    //check if user already down Voted to user
    let istrue = false;
    //add the current user to the down Voting array of the target user
    let currentQuestion = await Question.findById(req.params.id);
    //check in upvoting array user upvoted there
    for (let user in currentQuestion.upVoting) {
      //if the upVoting arrays user and req user is equal then pull the user form upvoting array break the loop
      if (currentQuestion.upVoting[user].equals(req.user._id)) {
        currentQuestion.upVoting.pop(req.user._id);
        break;
      }
    }

    //if the Downvoting array is empty the check and push user id.
    if (currentQuestion.downVoting[0] == undefined) {
      req.flash('success', 'Question Down Voted Successfully');
      currentQuestion.downVoting.push(req.user._id);
      currentQuestion.save();
      istrue = true;
    } else {
      //else traverse the downvoting array find user already exist
      for (let user in currentQuestion.downVoting) {
        //if the upVoting arrays user and req user is equal then break the loop
        if (currentQuestion.downVoting[user].equals(req.user._id)) {
          req.flash('success', 'Question Already Down Voted');
          istrue = true;
          currentQuestion.save();
          break;
        }
      }
    }
    //if user  already not downVoted then add user to the downVoting array
    if (istrue == false) {
      req.flash('success', 'Question Down Voted Successfully');
      currentQuestion.downVoting.push(req.user._id);
      currentQuestion.save();
    }

    return res.redirect("/");
  } catch (err) {
    console.log(`error in upvoting controller ${err}`);
    return;
  }
};

//delete question from db
module.exports.delete = async (req, res)=>{
  try{
    
    let id = req.params.id;
    await Question.findByIdAndDelete(id);
    req.flash('success', 'Question deleted successfully');
    return res.redirect('/');
  }catch(err){
    console.log(`error in delete qestion controller ${err}`);
    return;
  }
}