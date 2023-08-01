//import required packages 
const Question = require('../models/question');
const Answer = require('../models/answer');

// a. A user can answer a question

//redirect to answer.ejs
module.exports.getPage = (req, res)=>{
    try{
      let questionId = req.params.id;
      return res.render('answer', {
        title: "Quora | Add Answer",
        id :questionId
      });

    }catch(err){
      console.log(`error in get answer  Page controller ${err}`);
      return;
    }
}


//create answer 
module.exports.createAnswer = async (req, res)=>{
    try{
        //find the question first 
        let question = await Question.findById(req.body.question);
        //create the answer
        if(question){
          let answer = await Answer.create({
                content:req.body.content,
                question:req.body.question,
                user:req.user._id
            });
            //add anwer the to this question 
            question.answers.push(answer);
            question.save();
        }
        req.flash('success', "Answered");
        return res.redirect('/');
    }catch(err){
        console.log(`error in create answer controller ${err}`);
        return;
    }
}
// c. Upvoting / Downvoting  Answers 

//add upvotes to answers to db
module.exports.upVoting = async (req, res) => {
    try {
      //check if user already upvoted to user
      let istrue = false;
      //add the current user to the upvoted array of the target user
      let currentAnswer = await Answer.findById(req.params.id);
  
      for (let user in currentAnswer.downVoting) {
        //if the upVoting arrays user and req user is equal then break the loop
        if (currentAnswer.downVoting[user].equals(req.user._id)) {
            currentAnswer.downVoting.pop(req.user._id);
            break;
        }
      }
  
      //if the upvoting array is empty then check and push user id.
      if (currentAnswer.upVoting[0] == undefined) {
      req.flash('success', 'Answer Up Voted Successfully');
        currentAnswer.upVoting.push(req.user._id);
        currentAnswer.save();
        istrue = true;
      } else {
        //else traverse the upvoting array find user already exist
        for (let question in currentAnswer.upVoting) {
          //if the upVoting arrays user and req user is equal then break the loop
          if (currentAnswer.upVoting[question].equals(req.user._id)) {
            req.flash('success', 'Answer Already Up Voted ');
            istrue = true;
            currentAnswer.save();
            break;
          }
        }
      }
      //if user already not upVoted then add user to the upVoting array
      if (istrue == false) {
      req.flash('success', 'Answer Up Voted Successfully');
        currentAnswer.upVoting.push(req.user._id);
        currentAnswer.save();
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
      let currentAnswer = await Answer.findById(req.params.id);
      //check in upvoting array user upvoted there
      for (let user in currentAnswer.upVoting) {
        //if the upVoting arrays user and req user is equal then pull the user form upvoting array break the loop
        if (currentAnswer.upVoting[user].equals(req.user._id)) {
            currentAnswer.upVoting.pop(req.user._id);
            break;
        }
      }
  
      //if the Downvoting array is empty the check and push user id.
      if (currentAnswer.downVoting[0] == undefined) {
      req.flash('success', 'Answer Down Voted Successfully');
        currentAnswer.downVoting.push(req.user._id);
        currentAnswer.save();
        istrue = true;
      } else {
        //else traverse the downvoting array find user already exist
        for (let user in currentAnswer.downVoting) {
          //if the upVoting arrays user and req user is equal then break the loop
          if (currentAnswer.downVoting[user].equals(req.user._id)) {
            req.flash('success', 'Answer Already Down Voted');
            istrue = true;
            currentAnswer.save();
            break;
          }
        }
      }
      //if user  already not downVoted then add user to the downVoting array
      if (istrue == false) {
        req.flash('success', 'Answer Down Voted Successfully');
        currentAnswer.downVoting.push(req.user._id);
        currentAnswer.save();
      }
  
      return res.redirect("/");
    } catch (err) {
      console.log(`error in upvoting controller ${err}`);
      return;
    }
  };
  
  //delete answer form the db
  module.exports.delete = async(req, res)=>{
    try{
      let id = req.params.id;
      await Answer.findByIdAndDelete(id);
      req.flash('success', 'answer deleted successfully');
      return res.redirect('/');
    }catch(err){
      console.log(`error in delete answer controller ${err}`);
      return;
    }
  }