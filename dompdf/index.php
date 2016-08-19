<?php

use Dompdf\Dompdf;
use Dompdf\Options;
require_once 'dompdf/autoload.inc.php';
// instantiate and use the dompdf class
$html = $_POST["chtml"];
$nome = $_POST["cnome"];

$dompdf = new Dompdf();
$dompdf->loadHtml($html);

// (Optional) Setup the paper size and orientation
$dompdf->setPaper('A4', 'landscape');

// Render the HTML as PDF
$dompdf->render();

// Output the generated PDF to Browser

$output = $dompdf->output();

//$dompdf->stream($nome);
$teste = "testes_AJAKJS AJKAJA";
$file_to_save = 'C:/Users/fl43/Documents/GitHub/BIRDS-Bibliographic-review-design-software/'.$nome.'.pdf';
//save the pdf file on the server
file_put_contents($file_to_save, $dompdf->output());

//print the pdf file to the screen for saving
header('Content-type: application/pdf');
header('Content-Disposition: inline; filename="'.$nome.'.pdf"');
header('Content-Transfer-Encoding: binary');
header('Content-Length: ' . filesize($file_to_save));
header('Accept-Ranges: bytes');
readfile($file_to_save);

//echo $html;

?>