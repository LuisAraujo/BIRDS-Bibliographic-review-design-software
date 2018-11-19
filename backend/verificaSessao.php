<?php

session_start();
if( ( isset($_SESSION['logado']) ) &&  ($_SESSION['logado']== true) )
	echo "1";
else
	echo "0";

?>