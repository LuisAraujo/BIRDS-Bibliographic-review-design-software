<?php

$toDay = date('d-m-Y-H-i-s');
$dbhost = '127.0.0.1';
$dbuser = 'root';
$dbpass = 'root';
$dbname = 'birds';
$path_to_mysqldump = 'C:\xampp\mysql\bin';

exec("$path_to_mysqldump\\mysqldump.exe  --allow-keywords --opt  --u$dbuser --p'$dbpass' --h$dbhost $dbname > ".$toDay.".sql");


?>

