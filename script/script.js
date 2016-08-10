$(document).ready( function(){

    $("#bt-plus").click(function(){
            abrirNovoFichamento();
    });

    $("#bt-criar-novo").click(function(){
        criarNovoFichamento();
    });

    var jqxhr = $.post( "backend/buscaTodosFichamentos.php", function() {
    })
        .done(function(data){
            data_json = jQuery.parseJSON(data);
            for(var i = 0; i< data_json.length; i++){
                console.log(data_json[i]["idfichamento"]);
                strhtml = "<div id-fic="+data_json[i]["idfichamento"]+" class='bt-icon-doc col-md-2'>"+
                "<div class='icon-doc'><img src='img/icon.png'></div> <div class='text-doc'>"+
                data_json[i]['titulo']+"</div></div>";
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
        $("#menu-princ").show();
    })

    $("#bt-menu-princ2").click(function(){
        $("#menu-princ").hide();
    })



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




function abrirPagina(dados){
    window.location.replace("editmode/index.html?"+dados);
}

