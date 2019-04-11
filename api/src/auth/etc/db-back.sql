-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema tournament-board
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema tournament-board
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tournament-board` DEFAULT CHARACTER SET utf8 ;
USE `tournament-board` ;

-- -----------------------------------------------------
-- Table `tournament-board`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tournament-board`.`user` (
  `created` DATETIME NOT NULL,
  `updated` DATETIME NOT NULL,
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `user_name` VARCHAR(255) NOT NULL,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tournament-board`.`tournament`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tournament-board`.`tournament` (
  `created` DATETIME NOT NULL,
  `updated` DATETIME NOT NULL,
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `userId` INT(11) NULL DEFAULT NULL,
  `startDateTime` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_dfe64d022fa7529fe0738812227` (`userId` ASC),
  CONSTRAINT `FK_dfe64d022fa7529fe0738812227`
    FOREIGN KEY (`userId`)
    REFERENCES `tournament-board`.`user` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 36
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tournament-board`.`league`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tournament-board`.`league` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `tournamentId` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_d2b5c3643a97e458fe51445c7a6` (`tournamentId` ASC),
  CONSTRAINT `FK_d2b5c3643a97e458fe51445c7a6`
    FOREIGN KEY (`tournamentId`)
    REFERENCES `tournament-board`.`tournament` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 71
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tournament-board`.`group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tournament-board`.`group` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `leagueId` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_8a34c12881a8f853d03f5f1903e` (`leagueId` ASC),
  CONSTRAINT `FK_8a34c12881a8f853d03f5f1903e`
    FOREIGN KEY (`leagueId`)
    REFERENCES `tournament-board`.`league` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 302
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tournament-board`.`round`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tournament-board`.`round` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `leagueId` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_e60e2d58962a17b45197ec43890` (`leagueId` ASC),
  CONSTRAINT `FK_e60e2d58962a17b45197ec43890`
    FOREIGN KEY (`leagueId`)
    REFERENCES `tournament-board`.`league` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 141
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tournament-board`.`team`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tournament-board`.`team` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `groupId` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_96d76e96e2b2b84a0e7e7305e5c` (`groupId` ASC),
  CONSTRAINT `FK_96d76e96e2b2b84a0e7e7305e5c`
    FOREIGN KEY (`groupId`)
    REFERENCES `tournament-board`.`group` (`id`)
    ON DELETE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 852
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tournament-board`.`referee`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tournament-board`.`referee` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tournament-board`.`match`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tournament-board`.`match` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `homeTeamScore` INT(11) NULL DEFAULT NULL,
  `outTeamScore` INT(11) NULL DEFAULT NULL,
  `matchNr` INT(11) NOT NULL,
  `hour` INT(11) NULL DEFAULT NULL,
  `minutes` INT(11) NULL DEFAULT NULL,
  `terrain` INT(11) NULL DEFAULT NULL,
  `homeTeamPenaltyScore` INT(11) NULL DEFAULT NULL,
  `outTeamPenaltyScore` INT(11) NULL DEFAULT NULL,
  `type` VARCHAR(255) NOT NULL,
  `homeTeamId` INT(11) NULL DEFAULT NULL,
  `outTeamId` INT(11) NULL DEFAULT NULL,
  `groupId` INT(11) NULL DEFAULT NULL,
  `roundId` INT(11) NULL DEFAULT NULL,
  `refereeId` INT(11) NULL DEFAULT NULL,
  `comment` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `IDX_4c90e9976d9356c8d4ec5013ff` (`type` ASC),
  INDEX `IDX_bbb587a08f732b69e1b416bc31` (`id` ASC, `type` ASC),
  INDEX `FK_1118562c3d9e68a7c7d680c7afd` (`roundId` ASC),
  INDEX `FK_64e4b0003b6e0a10d1e388e2641` (`groupId` ASC),
  INDEX `FK_d3af13a96b05bd93cf7c499dc20` (`refereeId` ASC),
  INDEX `FK_5caac1768e2f5b7b9c69b62090c` (`homeTeamId` ASC),
  INDEX `FK_71c2539818d05ededd8dcb1a483` (`outTeamId` ASC),
  CONSTRAINT `FK_1118562c3d9e68a7c7d680c7afd`
    FOREIGN KEY (`roundId`)
    REFERENCES `tournament-board`.`round` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `FK_5caac1768e2f5b7b9c69b62090c`
    FOREIGN KEY (`homeTeamId`)
    REFERENCES `tournament-board`.`team` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `FK_64e4b0003b6e0a10d1e388e2641`
    FOREIGN KEY (`groupId`)
    REFERENCES `tournament-board`.`group` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `FK_71c2539818d05ededd8dcb1a483`
    FOREIGN KEY (`outTeamId`)
    REFERENCES `tournament-board`.`team` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `FK_d3af13a96b05bd93cf7c499dc20`
    FOREIGN KEY (`refereeId`)
    REFERENCES `tournament-board`.`referee` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3510
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
