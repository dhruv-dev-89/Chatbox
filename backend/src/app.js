const express=require("express")
const authRoutes=require("./routes/auth.routes")
const userRoutes=require("../src/routes/user.routes")
const messageRoutes=require("../src/routes/messages.routes")
const app=express()


app.use(express.json())

const cors = require("cors");

app.use(cors({
    origin: ["http://localhost:5173",
        "https://chatbox-eight-sigma.vercel.app"
    ],
    credentials: true
}));

app.use("/api/auth",authRoutes);

app.use("/api/user",userRoutes);

app.use("/api/message",messageRoutes);


module.exports=app