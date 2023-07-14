//import required packages 
const Question = require('../models/question');
const User = require('../models/user');
module.exports.home = async (req,res)=>{
    // console.log(req.cookies);
    let questions = await Question.find({}).populate('user');
    let users = await User.find({});
    // console.log('questions ', questions);
    // console.log('users ', users);
    return res.render('home' , {
        title:"Quora",
        questions:questions,
        all_users: users
    });
}