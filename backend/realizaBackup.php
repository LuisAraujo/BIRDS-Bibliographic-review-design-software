<?php
include "conexaoBD_localhost.php";

$strSelectLogin = "select localsalvamento as local from  preferencia";
$res = mysql_query($strSelectLogin) or die(mysql_error());
$row = mysql_fetch_assoc($res);

//verifica se há o diretório
if (!file_exists($row["local"])) {
    mkdir($row["local"], 0700);
}

if (!file_exists($row["local"]."/Backups")) {
    mkdir($row["local"]."/Backups", 0700);
}

$backupfile=  $row["local"]."Backups/Backup_BIRD_Dia-".date("d")."-".date("m")."-".date("y")."-Hora-".date("H")."-".date("i")."-".date("s").".sql";

exec("c:/xampp/mysql/bin/mysqldump  --host=".$localhost." --user=".$user." --password=".$senha."  birds > ".$backupfile."" );

?>