const authMiddleware=require("../middleware/auth.middleware")
const messageModel = require("../models/message.model")
const userModel = require("../models/userModel")

const getMyProfile=async (req,res)=>{

    const _id = req.user.id;

    const user = await userModel.findOne({_id}).select("-password")


    return res.status(200).json({
        user
    });
}

const searchUsers=async (req,res)=>{
    const users=await userModel.find({
        _id:{
            $ne:req.user.id
        }
    }).select("-password");

    return res.json({
        message:"all users are here",
        users
    })
}


const getAllUsers=async (req,res)=>{
    try {
        console.log("user is : ",req.user.id);
        const users=await userModel.find({
            _id: { $ne: req.user.id }
        })
        
        const usersWithLastMessage=await Promise.all(
            users.map(async (user)=>{
                
                const lastMessage=await messageModel.findOne({
                    $or:[
                        {
                            sender:req.user.id,
                            receiver:user._id
                        },
                        {
                            sender:user._id,
                            receiver:req.user.id
                        }
                    ]
                }).sort({createdAt:-1});


                return{
                    ...user.toObject(),
                    lastMessage:lastMessage?lastMessage.text:"",
                    lastMessageTime: lastMessage ? lastMessage.createdAt : null
                };
            })
        )
        if(users){
            return res.json({
                message:"all users are here",
                users:usersWithLastMessage
            });
        }

        return res.json({
            message:"no chats"
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}


module.exports={getMyProfile,searchUsers,getAllUsers}