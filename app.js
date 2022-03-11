import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import { readdirSync } from 'fs';
require('dotenv').config();

const app = express();

// socket
const http = require("http");
const server = http.createServer(app);
const socketIo = require("socket.io")(server, {
    cors: {
        origin: "*",
    }
  }); 

var arrUser = [];

socketIo.on("connection", (socket) => { 

  // socket.emit("getId", { id: socket.id });// gui cho chinh nguoi gui len
  socket.on("sendDataClient", function(data) { 
    socketIo.sockets.emit("sendDataServer", { data, userName:  socket.userName});// gui di tat ca
    // socket.broadcast.emit("sendDataServer", { data });// gui cho tat ca ngoai thang gui
  })

  socket.on("send_user_name_client", (data) => {
    console.log(data);
    if (arrUser.indexOf(data) >=0) {
      socket.emit("server_send_register_error");
    } else {
      arrUser.push(data)
      socket.userName = data;
      socket.emit("server_send_register_succsess", data);
      socketIo.sockets.emit("get_all_user", arrUser);// gui di tat ca
    }
  })

  socket.on("entering", () => {
    socket.broadcast.emit("anyOne_entering",socket.userName);
  });

  socket.on("blur_text", () => {
    socketIo.sockets.emit("anyOne_blur",socket.userName);
  });

  socket.on("logout", () => {
    arrUser = arrUser.filter(item => item != socket.userName);
    socketIo.sockets.emit("get_all_user",arrUser);
  })
  socket.on("disconnect", () => {
    console.log(socket.id + " => Client disconnected"); // Khi client disconnect thì log ra terminal.
  });
});


// Router

mongoose.connect(process.env.DATABASE)
    .then(() => console.log('DB Connected'))
    .catch(error => console.log('DB not connected ', error))

// middleware
app.use(morgan("tiny"));
app.use(express.json())
app.use(cors())


// Route
readdirSync('./src/routes').map(route => app.use("/api", require(`./src/routes/${route}`)));

const port = process.env.PORT || 8000;

server.listen(port, () => console.log('server is listening port: ', port));