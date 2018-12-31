var socket = io();
    socket.on('connect',function () {
        console.log('connected to server');

        

    });
    socket.on('disconnect',function (){
        console.log('Disconnected from server');
    })
    



socket.on('newMessage',function (message){
    console.log(message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});




jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    socket.emit('createMessage',{
        from: 'User',
        text: jQuery('[name=message]').val()
    },function(){

    });
});



// socket.emit('createMessage',{
//     from: 'frank',
//     text: 'Hi'
// },function(data){
//     console.log('got it ');
//     console.log(data);
// });