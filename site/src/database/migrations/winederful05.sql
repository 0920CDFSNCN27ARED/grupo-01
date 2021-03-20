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
  `grapesId` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `productName_UNIQUE` (`productName` ASC) VISIBLE,
  INDEX `fk_products_cellar_users1_idx` (`cellarUserId` ASC) VISIBLE,
  INDEX `fk_products_grapes1_idx` (`grapesId` ASC) VISIBLE,
  CONSTRAINT `fk_products_cellar_users1`
    FOREIGN KEY (`cellarUserId`)
    REFERENCES `winederful`.`cellar_users` (`id`),
  CONSTRAINT `fk_products_grapes1`
    FOREIGN KEY (`grapesId`)
    REFERENCES `mydb`.`grapes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 28
DEFAULT CHARACTER SET = latin1;


CREATE TABLE `winederful`.`grapes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));
