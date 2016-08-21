<?php
include "conexaoBD_localhost.php";

$dado = $_POST["dado"];
$opcao = "0"; //$_POST["opc"];
$strBuscaFichamento = "";
$modo = $_POST["modo"];
$arr_return = array();

if($opcao == "0"){
    if($modo == "igual")
        $strBuscaPalavra ="select id, nome from palavrachave where nome = '".$dado."'";
    else
        $strBuscaPalavra ="select id, nome from palavrachave where nome like '%".$dado."%'";
        $res0 = mysql_query($strBuscaPalavra) or die(mysql_error());

    if(mysql_num_rows($res0) == 0){
        echo "sem dados";
    }else{
        while($row0 = mysql_fetch_assoc($res0)){

            $strBuscaFichamento ="select nota_id from tag where palavrachave_id =".$row0["id"];
            $res1 = mysql_query($strBuscaFichamento) or die(mysql_error());

            if(mysql_num_rows($res1) == 0){
                echo "sem dados";
            }else{
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
    }

}else if($opcao == "1")
    echo "1";
else if($opcao == "2")
    echo "2";


echo json_encode($arr_return, JSON_PRETTY_PRINT);

?>