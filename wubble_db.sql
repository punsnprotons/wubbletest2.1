SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


CREATE DATABASE IF NOT EXISTS `wubble_prod` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `wubble_prod`;



CREATE TABLE `authentication_method` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `identifier` varchar(255) NOT NULL,
  `passwordHash` varchar(255) NOT NULL,
  `passwordResetToken` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `authentication_method`
--

INSERT INTO `authentication_method` (`id`, `userId`, `identifier`, `passwordHash`, `passwordResetToken`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 1, 'fwzfrds@gmail.com', '$2a$12$4b1KlXNaeqW63oY7Ftj/TuouSo0H0dBKz8CBKc6vmeZ723pPsWt76', NULL, '2023-08-03 10:38:59', '2024-02-01 04:29:37', NULL),
(2, 2, 'ken.harjuna@visiongroup.co', '$2y$10$RsnrkNaYOuspim.afC8C7.kuiX7EA56jopn63NvM/LkBmUOD3Gk3G', '313639333435363434332e3830396b656e2e6861', '2023-08-03 10:38:27', '2023-08-31 04:34:04', NULL),
(3, 3, 'visionstagingenv01@gmail.com', '$2y$10$RsnrkNaYOuspim.afC8C7.kuiX7EA56jopn63NvM/LkBmUOD3Gk3G', NULL, '2023-08-03 10:38:27', '2023-12-30 09:40:24', NULL),
(4, 4, 'anand.roy@wubble.ai', '$2y$10$fMxuDIRf63WVpNDoYvQXL.WeV9c/q2FjK3B7hLdTt1LTjQ.wbtcXq', NULL, '2024-01-25 13:56:40', NULL, NULL),
(5, 5, 'tech@visiongroup.co', '$2a$12$vmqm0t81KC4xESUXFlkk5eBUl1Cv2jauiLeinwd36NFwHMXkUaFCa', NULL, '2024-01-25 13:57:40', '2024-02-01 00:20:22', NULL),
(6, 6, 'kedar.poonja@gmail.com', '$2y$10$Sh7lt5G/SxvF.QF3vdLkPek7ZSDA0hdbqBvAa0Mg.YNJ.MRtqD3Ji', NULL, '2024-02-07 15:43:39', NULL, NULL),
(7, 7, 'kalpana.kbaheti@gmail.com', '$2y$10$Sh7lt5G/SxvF.QF3vdLkPek7ZSDA0hdbqBvAa0Mg.YNJ.MRtqD3Ji', NULL, '2024-02-07 15:44:44', NULL, NULL),
(8, 8, 'msamat@gmail.com', '$2y$10$Sh7lt5G/SxvF.QF3vdLkPek7ZSDA0hdbqBvAa0Mg.YNJ.MRtqD3Ji', NULL, '2024-02-07 15:45:44', NULL, NULL),
(9, 9, 'venus@appyhigh.com', '$2y$10$Sh7lt5G/SxvF.QF3vdLkPek7ZSDA0hdbqBvAa0Mg.YNJ.MRtqD3Ji', NULL, '2024-02-07 15:47:21', NULL, NULL),
(10, 10, 'prantik@happymarketer.com', '$2y$10$Sh7lt5G/SxvF.QF3vdLkPek7ZSDA0hdbqBvAa0Mg.YNJ.MRtqD3Ji', NULL, '2024-02-07 15:48:59', NULL, NULL),
(11, 11, 'anjujainkumar@outlook.com', '$2y$10$Sh7lt5G/SxvF.QF3vdLkPek7ZSDA0hdbqBvAa0Mg.YNJ.MRtqD3Ji', NULL, '2024-02-07 15:49:15', NULL, NULL),
(12, 12, 'will@cocooncap.com', '$2y$10$Sh7lt5G/SxvF.QF3vdLkPek7ZSDA0hdbqBvAa0Mg.YNJ.MRtqD3Ji', NULL, '2024-02-08 13:46:45', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `email`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(5, 'visionstagingenv01+91@gmail.com', '2024-02-07 05:43:56', NULL, NULL),
(6, 'tamphamsycv@Gmail.com', '2024-02-07 05:46:46', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `genre`
--

CREATE TABLE `genre` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `ossFileName` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `genre`
--

-- --------------------------------------------------------

--
-- Table structure for table `lyrics`
--

CREATE TABLE `lyrics` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `ryte` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lyrics`
--


-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender` varchar(200) NOT NULL,
  `recipient` varchar(200) NOT NULL,
  `message` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `firstName`, `lastName`, `email`, `role`, `status`, `image`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Muhammad', 'Fawwaz', 'fwzfrds@gmail.com', 'admin', 'activated', NULL, '2023-08-03 10:38:27', NULL, NULL),
(2, 'Jesha', 'Aulia Harimurti', 'ken.harjuna@visiongroup.co', 'admin', 'activated', NULL, '2023-08-03 10:38:27', NULL, NULL),
(3, 'Tam', 'Pham Edit 1', 'visionstagingenv01@gmail.com', 'admin', 'activated', NULL, '2023-08-03 10:38:27', NULL, NULL),
(4, 'Anand', 'Roy', 'anand.roy@wubble.ai', 'admin', 'activated', NULL, '2024-01-25 13:56:03', NULL, NULL),
(5, 'Vision', 'Tech v1', 'tech@visiongroup.co', 'admin', 'activated', NULL, '2024-01-25 13:57:15', NULL, NULL),
(6, 'Kedar', 'Poonja', 'kedar.poonja@gmail.com', 'admin', 'activated', NULL, '2024-02-07 15:43:08', NULL, NULL),
(7, 'Kalpana', 'Kbaheti', 'kalpana.kbaheti@gmail.com', 'admin', 'activated', NULL, '2024-02-07 15:44:21', NULL, NULL),
(8, 'm', 'samat', 'msamat@gmail.com', 'admin', 'activated', NULL, '2024-02-07 15:45:23', NULL, NULL),
(9, 'Venus', 'AppyHigh', 'venus@appyhigh.com', 'admin', 'activated', NULL, '2024-02-07 15:46:55', NULL, NULL),
(10, 'Prantik', 'HappyMarketer', 'prantik@happymarketer.com', 'admin', 'activated', NULL, '2024-02-07 15:48:02', NULL, NULL),
(11, 'Anjujain', 'Kumar', 'anjujainkumar@outlook.com', 'admin', 'activated', NULL, '2024-02-07 15:48:32', NULL, NULL),
(12, 'Will', 'Cocooncap', 'will@cocooncap.com', 'admin', 'activated', NULL, '2024-02-08 13:46:28', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authentication_method`
--
ALTER TABLE `authentication_method`
  ADD PRIMARY KEY (`id`),
  ADD KEY `authentication_method_FK` (`userId`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`id`),
  ADD KEY `genre_FK` (`userId`);

--
-- Indexes for table `lyrics`
--
ALTER TABLE `lyrics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user` (`userId`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authentication_method`
--
ALTER TABLE `authentication_method`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `genre`
--
ALTER TABLE `genre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;

--
-- AUTO_INCREMENT for table `lyrics`
--
ALTER TABLE `lyrics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `authentication_method`
--
ALTER TABLE `authentication_method`
  ADD CONSTRAINT `authentication_method_FK` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `genre`
--
ALTER TABLE `genre`
  ADD CONSTRAINT `genre_FK` FOREIGN KEY (`userId`) REFERENCES `user` (`id`);

--
-- Constraints for table `lyrics`
--
ALTER TABLE `lyrics`
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`userId`) REFERENCES `user` (`id`);
COMMIT;
