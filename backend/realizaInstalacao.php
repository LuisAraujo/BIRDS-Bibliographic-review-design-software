<?php

$usuario = $_POST["usuario"];
$senha = $_POST["senha"];
$host = $_POST["host"];


$filename = "../backend/conexaoBD_localhost.php";
$myfile = fopen($filename, "w") or die("Unable to open file!");

$php_cont = "<?php\r\n";
$php_cont .= "\$intalled = 1;\r\n";
$php_cont .= "\$localhost ='".$host."';\r\n";
$php_cont .= "\$user='".$usuario."';\r\n";
$php_cont .= "\$senha = '".$senha."';\r\n";
$php_cont .= "\$banco='birds';";
$php_cont .= "\$bd = @mysql_connect(\$localhost,\$user,\$senha);\r\n";
$php_cont .="\$db_selected = mysql_select_db(\$banco, \$bd);\r\n";
$php_cont .="if(!\$db_selected){\r\n";
$php_cont .= "\$intalled = 0;\r\n";
$php_cont .="} ?>";

fwrite($myfile, $php_cont);
fclose($myfile);

include "criaBaseDados.php";

?>