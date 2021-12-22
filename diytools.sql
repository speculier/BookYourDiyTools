SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+01:00";

USE mysql;

DROP USER 'diydbaccess'@'localhost';
DROP USER 'diydbaccess'@'%';
select SLEEP(1);
CREATE USER 'diydbaccess'@'localhost' IDENTIFIED BY 'mysqlpwd';
CREATE USER 'diydbaccess'@'%' IDENTIFIED BY 'mysqlpwd';

DROP DATABASE IF EXISTS `diytools`;
CREATE DATABASE `diytools` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;

GRANT ALL PRIVILEGES ON diytools.* TO 'diydbaccess'@'localhost';
GRANT ALL PRIVILEGES ON diytools.* TO 'diydbaccess'@'%';
FLUSH PRIVILEGES;

USE `diytools`;

-- DROP
DROP TABLE IF EXISTS `diytool`;
DROP TABLE IF EXISTS `diytool_general_infos`;
DROP TABLE IF EXISTS `diytool_state_infos`;
DROP TABLE IF EXISTS `diytool_states`;

-- CREATE TABLE + ALTER
CREATE TABLE `diytool_states` (
  `id` INTEGER UNSIGNED NOT NULL,
  `label` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
ALTER TABLE `diytool_states` ADD PRIMARY KEY (`id`);
ALTER TABLE `diytool_states` MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;COMMIT;

-- CREATE TABLE + ALTER
CREATE TABLE `diytool_categories` (
  `id` INTEGER UNSIGNED NOT NULL,
  `label` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
ALTER TABLE `diytool_categories` ADD PRIMARY KEY (`id`);
ALTER TABLE `diytool_categories` MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;COMMIT;

CREATE TABLE `diytool_general_infos` (
  `id` INTEGER UNSIGNED NOT NULL,
  `trademark` varchar(48) NOT NULL,
  `category_id` INTEGER UNSIGNED NOT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `instructions` varchar(50000) DEFAULT NULL,
  `place` varchar(2) NOT NULL,
  FOREIGN KEY (category_id) REFERENCES diytool_categories(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
ALTER TABLE `diytool_general_infos` ADD PRIMARY KEY (`id`);
ALTER TABLE `diytool_general_infos` MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;COMMIT;

CREATE TABLE `diytool_state_infos` (
  `id` INTEGER UNSIGNED NOT NULL,
  `state_id` INTEGER UNSIGNED NOT NULL,
  `isbeingrepaired` tinyint(1) NOT NULL DEFAULT '0',
  `isbroken` tinyint(1) NOT NULL DEFAULT '0',
   FOREIGN KEY (state_id) REFERENCES diytool_states(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
ALTER TABLE `diytool_state_infos` ADD PRIMARY KEY (`id`);
ALTER TABLE `diytool_state_infos` MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;COMMIT;

CREATE TABLE `diytool` (
  `id` INTEGER UNSIGNED NOT NULL,
  `label` varchar(128) NOT NULL,
  `booked` tinyint(1) NOT NULL DEFAULT '0',
  `general_infos_id` INTEGER UNSIGNED NOT NULL,
  `state_infos_id` INTEGER UNSIGNED NOT NULL,
  `data` json DEFAULT NULL,
  FOREIGN KEY (general_infos_id) REFERENCES diytool_general_infos(id),
  FOREIGN KEY (state_infos_id) REFERENCES diytool_state_infos(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
ALTER TABLE `diytool` ADD PRIMARY KEY (`id`);
ALTER TABLE `diytool` MODIFY `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;COMMIT;

-- INSERT
INSERT INTO `diytool_states` (`label`) VALUES ('Ponceuse');
INSERT INTO `diytool_states` (`label`) VALUES ('Taille haie');
INSERT INTO `diytool_states` (`label`) VALUES ('Perceuse');
INSERT INTO `diytool_states` (`label`) VALUES ('Detection');
INSERT INTO `diytool_states` (`label`) VALUES ('Remorque');
INSERT INTO `diytool_states` (`label`) VALUES ('Nettoyeur haute pression');
INSERT INTO `diytool_states` (`label`) VALUES ('Meches / DSD');
INSERT INTO `diytool_states` (`label`) VALUES ('Demenagement');
COMMIT;

INSERT INTO `diytool_categories` (`label`) VALUES ('Neuf');
INSERT INTO `diytool_categories` (`label`) VALUES ('Bon etat');
INSERT INTO `diytool_categories` (`label`) VALUES ('Etat satisfaisant');
INSERT INTO `diytool_categories` (`label`) VALUES ('Mauvais etat');
INSERT INTO `diytool_categories` (`label`) VALUES ('Tres mauvais etat');
COMMIT;

INSERT INTO `diytool_state_infos` (`state_id`, `isbeingrepaired`, `isbroken`) VALUES (5, 0, 1);
INSERT INTO `diytool_general_infos` (`trademark`, `category`, `description`, `instructions`, `place`) VALUES ('Kubota', 'HEDGE_TRIMMER', 'Taille haie nul à chier', 'RAS', 'C1');
INSERT INTO `diytool` (`label`, `booked`, `general_infos_id`, `state_infos_id`, `data`) VALUES ('Taille haie 1', 1, 1, 1, '{"label":"Taille haie 1","booked":false,"generalInfos":{"description":"Taille haie nul à chier","place":"C1","category":"Taille haie","tradeMark":"Kubota"},"stateInfos":{"state":"Très mauvais état","isBeingRepaired":false,"isBroken":true},"currentBookingInfos":{"bookerFirstName":"Anthony","bookerLastName":"HAMEL","bookerPhoneNumber":"0612345678","bookerBackDate":"2021-11-30T14:09:21.280Z"},"bookingHistory":[{"bookerFirstName":"Sébastien","bookerLastName":"PECULIER","bookerPhoneNumber":"0612345678","bookerBackDate":"2021-11-30T14:09:21.280Z","bookerRating":0}],"currentRepairInfos":{"repairDescription":"f","contactFirstName":"Ioan","contactLastName":"LE GUE","repairCompanyName":"AAAA","repairBackDate":"2021-11-30T14:09:21.280Z","repairRating":7},"repairHistory":[{"repairDescription":"c","contactFirstName":"Patrick","contactLastName":"CHOUPIN","repairCompanyName":"REPARTOUBONJOUR","repairBackDate":"2021-11-30T14:09:21.280Z","repairRating":10},{"repairDescription":"d","contactFirstName":"Stéphane","contactLastName":"PERNOT","repairCompanyName":"CADEPANNE44","repairBackDate":"2021-11-30T14:09:21.280Z","repairRating":5},{"repairDescription":"e","contactFirstName":"Olivier","contactLastName":"LABONNE","repairCompanyName":"Olvier LABONNE","repairBackDate":"2021-11-30T14:09:21.280Z","repairRating":2}]}');
COMMIT;

INSERT INTO `diytool_state_infos` (`state_id`, `isbeingrepaired`, `isbroken`) VALUES (2, 0, 0);
INSERT INTO `diytool_general_infos` (`trademark`, `category`, `description`, `instructions`, `place`) VALUES ('Black & Decker', 'HEDGE_TRIMMER', 'Taille haie en bon état', NULL, 'C2');
INSERT INTO `diytool` (`label`, `booked`, `general_infos_id`, `state_infos_id`, `data`) VALUES ('Taille haie 2', 0, 2, 2, '{"label":"Taille haie 2","booked":false,"generalInfos":{"description":"Taille haie en bon état","place":"C2","category":"Taille haie","tradeMark":"Black & Decker"},"stateInfos":{"state":"Bon état","isBeingRepaired":false,"isBroken":false},"currentBookingInfos":{"bookerFirstName":"Christohe","bookerLastName":"COUTINEAU","bookerPhoneNumber":"0612345678","bookerBackDate":"2021-11-30T14:09:21.280Z"},"repairHistory":[{"repairDescription":"b","contactFirstName":"Sébastien","contactLastName":"PECULIER","repairCompanyName":"DEPANNE2000","repairBackDate":"2021-11-30T14:09:21.280Z","repairRating":1}]}');
COMMIT;

INSERT INTO `diytool_state_infos` (`state_id`, `isbeingrepaired`, `isbroken`) VALUES (1, 0, 0);
INSERT INTO `diytool_general_infos` (`trademark`, `category`, `description`, `instructions`, `place`) VALUES ('Black & Decker', 'HEDGE_TRIMMER', 'Taille haie vert', NULL, 'C3');
INSERT INTO `diytool` (`label`, `booked`, `general_infos_id`, `state_infos_id`, `data`) VALUES ('Taille haie 3', 0, 3, 3, '{"label":"Taille haie 3","booked":false,"generalInfos":{"description":"Taille haie vert","place":"C3","category":"Taille haie","tradeMark":"Black & Decker"},"stateInfos":{"state":"Neuf","isBeingRepaired":false,"isBroken":false},"currentBookingInfos":{"bookerFirstName":"Christohe","bookerLastName":"OLIVAUD","bookerPhoneNumber":"0612345678","bookerBackDate":"2021-11-30T14:09:21.280Z"}}');
COMMIT;

INSERT INTO `diytool_state_infos` (`state_id`, `isbeingrepaired`, `isbroken`) VALUES (1, 0, 0);
INSERT INTO `diytool_general_infos` (`trademark`, `category`, `description`, `instructions`, `place`) VALUES ('Bosch', 'SANDER', 'Ponceuse d\'angle', NULL, 'A1');
INSERT INTO `diytool` (`label`, `booked`, `general_infos_id`, `state_infos_id`, `data`) VALUES ('Ponceuse 1', 0, 4, 4, '{"label":"Ponceuse 1","booked":false,"generalInfos":{"description":"Ponceuse d\'angle","place":"A1","category":"Ponceuse","tradeMark":"Bosch"},"stateInfos":{"state":"Neuf","isBeingRepaired":false,"isBroken":false},"currentBookingInfos":{"bookerFirstName":"Frédéric","bookerLastName":"MARTIENNE","bookerPhoneNumber":"0612345678","bookerBackDate":"2021-11-30T14:09:21.280Z"}}');
COMMIT;

INSERT INTO `diytool_state_infos` (`state_id`, `isbeingrepaired`, `isbroken`) VALUES (2, 0, 1);
INSERT INTO `diytool_general_infos` (`trademark`, `category`, `description`, `instructions`, `place`) VALUES ('Hilti', 'DRILL', 'Perceuse Hilti sur batterie', 'Faire gaffe !', 'H1');
INSERT INTO `diytool` (`label`, `booked`, `general_infos_id`, `state_infos_id`, `data`) VALUES ('Perceuse Hilti 2', 0, 5, 5, '{"label":"Perceuse Hilti sur batterie","booked":false,"generalInfos":{"description":"Perceuse Hilti","place":"H1","category":"Perceuse","tradeMark":"Hilti","instructionsForUse":"Instruction 1"},"stateInfos":{"state":"Bon état","isBeingRepaired":false,"isBroken":true},"currentBookingInfos":{"bookerFirstName":"Ioan","bookerLastName":"LE GUE","bookerPhoneNumber":"0612345678","bookerBackDate":"2021-11-30T14:09:21.280Z"},"bookingHistory":[{"bookerFirstName":"Thierry","bookerLastName":"JILIBERT","bookerPhoneNumber":"060000000000","bookerBackDate":"2021-11-30T14:09:21.280Z","bookerRating":10},{"bookerFirstName":"Freddy","bookerLastName":"ROBERGE","bookerPhoneNumber":"061111111111","bookerBackDate":"2021-11-30T14:09:21.280Z","bookerRating":5},{"bookerFirstName":"Guillaume","bookerLastName":"BARANGER","bookerPhoneNumber":"073333333333","bookerBackDate":"2021-11-30T14:09:21.280Z","bookerRating":3}],"currentRepairInfos":{"repairDescription":"a","contactFirstName":"Johan","contactLastName":"PECOT","repairCompanyName":"BBBBBBBB","repairBackDate":"2021-11-30T14:09:21.280Z","repairRating":7}}');
COMMIT;
