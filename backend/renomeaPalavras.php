<?php
include "conexaoBD_localhost.php";
$palavra = $_POST["word"];
$id = $_POST["id"];

$strBuscaPalavraChave = "select * from palavrachave where nome ='".$palavra."'";
$res = mysql_query($strBuscaPalavraChave) or die(mysql_error());

$qtd = mysql_num_rows($res);

if($qtd>0){
    $row = mysql_fetch_assoc($res);

    $strBuscaTags = "select * from tag where palavrachave_id = '".$id."'";
    $res2 = mysql_query($strBuscaTags) or die(mysql_error());

    while($row2 = mysql_fetch_assoc($res2)){
        $strAtualizaTags = "update tag set palavrachave_id='".$row['id']."' where palavrachave_id ='".$id."'";
        $res3 = mysql_query($strAtualizaTags) or die(mysql_error());
    }

    $strRemovePalavraChave = "delete from palavrachave where id ='".$id."'";

    $res4 = mysql_query($strRemovePalavraChave) or die(mysql_error());

}else{

    $strAtualizaTags = "update palavrachave set nome='".$palavra."' where id ='".$id."'";
    $res = mysql_query($strAtualizaTags) or die(mysql_error());
}


?>