//import all required packages
const express = require("express");
const router = express.Router();
const passport = require("passport");

const questionController = require("../controllers/question_Controller");

router.post('/create-general',passport.checkAuthentication,questionController.createGeneralQuestion );
router.post('/create-specific/:id',passport.checkAuthentication,questionController.createQuestionToUser);
router.get('/create-upvote/:id', passport.checkAuthentication,questionController.upVoting);
router.get('/create-downvote/:id', passport.checkAuthentication,questionController.downVoting);
router.get('/delete', passport.checkAuthentication,questionController.delete);
module.exports = router;
