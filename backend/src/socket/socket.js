const {Server}=require("socket.io")
const jwt=require("jsonwebtoken")
const socketAuthentication=require("../middleware/socket.middleware")


let io;
const onlineUsers={};


const initializeSocket=(server)=>{
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.use(socketAuthentication);

    io.on("connection",(socket)=>{
        onlineUsers[socket.user.id]=socket.id;

        io.emit("online-users",Object.keys(onlineUsers));

        socket.on("typing",({receiverId})=>{
            const receiverSocketId = onlineUsers[receiverId];

            console.log("Typing event ");
            console.log("Sender:", socket.user.id);
            console.log("Receiver:", receiverId);

            io.to(receiverSocketId).emit("user-typing",{
                userId:socket.user.id
            })
        })

        socket.on("stop-typing",({receiverId})=>{
            const  receiverSocketId=onlineUsers[receiverId];

            io.to(receiverSocketId).emit("user-stop-typing",{
                userId:socket.user.id
            });
        });

        console.log("A user is connected");
        console.log("socket id is : ",socket.id);

        socket.on("disconnect",()=>{
            console.log("Disconnected:", socket.user.id);
            delete onlineUsers[socket.user.id];
            console.log("Online Users:", onlineUsers);
            console.log("Emitting online users:", Object.keys(onlineUsers));
            io.emit("online-users", Object.keys(onlineUsers));
        })
    })
}

const getIO = () => {
    return io;
}

module.exports={initializeSocket,getIO,onlineUsers};

