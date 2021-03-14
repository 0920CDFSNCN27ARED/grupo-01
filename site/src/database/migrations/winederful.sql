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
  PRIMARY KEY (`id`),
  UNIQUE INDEX `dni_UNIQUE` (`dni` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB

DEFAULT CHARACTER SET = latin1;


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
  INDEX `fk_addresses_buyer_users_idx` (`buyerUserId` ASC),
  CONSTRAINT `fk_addresses_buyer_users`
    FOREIGN KEY (`buyerUserId`)
    REFERENCES `winederful`.`buyer_users` (`id`))
ENGINE = InnoDB

DEFAULT CHARACTER SET = latin1;


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
  PRIMARY KEY (`id`),
  UNIQUE INDEX `cuit_UNIQUE` (`cuit` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB

DEFAULT CHARACTER SET = latin1;


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
  `addressId` INT(11) NOT NULL,
  `total` FLOAT(10,2) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_orders_buyer_users1_idx` (`buyerUserId` ASC),
  INDEX `fk_orders_addresses1_idx` (`addressId` ASC),
  CONSTRAINT `fk_orders_addresses1`
    FOREIGN KEY (`addressId`)
    REFERENCES `winederful`.`addresses` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_buyer_users1`
    FOREIGN KEY (`buyerUserId`)
    REFERENCES `winederful`.`buyer_users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `winederful`.`products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `winederful`.`products` ;

CREATE TABLE IF NOT EXISTS `winederful`.`products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `productName` VARCHAR(45) NULL DEFAULT NULL,
  `grape` VARCHAR(45) NULL DEFAULT NULL,
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
  PRIMARY KEY (`id`),
  UNIQUE INDEX `productName_UNIQUE` (`productName` ASC),
  INDEX `fk_products_cellar_users1_idx` (`cellarUserId` ASC),
  CONSTRAINT `fk_products_cellar_users1`
    FOREIGN KEY (`cellarUserId`)
    REFERENCES `winederful`.`cellar_users` (`id`))
ENGINE = InnoDB

DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `winederful`.`order_items`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `winederful`.`order_items` ;

CREATE TABLE IF NOT EXISTS `winederful`.`order_items` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `subtotal` FLOAT(10,2) NULL,
  `quantity` INT NULL,
  `price` FLOAT(10,2) NULL,
  `discount` FLOAT(10,2) NULL,
  `orderId` INT(11) NOT NULL,
  `productId` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_order_items_orders1_idx` (`orderId` ASC),
  INDEX `fk_order_items_products1_idx` (`productId` ASC),
  CONSTRAINT `fk_order_items_orders1`
    FOREIGN KEY (`orderId`)
    REFERENCES `winederful`.`orders` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_order_items_products1 `
    FOREIGN KEY (`productId`)
    REFERENCES `winederful`.`products` (`id`)ON DELETE CASCADE
)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
