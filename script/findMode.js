

//ready
$(document).ready( function(){

    $("#buscaFichamento").bind('input propertychange', function(){
        //0 palavrachave, 1 autor, 2 titulo
        opc = $('input[name=optradio]:checked', '#form-opcao').val();

        var jquery2 = $.post( "../backend/buscaDadosFichamentoByName_Autor_Titulo.php",{dado: $("#buscaFichamento").val() ,opc: "0"}, function() { })
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



    });

});



//"<div class='conteiner-dados-nota'>"+data_json[i]["cit"]+"</div>" +
//"<div class='conteiner-dados-nota'>"+data_json[i]["ref"]+"</div></div>"+