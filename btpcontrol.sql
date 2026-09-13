-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 29, 2026 at 10:57 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `btpcontrol`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_logs`
--

CREATE TABLE `activity_logs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `entity_type` varchar(255) NOT NULL,
  `entity_id` bigint(20) UNSIGNED NOT NULL,
  `action_type` varchar(255) NOT NULL,
  `message` text DEFAULT NULL,
  `meta_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`meta_json`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `check_in` datetime NOT NULL,
  `check_out` datetime DEFAULT NULL,
  `status` enum('present','late','absent','half_day') NOT NULL DEFAULT 'present',
  `role_snapshot` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chat_messages`
--

CREATE TABLE `chat_messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `sender_id` bigint(20) UNSIGNED NOT NULL,
  `message` text NOT NULL,
  `attachment_url` varchar(255) DEFAULT NULL,
  `is_seen` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `chat_messages`
--

INSERT INTO `chat_messages` (`id`, `project_id`, `sender_id`, `message`, `attachment_url`, `is_seen`, `created_at`, `updated_at`) VALUES
(1, 27, 146, 'Plumbing team is on site.', NULL, 0, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(2, 12, 200, 'Good progress on construction.', NULL, 1, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(3, 18, 116, 'Team finished today’s work.', NULL, 0, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(4, 22, 220, 'Electric installation has started.', NULL, 1, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(5, 30, 169, 'Delay due to weather conditions.', NULL, 1, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(6, 7, 222, 'Plumbing team is on site.', NULL, 0, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(7, 37, 118, 'Safety inspection completed.', NULL, 0, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(8, 34, 158, 'Supervisor will visit tomorrow.', NULL, 0, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(9, 39, 121, 'Concrete delivery arrived.', NULL, 1, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(10, 29, 191, 'Safety inspection completed.', NULL, 0, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(11, 9, 25, 'Safety inspection completed.', NULL, 0, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(12, 1, 53, 'Please check the reinforcement work.', NULL, 0, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(13, 36, 231, 'Delay due to weather conditions.', NULL, 0, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(14, 31, 278, 'Good progress on construction.', NULL, 0, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(15, 14, 31, 'Need approval for next phase.', NULL, 1, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(16, 10, 259, 'Safety inspection completed.', NULL, 1, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(17, 29, 61, 'Plumbing team is on site.', NULL, 0, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(18, 24, 14, 'Work started on site today.', NULL, 1, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(19, 25, 176, 'Plumbing team is on site.', NULL, 0, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(20, 16, 55, 'Need approval for next phase.', NULL, 1, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(21, 9, 70, 'Report sent to manager.', NULL, 1, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(22, 10, 201, 'Concrete delivery arrived.', NULL, 0, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(23, 9, 74, 'Safety inspection completed.', NULL, 1, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(24, 25, 26, 'Concrete delivery arrived.', NULL, 1, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(25, 29, 278, 'Plumbing team is on site.', NULL, 1, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(26, 7, 195, 'Need approval for next phase.', NULL, 1, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(27, 24, 227, 'Project is going as planned.', NULL, 1, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(28, 4, 156, 'Concrete delivery arrived.', NULL, 1, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(29, 16, 49, 'Need approval for next phase.', NULL, 1, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(30, 35, 272, 'Team finished today’s work.', NULL, 1, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(31, 17, 160, 'Safety inspection completed.', NULL, 1, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(32, 34, 4, 'Plumbing team is on site.', NULL, 1, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(33, 21, 56, 'Report sent to manager.', NULL, 0, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(34, 34, 43, 'Report sent to manager.', NULL, 0, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(35, 36, 6, 'Team finished today’s work.', NULL, 1, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(36, 40, 262, 'Quality check passed successfully.', NULL, 0, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(37, 17, 119, 'Please check the reinforcement work.', NULL, 1, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(38, 5, 96, 'Plumbing team is on site.', NULL, 0, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(39, 3, 222, 'Electric installation has started.', NULL, 1, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(40, 36, 43, 'Plumbing team is on site.', NULL, 1, '2026-05-28 11:49:45', '2026-05-28 11:49:45'),
(41, 2, 172, 'Work started on site today.', NULL, 1, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(42, 27, 262, 'Report sent to manager.', NULL, 1, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(43, 9, 108, 'Electric installation has started.', NULL, 1, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(44, 34, 233, 'Need approval for next phase.', NULL, 0, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(45, 31, 103, 'Project is going as planned.', NULL, 0, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(46, 4, 104, 'We need more materials for tomorrow.', NULL, 1, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(47, 5, 85, 'Work started on site today.', NULL, 1, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(48, 10, 131, 'Supervisor will visit tomorrow.', NULL, 1, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(49, 40, 181, 'Good progress on construction.', NULL, 0, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(50, 10, 215, 'Team finished today’s work.', NULL, 0, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(51, 4, 85, 'Quality check passed successfully.', NULL, 1, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(52, 4, 14, 'Project is going as planned.', NULL, 1, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(53, 21, 150, 'Electric installation has started.', NULL, 1, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(54, 36, 186, 'Good progress on construction.', NULL, 1, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(55, 17, 221, 'Report sent to manager.', NULL, 0, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(56, 7, 231, 'Plumbing team is on site.', NULL, 1, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(57, 20, 230, 'Quality check passed successfully.', NULL, 1, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(58, 17, 166, 'Delay due to weather conditions.', NULL, 1, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(59, 27, 167, 'Supervisor will visit tomorrow.', NULL, 1, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(60, 5, 168, 'Plumbing team is on site.', NULL, 0, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(61, 20, 34, 'Work started on site today.', NULL, 0, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(62, 4, 43, 'Delay due to weather conditions.', NULL, 0, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(63, 11, 115, 'Need approval for next phase.', NULL, 1, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(64, 40, 209, 'Supervisor will visit tomorrow.', NULL, 0, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(65, 1, 15, 'Good progress on construction.', NULL, 0, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(66, 36, 203, 'Work started on site today.', NULL, 0, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(67, 17, 197, 'Need approval for next phase.', NULL, 0, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(68, 29, 247, 'Report sent to manager.', NULL, 0, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(69, 27, 131, 'Need approval for next phase.', NULL, 0, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(70, 40, 7, 'Electric installation has started.', NULL, 1, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(71, 11, 209, 'Delay due to weather conditions.', NULL, 0, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(72, 40, 20, 'Work started on site today.', NULL, 0, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(73, 19, 21, 'Project is going as planned.', NULL, 1, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(74, 38, 52, 'Safety inspection completed.', NULL, 0, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(75, 16, 264, 'Electric installation has started.', NULL, 1, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(76, 25, 150, 'Plumbing team is on site.', NULL, 1, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(77, 17, 80, 'Please check the reinforcement work.', NULL, 1, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(78, 2, 55, 'Supervisor will visit tomorrow.', NULL, 1, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(79, 14, 80, 'Supervisor will visit tomorrow.', NULL, 0, '2026-05-28 11:52:41', '2026-05-28 11:52:41'),
(80, 40, 74, 'Plumbing team is on site.', NULL, 0, '2026-05-28 11:52:41', '2026-05-28 11:52:41');

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `name`, `phone`, `email`, `address`, `created_at`, `updated_at`) VALUES
(1, 'Breitenberg Group', '(947) 590-8222', 'garnett.olson@barrows.biz', '5937 Mayer Stravenue Apt. 502\nNew Linnea, AZ 14454-6935', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(2, 'Bins Inc', '+1 (760) 222-1525', 'brendan86@ferry.com', '7596 Blanda Spur\nPacochaport, CA 31193-1084', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(3, 'Veum-Shields', '636.554.0612', 'jolie.kautzer@greenholt.org', '3055 Schaden Hill\nPort Madisynview, NH 26463-5603', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(4, 'Considine Inc', '980.488.1648', 'rau.albert@ziemann.info', '176 Raymundo Field Suite 305\nBartellmouth, ID 72514-3935', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(5, 'Harris-Auer', '+1-574-416-7275', 'pmaggio@ondricka.biz', '92982 Arne Courts Suite 081\nNew Abdulfurt, IN 66937-0232', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(6, 'Corwin-Ernser', '+18203425645', 'hauck.willis@wiza.biz', '4549 Clair Drive\nReggiemouth, DC 76774-6688', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(7, 'Schultz, Senger and Bartell', '(831) 733-6481', 'hmueller@ortiz.com', '61099 Parisian Rue\nNorth Claireborough, SC 82679', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(8, 'Considine Ltd', '256-755-1695', 'zrohan@daugherty.com', '4875 Maureen Fields Suite 538\nPort Erna, MD 35698-2937', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(9, 'Volkman LLC', '+1-267-395-7836', 'greg90@hettinger.net', '97587 Lucie Ville\nNorth Tomton, NJ 34987-7799', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(10, 'Leannon Inc', '1-715-682-2060', 'marquis.reichert@lakin.com', '865 Shields Fords\nNorth Jamesonport, MN 09615', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(11, 'Kautzer and Sons', '(347) 890-6835', 'joesph05@runte.net', '9912 Jessy Well\nEast Dorcasfurt, HI 27134', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(12, 'Gleason-Ortiz', '1-763-644-7319', 'valerie.lang@fahey.com', '76339 Raynor Courts Suite 518\nLucymouth, CA 52282-8674', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(13, 'Davis, Raynor and Kuhic', '959-728-9565', 'becker.jeanne@shanahan.biz', '3737 Lang Ramp\nMertzmouth, AL 19988-0458', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(14, 'Spencer, Leannon and Zboncak', '+12349844401', 'milo.stark@lubowitz.com', '213 Imani Square\nNew Fridaside, NC 09265', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(15, 'Schaefer-Pfeffer', '1-715-874-0413', 'maxwell.hills@gutkowski.com', '939 Quitzon Ford Apt. 569\nNorth Anjali, KY 53367', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(16, 'Macejkovic, Feil and Swaniawski', '+15866450048', 'gregory12@beahan.biz', '68098 Franz Fall Apt. 612\nNorth Valentinberg, VT 31124-4479', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(17, 'Leffler, Schuppe and Wisozk', '1-708-869-4770', 'dasia.gutkowski@lehner.org', '73674 Ben Lane Suite 308\nEast Donna, OR 64910', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(18, 'McDermott, King and Nolan', '361.674.5897', 'gene.lubowitz@reynolds.org', '371 Crystal Villages Suite 290\nZenamouth, OH 51846', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(19, 'Erdman and Sons', '+1 (815) 892-9942', 'hyman.maggio@dicki.info', '681 Jace Stravenue Apt. 039\nSouth Dallas, TX 46540-5860', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(20, 'Carter-Dicki', '+1.337.994.0986', 'dsenger@rolfson.biz', '152 McLaughlin Cliffs\nWest Chanellefort, OH 91619', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(21, 'Zemlak, Ebert and Bruen', '+1 (972) 350-7396', 'aletha.ziemann@sipes.info', '2625 Cierra Corners Suite 270\nRitaport, FL 90681-8670', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(22, 'Wolff-Maggio', '385-972-2775', 'beier.morton@walter.net', '386 Kitty Forges\nKuphalfurt, NJ 79237-7769', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(23, 'Cassin Inc', '458.969.9841', 'block.irwin@thompson.com', '86669 Collier Causeway Suite 390\nBaileyhaven, WA 84220', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(24, 'Kutch, Medhurst and Carroll', '+14697876992', 'nader.elmore@rosenbaum.com', '60892 Aniyah Meadow\nNew Karolann, ND 56342', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(25, 'Skiles Ltd', '(678) 924-6935', 'ozella95@berge.com', '616 Wilderman Valleys\nMorissetteburgh, HI 45190', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(26, 'Rutherford, Abshire and Windler', '317.862.3177', 'umcglynn@howell.com', '441 Pfeffer Avenue Suite 827\nNew Leanne, SD 82936-8554', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(27, 'Price, Hirthe and Osinski', '1-864-623-3988', 'rau.napoleon@spencer.com', '5597 Arlo Knoll\nSipeschester, MD 74362', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(28, 'Lang, Emmerich and Cummerata', '+1-575-659-7157', 'deron39@tremblay.biz', '193 Brionna Wells Apt. 278\nEmmieland, NV 14487-7894', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(29, 'Lakin-Kreiger', '630.593.5487', 'aheaney@schultz.com', '47668 Lawson Mill Suite 809\nNew Franzhaven, IN 97859', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(30, 'Schroeder LLC', '563.575.0931', 'zbayer@cummerata.com', '640 Caleigh Track Suite 104\nAnkundingmouth, CO 25506', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(31, 'Prohaska and Sons', '364.713.0789', 'mcdermott.deonte@waelchi.org', '76840 Veum Cliff\nMarksstad, MA 01352-9021', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(32, 'Rutherford Group', '+1.979.410.8562', 'ransom.kris@mosciski.biz', '84157 Nicklaus Road Apt. 717\nNew Nikkiside, OK 47716', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(33, 'Goldner, Tillman and Gerhold', '478.914.8831', 'ricky.hintz@hane.com', '47004 Ethel Ports\nIsabellatown, OK 53498-3565', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(34, 'Swaniawski Ltd', '(231) 752-4612', 'valentina.larson@bosco.com', '563 Hauck Grove\nDeontaetown, NJ 88796', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(35, 'Hettinger, Weissnat and Cummings', '(936) 870-0456', 'bailee.kiehn@mcclure.com', '3988 Kozey Spur\nMarianland, NJ 01782-6474', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(36, 'Kutch LLC', '279-830-8750', 'skylar18@smitham.biz', '59107 Ephraim Parkway\nEricchester, CT 12451', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(37, 'Marquardt, Swift and Conroy', '(251) 799-3686', 'brittany33@feest.net', '810 Ankunding Greens Apt. 084\nSimeonside, MA 53016-1911', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(38, 'Carroll LLC', '+1.352.934.3422', 'glennie82@huels.com', '72629 Domenica Crossing Apt. 604\nEast Jimmie, MO 17476-3077', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(39, 'Brown-Runolfsson', '+1 (240) 206-7367', 'ybednar@hand.biz', '464 Moses Meadows\nNorth Mariano, IN 73124-7655', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(40, 'Bergstrom, Spencer and Bode', '+1-531-883-0620', 'klein.layla@emmerich.com', '49296 Herzog Inlet Suite 940\nPort Jimmieburgh, OK 43532', '2026-05-28 10:50:13', '2026-05-28 10:50:13'),
(41, 'Towlin', NULL, 'towlin91@gmail.com', NULL, '2026-06-13 04:14:19', '2026-06-13 04:14:19'),
(42, 'Towlin', NULL, 'towlin91@gmail.com', NULL, '2026-06-13 04:14:20', '2026-06-13 04:14:20'),
(43, 'Towlin', '098090909090', 'towlin91@gmail.com', ':j lpnjk nnpnjknn', '2026-06-13 07:17:25', '2026-06-13 07:17:25'),
(44, 'Towlin', '098090909090', 'towlin91@gmail.com', ':j lpnjk nnpnjknn', '2026-06-13 07:17:26', '2026-06-13 07:17:26'),
(45, 'tofig', '34321234', 'towlin91@gmail.com', 'v gbbgtyb', '2026-06-13 07:17:45', '2026-06-13 07:17:45');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inspections`
--

CREATE TABLE `inspections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `task_id` bigint(20) UNSIGNED DEFAULT NULL,
  `inspected_by` bigint(20) UNSIGNED NOT NULL,
  `type` enum('quality','safety') NOT NULL,
  `title` varchar(255) NOT NULL,
  `inspection_date` date DEFAULT NULL,
  `status` enum('draft','completed') NOT NULL DEFAULT 'draft',
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `inspections`
--

INSERT INTO `inspections` (`id`, `project_id`, `task_id`, `inspected_by`, `type`, `title`, `inspection_date`, `status`, `notes`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 'quality', 'Test Inspection', NULL, 'completed', NULL, '2026-06-16 02:29:25', '2026-06-16 02:29:25'),
(2, 1, 1, 1, 'safety', 'Weekly Site Safety Inspection', '2026-05-28', 'completed', 'General site safety review', '2026-06-17 11:24:49', '2026-06-17 11:24:49'),
(3, 1, 2, 1, 'safety', 'Scaffolding Safety Inspection', '2026-05-30', 'completed', 'Scaffold compliance check', '2026-06-17 11:24:49', '2026-06-17 11:24:49'),
(4, 1, 3, 1, 'safety', 'Electrical Safety Inspection', '2026-06-01', 'completed', 'Electrical hazard inspection', '2026-06-17 11:24:49', '2026-06-17 11:24:49'),
(5, 1, 4, 1, 'safety', 'Fire Prevention Inspection', '2026-06-03', 'completed', 'Fire equipment verification', '2026-06-17 11:24:49', '2026-06-17 11:24:49'),
(6, 1, 5, 1, 'safety', 'Excavation Safety Inspection', '2026-06-05', 'completed', 'Excavation barriers and signs', '2026-06-17 11:24:49', '2026-06-17 11:24:49'),
(7, 1, 6, 1, 'safety', 'PPE Compliance Inspection', '2026-06-07', 'completed', 'Personal protective equipment review', '2026-06-17 11:24:49', '2026-06-17 11:24:49'),
(8, 1, 7, 1, 'safety', 'Machinery Safety Inspection', '2026-06-09', 'completed', 'Heavy equipment safety review', '2026-06-17 11:24:49', '2026-06-17 11:24:49'),
(9, 1, 8, 1, 'safety', 'Emergency Access Inspection', '2026-06-11', 'completed', 'Emergency routes and exits', '2026-06-17 11:24:49', '2026-06-17 11:24:49'),
(10, 1, 9, 1, 'safety', 'Material Storage Inspection', '2026-06-13', 'completed', 'Safe storage verification', '2026-06-17 11:24:49', '2026-06-17 11:24:49'),
(11, 1, 10, 1, 'safety', 'Final Safety Inspection', '2026-06-15', 'completed', 'Final project safety assessment', '2026-06-17 11:24:49', '2026-06-17 11:24:49'),
(12, 1, 1, 1, 'safety', 'Weekly Site Safety Inspection', '2026-06-17', 'completed', 'Weekly site safety review', '2026-06-17 11:28:51', '2026-06-17 11:28:51');

-- --------------------------------------------------------

--
-- Table structure for table `inspection_checks`
--

CREATE TABLE `inspection_checks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `inspection_id` bigint(20) UNSIGNED NOT NULL,
  `check_name` varchar(255) NOT NULL,
  `required_value` varchar(255) DEFAULT NULL,
  `actual_value` varchar(255) DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `status` enum('pending','ok','fail') NOT NULL DEFAULT 'pending',
  `severity` enum('low','medium','high') DEFAULT NULL,
  `comment` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `inspection_checks`
--

INSERT INTO `inspection_checks` (`id`, `inspection_id`, `check_name`, `required_value`, `actual_value`, `unit`, `status`, `severity`, `comment`, `created_at`, `updated_at`) VALUES
(1, 1, 'Check 1', '80', '88', NULL, '', NULL, NULL, '2026-06-16 02:32:28', '2026-06-16 02:32:28'),
(2, 1, 'Check 2', '80', '88', NULL, 'fail', NULL, NULL, '2026-06-16 02:32:28', '2026-06-16 02:32:28'),
(3, 1, 'Check 3', '80', '75', NULL, 'fail', NULL, NULL, '2026-06-16 02:32:28', '2026-06-16 02:32:28'),
(4, 1, 'Check 4', '80', '76', NULL, 'ok', NULL, NULL, '2026-06-16 02:32:28', '2026-06-16 02:32:28'),
(5, 1, 'Check 5', '80', '87', NULL, 'fail', NULL, NULL, '2026-06-16 02:32:28', '2026-06-16 02:32:28'),
(26, 12, 'Helmet Usage', 'Yes', 'No', NULL, 'fail', 'high', 'Workers without helmets', '2026-06-17 11:28:56', '2026-06-17 11:28:56'),
(27, 12, 'Safety Vest Worn', 'Yes', 'Yes', NULL, 'ok', 'low', NULL, '2026-06-17 11:28:56', '2026-06-17 11:28:56'),
(28, 12, 'Safety Boots Worn', 'Yes', 'No', NULL, 'fail', 'medium', 'One worker without boots', '2026-06-17 11:28:56', '2026-06-17 11:28:56'),
(29, 12, 'Fire Extinguishers Available', 'Yes', 'No', NULL, 'fail', 'high', 'Missing extinguisher in storage area', '2026-06-17 11:28:56', '2026-06-17 11:28:56'),
(30, 12, 'Emergency Exits Accessible', 'Yes', 'Yes', NULL, 'ok', 'low', NULL, '2026-06-17 11:28:56', '2026-06-17 11:28:56'),
(31, 12, 'Electrical Cables Protected', 'Yes', 'No', NULL, 'fail', 'high', 'Exposed cable near work area', '2026-06-17 11:28:56', '2026-06-17 11:28:56'),
(32, 12, 'Warning Signs Installed', 'Yes', 'Yes', NULL, 'ok', 'low', NULL, '2026-06-17 11:28:56', '2026-06-17 11:28:56'),
(33, 12, 'Scaffolding Inspection Valid', 'Yes', 'No', NULL, 'fail', 'high', 'Inspection certificate expired', '2026-06-17 11:28:56', '2026-06-17 11:28:56'),
(34, 12, 'Fall Protection Installed', 'Yes', 'Yes', NULL, 'ok', 'low', NULL, '2026-06-17 11:28:56', '2026-06-17 11:28:56'),
(35, 12, 'Walkways Free of Obstacles', 'Yes', 'No', NULL, 'fail', 'medium', 'Construction materials blocking path', '2026-06-17 11:28:56', '2026-06-17 11:28:56'),
(36, 10, 'hallllo', '12', '23', 'kg', 'pending', 'low', 'totooototot', '2026-06-28 19:52:17', '2026-06-28 19:52:17');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `task_id` bigint(20) UNSIGNED DEFAULT NULL,
  `uploaded_by` bigint(20) UNSIGNED NOT NULL,
  `type` enum('photo','video','document','incident') NOT NULL,
  `url` varchar(255) NOT NULL,
  `related_type` varchar(255) DEFAULT NULL,
  `related_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `media`
--

INSERT INTO `media` (`id`, `project_id`, `task_id`, `uploaded_by`, `type`, `url`, `related_type`, `related_id`, `created_at`, `updated_at`) VALUES
(3, 32, 3, 1, 'photo', 'tasks/plumbing.PNG', 'task', 3, '2026-06-14 18:14:55', '2026-06-14 18:14:55'),
(5, 1, 7, 1, 'photo', 'tasks/plumbing.PNG', 'task', 3, '2026-06-01 07:51:09', '2026-06-18 07:51:09'),
(6, 2, 7, 1, 'photo', 'tasks/plumbing.PNG', 'task', 3, '2026-06-01 07:51:09', '2026-06-18 07:51:09');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_05_25_064749_create_clients_table', 1),
(5, '2026_05_25_064755_create_projects_table', 1),
(6, '2026_05_25_064807_create_project_users_table', 1),
(7, '2026_05_25_064816_create_tasks_table', 1),
(8, '2026_05_25_064910_create_task_updates_table', 1),
(9, '2026_05_25_064915_create_reports_table', 1),
(10, '2026_05_25_064925_create_report_items_table', 1),
(11, '2026_05_25_064932_create_resources_table', 1),
(12, '2026_05_25_064939_create_attendances_table', 1),
(13, '2026_05_25_064944_create_notifications_table', 1),
(14, '2026_05_25_064950_create_chat_messages_table', 1),
(15, '2026_05_25_064956_create_media_table', 1),
(16, '2026_05_25_065005_create_activity_logs_table', 1),
(18, '2026_06_12_162102_add_type_to_projects_table', 2),
(19, '2026_06_13_181332_add_col_to__task_table', 3),
(20, '2026_06_14_134038_add_col_to__tasktable', 4),
(21, '2026_06_16_024432_inspections', 5),
(22, '2026_06_16_024444_inspection_checks', 5),
(23, '2026_06_28_075609_create_non_conformities_table', 6),
(24, '2026_06_28_233943_add_type_user_to_users_table', 7);

-- --------------------------------------------------------

--
-- Table structure for table `non_conformities`
--

CREATE TABLE `non_conformities` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `inspection_check_id` bigint(20) UNSIGNED NOT NULL,
  `reported_by` bigint(20) UNSIGNED NOT NULL,
  `assigned_to` bigint(20) UNSIGNED DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `severity` enum('low','medium','high') NOT NULL,
  `status` enum('open','in_progress','resolved','closed') NOT NULL DEFAULT 'open',
  `due_date` date DEFAULT NULL,
  `resolved_at` date DEFAULT NULL,
  `resolution_notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `non_conformities`
--

INSERT INTO `non_conformities` (`id`, `project_id`, `inspection_check_id`, `reported_by`, `assigned_to`, `title`, `description`, `severity`, `status`, `due_date`, `resolved_at`, `resolution_notes`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 1, NULL, 'Check 2', NULL, 'medium', 'open', NULL, NULL, NULL, '2026-06-28 12:39:43', '2026-06-28 12:39:43'),
(2, 1, 3, 1, NULL, 'Check 3', NULL, 'medium', 'open', NULL, NULL, NULL, '2026-06-28 12:39:43', '2026-06-28 12:39:43'),
(3, 1, 5, 1, NULL, 'Check 5', NULL, 'medium', 'open', NULL, NULL, NULL, '2026-06-28 12:39:43', '2026-06-28 12:39:43'),
(4, 1, 26, 1, NULL, 'Helmet Usage', 'Workers without helmets', 'high', 'open', NULL, NULL, NULL, '2026-06-28 12:39:43', '2026-06-28 12:39:43'),
(5, 1, 28, 1, NULL, 'Safety Boots Worn', 'One worker without boots', 'medium', 'open', NULL, NULL, NULL, '2026-06-28 12:39:43', '2026-06-28 12:39:43'),
(6, 1, 29, 1, NULL, 'Fire Extinguishers Available', 'Missing extinguisher in storage area', 'high', 'open', NULL, NULL, NULL, '2026-06-28 12:39:43', '2026-06-28 12:39:43'),
(7, 1, 31, 1, NULL, 'Electrical Cables Protected', 'Exposed cable near work area', 'high', 'open', NULL, NULL, NULL, '2026-06-28 12:39:43', '2026-06-28 12:39:43'),
(8, 1, 33, 1, NULL, 'Scaffolding Inspection Valid', 'Inspection certificate expired', 'high', 'open', NULL, NULL, NULL, '2026-06-28 12:39:43', '2026-06-28 12:39:43'),
(9, 1, 35, 1, NULL, 'Walkways Free of Obstacles', 'Construction materials blocking path', 'medium', 'open', NULL, NULL, NULL, '2026-06-28 12:39:43', '2026-06-28 12:39:43'),
(10, 1, 3, 1, 1, 'Check 3', 'sss', 'medium', 'open', '2026-06-10', NULL, NULL, '2026-06-28 17:41:55', '2026-06-28 17:41:55'),
(11, 1, 3, 1, 1, 'Check 3', 'eeeeheheh', 'medium', 'open', NULL, NULL, NULL, '2026-06-28 17:42:30', '2026-06-28 17:42:30');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `project_id`, `type`, `message`, `is_read`, `created_at`, `updated_at`) VALUES
(1, 200, 35, 'info', 'Task progress updated', 1, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(2, 225, 17, 'warning', 'Delay reported on site', 0, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(3, 110, NULL, 'alert', 'Task marked as completed', 1, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(4, 44, 29, 'alert', 'Task progress updated', 0, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(5, 136, NULL, 'alert', 'Task marked as completed', 1, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(6, 11, 24, 'alert', 'Attendance recorded', 0, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(7, 271, 24, 'warning', 'Delay reported on site', 1, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(8, 61, NULL, 'success', 'Delay reported on site', 1, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(9, 66, NULL, 'warning', 'New task assigned to you', 1, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(10, 157, NULL, 'success', 'Safety inspection scheduled', 1, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(11, 226, NULL, 'success', 'New task assigned to you', 1, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(12, 248, 2, 'alert', 'Task progress updated', 0, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(13, 168, NULL, 'warning', 'New message from supervisor', 1, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(14, 100, NULL, 'info', 'New task assigned to you', 1, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(15, 181, 6, 'info', 'Delay reported on site', 1, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(16, 263, 36, 'warning', 'New task assigned to you', 1, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(17, 12, NULL, 'info', 'Task progress updated', 1, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(18, 271, NULL, 'warning', 'Urgent issue reported on site', 1, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(19, 240, 8, 'alert', 'Delay reported on site', 1, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(20, 162, NULL, 'alert', 'Task marked as completed', 0, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(21, 187, 11, 'success', 'Safety inspection scheduled', 0, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(22, 124, NULL, 'info', 'Quality check required', 1, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(23, 258, 22, 'warning', 'Delay reported on site', 1, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(24, 171, NULL, 'warning', 'New task assigned to you', 0, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(25, 166, NULL, 'warning', 'Task progress updated', 0, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(26, 142, 1, 'info', 'Material stock is low', 0, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(27, 230, NULL, 'success', 'Attendance recorded', 1, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(28, 274, NULL, 'success', 'Project deadline updated', 1, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(29, 136, NULL, 'success', 'Urgent issue reported on site', 0, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(30, 203, 3, 'success', 'Task progress updated', 0, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(31, 81, NULL, 'info', 'Task marked as completed', 1, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(32, 7, NULL, 'warning', 'Task marked as completed', 0, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(33, 103, 36, 'alert', 'Quality check required', 0, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(34, 92, 26, 'alert', 'Daily report available', 0, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(35, 84, NULL, 'success', 'Task marked as completed', 0, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(36, 93, NULL, 'success', 'Task progress updated', 0, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(37, 2, 10, 'alert', 'Attendance recorded', 1, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(38, 38, NULL, 'info', 'Safety inspection scheduled', 1, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(39, 250, 40, 'success', 'Safety inspection scheduled', 1, '2026-05-28 11:53:29', '2026-05-28 11:53:29'),
(40, 125, NULL, 'warning', 'Project deadline updated', 1, '2026-05-28 11:53:29', '2026-05-28 11:53:29');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `budget` decimal(12,2) NOT NULL DEFAULT 0.00,
  `status` enum('planned','active','paused','completed','cancelled') NOT NULL DEFAULT 'planned',
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `created_by` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_by` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `name`, `type`, `client_id`, `location`, `budget`, `status`, `start_date`, `end_date`, `created_by`, `created_at`, `updated_at`, `updated_by`) VALUES
(1, 'Horizon Residence', 'Residential Building\n', 21, 'Predovicburgh', 239618.41, 'completed', '2006-03-28', '2000-09-14', 228, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(2, 'Oasis Apartments', 'University Campus\n', 1, 'Barrowsland', 408274.19, 'completed', '2002-02-20', '2001-05-05', 270, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(3, 'laboriosam optio laboriosam', 'School\n', 26, 'Lebsackfort', 623794.60, 'active', '1973-04-07', '2011-01-29', 18, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(4, 'facere fugit officia', 'Hospital\n', 39, 'West Alysson', 320410.70, 'completed', '1983-07-13', '1994-07-09', 89, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(5, 'quo ducimus similique', 'Hotel\n', 38, 'Davehaven', 551146.74, 'completed', '1978-05-28', NULL, 139, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(6, 'a maiores iure', 'Shopping Mall\n', 39, 'New Alaina', 993682.11, 'completed', '2020-10-14', NULL, 85, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(7, 'ab optio itaque', 'Commercial Center\n', 23, 'West Eastershire', 354042.39, 'completed', '1981-10-25', NULL, 63, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(8, 'voluptates quos officiis', 'Office Building\n', 11, 'Myrticemouth', 533913.94, 'planned', '2024-02-17', '2007-01-05', 163, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(9, 'nam quis laboriosam', 'Apartment Complex\n', 40, 'Romaguerastad', 668875.42, 'active', '1995-05-14', NULL, 22, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(10, 'in reiciendis eius', 'Villa', 19, 'East Octavia', 614588.97, 'completed', '2012-05-03', '2001-11-27', 14, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(11, 'dolores sit est', 'Entrepôt\n', 9, 'Anselchester', 922032.72, 'completed', '1990-09-30', '1991-12-30', 193, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(12, 'natus repellat quia', 'Construction Routière\n', 17, 'Zenaburgh', 308560.36, 'active', '2022-09-10', NULL, 220, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(13, 'dolores eum quo', 'Construction de Pont\n', 31, 'West Monahaven', 752240.02, 'active', '2006-09-27', '1978-05-12', 198, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(14, 'et adipisci voluptatem', 'Projet d’Infrastructure', 10, 'Aylaberg', 830406.96, 'planned', '1984-01-20', NULL, 120, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(15, 'voluptas eum temporibus', 'University Campus', 30, 'Vanhaven', 406648.47, 'completed', '2007-02-11', '1980-04-07', 236, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(16, 'illum expedita omnis', 'Bridge Construction\n', 26, 'New Flavie', 930308.71, 'active', '2000-09-05', '2018-08-09', 41, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(17, 'ut consequatur ea', 'Projet d’Infrastructure', 38, 'Steuberberg', 141464.84, 'paused', '1984-12-27', '1984-10-23', 276, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(18, 'ipsa animi est', 'Industrial Plant\n', 12, 'Port Margotside', 556724.89, 'completed', '2010-07-14', '1994-01-11', 201, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(19, 'eveniet error iste', 'villa', 29, 'West Tyrellfort', 479551.62, 'paused', '1979-09-14', '2024-05-06', 109, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(20, 'est sint laborum', 'villa', 5, 'Bethelland', 178458.18, 'active', '2018-12-27', NULL, 179, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(21, 'cumque dicta exercitationem', 'villa', 7, 'Isaiasmouth', 128085.84, 'completed', '1984-06-02', NULL, 55, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(22, 'laboriosam sunt consequatur', 'villa', 21, 'Valliechester', 281996.18, 'completed', '1977-05-20', NULL, 102, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(23, 'enim suscipit saepe', 'villa', 31, 'South Bellechester', 199281.20, 'paused', '1977-01-09', '1973-05-31', 176, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(24, 'minus sed repellat', 'Villa', 26, 'Susanburgh', 102338.28, 'planned', '2025-07-31', '1997-08-12', 24, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(25, 'possimus autem sit', 'villa', 26, 'Altabury', 155483.31, 'completed', '1970-01-20', NULL, 197, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(26, 'omnis incidunt vel', NULL, 3, 'West Addiefort', 839289.05, 'paused', '2022-12-17', '2007-06-01', 226, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(27, 'soluta exercitationem commodi', NULL, 3, 'North Joaniefurt', 584110.14, 'active', '1996-09-05', '2014-01-07', 264, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(28, 'quaerat velit itaque', NULL, 18, 'South Angelashire', 532697.40, 'active', '1985-01-06', NULL, 198, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(29, 'pariatur nulla est', NULL, 7, 'Jodyfurt', 383513.99, 'paused', '1978-06-12', NULL, 183, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(30, 'voluptatem non eum', NULL, 13, 'Bechtelarstad', 615609.82, 'completed', '2020-01-17', NULL, 211, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(31, 'temporibus consequatur beatae', NULL, 37, 'Forestport', 172546.55, 'paused', '1986-12-05', '2001-06-15', 25, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(32, 'Atlas Residence', NULL, 4, 'New Marietta', 402996.77, 'completed', '1991-01-04', NULL, 187, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(33, 'commodi possimus est', NULL, 11, 'North Osvaldo', 604189.51, 'planned', '2008-01-16', '1988-11-08', 148, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(34, 'id suscipit officia', NULL, 31, 'Port Otho', 232560.07, 'planned', '1974-09-07', '1976-08-11', 143, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(35, 'nam inventore possimus', NULL, 12, 'Nathanaelside', 586080.09, 'paused', '1983-08-29', NULL, 198, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(36, 'qui laudantium et', NULL, 36, 'Kesslerborough', 784784.61, 'planned', '2010-03-03', '1978-12-23', 234, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(37, 'architecto nobis ipsam', NULL, 16, 'Waterston', 350275.18, 'active', '2019-03-18', '2023-08-31', 245, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(38, 'ad quia vel', NULL, 6, 'Tyshawnland', 983091.13, 'planned', '1989-09-25', '2000-01-30', 138, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(39, 'ea eum sit', NULL, 6, 'Nicolaschester', 334506.84, 'paused', '1994-03-11', NULL, 7, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL),
(40, 'Horizon Residence2', NULL, 3, 'Kshlerinton', 706551.84, 'completed', '2012-12-16', NULL, 86, '2026-05-28 11:08:37', '2026-05-28 11:08:37', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `project_users`
--

CREATE TABLE `project_users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `role_on_proj` enum('chef_chantier','engineer','worker','supervisor') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `project_users`
--

INSERT INTO `project_users` (`id`, `project_id`, `user_id`, `role_on_proj`, `created_at`, `updated_at`) VALUES
(1, 35, 136, 'chef_chantier', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(2, 21, 30, 'engineer', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(3, 8, 48, 'supervisor', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(4, 25, 194, 'supervisor', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(5, 4, 98, 'engineer', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(6, 27, 45, 'engineer', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(7, 23, 124, 'engineer', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(8, 3, 104, 'worker', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(9, 34, 53, 'chef_chantier', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(10, 22, 69, 'engineer', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(11, 11, 143, 'worker', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(12, 22, 263, 'worker', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(13, 25, 48, 'chef_chantier', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(14, 24, 52, 'supervisor', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(15, 6, 175, 'worker', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(16, 11, 48, 'worker', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(17, 4, 263, 'supervisor', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(18, 31, 12, 'engineer', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(19, 28, 194, 'engineer', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(20, 8, 129, 'supervisor', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(21, 12, 122, 'chef_chantier', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(22, 19, 45, 'worker', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(23, 19, 54, 'worker', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(24, 22, 205, 'chef_chantier', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(25, 3, 94, 'engineer', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(26, 13, 73, 'engineer', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(27, 26, 58, 'chef_chantier', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(28, 32, 271, 'engineer', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(29, 9, 281, 'chef_chantier', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(30, 23, 215, 'worker', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(31, 3, 108, 'engineer', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(32, 12, 78, 'chef_chantier', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(33, 22, 153, 'supervisor', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(34, 8, 184, 'chef_chantier', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(35, 32, 83, 'supervisor', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(36, 38, 211, 'worker', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(37, 7, 198, 'engineer', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(38, 13, 236, 'engineer', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(39, 36, 193, 'chef_chantier', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(40, 4, 223, 'engineer', '2026-05-28 11:24:27', '2026-05-28 11:24:27'),
(41, 2, 1, 'chef_chantier', '2026-06-12 21:23:03', '2026-06-12 21:23:03'),
(42, 27, 1, 'chef_chantier', '2026-06-12 21:23:03', '2026-06-12 21:23:03'),
(43, 40, 1, 'chef_chantier', '2026-06-12 21:23:03', '2026-06-12 21:23:03'),
(44, 32, 1, 'chef_chantier', '2026-06-12 21:23:03', '2026-06-12 21:23:03'),
(45, 20, 1, 'chef_chantier', '2026-06-12 21:23:03', '2026-06-12 21:23:03'),
(46, 38, 1, 'chef_chantier', '2026-06-12 21:23:03', '2026-06-12 21:23:03'),
(47, 39, 1, 'chef_chantier', '2026-06-12 21:23:03', '2026-06-12 21:23:03'),
(48, 21, 1, 'chef_chantier', '2026-06-12 21:23:03', '2026-06-12 21:23:03'),
(49, 29, 1, 'chef_chantier', '2026-06-12 21:23:03', '2026-06-12 21:23:03'),
(50, 11, 1, 'chef_chantier', '2026-06-12 21:23:03', '2026-06-12 21:23:03'),
(51, 14, 1, 'chef_chantier', '2026-06-12 21:23:03', '2026-06-12 21:23:03'),
(52, 33, 1, 'chef_chantier', '2026-06-12 21:23:03', '2026-06-12 21:23:03'),
(53, 18, 1, 'chef_chantier', '2026-06-12 21:23:03', '2026-06-12 21:23:03'),
(54, 30, 1, 'chef_chantier', '2026-06-12 21:23:03', '2026-06-12 21:23:03'),
(55, 37, 1, 'chef_chantier', '2026-06-12 21:23:03', '2026-06-12 21:23:03'),
(56, 28, 1, 'chef_chantier', '2026-06-12 21:23:03', '2026-06-12 21:23:03'),
(57, 10, 1, 'chef_chantier', '2026-06-12 21:23:03', '2026-06-12 21:23:03'),
(58, 1, 1, 'chef_chantier', '2026-06-12 21:23:03', '2026-06-12 21:23:03'),
(59, 7, 1, 'chef_chantier', '2026-06-12 21:23:03', '2026-06-12 21:23:03'),
(60, 3, 1, 'chef_chantier', '2026-06-12 21:23:03', '2026-06-12 21:23:03'),
(61, 16, 1, 'chef_chantier', '2026-06-12 21:23:03', '2026-06-12 21:23:03'),
(62, 24, 1, 'chef_chantier', '2026-06-12 21:23:03', '2026-06-12 21:23:03'),
(63, 19, 1, 'chef_chantier', '2026-06-12 21:23:03', '2026-06-12 21:23:03'),
(64, 15, 1, 'chef_chantier', '2026-06-12 21:23:03', '2026-06-12 21:23:03'),
(65, 13, 1, 'chef_chantier', '2026-06-12 21:23:03', '2026-06-12 21:23:03'),
(66, 23, 1, 'chef_chantier', '2026-06-12 21:23:03', '2026-06-12 21:23:03'),
(67, 31, 1, 'chef_chantier', '2026-06-12 21:23:03', '2026-06-12 21:23:03'),
(68, 5, 1, 'chef_chantier', '2026-06-12 21:23:03', '2026-06-12 21:23:03'),
(69, 17, 1, 'chef_chantier', '2026-06-12 21:23:03', '2026-06-12 21:23:03'),
(70, 4, 1, 'chef_chantier', '2026-06-12 21:23:03', '2026-06-12 21:23:03'),
(71, 6, 1, 'chef_chantier', '2026-06-12 21:23:03', '2026-06-12 21:23:03'),
(73, 2, 24, 'chef_chantier', '2026-06-04 13:49:38', '2026-06-18 13:49:38'),
(74, 1, 24, 'chef_chantier', '2026-06-01 13:57:50', '2026-06-04 13:57:50');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `created_by` bigint(20) UNSIGNED NOT NULL,
  `type` enum('daily','weekly','incident','quality','safety','progress') NOT NULL,
  `report_date` date NOT NULL,
  `weather` varchar(255) DEFAULT NULL,
  `summary` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id`, `project_id`, `created_by`, `type`, `report_date`, `weather`, `summary`, `created_at`, `updated_at`) VALUES
(1, 18, 131, 'safety', '2026-03-29', NULL, 'Quality inspection identified small defects.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(2, 40, 214, 'weekly', '2026-04-14', NULL, 'Site progress is according to planning.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(3, 37, 67, 'quality', '2026-05-01', NULL, 'Safety inspection passed with no incidents.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(4, 23, 186, 'quality', '2026-03-30', NULL, 'Concrete pouring completed on schedule.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(5, 3, 274, 'daily', '2026-04-09', NULL, 'Safety inspection passed with no incidents.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(6, 38, 202, 'incident', '2026-05-01', NULL, 'Electrical installation phase started.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(7, 3, 59, 'quality', '2026-04-06', NULL, 'Minor delay caused by weather conditions.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(8, 15, 161, 'weekly', '2026-03-31', NULL, 'Project progress reached planned milestone.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(9, 12, 70, 'progress', '2026-03-31', NULL, 'Site progress is according to planning.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(10, 27, 123, 'safety', '2026-05-15', NULL, 'Safety briefing conducted for workers.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(11, 38, 265, 'weekly', '2026-03-31', NULL, 'Safety inspection passed with no incidents.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(12, 27, 262, 'incident', '2026-04-18', NULL, 'Steel reinforcement installed successfully.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(13, 7, 14, 'incident', '2026-04-04', NULL, 'Electrical installation phase started.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(14, 3, 79, 'quality', '2026-05-24', NULL, 'Site progress is according to planning.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(15, 6, 69, 'daily', '2026-04-01', NULL, 'Site progress is according to planning.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(16, 29, 126, 'safety', '2026-04-09', NULL, 'Foundation work completed successfully.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(17, 20, 18, 'weekly', '2026-04-13', NULL, 'Plumbing installation progressing normally.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(18, 32, 235, 'safety', '2026-04-20', NULL, 'Equipment maintenance completed.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(19, 12, 111, 'incident', '2026-04-25', NULL, 'Plumbing installation progressing normally.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(20, 6, 68, 'safety', '2026-05-24', NULL, 'Plumbing installation progressing normally.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(21, 30, 169, 'weekly', '2026-05-19', NULL, 'Equipment maintenance completed.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(22, 20, 197, 'progress', '2026-04-08', NULL, 'Workers completed excavation tasks.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(23, 21, 47, 'safety', '2026-05-03', NULL, 'Workers completed excavation tasks.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(24, 8, 262, 'safety', '2026-05-04', NULL, 'Equipment maintenance completed.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(25, 40, 66, 'safety', '2026-05-09', NULL, 'Foundation work completed successfully.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(26, 34, 65, 'incident', '2026-04-02', NULL, 'Minor delay caused by weather conditions.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(27, 19, 20, 'weekly', '2026-04-14', NULL, 'Material delivery delayed by supplier.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(28, 11, 124, 'quality', '2026-05-17', NULL, 'Quality inspection identified small defects.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(29, 21, 89, 'incident', '2026-04-10', NULL, 'Safety inspection passed with no incidents.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(30, 17, 133, 'incident', '2026-04-16', NULL, 'Quality inspection identified small defects.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(31, 34, 32, 'incident', '2026-04-21', NULL, 'Foundation work completed successfully.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(32, 19, 190, 'daily', '2026-04-09', NULL, 'Final inspection scheduled for next week.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(33, 25, 64, 'incident', '2026-04-20', NULL, 'Plumbing installation progressing normally.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(34, 35, 53, 'safety', '2026-05-06', NULL, 'Final inspection scheduled for next week.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(35, 13, 3, 'weekly', '2026-04-09', NULL, 'Quality inspection identified small defects.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(36, 37, 159, 'weekly', '2026-05-22', NULL, 'Concrete pouring completed on schedule.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(37, 6, 83, 'weekly', '2026-04-23', NULL, 'Final inspection scheduled for next week.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(38, 31, 245, 'incident', '2026-05-21', NULL, 'Electrical installation phase started.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(39, 20, 165, 'weekly', '2026-05-16', NULL, 'Plumbing installation progressing normally.', '2026-05-28 14:19:56', '2026-05-28 14:19:56'),
(40, 40, 188, 'progress', '2026-04-08', NULL, 'Site progress is according to planning.', '2026-05-28 14:19:56', '2026-05-28 14:19:56');

-- --------------------------------------------------------

--
-- Table structure for table `report_items`
--

CREATE TABLE `report_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `report_id` bigint(20) UNSIGNED NOT NULL,
  `label` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `value` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `report_items`
--

INSERT INTO `report_items` (`id`, `report_id`, `label`, `type`, `value`, `created_at`, `updated_at`) VALUES
(1, 38, 'Inspection Result', 'text', 'Passed', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(2, 34, 'Delay Reason', 'text', 'Weather conditions', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(3, 4, 'Site Condition', 'text', 'Good', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(4, 18, 'Inspection Result', 'text', 'Pending', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(5, 22, 'Progress Rate', 'text', '69 %', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(6, 22, 'Temperature', 'text', '38 C', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(7, 9, 'Fuel Consumption', 'text', '62 L', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(8, 17, 'Fuel Consumption', 'text', '62 L', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(9, 36, 'Progress Rate', 'text', '69 %', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(10, 25, 'Progress Rate', 'text', '69 %', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(11, 18, 'Delay Reason', 'text', 'Weather conditions', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(12, 12, 'Steel Installed', 'text', '111 kg', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(13, 13, 'Concrete Used', 'text', '13 m3', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(14, 6, 'Temperature', 'text', '38 C', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(15, 22, 'Delay Reason', 'text', 'Material shortage', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(16, 9, 'Equipment Used', 'text', 'Excavator', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(17, 3, 'Progress Rate', 'text', '69 %', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(18, 6, 'Temperature', 'text', '38 C', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(19, 14, 'Steel Installed', 'text', '111 kg', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(20, 35, 'Site Condition', 'text', 'Good', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(21, 2, 'Inspection Result', 'text', 'Pending', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(22, 7, 'Temperature', 'text', '38 C', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(23, 25, 'Inspection Result', 'text', 'Pending', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(24, 9, 'Equipment Used', 'text', 'Excavator', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(25, 37, 'Site Condition', 'text', 'Needs cleaning', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(26, 19, 'Steel Installed', 'text', '111 kg', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(27, 25, 'Equipment Used', 'text', 'Excavator', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(28, 6, 'Inspection Result', 'text', 'Pending', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(29, 31, 'Steel Installed', 'text', '111 kg', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(30, 26, 'Delay Reason', 'text', 'Material shortage', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(31, 15, 'Concrete Used', 'text', '13 m3', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(32, 8, 'Inspection Result', 'text', 'Passed', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(33, 4, 'Inspection Result', 'text', 'Passed', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(34, 8, 'Progress Rate', 'text', '69 %', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(35, 3, 'Workers Present', 'number', '40', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(36, 38, 'Inspection Result', 'text', 'Pending', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(37, 30, 'Equipment Used', 'text', 'Excavator', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(38, 37, 'Safety Incidents', 'number', '0', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(39, 9, 'Inspection Result', 'text', 'Pending', '2026-05-28 14:23:30', '2026-05-28 14:23:30'),
(40, 5, 'Inspection Result', 'text', 'Pending', '2026-05-28 14:23:30', '2026-05-28 14:23:30');

-- --------------------------------------------------------

--
-- Table structure for table `resources`
--

CREATE TABLE `resources` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` enum('material','equipment','tool','vehicle') NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `unit_cost` decimal(10,2) NOT NULL DEFAULT 0.00,
  `status` enum('available','in_use','damaged','out_of_stock') NOT NULL DEFAULT 'available',
  `supplier` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `resources`
--

INSERT INTO `resources` (`id`, `project_id`, `name`, `type`, `quantity`, `unit_cost`, `status`, `supplier`, `created_at`, `updated_at`) VALUES
(1, 23, 'Cement Bag', 'material', 179, 0.00, 'out_of_stock', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(2, 20, 'Sand Truck Load', 'material', 18, 0.00, 'damaged', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(3, 35, 'Brick Pallet', 'material', 195, 0.00, 'out_of_stock', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(4, 8, 'Gravel', 'material', 44, 0.00, 'available', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(5, 33, 'Scaffolding Set', 'equipment', 56, 0.00, 'damaged', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(6, 38, 'Cement Bag', 'material', 98, 0.00, 'in_use', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(7, 28, 'Wheelbarrow', 'tool', 6, 0.00, 'out_of_stock', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(8, 35, 'Drill Machine', 'tool', 186, 0.00, 'in_use', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(9, 20, 'Steel Rebar', 'material', 71, 0.00, 'in_use', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(10, 33, 'Wheelbarrow', 'tool', 40, 0.00, 'out_of_stock', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(11, 19, 'Crane', 'equipment', 175, 0.00, 'in_use', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(12, 31, 'Wheelbarrow', 'tool', 143, 0.00, 'available', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(13, 16, 'Cement Bag', 'material', 29, 0.00, 'available', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(14, 11, 'Steel Rebar', 'material', 122, 0.00, 'in_use', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(15, 23, 'Crane', 'equipment', 31, 0.00, 'out_of_stock', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(16, 28, 'Scaffolding Set', 'equipment', 106, 0.00, 'available', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(17, 9, 'Wheelbarrow', 'tool', 71, 0.00, 'damaged', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(18, 11, 'Brick Pallet', 'material', 102, 0.00, 'in_use', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(19, 38, 'Brick Pallet', 'material', 34, 0.00, 'damaged', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(20, 25, 'Steel Rebar', 'material', 125, 0.00, 'available', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(21, 21, 'Concrete Mixer', 'equipment', 20, 0.00, 'out_of_stock', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(22, 8, 'Brick Pallet', 'material', 101, 0.00, 'in_use', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(23, 21, 'Scaffolding Set', 'equipment', 198, 0.00, 'out_of_stock', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(24, 39, 'Gravel', 'material', 146, 0.00, 'in_use', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(25, 22, 'Generator', 'equipment', 131, 0.00, 'damaged', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(26, 2, 'Scaffolding Set', 'equipment', 148, 0.00, 'available', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(27, 22, 'Generator', 'equipment', 177, 0.00, 'out_of_stock', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(28, 25, 'Brick Pallet', 'material', 27, 0.00, 'damaged', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(29, 16, 'Concrete Mixer', 'equipment', 109, 0.00, 'out_of_stock', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(30, 21, 'Wheelbarrow', 'tool', 95, 0.00, 'out_of_stock', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(31, 32, 'Brick Pallet', 'material', 188, 0.00, 'in_use', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(32, 26, 'Cement Bag', 'material', 101, 0.00, 'damaged', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(33, 40, 'Gravel', 'material', 99, 0.00, 'available', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(34, 20, 'Drill Machine', 'tool', 38, 0.00, 'damaged', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(35, 24, 'Excavator', 'vehicle', 3, 0.00, 'in_use', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(36, 23, 'Sand Truck Load', 'material', 130, 0.00, 'in_use', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(37, 25, 'Concrete Mixer', 'equipment', 153, 0.00, 'damaged', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(38, 30, 'Crane', 'equipment', 74, 0.00, 'available', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(39, 14, 'Crane', 'equipment', 64, 0.00, 'damaged', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12'),
(40, 7, 'Scaffolding Set', 'equipment', 21, 0.00, 'out_of_stock', NULL, '2026-05-28 11:47:12', '2026-05-28 11:47:12');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('3yQijDaN7jugvAhF4eqy988UH0LsmoYx0vhIIhRs', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Code/1.121.0 Chrome/142.0.7444.265 Electron/39.8.8 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibmpyaXJTa2tZTmFqV1VFTFRTbFFZc2xpZjAyQU1KNnNtbnZySGpIdyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1781273442),
('jsaAUEELNUM75JzYqo6oxkS1wcoZl0HWgcNJgxPk', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Code/1.121.0 Chrome/142.0.7444.265 Electron/39.8.8 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQkptQ0VzcmVUNXh4MmJBNVcxTGR4RVd6NUxBMXVyaHhUYjc1UUNUQyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1781582641),
('W4GMuHlYkb83VDt394ctd9y9Iw8D4XTIhWWDMs29', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Code/1.121.0 Chrome/142.0.7444.265 Electron/39.8.8 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiR2QzZERycFQzaXo2VVh0SEQ4enpvUHprQWREdWV2WFozWFU1dXlIWSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1781272140),
('WLHZbeeiyHfWYzkKhXBBtzC5znOVSz3XTRIg1hYB', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSVpUVjZkVm5aZ0p3cXdXa1VkdUsyTzBvU2Q1TEtCek8wNnljRTVOUSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1781583796);

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `project_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `assigned_to` bigint(20) UNSIGNED DEFAULT NULL,
  `parent_task_id` bigint(20) UNSIGNED DEFAULT NULL,
  `priority` enum('low','medium','high','urgent') NOT NULL DEFAULT 'medium',
  `status` enum('pending','in_progress','review','completed','cancelled') NOT NULL DEFAULT 'pending',
  `progress` int(11) NOT NULL DEFAULT 0,
  `estimated_hours` decimal(5,2) DEFAULT NULL,
  `begin_date` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `project_id`, `title`, `description`, `assigned_to`, `parent_task_id`, `priority`, `status`, `progress`, `estimated_hours`, `begin_date`, `due_date`, `created_at`, `updated_at`) VALUES
(1, 31, 'Painting walls', 'Work item: Painting walls for construction progress', 195, NULL, 'high', 'completed', 10, 999.99, '2026-06-17', '2026-06-18', '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(2, 34, 'Soil testing', 'Work item: Soil testing for construction progress', 87, NULL, 'high', 'completed', 87, NULL, '2026-06-27', '2026-09-25', '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(3, 32, 'Topographic survey', 'Work item: Topographic survey for construction progress', 130, NULL, 'urgent', 'pending', 99, NULL, '2026-09-01', '2026-11-13', '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(4, 27, 'Site inspection', 'Work item: Site inspection for construction progress', 174, NULL, 'medium', 'pending', 100, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(5, 21, 'Plumbing installation', 'Work item: Plumbing installation for construction progress', 105, NULL, 'low', 'in_progress', 98, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(6, 2, 'Reinforcement installation', 'Work item: Reinforcement installation for construction progress', 94, NULL, 'medium', 'in_progress', 66, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(7, 2, 'Block wall construction', 'Work item: Block wall construction for construction progress', 189, NULL, 'low', 'completed', 17, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(8, 28, 'Structural inspection', 'Work item: Structural inspection for construction progress', 278, NULL, 'high', 'in_progress', 1, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(9, 22, 'Electrical wiring installation', 'Work item: Electrical wiring installation for construction progress', 275, NULL, 'medium', 'completed', 78, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(10, 27, 'Electrical wiring installation', 'Work item: Electrical wiring installation for construction progress', 72, NULL, 'low', 'pending', 37, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(11, 28, 'Column reinforcement', 'Work item: Column reinforcement for construction progress', 273, NULL, 'medium', 'completed', 96, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(12, 7, 'Excavation work', 'Work item: Excavation work for construction progress', 267, NULL, 'medium', 'pending', 21, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(13, 35, 'Beam installation', 'Work item: Beam installation for construction progress', 118, NULL, 'medium', 'in_progress', 40, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(14, 28, 'Plastering walls', 'Work item: Plastering walls for construction progress', 215, NULL, 'low', 'pending', 20, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(15, 14, 'Door and window installation', 'Work item: Door and window installation for construction progress', 203, NULL, 'medium', 'review', 83, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(16, 25, 'Final inspection', 'Work item: Final inspection for construction progress', 280, NULL, 'high', 'pending', 41, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(17, 8, 'Soil testing', 'Work item: Soil testing for construction progress', 40, NULL, 'urgent', 'pending', 47, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(18, 18, 'Waste removal', 'Work item: Waste removal for construction progress', 161, NULL, 'low', 'in_progress', 72, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(19, 28, 'Foundation layout marking', 'Work item: Foundation layout marking for construction progress', 124, NULL, 'high', 'completed', 19, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(20, 34, 'Permit verification', 'Work item: Permit verification for construction progress', 249, NULL, 'high', 'in_progress', 26, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(21, 1, 'Concrete slab pouring', 'Work item: Concrete slab pouring for construction progress', 87, NULL, 'medium', 'review', 37, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(22, 27, 'Electrical wiring installation', 'Work item: Electrical wiring installation for construction progress', 10, NULL, 'medium', 'pending', 13, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(23, 12, 'Site inspection', 'Work item: Site inspection for construction progress', 145, NULL, 'medium', 'completed', 59, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(24, 40, 'Reinforcement installation', 'Work item: Reinforcement installation for construction progress', 149, NULL, 'high', 'pending', 28, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(25, 29, 'Wall alignment check', 'Work item: Wall alignment check for construction progress', 176, NULL, 'urgent', 'pending', 54, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(26, 9, 'Site cleaning', 'Work item: Site cleaning for construction progress', 134, NULL, 'low', 'completed', 69, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(27, 21, 'Soil testing', 'Work item: Soil testing for construction progress', 267, NULL, 'low', 'in_progress', 27, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(28, 38, 'Reinforcement installation', 'Work item: Reinforcement installation for construction progress', 29, NULL, 'urgent', 'pending', 79, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(29, 1, 'Final inspection', 'Work item: Final inspection for construction progress', 174, NULL, 'medium', 'review', 12, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(30, 40, 'Reinforcement installation', 'Work item: Reinforcement installation for construction progress', 53, NULL, 'medium', 'in_progress', 80, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(31, 23, 'Material ordering', 'Work item: Material ordering for construction progress', 84, NULL, 'medium', 'pending', 75, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(32, 38, 'Curing process monitoring', 'Work item: Curing process monitoring for construction progress', 180, NULL, 'medium', 'pending', 76, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(33, 9, 'Plastering walls', 'Work item: Plastering walls for construction progress', 43, NULL, 'medium', 'review', 45, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(34, 11, 'Wall alignment check', 'Work item: Wall alignment check for construction progress', 213, NULL, 'low', 'review', 67, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(35, 28, 'Wall alignment check', 'Work item: Wall alignment check for construction progress', 158, NULL, 'high', 'completed', 88, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(36, 32, 'Beam installation', 'Work item: Beam installation for construction progress', 154, NULL, 'high', 'review', 70, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(37, 7, 'Quality control check', 'Work item: Quality control check for construction progress', 215, NULL, 'medium', 'review', 46, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(38, 32, 'Wall alignment check', 'Work item: Wall alignment check for construction progress', 278, NULL, 'medium', 'in_progress', 91, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(39, 4, 'Safety inspection', 'Work item: Safety inspection for construction progress', 9, NULL, 'urgent', 'in_progress', 31, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(40, 20, 'Permit verification', 'Work item: Permit verification for construction progress', 168, NULL, 'medium', 'pending', 47, NULL, NULL, NULL, '2026-05-28 11:30:14', '2026-05-28 11:30:14'),
(41, 1, 'khgv', NULL, 11, 4, 'medium', 'pending', 0, NULL, NULL, NULL, '2026-06-13 17:56:58', '2026-06-13 17:56:58'),
(42, 1, 'bbbb', NULL, 13, 4, 'medium', 'pending', 0, NULL, NULL, NULL, '2026-06-13 17:58:11', '2026-06-13 17:58:11'),
(43, 1, 'l,emf;l,gb v;lmd', NULL, 3, 5, 'medium', 'pending', 0, NULL, NULL, NULL, '2026-06-13 17:59:28', '2026-06-13 17:59:28'),
(44, 2, 'bnlbnnkn ,kn', NULL, 13, 1, 'high', 'pending', 0, NULL, NULL, NULL, '2026-06-13 18:41:33', '2026-06-13 18:41:33'),
(45, 1, 'n bn,kl n,,kn', 'nnnn', 11, 4, 'medium', 'pending', 0, NULL, NULL, NULL, '2026-06-13 18:43:31', '2026-06-13 18:43:31'),
(46, 3, 'jiokjkokjn', 'l,kl,l;,;l;', 3, 1, 'medium', 'pending', 0, NULL, NULL, NULL, '2026-06-13 19:32:02', '2026-06-13 19:32:02'),
(47, 1, 'meryam', '\"\"\"\"\"\"\"\"\"eeeeeeeeeeeeeeeeeeeeee', 7, 4, 'medium', 'pending', 0, 1.00, NULL, '2026-06-24', '2026-06-13 19:38:17', '2026-06-13 19:38:17'),
(49, 1, 'jbnbhnb', 'bjbbbk', 7, 1, 'medium', 'pending', 0, 1.00, NULL, '2026-07-04', '2026-06-14 09:04:30', '2026-06-14 09:04:30'),
(51, 1, 'task1', 'description', 3, 7, 'medium', 'pending', 14, 2.00, '2026-06-09', '2026-06-19', '2026-06-16 00:20:50', '2026-06-30 00:20:50'),
(52, 1, 'task1', 'description', 3, 7, 'medium', 'pending', 14, 2.00, '2026-06-09', '2026-06-19', '2026-06-16 00:20:50', '2026-06-30 00:20:50'),
(53, 1, 'task1', 'description', 3, 7, 'medium', 'pending', 14, 2.00, '2026-06-09', '2026-06-19', '2026-06-16 00:20:50', '2026-06-30 00:20:50'),
(54, 1, 'task1', 'description', 3, 7, 'medium', 'pending', 14, 2.00, '2026-06-09', '2026-06-19', '2026-06-16 00:20:50', '2026-06-30 00:20:50'),
(55, 1, 'task1', 'description', 3, 7, 'medium', 'pending', 14, 2.00, '2026-06-09', '2026-06-19', '2026-06-16 00:20:50', '2026-06-30 00:20:50'),
(56, 1, 'task1', 'description', 3, 7, 'medium', 'pending', 14, 2.00, '2026-06-09', '2026-06-19', '2026-06-16 00:20:50', '2026-06-30 00:20:50'),
(57, 3, 'tuttutuu', 'jjjjh', 274, NULL, 'medium', 'pending', 0, 1.00, '2026-06-12', '2026-06-25', '2026-06-28 23:56:50', '2026-06-28 23:56:50'),
(58, 3, 'tititi', 'jjbgtgt', NULL, NULL, 'medium', 'pending', 0, 1.00, '2026-06-06', '2026-06-19', '2026-06-29 00:02:50', '2026-06-29 00:02:50');

-- --------------------------------------------------------

--
-- Table structure for table `task_updates`
--

CREATE TABLE `task_updates` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `task_id` bigint(20) UNSIGNED NOT NULL,
  `updated_by` bigint(20) UNSIGNED NOT NULL,
  `progress` int(11) NOT NULL DEFAULT 0,
  `note` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `task_updates`
--

INSERT INTO `task_updates` (`id`, `task_id`, `updated_by`, `progress`, `note`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 30, 'Test update', '2026-05-28 11:43:47', '2026-05-28 11:43:47'),
(2, 15, 64, 63, 'Work progressing smoothly', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(3, 11, 93, 40, 'Work started on site', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(4, 2, 35, 4, 'Safety inspection done', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(5, 3, 51, 21, 'Materials delivered', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(6, 13, 217, 59, 'Work started on site', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(7, 22, 94, 89, 'Work started on site', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(8, 22, 33, 82, 'Materials delivered', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(9, 23, 238, 87, 'Plumbing work ongoing', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(10, 14, 129, 68, 'Team assigned', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(11, 10, 243, 73, 'Materials delivered', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(12, 3, 235, 12, 'Work started on site', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(13, 36, 157, 91, 'Concrete pouring completed', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(14, 25, 270, 25, 'Concrete pouring completed', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(15, 10, 252, 4, 'Safety inspection done', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(16, 17, 119, 35, 'Foundation work in progress', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(17, 21, 245, 88, 'Quality check passed', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(18, 28, 23, 8, 'Safety inspection done', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(19, 27, 31, 33, 'Concrete pouring completed', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(20, 34, 117, 81, 'Plumbing work ongoing', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(21, 17, 94, 19, 'Quality check passed', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(22, 21, 257, 20, 'Work progressing smoothly', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(23, 3, 258, 5, 'Plumbing work ongoing', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(24, 36, 60, 25, 'Materials delivered', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(25, 25, 162, 87, 'Quality check passed', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(26, 7, 236, 96, 'Work progressing smoothly', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(27, 10, 158, 87, 'Work progressing smoothly', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(28, 35, 75, 62, 'Quality check passed', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(29, 30, 171, 46, 'Team assigned', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(30, 37, 28, 91, 'Electrical installation started', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(31, 23, 187, 75, 'Work started on site', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(32, 15, 195, 12, 'Team assigned', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(33, 4, 143, 94, 'Work started on site', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(34, 40, 123, 74, 'Electrical installation started', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(35, 39, 16, 1, 'Materials delivered', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(36, 38, 274, 55, 'Work progressing smoothly', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(37, 40, 215, 95, 'Electrical installation started', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(38, 36, 213, 11, 'Quality check passed', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(39, 21, 215, 31, 'Safety inspection done', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(40, 26, 56, 39, 'Safety inspection done', '2026-05-28 11:44:24', '2026-05-28 11:44:24'),
(41, 6, 216, 5, 'Quality check passed', '2026-05-28 11:44:24', '2026-05-28 11:44:24');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','chef_chantier','engineer','worker','supervisor') NOT NULL,
  `type_user` enum('admin','chef_chantier','engineer','worker','supervisor') NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `type_user`, `phone`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'User 1', 'user1@test.com', NULL, '$2y$12$TMIpAGuEq5nN6Zde8Lj/E.qRDRz0H8U7taMdQr77mcGmpItVlFpgC', 'admin', 'admin', NULL, NULL, '2026-05-28 09:50:50', '2026-05-28 09:50:50'),
(2, 'Dr. Jamison Senger', 'jabari28@example.org', NULL, '$2y$12$Y8bhoqMLZ81k6xg3u3fIMe4nmxpRfaTWpYTkHPI6hOkY/BxyqS8Ca', 'worker', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(3, 'Abbey Moen', 'emil.dach@example.com', NULL, '$2y$12$JbDrjv25GgJRzliXmRW1jeVCT7Wdq3.S/c3cmg9j4YPH9VGbfaaQK', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(4, 'Efren Kautzer V', 'hammes.abdiel@example.org', NULL, '$2y$12$ZFb2UahJrJwWA84IOZJ9cu/euvzochlcVv76enJ3L1JxPfQ4lL4dS', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(5, 'Tito Effertz', 'glenna.baumbach@example.org', NULL, '$2y$12$5HEdRi5K2I0zx1ltoEoO7utc1NwUIbJWvVoh5DwmgTPrqTyV0nToS', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(6, 'Dr. Sid Labadie MD', 'jovan.jacobs@example.org', NULL, '$2y$12$GsisDDsqpOXHK6p48c5SOu4mfQA45UnyQf93HEhI6Y.5d7EEYO49W', 'worker', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(7, 'Dr. Jannie Hamill IV', 'thiel.myrna@example.net', NULL, '$2y$12$N5vJMWEHeTGkF7/qEAHeMeID2VrlJysl0wkd0jKARIJ2L.dAZFg66', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(8, 'Cloyd West', 'haag.newton@example.com', NULL, '$2y$12$jQTzJOVl2AdhYZt4iBUt..2zd9efdCZjq2syIAK7seUllbZHG6x9W', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(9, 'May Smith', 'hessel.hunter@example.net', NULL, '$2y$12$gVZcTCt6I14pvXmhRbIx4OZM073PwkM4w2U1V0vOOe4t71.J2fm2K', 'admin', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(10, 'Jed Adams', 'ynolan@example.net', NULL, '$2y$12$fzmnJCkPm3sqEhfN9QJfjedVvwB8e12c9.ATODRLo7XOjquwIJSwa', 'worker', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(11, 'Miss Margarett Sanford', 'fwiza@example.com', NULL, '$2y$12$geVs4QJpj6OjLZUHzu2GDegNg9eESJVVG7Kf5CQd5Za9x7m2KUK1C', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(12, 'Mr. Benjamin Schultz Jr.', 'audrey.funk@example.com', NULL, '$2y$12$7ECJlR3.yTuGoYvGE9ujfeXoqs9alLjtuBLH5GnOJdjy2jwNXEyuy', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(13, 'Ulises Glover PhD', 'bill19@example.org', NULL, '$2y$12$Y8P72tgC7h5zAsA.AnTY5evJjU4kib3QnjrwLZ7bG1MkPP.z1prIq', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(14, 'Meda Reinger IV', 'kenyatta95@example.net', NULL, '$2y$12$GKSn8W3GNUeQZTJ6ubjVu.jAh/2bL3GUCCoRDjvTFASZyRvD0QRFW', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(15, 'Mae Douglas', 'cromaguera@example.org', NULL, '$2y$12$NfmBubMypEijqccLOcJEB.dmLEgUywz/uBFkSNP/XN951VyoZkv/C', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(16, 'Jadyn Kuvalis', 'dubuque.alec@example.net', NULL, '$2y$12$cSdBf9bFKYS/UC.6FCuZeexjtZt3MgikxjsQyZ8mfGwUr0xfMezOe', 'worker', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(17, 'Terrell Miller', 'qcarroll@example.org', NULL, '$2y$12$AdumIT3fApDX7ar6cmSYV.jIftEVlaNDKXO6vczYiWzizIQiCKRli', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(18, 'Ignacio Hintz', 'dee.skiles@example.org', NULL, '$2y$12$VQjhF0bpZOZg2lYQYTeZ/OnzDtcWZwfuD6DFiQWxx72WbJsi0GVL6', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(19, 'Isaiah Zboncak PhD', 'ayla.ebert@example.com', NULL, '$2y$12$X/1riHMdFw.5jqD.5sZaJ.WckVD5ihkmiYJbrl/2BI1E72zvXcoKm', 'worker', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(20, 'Dr. Irma Renner DDS', 'pierce88@example.com', NULL, '$2y$12$AjVqGtASAUoNpCTQlxRCE.axAA5CKOh2QEvybnARLjVH5Fguyl/jy', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(21, 'Prof. Alayna Reichert DVM', 'gussie.anderson@example.net', NULL, '$2y$12$cAOq7NC6A9crkuENUPwB6.F64bofZh/jg91/oEitvC0YOEuLwXZ5.', 'worker', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(22, 'Yolanda Feeney I', 'olin.rippin@example.com', NULL, '$2y$12$dawFFok41ZrpFVqcSpRG8uFOoYK.374mu8ejlGCEYBiKaR48GvIWq', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(23, 'Juanita Hyatt II', 'reichel.elwyn@example.com', NULL, '$2y$12$SmFaXa0jUYbtSrX/H4OyFOH3ztl4mUposhMX.dUxVsCKyOUKsywfe', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(24, 'Queen Bahringer', 'leannon.rudolph@example.com', NULL, '$2y$12$wVJNfZmbpKdG3drItA557ODZriKCqdAouOH55D7ZOwQntSGB0GVmC', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(25, 'Sylvia Gusikowski', 'qjacobi@example.net', NULL, '$2y$12$Tv9d7eHGMonoBnE/AfJ0Y.YQhw4AxqeM7jrpL3a93W3YcHBQMiIXC', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(26, 'Prof. Bettie Reichert V', 'slegros@example.org', NULL, '$2y$12$IcNpUgZzksAYoJcq/2JEKenb9LG52ZQjJrsC0wKWziQx9j1/as4JK', 'worker', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(27, 'June Schuppe', 'domenico.kshlerin@example.net', NULL, '$2y$12$HwgE.Tk2jGgh33SyFXaB1.8NK/0HJRZ/MiyfBpR46lxPjy49o9xqu', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(28, 'Susan Jast', 'leopoldo99@example.net', NULL, '$2y$12$4bcZgW9uOunVTMF05UfAk.9nsAf42f4K4DiBRKvW/Yh3cGxsKZ1Iu', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(29, 'Maye Jenkins', 'schmitt.antonina@example.com', NULL, '$2y$12$P8rDJG7Drrb7QPXuewSmB.m5OYfznTxLtw5LawhFag2yOQoaTrYJy', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(30, 'Zoey Stiedemann', 'savion38@example.org', NULL, '$2y$12$rVQ.PQ5KjhtQDTS5BuQCtuBiABeh9ANsRZ2GsHJD3uP1pRxu6gkme', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(31, 'Miss Vivien Streich MD', 'ferry.edgar@example.net', NULL, '$2y$12$Gm7uLSpOZ8XgQRnws2agg.akicIamwmrFdDiH9vbjJbVY9P3Wf.Ea', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(32, 'Dr. Toni Labadie', 'ihand@example.net', NULL, '$2y$12$P2/VgwDAAKxPyVzL4CpcNuhDX5qTa2U5ua0yum0mxu5sRC.03FqJa', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(33, 'Rahul Flatley', 'fritsch.eliane@example.com', NULL, '$2y$12$6QUjvP8en1ki236uPyF11ui8iPegvylkUCJB/IIPZCuu1BkU1t6ba', 'worker', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(34, 'Mr. Garnett Welch III', 'allie74@example.net', NULL, '$2y$12$X/G.qx7C/L14RdoTR5BBVep4bDQtvhKDk00cXaYVdfZQNosE3TQLO', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(35, 'Sarina Gibson', 'wbogisich@example.com', NULL, '$2y$12$yaQiSMKsuk36EENHPX0n9eEFUZhVMfa8OhoNSmiEHYa2wwTiW8uc2', 'worker', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(36, 'Mitchel Rodriguez', 'srutherford@example.org', NULL, '$2y$12$.1CDQLihgt0Fl9MGIceee.gMkXzGFoXat4y2TzrjArrQjEOC3m0Oy', 'admin', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(37, 'Prof. Jannie Beahan DDS', 'romaguera.carolina@example.org', NULL, '$2y$12$juaK9a6UqO0Sfddiu6T8SehGco4y3aXcTAdb42fTG606tm0Bntt5y', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(38, 'Dr. Evert Hermiston I', 'bradley22@example.com', NULL, '$2y$12$h5DCFabXeYvBe2LROHd5COc/2DCY8EKWbUV0BZh7jhuMneUzj9XKe', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(39, 'Zack Schmidt', 'plangosh@example.com', NULL, '$2y$12$ONpI//ZeQr1ymoNKgK9kkeaIhffDXJlSZco1DSahwMIBUtqL4wQCe', 'admin', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(40, 'Mr. Damon Farrell', 'hterry@example.org', NULL, '$2y$12$nihSFKFgX8qvffclHHBtjedxwOwWJ8gzBPM/SjfpvLCl9EYW.Q3G.', 'admin', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(41, 'Woodrow Blick', 'gregoria21@example.org', NULL, '$2y$12$S.syRrO8zZrMumkpGBO/POBr6g1CJfGHCvbSs7VRjvXrp4Io9UEs.', 'admin', 'admin', NULL, NULL, '2026-05-28 10:09:00', '2026-05-28 10:09:00'),
(42, 'Krystina Franecki DVM', 'bernadine74@example.org', NULL, '$2y$12$QUgT8UGg0XIJkX1NiTX/jukfsG.8foLcYcD8JV/G6qNssY.29rnI6', 'worker', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(43, 'Adrian Becker', 'jordon66@example.org', NULL, '$2y$12$4le50Eot2rgVpvAEFzFRy.ADdZ//WhWc2vz8bSKNUP/jt0XLuwkvW', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(44, 'Katelyn Larkin', 'grant.chanel@example.net', NULL, '$2y$12$IYBU2sr25NfISfzs8qHubOUlw.w475m6Sb5Uane.ux9PxGKmzIV.C', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(45, 'Burnice Keebler', 'murray.zackary@example.org', NULL, '$2y$12$mvFKC7BjkzzHMARUYkfwCesTb6uQABPkVxUEcZA//1VdweW1yZ.yi', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(46, 'Raina Botsford', 'dalton63@example.org', NULL, '$2y$12$eOB/dRra5dFsmOdVmNZBxu1RsNLD/RYh1jjVm4UfWmyKEPie7tBX2', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(47, 'Olin Rowe DVM', 'robel.constantin@example.net', NULL, '$2y$12$aJAYgoF8Hf4oI1t2X3l2XuqbnJXG5lVFVUfIG.f6qa.smDrglMEbC', 'worker', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(48, 'Lilian Schroeder V', 'schaefer.merl@example.org', NULL, '$2y$12$lybHDL8Xbp1/7RuqYLxNfuX7a41k4BmKzmbtTA/ss7dXgTxHnOG2.', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(49, 'Nolan Boyer', 'rath.kobe@example.com', NULL, '$2y$12$Zev7KLjyt0UOnUKpynTMiO9PzoeKTyvmnVWjV8xlAdTUFAGep000y', 'worker', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(50, 'Prof. Josue Schimmel DDS', 'bednar.breanne@example.org', NULL, '$2y$12$9iGqahQ9X4Dx2YcQCgEpMuEYFaDNB/5QdnUK90rVKGQJ6a0/2BViC', 'admin', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(51, 'Vena DuBuque', 'maximillia.cormier@example.net', NULL, '$2y$12$IuH7nb4Iy8kgbmsZWhR/S.rm0fCdcesu88mS83JbZMJxGxUHsPlvO', 'worker', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(52, 'Kody Tillman', 'larkin.marta@example.com', NULL, '$2y$12$PiKZ3NKmOXDMImqbXdtMwuTOh1zuoCOy1FDGXnv3l0NNIEQBAzBoy', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(53, 'Dr. Alexa Mills II', 'rubie58@example.org', NULL, '$2y$12$ZKlvoXIJEqFnmaHZxI7ode4jr4Cmwwj927INblMIrU/QEQI5ZQDUG', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(54, 'Liliana Price V', 'doug.koss@example.net', NULL, '$2y$12$tNsNfIM.7EYZEuW/1HoMa.oBdIGtcKmQoJYLeOlUSZMgr62I36V0i', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(55, 'Winston Kunde IV', 'sierra.leffler@example.com', NULL, '$2y$12$DklbUOFKegHbcGKyMqzPau7p8OOf1ZfYiEtbmSBvWBllwx0EKrz0y', 'worker', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(56, 'Miss Antonietta Keebler', 'lubowitz.chanel@example.com', NULL, '$2y$12$Dp18A9mt65kmjbclB4ZKIuUMT.6DPYNb1xopuXWgs14mAtjq./FDC', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(57, 'Kim Cruickshank V', 'adaline.sporer@example.org', NULL, '$2y$12$AdWwHMwKaGg8Ngd5kQ0o0ubwD6k578V.SgXYjcxvnadL2A3ZXwIKy', 'worker', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(58, 'Liliane Schamberger', 'aditya48@example.org', NULL, '$2y$12$JKPzRLsqsBhwDzl8yU11juR3oilrrDVX8Sm9QsXBmDM4NijRccbya', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(59, 'Miss Macie Hill I', 'kareem42@example.org', NULL, '$2y$12$s2fwsqMyn8fgQfG0y.rnNe9pn9EFnG2gZwWnXU.W/27BvSBAQi4SW', 'admin', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(60, 'Prof. Jacey Harris', 'berry.hamill@example.com', NULL, '$2y$12$1TzDCX4z6w/zZA6S829W0.9z06XvpLqmIauhjNEfMdTCtUnoUVPFK', 'worker', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(61, 'Gladyce Bartell', 'tnader@example.com', NULL, '$2y$12$slUMDItIdgCn4xHSQNo/SOx91PxHsHnRi4IcyWLAhfrBe8AgwSAmC', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(62, 'Mr. Jarred Ortiz', 'mariana54@example.net', NULL, '$2y$12$B9GmQWHArK5fkoSY6vthbeayHglvAWw77Qwp0ZYDM30mQqXBUZIBq', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(63, 'Prof. Brycen Hammes', 'muller.carlo@example.org', NULL, '$2y$12$sPcfvDRiXC7cUfbRTIFtR.9FhIBFBBxRWEgUF6FgNcD1dfrZTIJpW', 'worker', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(64, 'Clark Connelly', 'victor08@example.net', NULL, '$2y$12$MbUa4qSmNhJqpi5RbZLP6.jTIYuBpRsi1s9nELVcHysl0mCSLEQQK', 'worker', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(65, 'Dr. Arlene Watsica', 'wiegand.mark@example.net', NULL, '$2y$12$KeWubrw5ByGye.ielHxLi.ZLpBtMJU6JZSz0LLdIWDWtWBEJiDDBu', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(66, 'Dr. Sonya Watsica I', 'qweissnat@example.com', NULL, '$2y$12$o/u3COlXUCi30ye58kwQIeIHr3GhTD0FbiWorNWK0Fy7NLXXBga22', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(67, 'Margarett Reichert', 'iyost@example.net', NULL, '$2y$12$aFgBTo4am62MFRvludZZh.JkBGOmF3uYOxSS6m/UGL44R7Y1zhLo2', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(68, 'Prof. Giovani Wyman IV', 'eulalia.gottlieb@example.com', NULL, '$2y$12$o5ioZxYJGzodFYRnp2hFNeXCPHRDxw2pZXRTrsmSXIsfqPb/SMIVG', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(69, 'Stefanie Watsica', 'ignacio.hirthe@example.com', NULL, '$2y$12$r7PqaLFYTr41H7c1htimhePwLea/rpmoDjNdPHNrsIzXOzzBhGR9u', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(70, 'Dr. Troy Rohan', 'conrad08@example.org', NULL, '$2y$12$sulMh96aS55tGo2LsfMqTOLvqzOoHy9lhWtfSszEEtK7d7aWtV24K', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(71, 'Elmer Davis I', 'jstroman@example.com', NULL, '$2y$12$xUWNaWW5Ve4A41Nihr3YuePdJZEsf7p/rv8naxSXShgeKazBp41Ja', 'worker', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(72, 'Calista Lakin', 'ima.cartwright@example.org', NULL, '$2y$12$ciCtimXZisObSxHoTAX7Tuyrxyl.tw/H0A6/r.MkqOaAgWG3g6qEW', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(73, 'Ms. Ava Lowe II', 'berniece38@example.org', NULL, '$2y$12$kOjfOoql9FVDa8CA7qyza.XuBOu6WTdA0yUUi4DxPxzrdrTZjJxvm', 'worker', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(74, 'Mrs. Aliza Schroeder PhD', 'baltenwerth@example.org', NULL, '$2y$12$SMyRLTqSHEVtTKCkyORfPOrE/kEpzaO6TvBg0R8vz.fTVwffR4p3i', 'admin', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(75, 'Angie Schneider MD', 'antoinette.kuphal@example.com', NULL, '$2y$12$McqsHnfJXU3Tc4d0YLNRy.KeWfCeQ4EWdbTm3BPbcPY5oB.DkjnVe', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(76, 'Theron Leuschke', 'wisoky.deangelo@example.org', NULL, '$2y$12$5OOTU/Cw/lXppkOVcOKVseCuvy6gMqGU3Bmn8iT1S26pQuTIN1PYC', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(77, 'Felicita Wintheiser', 'poconnell@example.net', NULL, '$2y$12$gTWEZpE7C6irbnDHZxnP3Ojsm.YLtM.NTASS6lIU/4.qLgMlgpBUq', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(78, 'Golden Murray', 'halie44@example.net', NULL, '$2y$12$H30s55/oGMsNB.a/Vk.vzuBYcCAYsyiDgzROwy6l0OomyvSDZtIjq', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(79, 'Lonie Pouros I', 'beatty.norma@example.org', NULL, '$2y$12$nZXs8Tt3k0mCj1M1AGySHujkSolxCRIH.a/gurPyZSqlhvziupk5C', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(80, 'Laurianne Wiza DDS', 'burley.prosacco@example.org', NULL, '$2y$12$gmqbQcpWesCaDZ4tdpYZ8.T6to4Jd6pfZMMv5cb.pELA6avE0l.gS', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(81, 'Crawford Spinka', 'thiel.marquis@example.com', NULL, '$2y$12$fb42Qd0BSlEYpLFkvXhh.uYJ5sXogBaUArC5C/fU601EA4YJMP4xW', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:09:45', '2026-05-28 10:09:45'),
(82, 'Tiffany Klocko', 'sonya.kohler@example.org', NULL, '$2y$12$dotXr4y/Kqtw1eO62OJyreBvmkuIUOSYn2IotmtKknO4q3PY2mcUa', 'worker', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(83, 'Emily Volkman', 'homenick.rhett@example.net', NULL, '$2y$12$2B3Dq0MHQC9FujaN3yai6.U9KM7sXSjjxXG/ARg6kOwbRls36X1He', 'worker', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(84, 'Ms. Caitlyn Rolfson MD', 'hansen.evans@example.net', NULL, '$2y$12$SSgj748FtghwNfqq2Oq39OxXNQI9GoivrRl45amdGxiuK83u2Hm..', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(85, 'Dr. Heidi Price IV', 'cmckenzie@example.org', NULL, '$2y$12$wtAeTWYHWmx/6xPx12pr1uzTgJTi3Osu2COSOAcABctJOTzgw.KBG', 'admin', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(86, 'Prof. Donna Hoeger PhD', 'kirlin.beulah@example.com', NULL, '$2y$12$iQqBUHwtM.Hl3qixhSCT8ueoPs5f/zSfyJK5GC2LKHhB3lqRf4hL2', 'admin', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(87, 'Olin Dietrich', 'nmueller@example.net', NULL, '$2y$12$JEyzW8WV0bTJsUzfUexGre76/TfrupxMmUQNyA1JX2hvp5j5IuD5q', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(88, 'Brennan Lesch II', 'block.karelle@example.net', NULL, '$2y$12$.uQCGorZK3yvF9EnCgvRK.3WwCgJNLnxJKe5bzgx/X9DMEEd2BY8e', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(89, 'Jada Osinski', 'corine72@example.com', NULL, '$2y$12$wNhxQam3qBKR28hhdOITF.1L4uGv2HFj/UGFngihilFXNQNn.X/XG', 'admin', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(90, 'Lindsay Kirlin', 'schumm.novella@example.org', NULL, '$2y$12$zyiT0XsfhM7rTpWP0KHvJedYHCjXgfNuErWKLBATzDFsZSx6nyQwG', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(91, 'Lindsey Schoen', 'istreich@example.net', NULL, '$2y$12$zDtTxdEa/y7OPb9awd6uOuc1.C.rmvKwoF4WxpY7514u4qZ8ZWR/a', 'worker', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(92, 'Leora Glover I', 'kunde.kayli@example.com', NULL, '$2y$12$IY2kGCkM4He40wi9bC1PXeelrppYFslEWKzMGtRXs.Agw5qIkk3pq', 'worker', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(93, 'Israel Goldner II', 'brenden.hartmann@example.org', NULL, '$2y$12$M8sDFFc5m/tWMRy34FufQetuvEVii71nbCumcKPZHMGjLxgBsAAiq', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(94, 'Beatrice Fahey', 'heidenreich.lyda@example.net', NULL, '$2y$12$O3quPYfp5FK0B6LrpIDTiukm3UfJYhchzMFu9Ls/f1ndCE3xrcSwK', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(95, 'Mikel DuBuque', 'kuhic.catharine@example.org', NULL, '$2y$12$DGbXMCcTI3aSrVIOhz4PwOEMIIZmxaFxRWN.bmaGb/tT0NbgG1AEy', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(96, 'Annie Gerhold', 'wyman.cheyenne@example.org', NULL, '$2y$12$ONCA7RaUo3Taz8x55eV5PuBpzBbpRRctrj9pduthRA7aMdDT9wvo2', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(97, 'Lisa Kozey', 'bauch.luisa@example.net', NULL, '$2y$12$3BCrxdx3ezMpLESQ9dvLc.OYAZbZi5u/IjAHIGQSRxf.mz3RvIKLG', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(98, 'Rhett Upton', 'dickens.charlotte@example.org', NULL, '$2y$12$4XdGXN.KOdU/GZGn06XPzOONSc1MxUSYCjP1acI91dpL.p7FuKiS6', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(99, 'Howard Herman', 'fanny66@example.net', NULL, '$2y$12$5tf5fFNj9ntpHTIe1QJIGuGL/SEkP9RpxAedFz/lLWT3z5B1vmHde', 'admin', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(100, 'Yvonne Zboncak I', 'rosendo86@example.org', NULL, '$2y$12$FTxb3p3CaWB3yh5Qq.SMA.jtyqOck2.8sp1rEaXysYN.m67lUJ1Mu', 'worker', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(101, 'Prof. Cali Schimmel Sr.', 'hegmann.monte@example.org', NULL, '$2y$12$A0E.7UqAiOpCQ4mZUeLf9.MBViqmzPOgE0tgMJtj.uyz6xXbMiLpe', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(102, 'Geoffrey Kiehn', 'alexandria75@example.org', NULL, '$2y$12$/7Js7NSjDNcjFqcchQlmrerpwUqmHxJPrzXZvG6JfBTY0eZM5eYAq', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(103, 'Mohamed Reilly', 'norris88@example.com', NULL, '$2y$12$gxN6S6pZua17.0GV.0hkjOS2dwFZ8i8Z5ztprclKDMCCoWVOTbDpO', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(104, 'Ms. Elyssa Kautzer', 'king.heidenreich@example.com', NULL, '$2y$12$wiPXzKHVZy3FokM9d60MIuWPnzuStR6x94ugSAylBpEBBkBe5L1RS', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(105, 'Miss Lura Heaney', 'erika95@example.net', NULL, '$2y$12$Cdp56xUJ9xnITp2rY2m4duwZnbkuVUPBu2Iz9h/ViL90xmc7GjaSK', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(106, 'Jewell Reilly', 'colin99@example.net', NULL, '$2y$12$mTov3H.kdLzYVR.nF6O8fux.goG2NfjEEYGO3LUIE4ZjMLbym3nCa', 'worker', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(107, 'Dudley Zboncak', 'vincenza85@example.org', NULL, '$2y$12$E/BjK8FxwzJhxPzeeYWBaOL3LHaS59XT12tCsvDW9VskVJZhmkLJG', 'worker', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(108, 'Dexter Stokes', 'von.heidi@example.com', NULL, '$2y$12$IiWvyUO.enkGnd3aoXMsSOY8FveFQRf4uulUKMHz4MszeOvA4S1fu', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(109, 'Dr. Vallie O\'Reilly', 'rrunolfsson@example.com', NULL, '$2y$12$rdQi3IFmun5HIqkHlzjB0.GpxK4D067Qvy28e9kj42hkSIYz9iqZm', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(110, 'Quinn Schiller', 'dwilliamson@example.com', NULL, '$2y$12$fiHG6DnZjIxJcYB15H0e/.2yZYwo4q304rZlBvjiwYnqBpW3DJs9G', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(111, 'Evalyn Kirlin', 'bmoore@example.net', NULL, '$2y$12$P4maD2JljIdgC88huUKIWuaqtWrIG9OHY5/RIOFyfGU3hnuTZsen2', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(112, 'Rico Wilkinson', 'champlin.verdie@example.com', NULL, '$2y$12$f3Hr7Qs4DkJUnLnRqCJYie7wm/fjpdL7xdIYKfC.Rh9sxwgecXwei', 'admin', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(113, 'Jewel Rice', 'deckow.felipa@example.com', NULL, '$2y$12$p0ki1nGMlm8LAu4D/O05/OoOO4fCyeP1DEQ.faJQZgWLaRvfzJf.e', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(114, 'Mrs. Tomasa Kub', 'lizzie.dach@example.com', NULL, '$2y$12$XrSzsAFjuIq.n92pZEOAUeNtCQSbYIc5rks1wS4BzgnE3e0/9v2Au', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(115, 'Nathaniel Crona', 'rgleason@example.com', NULL, '$2y$12$JW9FEGWM0seELYU6bf9sz.YiL2UJ3dlJ4TG2ldPHFsv85msOcXxc.', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(116, 'Patsy Daniel PhD', 'suzanne64@example.org', NULL, '$2y$12$/l0Y3bWJko9e9vUJdWzuReI8YsPXHZCpdqouAGbNxEfi5r8ilb0xy', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(117, 'Dr. Serenity Hilpert MD', 'bruen.bertha@example.com', NULL, '$2y$12$5moZNRVvxRTYOvycMr6Noe5Wzgn1k1TTbxjOCrttfxBUl5Qd2arbW', 'worker', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(118, 'Dr. D\'angelo Hoppe III', 'cynthia.schmidt@example.org', NULL, '$2y$12$sXOaGlycXNin11dL55pMKePjHHyzRMyUhTZ7nfuOR27w3sMit2UaW', 'worker', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(119, 'Lily Willms', 'icorwin@example.net', NULL, '$2y$12$8sRhESGP8/FbYd7pqTsnYe/AQWVfIYUfECT/FGNgddI.3AfhtSfRC', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(120, 'Prince Gusikowski I', 'rebeca72@example.net', NULL, '$2y$12$PkjeUvsNPuJX7okmAVuLiOGJiFcAWa/hC01ZZxMkOKa7VQQ8aOO.u', 'worker', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(121, 'Miss Dorothea Wiza', 'rebeka51@example.com', NULL, '$2y$12$9hPnVnEJ.2tM2mo73jhNF.NgAa03DjKtfjF.08vikPLyK9ReZ.Fhq', 'admin', 'admin', NULL, NULL, '2026-05-28 10:18:10', '2026-05-28 10:18:10'),
(122, 'Berry Williamson', 'jevon68@example.com', NULL, '$2y$12$nf.5xNr2syha7vg8ntr2YuAM7G3OGLudfg5RTfiWdHLmkdpcI6GhS', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(123, 'Raquel Walker', 'hboyle@example.net', NULL, '$2y$12$ak3Gxkq2nA.02wCbzXT5DeJoxfEbKy4LmDy8zNpq9kGDuoq.lYv6W', 'admin', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(124, 'Aniyah Hessel', 'dhyatt@example.org', NULL, '$2y$12$Qegaaf5JbWQhAfwdF4S7L.GXZj3oyBkHmVdz2//LL.hqL02fJGjJq', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(125, 'Consuelo Howell DDS', 'kcarter@example.org', NULL, '$2y$12$tKR9zVELxeAqTdMh4RGhDOp/ZZR/GeeN2mrlYzqAZs5MryVVjR1sK', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(126, 'Dr. Abe Heidenreich', 'darion48@example.org', NULL, '$2y$12$9UCsZVFIOWTJC2h4jXgB5ebha5Ckvlw80tVZt06eRgVufojkq345W', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(127, 'Drake Boehm', 'ashtyn77@example.net', NULL, '$2y$12$v7gfX6cgvurzviJitY4Na.hUI8j9ClCXDUsYHub5Qnl8oDKkdwf4y', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(128, 'Mr. Humberto King', 'thompson.teresa@example.net', NULL, '$2y$12$kZjlb2aykY2KCemjMJxUVOS9CvDLjCqB7U9K9OWcK2rPjlE.TJSvq', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(129, 'Dr. Teagan Larkin I', 'eldridge04@example.org', NULL, '$2y$12$6/x1.vvjMywc.zmWutB6uuJ536WNTeUiFGDac/PSskaLRIqm2XxIK', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(130, 'Meda Bode I', 'hane.noe@example.com', NULL, '$2y$12$.u5ublxI3OLVjLVVCXGb.O9qe0r60pVuXLfFYBYeE5n47Gq0QMUxW', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(131, 'Dr. Eino Yundt', 'zcorkery@example.net', NULL, '$2y$12$nvaRLy2BUuorD6dE5OJAy.SScTsNUiMnNPZ1ycXBnP5Cey5cBaVXS', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(132, 'Prof. Ignacio McDermott DDS', 'bashirian.caitlyn@example.net', NULL, '$2y$12$qZ6JE/zsk3pvOnHz0jrwUuWDDJW7hqXWUHmfFfCpjYL8ydKxKLKrO', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(133, 'Mr. Omer Hilpert', 'santiago.rowe@example.org', NULL, '$2y$12$3ENIeSXWg338TxdkQBVks.iBeOGVa6gd3Aj2U4KorcO7wIUvROJJq', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(134, 'Dr. Charlotte Parisian', 'vlakin@example.com', NULL, '$2y$12$BvoRgGdMSpZi711DoaUcfeSdzNspMx89r3isiItMIQSUmmzRs.3Zq', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(135, 'Sydnie Shields', 'markus.schamberger@example.net', NULL, '$2y$12$3gx2OW90pd5w0F3YaxC4E.J0mpaWxjTlKdLhnp6Qyzp0WRkGgyaS6', 'worker', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(136, 'Ms. Maudie Wilderman', 'vivianne.ruecker@example.net', NULL, '$2y$12$UowtvdrleC9kG1Otg5bOdOtTzPDGWKe5aoWlnWqkUVkoNMFyHrQMe', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(137, 'Mr. Hardy Wilkinson', 'dcarroll@example.com', NULL, '$2y$12$HB6MXDGxGNsvHGo77F/4UurfMiisIof72JrviBbqoBz5F7vyPOZ0K', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(138, 'Kathryne Walker', 'carroll.isobel@example.com', NULL, '$2y$12$ZPSmdVmtQVNQaWXQv0E4NOiP0LD.eYug.jMaIxYL2x4268lVzXs1K', 'worker', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(139, 'Retha Hintz', 'tkeebler@example.net', NULL, '$2y$12$fwIgvBuhb4TNz3I2UFv.c.tlFb7/hDZ04lMI.Q3BELAHNMGhlPhPu', 'worker', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(140, 'Leonel Balistreri', 'hkilback@example.org', NULL, '$2y$12$RaJX0i8SLbl9pCF7IXKkouJ2IAy8SorKWtgHB8IwvPYfKM.cij7Ja', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(141, 'Kaelyn Purdy', 'zboncak.lourdes@example.com', NULL, '$2y$12$l2vtJgRcUPglITl.dMhQeOoSVJ2c5ikCPezHpzPFQ7KEIxshV24.a', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(142, 'Prof. Jane Purdy', 'hegmann.ressie@example.net', NULL, '$2y$12$Qqa3insulXqNp3WcYUYOB.LDVIgCDVHKSCSgXv8FwS38O0Zinei0K', 'worker', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(143, 'Jade Gleason I', 'zbreitenberg@example.net', NULL, '$2y$12$mknzWzXqtuly4UM49rpg3.JRgPN2kbH0CbY9Kx5EGtp/7q.t.hvj6', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(144, 'Precious Walsh', 'walsh.lindsay@example.net', NULL, '$2y$12$1Nn774mK4wQ3BCJWLGTCtuq8m7W/XfQvz2SSDR9B61/PaBm5..xv2', 'worker', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(145, 'Bridgette Little', 'kihn.marie@example.org', NULL, '$2y$12$cgDKusDXvC097w4crxYZGe0cLXipmcT5hbtKSOZMWTEySsswp4.76', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(146, 'Dr. Wiley Willms Jr.', 'jace98@example.net', NULL, '$2y$12$hpiZDmzCjEfZFW.AQ4nKze9/srtMY8rAl786CFr6hybO9lmcuNvbW', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(147, 'Roman Strosin V', 'missouri.nicolas@example.net', NULL, '$2y$12$tLNwZZ42iuW4oKmdYxRDYenAWN52bXXaftvbt/a7ypnYF8aqfus0u', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(148, 'Curtis Ruecker', 'macejkovic.eliane@example.com', NULL, '$2y$12$BCHBB5GPsh4KVZBcrbExw.ijh3o.V.8u0ceg9IbmjsltRtiE.WSIW', 'worker', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(149, 'Brenna O\'Keefe', 'sandrine.walter@example.com', NULL, '$2y$12$bEDP7oCbe2yLJo2Q30DYvu86JLHmip/aqzSrlnqi.r7/BFBntgVxC', 'admin', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(150, 'Mr. Weston Daniel III', 'antonetta.lynch@example.com', NULL, '$2y$12$SRWxIaXvLLCW7RneqQwAqeJTe17OJSdfvkXW8L4Y8UkRn3cuAgFhq', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(151, 'Monty Kassulke', 'emery.dickinson@example.org', NULL, '$2y$12$yyQ2KMxGJRfpbKuEot6EoO.DXG0.2d.m.8dZptnY9VZj7AOtL1Wn2', 'worker', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(152, 'Prof. Milton Rippin PhD', 'freichel@example.com', NULL, '$2y$12$D5smkRbB6HJmyKkG3qfQAeLuVDvZ/0P8asajVGSphXalnJKpX0TwW', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(153, 'Dr. Aliza Shanahan DVM', 'streich.ahmed@example.com', NULL, '$2y$12$6HmCh8Dl8xwYhpVe/3R/POTpb8EFJJ9tz2cB2erHwkjVv9YhoNRyq', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(154, 'Veronica Lehner', 'gia.kutch@example.com', NULL, '$2y$12$uTslCAGiQ.yv6PcXvAO7WOI030P.AN0vFp7BqZgme0IL8MKorVBBK', 'worker', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(155, 'Dr. Nestor Steuber', 'julius.boyer@example.org', NULL, '$2y$12$ewzf4YnnkJQq4iGGTCPp2OWeW5ukQ81lGynD8EJj3zfZf2J4QWXjq', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(156, 'Ezequiel Keebler', 'hayes.gayle@example.org', NULL, '$2y$12$QzyvZ.8bXlK7BeLnWYkGOut8hC2rOMIGoAqxtfZgGzcY3PQZXVRRC', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(157, 'Mrs. Aubrey Abbott', 'lstokes@example.com', NULL, '$2y$12$Pg.u6phx88Ja0WXphe1GG.YjOxI6PG4Swgz0iQpLedpEumqKM11DO', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(158, 'Yasmin Anderson', 'effie.watsica@example.com', NULL, '$2y$12$iVtiNWhsxkTYBLGh8EIjjuQcy1dfpamnoACkiGoHrAVecD3VhIK5u', 'worker', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(159, 'Lelia Champlin', 'considine.veronica@example.org', NULL, '$2y$12$Xm7VF3nDBZbZmSz6/buzqeqYx.Xrd9tOCIrQsALY1Zb8R8yeND7mu', 'worker', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(160, 'Herminia Legros', 'boyle.berniece@example.net', NULL, '$2y$12$jwI230Y3CVunMFx1Es2FOukQFK93QhzqCcZRTZvoXBz3DLWrJlRyq', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(161, 'Noelia Lind', 'audreanne.bayer@example.com', NULL, '$2y$12$HoywhIysMzZVwbhADr5f/ul6sgaUNke32RRUuTs1D01htAepZa/pu', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:51:30', '2026-05-28 10:51:30'),
(162, 'Candelario Leffler', 'vance.ohara@example.org', NULL, '$2y$12$t3PXatB9Km4MfX/DyRTxZ.4OUqfTVZNCXlItMjGcdUPUmzJQOfuyS', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(163, 'Dr. Milan Lebsack DDS', 'alice10@example.net', NULL, '$2y$12$pWtx3H7FjgMxt1z2g0VtuOJKlYQHGh0yRFGxl7cTTaBfQ/QGG7alW', 'worker', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(164, 'Chanel Barton I', 'zwhite@example.org', NULL, '$2y$12$cJh4KXSDDQFqhezYTDUIHeeUcbCtsfNVQfcejONpJa2ojpdrfSelK', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(165, 'Serenity Lubowitz', 'daren64@example.org', NULL, '$2y$12$N34Ve.HRObz11YJFh7M1v.qxn9FIGN3NPL0z5AxmuU3KXo8WBaIWm', 'admin', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(166, 'Dr. Keshaun Grimes', 'dorian.botsford@example.org', NULL, '$2y$12$X0CIcXtwrYAC2NVDNCGbRuZLw1dB9Yp67ZQv8VMB/u0K.WBT0K6Iu', 'worker', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(167, 'Mrs. Caleigh Williamson', 'casimer.dicki@example.org', NULL, '$2y$12$7UkI2wADskuKSZwv42dNJOkZdE8yM0GHmeCZTwb9GgxU5QHS5UQZa', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(168, 'Delaney Ferry', 'miller.halie@example.net', NULL, '$2y$12$ItIlcvOZwcO0kkjY1wbiaOrvIS.mT5tVaj0Yaoj0V5ZkAtNwdZWUW', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(169, 'Mr. Matt Altenwerth', 'zoey.hickle@example.net', NULL, '$2y$12$GYJ8pkunagoiZQaSBZKOJehqKm67WZ/w60TQ43R5667/udt0GzMou', 'admin', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(170, 'Magdalena Kunze', 'hahn.vladimir@example.com', NULL, '$2y$12$tk0WnfyVQA74iF734AfhMuSfj9WYaVdyuGPyY1Yw5wVLZuMlTVCGK', 'worker', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(171, 'Rebeka Becker', 'toy.birdie@example.org', NULL, '$2y$12$cGLUpjaUFAL12st2tfTE9OpfcdGSWq36XKKWxxZ5KmjMocWy8Zh2W', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(172, 'Mr. Okey Hoppe II', 'urban17@example.net', NULL, '$2y$12$s4znkWFNdVXGuZPYqJjMlu8pPEKMOyhzOoFxhkX9H6Htu8SLC4RLq', 'admin', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(173, 'Dr. Bella Pagac Jr.', 'arnold.cormier@example.net', NULL, '$2y$12$LLyBOAcI7yVjjpY6cm5gHOnvHK18F29G1FSQqJDbbMuNeYPkoGtfG', 'admin', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(174, 'Tyrel Beahan', 'roberto99@example.com', NULL, '$2y$12$DwozNiCprZxYa50XvE3tFOLHklqboo6z/F4hYmDUqTKOZhIa3YN6y', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(175, 'Dr. Federico Johnston', 'xhartmann@example.com', NULL, '$2y$12$dECOeC1LqL1qsnUfwTkvreBnpcuB3iZW5729qdkitseOYlwre/jau', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(176, 'Ms. Kelli Hartmann DVM', 'oliver28@example.net', NULL, '$2y$12$VeYtc2JeW10qmUtDR0LZ1.dD.mb281il5aUpxTrHUNy6rFmoPZLo2', 'worker', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(177, 'Filomena Kertzmann', 'kianna12@example.net', NULL, '$2y$12$nEGf5ByOZjQ0FE3Cbgg/b..q7K5.IaitVznFSxKM0jnhFQIwtyOUC', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(178, 'Luna Hills', 'betsy53@example.com', NULL, '$2y$12$P7NDLsk2AQ8NFqoH.zpw0.htJ1X1hg4CTsbvoAGJqJWXoCEnl9lzm', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(179, 'Leopoldo Dickinson', 'jwalter@example.net', NULL, '$2y$12$rz8k6zMPDqPL/CBTcAWHSujtmpEqS1en4m6768WT6SqaMSXcPqm5q', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(180, 'Giovanna Balistreri', 'lrolfson@example.org', NULL, '$2y$12$Skj4pUU48jLjSy6DAvp9hubCcdId4lujdz6i/.ZE52XiGXVHYvy/e', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(181, 'Adolfo Rohan', 'candido.adams@example.net', NULL, '$2y$12$8e1tuKiT7.qU1DpHP0ycmeBSwe9iRV6o0gT7.1jWFVADYaA1X8y1y', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(182, 'Everett Thiel', 'gia40@example.net', NULL, '$2y$12$Yxye0HG1k1OU99qPv7zJ4.MDDlA3UK6ag31dsiU63V9W1ivhnqFOO', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(183, 'Leonor Ward', 'xhane@example.org', NULL, '$2y$12$e5QiMfCY9OmjADo5D0FTguL386Aw8GeMjWJ4cwN1orislLZKhBYgW', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(184, 'Anna Borer', 'mackenzie.fadel@example.com', NULL, '$2y$12$RuvfOXjYbV/VEm19CDdbE.MIWMv.VaCpQCqdjVcyzatS9U7oxPuea', 'worker', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(185, 'Prof. Winfield Wintheiser', 'candace.casper@example.org', NULL, '$2y$12$GaalsCwEBM3ezMJgR0CtOOLF7pZx9YgKyWelO7AggjPdKvUEUyMu6', 'admin', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(186, 'Ophelia Prosacco', 'amara40@example.net', NULL, '$2y$12$M71uGSC7aBTmRi4gFRPoDePoQsoIEOH1VZLIqsflRdQQhO000gkua', 'admin', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(187, 'Bernie Casper', 'tyrique92@example.com', NULL, '$2y$12$kB1w5RM1KyIXTNsvZx8S3.eUlf9Lo3GMN6YSjx2WlC0nWuKByphBy', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(188, 'Zetta King', 'turner.german@example.net', NULL, '$2y$12$K74F2zn93f7NKGHl0DZzg.kXhcRp.i7CnWLugj1gOwKeED8pYS0Aq', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(189, 'Flossie Bechtelar', 'lizzie98@example.com', NULL, '$2y$12$r.XpClaoGRVrqnHCFqrxfuhPR7dMC8gg9yU/sdRMSXasDBHcdi47m', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(190, 'Prof. Derrick Walker', 'rgusikowski@example.net', NULL, '$2y$12$mrx1G9uvVmw6PxUnJIaTcum5ppW3AE5.hyvgRGLsKxUJpQZeJTT9S', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(191, 'Charity Greenfelder', 'rziemann@example.net', NULL, '$2y$12$WR1ZWmaHHYJudoqTrLeHzenm0YKTU2cHtTFQBxT6Wzfnf4gLPBI8S', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(192, 'Dr. Beau Torp', 'emmie.sauer@example.org', NULL, '$2y$12$E5hMyo47n5eqq8neCLSFX./jXS3wt20TB6iANF7A12HrGyRiynF22', 'worker', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(193, 'Diana Abernathy', 'keely59@example.net', NULL, '$2y$12$jHpHZn.HuNF5hKWbRftY.eZzl/qn4vvZarKHQSqE92EmskfUsD1gi', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(194, 'Jack Terry', 'nicolas.frederik@example.com', NULL, '$2y$12$/4LDr1qDRqNtwa7Os2G5uel7d.djNjdQ2wsLg/Le.ZNYtAR.IOqre', 'worker', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(195, 'Dr. Sid Jacobs', 'gwen85@example.org', NULL, '$2y$12$28VuROCyPmlrmZFVcarXNe4GNY2XE3K/QzlHAYRp4ene6lIlJf7Wy', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(196, 'Prof. Jerod Cole', 'buster.mcclure@example.org', NULL, '$2y$12$l8.I7c4IxYAFHVS3/ZwAouHXJZ/b7IAKFXQsyMg.O3rjxD8oR0lv6', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(197, 'Lindsay Turcotte PhD', 'abel03@example.org', NULL, '$2y$12$48cZQ8gZ3uBPydDk/LSMlOxDWY8B9rscB0LIopFQvq7UDTe7dqio6', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(198, 'Mr. Tyree Fay', 'ramona45@example.org', NULL, '$2y$12$GY6pB1gPLjNPJhE12ikug.lkAU/AQPIXl0G2njZedgcQQYR/UYhli', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(199, 'Ramon Hettinger', 'sawayn.berry@example.net', NULL, '$2y$12$ChbutQ6lHDAzudeabMQC8ebJiDsLJMMgad7ManJA/Aaje7vNBT4LK', 'supervisor', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(200, 'Emil King', 'rashad.willms@example.com', NULL, '$2y$12$8um2kwH7Q.on03hMwArgX.4rfKYj.QHD65/0PvM.mt0nOt4rx1F1K', 'engineer', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(201, 'Gene Beer DDS', 'parker.kaylah@example.com', NULL, '$2y$12$zQFYnluAHl3FM4Hzim7j/O6vkd1HItZP/1kl1qlhDiw7j7IktjWeq', 'admin', 'admin', NULL, NULL, '2026-05-28 10:54:24', '2026-05-28 10:54:24'),
(202, 'Amelia Hettinger', 'vita.walker@example.org', NULL, '$2y$12$qgAyjPEiJ6/ERiB/4/ThR.U7mUSs73htfurFz/lvdKqvyfkj80Xwq', 'engineer', 'admin', NULL, NULL, '2026-05-28 11:04:41', '2026-05-28 11:04:41'),
(203, 'Nils Trantow II', 'kgoldner@example.com', NULL, '$2y$12$ED30WIhlODxmf6pkgUeWAOK0nytkzC98g7tvLc3gJayhVrLlzOaUy', 'supervisor', 'admin', NULL, NULL, '2026-05-28 11:04:41', '2026-05-28 11:04:41'),
(204, 'Treva Dach', 'dmarquardt@example.org', NULL, '$2y$12$zsdDMa3iXi5PzSaVhgvYIO1tpJg6nyzFXzFN0Mo1wE4etyjTmWQ2e', 'engineer', 'admin', NULL, NULL, '2026-05-28 11:04:41', '2026-05-28 11:04:41'),
(205, 'Devan Harris', 'kauer@example.org', NULL, '$2y$12$T5O6X/C2zSnQf8Se9DagAOaxa/3mrlcldb0vN/9P5W1gCQkCFcMJe', 'admin', 'admin', NULL, NULL, '2026-05-28 11:04:41', '2026-05-28 11:04:41'),
(206, 'Nya Auer', 'okeeling@example.org', NULL, '$2y$12$E6MRRZxjyWD8HAqOUj0tUOzXMAEFsAJvYEqA3YkEn8Xh1JzXxyP6q', 'engineer', 'admin', NULL, NULL, '2026-05-28 11:04:41', '2026-05-28 11:04:41'),
(207, 'Vito Stokes', 'elton22@example.org', NULL, '$2y$12$JwgzN3Ul9zHLkyRU2CMey.s8xy/svsbjB0FgMYwS3P4GGTamQIi9y', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 11:04:41', '2026-05-28 11:04:41'),
(208, 'Jamie Turner DVM', 'bmarquardt@example.com', NULL, '$2y$12$nhT3HSX.DY9sGBBOJB.b4u0ABcFAlTDKjRclbbubCzUFLDCRHXfUO', 'admin', 'admin', NULL, NULL, '2026-05-28 11:04:41', '2026-05-28 11:04:41'),
(209, 'Jade Kiehn', 'sedrick.koss@example.org', NULL, '$2y$12$F4I/Dpa6WZPX.pajiGLm5Ogt5upxHcZgyzKN5jqFZgJlZiWxv6lnm', 'worker', 'admin', NULL, NULL, '2026-05-28 11:04:41', '2026-05-28 11:04:41'),
(210, 'Dr. Anika Abernathy', 'sylvan.quigley@example.com', NULL, '$2y$12$kKWwsCW9DRCF7/NCyMkye.Nh5LFO6WaZ.AZeT8S0FoH4B5pWm.9B2', 'supervisor', 'admin', NULL, NULL, '2026-05-28 11:04:41', '2026-05-28 11:04:41'),
(211, 'Jannie Jacobi', 'verlie.bogan@example.com', NULL, '$2y$12$HZ2oI52tUXIpFYz0GNV7X.N7B3tw.YfgCeoaecUq4F/9WEgtASQ6e', 'admin', 'admin', NULL, NULL, '2026-05-28 11:04:41', '2026-05-28 11:04:41'),
(212, 'Lynn Okuneva', 'hhand@example.com', NULL, '$2y$12$TM9JpEARn/kNkQsWwCgrFuIiSQPQ2/cUFUtZg.9308B1jxHea2tkO', 'admin', 'admin', NULL, NULL, '2026-05-28 11:04:41', '2026-05-28 11:04:41'),
(213, 'Darrin Quitzon', 'marian.grimes@example.org', NULL, '$2y$12$7qpkQPaFgrmMmQl9qMnEU.XQm.IBZi0szqABix9okrYXm5uCzgSqq', 'worker', 'admin', NULL, NULL, '2026-05-28 11:04:41', '2026-05-28 11:04:41'),
(214, 'Christop Cummings', 'garnett40@example.org', NULL, '$2y$12$yJ.o7w.36PCZULqZT2v71ewRY4jghsMq8.NChL7hGYqsGJ5/BNx/6', 'supervisor', 'admin', NULL, NULL, '2026-05-28 11:04:42', '2026-05-28 11:04:42'),
(215, 'Damaris Howell', 'ruthie.lubowitz@example.org', NULL, '$2y$12$xOKLkGwm4ZmHE6.IkoHvHeh7RQgTQGzorCbTOo/4j61hGNuodLJdK', 'worker', 'admin', NULL, NULL, '2026-05-28 11:04:42', '2026-05-28 11:04:42'),
(216, 'Marlene Schultz III', 'paris22@example.com', NULL, '$2y$12$RLi3p5/lOAXI/YUSMaqd4eofsS.iNP68NnzOVkWptlgg9DOFh2Asu', 'engineer', 'admin', NULL, NULL, '2026-05-28 11:04:42', '2026-05-28 11:04:42'),
(217, 'Magnolia Roob', 'kub.laurine@example.net', NULL, '$2y$12$2Vn5SqXn8NHbfacqHYHsg.QBDXgidckCO8gYL28etB8z1IolhIrNa', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 11:04:42', '2026-05-28 11:04:42'),
(218, 'Ocie Blick', 'hill.rod@example.org', NULL, '$2y$12$F.5HIs9qMHZLY6pXtQEgGe2XtlgkkL2M2.Ry1cy/RnWAqy.GhmKSK', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 11:04:42', '2026-05-28 11:04:42'),
(219, 'Mrs. Bernadette Bayer', 'carleton95@example.net', NULL, '$2y$12$E9IVXhc0FI68KuDeT1mjz.HTn5tdMutX3uRXduUkDBA.HZB3N4bnC', 'supervisor', 'admin', NULL, NULL, '2026-05-28 11:04:42', '2026-05-28 11:04:42'),
(220, 'Mrs. Evelyn Smitham Sr.', 'pfeffer.wava@example.net', NULL, '$2y$12$p16D/uRxL3YzFREAFVzhTe4L8LGuQX1XFbBZuccjB32uz2SM1lOTW', 'engineer', 'admin', NULL, NULL, '2026-05-28 11:04:42', '2026-05-28 11:04:42'),
(221, 'Durward Thompson', 'gherman@example.org', NULL, '$2y$12$pu1tWs7luTLcS78eSnng9.CicONOgWG040qQaxmc4OPP2UOQ7PTSC', 'engineer', 'admin', NULL, NULL, '2026-05-28 11:04:42', '2026-05-28 11:04:42'),
(222, 'Marcia Vandervort', 'lharris@example.org', NULL, '$2y$12$949vdZGGjc.Fiw0GD.YTF.MKZCIvFeNgsZS3WUM14rifpj7DdJ1KK', 'supervisor', 'admin', NULL, NULL, '2026-05-28 11:04:42', '2026-05-28 11:04:42'),
(223, 'Ebba Ferry', 'emard.maximo@example.net', NULL, '$2y$12$0.HfBKs3/.1IeDjLnNvS.efdxclQgby7W0IWy3iKMSll9F9vOmbEC', 'supervisor', 'admin', NULL, NULL, '2026-05-28 11:04:42', '2026-05-28 11:04:42'),
(224, 'Jerrod Treutel', 'bradtke.avery@example.net', NULL, '$2y$12$gqciR04R21CMAX28Qi2NJONM5.CgMIeh7GCiRDMgiagk00EITCSbG', 'admin', 'admin', NULL, NULL, '2026-05-28 11:04:42', '2026-05-28 11:04:42'),
(225, 'Dr. Joany Brown DDS', 'gunner35@example.com', NULL, '$2y$12$8BK5.emIgN26s5OBuHhG5ObCPlZ9AIK5LC6D4U..itiZnDdxtA24C', 'admin', 'admin', NULL, NULL, '2026-05-28 11:04:42', '2026-05-28 11:04:42'),
(226, 'Dr. Dangelo Torphy', 'elna81@example.net', NULL, '$2y$12$WWXgBuMLHnfj4zznCdgjpuxprFo1.5lJnbkRyPE/WjCKSHy6vdhOi', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 11:04:42', '2026-05-28 11:04:42'),
(227, 'Mrs. Mabel Wiegand', 'zboncak.noel@example.com', NULL, '$2y$12$vT/fDffYeGYid/vrmTYp2u49Mom6BI.L2xL.orjhk0NiG/H/52iWe', 'worker', 'admin', NULL, NULL, '2026-05-28 11:04:42', '2026-05-28 11:04:42'),
(228, 'Dell Kihn', 'kovacek.dessie@example.net', NULL, '$2y$12$1wafSiaPc8oqcBZQIwzDqegyjPEj8K55qiQStF8y6Vevzu6mpb8Au', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 11:04:42', '2026-05-28 11:04:42'),
(229, 'Miss Eugenia Roob', 'amelia.ledner@example.org', NULL, '$2y$12$sNcj9YmCCqiwUjZMkBxqDeKvty7J2gCPldvJEloY9oMhxqoDeJ4GG', 'admin', 'admin', NULL, NULL, '2026-05-28 11:04:42', '2026-05-28 11:04:42'),
(230, 'Lelia Lemke', 'joan.kiehn@example.com', NULL, '$2y$12$Uop1XHMicE.gexp7qr7MWO3F5ez3ZZJhyfZCzWjqv8s8HCELhFQ.a', 'admin', 'admin', NULL, NULL, '2026-05-28 11:04:42', '2026-05-28 11:04:42'),
(231, 'Mrs. Lyla Beahan Jr.', 'gislason.jakob@example.com', NULL, '$2y$12$oW4QTjN4bTPMWaNsRNR/PetFTuycXDNsnYr3NnPBhUw.1nZu1SeMi', 'supervisor', 'admin', NULL, NULL, '2026-05-28 11:04:42', '2026-05-28 11:04:42'),
(232, 'Owen Mayert', 'schultz.jaron@example.net', NULL, '$2y$12$OQ.J7SdWl7j5Sw7/CT5Fce0Lu0lRr2wycCVU.yvFXF6Dhnob7Q62.', 'admin', 'admin', NULL, NULL, '2026-05-28 11:04:42', '2026-05-28 11:04:42'),
(233, 'Ms. Marian Gleichner', 'hardy.bahringer@example.net', NULL, '$2y$12$EPSOB9DN2ul4nD.qgiuCsu9Ks3MqVpsoLCdIFVfUr5DgpK3YVdTh2', 'engineer', 'admin', NULL, NULL, '2026-05-28 11:04:42', '2026-05-28 11:04:42'),
(234, 'Dayton Schinner', 'htorphy@example.com', NULL, '$2y$12$asd3ePVMyo6WAOB7KLz6HeDXB6/AFCIpkFJoeLg1jz4hwGJtRcL4e', 'worker', 'admin', NULL, NULL, '2026-05-28 11:04:42', '2026-05-28 11:04:42'),
(235, 'Stephan Aufderhar', 'zpowlowski@example.net', NULL, '$2y$12$5Fo8NZHTaQoHhYMD6zEkdeJGawAeSZECmnLpIMj33XXtSJP0i3ATy', 'supervisor', 'admin', NULL, NULL, '2026-05-28 11:04:42', '2026-05-28 11:04:42'),
(236, 'Janiya Friesen', 'bashirian.shayne@example.com', NULL, '$2y$12$aag2pXvt.9nEEYZ14n/0dehZvQ73rE2VL1dLDhTvD1bBBcFcg9.Am', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 11:04:42', '2026-05-28 11:04:42'),
(237, 'Mr. Leonard Hintz III', 'elyse18@example.com', NULL, '$2y$12$PkUOAimRjhn9FiSF0rhmge9jaM1mAiqlE0kp/qYLqJaciTqgWMUxm', 'worker', 'admin', NULL, NULL, '2026-05-28 11:04:42', '2026-05-28 11:04:42'),
(238, 'Lenore Pfannerstill', 'smith.aaliyah@example.net', NULL, '$2y$12$SEwzurjTDsMDoeo57o6WP.SQa2y1eZ3HV4Q3cPRUfgjT29sYPgzaC', 'supervisor', 'admin', NULL, NULL, '2026-05-28 11:04:42', '2026-05-28 11:04:42'),
(239, 'Destinee Gaylord', 'stephen.block@example.net', NULL, '$2y$12$saaL76wH8m8faiMjEUD4uedh0JGBUkCxbWUnLpM6AdCLQqTH7TYvO', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 11:04:42', '2026-05-28 11:04:42'),
(240, 'Prof. Astrid Prosacco Jr.', 'beatty.vicky@example.org', NULL, '$2y$12$wWMr6gNYX/jj.tYIp4V3.eOHH018cbD4yCJiYBqGGMTqmtlraJJgS', 'engineer', 'admin', NULL, NULL, '2026-05-28 11:04:42', '2026-05-28 11:04:42'),
(241, 'Ellsworth Mayer', 'gottlieb.julio@example.org', NULL, '$2y$12$cxNlBMVo7c48FPCOe6K3QuLwN0yTkxX/VR5.314uxKPlw3efZ3l2O', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 11:04:42', '2026-05-28 11:04:42'),
(242, 'Prof. Erling Schowalter DDS', 'tlarson@example.com', NULL, '$2y$12$FUvzki4hz.hn/yyLekpjkOkanNrY8nfRr1h2DiKoO3ctYTtNeheZW', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(243, 'Alysson Welch', 'swift.treva@example.com', NULL, '$2y$12$YbHIiKJZ7xI8Oe67BL3/h.62NGH72.GozDn7oecbgi7IkQfEh0znC', 'worker', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(244, 'Prof. Daron Hilpert III', 'zane47@example.com', NULL, '$2y$12$hr5LWrbe/n7eB2LHrLKm5uCadWWvJwZms4RSrC2gQdcZr8sRnxdpC', 'supervisor', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(245, 'Mr. Mervin Cummings', 'lking@example.org', NULL, '$2y$12$aGuzAN.b2kD0f9u4VCQqNO5R6Oc6CaqR9sECH1PFZ9dKe37MPJOZK', 'engineer', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(246, 'Jalen Kertzmann', 'haag.laurie@example.com', NULL, '$2y$12$kq7sNxf0YlhoxzXLNgiuKuiwFkHLvDNXagwsXgFuZfn2hoqbBKJzK', 'admin', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(247, 'Harrison Kuphal', 'eugene.weimann@example.org', NULL, '$2y$12$FTbOK6RJFKVP1GO.yFF88ucVNNzdmSaFm91uqSx7qRdB5MNEo45i2', 'admin', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(248, 'Dulce Ledner', 'marc24@example.org', NULL, '$2y$12$56bP30sEkPhAJSFvQ25lDuF1.7c4vsF21VOaBtjfQQ09Zb4v6c7nK', 'worker', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52');
INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `type_user`, `phone`, `remember_token`, `created_at`, `updated_at`) VALUES
(249, 'Jay Douglas', 'gene20@example.com', NULL, '$2y$12$bZLqD0wSHNd4tPCtDzXyC.ux0pe5MQ4v6ZlMFLORDmZyok.s7tBZO', 'supervisor', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(250, 'Tiffany Barrows Jr.', 'bartoletti.cordelia@example.com', NULL, '$2y$12$5ZHHobfbavtJYhlj85H0tenh3qp1/t2Uix66X6EJ2HyWE8v8WR446', 'admin', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(251, 'Ruthie Osinski', 'ffeeney@example.org', NULL, '$2y$12$1hzlLwI8QMkwpEl6.2GBru160zZhq3UPEd6V6RdBKO8VrvJehsJ7m', 'admin', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(252, 'Cole Yost', 'alycia51@example.com', NULL, '$2y$12$Z.ueut1b/W20DUd.7zX9QejxYrYu/OU0iTgiVhW9YADC8OnduoSmy', 'supervisor', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(253, 'Dr. Marilie Kessler', 'okeefe.darrel@example.org', NULL, '$2y$12$4jxHi6mkfn6UahnxKSKyB.wbAiTdtlPxkDCVBvet/HRZrB7oOIBEu', 'engineer', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(254, 'Lonnie Bahringer', 'braun.bulah@example.net', NULL, '$2y$12$0XSqKqNFnEixvrZezzPHu.JwmvuqUHX0OZ7h8yAaJLzeLf9fOg0R6', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(255, 'Laron Kiehn', 'gislason.kristin@example.com', NULL, '$2y$12$bFV3whCLuJm2W54EhjB6c.B6DpTsXtex9FtXVLzqPYViGWjBuE5Y.', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(256, 'Prof. Salma Hoppe', 'stephania21@example.org', NULL, '$2y$12$2sSIGxQvzzkEBb8lGs/vuuBayt1MLueUkUqYebEwXpx71y0orUXYa', 'supervisor', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(257, 'Bette Kovacek III', 'wroberts@example.net', NULL, '$2y$12$3IJP/WwslfgKhCjZbLNzI.Kg7BAxshjLXutEZAr9QyOf/4Ce3BUeC', 'supervisor', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(258, 'Toby Haley MD', 'hallie.haag@example.net', NULL, '$2y$12$IIXCI5He2APA1OHJyKpk9uzbzf1t38nO1b2PTn.4YQlmvbkTeB08K', 'worker', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(259, 'Mr. Carlo Jenkins', 'hegmann.rosetta@example.com', NULL, '$2y$12$NJ3SvZxUYGxY1LI4qxHpeuD8hu5Y2GyW3Aw1/X4NCLKd7ikvZ2Lp.', 'supervisor', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(260, 'Sabryna Treutel', 'koss.salma@example.org', NULL, '$2y$12$GnwqwWgtJOVnoUwr5cqYeeXCI9dVdBZaIr5xvJco.aNLuCvhecL/y', 'supervisor', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(261, 'Margarette Hintz MD', 'kelsie.lubowitz@example.org', NULL, '$2y$12$tRoBnhPbuUpZzIZswyLvU.9uPVhVxUbPa3sBr4xWs/6UJETPTbB4a', 'engineer', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(262, 'Prof. Lawrence Waelchi', 'jerrell.hartmann@example.org', NULL, '$2y$12$6ce.Yzhmoae7nJVu1z91e.oYlLF7LJHkVVl/tyOU6DK7YnNMewbZ2', 'worker', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(263, 'Heaven Altenwerth', 'raleigh.mohr@example.com', NULL, '$2y$12$/7KLXVun/kWkLZyL/CipNupSio4mBsR6XUaVh/pvqssQC3wxHJ07y', 'admin', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(264, 'Delfina Fritsch Sr.', 'irma.gibson@example.org', NULL, '$2y$12$5jAt9XwNfKqF93QJ/v5eXOll8LUNzubLDrQyCOzWzUIZOqbGA2ip2', 'supervisor', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(265, 'Sedrick Ferry', 'janelle86@example.net', NULL, '$2y$12$yOxHUPuZd22iPHz/bBLq2uz2tXE3GTFnKnogv2mAG.i8.k1SWea3q', 'admin', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(266, 'Amos Gerhold DDS', 'nelle.gislason@example.org', NULL, '$2y$12$Nyr3vthdpel.MsfseHlRmeHBGTS/SbZe/XQGNWsJzFyECPkav9YeC', 'admin', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(267, 'Lue Goldner DVM', 'carlo02@example.net', NULL, '$2y$12$PSRD3rXNYlDijWB.1s7cO.G5VRPIfnUy77gntLORIsiHVOXVAU/ue', 'worker', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(268, 'Jimmie Yost', 'vandervort.erin@example.net', NULL, '$2y$12$ojltHrM8GNA6kMj70ELneeSWQ0fnqwpYc..XCVtboYeh8xVB/hvjq', 'engineer', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(269, 'Melyna Cronin', 'ssmith@example.net', NULL, '$2y$12$DwDvvJtUiTr5XKOXm320iuDc7vyzcdAUHD/Wqe9qJhr.g64xIdBWi', 'worker', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(270, 'Lucas Muller', 'brown29@example.net', NULL, '$2y$12$IlAE3tApPd2VQk0cKpbEZ.H4NQKuv0rBqBYOU9mEQ37A3QJm.gr.6', 'worker', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(271, 'Dena Gorczany DVM', 'deondre96@example.com', NULL, '$2y$12$2BEXRVdN0lfMSt.db9UqUugjkdbMLD0VEX2/N.nMmvUn7zXZ8MmJS', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(272, 'Mr. Kayleigh Schulist', 'watson78@example.net', NULL, '$2y$12$bPJWhSG6z7cIB2sYAkLtjOWeLkB.zP1mEdYOIcDwMhlOgDGabduqe', 'engineer', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(273, 'Celine Powlowski', 'konopelski.austin@example.org', NULL, '$2y$12$aCAHbg13ZRFlwe.KiTISqumfMhFhd/3sF7AZbYbELD6d/k4X9R2h2', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(274, 'Ali Pouros', 'abbott.jerrell@example.com', NULL, '$2y$12$yKyhsVnjftXPUHZZWdc4De.ATvoA7U7LpFsKZ0WOkH4DauTU3hfe6', 'worker', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(275, 'Dr. Tara Denesik', 'pacocha.frances@example.org', NULL, '$2y$12$2uHQfLkeZoFHTY3hUM9BuO5tqNPez/SV6H2wQ6ztE/XsDL14ozIHW', 'engineer', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(276, 'Sage Haag', 'magnus.lueilwitz@example.org', NULL, '$2y$12$IjLyhpsZ7HE5gN3YMZHlZOMFBCYUHmroBFCWWVthy7RIZXwWvzIrC', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(277, 'Joannie Hayes', 'bode.beatrice@example.com', NULL, '$2y$12$MacrT8lFiQDQ9z.gDmdid.xbQQQ8sOlQwxVhAmLhSfH2iwVTb/77m', 'admin', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(278, 'Darian Walker', 'samantha.swaniawski@example.net', NULL, '$2y$12$T2NDAA/y/.pUnzDbshHDv.96X8bAEhADKcJF0zdfNglUFIJkKQG9m', 'chef_chantier', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(279, 'Berniece Ledner', 'dax.bednar@example.org', NULL, '$2y$12$rMViV0h1yd5Li1aU1DQNVOHDZnzuBXDVBfyM9iGBTIIMXYCl7F.rG', 'engineer', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(280, 'Alexandrine Franecki', 'zrunolfsdottir@example.org', NULL, '$2y$12$dGUUsZ17/FRKLA88kKL51e4biKu9m6hf6Fiv/Eyc0hP5gHMWdncQa', 'supervisor', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52'),
(281, 'Sylvester Volkman', 'tvolkman@example.net', NULL, '$2y$12$1eWfhuYwhZDRD7OGFy5PBOTMyCSHZH8EncaZylXQmklgxjiQ0OYPa', 'admin', 'admin', NULL, NULL, '2026-05-28 11:07:52', '2026-05-28 11:07:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `activity_logs_project_id_foreign` (`project_id`),
  ADD KEY `activity_logs_user_id_foreign` (`user_id`);

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attendance_project_id_foreign` (`project_id`),
  ADD KEY `attendance_user_id_foreign` (`user_id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chat_messages_project_id_foreign` (`project_id`),
  ADD KEY `chat_messages_sender_id_foreign` (`sender_id`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `inspections`
--
ALTER TABLE `inspections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `inspections_project_id_foreign` (`project_id`),
  ADD KEY `inspections_task_id_foreign` (`task_id`),
  ADD KEY `inspections_inspected_by_foreign` (`inspected_by`);

--
-- Indexes for table `inspection_checks`
--
ALTER TABLE `inspection_checks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `inspection_checks_inspection_id_foreign` (`inspection_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`),
  ADD KEY `media_project_id_foreign` (`project_id`),
  ADD KEY `media_uploaded_by_foreign` (`uploaded_by`),
  ADD KEY `media_task_id_foreign` (`task_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `non_conformities`
--
ALTER TABLE `non_conformities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `non_conformities_project_id_foreign` (`project_id`),
  ADD KEY `non_conformities_inspection_check_id_foreign` (`inspection_check_id`),
  ADD KEY `non_conformities_reported_by_foreign` (`reported_by`),
  ADD KEY `non_conformities_assigned_to_foreign` (`assigned_to`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_user_id_foreign` (`user_id`),
  ADD KEY `notifications_project_id_foreign` (`project_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projects_client_id_foreign` (`client_id`),
  ADD KEY `projects_created_by_foreign` (`created_by`);

--
-- Indexes for table `project_users`
--
ALTER TABLE `project_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_users_project_id_foreign` (`project_id`),
  ADD KEY `project_users_user_id_foreign` (`user_id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reports_project_id_foreign` (`project_id`),
  ADD KEY `reports_created_by_foreign` (`created_by`);

--
-- Indexes for table `report_items`
--
ALTER TABLE `report_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `report_items_report_id_foreign` (`report_id`);

--
-- Indexes for table `resources`
--
ALTER TABLE `resources`
  ADD PRIMARY KEY (`id`),
  ADD KEY `resources_project_id_foreign` (`project_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tasks_project_id_foreign` (`project_id`),
  ADD KEY `tasks_assigned_to_foreign` (`assigned_to`),
  ADD KEY `tasks_parent_task_id_foreign` (`parent_task_id`);

--
-- Indexes for table `task_updates`
--
ALTER TABLE `task_updates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_updates_task_id_foreign` (`task_id`),
  ADD KEY `task_updates_updated_by_foreign` (`updated_by`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_logs`
--
ALTER TABLE `activity_logs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chat_messages`
--
ALTER TABLE `chat_messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inspections`
--
ALTER TABLE `inspections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `inspection_checks`
--
ALTER TABLE `inspection_checks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `non_conformities`
--
ALTER TABLE `non_conformities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `project_users`
--
ALTER TABLE `project_users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `report_items`
--
ALTER TABLE `report_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `resources`
--
ALTER TABLE `resources`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `task_updates`
--
ALTER TABLE `task_updates`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=282;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD CONSTRAINT `activity_logs_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `activity_logs_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `attendance`
--
ALTER TABLE `attendance`
  ADD CONSTRAINT `attendance_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `attendance_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD CONSTRAINT `chat_messages_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `chat_messages_sender_id_foreign` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `inspections`
--
ALTER TABLE `inspections`
  ADD CONSTRAINT `inspections_inspected_by_foreign` FOREIGN KEY (`inspected_by`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `inspections_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `inspections_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `inspection_checks`
--
ALTER TABLE `inspection_checks`
  ADD CONSTRAINT `inspection_checks_inspection_id_foreign` FOREIGN KEY (`inspection_id`) REFERENCES `inspections` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `media`
--
ALTER TABLE `media`
  ADD CONSTRAINT `media_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `media_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `media_uploaded_by_foreign` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `non_conformities`
--
ALTER TABLE `non_conformities`
  ADD CONSTRAINT `non_conformities_assigned_to_foreign` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `non_conformities_inspection_check_id_foreign` FOREIGN KEY (`inspection_check_id`) REFERENCES `inspection_checks` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `non_conformities_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `non_conformities_reported_by_foreign` FOREIGN KEY (`reported_by`) REFERENCES `users` (`id`);

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `notifications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_client_id_foreign` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `projects_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `project_users`
--
ALTER TABLE `project_users`
  ADD CONSTRAINT `project_users_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  ADD CONSTRAINT `project_users_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reports_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `report_items`
--
ALTER TABLE `report_items`
  ADD CONSTRAINT `report_items_report_id_foreign` FOREIGN KEY (`report_id`) REFERENCES `reports` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `resources`
--
ALTER TABLE `resources`
  ADD CONSTRAINT `resources_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_assigned_to_foreign` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `tasks_parent_task_id_foreign` FOREIGN KEY (`parent_task_id`) REFERENCES `tasks` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `tasks_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `task_updates`
--
ALTER TABLE `task_updates`
  ADD CONSTRAINT `task_updates_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `task_updates_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
