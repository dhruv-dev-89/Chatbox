const express=require("express");
const authmiddleware = require("../middleware/auth.middleware");
const {sendMessage,getMessage} = require("../controllers/message.controller");

const router=express.Router();

router.post("/send/:receiverId",authmiddleware,sendMessage)

router.get("/:receiverId",authmiddleware,getMessage);
module.exports=router