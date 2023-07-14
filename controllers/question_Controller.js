//import required packages 
const User = require('../models/user');
const Question = require('../models/question');

//add question to db 
module.exports.create = async (req, res)=>{
    try{    
        console.log('question comes from req', req.body);
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