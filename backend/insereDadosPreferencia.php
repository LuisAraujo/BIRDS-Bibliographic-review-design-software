<?php
/*Usando na instalação do BIRDS*/
include "conexaoBD_localhost.php";

$usuario = $_POST["usuario"];
$senha = $_POST["senha"];
$login = $_POST["login"];
$local = $_POST["local"];
$alerta = $_POST["alerta"];


$strSelectQtdPreferencia = "select count(*) as total from preferencia";
$res = mysql_query($strSelectQtdPreferencia) or die(mysql_error());
$row = mysql_fetch_assoc($res);

if(  intval( $row["total"]) > 0){
    if($senha !="")
        $strSelectFichamento = "update preferencia set nomeusuario = '".$usuario."', senha='".$senha."', login='".$login."', localsalvamento = '".$local."', alertabackup = ".$alerta."";
    else
        $strSelectFichamento = "update preferencia set nomeusuario = '".$usuario."', login='".$login."', localsalvamento = '".$local."', alertabackup = ".$alerta."";
}else{
    $strSelectFichamento = "insert into preferencia value(null,'".$usuario."','".$senha."',".$login.",'".$local."',".$alerta.")";
}

$res = mysql_query($strSelectFichamento) or die(mysql_error());

?>