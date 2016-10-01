<?php
include "conexaoBD_localhost.php";
$fav = $_POST["favorito"];
$id = $_POST["id"];

$strAtualizaFav = "update artigo set favorito='".$fav."' where id ='".$id."'";
mysql_query($strAtualizaFav) or die(mysql_error());

echo $fav." ".$id;

?>