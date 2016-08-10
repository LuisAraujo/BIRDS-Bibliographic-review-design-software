<?php
include "conexaoBD_localhost.php";

$idFichamento = $_POST["idfichamento"];

$strBuscaNotas = "select * from nota where fichamento_id = '$idFichamento'";
$res = mysql_query($strBuscaNotas) or die(mysql_error());

$arr_notas = array();

while($cel = mysql_fetch_assoc($res)){
    $strBuscaTag = "select nome from palavrachave where id = (select palavrachave_id from tag where nota_id ='".$cel['id']."')";
    $query2 = mysql_query($strBuscaTag) or die(mysql_error());
    $res2 = mysql_fetch_assoc($query2);
    $cel["palavrachave"] = $res2["nome"];

    array_push($arr_notas, $cel);

}

echo json_encode($arr_notas, JSON_PRETTY_PRINT);

?>