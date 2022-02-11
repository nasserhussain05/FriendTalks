const express=require('express');

const router=express.Router();

const homeController =require('../controllers/home_controllers.js');
//as this is route of routes we shall control all routes with this route
console.log("Hello");
router.get('/',homeController.home);

router.use('/users',require('./users'));

module.exports=router;