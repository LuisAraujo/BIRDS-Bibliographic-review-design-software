<?php

include "backend/conexaoBD_localhost.php";

echo $installed;

if($installed == 0){
    header("Location: install/index.php");
}else{
    $strSelectLogin = "select login from  preferencia where 1";
    $res = mysql_query($strSelectLogin) or die(mysql_error());
    $row = mysql_fetch_assoc($res);

    if( intval($row["login"]) == 1){
       header("Location: login.html");
    }else{
       header("Location: pagina_inicial.html");
    }
}
?>