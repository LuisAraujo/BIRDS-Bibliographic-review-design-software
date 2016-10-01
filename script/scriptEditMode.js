//guardar o id do Fichamento atual
var idFic;

//ready
$(document).ready( function(){

    buscarDadosFichamento();

    $("#bt-salvar-fichamento-pdf").click(function(){
       exportAsPHPFichamento();
    });
    $("#bt-salvar-fichamento-odt").click(function(){
        exportAsODTFichamento();
    });

    $("#bt-deletar-fichamento").click(function(){
     $("#modal-deleta-fichamento").modal();
    });
    $("#bt-criar-linha").click(function(){
        insereNota("novo");
    });

    $("#bt-confirma-del-fichamento").click(function(){
        deletarFichamento();
    });

    $("#bt-salvar-notas").click(function(){
        salvaNotasFichamento();
    });


    $("#bt-menu-princ2").click(function(){
        $("#menu-princ").hide("fast");
    })

    $("#bt-back-page").click(function(){
        window.location.replace("../home.html");
    });

    $("#bt-menu-princ").click(function(){
        $("#menu-princ").show("fast");
    })

    $(window).click(function(evt) {
        if ((evt.target.id != "bt-menu-princ") && (evt.target.id != "bt-icon-menu-princ") &&
            (evt.target.id !="titulo-menu") && (evt.target.id !="icone-menu"))
            $("#menu-princ").hide("fast");
    });

    $("#bt-edita-ref").click(function(){
        $("#modal-edit-ref").modal();
        buscarReferencia();
    });

    $(document).bind('keydown', function(e) {
        if(e.ctrlKey && (e.which == 83)) {
            salvaNotasFichamento();
            return false;
        }
    });



});


function buscarDadosFichamento(){
    //pega url
    url = window.location.href;
    //tira o parametro via get
    arr =  url.split("?");
    //pega segunda pate
    idFic = arr[1];

    $("body").attr("idfic", idFic);

     var jquery = $.post( "../backend/buscaDadosArtigosById.php",{id : arr[1]}, function() { })
        .done(function(data){
            data_json = jQuery.parseJSON(data);
            $("#celula-titulo-fichamento").html(data_json["titulo"]);
            $("#celula-referencia-artigo").html(data_json["referencia"]);

             var jquery2 = $.post( "../backend/buscaNotas.php",{idfichamento: idFic}, function() { })
                 .done(function(data){
                     data_json = jQuery.parseJSON(data);
                     console.log(data_json);
                     $("#conteiner-notas").html("");
                     for(var i=0; i<data_json.length; i++){
                         $("#conteiner-notas").append(
                             "<div salvo='true' id="+data_json[i]["id"]+" class='conteiner-nota row-fic row'>" +
                             "<div  class='celula-padrao-fichamento cel-txt col-md-1'>" +
                             "<div  class='bt-delete-nota' target="+data_json[i]["id"]+">Deletar</div></div>"+
                             "<div  class='celula-padrao-fichamento cel-txt col-md-3'>"+
                             "<div id='conteiner-inp-"+data_json[i]["id"]+"'  class='form-group'>" +
                             "<textarea id='inp-"+data_json[i]["id"]+"'  class='textDisable input input-p-chave form-control' rows='1'></textarea></div> </div>"+
                             "<div  class='celula-padrao-fichamento cel-txt col-md-4'><div class='form-group'>" +
                             "<textarea id='cit-"+data_json[i]["id"]+"' class='textDisable input input-citacao form-control' rows='6' ></textarea>"+
                             "</div> </div> <div  class='celula-padrao-fichamento cel-txt col-md-4'><div style='padding: 0px; margin:0px'  class='form-group'>"+
                             "<textarea id='ref-"+data_json[i]["id"]+"' class='textDisable input input-reflexao form-control' rows='6' ></textarea></div></div>"
                         );

                         $("#inp-"+data_json[i]["id"]).val(data_json[i]["palavrachave"]);
                         $("#cit-"+data_json[i]["id"]).val(data_json[i]["citacao"]);
                         $("#ref-"+data_json[i]["id"]).val(data_json[i]["reflexao"]);

                         $("#inp-"+data_json[i]["id"]).bind('input propertychange', function(){
                             buscaPalavraChave($(this).val(), $(this).attr("id") );
                         });

                         $(".bt-delete-nota").click(function(){
                             deleteNota($(this).attr("target"));
                         });

                         $(".input").bind('input propertychange', function() {
                             fichamentoModificado();
                         });

                         $(document).on('blur', '.input', function () {
                             $(this).addClass("textDisable");
                             $('.input').removeClass("inp-inativo");
                             $("body").removeClass("noscrolling");

                         });

                         $(document).on('focus', '.input', function () {
                             $(this).removeClass("textDisable");
                             $('.input').addClass("inp-inativo");
                             $(this).removeClass("inp-inativo");
                             $("body").addClass("noscrolling");
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

function fichamentoModificado(){

    $("#msg-save").text("Arquivo não está salvo...");
}

function buscarReferencia(){
    //pega url
    url = window.location.href;
    //tira o parametro via get
    arr =  url.split("?");
    //pega segunda pate
    idFic = arr[1];

    $("body").attr("idfic", idFic);

    var jquery = $.post( "../backend/buscaDadosArtigosById.php",{id : arr[1]}, function() { })
        .done(function(data){
            data_json = jQuery.parseJSON(data);
            $("#titulo-artigo").val(data_json["referencia"]);
        })
        .fail(function() {
            alert( "error" );
        })

}


function insereNota(param){

    var jqxhr = $.post( "../backend/inserirNota.php",{idfichamento: idFic, modo : "novo"}, function() {
    })
        .done(function(data){
              $("#conteiner-notas").append(
                    "<div salvo='true' id="+data+" class='conteiner-nota row-fic row'>" +
                    "<div  class='celula-padrao-fichamento cel-txt col-md-1'>" +
                    "<div id="+data+" class='bt-delete-nota'>Deletar</div></div>" +
                    "<div  class='celula-padrao-fichamento cel-txt col-md-3'>"+
                    "<div id='conteiner-inp-"+data+"' class='form-group'>" +
                    "<textarea id='inp-"+data+"'  class='textDisable input input-p-chave form-control' rows='1'></textarea></div> </div>"+
                    "<div  class='celula-padrao-fichamento cel-txt col-md-4'><div class='form-group'>" +
                    "<textarea id='cit-"+data+"' class='textDisableinput  input-citacao form-control' rows='6' ></textarea>"+
                    "</div> </div> <div  class='celula-padrao-fichamento cel-txt col-md-4'><div style='padding: 0px; margin:0px'  class='form-group'>"+
                    "<textarea id='ref-"+data+"' class='textDisable input input-reflexao form-control' rows='6' ></textarea></div></div>"
              );

            $("#inp-"+data).bind('input propertychange', function(){
               buscaPalavraChave($(this).val(), $(this).attr("id"));
            });

            $(".bt-delete-nota").click(function(){
                deleteNota($(this).attr("target"));
            });

            $(".input").bind('input propertychange', function() {
                fichamentoModificado();
            });

            salvaNotasFichamento();

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
    conteudo +="<br><br><div style='text-align: center; color:#999; font-size: 12px'>"+
    "Documento gerado pelo BIRDS (Bibliographic Review Design Software) desenvolvido por Luis Araujo (luisaraujo.github.io)." +
    "<br>" +
    "Essa funcionalidade faz uso do DOM-PDF (https://github.com/dompdf)" +
    "</div>";

    conteudo +="</body></html>";

    $("#chtml").val(conteudo);

    nome = "Fichamento_";
    nome += $("#celula-titulo-fichamento").text().trim().replace(/[^\w\s]/gi,'');

    $("#cnome").val(nome.substr(0,40));
    $('#formImportPdf').submit();

};


function deletarFichamento(){

    var jquery = $.post( "../backend/deletarFichamento.php",{id : idFic}, function() { })
        .done(function(data){
            window.location.replace("../");
        })
        .fail(function() {
            alert("Erro ao deltar!");
        })
}

function exportAsODTFichamento(){

    var jqxhr = $.post( "../phpodt/index.php",{id: $("body").attr("idfic")}, function() {

    })
        .done(function(data){
            $("#modal-salvo").modal();
        })
        .fail(function() {
            alert( "error" );
        })
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

    //para cada nota adicione os dados no array
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
            $("#msg-save").text("Arquivo salvo no modo local");
        })
        .fail(function() {
            alert( "error" );
        });

}

function  deleteNota(param){

    var jqxhr = $.post( "../backend/deletarNota.php",{id: param}, function() {
    })
        .done(function( ){
            buscarDadosFichamento();
        })
        .fail(function() {
            alert( "error" );
        });


}