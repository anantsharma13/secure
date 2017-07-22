

$("#sender_text").on("keyup", function(e){
    if (e.which == 13){
        var text = $(this).val();
        if (text !== ""){
            send_msg($("#sender_text").val(),'reciever');            
            $(this).val('');
        }
    }
});

function send_msg(msg,user){

    var host = window.location.host;
    var text_msg=msg;
    $.ajax({
    type:'POST',
    data:{msg:text_msg, user:user},
    url:'http://'+host+'/securemessaging/auth.php',
    success: function(res){
       var resp= JSON.parse(res);
       if(resp.status=='null'){
           $("#msg_area").text("What's the Point of Sending an Empty Message!");
           $('#myModal').modal('show');

       }
       else if(resp.status=='Block'){
           $("#msg_area").text('You are Blocked Mr.'+ resp.IP);
           $('#myModal').modal('show');
       }
       else if(resp.status=='Success'){
           // $("#msg_area").text("Your Message has been Sent Successfully");
           // $('#myModal').modal('show');
           if(resp.user=='sender'){

               insertChat("me",resp.message);
           }
           else if (resp.user=='reciever'){

               insertChat("you",resp.message);
           }
       }
       else{
           $("#msg_area").text("Oh Boy, Something is went Wrong!");
           $('#myModal').modal('show');

       }

    },
    error: function(){
        $("#msg_area").text("Failed to Send Your Message");
        $('#myModal').modal('show');

    }

    });
}

// Chat Code //


var me = {};
me.avatar = "alex.jpg";

var you = {};
you.avatar = "marty.jpg";

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}            

//-- No use time. It is a javaScript effect.
function insertChat(who, text, time = 0){
    var control = "";
    var date = formatAMPM(new Date());
    
    if (who == "me"){
        
        control = '<li style="width:100%">' +
                        '<div class="msj macro">' +
                        '<div class="avatar"><img class="img-circle" style="width:100%;" src="'+ me.avatar +'" /></div>' +
                            '<div class="text text-l">' +
                                '<p>'+ text +'</p>' +
                                '<p><small>'+date+'</small></p>' +
                            '</div>' +
                        '</div>' +
                    '</li>';                    
    }else{
         control = '<li style="width:100%;">' +
                        '<div class="msj-rta macro">' +
                            '<div class="text text-r">' +
                                '<p>'+text+'</p>' +
                                '<p><small>'+date+'</small></p>' +
                            '</div>' +
                        '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="'+you.avatar+'" /></div>' +                                
                   '</li>';
    }
    setTimeout(
        function(){                        
            $("ul").append(control);

        }, time);
    
}

function resetChat(){
    $("ul").empty();
}

$(".mytext").on("keyup", function(e){
    if (e.which == 13){
        var text = $(this).val();
        if (text !== ""){
            send_msg(text,'sender');             
            $(this).val('');
        }
    }
});

//-- Clear Chat
resetChat();
