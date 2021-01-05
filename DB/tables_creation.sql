CREATE TABLE `baca`.`user` (
  `iduser` INT NOT NULL,
  `user_name` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`iduser`),
  UNIQUE INDEX `iduser_UNIQUE` (`iduser` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`user_name` ASC) VISIBLE);

//

