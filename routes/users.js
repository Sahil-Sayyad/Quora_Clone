//import all required packages 
const express = require('express');
const router = express.Router();

const userController = require('../controllers/user_Controller');
const passport = require('passport');

router.get('/profile', userController.profile);
router.get('/sign-in', userController.signIn);

router.post('/create', userController.create);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
), userController.createSession);

module.exports = router;