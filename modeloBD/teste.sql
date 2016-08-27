SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `BIRDS` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `BIRDS` ;

-- -----------------------------------------------------
-- Table `BIRDS`.`artigo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BIRDS`.`artigo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(300) NULL,
  `referencia` VARCHAR(500) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BIRDS`.`fichamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BIRDS`.`fichamento` (
  `id` INT NULL AUTO_INCREMENT,
  `artigo_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_fichamento_artigo1_idx` (`artigo_id` ASC),
  CONSTRAINT `fk_fichamento_artigo1`
    FOREIGN KEY (`artigo_id`)
    REFERENCES `BIRDS`.`artigo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BIRDS`.`palavrachave`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BIRDS`.`palavrachave` (
  `id` INT NULL AUTO_INCREMENT,
  `nome` VARCHAR(200) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BIRDS`.`tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BIRDS`.`tag` (
  `palavrachave_id` INT NOT NULL,
  `nota_id` INT NOT NULL,
  PRIMARY KEY (`palavrachave_id`, `nota_id`),
  INDEX `fk_palavrachave_has_nota_nota1_idx` (`nota_id` ASC),
  INDEX `fk_palavrachave_has_nota_palavrachave1_idx` (`palavrachave_id` ASC),
  CONSTRAINT `fk_palavrachave_has_nota_palavrachave1`
    FOREIGN KEY (`palavrachave_id`)
    REFERENCES `BIRDS`.`palavrachave` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_palavrachave_has_nota_nota1`
    FOREIGN KEY (`nota_id`)
    REFERENCES `BIRDS`.`nota` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BIRDS`.`pesquisador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BIRDS`.`pesquisador` (
  `id` INT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NULL,
  `sobrenome` VARCHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BIRDS`.`autor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BIRDS`.`autor` (
  `pesquisador_id` INT NOT NULL,
  `artigo_id` INT NOT NULL,
  PRIMARY KEY (`pesquisador_id`, `artigo_id`),
  INDEX `fk_pesquisador_has_artigo_artigo1_idx` (`artigo_id` ASC),
  INDEX `fk_pesquisador_has_artigo_pesquisador1_idx` (`pesquisador_id` ASC),
  CONSTRAINT `fk_pesquisador_has_artigo_pesquisador1`
    FOREIGN KEY (`pesquisador_id`)
    REFERENCES `BIRDS`.`pesquisador` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pesquisador_has_artigo_artigo1`
    FOREIGN KEY (`artigo_id`)
    REFERENCES `BIRDS`.`artigo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BIRDS`.`nota`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BIRDS`.`nota` (
  `id` INT NULL AUTO_INCREMENT,
  `citacao` TEXT NULL,
  `reflexao` TEXT NULL,
  `fichamento_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_nota_fichamento1_idx` (`fichamento_id` ASC),
  CONSTRAINT `fk_nota_fichamento1`
    FOREIGN KEY (`fichamento_id`)
    REFERENCES `BIRDS`.`fichamento` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BIRDS`.`tag`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BIRDS`.`tag` (
  `palavrachave_id` INT NOT NULL,
  `nota_id` INT NOT NULL,
  PRIMARY KEY (`palavrachave_id`, `nota_id`),
  INDEX `fk_palavrachave_has_nota_nota1_idx` (`nota_id` ASC),
  INDEX `fk_palavrachave_has_nota_palavrachave1_idx` (`palavrachave_id` ASC),
  CONSTRAINT `fk_palavrachave_has_nota_palavrachave1`
    FOREIGN KEY (`palavrachave_id`)
    REFERENCES `BIRDS`.`palavrachave` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_palavrachave_has_nota_nota1`
    FOREIGN KEY (`nota_id`)
    REFERENCES `BIRDS`.`nota` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BIRDS`.`preferencia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BIRDS`.`preferencia` (
  `idPreferencias` INT NULL AUTO_INCREMENT,
  `nomeusuario` VARCHAR(45) NULL,
  `senha` VARCHAR(45) NULL,
  `login` TINYINT(1) NULL,
  `localsalvamento` VARCHAR(500) NULL,
  `alertabackup` INT NULL,
  PRIMARY KEY (`idPreferencias`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
