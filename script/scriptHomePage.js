$(document).ready( function(){
    //a();
    buscarExibirFichamentos();
    buscarExibirFichamentosFavoritos();

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

    $("#show-fic-rec").click(function(){
        $("#icon-fic-rec").show();
        $("#hide-fic-rec").show();
        $(this).hide();
    });

    $("#hide-fic-rec").click(function(){
        $("#icon-fic-rec").hide();
        $("#show-fic-rec").show();
        $(this).hide();
    });

    $("#show-fic-fav").click(function(){
        $("#icon-fic-fav").show();
        $("#hide-fic-fav").show();
        $(this).hide();
    });

    $("#hide-fic-fav").click(function(){
        $("#icon-fic-fav").hide();
        $("#show-fic-fav").show();
        $(this).hide();
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

    $("#buscaFichamento").bind('input propertychange', function(){
        buscaFichamentosPorNome($(this).val());
    });

});

function buscaFichamentosPorNome(param){

    if(param == ""){
      buscarExibirFichamentos();
      return;
    }

    var jqxhr = $.post( "backend/buscaFichamentoByName.php", {name: param}, function() {
    })
        .done(function(data){
            $("#icon-fic-enc").html("");
            $("#titulo-fic-favoritos").hide();
            $("#titulo-fic-recentes").hide();
            $("#titulo-fic-encontrados").show();

            data_json = jQuery.parseJSON(data);
            for(var i = 0; i< data_json.length; i++){

                strhtml = "<div id-fic="+data_json[i]["idfichamento"]+" class='bt-icon-doc'>"+
                    "<div class='icon-doc'><img class='icon' style='margin-left: 28px' src='img/icon.png'></div> <div class='text-doc'>"+
                    data_json[i]['titulo']+"</div>";
                $("#icon-fic-enc").append(strhtml);
            }

            $(".bt-icon-doc").click(function(e){
                if($(e.target).context.className != "star")
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
    //a = $("#autores-artigo").val();

    var jqxhr = $.post( "backend/inserirDados.php",{ titulo :t}, function() {

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
      /*
         sdata  = data.split(",");
         data_json["nomeusuario"] = sdata[0];
         data_json["senha"]= sdata[1];
         data_json["localsalvamento"] = sdata[2];
         data_json["login"] = sdata[3];
         data_json["alertabackup"] = sdata[4];
       */
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
    $("#icon-fic-rec").html("");
    var jqxhr = $.post( "backend/buscaTodosFichamentos.php", function() {
    })
        .done(function(data){

            $("#titulo-fic-favoritos").show();
            $("#titulo-fic-recentes").show();
            $("#titulo-fic-encontrados").hide();

            data_json = jQuery.parseJSON(data);
            for(var i = 0; i< data_json.length; i++){

                strhtml = "<div data='1' id-fic="+data_json[i]["idfichamento"]+" class='bt-icon-doc'>"+
                    "<div class='icon-doc'><img class='star' src='img/star0.png' ><img class='icon' src='img/icon.png'></div> <div class='text-doc'>"+
                    data_json[i]['titulo']+"</div>";
                $("#icon-fic-rec").append(strhtml);
            }

            $(".bt-icon-doc").click(function(e){
                if($(e.target).context.className != "star")
                  abrirPagina($(this).attr("id-fic"));
                else{
                  addFichamentoFavorito($(this).attr("id-fic"), $(this).attr("data"));
                }
            });

        })
        .fail(function() {
            alert( "error" );
        })

    $("#bt-menu-princ").click(function(){
        $("#menu-princ").show("fast");
    })
}


function buscarExibirFichamentosFavoritos(){
    $("#icon-fic-fav").html("");
    var jqxhr = $.post( "backend/buscaTodosFichamentosFavoritos.php", function() {
    })
        .done(function(data){
            $("#titulo-fic-favoritos").show();
            $("#titulo-fic-recentes").show();
            $("#titulo-fic-encontrados").hide();
            data_json = jQuery.parseJSON(data);
            for(var i = 0; i< data_json.length; i++){

                strhtml = "<div data='0' id-fic="+data_json[i]["idfichamento"]+" class='bt-icon-doc'>"+
                    "<div class='icon-doc'><img class='star' src='img/star1.png' ><img class='icon' src='img/icon.png'></div> <div class='text-doc'>"+
                    data_json[i]['titulo']+"</div>";
                $("#icon-fic-fav").append(strhtml);
            }

            $(".bt-icon-doc").click(function(e){
                if($(e.target).context.className != "star")
                    abrirPagina($(this).attr("id-fic"));
                else{
                    addFichamentoFavorito($(this).attr("id-fic"),$(this).attr("data"));
                }
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


function addFichamentoFavorito(id, param){
    var jqxhr = $.post( "backend/atualizaArtigoFavorito.php",{id: id, favorito:param}, function() {
    })
        .done(function(data){
            console.log(data);
            buscarExibirFichamentosFavoritos();
            buscarExibirFichamentos();
        })
        .fail(function() {
            alert( "error" );
        })

}