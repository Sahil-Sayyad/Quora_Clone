//import required packages 
const mongoose = require('mongoose');
const answerSchema = new  mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    question:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'Question',
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    upVoting:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    downVoting:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],

    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }]
},
{
    timestamps:true
});

const Answer = mongoose.model('Answer', answerSchema);
module.exports = Answer;