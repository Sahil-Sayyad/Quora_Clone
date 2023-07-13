//import required packages 
const Question = require('../models/question');
const User = require('../models/user');
module.exports.home = async (req,res)=>{
    console.log(req.cookies);

    let questions = await Question.find({});
    console.log('questions ', questions);
    return res.render('home' , {
        title:"Quora",
        questions:questions
    });
}