//import required packages 
const User = require('../models/user');
const Question = require('../models/question');
const Answer = require('../models/answer');

module.exports.createAnswer = async (req, res)=>{
    try{
        //create the answer
        await Answer.create({
            content:req.body.content,
            question:req.body.questionId,
            user:req.params.id
        });
        console.log("question id is : ",req.body.questionId )
        console.log("Answer is created successfully");
        return res.redirect('/');
    }catch(err){
        console.log('error in create answer controller', err);
        return;
    }
}

//add upvotes to answers db
module.exports.upVoting = async (req, res)=>{
    try{
        await Answer.findByIdAndUpdate(req.body.questionId, {upVoting:req.params.id});
        console.log("upvoted to Answer");
        return res.redirect('/');
    }catch(err){
        console.log('error in upvoting Answer  controller', err);
        return;
    }
}

//add Downvotes to answers db 
module.exports.downVoting = async (req,res)=>{
    try{    
        await Answer.findByIdAndUpdate(req.body.questionId, {downVoting:req.params.id});
        console.log('downvoted to Answer');
        return res.redirect('/');
    }catch(err){
        console.log("error in downvoting Answer controller", err);
        return;
    }
}

