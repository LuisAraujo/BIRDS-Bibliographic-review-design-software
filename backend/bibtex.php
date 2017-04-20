<?php

$b = "@article{carr2013increasing,
  title={Increasing the Effectiveness of Homework for All Learners in the},
  author={Carr, Scrat Nichole},
  year={2013}}";

//echo $b;

$state = "";
$titulo = "";
$autor = "";

$b = trim(preg_replace('/\s\s+/', ' ', $b));

$bib_ex =  explode("{", $b);
$chamada = explode(",", $bib_ex[1])[0];
echo $chamada;

for($i= 0; $i < count($bib_ex); $i++){

    if($titulo == ""){

        $temp = explode(",", $bib_ex[$i]);
        $t = str_replace(' ','', $temp[count($temp)-1]);
        $t = str_replace('=', '',$t);

        if($t == 'title'){
            $titulo = explode("}", $bib_ex[$i+1])[0];
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

//echo "<br><br><br><br>";
echo $titulo."<br>";


$listautor = explode("and", $autor);

for($i= 0; $i < count($listautor); $i++){
    //echo $listautor[$i]."<br>";
}


?>
