const jwt=require("jsonwebtoken");

const authmiddleware=(req,res,next)=>{

    try {
        const authHeader=req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                message: "Token not provided"
            });
        }
        const token=authHeader.split(" ")[1];
        const isValidToken=jwt.verify(token,process.env.SECRET_KEY)
        if(isValidToken){
            req.user = isValidToken;
            next();
        }
        else{
            return res.status(500).json({
                message:"Invalid credential"
            })
        }
    } catch (error) {
        console.log("error in middleware auth is :",error);
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }

}

module.exports=authmiddleware