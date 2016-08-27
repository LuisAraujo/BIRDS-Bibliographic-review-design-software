<?php
include "conexaoBD_localhost.php";
$usuario = $_POST["usuario"];
$senha = $_POST["senha"];

$strSelectLogin = "select id, localsalvamento from  preferencia where usuario='".$usuario."' and senha = '".$senha."'";
$res = mysql_query($strSelectLogin) or die(mysql_error());
$qtd = mysql_num_rows($res);

if($qtd>0){
    session_start();
    $row = mysql_fetch_assoc($res);
    $_SESSION['logado'] = true;
}else{
    echo "erro ao logar!";
}