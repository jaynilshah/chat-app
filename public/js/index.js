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

socket.on('newLocationMessage',function (message){

    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank" >Location</a>')
    li.text(`${message.from}: `);
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messages').append(li);
});




jQuery('#message-form').on('submit',function(e){
    e.preventDefault();


    var messageTextbox=jQuery('[name=message]');
    socket.emit('createMessage',{
        from: 'User',
        text: messageTextbox.val()
    },function(){
       messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click',function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported');
    }

    locationButton.attr('disabled','disabled').text('sending location ...');
    navigator.geolocation.getCurrentPosition(function (position){
        locationButton.removeAttr('disabled').text('Share Location');
        socket.emit('createLocationMessage',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    },function (){
        alert('Unable to fetch location');
        locationButton.attr('disabled','disabled').text('Share Location');
    })
})

// socket.emit('createMessage',{
//     from: 'frank',
//     text: 'Hi'
// },function(data){
//     console.log('got it ');
//     console.log(data);
// });