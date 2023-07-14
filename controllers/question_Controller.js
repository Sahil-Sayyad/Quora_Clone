//import required packages 
const User = require('../models/user');
const Question = require('../models/question');

//add question in  general to db 
module.exports.createGeneralQuestion = async (req, res)=>{
    try{    
        console.log('question comes from req', req.body);
        //Create the question
        await Question.create({
            content:req.body.content,
            user:req.user._id
        });
        console.log('question created succesfully');
        return res.redirect('/');
    }catch(err){
        console.log("Error in question create controller ", err);
        return ;
    }
}
//add question in specific  to db 
module.exports.createQuestionToUser = async (req, res)=>{
    try{    
        console.log('question comes from req', req.body);
        //Create the question
        await Question.create({
            content:req.body.content,
            user:req.user._id,
            //to do add target User
            targetUser:req.body.currentuserid,
        });
        console.log('question user specific created succesfully');
        return res.redirect('/');
    }catch(err){
        console.log("Error in question create controller ", err);
        return ;
    }
}
