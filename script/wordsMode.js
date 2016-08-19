/**
 * Created by Luis 4raujo on 14/08/16.
 */


//ready
$(document).ready( function(){

    buscarDadosPlavras();

    $("#bt-menu-princ").click(function(){
        $("#menu-princ").show( "fast", function(){
            $("#bt-menu-princ2").show();
        });
    })

    $("#bt-menu-princ2").click(function(){
        $("#menu-princ").hide("fast");
    })

    $("#bt-back-page").click(function(){
        window.location.replace("../");
    });

    $(window).click(function(evt) {

        if ((evt.target.id != "bt-menu-princ") && (evt.target.id != "bt-icon-menu-princ") &&
            (evt.target.id !="titulo-menu") && (evt.target.id !="icone-menu"))
            $("#menu-princ").hide("fast");
    });





});


function  buscarDadosPlavras(){

    var jquery = $.post( "../backend/buscaQtdPalavras.php", function() { })
        .done(function(data){
            data_json = jQuery.parseJSON(data);
            str="";
            for(var i=0; i<data_json.length; i++){
                str += "<div class='conteiner-palavra'><span class='titulo-palavra'>"+data_json[i]['nome']+"</span>" +
                    "<span class='qtd-palavra'>"+data_json[i]['qtd']+"</span> </div>";
            }
            $("#conteiner-lista-palavras").html(str);
        })
        .fail(function() {
            alert( "error" );
        })

}

