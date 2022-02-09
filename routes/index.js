const { Router } = require('express');
const express=require('express');

const router=express.Router();

const homeController =require('../controllers/home_controllers.js');

console.log("Hello");
router.get('/',homeController.home);

module.exports=router;