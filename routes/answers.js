//import all required packages
const express = require("express");
const router = express.Router();
const passport = require("passport");

const answerController = require("../controllers/answer_Controller");

router.post('/create-answer/:id',passport.checkAuthentication,answerController.createAnswer );

module.exports = router;
