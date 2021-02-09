-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema winderful
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `winderful` ;

-- -----------------------------------------------------
-- Schema winderful
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `winderful` DEFAULT CHARACTER SET latin1 ;
USE `winderful` ;

-- -----------------------------------------------------
-- Table `winderful`.`paymentMethod`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `winderful`.`paymentMethod` ;

CREATE TABLE IF NOT EXISTS `winderful`.`paymentMethod` (
  `idpaymentMethod` INT NOT NULL,
  `method` VARCHAR(45) NOT NULL,
  `cardNumber` INT NOT NULL,
  `ccv` VARCHAR(45) NOT NULL,
  `buyerUser_idbuyerUser` INT NOT NULL,
  `buyerUser_cart_idcart` INT NOT NULL,
  PRIMARY KEY (`idpaymentMethod`, `buyerUser_idbuyerUser`, `buyerUser_cart_idcart`),
  INDEX `fk_paymentMethod_buyerUser1_idx` (`buyerUser_idbuyerUser` ASC, `buyerUser_cart_idcart` ASC),
  UNIQUE INDEX `cardNumber_UNIQUE` (`cardNumber` ASC),
  CONSTRAINT `fk_paymentMethod_buyerUser1`
    FOREIGN KEY (`buyerUser_idbuyerUser` , `buyerUser_cart_idcart`)
    REFERENCES `winderful`.`buyerUser` (`idbuyerUser` , `cart_idcart`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `winderful`.`adress`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `winderful`.`adress` ;

CREATE TABLE IF NOT EXISTS `winderful`.`adress` (
  `idadress` INT NOT NULL,
  `street_name` VARCHAR(45) NOT NULL,
  `street_number` INT NOT NULL,
  `apartment` INT NULL,
  `city` VARCHAR(45) NOT NULL,
  `zip_code` INT NOT NULL,
  `buyerUser_idbuyerUser` INT NOT NULL,
  `buyerUser_cart_idcart` INT NOT NULL,
  PRIMARY KEY (`idadress`, `buyerUser_idbuyerUser`, `buyerUser_cart_idcart`),
  INDEX `fk_adress_buyerUser1_idx` (`buyerUser_idbuyerUser` ASC, `buyerUser_cart_idcart` ASC),
  CONSTRAINT `fk_adress_buyerUser1`
    FOREIGN KEY (`buyerUser_idbuyerUser` , `buyerUser_cart_idcart`)
    REFERENCES `winderful`.`buyerUser` (`idbuyerUser` , `cart_idcart`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `winderful`.`cart`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `winderful`.`cart` ;

CREATE TABLE IF NOT EXISTS `winderful`.`cart` (
  `idcart` INT NOT NULL,
  `total_price` INT NULL,
  `paymentMethod_idpaymentMethod` INT NOT NULL,
  `adress_idadress` INT NOT NULL,
  PRIMARY KEY (`idcart`, `paymentMethod_idpaymentMethod`, `adress_idadress`),
  INDEX `fk_cart_paymentMethod1_idx` (`paymentMethod_idpaymentMethod` ASC),
  INDEX `fk_cart_adress1_idx` (`adress_idadress` ASC),
  CONSTRAINT `fk_cart_paymentMethod1`
    FOREIGN KEY (`paymentMethod_idpaymentMethod`)
    REFERENCES `winderful`.`paymentMethod` (`idpaymentMethod`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cart_adress1`
    FOREIGN KEY (`adress_idadress`)
    REFERENCES `winderful`.`adress` (`idadress`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `winderful`.`buyerUser`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `winderful`.`buyerUser` ;

CREATE TABLE IF NOT EXISTS `winderful`.`buyerUser` (
  `idbuyerUser` INT NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `dni` INT NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `image` VARCHAR(45) NOT NULL,
  `cart_idcart` INT NOT NULL,
  PRIMARY KEY (`idbuyerUser`, `cart_idcart`),
  UNIQUE INDEX `dni_UNIQUE` (`dni` ASC),
  INDEX `fk_buyerUser_cart1_idx` (`cart_idcart` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  CONSTRAINT `fk_buyerUser_cart1`
    FOREIGN KEY (`cart_idcart`)
    REFERENCES `winderful`.`cart` (`idcart`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `winderful`.`cellarUser`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `winderful`.`cellarUser` ;

CREATE TABLE IF NOT EXISTS `winderful`.`cellarUser` (
  `idcellarUser` INT NOT NULL,
  `cellar_name` VARCHAR(45) NOT NULL,
  `company_name` VARCHAR(45) NOT NULL,
  `cuit` INT NOT NULL,
  `country` VARCHAR(45) NOT NULL,
  `province` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `image` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idcellarUser`),
  UNIQUE INDEX `cuit_UNIQUE` (`cuit` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `winderful`.`products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `winderful`.`products` ;

CREATE TABLE IF NOT EXISTS `winderful`.`products` (
  `idproducts` INT NOT NULL,
  `product_name` VARCHAR(45) NOT NULL,
  `grape` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `year` INT NOT NULL,
  `aged` INT NULL,
  `temperature` INT NOT NULL,
  `price` INT NOT NULL,
  `image` VARCHAR(45) NOT NULL,
  `stock` INT NOT NULL,
  `discount` INT NULL,
  `cellarUser_idcellarUser` INT NOT NULL,
  PRIMARY KEY (`idproducts`, `cellarUser_idcellarUser`),
  INDEX `fk_products_cellarUser1_idx` (`cellarUser_idcellarUser` ASC),
  UNIQUE INDEX `product_name_UNIQUE` (`product_name` ASC),
  CONSTRAINT `fk_products_cellarUser1`
    FOREIGN KEY (`cellarUser_idcellarUser`)
    REFERENCES `winderful`.`cellarUser` (`idcellarUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `winderful`.`cart_products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `winderful`.`cart_products` ;

CREATE TABLE IF NOT EXISTS `winderful`.`cart_products` (
  `cart_idcart` INT NOT NULL,
  `products_idproducts` INT NOT NULL,
  `quantity` INT NULL,
  `partialPrice` INT NULL,
  PRIMARY KEY (`cart_idcart`, `products_idproducts`),
  INDEX `fk_cart_has_products_products1_idx` (`products_idproducts` ASC),
  INDEX `fk_cart_has_products_cart_idx` (`cart_idcart` ASC),
  CONSTRAINT `fk_cart_has_products_cart`
    FOREIGN KEY (`cart_idcart`)
    REFERENCES `winderful`.`cart` (`idcart`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cart_has_products_products1`
    FOREIGN KEY (`products_idproducts`)
    REFERENCES `winderful`.`products` (`idproducts`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
