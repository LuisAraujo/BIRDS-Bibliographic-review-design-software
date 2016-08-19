//guardar o id do Fichamento atual
var idFic;

//ready
$(document).ready( function(){

    buscarDadosFichamento();

    $("#bt-salvar-fichamento").click(function(){
       exportAsPHPFichamento();
    });

    $("#bt-criar-linha").click(function(){
        insereNota("novo");
    });

    $("#bt-salvar-notas").click(function(){
        salvaNotasFichamento();
    });


    $("#bt-menu-princ2").click(function(){
        $("#menu-princ").hide("fast");
    })

    $("#bt-back-page").click(function(){
        window.location.replace("../");
    });

    $("#bt-menu-princ").click(function(){
        $("#menu-princ").show("fast");
    })

    $(window).click(function(evt) {

        if ((evt.target.id != "bt-menu-princ") && (evt.target.id != "bt-icon-menu-princ") &&
            (evt.target.id !="titulo-menu") && (evt.target.id !="icone-menu"))
            $("#menu-princ").hide("fast");
    });



});


function buscarDadosFichamento(){
    //pega url
    url = window.location.href;
    //tira o parametro via get
    arr =  url.split("?");
    //pega segunda pate
    idFic = arr[1];

     var jquery = $.post( "../backend/buscaDadosFichamentoById.php",{id : arr[1]}, function() { })
        .done(function(data){
            data_json = jQuery.parseJSON(data);
            $("#celula-titulo-fichamento").append(data_json["titulo"]);
            $("#celula-referencia-artigo").append(data_json["referencia"]);

             var jquery2 = $.post( "../backend/buscaNotas.php",{idfichamento: idFic}, function() { })
                 .done(function(data){
                     data_json = jQuery.parseJSON(data);
                     console.log(data_json);
                     for(var i=0; i<data_json.length; i++){
                         $("#conteiner-fichamentos").append(
                             "<div salvo='true' id="+data_json[i]["id"]+" class='conteiner-nota row-fic row'><div  class='celula-padrao-fichamento cel-txt col-md-4'>"+
                             "<div id='conteiner-inp-"+data_json[i]["id"]+"'  class='form-group'>" +
                             "<textarea id='inp-"+data_json[i]["id"]+"'  class='input-p-chave form-control' rows='1'></textarea></div> </div>"+
                             "<div  class='celula-padrao-fichamento cel-txt col-md-4'><div class='form-group'>" +
                             "<textarea id='cit-"+data_json[i]["id"]+"' class='input-citacao form-control' rows='6' ></textarea>"+
                             "</div> </div> <div  class='celula-padrao-fichamento cel-txt col-md-4'><div style='padding: 0px; margin:0px'  class='form-group'>"+
                             "<textarea id='ref-"+data_json[i]["id"]+"' class='input-reflexao form-control' rows='6' ></textarea></div></div>"
                         );

                         $("#inp-"+data_json[i]["id"]).val(data_json[i]["palavrachave"]);
                         $("#cit-"+data_json[i]["id"]).val(data_json[i]["citacao"]);
                         $("#ref-"+data_json[i]["id"]).val(data_json[i]["reflexao"]);

                         $("#inp-"+data_json[i]["id"]).bind('input propertychange', function(){
                             buscaPalavraChave($(this).val(), $(this).attr("id") );
                         });


                     }

                 })
                 .fail(function() {
                     alert( "error" );
                 })
         })
        .fail(function() {
            alert( "error" );
        })

}

function insereNota(param){

    var jqxhr = $.post( "../backend/inserirNota.php",{idfichamento: idFic, modo : param}, function() {
    })
        .done(function(data){
              $("#conteiner-fichamentos").append(
                    "<div salvo='true' id="+data+" class='conteiner-nota row-fic row'><div  class='celula-padrao-fichamento cel-txt col-md-4'>"+
                    "<div id='conteiner-inp-"+data+"' class='form-group'>" +
                    "<textarea id='inp-"+data+"'  class='input-p-chave form-control' rows='1'></textarea></div> </div>"+
                    "<div  class='celula-padrao-fichamento cel-txt col-md-4'><div class='form-group'>" +
                    "<textarea id='cit-"+data+"' class='input-citacao form-control' rows='6' ></textarea>"+
                    "</div> </div> <div  class='celula-padrao-fichamento cel-txt col-md-4'><div style='padding: 0px; margin:0px'  class='form-group'>"+
                    "<textarea id='ref-"+data+"' class='input-reflexao form-control' rows='6' ></textarea></div></div>"
              );

            $("#inp-"+data).bind('input propertychange', function(){
               buscaPalavraChave($(this).val(), $(this).attr("id"));
            });

        })
        .fail(function() {
            alert( "error" );
        })
};

function exportAsPHPFichamento(){
    conteudo = "<html><meta charset='utf-8'>  <title>BIDS - Bibliographic Review Design Software</title><body style='width: 100%'>";
    //titulo
    conteudo += "<div style='text-align: center; display: block; width: 100%'><h3>"+$("#celula-titulo-fichamento").html().toUpperCase()+"</h3></div>";
    //referencia
    conteudo += "<div style='text-align: center; display: block; width: 90%; margin-left: 5%; margin-bottom: 10px'>"+  $("#celula-referencia-artigo").html().toUpperCase() +"</div>";
    //cabecario
    conteudo += "<table  style='border-collapse: collapse; table-layout:fixed; width:100%;'><tr>" +
        "<th  style='border: solid 1px #000; max-width: 20%'>Palavra-Chave</th>" +
        "<th style='border: solid 1px #000; max-width: 40%'>Citação</th>" +
        "<th style='border: solid 1px #000; max-width: 40%'>Reflexão</th></tr>";

    //conteudo
    $( ".conteiner-nota" ).each(function() {

        id = $(this).attr("id");
        conteudo += "<tr><td  style='font-weight: bold; border: solid 1px #000; max-width: 20%; word-wrap:break-word'>"+$("#inp-"+id).val()+"</td>" +
        "<td  style='font-weight: normal;  border: solid 1px #000; max-width: 40%; word-wrap:break-word'>"+$("#cit-"+id).val()+"</td>" +
        "<td  style='font-weight: normal;  border: solid 1px #000; max-width: 40%; word-wrap:break-word'>"+$("#ref-"+id).val()+"</td></tr>";

    });

    conteudo +="</table>";
    conteudo +="</body></html>";

    $("#chtml").val(conteudo);

    nome = "Fichamento_";
    nome += $("#celula-titulo-fichamento").text().trim().replace(/[^\w\s]/gi,'');

    $("#cnome").val(nome.substr(0,40));
    $('#formImportPdf').submit();

}



function  buscaPalavraChave(val, id){

    var jqxhr = $.post( "../backend/buscaPalavraChave.php",{texto: val}, function() {

    })
        .done(function(data){
            $(".conteiner-palavrachave-consulta").remove()
            if(val != ""){
                data_json = jQuery.parseJSON(data);
                str = "<div class='conteiner-palavrachave-consulta'>";
                for(var i = 0; i<data_json.length; i++){
                    str += "<div class='item'> <span class='glyphicon glyphicon-search' aria-hidden='true'></span>"+
                            data_json[i] +"</div>";
                }
                str+="</div>";
                $("#conteiner-"+id).append(str);
                $(".item").click(function(){
                    $("#"+id).val($(this).text().trim());
                    $(".conteiner-palavrachave-consulta").remove()
                });
            }
        })
        .fail(function() {
            alert( "error" );
        })

}


function salvaNotasFichamento(){

    array = [];

    $(".conteiner-nota").each(function() {

        id=$(this).attr("id");
        a= [];
        a.push(id);
        a.push($("#"+id).find(".input-p-chave").val());
        a.push($("#"+id).find(".input-citacao").val());
        a.push($("#"+id).find(".input-reflexao").val());

        array.push(a);
    });



    var jqxhr = $.post( "../backend/inserirNota.php",{idfichamento: idFic, modo: "atualiza", dados: array}, function() {
    })
        .done(function(data){
            console.log(data);
        })
        .fail(function() {
            alert( "error" );
        });

}


function registarSalvarPDF(){

    var doc = new jsPDF();
    var specialElementHandlers = {
        '#editor': function (element, renderer) {
            return true;
        }
    };

    $('#bt-salvar-fichamento').click(function () {
        doc.fromHTML($('#conteiner-fichamentos').html(), 15, 15, {
            'width': 170,
            'elementHandlers': specialElementHandlers
        });
        doc.save('sample-file.pdf');
    });
}