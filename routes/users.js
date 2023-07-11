//import all required packages 
const express = require('express');
const router = express.Router();

const userController = require('../controllers/user_Controller');

router.get('/profile', userController.profile);
router.get('/sign-in', userController.signIn);

router.post('/create', userController.create);

module.exports = router;