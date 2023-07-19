//import all required packages
const express = require("express");
const router = express.Router();
const passport = require("passport");

const commentController = require("../controllers/comment_Controller");

router.post('/create-comment',passport.checkAuthentication,commentController.create);
router.get('/delete',passport.checkAuthentication,commentController.delete);

module.exports = router;
