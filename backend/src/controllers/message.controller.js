const { default: mongoose } = require("mongoose");
const messageModel = require("../models/message.model");
const {getIO,onlineUsers}=require("../socket/socket")



const sendMessage=async (req,res)=>{
    const sender=req.user.id;
    const {receiverId}=req.params;
    const text=req.body.text;
    if (!text || text.trim().length === 0) {
        return res.status(400).json({
            message: "Message cannot be empty"
        });
    }
    const cleanText = text.trim();
    try {
        const message=await messageModel.create({
            sender:sender,
            receiver:receiverId,
            text:cleanText
        })

        const receiverSocketId=onlineUsers[receiverId];
        if(receiverSocketId){
            const io=getIO();
            io.to(receiverSocketId).emit("send-message",message);
        }
        return res.status(201).json({
            newMessage: message
        });
    } catch (error) {
        console.log("error in message controller is : ",error);
        
        return res.status(500).json({
            message:"Message not sent"
        })
    }
}


const getMessage=async (req,res)=>{
    const senderId=req.user.id;
    const {receiverId}=req.params;

    try {
        const conversations=await messageModel.find({
            $or:[
                {
                    sender:senderId,
                    receiver:receiverId
                },
                {
                    sender:receiverId,
                    receiver:senderId
                },
            ]
        }).sort({ createdAt: 1 });

        return res.status(200).json({
            conversations
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to fetch messages"
        });
    }
}


const markMessageAsRead = async (req, res) => {

    const reader = req.user.id;
    const { sender } = req.params;

    try {
        const result = await messageModel.updateMany(
            {
                sender,
                receiver: reader,
                isRead: false
            },
            {
                isRead: true
            }
        );

        if (result.modifiedCount > 0) {

            const senderSocketId = onlineUsers[sender];
            if (senderSocketId) {
                const io = getIO();
                io.to(senderSocketId).emit("message-read", {
                    readerId: reader,
                    senderId: sender
                });
            }
        }

        return res.status(200).json({
            message: "Messages marked as read",
            updated: result.modifiedCount
        });
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            message: error.message
        });

    }
};

module.exports={sendMessage,getMessage,markMessageAsRead}