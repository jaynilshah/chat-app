var socket = io();
    socket.on('connect',function () {
        console.log('connected to server');

        socket.emit('createMessage',{
            from: 'abc',
            text: 'hi',
            
        });

    });
    socket.on('disconnect',function (){
        console.log('Disconnected from server');
    })
    



socket.on('newMessage',function (message){
    console.log(message);
});