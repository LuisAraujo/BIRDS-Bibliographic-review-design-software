<?php
include "conexaoBD_localhost.php";

$idFichamento = $_POST["id"];

$strBuscaFichamento = "select * from artigo where id = (select artigo_id from fichamento where id = '$idFichamento')";
$res = mysql_query($strBuscaFichamento) or die(mysql_error());

if(mysql_num_rows($res) == 0){
    echo "sem dados";
}else{
    $row = mysql_fetch_assoc($res);

    $json = '{"titulo": "'.$row['nome']. '", "referencia":"'.$row["referencia"].'", "bibtex":"'.$row["bibtex"].'"}';

}

echo $json;

?>