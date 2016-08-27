<?php
include "conexaoBD_localhost.php";
$id = $_POST["id"];

$strSelectFichamento = "select artigo_id from fichamento where id=".$id."";
$res = mysql_query($strSelectFichamento) or die(mysql_error());
$row = mysql_fetch_assoc($res);

$strBuscaNotas = "select * from nota where fichamento_id ='".$id."'";
$res2 = mysql_query($strBuscaNotas) or die(mysql_error());

while($row2 = mysql_fetch_assoc($res2)){

    $strDeleteTag = "delete from tag where nota_id ='".$row2['id']."'";
    mysql_query($strDeleteTag) or die(mysql_error());

    $strDeleteNota = "delete from nota where id ='".$row2['id']."'";
    mysql_query($strDeleteNota) or die(mysql_error());

}

$strRemoveAutor = "delete from autor where artigo_id =".$row["artigo_id"]."";
mysql_query($strRemoveAutor) or die(mysql_error());

$strRemoveFichamento = "delete from fichamento where id ='".$id."'";
mysql_query($strRemoveFichamento) or die(mysql_error());

$strRemoveArtigo = "delete from artigo where id =".$row["artigo_id"]."";
mysql_query($strRemoveArtigo) or die(mysql_error());

echo $row["artigo_id"];

?>