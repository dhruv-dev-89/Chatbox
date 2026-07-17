const http = require("http");
require("dotenv").config();
const app=require("./src/app")
const connectDB=require("./src/db/db")
const {initializeSocket}=require("./src/socket/socket")

const server=http.createServer(app);

connectDB();

initializeSocket(server);


server.listen(process.env.PORT,()=>{
    console.log("server started");
})

