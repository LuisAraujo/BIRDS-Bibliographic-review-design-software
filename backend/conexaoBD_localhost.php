<?php
$intalled = 1;
$localhost ='127.0.0.1';
$user='root';
$senha = 'root';
$banco='birds';$bd = @mysql_connect($localhost,$user,$senha);
$db_selected = mysql_select_db($banco, $bd);
if(!$db_selected){
$intalled = 0;
} ?>