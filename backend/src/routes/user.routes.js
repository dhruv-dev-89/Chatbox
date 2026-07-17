const express=require("express");
const router=express.Router();
const { getMyProfile ,searchUsers, getAllUsers} = require("../controllers/user.controller");


const authMiddleware = require("../middleware/auth.middleware");

router.get("/myprofile",authMiddleware,getMyProfile)
router.get('/searchusers', authMiddleware,searchUsers);
router.get("/getallusers",authMiddleware,getAllUsers);

module.exports=router