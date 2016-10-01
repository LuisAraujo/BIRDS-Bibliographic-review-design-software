

//ready
$(document).ready( function(){
    carregamentoInicial();


    $("#buscaFichamento").bind('input propertychange', function(){

      //  if($("#login-preferencia:checked").val() == "")
      //  else if($("#login-preferencia:checked").val() == "")
      //  else if($("#login-preferencia:checked").val() == "")
       buscaFichamentos("como");
    });

    $("#bt-menu-princ").click(function(){
        $("#menu-princ").show( "fast", function(){
            $("#bt-menu-princ2").show();
        });
    });

    $("#bt-back-page").click(function(){
        window.location.replace("../home.html");
    });



    $(".inp-opcao-busca").on('change', function() {
           $('input[name=optradio]:checked', '#form-opcao').val();
    });

});


function carregamentoInicial(){
    //pega url
    url = window.location.href;
    //tira o parametro via get
    arr =  url.split("?");
    //pega segunda pate
    if(arr.length > 1){
        arr2 = arr[1].toString().replace(new RegExp('%20', 'g'), " ");
        arr2 = decodeURI(arr2);

        $("#buscaFichamento").val(arr2);
        buscaFichamentos("igual");
    }

}

function buscaFichamentos(param){

    //0 palavrachave, 1 autor, 2 titulo
    opc = $('input[name=optradio]:checked', '#form-opcao').val();
    dado = $("#buscaFichamento").val().trim();


    var jquery2 = $.post( "../backend/buscaDadosNotasByName.php",{dado: dado ,opc: opc, modo: param.trim()}, function() { })
        .done(function(data){
            $("#conteiner-lista-notas").html("Nada foi encontrado! Verifiique a ortografia");

            conteudo = "";

                try {
                    data_json = jQuery.parseJSON(data);

                    for(var i=0; i<data_json.length; i++){
                        console.log(data_json[i]["palavra"]);

                        conteudo += "<div style='margin-bottom: 20px'> <div><b>Artigo:</b>"+data_json[i]["nome"]+"</div>";
                            if(opc == 0)
                                conteudo +="<div><b>Busca Palavra-Chave:</b>"+colorirPalavra(dado, data_json[i]["palavra"])+"";
                            else if(opc == 1)
                                conteudo += "<div><b>Busca Autor:</b>"+colorirPalavra(dado, data_json[i]["palavra"])+"";
                            else if(opc == 2)
                                conteudo += "<div><b>Busca Titulo:</b>"+colorirPalavra(dado, data_json[i]["palavra"])+"";

                            conteudo +=" <a href='../editmode/index.html?"+data_json[i]['fic_id']+"'> Veja o Fichamento </a></div>" +
                            "<table  style='border-collapse: collapse; table-layout:fixed; width:100%;'>"+
                            "<tr><th class='conteiner-dados-nota cabecario-dados-nota' >Citação</th>"+
                            "<th class='conteiner-dados-nota cabecario-dados-nota'>Reflexão</th></tr>"+
                            "<tr><td valign='top' class='conteiner-dados-nota'>"+data_json[i]["cit"]+"</td>"+
                            "<td valign='top'  class='conteiner-dados-nota'>"+data_json[i]["ref"]+"</td></tr>"+
                            "</table>" +
                            "</div>";
                    }


                }catch (e) {
                     console.log("erro");
                }

            $("#conteiner-lista-notas").html(conteudo);

        })
        .fail(function() {
            alert( "error" );
        })
}


//funcao para colorir parte da palavra que foi encontrada igual à palavra passada para busca
function colorirPalavra(param, dado){

    c = "";
    inicio = -1;
    count = -1;
    fim = -1;

    for(i = 0; i<param.length; i++){

        achou = false
        for(j = 0; j< dado.length; j++){
            if(param[i].toLocaleLowerCase() == dado[j].toLocaleLowerCase()){
                achou = true;
                break;
            }
        }

        if(achou == true){
            if(inicio == -1)
                inicio = j;

            count++;
        }
      }

    fim = inicio+count;

    for(i = 0; i< dado.length; i++){
        if ((i>=inicio) && (i<=fim)) {
            c+="<span style='color: #f00'>"+dado[i]+"</span>";
        }else{
            c+="<span style='color: #000'>"+dado[i]+"</span>";
        }
    }

    console.log(inicio+ "  "+fim+"  "+param);
    return c;

}