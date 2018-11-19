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
		if(data == "1")
			window.location.replace("home.html");
		else
			alert("Erro no Login: Verique usuário e senha!");
    })
    .fail(function() {
        alert( "error" );
    });
};


function verificaSessao(){

	var dir = "";
	var loc = (""+window.location).split("/");
	loc = (loc[loc.length-1].split("."))[0];
	if((loc != "home") && (loc != "pagina_inicial")  && (loc != "index"))
		dir = "../";
	
		
	
    var jqxhr = $.post( dir+"backend/verificaSessao.php", function() {

    })
    .done(function(data){
		if(data == "0"){
			console.log(loc);
			window.location.replace(dir+"login.html");
		}
		
    })
    .fail(function() {
        alert( "error" );
    });
};

