-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Már 05. 17:43
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `webshoppp`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `felhasznalonev` varchar(30) NOT NULL,
  `jelszo` varchar(60) NOT NULL,
  `email` varchar(50) NOT NULL,
  `f_azonosito` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`felhasznalonev`, `jelszo`, `email`, `f_azonosito`) VALUES
('', 'ikrek', 'adamka.davidka.2005@gmail.com', 1),
('', '$2b$10$KOsKW.EzGGdgzbrzBHWiy.4', 'dubleczbence@gmail.com', 2),
('', '$2b$10$Vdyy4ltXxBuaJCm2v55nne4', 'bence@gmail.com', 3),
('a', '$2b$10$GGtX.5szfBr8rLZiq0NJU.3', 'aa.2005@gmail.com', 4),
('', '123', 'davemond2005@gmail.com', 5),
('', '1234', 'aaaaaaa.2005@gmail.com', 6),
('', '1234', 'aaaa.2005@gmail.com', 7),
('', '1234', 'vidka.2005@gmail.com', 8),
('', '1234', 'damka.davidka.2005@gmail.com', 9),
('', '1234', 'adadavidka.2005@gmail.com', 10),
('', '1234', 'ka.davidka.2005@gmail.com', 11),
('adam', '1234', 'ad2.2005@gmail.com', 12),
('adam', '$2b$10$Y6haSEom/WUp0Ita/gG3Fe.', 'adaa.2005@gmail.com', 13),
('adada', '$2b$10$LBo4bJxq.IRHu3fuUcXc0.E', 'adamkdavidka.2005@gmail.com', 14),
('adam', '$2b$10$H376YV8UMEVachlu1kmk6OG', 'adad2avidka.2005@gmail.com', 15),
('adam', '$2b$10$6XSI48D5aDtbJyqVgSXTtOP', 'adaa.idka.2005@gmail.com', 16),
('adam', '$2b$10$Et.GlfdCQzGfjQ48YDOUo.6', 'ada23452005@gmail.com', 17),
('Réfi Ádám', '$2b$10$JkSe3KowRHMI1jhczPx8NOt', '.davidka.2005@gmail.com', 18),
('adam', '$2b$10$NdRS.9yMW6Z7SHmKfg4OgeR', 'adammmmm@gmail.com', 19),
('webshop', '$2b$10$XrGNzw/fcNCBqUauq3DJ7ua', 'adam@gmail.com', 20),
('asdam', '$2b$10$pCUEtQi0FQnoLU46XC1H0uk', 'adaaammm@gmail.com', 21),
('adam', '$2b$10$Nstg3HhqvvBlJSqTX8m2HuH', 'adammmm@gmail.com', 22),
('adam', '$2b$10$bv8NZdt6ONTkchcL81IFwet', 'adammm@gmail.com', 23),
('adam', '$2b$10$HQPyTS8PxJj.RN9LJx6lg.chBi8o9ZS2.6XdmUWAeNnoR4pkZgLty', 'adamka.david.2005@gmail.com', 24),
('david', '$2b$10$zwXW5IjK3HPhM2N7dISsr.NI9LYyyHaSYS0CXrbIVmmaiG90wKE.q', 'davidkaa.2005@gmail.com', 25),
('csali mate', '$2b$10$72UKPYOf5peHo4KKVoBnpeSw4cSjfW6fNtpWA0wu1ygtyixjDcch6', 'csalimate35@gmail.com', 26),
('csali mate', '$2b$10$5XII4LggTns455PSBG/73OwXhFnlKT1HZQlZsZ0dx79ryRc2kpADS', 'adaliclothing@gmail.com', 27),
('csali mate', '$2b$10$NAXvtTTZw56DMh5pdN/Q7OlVjSNOjPVMULcDuxumDXciWN3n90Q12', 'adaliclothingg@gmail.com', 28),
('csali mate', '$2b$10$WSW0daPaERS86qWbXsYCMuyAnZ04JBMW4x2GvuiPwtPUv7bBYD0HG', 'adaliclothinggg@gmail.com', 29);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`f_azonosito`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `f_azonosito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
