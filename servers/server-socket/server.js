require("dotenv").config();
var cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const ObjectId = require("mongodb").BSON;
const express = require("express");
const { Socket } = require("dgram");
const app = express();

app.use(express.json());
app.use(cors());
const server = http.createServer(app);
//https://maxim-moveo-home-assignment.netlify.app client web url
//http://localhost:3000 client local url
const io = new Server(server, {
  cors: {
    origin: "https://maxim-moveo-home-assignment.netlify.app",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("updateText", (newText) => {
    console.log(`Text updated: ${newText}`);
    io.emit("updateText", newText);
  });
});

//process.env.PORT ||
server.listen(3001, () => {
  console.log("Server (socket.io) is listening on http://localhost:3001");
});
