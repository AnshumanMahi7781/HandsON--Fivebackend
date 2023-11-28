const express = require("express");
const socket = require("socket.io");
const app = express();

const appServer = app.listen(5000, () => {
    console.log("Server is Running")
});

const IO = socket(appServer, {
    cors: {
        origin: '*'
    }
});
const connectedUsers = [];

IO.on("connection", (users) => {
    users.on("JOIN__ROOM", ({ roomName, userName }) => {
        let tempObj = {
            roomName: roomName,
            userName: userName,
            userID: users.id
        }

        connectedUsers.push(tempObj)
        users.join(roomName)
        console.log("USER CONNECTED")

        IO.to(roomName).emit("JOINING__ALERT", `${userName} Joined The Chat`)


        users.on('MSG', (data) => {
            // IO.to(roomName).emit("receivingMessage", `${temp}`);
            console.log(data)
            console.log("HELLO")
        })
    })
    // This event fires whenever any user disconnected
   
})
