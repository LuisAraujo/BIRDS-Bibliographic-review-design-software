<?php

//$host = $_POST["host"];
//$usuario = $_POST["usuario"];
//$password = $_POST["senha"];


$host = "localhost";
$user = "root";
$password = "";


//verifica se há o diretório

$filename = "../backend/conexao_localhost.php";
$myfile = fopen($filename, "w") or die("Unable to open file!");

$php_cont = "<?php\r\n";
$php_cont .= "\$intalled = 1;\r\n";
$php_cont .= "\$host ='".$host."';\r\n";
$php_cont .= "\$user='".$user."';\r\n";
$php_cont .= "\$senha = '".$password."';\r\n";
//$php_cont .= "\$banco='birds';";
//$php_cont .= "\$bd = @mysql_connect(\$localhost,\$user,\$senha);\r\n";
//$php_cont .="\$db_selected = mysql_select_db(\$banco, \$bd);\r\n";
//$php_cont .="if(!\$db_selected){\r\n";
//$php_cont .= "\$intalled = 0;\r\n";
//$php_cont .="}";
$php_cont .="?>";

fwrite($myfile, $php_cont);
fclose($myfile);

include "criaBaseDados.php";


?>