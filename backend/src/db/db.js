const mongoose=require('mongoose')

const connectDB=async ()=>{
    try {
        await mongoose.connect(process.env.MONGOOSE_URI);
        console.log("connected to database");
    } catch (error) {
        console.log("error is : ",error);
    }
}

module.exports=connectDB