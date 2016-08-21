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
                str += "<div class='conteiner-palavra'>" +
                       "<span style='color: #0196D0' class='qtd-palavra'>"+data_json[i]['qtd']+"</span> " +
                       "<input id='inp-"+data_json[i]["id"]+"' class='titulo-palavra' disabled='true' value='"+data_json[i]['nome']+"'> |" +
                       "<span  style='margin-left: 50px;' class='bt bt-ver' word='"+data_json[i]['nome']+"'>VER FICHAMENTOS </span> |" +
                       "<span mode='renomear' target='"+data_json[i]["id"]+"' style='margin-left: 10px;' class='bt bt-renomear' aria-hidden='true'>RENOMEAR</span>" +
                       "</div> ";
            }
            $("#conteiner-lista-palavras").html(str);

            $(".conteiner-palavra .bt-ver").click(function(evt) {
                window.location.replace("../find/index.html?"+$(this).attr("word"));
            });

            $(".conteiner-palavra .bt-renomear").click(function(evt) {
                target = "#inp-"+$(this).attr("target");
                if($(this).attr("mode")=="renomear"){
                    $(target).attr("disabled",false);
                    $(target).addClass("inp-ativo");
                    $(target).focus();
                    $(this).html("SALVAR");
                    $(this).attr("mode","salvar");
                }else{
                    $(target).attr("disabled",true);
                    $(target).removeClass("inp-ativo");
                    $(this).html("RENOMEAR");
                    $(this).attr("mode","renomear");
                    var jquery = $.post( "../backend/renomeaPalavras.php",{word: $(target).val().trim(), id: $(this).attr("target") },function() { })
                        .done(function(){

                            buscarDadosPlavras();

                         })
                         .fail(function() {
                            alert( "error" );
                         });


                }
            });
        })
        .fail(function() {
            alert( "error" );
        })

}

