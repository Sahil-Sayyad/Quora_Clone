//import required packages 
const User = require('../models/user');
const Question = require('../models/question');

//add question to db 
module.exports.create = async (req, res)=>{
    try{    

        let question = await Question.create(req.body);
        console.log('question created succesfully');
        return res.redirect('/');
    }catch(err){
        console.log("Error in question create controller ", err);
        return ;
    }
}