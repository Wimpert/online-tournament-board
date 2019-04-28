-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Gegenereerd op: 28 apr 2019 om 19:04
-- Serverversie: 5.5.60-MariaDB
-- PHP-versie: 7.1.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tornooi`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `group`
--

CREATE TABLE `group` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `leagueId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `group`
--

INSERT INTO `group` (`id`, `name`, `leagueId`) VALUES
(36, 'A', 9),
(37, 'B', 9),
(38, 'C', 9),
(39, 'D', 9),
(40, 'E', 9),
(41, 'F', 9),
(42, 'G', 9),
(43, 'H', 9),
(44, 'Vrouwen', 10);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `league`
--

CREATE TABLE `league` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `tournamentId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `league`
--

INSERT INTO `league` (`id`, `name`, `tournamentId`) VALUES
(9, 'Mannen', 5),
(10, 'Vrouwen', 5);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `match`
--

CREATE TABLE `match` (
  `id` int(11) NOT NULL,
  `homeTeamScore` int(11) DEFAULT NULL,
  `outTeamScore` int(11) DEFAULT NULL,
  `matchNr` int(11) NOT NULL,
  `hour` int(11) DEFAULT NULL,
  `minutes` int(11) DEFAULT NULL,
  `terrain` int(11) DEFAULT NULL,
  `homeTeamPenaltyScore` int(11) DEFAULT NULL,
  `outTeamPenaltyScore` int(11) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `homeTeamId` int(11) DEFAULT NULL,
  `outTeamId` int(11) DEFAULT NULL,
  `groupId` int(11) DEFAULT NULL,
  `roundId` int(11) DEFAULT NULL,
  `refereeId` int(11) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `match`
--

INSERT INTO `match` (`id`, `homeTeamScore`, `outTeamScore`, `matchNr`, `hour`, `minutes`, `terrain`, `homeTeamPenaltyScore`, `outTeamPenaltyScore`, `type`, `homeTeamId`, `outTeamId`, `groupId`, `roundId`, `refereeId`, `comment`) VALUES
(467, NULL, NULL, 49, 13, 15, 2, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 17, NULL, '1 tot 16'),
(468, NULL, NULL, 50, 13, 15, 3, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 17, NULL, '1 tot 16'),
(469, NULL, NULL, 51, 13, 15, 4, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 17, NULL, '1 tot 16'),
(470, NULL, NULL, 52, 13, 15, 5, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 17, NULL, '1 tot 16'),
(471, NULL, NULL, 53, 13, 15, 6, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 17, NULL, '1 tot 16'),
(472, NULL, NULL, 54, 13, 15, 7, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 17, NULL, '1 tot 16'),
(473, NULL, NULL, 55, 13, 15, 8, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 17, NULL, '1 tot 16'),
(474, NULL, NULL, 56, 13, 15, 9, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 17, NULL, '1 tot 16'),
(475, NULL, NULL, 57, 12, 30, 2, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 17, NULL, '17 to 32'),
(476, NULL, NULL, 58, 12, 30, 3, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 17, NULL, '17 to 32'),
(477, NULL, NULL, 59, 12, 30, 4, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 17, NULL, '17 to 32'),
(478, NULL, NULL, 60, 12, 30, 5, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 17, NULL, '17 to 32'),
(479, NULL, NULL, 61, 12, 30, 6, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 17, NULL, '17 to 32'),
(480, NULL, NULL, 62, 12, 30, 7, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 17, NULL, '17 to 32'),
(481, NULL, NULL, 63, 12, 30, 8, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 17, NULL, '17 to 32'),
(482, NULL, NULL, 64, 12, 30, 9, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 17, NULL, '17 to 32'),
(483, NULL, NULL, 65, 14, 45, 2, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 18, NULL, '1 tot 8'),
(484, NULL, NULL, 66, 14, 45, 3, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 18, NULL, '1 tot 8'),
(485, NULL, NULL, 67, 14, 45, 4, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 18, NULL, '1 tot 8'),
(486, NULL, NULL, 68, 14, 45, 5, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 18, NULL, '1 tot 8'),
(487, NULL, NULL, 69, 14, 45, 6, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 18, NULL, '9 tot 16'),
(488, NULL, NULL, 70, 14, 45, 7, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 18, NULL, '9 tot 16'),
(489, NULL, NULL, 71, 14, 45, 8, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 18, NULL, '9 tot 16'),
(490, NULL, NULL, 72, 14, 45, 9, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 18, NULL, '9 tot 16'),
(491, NULL, NULL, 73, 14, 0, 2, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 18, NULL, '17 tot 24'),
(492, NULL, NULL, 74, 14, 0, 3, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 18, NULL, '17 tot 24'),
(493, NULL, NULL, 75, 14, 0, 4, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 18, NULL, '17 tot 24'),
(494, NULL, NULL, 76, 14, 0, 5, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 18, NULL, '17 tot 24'),
(495, NULL, NULL, 77, 14, 0, 6, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 18, NULL, '25 tot 32'),
(496, NULL, NULL, 78, 14, 0, 7, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 18, NULL, '25 tot 32'),
(497, NULL, NULL, 79, 14, 0, 8, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 18, NULL, '25 tot 32'),
(498, NULL, NULL, 80, 14, 0, 9, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 18, NULL, '25 tot 32'),
(499, NULL, NULL, 81, 16, 15, 2, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 19, NULL, '1 tot 4'),
(500, NULL, NULL, 82, 16, 15, 3, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 19, NULL, '1 tot 4'),
(501, NULL, NULL, 83, 16, 15, 4, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 19, NULL, '5 tot 8'),
(502, NULL, NULL, 84, 16, 15, 5, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 19, NULL, '5 tot 8'),
(503, NULL, NULL, 85, 16, 15, 6, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 19, NULL, '9 tot 12'),
(504, NULL, NULL, 86, 16, 15, 7, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 19, NULL, '9 tot 12'),
(505, NULL, NULL, 87, 16, 15, 8, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 19, NULL, '13 tot 16'),
(506, NULL, NULL, 88, 16, 15, 9, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 19, NULL, '13 tot 16'),
(507, NULL, NULL, 89, 15, 30, 2, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 19, NULL, '17 tot 20'),
(508, NULL, NULL, 90, 15, 30, 3, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 19, NULL, '17 tot 20'),
(509, NULL, NULL, 91, 15, 30, 4, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 19, NULL, '21 tot 24'),
(510, NULL, NULL, 92, 15, 30, 5, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 19, NULL, '21 tot 24'),
(511, NULL, NULL, 93, 15, 30, 6, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 19, NULL, '25 tot 28'),
(512, NULL, NULL, 94, 15, 30, 7, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 19, NULL, '25 tot 28'),
(513, NULL, NULL, 95, 15, 30, 8, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 19, NULL, '29 tot 32'),
(514, NULL, NULL, 96, 15, 30, 9, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 19, NULL, '29 tot 32'),
(515, NULL, NULL, 97, 18, 0, 1, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 20, NULL, 'Finale'),
(516, NULL, NULL, 98, 17, 30, 3, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 20, NULL, '3 tot 4'),
(517, NULL, NULL, 99, 17, 30, 4, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 20, NULL, '5 tot 6'),
(518, NULL, NULL, 100, 17, 30, 5, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 20, NULL, '7 tot 8'),
(519, NULL, NULL, 101, 17, 30, 6, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 20, NULL, '9 tot 10'),
(520, NULL, NULL, 102, 17, 30, 7, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 20, NULL, '11 tot 12'),
(521, NULL, NULL, 103, 17, 30, 8, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 20, NULL, '13 tot 14'),
(522, NULL, NULL, 104, 17, 30, 9, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 20, NULL, '15 tot 16'),
(523, NULL, NULL, 105, 17, 0, 2, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 20, NULL, '17 tot 18'),
(524, NULL, NULL, 106, 17, 0, 3, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 20, NULL, '19 tot 20'),
(525, NULL, NULL, 107, 17, 0, 4, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 20, NULL, '21 tot 22'),
(526, NULL, NULL, 108, 17, 0, 5, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 20, NULL, '23 tot 24'),
(527, NULL, NULL, 109, 17, 0, 6, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 20, NULL, '25 tot 26'),
(528, NULL, NULL, 110, 17, 0, 7, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 20, NULL, '27 tot 2'),
(529, NULL, NULL, 111, 17, 0, 8, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 20, NULL, '29 tot 30'),
(530, NULL, NULL, 112, 17, 0, 9, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 20, NULL, '31 tot 32'),
(531, NULL, NULL, 1, 9, 0, 1, NULL, NULL, 'GroupMatch', 135, 136, 36, NULL, NULL, NULL),
(532, NULL, NULL, 2, 9, 0, 2, NULL, NULL, 'GroupMatch', 137, 138, 36, NULL, NULL, NULL),
(533, NULL, NULL, 3, 10, 0, 1, NULL, NULL, 'GroupMatch', 135, 137, 36, NULL, NULL, NULL),
(534, NULL, NULL, 4, 10, 0, 2, NULL, NULL, 'GroupMatch', 138, 136, 36, NULL, NULL, NULL),
(535, NULL, NULL, 5, 11, 0, 1, NULL, NULL, 'GroupMatch', 138, 135, 36, NULL, NULL, NULL),
(536, NULL, NULL, 6, 11, 0, 2, NULL, NULL, 'GroupMatch', 136, 137, 36, NULL, NULL, NULL),
(537, NULL, NULL, 7, 9, 0, 3, NULL, NULL, 'GroupMatch', 139, 140, 37, NULL, NULL, NULL),
(538, NULL, NULL, 8, 9, 0, 4, NULL, NULL, 'GroupMatch', 141, 142, 37, NULL, NULL, NULL),
(539, NULL, NULL, 9, 10, 0, 3, NULL, NULL, 'GroupMatch', 139, 141, 37, NULL, NULL, NULL),
(540, NULL, NULL, 10, 10, 0, 4, NULL, NULL, 'GroupMatch', 142, 140, 37, NULL, NULL, NULL),
(541, NULL, NULL, 11, 11, 0, 3, NULL, NULL, 'GroupMatch', 142, 139, 37, NULL, NULL, NULL),
(542, NULL, NULL, 12, 11, 0, 4, NULL, NULL, 'GroupMatch', 140, 141, 37, NULL, NULL, NULL),
(543, NULL, NULL, 13, 9, 0, 5, NULL, NULL, 'GroupMatch', 143, 144, 38, NULL, NULL, NULL),
(544, NULL, NULL, 14, 9, 0, 6, NULL, NULL, 'GroupMatch', 145, 146, 38, NULL, NULL, NULL),
(545, NULL, NULL, 15, 10, 0, 5, NULL, NULL, 'GroupMatch', 143, 145, 38, NULL, NULL, NULL),
(546, NULL, NULL, 16, 10, 0, 6, NULL, NULL, 'GroupMatch', 146, 144, 38, NULL, NULL, NULL),
(547, NULL, NULL, 17, 11, 0, 5, NULL, NULL, 'GroupMatch', 146, 143, 38, NULL, NULL, NULL),
(548, NULL, NULL, 18, 11, 0, 6, NULL, NULL, 'GroupMatch', 144, 145, 38, NULL, NULL, NULL),
(549, NULL, NULL, 19, 9, 0, 7, NULL, NULL, 'GroupMatch', 147, 148, 39, NULL, NULL, NULL),
(550, NULL, NULL, 20, 9, 0, 8, NULL, NULL, 'GroupMatch', 149, 150, 39, NULL, NULL, NULL),
(551, NULL, NULL, 21, 10, 0, 7, NULL, NULL, 'GroupMatch', 147, 149, 39, NULL, NULL, NULL),
(552, NULL, NULL, 22, 10, 0, 8, NULL, NULL, 'GroupMatch', 150, 148, 39, NULL, NULL, NULL),
(553, NULL, NULL, 23, 11, 0, 7, NULL, NULL, 'GroupMatch', 150, 147, 39, NULL, NULL, NULL),
(554, NULL, NULL, 24, 11, 0, 8, NULL, NULL, 'GroupMatch', 148, 149, 39, NULL, NULL, NULL),
(555, NULL, NULL, 25, 9, 30, 1, NULL, NULL, 'GroupMatch', 151, 152, 40, NULL, NULL, NULL),
(556, NULL, NULL, 26, 9, 30, 2, NULL, NULL, 'GroupMatch', 153, 154, 40, NULL, NULL, NULL),
(557, NULL, NULL, 27, 10, 30, 1, NULL, NULL, 'GroupMatch', 151, 153, 40, NULL, NULL, NULL),
(558, NULL, NULL, 28, 10, 30, 2, NULL, NULL, 'GroupMatch', 154, 152, 40, NULL, NULL, NULL),
(559, NULL, NULL, 29, 11, 30, 1, NULL, NULL, 'GroupMatch', 154, 151, 40, NULL, NULL, NULL),
(560, NULL, NULL, 30, 11, 30, 2, NULL, NULL, 'GroupMatch', 152, 153, 40, NULL, NULL, NULL),
(561, NULL, NULL, 31, 9, 30, 3, NULL, NULL, 'GroupMatch', 155, 156, 41, NULL, NULL, NULL),
(562, NULL, NULL, 32, 9, 30, 4, NULL, NULL, 'GroupMatch', 157, 158, 41, NULL, NULL, NULL),
(563, NULL, NULL, 33, 10, 30, 3, NULL, NULL, 'GroupMatch', 155, 157, 41, NULL, NULL, NULL),
(564, NULL, NULL, 34, 10, 30, 4, NULL, NULL, 'GroupMatch', 158, 156, 41, NULL, NULL, NULL),
(565, NULL, NULL, 35, 11, 30, 3, NULL, NULL, 'GroupMatch', 158, 155, 41, NULL, NULL, NULL),
(566, NULL, NULL, 36, 11, 30, 4, NULL, NULL, 'GroupMatch', 156, 157, 41, NULL, NULL, NULL),
(567, NULL, NULL, 37, 9, 30, 5, NULL, NULL, 'GroupMatch', 159, 160, 42, NULL, NULL, NULL),
(568, NULL, NULL, 38, 9, 30, 6, NULL, NULL, 'GroupMatch', 161, 162, 42, NULL, NULL, NULL),
(569, NULL, NULL, 39, 10, 30, 5, NULL, NULL, 'GroupMatch', 159, 161, 42, NULL, NULL, NULL),
(570, NULL, NULL, 40, 10, 30, 6, NULL, NULL, 'GroupMatch', 162, 160, 42, NULL, NULL, NULL),
(571, NULL, NULL, 41, 11, 30, 5, NULL, NULL, 'GroupMatch', 162, 159, 42, NULL, NULL, NULL),
(572, NULL, NULL, 42, 11, 30, 6, NULL, NULL, 'GroupMatch', 160, 161, 42, NULL, NULL, NULL),
(573, NULL, NULL, 43, 9, 30, 7, NULL, NULL, 'GroupMatch', 163, 164, 43, NULL, NULL, NULL),
(574, NULL, NULL, 44, 9, 30, 8, NULL, NULL, 'GroupMatch', 165, 166, 43, NULL, NULL, NULL),
(575, NULL, NULL, 45, 10, 30, 7, NULL, NULL, 'GroupMatch', 163, 165, 43, NULL, NULL, NULL),
(576, NULL, NULL, 46, 10, 30, 8, NULL, NULL, 'GroupMatch', 166, 164, 43, NULL, NULL, NULL),
(577, NULL, NULL, 47, 11, 30, 7, NULL, NULL, 'GroupMatch', 166, 163, 43, NULL, NULL, NULL),
(578, NULL, NULL, 48, 11, 30, 8, NULL, NULL, 'GroupMatch', 164, 165, 43, NULL, NULL, NULL),
(579, NULL, NULL, 113, 12, 30, 1, NULL, NULL, 'Match', 167, 169, 44, NULL, NULL, NULL),
(580, NULL, NULL, 114, 13, 15, 1, NULL, NULL, 'Match', 168, 170, 44, NULL, NULL, NULL),
(581, NULL, NULL, 115, 14, 0, 1, NULL, NULL, 'Match', 167, 168, 44, NULL, NULL, NULL),
(582, NULL, NULL, 116, 14, 45, 1, NULL, NULL, 'Match', 169, 170, 44, NULL, NULL, NULL),
(583, NULL, NULL, 117, 15, 30, 1, NULL, NULL, 'Match', 170, 167, 44, NULL, NULL, NULL),
(584, NULL, NULL, 118, 16, 15, 1, NULL, NULL, 'Match', 168, 169, 44, NULL, NULL, NULL),
(585, NULL, NULL, 119, 17, 0, 1, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 21, NULL, '3 tot 4'),
(587, NULL, NULL, 120, 17, 30, 1, NULL, NULL, 'RoundMatch', NULL, NULL, NULL, 21, NULL, 'Finale');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `referee`
--

CREATE TABLE `referee` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `referee`
--

INSERT INTO `referee` (`id`, `name`) VALUES
(1, 'gerard'),
(2, 'roger'),
(3, 'eddy'),
(4, 'emiel '),
(5, 'Ine Foulon');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `round`
--

CREATE TABLE `round` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `leagueId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `round`
--

INSERT INTO `round` (`id`, `name`, `leagueId`) VALUES
(17, '8ste Finale', 9),
(18, 'Kwart finale', 9),
(19, 'Halve Final', 9),
(20, 'Finale', 9),
(21, 'Finales', 10);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `team`
--

CREATE TABLE `team` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `groupId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `team`
--

INSERT INTO `team` (`id`, `name`, `groupId`) VALUES
(135, 'Par Hazard', 36),
(136, 'De Gouden Aap', 36),
(137, 'Het lag aan de bal', 36),
(138, 'FC Baco Sport', 36),
(139, 'Whoepi-Boys', 37),
(140, 'Abicon', 37),
(141, 'Plakwerken Muylle', 37),
(142, 'Mvc Moeder Harelbeekse', 37),
(143, 'Samba', 38),
(144, 'La Galaxie', 38),
(145, 'Jazzy', 38),
(146, 'Mavito', 38),
(147, 'Hundes Intertapis', 39),
(148, 'Decorte Zotten', 39),
(149, 'Hombres Calientes', 39),
(150, 'FC Stadion', 39),
(151, 'Dema-Poels', 40),
(152, 'Re-United', 40),
(153, 'MVC Vermeeren Travel', 40),
(154, 'El Toros Locos', 40),
(155, 'Aalbeke Sport', 41),
(156, 'MVC Foliefotografie', 41),
(157, 'VVEK', 41),
(158, 'De Copains', 41),
(159, 'MVC Le Moulin', 42),
(160, 'FC Strand Associates', 42),
(161, 'KFC Rossem', 42),
(162, 'Spartak Stasegem', 42),
(163, 'Frituur Whoepi', 43),
(164, 'Los Borrachos', 43),
(165, 'Ninety-four', 43),
(166, 'Los Piratas', 43),
(167, 'De Roze Duivels', 44),
(168, 'Bavik Royal', 44),
(169, 'Biercelona', 44),
(170, 'Biercelona 2.0', 44);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `tournament`
--

CREATE TABLE `tournament` (
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `startDateTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `tournament`
--

INSERT INTO `tournament` (`created`, `updated`, `id`, `name`, `userId`, `startDateTime`) VALUES
('2019-04-25 22:23:37', '2019-04-25 22:23:37', 5, 'Thu Apr 25 2019 22:23:37 GMT+0200 (CEST)', 1, '2019-04-25 22:23:37');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `user`
--

CREATE TABLE `user` (
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Gegevens worden geëxporteerd voor tabel `user`
--

INSERT INTO `user` (`created`, `updated`, `id`, `email`, `password`, `user_name`, `first_name`, `last_name`) VALUES
('2019-03-07 11:05:56', '2019-03-07 11:05:56', 1, 'holvoetwim@hotmail.com', '$2a$10$drtiide/zTb421e97PFOWexXYHxwfA2.FX26Q7kID./vwz3XH5w3C', 'wim', 'Wim', 'Holvoet');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `group`
--
ALTER TABLE `group`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_8a34c12881a8f853d03f5f1903e` (`leagueId`);

--
-- Indexen voor tabel `league`
--
ALTER TABLE `league`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_d2b5c3643a97e458fe51445c7a6` (`tournamentId`);

--
-- Indexen voor tabel `match`
--
ALTER TABLE `match`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_4c90e9976d9356c8d4ec5013ff` (`type`),
  ADD KEY `FK_1118562c3d9e68a7c7d680c7afd` (`roundId`),
  ADD KEY `FK_64e4b0003b6e0a10d1e388e2641` (`groupId`),
  ADD KEY `FK_d3af13a96b05bd93cf7c499dc20` (`refereeId`),
  ADD KEY `FK_5caac1768e2f5b7b9c69b62090c` (`homeTeamId`),
  ADD KEY `FK_71c2539818d05ededd8dcb1a483` (`outTeamId`);

--
-- Indexen voor tabel `referee`
--
ALTER TABLE `referee`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `round`
--
ALTER TABLE `round`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_e60e2d58962a17b45197ec43890` (`leagueId`);

--
-- Indexen voor tabel `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_96d76e96e2b2b84a0e7e7305e5c` (`groupId`);

--
-- Indexen voor tabel `tournament`
--
ALTER TABLE `tournament`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_dfe64d022fa7529fe0738812227` (`userId`);

--
-- Indexen voor tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `group`
--
ALTER TABLE `group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT voor een tabel `league`
--
ALTER TABLE `league`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT voor een tabel `match`
--
ALTER TABLE `match`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=589;

--
-- AUTO_INCREMENT voor een tabel `referee`
--
ALTER TABLE `referee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT voor een tabel `round`
--
ALTER TABLE `round`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT voor een tabel `team`
--
ALTER TABLE `team`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=171;

--
-- AUTO_INCREMENT voor een tabel `tournament`
--
ALTER TABLE `tournament`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT voor een tabel `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `group`
--
ALTER TABLE `group`
  ADD CONSTRAINT `FK_8a34c12881a8f853d03f5f1903e` FOREIGN KEY (`leagueId`) REFERENCES `league` (`id`) ON DELETE CASCADE;

--
-- Beperkingen voor tabel `league`
--
ALTER TABLE `league`
  ADD CONSTRAINT `FK_d2b5c3643a97e458fe51445c7a6` FOREIGN KEY (`tournamentId`) REFERENCES `tournament` (`id`) ON DELETE CASCADE;

--
-- Beperkingen voor tabel `match`
--
ALTER TABLE `match`
  ADD CONSTRAINT `FK_1118562c3d9e68a7c7d680c7afd` FOREIGN KEY (`roundId`) REFERENCES `round` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_5caac1768e2f5b7b9c69b62090c` FOREIGN KEY (`homeTeamId`) REFERENCES `team` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_64e4b0003b6e0a10d1e388e2641` FOREIGN KEY (`groupId`) REFERENCES `group` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_71c2539818d05ededd8dcb1a483` FOREIGN KEY (`outTeamId`) REFERENCES `team` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_d3af13a96b05bd93cf7c499dc20` FOREIGN KEY (`refereeId`) REFERENCES `referee` (`id`);

--
-- Beperkingen voor tabel `round`
--
ALTER TABLE `round`
  ADD CONSTRAINT `FK_e60e2d58962a17b45197ec43890` FOREIGN KEY (`leagueId`) REFERENCES `league` (`id`) ON DELETE CASCADE;

--
-- Beperkingen voor tabel `team`
--
ALTER TABLE `team`
  ADD CONSTRAINT `FK_96d76e96e2b2b84a0e7e7305e5c` FOREIGN KEY (`groupId`) REFERENCES `group` (`id`) ON DELETE CASCADE;

--
-- Beperkingen voor tabel `tournament`
--
ALTER TABLE `tournament`
  ADD CONSTRAINT `FK_dfe64d022fa7529fe0738812227` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
