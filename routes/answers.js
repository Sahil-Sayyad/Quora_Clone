//import all required packages
const express = require("express");
const router = express.Router();
const passport = require("passport");

const answerController = require("../controllers/answer_Controller");

router.get('/getpage/:id',answerController.getPage);
router.post('/create-answer',passport.checkAuthentication,answerController.createAnswer );
router.get('/create-upvote/:id', passport.checkAuthentication,answerController.upVoting);
router.get('/create-downvote/:id', passport.checkAuthentication,answerController.downVoting);
router.get('/delete', passport.checkAuthentication,answerController.delete);
module.exports = router;
