

//ready
$(document).ready( function(){


    $("#buscaFichamento").bind('input propertychange', function(){
        buscaFichamentos("como");
    });

    $("#bt-menu-princ").click(function(){
        $("#menu-princ").show( "fast", function(){
            $("#bt-menu-princ2").show();
        });
    });

    $("#bt-back-page").click(function(){
        window.location.replace("../");
    });

    carregamentoInicial();

});


function carregamentoInicial(){
    //pega url
    url = window.location.href;
    //tira o parametro via get
    arr =  url.split("?");
    //pega segunda pate
    if(arr.length > 1){
        $("#buscaFichamento").val(arr[1].replace("%20"," "));
        buscaFichamentos("igual");
    }

}

function buscaFichamentos(param){

    //0 palavrachave, 1 autor, 2 titulo
    opc = $('input[name=optradio]:checked', '#form-opcao').val();

    var jquery2 = $.post( "../backend/buscaDadosFichamentoByName_Autor_Titulo.php",{dado: $("#buscaFichamento").val() ,opc: "0", modo:param.trim()}, function() { })
        .done(function(data){
            $("#conteiner-lista-notas").html("Nada foi encontrado! Verifiique a ortografia");
            data_json = jQuery.parseJSON(data);
            conteudo = "";

            for(var i=0; i<data_json.length; i++){
                conteudo += "<div style='margin-bottom: 20px'>"+
                    "<div><b>Artigo:</b>"+data_json[i]["nome"]+"</div>" +
                    "<div><b>Palavra-Chave:</b>"+data_json[i]["palavra"]+" <a href='../editmode/index.html?"+data_json[i]['fic_id']+"'> Veja o Fichamento </a></div>" +
                    "Cite: Word | Latex" +
                    "<table  style='border-collapse: collapse; table-layout:fixed; width:100%;'>"+
                    "<tr><th class='conteiner-dados-nota cabecario-dados-nota' >Citação</th>"+
                    "<th class='conteiner-dados-nota cabecario-dados-nota'>Reflexão</th></tr>"+
                    "<tr><td valign='top' class='conteiner-dados-nota'>"+data_json[i]["cit"]+"</td>"+
                    "<td valign='top'  class='conteiner-dados-nota'>"+data_json[i]["ref"]+"</td></tr>"+
                    "</table>" +
                    "</div>";
            }

            $("#conteiner-lista-notas").html(conteudo);

        })
        .fail(function() {
            alert( "error" );
        })
}