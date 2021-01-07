CREATE TABLE `baca`.`user` (
  `iduser` INT NOT NULL,
  `user_name` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`iduser`),
  UNIQUE INDEX `iduser_UNIQUE` (`iduser` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`user_name` ASC) VISIBLE);

CREATE TABLE `baca`.`trip` (
  `idtrip` INT NOT NULL,
  `tripName` VARCHAR(45) NOT NULL,
  `destination` VARCHAR(45) NOT NULL,
  `startDate` DATE NOT NULL,
  `endDate` DATE NOT NULL,
  `userId` INT NOT NULL,
  UNIQUE INDEX `idtrip_UNIQUE` (`idtrip` ASC) VISIBLE,
  PRIMARY KEY (`idtrip`),
  INDEX `userId_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `userId`
    FOREIGN KEY (`userId`)
    REFERENCES `baca`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
