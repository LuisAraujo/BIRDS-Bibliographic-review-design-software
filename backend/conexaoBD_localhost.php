<?php
$installed;

//verifica se há o diretório
if ( file_exists('backend/conexao_localhost.php') || ( file_exists('conexao_localhost.php')) ){
    include 'conexao_localhost.php';

    $banco='birds';

    $bd = @mysql_connect($localhost,$user,$senha);

    $db_selected = mysql_select_db($banco, $bd);

        if($db_selected)
            $installed = 1;
} else
    $installed = 0;



?>