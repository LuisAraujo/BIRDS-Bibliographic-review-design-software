$(document).ready( function(){

     $("#bt-login").click(function(){
         realizaLogin();
    });


});



function realizaLogin(){

    usuario = $("#input-usuario").val();
    senha = $("#input-senha").val();

    var jqxhr = $.post( "backend/realizaLogin.php", {usuario: usuario, senha: senha}, function() {

    })
    .done(function(data){
        window.location.replace("home.html");
    })
    .fail(function() {
        alert( "error" );
    });
};