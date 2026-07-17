const jwt=require("jsonwebtoken")

const socketAuthentication=(socket,next)=>{
    const token=socket.handshake.auth.token;
    if (!token) {
        return next(new Error("Token not provided"));
    }
    try {
        const decoded=jwt.verify(token,process.env.SECRET_KEY)

        if(decoded){
            socket.user=decoded;
            next();
        }
    } catch (error) {
        next(new Error("Invalid token"));
    }
}


module.exports=socketAuthentication;