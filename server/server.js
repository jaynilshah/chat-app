const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'../public');


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('new user connected');
    socket.emit('newEmail',{
        from: 'abc@example.com',
        text: 'Hey what is going on'

    });

    socket.emit('newMessage',{
        from: 'abc',
        text: 'hi',
        createdAt: 123
    });

    socket.on('createMessage',(message)=>{
        console.log(message);
    });

    socket.on('disconnect',(socket)=>{
        console.log('User disconnected');
    });
});

server.listen(port,()=>{
    console.log(`App running on port ${port}`);
})