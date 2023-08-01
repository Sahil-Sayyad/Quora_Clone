//import required packages
const express = require('express');
const passport = require("passport");
const router = express.Router();
const homeController = require('../controllers/home_Controller');


router.get('/', passport.checkAuthentication, homeController.home);
router.use('/users', require('./users'));
router.use('/questions', require('./questions'));
router.use('/answers', require('./answers'));
router.use('/comments', require('./comment'));
module.exports = router;