$(document).ready( function(){

     $("#bt-install").click(function(){
         realizaIntalacao();
         $("#c-main").html("Aguarde, estamos criando sua base de dados...");


    });


});



function realizaIntalacao(){

    usuario = $("#input-usuario").val();
    senha = $("#input-senha").val();
    host = $("#input-host").val();

    var jqxhr = $.post( "../backend/realizaInstalacao.php", {host: host, usuario: usuario, senha: senha}, function() {

    })
    .done(function(data){
        window.location.replace("../home.html");
    })
    .fail(function() {
        alert( "error" );
    });
};