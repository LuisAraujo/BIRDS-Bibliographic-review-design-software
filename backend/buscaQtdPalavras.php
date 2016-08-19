<?php

include "conexaoBD_localhost.php";

$strBuscaPalavras = "select * from palavrachave";
$res = mysql_query($strBuscaPalavras) or die(mysql_error());
$arr_palavras = array();

while($cel = mysql_fetch_assoc($res)){

    $strBuscaQtdPalavraChave = "select count(*) as total from tag where palavrachave_id = ".$cel['id']."";
    $res2 = mysql_query($strBuscaQtdPalavraChave) or die(mysql_error());
    $aux = mysql_fetch_assoc($res2);

    $cel["qtd"] = $aux["total"];

    array_push($arr_palavras, $cel);
}

echo json_encode($arr_palavras, JSON_PRETTY_PRINT);

?>