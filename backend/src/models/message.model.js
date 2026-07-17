const mongoose=require("mongoose")

const messageSchema=new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    text: {
        type:String,
        required:true
    },
    status: {
    type: String,
    enum: ["sent", "read"],
    default: "sent"
    }
    },{
        timestamps:true
    })

const messageModel=mongoose.model("messages",messageSchema)

module.exports=messageModel