<?php
include "conexaoBD_localhost.php";

$ref = $_POST["titulo"];
$modo = $_POST["modo"];

$ref_ex= null;
$autores="";
$titulo="";
$arra_aut = null;
$arraIDPesquisadores = array();
$chamada ="";

if($modo == "abnt"){
    $ref_ex =  explode(". ", $ref);
    $autores = $ref_ex[0];
    $arra_aut = explode(";", $autores);
    $titulo = strtoupper($ref_ex[1]);

}else if($modo == "bibtex"){

    $autor = "";

    $ref = trim(preg_replace('/\s\s+/', ' ', $ref));
    $bib_ex =  explode("{", $ref);

    $chamada = explode(",", $bib_ex[1])[0];

    for($i= 0; $i < count($bib_ex); $i++){

        if($titulo == ""){
            $temp = explode(",", $bib_ex[$i]);
            $t = str_replace(' ','', $temp[count($temp)-1]);
            $t = str_replace('=', '',$t);

            if($t == 'title'){
                $titulo = strtoupper(explode("}", $bib_ex[$i+1])[0]);
            }
        }
        if($autor == ""){
            $temp = explode(",", $bib_ex[$i]);

            $t = str_replace(' ','', $temp[count($temp)-1]);
            $t = str_replace('=', '',$t);

            if($t == 'author'){
                $autor = explode("}", $bib_ex[$i+1])[0];
            }
        }

    }

    $arra_aut = explode("and", $autor);
    $ref = "";
    for($i= 0; $i < count($arra_aut); $i++){
        $ref .= $arra_aut[$i];
    }

    $ref .= ". ".$titulo;

}


//buscar artigo
$strBuscaArtigo = "select id from artigo where referencia ='$ref'";

$idArtigo = mysql_query($strBuscaArtigo) or die(mysql_error());

$row = mysql_fetch_assoc($idArtigo);

if(!$row){
  $strCadastraArtigo = "insert into artigo (id, nome, referencia, favorito, bibtex) values( null ,'$titulo','$ref', 0, '$chamada')";
  mysql_query($strCadastraArtigo) or die(mysql_error());
  $idArtigo =  mysql_insert_id ();

}


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