<?php
include "conexaoBD_localhost.php";

$strSelectPreferencia = "select * from  preferencia where 1";
$res = mysql_query($strSelectPreferencia) or die(mysql_error());
$row = mysql_fetch_assoc($res);

echo json_encode($row, JSON_PRETTY_PRINT);

?>