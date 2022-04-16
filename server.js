const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
server.listen(3000);

app.use(express.static(path.join(__dirname, 'public'))); // vai ler a pasta public

let connectionUsers = [];


io.on('connection', (socket)=>{
    console.log("loading");

    socket.on('join-request', (username)=>{
        socket.username = username;
        connectionUsers.push(username);

        console.log("connect");
        
    });
});
