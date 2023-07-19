//import all required packages
const express = require("express");
const router = express.Router();
const passport = require("passport");

const answerController = require("../controllers/answer_Controller");

router.post('/create-answer',passport.checkAuthentication,answerController.createAnswer );
router.post('/create-upvote', passport.checkAuthentication,answerController.upVoting);
router.post('/create-downvote', passport.checkAuthentication,answerController.downVoting);
router.get('/delete', passport.checkAuthentication,answerController.delete);
module.exports = router;
