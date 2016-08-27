<?php
include "conexaoBD_localhost.php";
$modo = $_POST["modo"];
$idFichamento = $_POST["idfichamento"];

//inserindo uma nova nota
if($modo == "novo"){

    $strCriaFichamento = "insert into nota values(null,'','','$idFichamento')";
    $res = mysql_query($strCriaFichamento) or die(mysql_error());
    $idNota = mysql_insert_id ();
    echo $idNota;

 //atualizando as notas
}else if($modo == "atualiza"){

    $dados = $_POST["dados"];

    for($i=0; $i< count($dados); $i++){

        $strBuscaPalavraChave = "select count(*) as total, id from palavrachave where nome='".$dados[$i][1]."'";
        $query = mysql_query($strBuscaPalavraChave) or die(mysql_error());
        $res1 = mysql_fetch_assoc($query);

       if(!$res1['total']){
            $strCadastraPalavraChave = "insert into palavrachave values(null,'".$dados[$i][1]."')";
            $res2 = mysql_query($strCadastraPalavraChave) or die(mysql_error());
            $idPalavra = mysql_insert_id ();
        }else{
            $idPalavra = $res1['id'];
        }

        $idNota = $dados[$i][0];

        $strAtualizaNota = "update nota set citacao ='".$dados[$i][2]."',reflexao='".$dados[$i][3]."' where id='".$idNota."'";
        $query2 = mysql_query($strAtualizaNota) or die(mysql_error());


        $strBuscaTag = "select count(*) as total from tag where nota_id='".$idNota."'";
        $query3 = mysql_query($strBuscaTag) or die(mysql_error());
        $res3 = mysql_fetch_assoc($query3);

        if($res3['total'] == 0){
            $strCadastraTag = "insert into tag values('".$idPalavra."','".$idNota."')";
            $res4 = mysql_query($strCadastraTag) or die(mysql_error());
            $idTag = mysql_insert_id ();
        }else{
            $strAtualizaTag = "update tag set palavrachave_id='".$idPalavra."' where nota_id='".$idNota."'";
            $res4 = mysql_query($strAtualizaTag) or die(mysql_error());
        }
    }


}


?>