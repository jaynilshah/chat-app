const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,'../public');


var app = express();
var server = http.createServer(app);
var {generateMessage,generateLocationMessage} = require('./utils/message');
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('new user connected');
    socket.emit('newMessage',generateMessage('Admin','Welcome to the chatApp'));

    

    socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined'));

    socket.on('createMessage',(message,callback)=>{
        console.log(message);
        io.emit('newMessage',generateMessage(message.from,message.text));
        callback();
        
    });

    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
    })

    socket.on('disconnect',(socket)=>{
        console.log('User disconnected');
    });
});

server.listen(port,()=>{
    console.log(`App running on port ${port}`);
})


// socket.broadcast.emit('newMessage',{
        //          from: message.from,
        //         text: message.text,
        //         createdAt : new Date().getTime()
        // })