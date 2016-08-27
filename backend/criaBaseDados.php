<?php

$usuario = "root";
$senha = "root";
$host = "127.0.0.1";
$slq_basedados ="";

// Create connection
$conn = new mysqli($host, $usuario, $senha );
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$slq_basedados = "DROP DATABASE BIRDS";
$conn->query($slq_basedados);

$slq_basedados = "CREATE DATABASE BIRDS DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;";

if($conn->query($slq_basedados)){
    echo "Base de Dados criada!";
}else{
    echo "Erro ao criar a Base de Dados";
}

//TABELA artigo
$slq_basedados = "CREATE TABLE IF NOT EXISTS BIRDS.artigo (id INT NOT NULL AUTO_INCREMENT,nome VARCHAR(300) NULL, referencia VARCHAR(500) NULL, PRIMARY KEY (id))ENGINE = InnoDB;";
$conn->query($slq_basedados);

//TABELA fichamento
$slq_basedados ="CREATE TABLE IF NOT EXISTS BIRDS.fichamento (id INT NULL AUTO_INCREMENT, artigo_id INT NOT NULL, PRIMARY KEY (id), CONSTRAINT fk_fichamento_artigo1 FOREIGN KEY (artigo_id) REFERENCES BIRDS.artigo (id)) ENGINE = InnoDB;";

$conn->query($slq_basedados);

//TABELA palavrachave
$slq_basedados = "CREATE TABLE IF NOT EXISTS BIRDS.palavrachave (id INT NULL AUTO_INCREMENT, nome VARCHAR(200) NULL,";
$slq_basedados .="PRIMARY KEY (id)) ENGINE = InnoDB;";

$conn->query($slq_basedados);

//TABELA nota
$slq_basedados ="CREATE TABLE IF NOT EXISTS BIRDS.nota (id INT NULL AUTO_INCREMENT, citacao TEXT NULL, reflexao TEXT NULL, fichamento_id INT NOT NULL, PRIMARY KEY (id),";
$slq_basedados .="CONSTRAINT fk_nota_fichamento1 FOREIGN KEY (fichamento_id) REFERENCES BIRDS.fichamento (id)) ENGINE = InnoDB;";
$conn->query($slq_basedados);

//TABELA TAG
$slq_basedados = "CREATE TABLE IF NOT EXISTS BIRDS.tag ( palavrachave_id INT NOT NULL, nota_id INT NOT NULL, PRIMARY KEY (palavrachave_id, nota_id),";
$slq_basedados .="CONSTRAINT fk_palavrachave_has_nota_palavrachave1 FOREIGN KEY (palavrachave_id)";
$slq_basedados .="REFERENCES BIRDS.palavrachave (id), CONSTRAINT fk_palavrachave_has_nota_nota1  FOREIGN KEY (nota_id)";
$slq_basedados .="REFERENCES BIRDS.nota (id)) ENGINE = InnoDB;";

$conn->query($slq_basedados);

//TABELA pesquisador
$slq_basedados = "CREATE TABLE IF NOT EXISTS BIRDS.pesquisador (id INT NULL AUTO_INCREMENT, nome VARCHAR(100) NULL, sobrenome VARCHAR(100) NULL,";
$slq_basedados .= "PRIMARY KEY (`id`)) ENGINE = InnoDB;";

$conn->query($slq_basedados);

//TABELA autor
$slq_basedados ="CREATE TABLE IF NOT EXISTS BIRDS.autor (pesquisador_id INT NOT NULL, artigo_id INT NOT NULL, PRIMARY KEY (pesquisador_id, artigo_id), CONSTRAINT fk_pesquisador_has_artigo_pesquisador1 ";
$slq_basedados .= "FOREIGN KEY (pesquisador_id)  REFERENCES BIRDS.pesquisador (id), CONSTRAINT fk_pesquisador_has_artigo_artigo1  FOREIGN KEY (artigo_id) REFERENCES BIRDS.artigo (id) ";
$slq_basedados .= ") ENGINE = InnoDB;";

$conn->query($slq_basedados);


$slq_basedados = "CREATE TABLE IF NOT EXISTS BIRDS.preferencia (idPreferencias INT NULL AUTO_INCREMENT,  nomeusuario VARCHAR(45) NULL,  senha VARCHAR(45) NULL,  login TINYINT(1) NULL,  localsalvamento VARCHAR(500) NULL, ";
$slq_basedados .="alertabackup INT NULL, PRIMARY KEY (idPreferencias)) ENGINE = InnoDB;";

$conn->query($slq_basedados);

include "../backend/conexaoBD_localhost.php";

$strInserePref = "insert into preferencia value(null,'user','12345',false,'../files/',1)";
$res = mysql_query($strInserePref) or die(mysql_error());

$conn->close();


?>