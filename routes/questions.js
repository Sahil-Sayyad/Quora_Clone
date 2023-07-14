//import all required packages
const express = require("express");
const router = express.Router();
const passport = require("passport");

const questionController = require("../controllers/question_Controller");

router.post('/create',passport.checkAuthentication,questionController.create );

module.exports = router;
