const { default: mongoose } = require("mongoose");
const userModel=require("../models/userModel")
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");



const registerUser=async (req,res)=>{
    const {username,email,password}=req.body;
    

    let user;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const isUserAlreadyExists=await userModel.findOne({
            email
        })

        if(isUserAlreadyExists){
            return res.json({
                message:"email already connected to other use different email id"
            })
        }
        user=await userModel.create({
        username,
        email,
        password:hashedPassword,
        })
    } catch (error) {
        console.log("error in controller : ",error);
    }

    res.status(201).json({
        message:"user registered successfully",
        user
    })
}

const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const isUserAlreadyExists=await userModel.findOne({email});
        if(!isUserAlreadyExists){
            return res.status(404).json({
                message:"You are not registered , kindly register first"
        })}

        const isSamePassword=await bcrypt.compare(password,isUserAlreadyExists.password);

        if(isSamePassword){

            const token=jwt.sign({
                id:isUserAlreadyExists._id
            },process.env.SECRET_KEY,
            {
                expiresIn:"7d"
            })

            return res.json({
                message:"You are logged in succesfully",
                token,
                user:{
                    _id:isUserAlreadyExists._id,
                    username:isUserAlreadyExists.username,
                    email:isUserAlreadyExists.email
                }
            });
        }
        else{
            return res.status(401).json({
                message:"Your credentials are wrong"
            });
        }
    } catch (error) {
        console.log("error in login in controller : ",error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports={registerUser,loginUser}