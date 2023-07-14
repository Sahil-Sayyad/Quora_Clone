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