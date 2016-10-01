<?php
//header('Content-type: text/html; charset=ISO-8859-1');

include "conexaoBD_localhost.php";

mysql_query("SET NAMES 'utf8'");
mysql_query('SET character_set_connection=utf8');
mysql_query('SET character_set_client=utf8');
mysql_query('SET character_set_results=utf8');


$strSelectPreferencia = "select * from  preferencia where 1";
$res = mysql_query($strSelectPreferencia) or die(mysql_error());
$row = mysql_fetch_assoc($res);

//echo $row["nomeusuario"].','.$row["senha"].','.$row["localsalvamento"].','. $row["login"].','.$row["alertabackup"];


echo json_encode($row, JSON_PRETTY_PRINT)  ;

?>