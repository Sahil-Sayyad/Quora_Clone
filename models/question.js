// import required packages
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    targetUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},
{
    timestamps:true
});
const Question = mongoose.model('Question', questionSchema); 
module.exports = Question;