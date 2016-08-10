<?php

include "conexaoBD_localhost.php";

$busca = $_POST["texto"];

$strBuscaPalavraChave = "select nome from palavrachave where nome like '%$busca%' limit 4";
$res = mysql_query($strBuscaPalavraChave) or die(mysql_error());

$arr_notas = array();

while($cel = mysql_fetch_row($res)){
    array_push($arr_notas, $cel);
}

echo json_encode($arr_notas, JSON_PRETTY_PRINT);


?>