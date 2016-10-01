<?php

if (!file_exists("../backend/conexao_localhost.php"))
echo
"<!DOCTYPE html>
<html>

<html lang='en'>
<meta charset='utf-8'>
<meta http-equiv='X-UA-Compatible' content='IE=edge'>
<meta name='viewport' content='width=device-width, initial-scale=1'>
<meta name='description' content=''>
<meta name='author' content=''>
<!-- Bootstrap Core CSS -->
<link href='../style/bootstrap.css' rel='stylesheet'>
<link href='../style/sticky-footer-navbar.css' rel='stylesheet'>

<!-- Custom styles for this template -->
<link href='../style/grid.css' rel='stylesheet'>

<link href='../style/style.css' rel='stylesheet'>

<script src='../script/jquery.js'></script>
<script src='../script/scriptInstall.js'></script>

<title>BIRDS - Bibliographic Review Design Software</title>
</head>

<body id='body'>

<!-- Fixed navbar -->
<nav class='barra navbar navbar-default navbar-fixed-top' role='navigation'>
    <div class='container'>
        <div class='navbar-header'>
            <button type='button' class='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar' aria-expanded='false' aria-controls='navbar'>
                <span class='sr-only'></span>
                <span class='icon-bar'></span>
                <span class='icon-bar'></span>
                <span class='icon-bar'></span>
            </button>
            <a id='bt-menu-princ' class='navbar-brand' href='#'>
                <div id='bt-icon-menu-princ' >
                    <img id='logo-birds' src='../img/logoBIRDS.png'>
                    <span id='titulo-menu'>BIRDS</span>
                </div>
            </a>
        </div>
        <div id='navbar' class='collapse navbar-collapse'>
            <ul class='nav navbar-nav'>

            </ul>
        </div><!--/.nav-collapse -->
    </div>
</nav>


<div id='c-main' class='container'>

    <div id='conteiner-login' style='width: 300px'>
        <form method='post' target='#' class='form-signin'>
            <h2 class='form-signin-heading'>Instalando o BIRDS</h2>
            <span> Inform o Host</span>
            <label for='input-hosp' class='sr-only'>localhost</label>
            <input name='host' id='input-host' class='form-control' placeholder='local host' required='' autofocus=''>

            <span> Inform o Usuário da Base de Dados</span>
            <label for='input-usuario' class='sr-only'>usuário</label>
            <input name='usuario'  id='input-usuario' class='form-control' placeholder='usuario' required=''>


            <span> Inform a Senha do Usuário</span>
            <label for='input-senha' class='sr-only'>senha</label>
            <input name='senha'  id='input-senha' class='form-control' placeholder='senha' required=''>
            <div class='checkbox'>

            </div>
            <button type='button' id='bt-install' class='btn btn-lg btn-primary btn-block' >Entrar</button>
        </form>
    </div>



</div>

</div>
<script src='script/bootstrap.min.js'></script>

</body>
</html>";

else
    header("Location: ../home.html");


?>