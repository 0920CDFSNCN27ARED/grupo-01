-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema winederful
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `winederful` ;

-- -----------------------------------------------------
-- Schema winederful
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `winederful` DEFAULT CHARACTER SET latin1 ;
USE `winederful` ;

-- -----------------------------------------------------
-- Table `winederful`.`buyer_users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `winederful`.`buyer_users` ;

CREATE TABLE IF NOT EXISTS `winederful`.`buyer_users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NULL DEFAULT NULL,
  `lastName` VARCHAR(45) NULL DEFAULT NULL,
  `dni` BIGINT(10) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(450) NULL DEFAULT NULL,
  `image` VARCHAR(655) NULL DEFAULT NULL,
  `createdAt` TIMESTAMP NULL DEFAULT NULL,
  `updatedAt` TIMESTAMP NULL DEFAULT NULL,
  `deletedAt` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE UNIQUE INDEX `dni_UNIQUE` ON `winederful`.`buyer_users` (`dni` ASC);

CREATE UNIQUE INDEX `email_UNIQUE` ON `winederful`.`buyer_users` (`email` ASC);


-- -----------------------------------------------------
-- Table `winederful`.`addresses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `winederful`.`addresses` ;

CREATE TABLE IF NOT EXISTS `winederful`.`addresses` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `streetName` VARCHAR(45) NOT NULL,
  `streetNumber` INT(11) NOT NULL,
  `apartment` INT(11) NULL DEFAULT NULL,
  `city` VARCHAR(45) NOT NULL,
  `zipCode` INT(11) NOT NULL,
  `buyerUserId` INT(11) NOT NULL,
  `createdAt` TIMESTAMP NULL DEFAULT NULL,
  `updatedAt` TIMESTAMP NULL DEFAULT NULL,
  `deletedAt` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_addresses_buyer_users`
    FOREIGN KEY (`buyerUserId`)
    REFERENCES `winederful`.`buyer_users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE INDEX `fk_addresses_buyer_users_idx` ON `winederful`.`addresses` (`buyerUserId` ASC);


-- -----------------------------------------------------
-- Table `winederful`.`cellar_users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `winederful`.`cellar_users` ;

CREATE TABLE IF NOT EXISTS `winederful`.`cellar_users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `cellarName` VARCHAR(45) NULL DEFAULT NULL,
  `companyName` VARCHAR(45) NULL DEFAULT NULL,
  `cuit` BIGINT(12) NULL DEFAULT NULL,
  `country` VARCHAR(45) NULL DEFAULT NULL,
  `province` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `password` VARCHAR(200) NULL DEFAULT NULL,
  `image` VARCHAR(655) NULL DEFAULT NULL,
  `createdAt` TIMESTAMP NULL DEFAULT NULL,
  `updatedAt` TIMESTAMP NULL DEFAULT NULL,
  `deletedAt` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE UNIQUE INDEX `cuit_UNIQUE` ON `winederful`.`cellar_users` (`cuit` ASC);

CREATE UNIQUE INDEX `email_UNIQUE` ON `winederful`.`cellar_users` (`email` ASC);


-- -----------------------------------------------------
-- Table `winederful`.`orders`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `winederful`.`orders` ;

CREATE TABLE IF NOT EXISTS `winederful`.`orders` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `buyerUserId` INT(11) NOT NULL,
  `createdAt` TIMESTAMP NULL DEFAULT NULL,
  `updatedAt` TIMESTAMP NULL DEFAULT NULL,
  `deletedAt` TIMESTAMP NULL DEFAULT NULL,
  `addressId` INT(11),
  `statusId` INT(11) NOT NULL,
  `total` FLOAT(10,2) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_orders_addresses1`
    FOREIGN KEY (`addressId`)
    REFERENCES `winederful`.`addresses` (`id`)
    ON DELETE SET NULL
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_buyer_users1`
    FOREIGN KEY (`buyerUserId`)
    REFERENCES `winederful`.`buyer_users` (`id`),
  CONSTRAINT `fk_orders_status1`
    FOREIGN KEY (`statusId`)
    REFERENCES `winederful`.`status` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE INDEX `fk_orders_buyer_users1_idx` ON `winederful`.`orders` (`buyerUserId` ASC);

CREATE INDEX `fk_orders_addresses1_idx` ON `winederful`.`orders` (`addressId` ASC);


-- -----------------------------------------------------
-- Table `winederful`.`status`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `winederful`.`status` ;

CREATE TABLE IF NOT EXISTS `winederful`.`status` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `winederful`.`grapes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `winederful`.`grapes` ;

CREATE TABLE IF NOT EXISTS `winederful`.`grapes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
 CREATE UNIQUE INDEX `name_UNIQUE` ON `winederful`.`grapes` (`name` ASC);


-- -----------------------------------------------------
-- Table `winederful`.`products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `winederful`.`products` ;

CREATE TABLE IF NOT EXISTS `winederful`.`products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `productName` VARCHAR(45) NULL DEFAULT NULL,
  `description` VARCHAR(60000) NULL DEFAULT NULL,
  `year` VARCHAR(45) NULL DEFAULT NULL,
  `aged` VARCHAR(45) NULL DEFAULT NULL,
  `temperature` VARCHAR(45) NULL DEFAULT NULL,
  `price` DECIMAL(10,0) NULL DEFAULT NULL,
  `stock` INT(11) NULL DEFAULT NULL,
  `image` VARCHAR(655) NULL DEFAULT NULL,
  `discount` DECIMAL(10,0) NULL DEFAULT NULL,
  `cellarUserId` INT(11) NOT NULL,
  `createdAt` TIMESTAMP NULL DEFAULT NULL,
  `updatedAt` TIMESTAMP NULL DEFAULT NULL,
  `deletedAt` TIMESTAMP NULL DEFAULT NULL,
  `grapeId` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_products_cellar_users1`
    FOREIGN KEY (`cellarUserId`)
    REFERENCES `winederful`.`cellar_users` (`id`),
  CONSTRAINT `fk_products_grapes1`
    FOREIGN KEY (`grapeId`)
    REFERENCES `winederful`.`grapes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE UNIQUE INDEX `productName_UNIQUE` ON `winederful`.`products` (`productName` ASC);

CREATE INDEX `fk_products_cellar_users1_idx` ON `winederful`.`products` (`cellarUserId` ASC);

CREATE INDEX `fk_products_grapes1_idx` ON `winederful`.`products` (`grapeId` ASC);


-- -----------------------------------------------------
-- Table `winederful`.`order_items`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `winederful`.`order_items` ;

CREATE TABLE IF NOT EXISTS `winederful`.`order_items` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `subtotal` FLOAT(10,2) NULL DEFAULT NULL,
  `quantity` INT(11) NULL DEFAULT NULL,
  `price` FLOAT(10,2) NULL DEFAULT NULL,
  `discount` FLOAT(10,2) NULL DEFAULT NULL,
  `orderId` INT(11) NOT NULL,
  `productId` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_order_items_orders1`
    FOREIGN KEY (`orderId`)
    REFERENCES `winederful`.`orders` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_items_products1`
    FOREIGN KEY (`productId`)
    REFERENCES `winederful`.`products` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

CREATE INDEX `fk_order_items_orders1_idx` ON `winederful`.`order_items` (`orderId` ASC);

CREATE INDEX `fk_order_items_products1_idx` ON `winederful`.`order_items` (`productId` ASC);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
