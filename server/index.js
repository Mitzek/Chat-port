const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("./routes/chatRoutes")
const socket = require("socket.io")


const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes)
app.use("/api/chat", chatRoutes)

mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
}).then(()=> {
    console.log("DB Connection Successful")
}).catch((error)=>{console.log(error);})

const server = app.listen(process.env.PORT, () => {
    console.log("Server started on port " + process.env.PORT);
});

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});


 var onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user",(userId) => {
        onlineUsers.set(userId, socket.id);
        
    });
    socket.on("send-msg", (data)=> {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket) { 
            socket.to(sendUserSocket).emit("msg-receive", data.message)
       
        }
       
        
    });
});




