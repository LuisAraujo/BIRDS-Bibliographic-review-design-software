<?php

use Dompdf\Dompdf;
use Dompdf\Options;
require_once 'dompdf/autoload.inc.php';


//conteudo em html via post
$html = $_POST["chtml"];
//nome do artigo via post
$nome = $_POST["cnome"];
//caminho salvo em "preferências"
$caminho = "C:/Users/fl43/Documents/GitHub/BIRDS-Bibliographic-review-design-software/PDFS/";

/********* USANDO DOMPDF ****************/
$dompdf = new Dompdf();
$dompdf->loadHtml($html);

// (Opcional) Configurando o tamanho do papel e orientação
$dompdf->setPaper('A4', 'landscape');
// Renderizando o HTML como PDF
$dompdf->render();

// Criando a saida do PDF gerado para o Navegados
$output = $dompdf->output();

//Caminho + nome do arquivo
$file_to_save =  $caminho."".$nome.'.pdf';

//Salvando o PDF no servidor
file_put_contents($file_to_save, $dompdf->output());


//print the pdf file to the screen for saving
header('Content-type: application/pdf');
header('Content-Disposition: inline; filename="'.$nome.'.pdf"');
header('Content-Transfer-Encoding: binary');
header('Content-Length: ' . filesize($file_to_save));
header('Accept-Ranges: bytes');

readfile($file_to_save);

?>