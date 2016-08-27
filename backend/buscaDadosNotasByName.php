<?php
include "conexaoBD_localhost.php";

$dado =  $_POST["dado"];
$opcao = $_POST["opc"];
$strBuscaFichamento = "";
$modo = $_POST["modo"];
$arr_return = array();

//por id
if (($opcao == "0") && ($dado!="")){
    if($modo == "igual")
        $strBuscaPalavra ="select id, nome from palavrachave where nome = '".$dado."'";
    else
        $strBuscaPalavra ="select id, nome from palavrachave where nome like '%".$dado."%'";
        $res0 = mysql_query($strBuscaPalavra) or die(mysql_error());

    if(mysql_num_rows($res0) == 0){
        echo "sem dados de palavra";
    }else{

        $count = 0;
        while($row0 = mysql_fetch_assoc($res0)){
            $strBuscaFichamento ="select nota_id from tag where palavrachave_id =".$row0["id"];
            $res1 = mysql_query($strBuscaFichamento) or die(mysql_error());

            if(mysql_num_rows($res1) != 0){
                $count++;
                while($row1 = mysql_fetch_assoc($res1)){
                    $strBuscaNotas = "select * from nota where id = ".$row1['nota_id'];
                    $res2 = mysql_query($strBuscaNotas) or die(mysql_error());
                    $row2 = mysql_fetch_assoc($res2);

                    $strBuscaArtigo = "select nome from artigo where id =(select artigo_id from fichamento where id=". $row2['fichamento_id']. ")";
                    $res3 = mysql_query($strBuscaArtigo) or die(mysql_error());
                    $row3 = mysql_fetch_assoc($res3);

                    $cel = array();

                    $cel["nome"] = $row3["nome"];
                    $cel["palavra"] = $row0["nome"];
                    $cel["fic_id"] = $row2["fichamento_id"];
                    $cel["cit"] = $row2["citacao"];
                    $cel["ref"] = $row2["reflexao"];

                    array_push($arr_return, $cel);
                }
            }
        }


        if($count == 0)
            echo "sem dados de tag";
    }

}else if (($opcao == "1") && ($dado!="")){

   $strBuscaPesquisador ="select * from pesquisador where sobrenome like '%".$dado."%' ";

   $res0 = mysql_query($strBuscaPesquisador) or die(mysql_error());

    if(mysql_num_rows($res0) == 0){
        echo "sem dados de pesquisador";
    }else{
        while($row0 = mysql_fetch_assoc($res0)){

            $strBuscaAutor =  "select * from autor where pesquisador_id=".$row0["id"];
            $res1 = mysql_query($strBuscaAutor) or die(mysql_error());

            while($row1 = mysql_fetch_assoc($res1)){

                $strBuscaFichamento =  "select * from fichamento where artigo_id =".$row1["artigo_id"];
                $res2 = mysql_query($strBuscaFichamento) or die(mysql_error());
                $row2 = mysql_fetch_assoc($res2);

                $strBuscaNotas ="select * from nota where fichamento_id=".$row2["id"];
                $res3 = mysql_query($strBuscaNotas) or die(mysql_error());

                if(mysql_num_rows($res3) == 0){
                    echo "sem dados de notas";
                }else{
                    while($row3 = mysql_fetch_assoc($res3)){

                        $strBuscaArtigo = "select nome from artigo where id =(select artigo_id from fichamento where id=". $row3['fichamento_id']. ")";
                        $res4 = mysql_query($strBuscaArtigo) or die(mysql_error());
                        $row4 = mysql_fetch_assoc($res4);

                        $cel = array();

                        $cel["nome"] = $row4["nome"];
                        $cel["palavra"] = $row0["sobrenome"];
                        $cel["fic_id"] = $row3["fichamento_id"];
                        $cel["cit"] = $row3["citacao"];
                        $cel["ref"] = $row3["reflexao"];

                        array_push($arr_return, $cel);
                    }
                }
            }
        }
    }

}else if(($opcao == "2") && ($dado!="")){

    $strBuscaArtigo ="select * from artigo where nome like '%".$dado."%' ";

    $res0 = mysql_query( $strBuscaArtigo) or die(mysql_error());

    if(mysql_num_rows($res0) == 0){
        echo "sem dados de artigo";
    }else{
        $count = 0;
        while($row0 = mysql_fetch_assoc($res0)){

            $strBuscaFichamento =  "select * from fichamento where artigo_id=".$row0["id"];
            $res1 = mysql_query($strBuscaFichamento) or die(mysql_error());

            while($row1 = mysql_fetch_assoc($res1)){

                $strBuscaNotas ="select * from nota where fichamento_id=".$row1["id"];
                $res3 = mysql_query($strBuscaNotas) or die(mysql_error());

                if(mysql_num_rows($res3) != 0){
                    while($row3 = mysql_fetch_assoc($res3)){
                        $count++;
                        $cel = array();

                        $cel["nome"] = $row0["nome"];
                        $cel["palavra"] = $row0["nome"];
                        $cel["fic_id"] = $row3["fichamento_id"];
                        $cel["cit"] = $row3["citacao"];
                        $cel["ref"] = $row3["reflexao"];

                        array_push($arr_return, $cel);
                    }
                }
            }
        }
    }
}


if( count($arr_return) > 0)
    echo json_encode($arr_return, JSON_PRETTY_PRINT);
else
    echo "Sem Dados!";

?>