<?php
include "conexaoBD_localhost.php";

$id = $_POST["id"];

$strRemoveTag = "delete from tag where nota_id =".$id."";
mysql_query($strRemoveTag) or die(mysql_error());

$strRemoveNota = "delete from nota where id ='".$id."'";
mysql_query($strRemoveNota) or die(mysql_error());


?>