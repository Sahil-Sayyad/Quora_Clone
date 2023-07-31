//import required packages 
const Comment = require('../models/comment');
const Question = require('../models/question');
const Answer = require('../models/answer');

// 5. Adding Comments to Answers

// render comment.ejs 
module.exports.getPage = async(req,res)=>{
  try{
  let answerId = req.params.id;
  return res.render('comment.ejs',{
    title:"Quora | Add Comment",
    id:answerId
  })

  }catch(err){
    console.log(`error in getPage comment ${err}`);
    return;
  }
}
//add comment to db 
module.exports.create = async(req, res)=>{
    try{

        let answer = await Answer.findById(req.body.answerId);
        let question = await Question.findById(req.body.questionId);
        if(answer || question){

         let comment = await Comment.create({
                comment:req.body.comment,
                user:req.user._id,
                answer:req.body.answerId,
                question:req.body.questionId
            });

            answer.comments.push(comment);
            answer.save();
        }
        console.log("comment data : ", req.body);
        req.flash('success', 'Commented to Answer');
        console.log("comment created sussefully");
        return res.redirect('/');
    }catch(err){
        console.log("error in comment create controller", err);
        return;
    }
}

//delete answer form the db
module.exports.delete = async(req, res)=>{
    try{
      let id = req.params.id;
      //to do later
      // await Answer.findByIdAndDelete(id);
      await Comment.deleteMany({});
      req.flash('success', 'comment deleted successfully');
      return res.redirect('/');
    }catch(err){
      console.log(`error in comment answer controller ${err}`);
      return;
    }
  }