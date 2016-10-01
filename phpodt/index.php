<?php

include '/phpodt-0.3.3/phpodt.php';
//caminho salvo em "preferências"
include "../backend/conexaoBD_localhost2.php";

$id= $_POST["id"];

$strSelectLogin = "select localsalvamento as local from  preferencia";
$res = mysql_query($strSelectLogin) or die(mysql_error());
$row = mysql_fetch_assoc($res);

$caminho =  $row["local"]."ODTS/";

//verifica se há o diretório
if (!file_exists($row["local"])) {
    mkdir($row["local"], 0700);
}

if (!file_exists($row["local"]."ODTS/")) {
    mkdir($row["local"]."ODTS", 0700);
}

$strBuscaNotas = "select * from nota where fichamento_id = ".$id;
$res = mysql_query($strBuscaNotas) or die(mysql_error());

$strBuscaArtigo = "select * from artigo where id = (select artigo_id from fichamento where id='".$id."' limit 1)";
$res2 = mysql_query($strBuscaArtigo) or die(mysql_error());
$row = mysql_fetch_assoc($res2);

$odt = ODT::getInstance();

$textStyle1 = new TextStyle('textstyle1');
$textStyle1->setFontSize('15px');
$textStyle1->setColor('#000000');
$textStyle1->setBold();
$nome = $row["nome"];

$pStyle = new ParagraphStyle('myPStyle');
$pStyle->setTextAlign(StyleConstants::CENTER);

$p1 = new Paragraph($pStyle);
$p1->addText($row["nome"], $textStyle1);

$p2 = new Paragraph();
$p2->addText($row["referencia"]);


$table = new Table('table1');
$table->createColumns(3);
$table->addHeader(array('PALAVRA-CHAVE', 'CITAÇÃO', 'REFLEXÃO'));
$tableStyle = new TableStyle($table->getTableName());
$table->setStyle($tableStyle);

$arr = array();

while($current_row = mysql_fetch_assoc($res)){

   $strBuscaPalavra = "select nome from palavrachave where id = (select palavrachave_id from tag where nota_id='".$current_row["id"]."')";
   $res3 = mysql_query($strBuscaPalavra) or die(mysql_error());
   $row3 = mysql_fetch_assoc($res3);

   $a = array($row3["nome"], $current_row["citacao"], $current_row["reflexao"]);
   array_push($arr, $a);
}
$rows = $arr;
$table->addRows($rows);

for($i=0; $i< count($arr); $i++){
    $cellStyle1 = $table->getCellStyle(0,$i);
    $cellStyle1->setBorder("#000000");
    $cellStyle1 = $table->getCellStyle(1,$i);
    $cellStyle1->setBorder("#000000");
    $cellStyle1 = $table->getCellStyle(2,$i);
    $cellStyle1->setBorder("#000000");
}


$pStyle2 = new ParagraphStyle('myPStyle2');
$pStyle2->setTextAlign(StyleConstants::CENTER);

$textStyle2 = new TextStyle('textstyle2');
$textStyle2->setFontSize('9px');
$textStyle2->setColor('#999999');

$p3 = new Paragraph();
$p4 = new Paragraph($pStyle);
$p4->addText("Documento gerado pelo BIRDS (Bibliographic Review Design Software)desenvolvido por Luis Araujo (luisaraujo.github.io). Essa funcionalidade faz uso do PHP-ODT (www.php-odt.sourceforge.net/index.php)", $textStyle2);

//Replece letras com acentos
$arrC = ["ç", "Ç"];
$nome = str_replace($arrC, "c", $nome);

$arrC = ["ã", "Ã"];
$nome = str_replace($arrC, "a", $nome);
$arrC = ["á", "Á"];
$nome = str_replace($arrC, "a", $nome);
$arrC = ["à", "À"];
$nome = str_replace($arrC, "a", $nome);
$arrC = ["â", "Â"];
$nome = str_replace($arrC, "a", $nome);

$arrC = ["õ", "Õ"];
$nome = str_replace($arrC, "o", $nome);
$arrC = ["ó", "Ó"];
$nome = str_replace($arrC, "o", $nome);
$arrC = ["ô", "Ô"];
$nome = str_replace($arrC, "o", $nome);

$arrC = ["é", "É"];
$nome = str_replace($arrC, "e", $nome);
$arrC = ["ê", "Ê"];
$nome = str_replace($arrC, "e", $nome);


$file_to_save = $caminho."".$nome.'.odt';
$odt->output($file_to_save);

?>