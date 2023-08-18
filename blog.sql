-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 18, 2023 at 11:05 AM
-- Wersja serwera: 10.4.28-MariaDB
-- Wersja PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blog`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `articles`
--

CREATE TABLE `articles` (
  `article_id` int(11) NOT NULL,
  `title` text NOT NULL,
  `content` longtext NOT NULL,
  `author` tinytext NOT NULL,
  `date` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`article_id`, `title`, `content`, `author`, `date`) VALUES
(9, 'Wzruszająca historia śmierci witryny srakun.pl', 'Wszystko zaczęło się, gdy pewnego dnia, spacerując w parku, znaleźli porzuconego i przerażonego szczeniaka o nietypowym umaszczeniu - miał on plamę w kształcie srebrnego kuna na białym tle. Postanowili go przygarnąć i nazwali Srebrnym Kunem. To wydarzenie stało się iskrą, która zrodziła pomysł stworzenia witryny, na której można by dzielić się historiami, zdjęciami i anegdotami o nietypowych zwierzakach.<br /><br />Przyjaciele spędzali długie wieczory, siedząc przy wspólnym stole, nad komputerami i przeglądając zdjęcia, które wysyłały im osoby z całego kraju. Ich witryna srakun.pl szybko zdobyła popularność wśród miłośników zwierząt, a historia Srebrnego Kuna stała się symbolemem witryny - dowodem na to, że każde zwierzę, bez względu na to jakie jest inne, zasługuje na miłość i troskę.<br /><br />Lata mijały, a strona srakun.pl stała się społecznością, która nie tylko dzieliła się opowieściami o zwierzakach, ale również angażowała się w akcje charytatywne na rzecz schronisk i organizacji pomagających bezdomnym zwierzętom. Marta, Adam, Kamil i Zuzanna zyskali sobie serca tysięcy osób, które odwiedzały witrynę codziennie.<br /><br />Niestety, los bywał nieprzewidywalny. Kamil zachorował na poważną chorobę, która zmusiła go do wyjazdu za granicę na długie leczenie. To był ciężki czas dla całej grupy przyjaciół. Witryna srakun.pl stała się dla nich przyczółkiem normalności i wspomnieniem lepszych dni.<br /><br />Po trudnych miesiącach walki, Kamil niestety zmarł. Jego śmierć była wielkim ciosem dla Marty, Adama i Zuzanny. Była to również chwila refleksji nad życiem, znaczeniem przyjaźni i mocy tworzenia czegoś pięknego nawet w obliczu trudności.<br /><br />Na witrynie srakun.pl pojawiła się wzruszająca i osobista notatka, w której pozostali przyjaciele opowiedzieli o Kamilu, o tym, jak bardzo go kochali i jak wiele dla nich znaczył. Zaczęła się zbiórka na rzecz organizacji charytatywnej zajmującej się walką z tą samą chorobą, która pochłonęła Kamila.<br /><br />Dzięki Kamilowi, witryna srakun.pl stała się jeszcze silniejszym źródłem inspiracji i dobra. Przyjaciele postanowili kontynuować jej działanie, nie tylko ku czci Kamila, ale także ku czci wszystkich ukochanych zwierząt i ludzi, którzy przewinęli się przez ich życie.<br />I tak, witryna srakun.pl pozostała miejscem, w którym historie o zwierzętach łączą się z opowieściami o ludzkim współczuciu, sile przyjaźni i pięknie tworzenia czegoś dobrego nawet w obliczu straty. To miejsce, gdzie Srebrny Kun wciąż biega po polach wyobraźni i serc ludzi, inspirując ich do robienia dobra i kochania innych tak, jakby to było ich ostatnie dni.', 'ChadSzymon2115', '15 08 2023');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` tinytext NOT NULL,
  `password` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`) VALUES
(1, 'BambikBartosz2137', '$2b$11$qfg/rYq9lLJiXjbWkJ.niOd04PR1ltE0LT3aJRtg1G7oiGsCLUVwS'),
(2, 'ChadSzymon2115', '$2b$11$DW3NaDMVwSKw1QYZmk4zXuYU77i8sZIBxbxa63WIGex0o6jH62.CK');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`article_id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `article_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
