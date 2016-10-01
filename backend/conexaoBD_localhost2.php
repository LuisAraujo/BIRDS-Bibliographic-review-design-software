<?php

$installed = 0;

//verifica se há o diretório
if (file_exists('../backend/conexao_localhost.php')) {

    include '../backend/conexao_localhost.php';

    $banco='birds';

    $bd = @mysql_connect($localhost,$user,$senha);

    $db_selected = mysql_select_db($banco, $bd);

        if($db_selected)
        $installed = 1;

}


?>