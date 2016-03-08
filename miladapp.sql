-- phpMyAdmin SQL Dump
-- version 4.4.15.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 21, 2016 at 12:17 PM
-- Server version: 5.5.39
-- PHP Version: 5.4.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `miladapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `ppadalim_users`
--

CREATE TABLE IF NOT EXISTS `ppadalim_users` (
  `id` int(3) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `password_text` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ppadalim_users`
--

INSERT INTO `ppadalim_users` (`id`, `username`, `password`, `is_admin`, `password_text`) VALUES
(1, 'admin', 'f492dc2964df6e0c9dd556e2bca8d4f1', 1, '123'),
(21, 'sergey', 'dd95b1ca8dca61e3ab7ca3f18bbdef78', 0, '444'),
(22, 'milad', '4b2337f2e0df9d79cec18739f1970850', 1, '777');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ppadalim_users`
--
ALTER TABLE `ppadalim_users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ppadalim_users`
--
ALTER TABLE `ppadalim_users`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=23;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
