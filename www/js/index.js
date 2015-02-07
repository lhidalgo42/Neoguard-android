var url = "http://neoguard.cl";

$(document).ready(function(){
    if(window.localStorage.getItem('data') != null) {
        var data = window.localStorage.getItem('data');
        data = JSON.parse(data);
        $("#image").attr('src', url + '/images/profile/' + data.img + '.jpg');
        $("#email").val(data.email);

    }
    $("#login").click(function(){
        $.ajax({
            url: url+"/api/login",
            data: {
                email: $("#email").val(),
                password : $("#pass").val(),
                remember : 0
            },
            type:'POST',
            dataType:'json',
            error:function(jqXHR, textStatus, errorThrown) {
                alert('error ' + textStatus + " " + errorThrown);
            },
            timeout:10000,
            success: function( data ) {
                var datos = {
                    "token": data.user.remember_token,
                    "id"   : data.user.id,
                    "email": data.user.email,
                    "img"  : data.user.img_path
                };
                window.localStorage.setItem('data', JSON.stringify(datos));
                window.location.href = 'dashboard.html' ;
            }
        });
    });
});
