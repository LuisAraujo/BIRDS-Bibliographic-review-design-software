$(document).ready( function(){
    $("#bt-ger-palavras").click(function(){
        abrirPaginaPalavra();
    });

    $("#bt-busca-fichamento").click(function(){
        abrirPaginaBusca();
    })
    $("#bt-plus").click(function(){
        abrirNovoFichamento();
    });

    $("#bt-criar-novo").click(function(){
        criarNovoFichamento();
    });

    $("#bt-confing").click(function(){
        exibePreferencia();
    });

    $("#bt-sobre-birds").click(function(){
        $("#modal-sobre").modal();
    });

    var jqxhr = $.post( "backend/buscaTodosFichamentos.php", function() {
    })
        .done(function(data){
            data_json = jQuery.parseJSON(data);
            for(var i = 0; i< data_json.length; i++){

                strhtml = "<div id-fic="+data_json[i]["idfichamento"]+" class='bt-icon-doc col-md-2'>"+
                "<div class='icon-doc'><img src='img/icon.png'></div> <div class='text-doc'>"+
                data_json[i]['titulo']+"</div>";
                $("#icon-fic").append(strhtml);
            }

            $(".bt-icon-doc").click(function(){
                abrirPagina($(this).attr("id-fic"));
            });

        })
        .fail(function() {
            alert( "error" );
        })

    $("#bt-menu-princ").click(function(){
        $("#menu-princ").show("fast");
    })

    $(window).click(function(evt) {

        if ((evt.target.id != "bt-menu-princ") && (evt.target.id != "bt-icon-menu-princ") &&
            (evt.target.id !="titulo-menu") && (evt.target.id !="icone-menu"))
            $("#menu-princ").hide("fast");
    });





});

function abrirNovoFichamento(){
    $('#modal-novo').modal();
}


function criarNovoFichamento(){
    if(verificaDadosNovoFichamento())
        criaFichamento();

}

function verificaDadosNovoFichamento(){

    if ( ($("#titulo-artigo").val() != "") && ($("#titulo-autores").val() != "")) {
        return true;
    }
    return false;
}


function criaFichamento(){

    //inserir no banco
    t = $("#titulo-artigo").val();
    a = $("#autores-artigo").val();

    var jqxhr = $.post( "backend/inserirDados.php",{ titulo :t , autores: a}, function() {

    })
        .done(function(data){
            abrirPagina(data);
        })
        .fail(function() {
            alert( "error" );
        })
}

function exibePreferencia(){

    $('#modal-preferencia').modal();


}


function abrirPagina(dados){
    window.location.replace("editmode/index.html?"+dados);
}


function abrirPaginaPalavra(){
    window.location.replace("words/index.html");
}

function abrirPaginaBusca(){
    window.location.replace("find/index.html");
}