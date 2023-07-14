//import required packages
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_Controller');
console.log('router is loaded');

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/question', require('./questions'));
router.use('/answer', require('./answers'));
module.exports = router;