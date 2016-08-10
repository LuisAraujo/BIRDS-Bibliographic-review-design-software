<?php
$localhost ="127.0.0.1";
$user="root";
$senha = "root";
$banco="birds";

$bd = @mysql_connect($localhost,$user,$senha);// or die ('');

if($bd){
    mysql_select_db($banco, $bd);
}

?>