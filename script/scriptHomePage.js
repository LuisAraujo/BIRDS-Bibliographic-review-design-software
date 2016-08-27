$(document).ready( function(){

    buscarExibirFichamentos();

    $("#bt-fullscreen").click(function(){
        fullScreen();
    });

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

    //Salvar preferencias - Acionado pelo botao salvar no modal preferencia
    $("#bt-salvar-pref").click(function(){
        atualizarPreferencia();
    });

    $("#bt-dados-fichamentos").click(function(){
        realizaBackup();
    });

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

     var jqxhr = $.post( "backend/buscaDadosPreferencia.php", function() {

    })
    .done(function(data){
        data_json = jQuery.parseJSON(data);
        $("#usuario-preferencia").val(data_json["nomeusuario"]);
        $("#senha-preferencia").val(data_json["senha"]);

        if(data_json["login"]==1)
            $("#login-preferencia").attr("checked","");
         else

        $("#login-preferencia").removeAttr("checked");
        $("#salvar-preferencia").val(data_json["localsalvamento"]);
        $("#avisobackup-preferencia").val(data_json["alertabackup"]);

    })
    .fail(function() {
        alert( "error" );
    })
}


function atualizarPreferencia(){
    if($("#login-preferencia:checked").val() == "")
        login=1;
    else
        login=0;

    nome = $("#usuario-preferencia").val();
    local = $("#salvar-preferencia").val();

    //adicionando o / no final do caminho
    if(local[local.length-1]!="/")
      local+="/";

    senha =$("#senha-preferencia").val();
    alerta = $("#avisobackup-preferencia").val();

    var jqxhr = $.post( "backend/insereDadosPreferencia.php", {usuario: nome, local:local,
    senha:senha, login: login  , alerta: alerta},function() {
    })
        .done(function(data){
            $('#modal-preferencia').modal('toggle');
        })
        .fail(function() {
            alert( "error" );
        })
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


function fullScreen(){

    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}



function buscarExibirFichamentos(){
    var jqxhr = $.post( "backend/buscaTodosFichamentos.php", function() {
    })
        .done(function(data){
            data_json = jQuery.parseJSON(data);
            for(var i = 0; i< data_json.length; i++){

                strhtml = "<div id-fic="+data_json[i]["idfichamento"]+" class='bt-icon-doc'>"+
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
}

function realizaBackup(){
    var jqxhr = $.post( "backend/realizaBackup.php", function() {
    })
        .done(function(data){
            alert("ok");
        })
        .fail(function() {
            alert( "error" );
        })




}