<?php
include "conexaoBD_localhost.php";

$strBuscaArtigo = "select * from artigo where favorito = 0 order by id desc limit  14";
$res = mysql_query($strBuscaArtigo) or die(mysql_error());
$arr_artigo = array();

mysql_num_rows($res);

while($linha = mysql_fetch_array($res)){
    $arr = array();
    $arr["titulo"] = $linha["nome"];

    $strBuscaFichamento = "select id from fichamento where artigo_id='".$linha["id"]."'";
    $res2 = mysql_query($strBuscaFichamento) or die(mysql_error());

    $row = mysql_fetch_assoc($res2);

    $arr["idfichamento"] = $row["id"];

    array_push($arr_artigo, $arr);

}

echo json_encode($arr_artigo, JSON_PRETTY_PRINT);

?>

