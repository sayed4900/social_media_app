const mongoose = require("mongoose");
const dotenv = require("dotenv");

// const { createServer } = require("http");
// const { Server } = require("socket.io");

// const httpServer = createServer();
// const io = new Server(httpServer, { /* options */ });


// process.on("uncaughtException", (err) => {
//     console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
//     console.log(err.name, err.message);
//     process.exit(1);
// });
dotenv.config({ path: "./config.env" });
const app = require("./app");

const server = require('http').createServer(app);
const socketIO = require('socket.io');
const io = socketIO(server);

io.on("connection",(socket)=>{
    const socketId = socket.id;
    console.log("Socket ID:", socketId);
    socket.on("msg",()=>{
        console.log("recived from client")
        socket.emit("serverMsg",()=>{
            console.log("From server to Client");
        })
    })
})

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => console.log("DB connection successfully!"));

const port = process.env.PORT || 3000;

// to enable use io on any file
const socket = require('./socket');
socket.setIOInstance(io);

server.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

// process.on("unhandledRejection", (err) => {
//     console.log("UNHANDLED REJECTION! 💥 Shutting down...");

//     console.log(err.name, err.message);
//     server.close(() => {
//         process.exit(1);
//     });
// });
