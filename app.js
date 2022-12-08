require("dotenv").config();
const express = require("express");
const app = express();
// const mongoose = require("mongoose")
const path = require("path");
const cors = require("cors");
const Router = require("./routes/route");
const connectDB = require("./config/connectDB");

//Server
connectDB();
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cors
app.use("/api", Router);

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------
const server = app.listen(process.env.PORT, () => {
  console.log("Go chat, don't waste time here");
});
//SOCKET IO TEST
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userData, socketId) => {
  !users.some((user) => user.sub === userData.sub) &&
    users.push({ ...userData, socketId });
};

const removeUser = (socketId) => {
  users = users?.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.sub === userId);
};

io.on("connection", (socket) => {
  console.log("user connected");

  //connect
  socket.on("addUser", (userData) => {
    addUser(userData, socket.id);
    io.emit("getUsers", users);
  });

  //send message
  socket.on("sendMessage", (data) => {
    const user = getUser(data.receiverId);
    io.to(user?.socketId).emit("getMessage", data);
  });

  //disconnect
  socket.on("disconnect", () => {
    console.log("user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
