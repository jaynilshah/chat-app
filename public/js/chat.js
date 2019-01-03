var socket = io();

function scrollToBottom (){
    //selectors
    var message = jQuery('#messages');
    var newMessage = message.children('li:last-child');

    //heights
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    var clientHeight = message.prop('clientHeight');
    var scrollTop = message.prop('scrollTop');
    var scrollHeight = message.prop('scrollHeight');

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    
      message.scrollTop(scrollHeight);
    }

}
    socket.on('connect',function () {

        var params = jQuery.deparam(window.location.search);

        socket.emit('join',params,function(err){
            if(err){
                alert(err);
                window.location.href = '/'
            }
            else{
                console.log('No err');
            }

        })

        

    });
    socket.on('disconnect',function (){
        console.log('Disconnected from server');
    })
    

    socket.on('updateUserList',function (users){
        var ol = jQuery('<ol></ol>');
        users.forEach(function (user){
            ol.append(jQuery('<li></li>').text(user));
        });
        jQuery('#users').html(ol);
    });


socket.on('newMessage',function (message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template,{
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
    
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);
    // jQuery('#messages').append(li);
});

socket.on('newLocationMessage',function (message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template,{
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
   
   
   
   
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank" >Location</a>')
    // li.text(`${message.from}: ${formattedTime} `);
    // a.attr('href',message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
});




jQuery('#message-form').on('submit',function(e){
    e.preventDefault();


    var messageTextbox=jQuery('[name=message]');
    socket.emit('createMessage',{
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