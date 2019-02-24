CREATE DATABASE `tournament-board` /*!40100 DEFAULT CHARACTER SET utf8 */;
CREATE TABLE `group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `leagueId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_8a34c12881a8f853d03f5f1903e` (`leagueId`),
  CONSTRAINT `FK_8a34c12881a8f853d03f5f1903e` FOREIGN KEY (`leagueId`) REFERENCES `league` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `league` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `tournamentId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_d2b5c3643a97e458fe51445c7a6` (`tournamentId`),
  CONSTRAINT `FK_d2b5c3643a97e458fe51445c7a6` FOREIGN KEY (`tournamentId`) REFERENCES `tournament` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `match` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `homeTeamScore` int(11) NOT NULL,
  `outTeamScore` int(11) NOT NULL,
  `matchNr` int(11) NOT NULL,
  `hour` int(11) NOT NULL,
  `minutes` int(11) NOT NULL,
  `terrain` int(11) NOT NULL,
  `homeTeamPenaltyScore` int(11) DEFAULT NULL,
  `outTeamPenaltyScore` int(11) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `homeTeamId` int(11) DEFAULT NULL,
  `outTeamId` int(11) DEFAULT NULL,
  `groupId` int(11) DEFAULT NULL,
  `roundId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_4c90e9976d9356c8d4ec5013ff` (`type`),
  KEY `IDX_bbb587a08f732b69e1b416bc31` (`id`,`type`),
  KEY `FK_5caac1768e2f5b7b9c69b62090c` (`homeTeamId`),
  KEY `FK_71c2539818d05ededd8dcb1a483` (`outTeamId`),
  KEY `FK_64e4b0003b6e0a10d1e388e2641` (`groupId`),
  KEY `FK_1118562c3d9e68a7c7d680c7afd` (`roundId`),
  CONSTRAINT `FK_1118562c3d9e68a7c7d680c7afd` FOREIGN KEY (`roundId`) REFERENCES `round` (`id`),
  CONSTRAINT `FK_5caac1768e2f5b7b9c69b62090c` FOREIGN KEY (`homeTeamId`) REFERENCES `team` (`id`),
  CONSTRAINT `FK_64e4b0003b6e0a10d1e388e2641` FOREIGN KEY (`groupId`) REFERENCES `group` (`id`),
  CONSTRAINT `FK_71c2539818d05ededd8dcb1a483` FOREIGN KEY (`outTeamId`) REFERENCES `team` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `round` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `leagueId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_e60e2d58962a17b45197ec43890` (`leagueId`),
  CONSTRAINT `FK_e60e2d58962a17b45197ec43890` FOREIGN KEY (`leagueId`) REFERENCES `league` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `team` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `groupId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_96d76e96e2b2b84a0e7e7305e5c` (`groupId`),
  CONSTRAINT `FK_96d76e96e2b2b84a0e7e7305e5c` FOREIGN KEY (`groupId`) REFERENCES `group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `tournament` (
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_dfe64d022fa7529fe0738812227` (`userId`),
  CONSTRAINT `FK_dfe64d022fa7529fe0738812227` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `user` (
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
