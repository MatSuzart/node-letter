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
        
        socket.emit('user-ok', connectionUsers);

        socket.broadcast.emit('list-update',{
            joined: username,
            list: connectionUsers
        });
    });
    socket.on('disconnect', ()=>{
        connectionUsers = connectionUsers.filter(u=> u != socket.username);

        socket.broadcast.emit('list-update',{
            left: socket.username,
            list: connectionUsers
        });
    });
    socket.on('send-msg', (txt)=> {
        let obj = {
            username: socket.username,
            message: txt
        };

      //  socket.emit('show-msg', obj);
        socket.broadcast.emit('show-msg', txt);
    });
});
