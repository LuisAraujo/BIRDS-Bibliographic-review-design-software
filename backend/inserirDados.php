<?php
include "conexaoBD_localhost.php";

$ref = $_POST["titulo"];

$ref_ex =  explode(".", $ref);

$autores = $ref_ex[0];

$titulo = strtoupper($ref_ex[1]);

//buscar artigo
$strBuscaArtigo = "select id from artigo where referencia ='$ref'";

$idArtigo = mysql_query($strBuscaArtigo) or die(mysql_error());

$row = mysql_fetch_assoc($idArtigo);
if(!$row){
  $strCadastraArtigo = "insert into artigo (id, nome, referencia) values( null ,'$titulo','$ref')";
  mysql_query($strCadastraArtigo) or die(mysql_error());
  $idArtigo =  mysql_insert_id ();

}

$arra_aut = explode(";", $autores);
$arraIDPesquisadores = array();

foreach ($arra_aut as $ar){
    $arra_nome = explode(",", $ar);
    $nome = $arra_nome[1];
    $sobrenome = strtoupper($arra_nome[0]);

    //buscar pesquisador
    $strBuscaPesquisador = "select id from pesquisador where nome='$nome' and sobrenome = '$sobrenome'";
    $res = mysql_query($strBuscaPesquisador) or die(mysql_error());
    $row = mysql_fetch_assoc($res);

    $idPesquisador;
    if(!$row){
        $strCadastraPesquisador = "insert into pesquisador values(null, '$nome', '$sobrenome')";
        mysql_query($strCadastraPesquisador) or die(mysql_error());
        $idPesquisador = mysql_insert_id ();
    }else{
        $idPesquisador = $row["id"];
    }

    array_push($arraIDPesquisadores, $idPesquisador);

}

//para cada pesquisador
foreach ($arraIDPesquisadores as $idPesq){
    $strCriarAutores = "insert into autor (pesquisador_id, artigo_id) values('$idPesq', '$idArtigo')";
    mysql_query($strCriarAutores) or die(mysql_error());
}

$strCadastraFichamento = "insert into fichamento values(null,'$idArtigo')";
mysql_query($strCadastraFichamento) or die(mysql_error());

$strBuscaFichamento = "select id from fichamento where artigo_id = '$idArtigo'";
$res = mysql_query($strBuscaFichamento) or die(mysql_error());
$idFichamento = mysql_fetch_row($res);

echo $idFichamento[0];

?>