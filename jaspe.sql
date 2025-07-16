-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 16 juil. 2025 à 17:53
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `jaspe`
--

-- --------------------------------------------------------

--
-- Structure de la table `admins`
--

CREATE TABLE `admins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `admin_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('laravel_cache_adeyemo.ayinde@example.net|127.0.0.1', 'i:1;', 1751975755),
('laravel_cache_adeyemo.ayinde@example.net|127.0.0.1:timer', 'i:1751975755;', 1751975755),
('laravel_cache_gladega@example.net|127.0.0.1', 'i:1;', 1752334055),
('laravel_cache_gladega@example.net|127.0.0.1:timer', 'i:1752334055;', 1752334055),
('laravel_cache_oyelude.efe@example.com|127.0.0.1', 'i:1;', 1752333616),
('laravel_cache_oyelude.efe@example.com|127.0.0.1:timer', 'i:1752333616;', 1752333616);

-- --------------------------------------------------------

--
-- Structure de la table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `des`
--

CREATE TABLE `des` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `de_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `equipments`
--

CREATE TABLE `equipments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `picture` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `description` text DEFAULT NULL,
  `details` longtext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `equipments`
--

INSERT INTO `equipments` (`id`, `name`, `picture`, `price`, `status`, `description`, `details`, `created_at`, `updated_at`) VALUES
(1, 'Cisco Router 2900 Series', 'images/equipments/router.jpg', 500000, 1, 'High-performance router for enterprise networks.', 'Amet eius quasi animi voluptas sed. Est autem officiis consequatur perferendis natus ratione.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(2, 'Fiber Optic Splicer', 'images/equipments/fiber.jpeg', 300000, 1, 'Device for splicing fiber optic cables.', 'Adipisci qui explicabo fuga rerum qui corporis eum occaecati. Eos voluptas autem in a. Consequatur sint at ut eum.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(3, 'Network Switch 24-Port', 'images/equipments/switch.jpeg', 250000, 1, 'Managed switch for network connectivity.', 'Enim quam laboriosam explicabo reiciendis voluptatem iure. Eum voluptates sequi totam sed ut quas. Veniam omnis nihil amet quia rem ratione. Ad sequi eius voluptas corporis dolor.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(4, 'Wireless Access Point', 'images/equipments/access.png', 150000, 1, 'High-speed wireless access point.', 'Eaque sapiente omnis aperiam. Occaecati ea modi magnam debitis consequuntur ut provident. Neque dolor omnis placeat non est sed. Non aut illo consequuntur ipsa nihil.', '2025-07-07 07:09:49', '2025-07-07 07:09:49');

-- --------------------------------------------------------

--
-- Structure de la table `equipments_formations`
--

CREATE TABLE `equipments_formations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `formation_id` bigint(20) UNSIGNED NOT NULL,
  `equipment_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `equipments_formations`
--

INSERT INTO `equipments_formations` (`id`, `formation_id`, `equipment_id`, `created_at`, `updated_at`) VALUES
(1, 1, 3, NULL, NULL),
(2, 1, 4, NULL, NULL),
(3, 2, 1, NULL, NULL),
(4, 2, 3, NULL, NULL),
(5, 3, 1, NULL, NULL),
(6, 3, 2, NULL, NULL),
(7, 4, 2, NULL, NULL),
(8, 4, 3, NULL, NULL),
(9, 5, 2, NULL, NULL),
(10, 5, 3, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `equipment_orders`
--

CREATE TABLE `equipment_orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `equipment_id` bigint(20) UNSIGNED DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `equipment_orders`
--

INSERT INTO `equipment_orders` (`id`, `order_id`, `equipment_id`, `quantity`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 5, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(2, 1, 3, 5, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(3, 2, 2, 2, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(4, 3, 3, 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(5, 3, 4, 5, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(6, 4, 4, 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(7, 5, 1, 5, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(8, 6, 2, 2, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(9, 6, 4, 4, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(10, 7, 1, 4, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(11, 7, 2, 2, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(12, 8, 1, 2, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(13, 8, 4, 3, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(14, 9, 4, 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(15, 10, 3, 2, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(16, 11, 1, 2, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(17, 11, 2, 5, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(18, 12, 3, 2, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(19, 12, 4, 4, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(20, 13, 3, 2, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(21, 14, 4, 5, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(22, 15, 2, 3, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(23, 16, 3, 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(24, 17, 1, 3, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(25, 18, 1, 4, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(26, 18, 3, 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(27, 19, 2, 5, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(28, 19, 3, 4, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(29, 20, 2, 3, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(30, 20, 3, 4, '2025-07-07 07:09:50', '2025-07-07 07:09:50');

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
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
-- Structure de la table `formations`
--

CREATE TABLE `formations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `prerequisites` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `formation_details` text NOT NULL,
  `picture` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `formations`
--

INSERT INTO `formations` (`id`, `name`, `prerequisites`, `price`, `formation_details`, `picture`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 'CCNA Certification Training', 'Basic computer knowledge', 150000, 'Comprehensive training for Cisco Certified Network Associate certification.', 'images/formations/ccna.jpg', 4, '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(2, '5G Network Fundamentals', 'Understanding of 4G networks', 200000, 'Introduction to 5G technology and its applications.', 'images/formations/network.jpg', 4, '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(3, 'Network Security Essentials', 'Basic networking knowledge', 180000, 'Learn to secure networks against cyber threats.', 'images/formations/network-security.jpeg', 4, '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(4, 'Fiber Optic Communications', 'Basic telecommunications knowledge', 170000, 'Master the principles of fiber optic technology.', 'images/formations/fiber-formation.jpg', 5, '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(5, 'Wireless Networking', 'Networking fundamentals', 160000, 'Explore Wi-Fi technologies and configurations.', 'images/formations/networking-formation.jpg', 5, '2025-07-07 07:09:49', '2025-07-07 07:09:49');

-- --------------------------------------------------------

--
-- Structure de la table `formation_students`
--

CREATE TABLE `formation_students` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `formation_id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `progression` int(11) NOT NULL DEFAULT 0,
  `completed_lessons` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`completed_lessons`)),
  `score` int(11) DEFAULT NULL,
  `attestation` varchar(255) DEFAULT NULL,
  `path_paiement` varchar(255) DEFAULT NULL,
  `request_internership` varchar(255) DEFAULT NULL,
  `request_status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `formation_students`
--

INSERT INTO `formation_students` (`id`, `formation_id`, `student_id`, `progression`, `completed_lessons`, `score`, `attestation`, `path_paiement`, `request_internership`, `request_status`, `created_at`, `updated_at`) VALUES
(1, 1, 7, 64, NULL, 78, '0', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE23A.tmp', '/storage/internship_requests/request_414971bc-7908-3853-a9ea-2be3bf03cee2.pdf', 'approved', '2025-07-07 07:09:49', '2025-07-09 09:14:10'),
(2, 1, 8, 85, NULL, 64, '0', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE23B.tmp', NULL, 'pending', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(3, 3, 8, 29, NULL, 87, '0', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE24B.tmp', NULL, 'pending', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(4, 5, 8, 58, NULL, 74, '0', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE24C.tmp', NULL, NULL, '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(5, 4, 9, 23, NULL, 51, '1', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE24D.tmp', '/storage/internship_requests/request_bafb41a8-3c8d-36d9-a474-cd4c316a6016.pdf', 'rejected', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(6, 5, 9, 8, NULL, 97, '1', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE25E.tmp', NULL, 'approved', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(7, 2, 10, 14, NULL, 88, '1', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE25F.tmp', NULL, 'rejected', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(8, 5, 10, 56, NULL, 66, '0', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE260.tmp', NULL, 'approved', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(9, 1, 11, 64, NULL, 55, '1', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE261.tmp', '/storage/internship_requests/request_a6c11b13-5745-3d9d-9617-3e18bf7d5c03.pdf', 'approved', '2025-07-07 07:09:49', '2025-07-09 09:01:08'),
(10, 4, 11, 11, NULL, 55, '0', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE272.tmp', '/storage/internship_requests/request_efd87a2e-28d4-365d-9154-01af0d966c2c.pdf', 'approved', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(11, 1, 12, 70, NULL, 60, '0', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE273.tmp', NULL, NULL, '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(12, 4, 12, 79, NULL, 87, '0', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE274.tmp', NULL, 'pending', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(13, 1, 13, 49, NULL, 56, '0', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE275.tmp', NULL, 'rejected', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(14, 2, 13, 37, NULL, 73, '0', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE285.tmp', NULL, NULL, '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(15, 5, 13, 98, NULL, 51, '0', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE286.tmp', NULL, 'pending', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(16, 4, 14, 51, NULL, 61, '1', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE287.tmp', '/storage/internship_requests/request_9ca6cf16-0ee5-3567-a269-a22aa9867a68.pdf', 'approved', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(17, 5, 14, 36, NULL, 85, '0', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE298.tmp', NULL, 'pending', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(18, 3, 15, 44, NULL, 89, '0', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE299.tmp', '/storage/internship_requests/request_567c0185-6d5d-3071-b75a-84d0fa06226a.pdf', 'approved', '2025-07-07 07:09:49', '2025-07-09 08:33:41'),
(19, 1, 16, 44, NULL, 51, '1', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE29A.tmp', NULL, 'pending', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(20, 2, 16, 61, NULL, 87, '1', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE29B.tmp', NULL, 'pending', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(21, 5, 16, 28, NULL, 50, '0', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE29C.tmp', NULL, NULL, '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(22, 1, 17, 44, NULL, 56, '0', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE2AD.tmp', NULL, NULL, '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(23, 2, 17, 83, NULL, 96, '0', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE2AE.tmp', NULL, 'pending', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(24, 1, 18, 22, NULL, 87, '1', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE2AF.tmp', NULL, 'pending', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(25, 3, 18, 57, NULL, 53, '0', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE2BF.tmp', NULL, 'approved', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(26, 5, 18, 17, NULL, 88, '1', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE2C0.tmp', '/storage/internship_requests/request_4897411e-02d0-33db-b93b-532d99c388bd.pdf', 'rejected', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(27, 2, 19, 26, NULL, 65, '0', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE2C1.tmp', NULL, NULL, '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(28, 3, 19, 80, NULL, 74, '0', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE2C2.tmp', NULL, 'pending', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(29, 4, 19, 91, NULL, 83, '1', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE2D3.tmp', NULL, NULL, '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(30, 3, 20, 86, NULL, 57, '0', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE2D4.tmp', '/storage/internship_requests/request_7ca4cac0-9b97-3c2c-82e1-1ee947941284.pdf', 'rejected', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(31, 3, 21, 38, NULL, 94, '1', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE2D5.tmp', NULL, 'approved', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(32, 4, 21, 78, NULL, 100, '1', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE2E5.tmp', NULL, NULL, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(33, 5, 21, 23, NULL, 93, '1', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE2E6.tmp', NULL, 'approved', '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(34, 2, 22, 8, '[\"5:13\"]', 54, '0', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE2F7.tmp', '/storage/internship_requests/request_37be32f3-74d3-3c89-8b4c-724dcd8e6b73.pdf', 'rejected', '2025-07-07 07:09:50', '2025-07-08 09:56:40'),
(35, 5, 22, 100, '[\"17:49\",\"17:50\",\"17:51\",\"18:52\",\"18:53\",\"18:54\",\"19:55\",\"19:56\",\"19:57\",\"20:58\",\"20:59\",\"20:60\"]', 100, 'attestations/attestation_22_5_1751991217.pdf', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE2F8.tmp', 'internship_requests/5_22_1752018416.pdf', 'approved', '2025-07-07 07:09:50', '2025-07-09 09:23:51'),
(36, 1, 23, 53, NULL, 88, '1', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE309.tmp', NULL, 'approved', '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(37, 4, 23, 68, NULL, 66, '0', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE30A.tmp', NULL, 'approved', '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(38, 5, 23, 69, NULL, 77, '1', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE30B.tmp', NULL, 'approved', '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(39, 4, 24, 100, '[\"13:37\",\"13:38\",\"13:39\",\"14:40\",\"14:41\",\"14:42\",\"15:43\",\"15:44\",\"15:45\",\"16:46\",\"16:47\",\"16:48\"]', 100, 'attestations/attestation_24_4_1752120101.pdf', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE30C.tmp', 'internship_requests/internship_4_24_1752066023.pdf', 'pending', '2025-07-07 07:09:50', '2025-07-10 02:01:45'),
(40, 2, 25, 63, NULL, 71, '1', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE31C.tmp', NULL, 'pending', '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(41, 3, 25, 94, NULL, 74, '1', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE31D.tmp', NULL, 'approved', '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(42, 2, 26, 84, NULL, 93, '1', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE31E.tmp', NULL, 'approved', '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(43, 5, 26, 37, NULL, 85, '1', 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE31F.tmp', NULL, NULL, '2025-07-07 07:09:50', '2025-07-07 07:09:50');

-- --------------------------------------------------------

--
-- Structure de la table `jobs`
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
-- Structure de la table `job_batches`
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
-- Structure de la table `lessons`
--

CREATE TABLE `lessons` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `module_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `contents` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `lessons`
--

INSERT INTO `lessons` (`id`, `module_id`, `title`, `contents`, `created_at`, `updated_at`) VALUES
(1, 1, 'Lesson 1: Introduction to Networking', 'Qui tenetur voluptatum sed dicta ea. Ipsa possimus qui et iste. Sit laudantium ipsa cum quia est accusamus. Mollitia placeat autem quae natus modi deserunt quidem.\n\nMinus placeat a velit libero facilis cum. Officiis cum impedit hic corrupti soluta dignissimos reprehenderit autem. Velit eum voluptatem perspiciatis ea molestiae asperiores sed. Neque quidem non corrupti fuga.\n\nNam est doloremque velit est labore minus odit. Sit aspernatur fugiat voluptatem autem. Asperiores perspiciatis soluta maxime vel hic soluta eveniet. Qui perspiciatis dolor ipsam inventore aut esse pariatur.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(2, 1, 'Lesson 2: Introduction to Networking', 'Voluptates laborum illo porro. Laboriosam suscipit aut ad soluta qui. Similique mollitia dolorem aut dolorem commodi corporis quis. A consectetur esse nam error. Qui pariatur omnis culpa molestiae sapiente enim amet.\n\nDicta voluptatem facilis itaque. Optio voluptatem ex sequi quo ducimus saepe. Nemo et id in dolores. Dolor cum voluptatem porro neque dolores asperiores.\n\nQuis ut ex et rem vel qui. Harum perferendis natus nobis a et quia necessitatibus voluptas. Nemo aperiam qui aut perferendis fuga accusantium.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(3, 1, 'Lesson 3: Introduction to Networking', 'Similique reprehenderit ut minus ullam consectetur temporibus. Vel delectus et dicta quia. Alias officia et laborum voluptas. Temporibus vero rerum et officiis.\n\nNihil est dolorem consequatur et nesciunt aut. Quae modi rem ad harum atque. Architecto non veritatis iste consequatur. At dolores nam in earum nemo aut nihil.\n\nEst adipisci nihil repudiandae qui est magnam dolor. Est sequi et nobis neque. Ullam consequuntur porro suscipit ducimus. Consequuntur enim assumenda fugit voluptatem cumque provident.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(4, 2, 'Lesson 1: IP Addressing and Subnetting', 'Illum impedit fugit nostrum. Aut ipsum temporibus doloremque sit animi. Voluptatem sed ut nobis et omnis. Animi corrupti enim nostrum sit eum suscipit quia.\n\nMollitia dolorem aperiam consequatur. Recusandae minus et consequuntur dolore. Fugit velit quae tenetur.\n\nRatione eaque saepe voluptatem soluta enim voluptatem. Corporis eos dolore quis. Ex eum at voluptatem enim consequatur sit ut. Nostrum omnis dolores animi amet quis ea consectetur.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(5, 2, 'Lesson 2: IP Addressing and Subnetting', 'Qui quasi ullam quo praesentium. Nemo ut omnis odio eos eum. Sit est sunt et vitae facilis. Id numquam ad ipsam soluta repudiandae hic facilis. Nihil iste quos sunt qui amet minima.\n\nIpsa quas sint assumenda quo. Ullam eaque qui natus ut cupiditate atque est sint. Quo iusto in maxime aut cum. Numquam aut nesciunt laboriosam. Molestias aliquam dolores id perferendis perferendis magnam.\n\nEt voluptatem itaque quasi officiis. Id quis sit porro exercitationem et. Architecto autem sed ipsum. Iusto molestiae aspernatur aut amet quis earum quo ab.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(6, 2, 'Lesson 3: IP Addressing and Subnetting', 'Voluptatem animi mollitia ut enim autem. Autem cupiditate est asperiores rerum qui. Enim rem dolorem odit. Officia voluptates molestiae libero quae. Ut qui aliquid nihil sed a sit est.\n\nIpsum assumenda culpa perspiciatis quo consequatur quidem dicta qui. Aspernatur velit temporibus expedita aut qui sapiente repudiandae et. Id quo quis nam et.\n\nDicta porro officiis ut itaque quasi dignissimos itaque. Voluptatem alias temporibus repellat repellendus vero. Odio porro facere et corporis sit eos corporis. Asperiores maiores est et maxime sint. Tempora distinctio quo optio eligendi.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(7, 3, 'Lesson 1: Routing Protocols', 'Numquam eligendi quia autem. Ut suscipit dolores vero sunt aspernatur. Odio cumque dolorem ut asperiores.\n\nVel sit accusamus rerum eveniet velit et dolore. Necessitatibus quo libero quia quas vel repellendus nostrum. Id molestias nemo est magni consectetur maiores.\n\nSint esse animi aspernatur animi voluptate occaecati aut. Ipsum veritatis molestiae consequatur repellendus commodi natus. In corrupti nemo fugit praesentium.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(8, 3, 'Lesson 2: Routing Protocols', 'Consequatur reprehenderit sapiente illum maxime quaerat omnis. Et fugit sint iste qui facilis totam accusamus. Atque recusandae enim quis ipsa officiis et.\n\nUt deserunt itaque qui. Atque qui quia ipsum delectus molestiae neque. Nostrum quaerat aliquam porro facere iste provident veniam laboriosam.\n\nMinima corrupti perspiciatis recusandae voluptatem sit molestiae magni in. Deleniti omnis magnam dolores eligendi. Culpa provident autem consequuntur id corporis quam laudantium. Hic autem totam tempora quo libero recusandae excepturi dolor.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(9, 3, 'Lesson 3: Routing Protocols', 'Aut ea et facere quos. Sint voluptates ratione rerum aperiam. Est suscipit officiis excepturi aliquam eaque earum odio. In qui nobis voluptas cumque tempore ut ut voluptatem.\n\nAperiam ea iste est harum ipsa officiis qui. Ut quod cumque quo recusandae temporibus et. Quod eos aut enim. Dolores hic consequatur nisi enim praesentium nostrum sit.\n\nVeniam iste illum voluptatem iure. Doloremque quaerat impedit doloribus sunt vitae error quas temporibus. Molestias illum sed eum dignissimos.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(10, 4, 'Lesson 1: Switching Fundamentals', 'Id voluptatem vel voluptate excepturi sed. Nobis architecto consequuntur molestiae enim vero voluptatem nobis. Est et quidem numquam provident.\n\nEst et labore laudantium ex non. Repellat quasi et reprehenderit ut accusantium in. Voluptatibus adipisci fugiat veritatis doloremque a. Quo commodi sit laudantium.\n\nQuo id impedit corporis ad et enim. Et aliquam quia voluptate beatae accusamus sunt. Eligendi praesentium praesentium quam animi. Voluptate enim aperiam et numquam accusamus tempora libero.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(11, 4, 'Lesson 2: Switching Fundamentals', 'Ullam error maiores voluptate consequuntur illum. Nam sit et nihil id delectus veniam. Fugit omnis at temporibus aut in in. Quasi eos provident fugiat aliquid est eos perspiciatis.\n\nQuos autem id doloremque explicabo aut. Culpa quasi odio et at debitis. Neque eum inventore tempore placeat vero est. Aliquam quia vero amet nostrum. Ut ut quas autem.\n\nIste optio amet nisi ipsa. Doloribus illum earum voluptates eum. Possimus dolores voluptas rerum ipsum.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(12, 4, 'Lesson 3: Switching Fundamentals', 'Aut ea sed qui rerum. Omnis et id illum blanditiis debitis aliquid esse. Nostrum est voluptates qui asperiores repellat. Quidem fugit eos omnis magni consectetur aliquid repellat.\n\nOfficiis ut quisquam nostrum et. A error magnam vel. Vero nesciunt et quisquam eius perspiciatis laudantium quaerat. A reiciendis qui voluptatibus.\n\nId itaque rerum adipisci voluptatum veritatis sequi. Totam vel harum et quis id eum est.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(13, 5, 'Lesson 1: 5G Architecture', 'Officia rerum adipisci et ea consequatur. Veniam est soluta cumque odio ut voluptatum vel eveniet. Labore sit adipisci error quia. Voluptatum qui iste et.\n\nQuod deserunt ut vero aspernatur quisquam hic explicabo. Quis maxime aspernatur mollitia eius incidunt sunt. Eligendi dolores provident ipsum.\n\nIncidunt omnis velit ullam excepturi qui neque. Officia labore itaque sequi quia. Voluptatem sint culpa quisquam est magni est sunt qui. Deserunt repellendus perspiciatis quidem omnis. Sed aliquam qui dolores ea.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(14, 5, 'Lesson 2: 5G Architecture', 'Eveniet et doloribus voluptatum nisi dolor. Quasi nostrum quo repellat eum ut nulla debitis quod. Rerum ipsa sequi sed quisquam.\n\nLaboriosam inventore nemo ratione mollitia est optio dolor. Iusto at officiis recusandae magni amet porro voluptatem. Ut ut enim repellendus quia atque quae. Cumque facere deserunt et harum expedita.\n\nAb eligendi itaque ipsum accusamus iusto. Adipisci aut illo incidunt illum. Quia necessitatibus quam qui magnam provident blanditiis. Quia voluptatem distinctio rerum ea.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(15, 5, 'Lesson 3: 5G Architecture', 'Et similique distinctio rerum expedita dolorum. Exercitationem ut asperiores reiciendis aut autem consequatur rem. Alias deleniti nam cumque.\n\nEos quae est id omnis odit eveniet qui. Impedit ex at praesentium dolores rerum ipsa.\n\nEt veniam voluptas dolor voluptas. Quis inventore maiores perspiciatis est id et quia. Mollitia exercitationem quod similique et cupiditate.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(16, 6, 'Lesson 1: Radio Access Technologies', 'Quibusdam veniam sunt ut. Nostrum sit molestiae eveniet eos nisi asperiores eum. Est recusandae omnis voluptatem dolor est. Dolores facilis perspiciatis sed voluptas. Non nostrum velit repellat quis labore.\n\nDoloribus deleniti deserunt officia quia omnis. Sit itaque sit excepturi omnis vitae. Accusamus nam voluptatem accusamus laborum. Sunt veniam alias ullam amet.\n\nDelectus deleniti laborum architecto deleniti delectus. Nesciunt soluta rem porro beatae nulla nam. Voluptas eveniet suscipit dolores placeat quia quos odit. Qui eligendi iusto aliquid maiores cupiditate.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(17, 6, 'Lesson 2: Radio Access Technologies', 'Cumque unde sit nam omnis excepturi. Optio debitis vero sed et aut corporis. Eligendi tempora voluptas quibusdam ratione accusamus.\n\nConsequatur quis porro aperiam necessitatibus. Quis fuga delectus et.\n\nConsequatur et ex sapiente impedit consequatur. Error autem dolor iste ut qui laudantium sunt a. Et ea sapiente quae iste.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(18, 6, 'Lesson 3: Radio Access Technologies', 'Animi est magnam est veniam et. Vel eligendi magni delectus ex eos. Maxime quaerat ut corporis harum fugit aut aperiam.\n\nUt repudiandae ipsa et eos et voluptatem. Qui possimus et iure nam aliquam tempora facere. Accusamus qui dicta quod.\n\nFuga harum ratione necessitatibus. Numquam tempore quia dolore aut quasi fuga alias. Enim consequuntur ea et sed et.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(19, 7, 'Lesson 1: Network Slicing', 'Excepturi et odit voluptatem quod recusandae rerum rerum ratione. Rerum aut voluptas iure voluptas quo ut et vel. Fugit et error vero.\n\nDeleniti animi minus ratione odit voluptatem temporibus itaque. Dolorem saepe hic eligendi. Quaerat in reiciendis quia aut voluptatem debitis libero. Quia qui reprehenderit a dolorem est sed. Labore autem et incidunt explicabo.\n\nEt iste consequatur provident consequuntur deleniti excepturi praesentium numquam. Et optio tenetur qui impedit voluptas. Molestiae et illum est dicta et sit. Consequatur consequatur quis quasi.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(20, 7, 'Lesson 2: Network Slicing', 'Autem blanditiis corrupti eum quas consectetur et culpa. Ad corrupti omnis repellat perferendis excepturi occaecati amet. Voluptate commodi sequi ipsa est eveniet exercitationem. Et expedita similique sed velit debitis beatae delectus quos.\n\nEum et et delectus tenetur. Cumque optio rerum dolore quibusdam dolorum. Et quaerat porro commodi.\n\nSint quasi architecto ipsa dicta est nihil. Nobis labore mollitia omnis non. Culpa et quia ipsa perspiciatis. Accusamus hic voluptatibus voluptas enim.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(21, 7, 'Lesson 3: Network Slicing', 'Quibusdam quasi repellendus id atque sunt. Soluta ipsam provident dicta itaque. Natus laboriosam iste quis tempora sequi. Fuga voluptatem aut impedit quia et. Mollitia iusto est est consequatur voluptates qui in fugit.\n\nFacilis eius repellendus omnis hic. Omnis quia et ipsa. Sint architecto qui omnis non molestiae. Temporibus aperiam similique et nisi saepe occaecati delectus. Dolorem corporis voluptas et fuga.\n\nEligendi omnis ea quis qui vel suscipit enim. Nam aliquam id eveniet qui voluptas veniam. Cupiditate officia et cum natus suscipit sunt modi tempora. Voluptas sed aut aspernatur officia ut tempora quia.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(22, 8, 'Lesson 1: 5G Security', 'Est deleniti consequatur eveniet recusandae. Omnis iure et rerum dolor. Qui sunt dolore placeat molestiae omnis beatae. Officiis minus hic blanditiis maxime cum.\n\nSit ut quibusdam error voluptas quis voluptatem qui deleniti. Beatae dolore non ut sunt optio magni. Vero accusantium voluptas ipsa eligendi illum.\n\nMinus asperiores recusandae distinctio necessitatibus animi. Dignissimos minima voluptatem natus accusamus. Dolores qui aliquam cupiditate dolorem sit asperiores est.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(23, 8, 'Lesson 2: 5G Security', 'Cupiditate et qui quasi quas tenetur. Dolore fugiat occaecati qui pariatur nam. Vitae non laborum eveniet labore voluptatem. Incidunt voluptates et minus fugiat ut delectus tenetur.\n\nQui pariatur ut aut est excepturi alias et ex. Nulla autem molestias reiciendis delectus. Ipsa sit doloremque reiciendis labore saepe rerum minima.\n\nIste dolorem non voluptate rem molestiae quisquam adipisci aperiam. Atque necessitatibus id impedit quasi repellat. Error cum nisi dolore maiores ad at. Qui aperiam architecto rerum ad similique quo ut ad.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(24, 8, 'Lesson 3: 5G Security', 'Et ut ipsum reprehenderit quia neque. Voluptatem qui id dignissimos animi autem excepturi alias. Quae voluptatum qui voluptas quaerat veritatis. Quas doloribus quam similique dicta et quidem saepe.\n\nQuo dolore repellendus voluptatem iusto impedit. Voluptatem earum rerum minus officiis ullam dolorum. Sit autem beatae debitis qui possimus quam ea. Totam repellat consequuntur amet qui.\n\nMagnam quaerat sit voluptatem quae et voluptas in. Voluptatem qui nemo voluptas doloremque in. Minus accusamus nesciunt possimus non et facere reiciendis.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(25, 9, 'Lesson 1: Threat Identification', 'Nostrum incidunt dolorem porro quo quia. Qui sunt voluptatem non nam est non ullam consequatur. Eum est accusantium totam non dignissimos non. Commodi consequatur voluptatem vel similique iure voluptatum. Ut ea delectus ad velit qui.\n\nUt delectus maiores maxime quia. Beatae voluptatibus dolor aliquid soluta repudiandae. Aut hic adipisci optio voluptatum.\n\nMollitia minus vero odio ut. Accusantium vel dolorem aliquam illo.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(26, 9, 'Lesson 2: Threat Identification', 'Iusto et sed ut asperiores numquam eum nihil accusamus. Quasi est dolores perspiciatis consequatur. Unde qui expedita fugit aut ut. Assumenda exercitationem laudantium sint at voluptatum debitis.\n\nAtque illo eligendi est dolorem nam ut. Porro repudiandae nobis dolores. Est magnam sunt architecto deserunt beatae ex quaerat sapiente. Perspiciatis non expedita nostrum.\n\nVoluptate similique est aliquam aut molestiae voluptatem. Id dolor dicta rerum voluptatem. Ut animi commodi quidem asperiores facilis ducimus praesentium. Error temporibus in eligendi ea magnam ducimus recusandae.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(27, 9, 'Lesson 3: Threat Identification', 'Eius libero nam dolor possimus qui. Quisquam qui perspiciatis possimus autem tenetur recusandae. Quo facilis accusantium corrupti inventore. Voluptate optio ipsa ut aliquid.\n\nOdit eum architecto et sunt. Dolore sit aut qui et delectus sit quasi. Id repudiandae blanditiis numquam vitae amet amet harum.\n\nReprehenderit nihil sequi nostrum aut error repellat. Sed mollitia voluptates ratione repellendus nemo. Id fugit ullam rerum. Consequatur vel laborum temporibus beatae.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(28, 10, 'Lesson 1: Firewall Configuration', 'Eaque laudantium et et voluptates. Error sint ut qui libero. Omnis voluptatem sit odio voluptatem harum. Ut illum voluptas enim numquam aperiam laboriosam eum.\n\nAmet impedit officiis eum inventore veniam. Et dolorem atque corporis nostrum in quia animi reiciendis. Sed quis rerum ut ipsa libero at. Pariatur non et iure dolores ea et.\n\nOmnis soluta quia deserunt autem dolore voluptates et. Et qui aspernatur perferendis asperiores necessitatibus. Error exercitationem tempore recusandae veniam similique non aut. Repudiandae omnis dignissimos nihil et et.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(29, 10, 'Lesson 2: Firewall Configuration', 'Ut harum et accusantium nesciunt. Tempore est perferendis et voluptas ipsam. Commodi a corporis quia culpa minima quo aut. Aut quis illum deserunt beatae repellat est ullam.\n\nVoluptatem eos nisi ex consequuntur voluptatem qui sed laboriosam. Corporis et ad sint voluptatem deleniti fugiat quasi rem. Quidem nemo non est assumenda ea quas. Quas nobis qui modi voluptas.\n\nPorro perferendis qui deserunt illum dignissimos. Fugit voluptatem est minima libero ad voluptas deleniti. Consequatur et libero voluptas distinctio inventore. Totam quaerat a quia.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(30, 10, 'Lesson 3: Firewall Configuration', 'Eum dolor laborum sapiente dolor aliquam incidunt. Magni sed explicabo dolorem. Laborum ullam est aut eius. Temporibus autem et ut qui.\n\nNatus ut quo et dicta cum fugiat. Sunt accusamus et consequatur distinctio qui magni. Esse quod eos atque maiores deserunt ratione quasi. Suscipit eum voluptatum non quia et cupiditate vel.\n\nSimilique qui itaque quas qui. Consequuntur deserunt sequi rem voluptatem ea eveniet. Sit ut fugit impedit vero. Natus itaque officia dolor corrupti repellat odit.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(31, 11, 'Lesson 1: VPN Setup', 'Velit ut libero excepturi qui quam. Officiis et alias dolor architecto. Molestias veniam aut sed non laborum. Quo aut praesentium occaecati vel molestiae.\n\nSint ab id facere tempora voluptatem. Sint enim dolores odit quos. Debitis quis soluta velit nam. Iste aspernatur ducimus neque corporis occaecati cumque.\n\nAsperiores alias hic et quo. Adipisci dolorem amet ipsam quasi doloremque voluptas numquam. Explicabo ea saepe suscipit voluptatem aut.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(32, 11, 'Lesson 2: VPN Setup', 'Ipsam sapiente labore eaque voluptatem sint voluptatem asperiores. Temporibus unde molestiae inventore qui. Nemo suscipit ut iusto excepturi perferendis.\n\nEos nemo explicabo qui nihil mollitia. Et ex voluptate est at est quos et. Sit sapiente cumque quia nisi. Quam deserunt eaque soluta enim.\n\nFugiat numquam esse nesciunt molestiae. Totam officia velit molestiae vero. Culpa porro impedit asperiores commodi autem veniam quas.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(33, 11, 'Lesson 3: VPN Setup', 'Minima voluptates accusamus est quasi voluptate placeat est. Nesciunt quam est rem fugit. Ipsam explicabo qui iure et officia. Quia necessitatibus ipsum eum delectus sed nulla.\n\nQui laudantium iure molestiae magni. Consequuntur explicabo minima reprehenderit.\n\nImpedit in quam qui vel voluptate. Et dolor est delectus optio natus. Ullam fugiat accusamus dignissimos non eveniet. Optio velit nihil quis.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(34, 12, 'Lesson 1: Intrusion Detection Systems', 'In illo ea natus quia hic accusamus. Voluptate recusandae cum aut quos quas quia.\n\nUt odit vel est. Nisi maiores laborum et a culpa. Voluptatem neque corrupti fuga qui qui facilis maiores. Architecto aut omnis aut eius.\n\nAtque amet provident voluptates voluptas. Ipsum ut sit quo velit. Minus placeat voluptatem corrupti similique. Numquam recusandae beatae quasi cum illo veritatis. Qui ipsa voluptas est ipsum.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(35, 12, 'Lesson 2: Intrusion Detection Systems', 'Exercitationem rem provident asperiores porro alias. Et veniam enim veniam molestias nulla. Sint voluptates placeat hic quia voluptate fuga voluptas officia.\n\nAt soluta harum aut qui voluptatem. Eaque optio eum rerum vero excepturi. Odit dignissimos pariatur non totam repellat ut.\n\nImpedit adipisci neque voluptatem explicabo. Modi eius sunt nihil velit consectetur. Sunt quia quisquam voluptatibus et eos pariatur minus rerum. Rerum quis quaerat ad nobis non autem.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(36, 12, 'Lesson 3: Intrusion Detection Systems', 'Provident dolor iusto maxime iste numquam amet sint et. Eveniet eos quasi velit occaecati dignissimos adipisci iure. Quam consequatur porro ut aspernatur. Et accusamus labore quidem architecto omnis est rerum aut.\n\nEos laudantium voluptas facere sed quam incidunt architecto. Sit doloribus minima inventore tenetur tempore id non neque. Veritatis voluptas amet rerum aut eos ut.\n\nEt voluptatem quia autem quibusdam qui est accusamus et. Facilis praesentium consequuntur facilis quis non. Hic quia facere quaerat.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(37, 13, 'Lesson 1: Fiber Optic Basics', 'Ut nihil eos hic vel id. Harum quaerat natus quos illum. Qui qui illo quaerat consectetur. Eum voluptas suscipit qui reiciendis.\n\nLabore expedita quidem voluptatem distinctio suscipit error. Voluptatem non occaecati voluptatem quo et debitis.\n\nVoluptatem possimus voluptates velit quas quo quod. Unde consequuntur perspiciatis quidem quos nisi. Rerum ea fuga beatae temporibus error ut repudiandae. Doloremque cum ut sunt adipisci et voluptatem deserunt.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(38, 13, 'Lesson 2: Fiber Optic Basics', 'Commodi et nostrum voluptatibus explicabo et qui aut. Est maiores tenetur deleniti hic accusamus et animi. Ipsa quis eos ut ut asperiores. Laboriosam nisi est animi nesciunt nihil nihil.\n\nInventore harum nulla ratione minima eos nostrum. Nisi sequi eos porro enim ut perspiciatis. Fugit molestiae qui ipsa earum officia.\n\nEa quo quae quia soluta cum vero necessitatibus. Rerum vel consequatur aut eligendi. Temporibus voluptas ut molestiae quis ad sit. Eum ad in ad rerum.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(39, 13, 'Lesson 3: Fiber Optic Basics', 'Ea ea nobis iure vitae nesciunt eius doloribus. Perferendis neque nesciunt molestiae. Voluptatibus sit aut esse libero reiciendis consequatur est et. Ut hic aut ullam consequatur molestiae.\n\nPariatur voluptatem pariatur qui sunt totam. Provident ut recusandae omnis cumque omnis. Laboriosam perferendis nihil dolores deserunt optio. Fugit temporibus odit molestiae sit ullam nihil.\n\nQuo harum consequatur iste voluptas voluptatem et. Veritatis quis quis et cupiditate. Saepe nobis voluptatem distinctio aut enim quisquam quaerat.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(40, 14, 'Lesson 1: Cabling and Connectors', 'Quae modi aut asperiores ab ipsum vero aliquam. Laudantium non ut assumenda voluptatibus. Nemo voluptate reiciendis soluta sit pariatur culpa non in. Veritatis nostrum quibusdam non eaque. Illo aut unde quis voluptatem minima et.\n\nEnim laudantium odio nihil veniam error. Voluptas occaecati tempore ad voluptatum qui nihil. Illum voluptas sunt dolores enim. Sed sequi impedit nihil magnam corrupti qui.\n\nDolorem provident quis itaque. Consequatur neque distinctio vitae voluptates iure consequatur. Dolores consequatur qui sunt.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(41, 14, 'Lesson 2: Cabling and Connectors', 'Sequi quo dolor et quis. Quaerat quis molestias consequatur sed doloremque. Quia quaerat est qui illum nostrum quia. Quia temporibus quas consequatur voluptas.\n\nEt quisquam qui aperiam in et illo. Velit quisquam ratione qui enim. Excepturi voluptas quisquam quibusdam quo ea eum.\n\nRepellendus est esse dolorum ut veritatis aut libero iure. Molestiae earum eveniet ea ut. Similique dolorem sit corrupti atque repellendus accusantium est.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(42, 14, 'Lesson 3: Cabling and Connectors', 'Quam dolor a fugiat fugit magnam quos eius consequuntur. Qui dolore deserunt beatae eum non omnis. Non aliquid omnis sunt ad quisquam et et. Voluptates minus amet quisquam culpa quibusdam.\n\nDeserunt neque repellat aut dolorem est. Voluptatem id quae et laboriosam. Ab nobis porro minus et veniam. Voluptas dolorum consectetur tempora ut.\n\nDelectus beatae exercitationem excepturi neque adipisci omnis similique odio. Ipsum beatae deleniti et occaecati nobis accusantium sint. Eaque unde error tempora suscipit aut. Debitis aut porro et. Enim quibusdam suscipit repudiandae rerum animi dicta.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(43, 15, 'Lesson 1: Signal Transmission', 'Harum nesciunt odit dolorem magnam in molestias blanditiis. Qui facere mollitia ad maiores omnis facere amet. Excepturi consectetur alias vel. Quam aliquid eius laboriosam velit eaque.\n\nEnim aliquid earum consectetur cupiditate. Ipsa consequatur est impedit rerum facere. Quod natus qui eos esse aut et ea. Tempore consequatur consectetur in hic quam quae.\n\nAd voluptatem laboriosam quis est ipsa. Quia est numquam sunt harum. Deserunt et repudiandae non dignissimos error. Voluptatem illo suscipit deleniti vero. Aut est quo eaque iusto dolorem.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(44, 15, 'Lesson 2: Signal Transmission', 'Tempora voluptatem et laborum autem aut saepe soluta ratione. Ullam ex nesciunt quam est aut sit. Quis quis dolor rerum voluptatem dolor. Ipsa quam eveniet facilis.\n\nModi voluptates provident nam soluta esse autem porro fugit. Error laborum assumenda doloribus omnis cupiditate quod. Culpa repellat maiores dignissimos ut fuga molestias. Velit et facilis aliquam.\n\nEt autem cum cumque sed. Quia tempore voluptatem iure consequatur. Impedit velit est qui beatae neque eum voluptatum. Explicabo et repudiandae molestiae similique et non eveniet voluptate.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(45, 15, 'Lesson 3: Signal Transmission', 'Amet quia ut quo ratione. Corrupti odit qui hic dicta totam doloribus. Dolores earum aut dignissimos reiciendis.\n\nMagni ipsum praesentium fugit voluptatum. Iste corrupti dolor distinctio eos mollitia. Quod tenetur fugit error porro quis. Minus voluptas sed natus quae velit.\n\nConsequatur et quia tempore natus. Eos magni eum officiis mollitia voluptatum. Eius qui consequatur exercitationem earum.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(46, 16, 'Lesson 1: Troubleshooting', 'Deserunt nisi nostrum eaque dolor aliquam et. Dolores quasi quisquam ipsam unde aut voluptas. Commodi non inventore consequatur. Perferendis accusantium totam perferendis error ullam.\n\nVoluptates natus repudiandae temporibus et eos. Suscipit optio quidem non vitae quo in. Distinctio ullam ab est. Aspernatur excepturi ea omnis recusandae.\n\nQuas ut beatae nesciunt numquam doloribus voluptas. Pariatur dolores itaque rem et ea consequatur. Provident nihil quo omnis est.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(47, 16, 'Lesson 2: Troubleshooting', 'Sunt placeat dolore nobis voluptatibus qui aut aut. Quibusdam officiis rerum optio sunt facere. Et natus aspernatur ea mollitia nesciunt incidunt est.\n\nDicta quia hic soluta voluptatem voluptatem quas. Explicabo velit et officia vero similique ad dolor. Nulla quis et possimus.\n\nEveniet iure aut iusto sunt nihil et aliquid. Cum animi quod a et. Blanditiis nobis suscipit blanditiis magnam. Id ut debitis doloremque harum ea.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(48, 16, 'Lesson 3: Troubleshooting', 'Possimus consectetur nihil consectetur reiciendis et aut dolor. Et alias qui molestias et fuga. Id aspernatur numquam sunt ducimus ab ut. Exercitationem at dignissimos voluptates.\n\nLaudantium similique iure delectus vel non voluptas. Molestiae cumque magni similique et tempora. Quae in quae est corporis aut. Fugit voluptate distinctio dignissimos harum nostrum.\n\nPerspiciatis expedita voluptas laborum sit id nihil accusamus. Porro laboriosam vero nulla quasi ut sequi amet. Qui eius iure explicabo iusto hic sequi sint.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(49, 17, 'Lesson 1: Wi-Fi Standards', 'Iusto est aliquam in et non in. Odit nihil odio perferendis consequatur. Quo eos molestiae expedita in et omnis rem velit. Ut tempora quo perspiciatis voluptatem atque ut quod. Est quod et dicta quod quo voluptates.\n\nConsequatur provident aliquid magni in autem. Vitae excepturi id reprehenderit itaque omnis. Voluptatem esse quis voluptas cupiditate expedita. Vero quod doloremque quo asperiores autem.\n\nQuis aut fugiat vitae sed. Commodi minima omnis tempore ipsa. Provident eum minima aut nesciunt doloribus inventore. Quisquam laborum iusto nesciunt voluptate a et quam.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(50, 17, 'Lesson 2: Wi-Fi Standards', 'Qui et est officia nobis nihil suscipit ducimus. Iste est ducimus quasi excepturi. Labore in enim aliquid repudiandae minima cumque non. Et quaerat sint cumque perferendis ut culpa.\n\nDeserunt distinctio consequatur eius porro deserunt et. Tenetur et eos odio ut. Vel omnis porro saepe magni qui consequuntur doloribus.\n\nQuos eius maiores et quos delectus. Qui quis alias officiis. Nesciunt sunt facilis in eligendi blanditiis pariatur et.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(51, 17, 'Lesson 3: Wi-Fi Standards', 'Dicta magni nulla tempora at aut omnis iusto. In sit consectetur quia minima aut vitae. Velit ab consequatur distinctio fugit natus. Et quas fuga magnam nihil sit suscipit.\n\nDolorum et distinctio consequuntur eos quaerat necessitatibus et similique. Maxime debitis ut doloribus eum. Eveniet tempora ipsa odit dolorem.\n\nRerum voluptatibus velit enim reprehenderit neque eos. Repellendus maiores provident et fugit nihil. Hic ipsam provident animi.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(52, 18, 'Lesson 1: Wireless Security', 'Quis est laboriosam veniam ea cupiditate. Quos eos est velit rerum et ut. Est similique vel totam quam doloremque velit.\n\nVoluptate ipsum totam maxime qui maxime officia veritatis. Consectetur eligendi rerum iusto aut inventore occaecati.\n\nEum dolor id qui minima veritatis et in voluptate. Natus repellendus molestiae cumque at dicta corporis. Recusandae sequi dolor quia aspernatur placeat quibusdam suscipit. Inventore aut qui laborum quos eum nisi illo.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(53, 18, 'Lesson 2: Wireless Security', 'Earum sint ullam aut voluptatem. Eum voluptatibus commodi consequuntur quia ullam maiores minima. Nesciunt earum beatae quis.\n\nIn voluptatibus esse vero sed doloribus exercitationem dicta consequuntur. Optio doloremque voluptas et cupiditate. Iste laudantium molestias amet sit et omnis assumenda.\n\nIllo vel suscipit et eligendi. Impedit qui asperiores et velit deserunt dicta quae. In minus atque vel ex velit in.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(54, 18, 'Lesson 3: Wireless Security', 'Animi quibusdam velit tempora accusantium illo. Rem dolore in magni laboriosam. Quia porro corporis et eos.\n\nEt et minima rerum possimus occaecati dignissimos. Facere ab quia tempore illo vel adipisci voluptatem.\n\nArchitecto labore molestiae commodi fugit et sit. A voluptas rerum sunt non. Qui dolores quis fugiat.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(55, 19, 'Lesson 1: Access Point Configuration', 'Quidem soluta dolor iusto sapiente quisquam atque molestiae. Esse debitis quo sequi veritatis quos dignissimos. Sapiente accusamus voluptates accusantium sint iusto architecto.\n\nRerum eum consectetur excepturi quia accusamus enim voluptates. Aperiam ullam vitae natus ratione perferendis reiciendis omnis. Non rem quasi beatae vitae beatae veniam error ea. Nihil perspiciatis sed et aut repudiandae blanditiis eum. Odit autem consequatur nostrum natus.\n\nVoluptas sunt temporibus voluptatibus culpa sint. Reiciendis ipsam velit nostrum non ut esse. Vel debitis corporis unde. Rem sint neque ea in deleniti fuga. Illum nisi eius ut dignissimos nisi eos quos.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(56, 19, 'Lesson 2: Access Point Configuration', 'Repudiandae consequuntur modi est non vel. Doloremque necessitatibus in consectetur eos sint. Dolorem nam et temporibus et et aut voluptatem.\n\nVoluptatem harum ex dicta voluptates id laborum nemo. Suscipit ut sed qui corrupti praesentium dolorem recusandae ratione. Ut similique ipsum id omnis accusamus iure. Quae in ad quaerat perferendis et optio quo. Doloribus qui tempora est ut quaerat porro eligendi sed.\n\nAut necessitatibus et recusandae dolor iste molestiae. Reiciendis voluptatem repellat minima recusandae. Perspiciatis sapiente qui saepe non vitae. Repellat sint dolorem tenetur vitae.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(57, 19, 'Lesson 3: Access Point Configuration', 'Commodi sunt animi voluptas quibusdam hic incidunt. Vitae et et praesentium non vel rerum voluptatem. Nemo excepturi hic magnam a doloribus quis aliquam. Distinctio dolore rerum impedit qui consequatur. Quasi quidem omnis quod porro sit est.\n\nDeserunt molestias et quidem id voluptatibus. Amet qui dolores tenetur soluta provident. Voluptatem repellat dolorem neque. Vero ut maiores dicta at.\n\nNobis et modi voluptatem enim sed veniam aut. Quod eum quia vitae sapiente et qui et. Nesciunt quo officiis vel provident id ut. Quos nostrum commodi ut soluta molestiae.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(58, 20, 'Lesson 1: Troubleshooting Wireless Networks', 'Excepturi vel expedita aspernatur et quis non voluptas omnis. Voluptatem laboriosam laboriosam quia ipsam quidem. Maiores aut tempore et. Ut et perferendis ut sit culpa.\n\nVoluptate illum odit dolorem aut autem voluptas. Nesciunt fuga enim ut architecto cum. Nihil eligendi aut ducimus quibusdam accusantium. Ipsa earum quis ut esse autem incidunt doloribus.\n\nQuia quos provident qui. Exercitationem laborum similique et fugit sit odio consequuntur rerum. Sint labore enim accusamus voluptatum ipsum voluptatem. Quia eum est ad quia voluptatum sed.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(59, 20, 'Lesson 2: Troubleshooting Wireless Networks', 'Tempora veniam exercitationem quas sed et. Et qui ut eius ut sequi nisi et provident. Perferendis quae sequi nobis laboriosam odio ea. Dolorem et cumque maxime qui.\n\nExpedita voluptas iure rerum quis dicta ut. Eveniet sapiente quia qui eum est eos. Accusamus aspernatur perferendis cumque consequatur asperiores.\n\nSed facilis molestiae voluptas suscipit voluptas est repellendus. Quia ipsam molestias et sed quasi. Qui voluptatibus voluptatem dolor soluta incidunt.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(60, 20, 'Lesson 3: Troubleshooting Wireless Networks', 'Voluptatibus incidunt deleniti laborum commodi. Aut harum nulla esse possimus voluptatem impedit omnis cum. Accusantium incidunt reiciendis culpa maiores ut aut vel inventore. Quia et repellat quia assumenda est animi.\n\nSaepe quod blanditiis provident qui. Iusto pariatur cum perspiciatis explicabo in aut ut. Quia harum deleniti optio et. Est maiores qui explicabo quo numquam ullam in.\n\nRerum pariatur ipsa et aliquid debitis. Explicabo ex maxime ut deleniti iusto totam. Sit consequatur at dolor esse fuga. Neque quam autem nesciunt et et.', '2025-07-07 07:09:49', '2025-07-07 07:09:49');

-- --------------------------------------------------------

--
-- Structure de la table `meetings`
--

CREATE TABLE `meetings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `formation_id` bigint(20) UNSIGNED NOT NULL,
  `teacher_id` bigint(20) UNSIGNED NOT NULL,
  `progression_level` int(11) NOT NULL,
  `scheduled_at` datetime NOT NULL,
  `room_link` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `meetings`
--

INSERT INTO `meetings` (`id`, `formation_id`, `teacher_id`, `progression_level`, `scheduled_at`, `room_link`, `created_at`, `updated_at`) VALUES
(1, 1, 4, 25, '2025-08-15 20:00:00', NULL, '2025-07-11 13:41:24', '2025-07-11 13:41:24'),
(2, 1, 4, 50, '2025-08-15 21:00:00', NULL, '2025-07-11 13:41:50', '2025-07-11 13:41:50'),
(3, 1, 4, 75, '2025-07-29 23:00:00', NULL, '2025-07-11 14:36:09', '2025-07-11 14:36:09'),
(4, 1, 4, 25, '2025-07-11 20:00:00', 'formation_1_progression_25_meet_1752256415', '2025-07-11 15:53:35', '2025-07-11 15:53:35'),
(5, 2, 4, 25, '2025-07-23 12:00:00', 'formation_2_progression_25_meet_1752272572', '2025-07-11 20:22:52', '2025-07-11 20:22:52'),
(6, 4, 5, 25, '2025-07-12 20:00:00', 'formation_4_progression_25_meet_1752333933', '2025-07-12 13:25:33', '2025-07-12 13:25:33'),
(7, 4, 5, 50, '2025-07-26 07:50:00', 'formation_4_progression_50_meet_1752333966', '2025-07-12 13:26:06', '2025-07-12 13:26:06'),
(8, 4, 5, 25, '2025-07-15 12:00:00', 'formation_4_progression_25_meet_1752574704', '2025-07-15 08:18:24', '2025-07-15 08:18:24');

-- --------------------------------------------------------

--
-- Structure de la table `meeting_student`
--

CREATE TABLE `meeting_student` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `meeting_id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `level` tinyint(1) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `meeting_student`
--

INSERT INTO `meeting_student` (`id`, `meeting_id`, `student_id`, `level`, `created_at`, `updated_at`) VALUES
(1, 1, 7, 0, '2025-07-11 13:41:24', '2025-07-11 13:41:24'),
(2, 1, 8, 0, '2025-07-11 13:41:24', '2025-07-11 13:41:24'),
(3, 1, 11, 0, '2025-07-11 13:41:24', '2025-07-11 13:41:24'),
(4, 1, 12, 0, '2025-07-11 13:41:24', '2025-07-11 13:41:24'),
(5, 1, 13, 0, '2025-07-11 13:41:24', '2025-07-11 13:41:24'),
(6, 1, 16, 0, '2025-07-11 13:41:24', '2025-07-11 13:41:24'),
(7, 1, 17, 0, '2025-07-11 13:41:24', '2025-07-11 13:41:24'),
(8, 1, 23, 0, '2025-07-11 13:41:24', '2025-07-11 13:41:24'),
(9, 2, 7, 0, '2025-07-11 13:41:50', '2025-07-11 13:41:50'),
(10, 2, 8, 0, '2025-07-11 13:41:50', '2025-07-11 13:41:50'),
(11, 2, 11, 0, '2025-07-11 13:41:50', '2025-07-11 13:41:50'),
(12, 2, 12, 0, '2025-07-11 13:41:50', '2025-07-11 13:41:50'),
(13, 2, 23, 0, '2025-07-11 13:41:50', '2025-07-11 13:41:50'),
(14, 3, 8, 0, '2025-07-11 14:36:09', '2025-07-11 14:36:09'),
(15, 4, 7, 0, '2025-07-11 15:53:35', '2025-07-11 15:53:35'),
(16, 4, 8, 0, '2025-07-11 15:53:35', '2025-07-11 15:53:35'),
(17, 4, 11, 0, '2025-07-11 15:53:35', '2025-07-11 15:53:35'),
(18, 4, 12, 0, '2025-07-11 15:53:35', '2025-07-11 15:53:35'),
(19, 4, 13, 0, '2025-07-11 15:53:35', '2025-07-11 15:53:35'),
(20, 4, 16, 0, '2025-07-11 15:53:35', '2025-07-11 15:53:35'),
(21, 4, 17, 0, '2025-07-11 15:53:35', '2025-07-11 15:53:35'),
(22, 4, 23, 0, '2025-07-11 15:53:35', '2025-07-11 15:53:35'),
(23, 5, 13, 0, '2025-07-11 20:22:52', '2025-07-11 20:22:52'),
(24, 5, 16, 0, '2025-07-11 20:22:52', '2025-07-11 20:22:52'),
(25, 5, 17, 0, '2025-07-11 20:22:52', '2025-07-11 20:22:52'),
(26, 5, 19, 0, '2025-07-11 20:22:52', '2025-07-11 20:22:52'),
(27, 5, 25, 0, '2025-07-11 20:22:52', '2025-07-11 20:22:52'),
(28, 5, 26, 0, '2025-07-11 20:22:52', '2025-07-11 20:22:52'),
(29, 6, 12, 0, '2025-07-12 13:25:33', '2025-07-12 13:25:33'),
(30, 6, 14, 0, '2025-07-12 13:25:33', '2025-07-12 13:25:33'),
(31, 6, 19, 0, '2025-07-12 13:25:33', '2025-07-12 13:25:33'),
(32, 6, 21, 0, '2025-07-12 13:25:33', '2025-07-12 13:25:33'),
(33, 6, 23, 0, '2025-07-12 13:25:33', '2025-07-12 13:25:33'),
(34, 6, 24, 0, '2025-07-12 13:25:33', '2025-07-12 13:25:33'),
(35, 7, 12, 0, '2025-07-12 13:26:06', '2025-07-12 13:26:06'),
(36, 7, 14, 0, '2025-07-12 13:26:06', '2025-07-12 13:26:06'),
(37, 7, 19, 0, '2025-07-12 13:26:06', '2025-07-12 13:26:06'),
(38, 7, 21, 0, '2025-07-12 13:26:06', '2025-07-12 13:26:06'),
(39, 7, 23, 0, '2025-07-12 13:26:06', '2025-07-12 13:26:06'),
(40, 7, 24, 0, '2025-07-12 13:26:06', '2025-07-12 13:26:06');

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_05_02_120445_create_personal_access_tokens_table', 1),
(5, '2025_05_05_074916_create_students_table', 1),
(6, '2025_05_05_075231_create_teachers_table', 1),
(7, '2025_05_05_075310_create_admins_table', 1),
(8, '2025_05_05_075446_create_des_table', 1),
(9, '2025_05_05_075500_create_formations_table', 1),
(10, '2025_05_05_075514_create_modules_table', 1),
(11, '2025_05_05_075528_create_lessons_table', 1),
(12, '2025_05_05_075545_create_equipments_table', 1),
(13, '2025_05_05_075752_create_orders_table', 1),
(14, '2025_05_05_114100_create_equipment_orders_table', 1),
(15, '2025_05_05_131012_create_permission_tables', 1),
(16, '2025_06_06_154430_create_equipements_formations_table', 1),
(17, '2025_06_19_151035_create_formation_students_table', 1),
(19, '2025_06_20_173700_create_quizzes_table', 1),
(20, '2025_06_25_161219_create_questions_table', 1),
(21, '2025_06_25_161251_create_options_table', 1),
(22, '2025_07_07_162831_add_completed_lessons_to_formation_studesnts', 2),
(23, '2025_07_11_103635_meeting_student', 3),
(24, '2025_07_11_104205_meetings', 4),
(25, '2025_07_11_154002_meeting_student', 5);

-- --------------------------------------------------------

--
-- Structure de la table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1),
(2, 'App\\Models\\User', 2),
(2, 'App\\Models\\User', 3),
(2, 'App\\Models\\User', 4),
(2, 'App\\Models\\User', 5),
(2, 'App\\Models\\User', 6),
(3, 'App\\Models\\User', 7),
(3, 'App\\Models\\User', 8),
(3, 'App\\Models\\User', 9),
(3, 'App\\Models\\User', 10),
(3, 'App\\Models\\User', 11),
(3, 'App\\Models\\User', 12),
(3, 'App\\Models\\User', 13),
(3, 'App\\Models\\User', 14),
(3, 'App\\Models\\User', 15),
(3, 'App\\Models\\User', 16),
(3, 'App\\Models\\User', 17),
(3, 'App\\Models\\User', 18),
(3, 'App\\Models\\User', 19),
(3, 'App\\Models\\User', 20),
(3, 'App\\Models\\User', 21),
(3, 'App\\Models\\User', 22),
(3, 'App\\Models\\User', 23),
(3, 'App\\Models\\User', 24),
(3, 'App\\Models\\User', 25),
(3, 'App\\Models\\User', 26);

-- --------------------------------------------------------

--
-- Structure de la table `modules`
--

CREATE TABLE `modules` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `formation_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `modules`
--

INSERT INTO `modules` (`id`, `formation_id`, `title`, `description`, `created_at`, `updated_at`) VALUES
(1, 1, 'Introduction to Networking', 'Module covering Introduction to Networking for CCNA Certification Training.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(2, 1, 'IP Addressing and Subnetting', 'Module covering IP Addressing and Subnetting for CCNA Certification Training.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(3, 1, 'Routing Protocols', 'Module covering Routing Protocols for CCNA Certification Training.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(4, 1, 'Switching Fundamentals', 'Module covering Switching Fundamentals for CCNA Certification Training.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(5, 2, '5G Architecture', 'Module covering 5G Architecture for 5G Network Fundamentals.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(6, 2, 'Radio Access Technologies', 'Module covering Radio Access Technologies for 5G Network Fundamentals.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(7, 2, 'Network Slicing', 'Module covering Network Slicing for 5G Network Fundamentals.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(8, 2, '5G Security', 'Module covering 5G Security for 5G Network Fundamentals.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(9, 3, 'Threat Identification', 'Module covering Threat Identification for Network Security Essentials.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(10, 3, 'Firewall Configuration', 'Module covering Firewall Configuration for Network Security Essentials.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(11, 3, 'VPN Setup', 'Module covering VPN Setup for Network Security Essentials.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(12, 3, 'Intrusion Detection Systems', 'Module covering Intrusion Detection Systems for Network Security Essentials.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(13, 4, 'Fiber Optic Basics', 'Module covering Fiber Optic Basics for Fiber Optic Communications.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(14, 4, 'Cabling and Connectors', 'Module covering Cabling and Connectors for Fiber Optic Communications.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(15, 4, 'Signal Transmission', 'Module covering Signal Transmission for Fiber Optic Communications.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(16, 4, 'Troubleshooting', 'Module covering Troubleshooting for Fiber Optic Communications.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(17, 5, 'Wi-Fi Standards', 'Module covering Wi-Fi Standards for Wireless Networking.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(18, 5, 'Wireless Security', 'Module covering Wireless Security for Wireless Networking.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(19, 5, 'Access Point Configuration', 'Module covering Access Point Configuration for Wireless Networking.', '2025-07-07 07:09:49', '2025-07-07 07:09:49'),
(20, 5, 'Troubleshooting Wireless Networks', 'Module covering Troubleshooting Wireless Networks for Wireless Networking.', '2025-07-07 07:09:49', '2025-07-07 07:09:49');

-- --------------------------------------------------------

--
-- Structure de la table `options`
--

CREATE TABLE `options` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `question_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `answer` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `options`
--

INSERT INTO `options` (`id`, `question_id`, `title`, `answer`, `created_at`, `updated_at`) VALUES
(1, 1, 'excepturi', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(2, 1, 'qui', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(3, 1, 'dolorum', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(4, 1, 'error', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(5, 2, 'dolor', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(6, 2, 'vel', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(7, 2, 'omnis', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(8, 2, 'ad', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(9, 3, 'molestiae', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(10, 3, 'facilis', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(11, 3, 'animi', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(12, 3, 'et', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(13, 4, 'enim', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(14, 4, 'vel', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(15, 4, 'voluptas', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(16, 4, 'sunt', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(17, 5, 'odio', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(18, 5, 'et', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(19, 5, 'tenetur', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(20, 5, 'eum', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(21, 6, 'accusantium', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(22, 6, 'nemo', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(23, 6, 'ad', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(24, 6, 'dolor', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(25, 7, 'possimus', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(26, 7, 'totam', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(27, 7, 'blanditiis', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(28, 7, 'dolorem', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(29, 8, 'in', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(30, 8, 'et', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(31, 8, 'iusto', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(32, 8, 'odit', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(33, 9, 'sunt', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(34, 9, 'dicta', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(35, 9, 'saepe', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(36, 9, 'provident', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(37, 10, 'quia', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(38, 10, 'harum', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(39, 10, 'et', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(40, 10, 'sequi', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(41, 11, 'voluptas', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(42, 11, 'id', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(43, 11, 'ea', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(44, 11, 'eligendi', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(45, 12, 'eos', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(46, 12, 'modi', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(47, 12, 'sit', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(48, 12, 'non', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(49, 13, 'delectus', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(50, 13, 'sit', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(51, 13, 'sunt', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(52, 13, 'eum', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(53, 14, 'sint', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(54, 14, 'doloremque', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(55, 14, 'in', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(56, 14, 'velit', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(57, 15, 'consectetur', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(58, 15, 'neque', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(59, 15, 'voluptatem', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(60, 15, 'commodi', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(61, 16, 'necessitatibus', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(62, 16, 'et', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(63, 16, 'sed', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(64, 16, 'ea', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(65, 17, 'quis', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(66, 17, 'eligendi', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(67, 17, 'voluptatem', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(68, 17, 'et', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(69, 18, 'doloremque', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(70, 18, 'voluptatem', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(71, 18, 'et', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(72, 18, 'numquam', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(73, 19, 'commodi', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(74, 19, 'aut', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(75, 19, 'maxime', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(76, 19, 'consequuntur', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(77, 20, 'eum', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(78, 20, 'sed', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(79, 20, 'et', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(80, 20, 'dolorem', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(81, 21, 'officiis', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(82, 21, 'voluptatibus', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(83, 21, 'placeat', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(84, 21, 'reprehenderit', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(85, 22, 'corporis', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(86, 22, 'id', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(87, 22, 'labore', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(88, 22, 'ullam', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(89, 23, 'voluptas', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(90, 23, 'id', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(91, 23, 'illo', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(92, 23, 'sed', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(93, 24, 'quasi', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(94, 24, 'enim', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(95, 24, 'vitae', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(96, 24, 'cum', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(97, 25, 'non', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(98, 25, 'vero', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(99, 25, 'repellat', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(100, 25, 'dolore', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(101, 26, 'perspiciatis', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(102, 26, 'qui', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(103, 26, 'eius', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(104, 26, 'aut', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(105, 27, 'qui', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(106, 27, 'fugit', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(107, 27, 'quia', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(108, 27, 'eius', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(109, 28, 'at', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(110, 28, 'ut', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(111, 28, 'consequatur', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(112, 28, 'dolores', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(113, 29, 'molestiae', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(114, 29, 'eum', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(115, 29, 'dolorem', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(116, 29, 'odio', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(117, 30, 'qui', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(118, 30, 'rerum', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(119, 30, 'eius', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(120, 30, 'nobis', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(121, 31, 'et', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(122, 31, 'rerum', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(123, 31, 'ut', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(124, 31, 'dolores', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(125, 32, 'ut', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(126, 32, 'et', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(127, 32, 'culpa', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(128, 32, 'illo', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(129, 33, 'quae', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(130, 33, 'et', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(131, 33, 'qui', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(132, 33, 'quod', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(133, 34, 'porro', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(134, 34, 'deleniti', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(135, 34, 'quas', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(136, 34, 'rerum', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(137, 35, 'et', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(138, 35, 'tempore', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(139, 35, 'eum', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(140, 35, 'voluptas', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(141, 36, 'id', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(142, 36, 'et', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(143, 36, 'tempore', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(144, 36, 'quis', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(145, 37, 'quam', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(146, 37, 'dicta', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(147, 37, 'odio', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(148, 37, 'doloremque', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(149, 38, 'explicabo', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(150, 38, 'aut', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(151, 38, 'voluptatem', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(152, 38, 'et', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(153, 39, 'laboriosam', 1, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(154, 39, 'aut', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(155, 39, 'perferendis', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(156, 39, 'quo', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(157, 40, 'architecto', 1, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(158, 40, 'debitis', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(159, 40, 'nobis', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(160, 40, 'saepe', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(161, 41, 'porro', 1, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(162, 41, 'at', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(163, 41, 'illum', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(164, 41, 'nisi', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(165, 42, 'ipsum', 1, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(166, 42, 'eius', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(167, 42, 'et', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(168, 42, 'impedit', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(169, 43, 'et', 1, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(170, 43, 'praesentium', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(171, 43, 'quo', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(172, 43, 'vero', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(173, 44, 'optio', 1, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(174, 44, 'fuga', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(175, 44, 'est', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(176, 44, 'aut', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(177, 45, 'dolorem', 1, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(178, 45, 'neque', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(179, 45, 'facere', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(180, 45, 'doloremque', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(181, 46, 'et', 1, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(182, 46, 'sed', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(183, 46, 'soluta', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(184, 46, 'dolor', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(185, 47, 'alias', 1, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(186, 47, 'sit', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(187, 47, 'culpa', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(188, 47, 'consequatur', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(189, 48, 'voluptas', 1, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(190, 48, 'eveniet', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(191, 48, 'magni', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(192, 48, 'amet', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(193, 49, 'aut', 1, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(194, 49, 'ratione', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(195, 49, 'soluta', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(196, 49, 'nihil', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(197, 50, 'impedit', 1, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(198, 50, 'quaerat', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(199, 50, 'qui', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51'),
(200, 50, 'sunt', 0, '2025-07-07 07:09:51', '2025-07-07 07:09:51');

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `sum` int(11) NOT NULL,
  `path_facture` varchar(255) DEFAULT NULL,
  `order_status` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`id`, `student_id`, `sum`, `path_facture`, `order_status`, `created_at`, `updated_at`) VALUES
(1, 7, 153071, 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE330.tmp', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(2, 8, 307386, 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE331.tmp', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(3, 9, 499124, 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE342.tmp', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(4, 10, 163650, 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE343.tmp', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(5, 11, 423902, 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE344.tmp', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(6, 12, 235579, 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE354.tmp', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(7, 13, 153015, 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE355.tmp', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(8, 14, 398030, 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE356.tmp', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(9, 15, 332588, 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE357.tmp', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(10, 16, 371615, 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE368.tmp', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(11, 17, 410453, 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE369.tmp', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(12, 18, 166918, 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE36A.tmp', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(13, 19, 346287, 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE36B.tmp', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(14, 20, 409120, 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE37B.tmp', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(15, 21, 363396, 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE37C.tmp', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(16, 22, 381494, 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE37D.tmp', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(17, 23, 368649, 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE37E.tmp', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(18, 24, 318132, 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE38F.tmp', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(19, 25, 247944, 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE390.tmp', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(20, 26, 291531, 'C:\\Users\\JASPE\\AppData\\Local\\Temp\\fakE391.tmp', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50');

-- --------------------------------------------------------

--
-- Structure de la table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 24, 'auth_token', '8f17865379050cf55bfcb0183ea8c165b9ec420a251973f439584ec0ea4e8dff', '[\"*\"]', '2025-07-07 10:40:42', NULL, '2025-07-07 09:20:06', '2025-07-07 10:40:42'),
(2, 'App\\Models\\User', 24, 'auth_token', '371201fa9a4d12b7abf4ade0baab8a603d813098096a4134f76922a1bb5e4ed8', '[\"*\"]', '2025-07-07 11:26:10', NULL, '2025-07-07 11:15:52', '2025-07-07 11:26:10'),
(3, 'App\\Models\\User', 24, 'auth_token', '934cc01007e6ff0486d4849e0112e4c5ee75eca2cc0f0af303517360af9879f4', '[\"*\"]', '2025-07-07 11:32:15', NULL, '2025-07-07 11:31:18', '2025-07-07 11:32:15'),
(4, 'App\\Models\\User', 24, 'auth_token', '1791510f12d2369d68842c21f61b48d01bfd4a53049a809b9030fe262188c877', '[\"*\"]', '2025-07-07 12:29:49', NULL, '2025-07-07 12:10:00', '2025-07-07 12:29:49'),
(5, 'App\\Models\\User', 24, 'auth_token', 'fdb6fc0950ea9c0b01d2a62a96c900606e7d3ba4ddab7d8d3550145a77b8e892', '[\"*\"]', '2025-07-07 13:49:16', NULL, '2025-07-07 12:31:45', '2025-07-07 13:49:16'),
(6, 'App\\Models\\User', 1, 'auth_token', '728d7a2a296b3b16aa383a13994f6f5645beb60e01dad4d54f8521b5fd9e51bc', '[\"*\"]', '2025-07-07 14:39:34', NULL, '2025-07-07 13:56:25', '2025-07-07 14:39:34'),
(7, 'App\\Models\\User', 24, 'auth_token', '4bfbd42354d1ba13102db7c95a6edcd4c982a65c7c6ad702e91151f7906fd5a9', '[\"*\"]', '2025-07-08 07:37:26', NULL, '2025-07-07 14:39:41', '2025-07-08 07:37:26'),
(8, 'App\\Models\\User', 24, 'auth_token', '1314fcae740ff3868184ad7be046a3586b7b38835340e8e81262ceb31cb12c9a', '[\"*\"]', NULL, NULL, '2025-07-08 07:37:44', '2025-07-08 07:37:44'),
(9, 'App\\Models\\User', 24, 'auth_token', '69f09fb27deac67fce94dcedd138432d3fd7ce314af17c6ba7be384e92b7d275', '[\"*\"]', NULL, NULL, '2025-07-08 07:39:49', '2025-07-08 07:39:49'),
(10, 'App\\Models\\User', 24, 'auth_token', '959632564f025d63e0660cd25ba0d9956e0040d6c067656f92bc0329d3a55ede', '[\"*\"]', NULL, NULL, '2025-07-08 07:40:57', '2025-07-08 07:40:57'),
(11, 'App\\Models\\User', 24, 'auth_token', '920cf08828fefe2ed7c2535bdd2246d78e70782325a103357ca1a0bde2d3c993', '[\"*\"]', NULL, NULL, '2025-07-08 08:26:35', '2025-07-08 08:26:35'),
(12, 'App\\Models\\User', 24, 'auth_token', '93c2101b3b15786a4420cdba6832acf4ef94e412215f1a6e25a1943230fc61f3', '[\"*\"]', NULL, NULL, '2025-07-08 08:27:11', '2025-07-08 08:27:11'),
(13, 'App\\Models\\User', 22, 'auth_token', 'c7f8cfbef465ce007ed00a5d48281760c8c0a1ef315689f65a282447f8ce13ed', '[\"*\"]', NULL, NULL, '2025-07-08 09:27:41', '2025-07-08 09:27:41'),
(14, 'App\\Models\\User', 1, 'auth_token', 'd8138f7706a97a35024596d65933592316ec51dfafbef3b56dd6a84b468805a1', '[\"*\"]', NULL, NULL, '2025-07-09 07:12:01', '2025-07-09 07:12:01'),
(15, 'App\\Models\\User', 24, 'auth_token', 'dc1677d1900716eece22fbd3721df430224495ea6c0e17eba8c6959f76ca294b', '[\"*\"]', NULL, NULL, '2025-07-09 09:26:28', '2025-07-09 09:26:28'),
(16, 'App\\Models\\User', 2, 'auth_token', '0d5453f13ad095e592caabf230ea3421a7f76d01d52696b3733ff598e6e56fdf', '[\"*\"]', NULL, NULL, '2025-07-10 13:18:50', '2025-07-10 13:18:50'),
(17, 'App\\Models\\User', 4, 'auth_token', 'a02b9bca1922c181d4e26efa6370ec8b67349f93358202d5564df13b74dfd886', '[\"*\"]', NULL, NULL, '2025-07-10 14:33:19', '2025-07-10 14:33:19'),
(18, 'App\\Models\\User', 1, 'auth_token', 'f63701deef7110ddc5720c9d439d43079e2111b4ca42116b7d522badd27172ac', '[\"*\"]', NULL, NULL, '2025-07-11 21:54:06', '2025-07-11 21:54:06'),
(19, 'App\\Models\\User', 24, 'auth_token', 'a1fe20974ae00e51539254e11e9d05dbd63b0820c9143faea56d6d99e6d75ed0', '[\"*\"]', NULL, NULL, '2025-07-12 10:43:02', '2025-07-12 10:43:02'),
(20, 'App\\Models\\User', 5, 'auth_token', 'ab6e302ef3653d8b8b93f7c23aa3c3a10d020652633bc0272d163607521ef1fd', '[\"*\"]', NULL, NULL, '2025-07-12 13:24:01', '2025-07-12 13:24:01'),
(21, 'App\\Models\\User', 22, 'auth_token', '9ad9d4779dd6ad5300e9ce4cbff4401f3a6548232cd2510553abd06af9ce5789', '[\"*\"]', NULL, NULL, '2025-07-12 13:27:39', '2025-07-12 13:27:39'),
(22, 'App\\Models\\User', 24, 'auth_token', '2dbe0c3b38b9b1f047fee500ab5adb485224a00b8c9fbf5663a9741a0f2304b8', '[\"*\"]', NULL, NULL, '2025-07-12 13:30:01', '2025-07-12 13:30:01'),
(23, 'App\\Models\\User', 5, 'auth_token', 'b0a9e1de0cc4639248f2973640b14e467fa5ca7552990c332a736530c07b9d8d', '[\"*\"]', NULL, NULL, '2025-07-14 14:28:17', '2025-07-14 14:28:17'),
(24, 'App\\Models\\User', 1, 'auth_token', 'c9a4f8cc5e5f84b592fcc4552d8441f1f8b8ed5ff0d9560407371d5db4ef2f93', '[\"*\"]', NULL, NULL, '2025-07-15 02:09:37', '2025-07-15 02:09:37'),
(25, 'App\\Models\\User', 1, 'auth_token', 'ee76e52f5b716ff73eb9b511fecd5549b2f24b861f05d113668c632c69ba16f6', '[\"*\"]', NULL, NULL, '2025-07-15 02:09:40', '2025-07-15 02:09:40'),
(26, 'App\\Models\\User', 8, 'auth_token', 'ba4509e044f7b7a7bdb03e8c6d2fda2fa2c1c3c1ca50edd11ae816fa86759918', '[\"*\"]', NULL, NULL, '2025-07-15 02:11:35', '2025-07-15 02:11:35'),
(27, 'App\\Models\\User', 5, 'auth_token', '7f8e711ebf6d8341d34e694913bec757d0e8ef65295b65e1e541c8d2557d29e4', '[\"*\"]', NULL, NULL, '2025-07-15 08:12:06', '2025-07-15 08:12:06'),
(28, 'App\\Models\\User', 22, 'auth_token', '6f484ca46aaaf9b1c97e5808470abdd97d9f1de50c6acf26578828cfe9db167e', '[\"*\"]', NULL, NULL, '2025-07-15 08:26:40', '2025-07-15 08:26:40'),
(29, 'App\\Models\\User', 22, 'auth_token', '1841e3b28151a3391214cc0e6fdc4f7db770c2ce2489de4ca3fd0431fc923e56', '[\"*\"]', NULL, NULL, '2025-07-15 11:15:21', '2025-07-15 11:15:21'),
(30, 'App\\Models\\User', 22, 'auth_token', 'c525c86a4f03653c939e107512a3cbad0c9b6a411e535bae136ab15b66c19ff1', '[\"*\"]', NULL, NULL, '2025-07-15 11:22:23', '2025-07-15 11:22:23'),
(31, 'App\\Models\\User', 22, 'auth_token', '79ad33e8b06c39d282504e901b400ab91cfb0115a4abe740a6b8566c47de655f', '[\"*\"]', NULL, NULL, '2025-07-15 11:23:18', '2025-07-15 11:23:18'),
(32, 'App\\Models\\User', 22, 'auth_token', 'ebaed30e8e041fe78ee5869d132c483ddedc64c5044859b68d003864e0ca417c', '[\"*\"]', NULL, NULL, '2025-07-15 11:39:46', '2025-07-15 11:39:46'),
(33, 'App\\Models\\User', 22, 'auth_token', '1155c8c2eedea4b2c11427320d630e7fc9bfa928b809ff383437fdced8890abe', '[\"*\"]', NULL, NULL, '2025-07-15 11:45:21', '2025-07-15 11:45:21'),
(34, 'App\\Models\\User', 22, 'auth_token', '54ad81ba92667088fac0a19bd1ae7d7f1456904d712edfbc75b5faa10f1f4755', '[\"*\"]', NULL, NULL, '2025-07-15 11:45:30', '2025-07-15 11:45:30'),
(35, 'App\\Models\\User', 22, 'auth_token', '7741009043507e70001b39c73afb069f0a615144745b4e0f9873c6c7bd5957c3', '[\"*\"]', NULL, NULL, '2025-07-15 11:47:25', '2025-07-15 11:47:25'),
(36, 'App\\Models\\User', 22, 'auth_token', '0f389036828b1c3b4209d88a8e11ff10e1d0a9fb6ee497da6f31b34a97c3a93c', '[\"*\"]', NULL, NULL, '2025-07-15 11:52:13', '2025-07-15 11:52:13'),
(37, 'App\\Models\\User', 22, 'auth_token', 'd691bb49b0f76c9bcc11c95b1c2241fc63670496e1cb808e2b29606b6911aee6', '[\"*\"]', NULL, NULL, '2025-07-15 11:57:29', '2025-07-15 11:57:29'),
(38, 'App\\Models\\User', 22, 'auth_token', '278b607dcaaf9980831011f7726b351e08bd66b8cbac2b0f2167fd11702c34b5', '[\"*\"]', NULL, NULL, '2025-07-15 12:03:51', '2025-07-15 12:03:51'),
(39, 'App\\Models\\User', 22, 'auth_token', 'ab47872f5513398ed74cfc5c80abf58acbdcb6b75570634a1162d4eebbb4febc', '[\"*\"]', NULL, NULL, '2025-07-15 12:04:24', '2025-07-15 12:04:24'),
(40, 'App\\Models\\User', 1, 'auth_token', '5dae7f9725fc157448730fdbc362ec9d8f8a1d4427c5468b31127ac7676dddef', '[\"*\"]', NULL, NULL, '2025-07-15 13:07:30', '2025-07-15 13:07:30'),
(41, 'App\\Models\\User', 24, 'auth_token', '6b5ac0162639bf15ac3862696d1c1edcd68b24f8f4383d9aa61cc46f26bd053e', '[\"*\"]', NULL, NULL, '2025-07-15 16:17:40', '2025-07-15 16:17:40'),
(42, 'App\\Models\\User', 5, 'auth_token', 'f6472228ee677d703deb25ee61fba20d6db8aca945ed5b0d90aeb6815c71bd4d', '[\"*\"]', NULL, NULL, '2025-07-15 16:22:44', '2025-07-15 16:22:44'),
(43, 'App\\Models\\User', 5, 'auth_token', '6aaedb85462509f07309a68ede62d907b4edf31b776e61c532e93570ca895fa2', '[\"*\"]', NULL, NULL, '2025-07-16 13:50:59', '2025-07-16 13:50:59');

-- --------------------------------------------------------

--
-- Structure de la table `questions`
--

CREATE TABLE `questions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `quiz_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `point` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `questions`
--

INSERT INTO `questions` (`id`, `quiz_id`, `title`, `point`, `created_at`, `updated_at`) VALUES
(1, 1, 'Officiis quia harum alias doloremque quisquam beatae fugit.', 4, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(2, 1, 'Assumenda voluptatem repudiandae omnis necessitatibus laudantium voluptatem.', 3, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(3, 1, 'Quaerat et ex saepe consequatur repellat sit architecto.', 10, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(4, 1, 'Omnis et veritatis placeat quia quo officiis quos.', 17, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(5, 1, 'Dolore molestiae pariatur autem quia velit dolorum autem quisquam.', 19, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(6, 2, 'Et qui quis possimus quasi.', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(7, 2, 'Expedita iure sed omnis dolore ea quia.', 14, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(8, 2, 'Ipsum ut nostrum quia qui eligendi.', 13, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(9, 2, 'Non est nostrum quia dolorem quaerat odit laborum.', 13, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(10, 2, 'Quos labore natus eum adipisci.', 16, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(11, 3, 'Odit officia in error molestiae ut ratione.', 6, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(12, 3, 'Blanditiis autem aut distinctio iste delectus molestias.', 9, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(13, 3, 'Perspiciatis facilis harum incidunt doloremque non explicabo reiciendis minus.', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(14, 3, 'A similique atque recusandae eaque expedita velit.', 15, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(15, 3, 'Sed et quibusdam earum nisi similique.', 8, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(16, 4, 'Esse amet eaque non aut nemo non.', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(17, 4, 'In ut consequatur cumque omnis explicabo est fuga.', 14, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(18, 4, 'Nostrum eaque quam autem iusto ex omnis.', 9, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(19, 4, 'Qui sed enim ab quia itaque magnam sit.', 3, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(20, 4, 'Fugit est eum et alias nulla ut.', 8, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(21, 5, 'Sunt aut reiciendis omnis sequi velit aut.', 17, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(22, 5, 'Nisi sunt fugiat sed nihil quae.', 19, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(23, 5, 'Ea tempore hic autem repudiandae est eos fugit distinctio.', 5, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(24, 5, 'Aut perferendis dicta reiciendis quae laudantium non repudiandae.', 14, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(25, 5, 'Quae earum placeat beatae corrupti odit ex.', 12, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(26, 6, 'Voluptates quaerat eum aut cumque rerum eum.', 18, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(27, 6, 'Sit quia repudiandae velit dicta.', 2, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(28, 6, 'Quia cupiditate ipsum in molestias et culpa doloribus.', 13, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(29, 6, 'Exercitationem odio ea officiis libero laudantium cupiditate.', 10, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(30, 6, 'Est nihil dignissimos et non sit consequatur.', 0, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(31, 7, 'Ipsa qui sint ducimus at alias.', 6, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(32, 7, 'Et libero enim reprehenderit totam ratione molestias quia.', 19, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(33, 7, 'Alias pariatur consequatur mollitia in dolores odio.', 16, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(34, 7, 'Adipisci dignissimos amet ullam sapiente sunt.', 19, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(35, 7, 'Voluptatem numquam velit aliquid eius ut.', 2, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(36, 8, 'Et in voluptatibus veritatis eius.', 15, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(37, 8, 'Voluptate et et nostrum enim soluta.', 13, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(38, 8, 'Rerum eligendi et dolorem sint qui et sed numquam.', 17, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(39, 8, 'Iure error animi eaque.', 10, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(40, 8, 'Et est dolore pariatur ut voluptatum quis.', 2, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(41, 9, 'Non enim aperiam ea eius molestiae aspernatur.', 1, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(42, 9, 'Quaerat atque adipisci soluta cum eum.', 4, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(43, 9, 'Asperiores autem deleniti repellendus dolor et.', 4, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(44, 9, 'Debitis ratione quaerat culpa saepe incidunt harum assumenda.', 14, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(45, 9, 'Aut quia natus id quis non vel.', 6, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(46, 10, 'Rerum facere qui magni id.', 10, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(47, 10, 'Et id ipsum porro et natus qui nobis sint.', 8, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(48, 10, 'Dolor aut accusamus cumque.', 3, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(49, 10, 'Quis quos vitae omnis et incidunt quae blanditiis.', 9, '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(50, 10, 'Dolor facere et et quod.', 15, '2025-07-07 07:09:50', '2025-07-07 07:09:50');

-- --------------------------------------------------------

--
-- Structure de la table `quizzes`
--

CREATE TABLE `quizzes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `formation_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `quizzes`
--

INSERT INTO `quizzes` (`id`, `formation_id`, `title`, `created_at`, `updated_at`) VALUES
(1, 1, 'Quiz 1 for CCNA Certification Training', '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(2, 1, 'Quiz 2 for CCNA Certification Training', '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(3, 2, 'Quiz 1 for 5G Network Fundamentals', '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(4, 2, 'Quiz 2 for 5G Network Fundamentals', '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(5, 3, 'Quiz 1 for Network Security Essentials', '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(6, 3, 'Quiz 2 for Network Security Essentials', '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(7, 4, 'Quiz 1 for Fiber Optic Communications', '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(8, 4, 'Quiz 2 for Fiber Optic Communications', '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(9, 5, 'Quiz 1 for Wireless Networking', '2025-07-07 07:09:50', '2025-07-07 07:09:50'),
(10, 5, 'Quiz 2 for Wireless Networking', '2025-07-07 07:09:50', '2025-07-07 07:09:50');

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'web', '2025-07-07 07:09:39', '2025-07-07 07:09:39'),
(2, 'teacher', 'web', '2025-07-07 07:09:39', '2025-07-07 07:09:39'),
(3, 'student', 'web', '2025-07-07 07:09:39', '2025-07-07 07:09:39');

-- --------------------------------------------------------

--
-- Structure de la table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
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
-- Déchargement des données de la table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('0Djmp3J5h4Mi9ybpB2yKndFntuWXifQQu4DHniku', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiUWp1eTcySkVVNWliY3cyekVVQ0RjVVJFQTVPV1lhTmJ0UFphYXVMOSI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czo0MzoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2FwaS9mb3JtYXRpb25zLzQvcXVpeiI7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjQzOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2Zvcm1hdGlvbnMvNC9xdWl6Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751894108),
('0EoTEQ1MWFjkq7Wd36ipO013NvazE9Q9pPJHmygH', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiN25wNTY2V0hsSU1VS0dWdUFIY3k3OGM5bUQya0VPQmdveENpZVBRZSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvdXNlcnMvNCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1751898665),
('2jSbSgRMiHG6PLLsyiZO74jsJrZdtv7cnzvPtfOi', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYWtCV0dXcVh6bWJFWlJrOG9zMzVrY0hYcmlLUjJaeVZNQTIwNXo5aCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvdXNlcnMvNCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1751898665),
('461kutiGLC2czhEPp4ukwdQnCKy2tX8gPwA1H5Y3', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNHZJb3hEb2xmMTNCQXZ5RXNRdUdQVDd5aDA2dFFjS3YydHN4SlNsVSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvdXNlcnMvNSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1751898673),
('4F7QVcMZOfnDL8q0jlhCsXLUu1vlYT5tO5RxAW1f', 24, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicUVNZmhUZEpwUXFnb25lVFM2OVBWOU45ckJvSkh1T0x2MWx6dEJaaiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucy80L3F1aXoiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1751895135),
('5Ij7BItnEWsWEVaFZROxERxv1E9mU7FJfuLV0CCM', 24, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidmJNVFB1YWlDbHBPRW4xWERYcnRVSG1VOVlOa1MyYUtlQ0RFM3pmMCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucy80L3F1aXoiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1751899375),
('79ZTB8jbqvbdKlsfjOoJ9JZ1WIDEqK1ztijvyzoC', 24, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoic1c2ajdSc1loNXh0TVRDM1NqWTk0Tlpwb01DT3d3SWxmczcyOGFYeCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucy80L3F1aXoiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1751894180),
('7cfHghAMARWnnKtC7UH6RampOrNOxbnDIfH5egbC', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWENoT1pVNWtFM2ptcUxkR3NsZm5VTHZOcDZWQUxRUkM3bjhqWjdhZSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvZm9ybWF0aW9ucy80Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751894056),
('8GEENqElYZFpmJJexVEdvQPRqKHcHuYTScg0JgFP', 24, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQ2tCVzNHU0czdUVpajI3TkZMcHU1cmZGaG1vZmk2eWhRaDYzME1RNCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucy80L3F1aXoiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1751899669),
('9foWzCXB148CojZPo9UH7LrYEMXAl8HpuHUsSzJx', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiSkw4YTl2eDlkeFNERFg0azhPeGhlNmNUMVpoT3JUN1FOWjJOYXFsNCI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czo0MzoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2FwaS9mb3JtYXRpb25zLzQvcXVpeiI7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjQzOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2Zvcm1hdGlvbnMvNC9xdWl6Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751893988),
('9ODTX93t3EdNOG1XRAaiwOLGWgYHLh6kUfYIiDVw', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZXdGaWhJVXZhUjgwYlBCbGh0YlpKN24yZzNoM1Z3ODdEbGxTak15OCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvZm9ybWF0aW9ucy80Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751897316),
('aCrPGvYzacO4zP7wep5EaIcFBQWrua8bN1dbv7V9', 24, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNlBJd052S1JIMWtlajEyYThYV3VsNzlpYnRFN0J6UHZVdzFubWtXWCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucy80L3F1aXoiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1751898727),
('aHCKfHNyjnOQj6oIMpS8Cof9LmjthD0TumDKkl1Y', 24, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYlhkdG5QeHJYdkdleWFXRHUyQW1iZTRNSEE2YnNMQ3F2NzdxUmV2USI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucy80L3F1aXoiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1751899455),
('bhO6Db2lEWC5zafTE7RNpuYvOT2QRhCWepd0ooWF', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQ201TEMzUnZmd2x1VUMxZzhtUmg0bnhQc3NzeVZnam95d1RESVlsQiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvZm9ybWF0aW9ucy80Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751894164),
('BJI5JjOcvDmd4Hz4Hr4ewtnBY81PyUMq81aKqKzj', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoieVZhcG13OWxaY0VRY1paTGI4NkRJVE5WdzFEUjFicTBOb1BQbG52QSI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czo0MzoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2FwaS9mb3JtYXRpb25zLzQvcXVpeiI7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjQzOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2Zvcm1hdGlvbnMvNC9xdWl6Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751894108),
('c5IrkQGXjrzukN6K4LhcX3q19G8Re74r9ytDNmAI', 24, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicTBqdEFNUzhNQzc0VlBJSnBzdWFrRzJZQk5taUo3d2hxQXl3bHZ4eSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucy80L3F1aXoiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1751899796),
('cA0JqybIYbwHRSwzhQNL7ra1muASEJR9IB8eV4L6', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiOXRsMmNNanBZWGRJQ1lYNFR1M1ZXdW5SZ2lFRElxQ2dKNGNTSmk1biI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czo0MzoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2FwaS9mb3JtYXRpb25zLzQvcXVpeiI7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjQzOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2Zvcm1hdGlvbnMvNC9xdWl6Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751897333),
('diHEoe4F4IkAukdUtLPd07SvK3oclOvwhQluyVIV', 24, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNjdFNXVCTWtBOFg5WHlRcFFhSDJNVUNTNUx0dHBpTHNnYmxvSGx0UCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucy80L3F1aXoiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1751899046),
('DqjOhA5LA1gtebVDdYr1x79EYGTjjJQASheJzXmX', 24, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiY1cwc2hYcW1YZ2pRc3FGMm9kVm1yMGZnTnV1WW5FOU5oRWxBelNtNyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucy80L3F1aXoiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1751894555),
('eFQAbdgVHLhfF77GCgRWbjVHZYbLpcoornEAxH41', 24, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQzNLekUyUXJ2UHp2Mlo2UVdpUk9ueVlLOWlPbHo0NVVqbmd1NlF1RiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucy80L3F1aXoiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1751894555),
('fKIRl3BjD7t76hVUUq9pGIkjhz08igOyKTB193NJ', 24, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaVZlNDlxWElwSFY2bVdVQjdnUGxVQ1BCemtFMFNzWXByQVR0bGJGTiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucy80L3F1aXoiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1751894180),
('fKOlmrCfgBkR00HC16EAKotOzNtE9dB1yPtpr04j', 24, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoialpLa3FBckxBQkdob0w5Yk9SNVRYNk53V2hYTWxWNWpnOW1WZVpXSCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucy80L3F1aXoiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1751898590),
('gqzNiSJzJ1TpzZkkEH87qhcaXOzzyql7O6qCqvUM', 24, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiS3ZHM2pWR21OWVc4d0ZidEJWaHlwdElwUDN0WW4zMGN0SGx3S00wbyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MjQ7czoxNzoicGFzc3dvcmRfaGFzaF93ZWIiO3M6NjA6IiQyeSQxMiRXcE56RnBpUXo2d3JoN3c3dWdCbC9PalZkMWN4Qk9iT0kyRjVlZTIzN1kzOVNvSU9LMzAxNiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9zYW5jdHVtL2NzcmYtY29va2llIjt9fQ==', 1751901038),
('gwbC5sPq43wLUkBjaoMoxyogNGu3sdJE3Tho4A5y', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoibnRmWUN4QnN0VmxaNFRWMXk1MVdrYW9YUlZTZElLeTFJdzR0YnFHdSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751899683),
('h7ElbGulTqdwnOKMvoAuUQgr44q4nSot0wuRBoi1', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoidklYRXA0WEhVWVdteXRFbjRrZnYyZk1iS2V6WVdGVmdHbzBJVXpwVyI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czo0MzoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2FwaS9mb3JtYXRpb25zLzQvcXVpeiI7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjQzOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2Zvcm1hdGlvbnMvNC9xdWl6Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751893886),
('hkhm0eN5e1fl8QEHgyq86dweisSOHffFRLppCYC5', 24, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNUhKeHRRckhyRWkzemRCQlNlbW40RXFuanE2VXZjWmNTREdKODlRVyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucy80L3F1aXoiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1751899374),
('HPDe2HT3MuMIp50Kr4kBbYlFSfrfDB6otNTpSaOt', 24, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTUR3ZFpMZkhsbDVIMEgxRFNRbFJoWjZBZ3pTV3ZXTTM4cklBZGtQMiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucy80L3F1aXoiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1751899796),
('i0bQXjfGEXBJ3xnDyMjRTZjs4AbhzkBspcW05wwN', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiZm1MR0JsNFRLcVFPT2I4MmMyODZPWmVvd3VuNmlBd0FySGgwbW9zRSI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czo0MzoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2FwaS9mb3JtYXRpb25zLzQvcXVpeiI7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjQzOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2Zvcm1hdGlvbnMvNC9xdWl6Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751895031),
('JE2TDxtDbqi8luK0NLkMAlOteJmg0l5VJkbyYUCE', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiTUZFQmQweGdUQzNUeFZQSXc5YlBsSWQ3Z3BzMVRqWjU1eHZxdXk2biI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czo0MzoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2FwaS9mb3JtYXRpb25zLzQvcXVpeiI7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjQzOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2Zvcm1hdGlvbnMvNC9xdWl6Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751894124),
('JOHINLziG1uy2UG2LAQ8IHTgct0R5yUSm4DU9UWv', 24, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicnVJVEwySmlVdVoyeVo4YTIwM3A4TTR3cHdQQUQ3V0hKZDJpUGdqMCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucy80L3F1aXoiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1751894770),
('KdlQgs51s5eyoUZVYeZGYvwut8lFrWNsSu6VHGxp', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiV0Q0MERtNFhwWkFwUzZVSTFaVkdWa0JyeWVZYlU0QWIydnp3UGZOcSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvZm9ybWF0aW9ucy80Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751897436),
('KdP7eoQGKOoyQw0zWIH6ymYZZ4tM16Gp82Cx1M9o', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWVdLSTNIM1A1WHg2SEhhYWRPeUQxZlMyMENuZXpIRHNJWmVZTkxKeCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvZm9ybWF0aW9ucy80Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751895014),
('l01Y8s6thAweQsC0SbQCoHxlgK2TGqSe7ENd1RAe', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiNWw1Q2N4SmlOWFFQUkVkMDFjY08wQUpjaUhQZEpiOWNXZVhVTTdSTCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751899387),
('lbaUovJLmeCSt9XpzqBH69dbD0jLRG3jVs0YposD', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiUnhiM3l0N3RsNDRTVHpQSXVRSzc4RXJBSFp5SGpKVVNKS2VDVzZrZSI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czo0MzoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2FwaS9mb3JtYXRpb25zLzQvcXVpeiI7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjQzOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2Zvcm1hdGlvbnMvNC9xdWl6Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751894125),
('ltRup7Wglu6fXHrkrDHwe0xWMGdcHTxHX73HBspo', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWWlVVUlqV05taDduOHJwWkx2V3JtQVZNN2tJWkFQUFJWU2IxUndFdyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvZm9ybWF0aW9ucy80Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751897316),
('M8JNq1TJ8Jn5FnhN83khdSQA00zxPYuIcZo0vCSv', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiemVGdmZjT292d3JnQ0x4MmxCaHhSRmNJQjFnVGpsSGlTeHNMSUJMZyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvdXNlcnMvNCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1751898665),
('N5haOcxgE31dJvqBkp5a96xfbaJexbD2sL9BL4VA', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicGhNcVlLTFRjUUhiaW1tTmpEQjF0SGtTUHhoTlhTdHVjamU3N3hpQyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvZm9ybWF0aW9ucy80Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751895119),
('NFTLLd1YKxiuCp03nqBvOWMyzhsNIxOhEFlPUM0Z', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiUjBuRTRjcEM3T0w1alZCcmJja2h2VEt4N05qeGt4R25GM1g3ZnR0NiI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czo0MzoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2FwaS9mb3JtYXRpb25zLzQvcXVpeiI7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjQzOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2Zvcm1hdGlvbnMvNC9xdWl6Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751894082),
('OV0XyqpPlnQTX8dUgNobe2KYvbyC69XEVIn5kibH', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWHhnRGNqeHMyYlZqRFFqUkx2dTVQYkJtWmNWYUFBckNob0hjaVB5MyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvZm9ybWF0aW9ucy80Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751894164),
('p2Y9nvakE82j8yBHDyaeuSGo5BVRAxcoyL3xWIya', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVHVGUVE2cGE1RURQTVY0U1U0WEV4VnkzVEhRU1BmbnZncDFYTG9JYSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvdXNlcnMvNSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1751898673),
('P4Wwt0aekxlazGYZEfpMs1iziouUiaPP8hzG0vPU', 24, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiT1E5Q0VzMnFNajVzdVBXNlNzQWM2TnBBdWNlZ3VCQkU2UkNqc3Z2aiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucy80L3F1aXoiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1751894769),
('qECTiD7E3xZDVzr41A5iDzWyh9PPajqJB5kZTQqE', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWWZ1WUNURkJyWDdnVWpra3lxVXNYRnQwOG5vNHlGa3Z3MnAzdk9GNSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9zYW5jdHVtL2NzcmYtY29va2llIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751899387),
('qqmFusftri1nUq7vbf18VuWTjBzVLZzbdiOs205D', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoidE9NOW02czc0Y1Z0TkE2bk1YY2Q5SXpnc3UwQ0g4eUNtMFQxZm85NyI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czo0MzoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2FwaS9mb3JtYXRpb25zLzQvcXVpeiI7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjQzOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2Zvcm1hdGlvbnMvNC9xdWl6Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751895032),
('qREaTeAYgU8g5hemSLI34cOf73VQsvLqaLFcP1w6', 24, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoick1oSW9qZ3hVVUFLU3lWdHZUNENnVm9mZzJxdE1NeHp4SUpqQkhEVCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MjQ7czoxNzoicGFzc3dvcmRfaGFzaF93ZWIiO3M6NjA6IiQyeSQxMiRXcE56RnBpUXo2d3JoN3c3dWdCbC9PalZkMWN4Qk9iT0kyRjVlZTIzN1kzOVNvSU9LMzAxNiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9zYW5jdHVtL2NzcmYtY29va2llIjt9fQ==', 1751899914),
('R5QSnxafDohqh9ezVInb8CmGt42CyqMSiQLz1VCt', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMlczYmR4YmNlTG9VVFF3V2YwMlVGVFZlTzJKdDZ5WnpaR3UzR2c0VCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvZm9ybWF0aW9ucy80Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751895014),
('RcASNWy3DCTIBz1rpmMZVXh9oEyCCYJZYnKTA3bC', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVmFkcG03bGpadDloRndSeXp1cmFqelozM1drdzNsOEZjbEdjYzJVdyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvZm9ybWF0aW9ucy80Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751894056),
('RPcK6RinRDJSeWB0OIcC14ckoCd8nKfwr9N0sw19', 24, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVHJWWUZra2Z5WExwTEJMRmwzOWx1cHk0MWFqc3RYRk5waFdVUFhSViI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucy80L3F1aXoiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1751897913),
('rTJSvLejAYCJJZtOHxeJxwVBuaheiOmeZEbBrTqX', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSmc0NDROQUp0bFE1bU82MVJIam9DRTF0YmF6ZHRlWHNmQThhSG51ciI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvZm9ybWF0aW9ucy80Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751898713),
('Rvc95L5Cs7Hd7rd5HWl25vn8IJa4HiXTsWIw3kr6', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoibWVsUDI4bTd4M2pReGtBMHFUQ1ZDcDRvUVZaZVpGc0p1cG4zUjdkViI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czo0MzoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2FwaS9mb3JtYXRpb25zLzQvcXVpeiI7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjQzOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2Zvcm1hdGlvbnMvNC9xdWl6Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751893886),
('s4ChHaYt6J6vVpm3LfowLoj9j6kzy9CO2lsivncW', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQTJJZG42cGdma1VqSEZlVExxb3FxZnVvcWJob0pxQXJFdmtzVm9uWiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvZm9ybWF0aW9ucy80Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751893872),
('skGnUaoQbJHzTxdbQwhS0phPJRaR6uCulGxVsw2R', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiaDFmR0Y1azZqZ2dNOFF3cmFPTEVZanRyNlh2QnNjNHJqSE9DUDdGTSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751899810),
('sPVtn4UPf4dR0ggEJFYx8W7VNo7mGWagHapovDqa', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidlZxcDkydXFkNlRPQTBFNXNPUkNkUzVHZlA5NXV4cDN2ZHU0cDFOdSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvZm9ybWF0aW9ucy80Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751897436),
('tiq2mLJUj1jlTDMJU7OnxAJ5CnxlN3l7Jnesnm16', 24, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMkZMV2JHNldyN21TUUJEdmRmaU96QUFmM0Eyd0o1VlVHMXVjNURMNyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucy80L3F1aXoiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1751897453),
('UmWYK94YjURKP5kFcCLwZxOXMOIHkpbXILTbo4hG', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiN2E4UjFSckI0dWExRmZtcmZiVGpmRHdXdHdaSmdtdWdaZkNIMVJUYyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvZm9ybWF0aW9ucy80Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751898712),
('vALU6X8zkj1ZLIyt479dJQ7e00DBLDxPJiiXpi7A', 24, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTGV4Vm9IM0V0ZWg3d0I0b291T3NpVDh6WFBSVU5rZWV2SE5adnBzZyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucy80L3F1aXoiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1751897453),
('VhCTZWsUjyar1p5N5sDA7eNiBjLkJLv4InigZpJU', 24, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYmVJemtacG9Qd2ZtU0JLUENTY3ZOa2VjSFI1akJyT0lqaTJkRWJjZiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucy80L3F1aXoiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1751897913),
('WjT24aN83JmM9MK7MjsE0co7s1I07UGXSN6ZEThS', 24, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRDFPWTVTaWVLWjc5VER2RFg1YnJqMTZyc2JiMXVKNkU2Mk9NSlB5aiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucy80L3F1aXoiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1751895135),
('wqryxrrmwXqOe5jdMiZp9LpA8XJISyWCoCsD0Y1k', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicTB0NFVhUXNpOVJrRktGNmxObno5NnVmaUZYcGpkcWg4U205TUpIRSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvZm9ybWF0aW9ucy80Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751895120),
('wz4J5GQ0zOt7E6MFp1IX633Mg7DneWEc7W4DKVhM', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVWNDanVmb2hPYUh5SnZOZmRWM0NrR1RTVHdDb0Iwd0xOVU15YndtdCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvZm9ybWF0aW9ucy80Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751893872),
('X9x9hkOKwMxtdJe6JqmMThwlnBIr3lObxGPSIGvN', 24, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibkdIYm1EblFnR1BuQUZ4bUtaNFltNEZkQ1c3YWZCREhPR0thdDFkNSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucy80L3F1aXoiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1751899455),
('Xwcs9yuYty9h588ScZyqtF9KDBHmdcrYOT52uxE0', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoidFVTNkdFazlKa2FXd3Y3V2JaOTVMdERlM1lkeExYRWxyZWdPMUZ0dSI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czo0MzoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2FwaS9mb3JtYXRpb25zLzQvcXVpeiI7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjQzOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2Zvcm1hdGlvbnMvNC9xdWl6Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751893988),
('y5Uei8LdoAdnEanVnhtkorksKouCJinjf7elgKGG', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiSXVXZE80UFA4eXpralFvZVBUU2szcVNLUE1hOE9hQjY2UlhjWTBJUyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751899466),
('YFvzCXHdnpgivckd1iYtbGQ0KKw7zvgfmeMytHWy', 24, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWTFrVVB5Wk9NbnlKSDc4QktDVlRhTWx1N3lIVlpnTHJUTEFtMFlzTiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucy80L3F1aXoiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1751898589),
('YN91e43Cs9V77euLrxYDh55V8LnwmH9JbbRmrh5c', 24, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTkZMWEJxbFVFWngyakIyUU1nODYyUFlLTkJLTW1CMko0NkRvQVdYWSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucy80L3F1aXoiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1751898727),
('YUTdqWmpFJfov54nYAtINwCNgGmDtdur6npYEi4s', 24, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiazN1bk5kWUhjNENhaTJDQkxRcHpEdHRnR3hnb0NHNjZmT3hqV1JqUyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucy80L3F1aXoiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1751899669),
('YykziWUmCJvvswliULDHmBg4Dj9VyBun0UXCyJ8T', 24, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMzFkb2lYVkFCaVdjTUt4ZXhKcVc0M3lvTEJpMDE0eWR6cE9manBDSiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucy80L3F1aXoiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1751899046),
('Z8J7kbPdZ6fJicye0jXLFBnypfoFUTxKWgVJPBYm', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiQUlyV0Zidlgybk1BWm1PSTV2N3BZOGF6dnQxUEVSUUU2S1BUUkdwMyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751898664),
('ziSj2aomFuXHFH3lSpPWfzCUzWByXPnv7oye8qqV', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiWUJ6Y0RPMDk3b1h0YVZhdHBhODRhaWRCMm9NU0ZqMVJyV3VWVVFBMSI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czo0MzoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2FwaS9mb3JtYXRpb25zLzQvcXVpeiI7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjQzOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2Zvcm1hdGlvbnMvNC9xdWl6Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751894082),
('zztnu6ZQ0ctJmJ0vl7DHYFnN10CGJ4MCBhOIkzu9', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiQnkwNzV2aUlWWW9KM3lGSTZRSGFrenNRSEo4QkRDZktIVW9ocmpGWiI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czo0MzoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2FwaS9mb3JtYXRpb25zLzQvcXVpeiI7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjQzOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2Zvcm1hdGlvbnMvNC9xdWl6Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751897333);

-- --------------------------------------------------------

--
-- Structure de la table `students`
--

CREATE TABLE `students` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `teachers`
--

CREATE TABLE `teachers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `teacher_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `birth_date` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `userable_id` bigint(20) UNSIGNED DEFAULT NULL,
  `userable_type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `gender`, `picture`, `birth_date`, `address`, `phone`, `email`, `email_verified_at`, `password`, `role`, `remember_token`, `created_at`, `updated_at`, `userable_id`, `userable_type`) VALUES
(1, 'Chukwuemeka', 'Okonkwo', 'male', 'https://via.placeholder.com/640x480.png/0077dd?text=tempore', '1987-08-04', '88 Ademola Street 06992 EfeVille', '0706 352 3784', 'admin@example.com', NULL, '$2y$12$vs2Pb4mvJ43WwrlW93Q/G.uZ4ToUoaFnIxS9/i0mJEpcnkbdUswZS', 'admin', '6FeZsiaIsCohGs3VXALBAHWqZhw3nbqH0v9uQX8tN1DfacJZlreO417DTcM3', '2025-07-07 07:09:39', '2025-07-07 07:09:39', NULL, NULL),
(2, 'Yusuf', 'Habeeb', 'female', 'https://via.placeholder.com/640x480.png/001111?text=est', '1986-09-23', '65 Nwachukwu Street 37 421 SumayyahVille', '08055650646', 'shade.peter@example.org', NULL, '$2y$12$QlB.n8st3otBV36MOR2OMuvY10nnGMvOYQz4Elz5KnnNA/XiN48wy', 'teacher', '1TZFPAf8qhS1DXUEPM9LjPLAFs3HD5ioeBLspmG4Dek9h34UfTFMhf4sy1l3', '2025-07-07 07:09:40', '2025-07-07 07:09:40', NULL, NULL),
(3, 'Fatima', 'Odunayo', 'female', 'https://via.placeholder.com/640x480.png/001100?text=consectetur', '1975-07-30', '52 Mogbadunade Street 56523 AminuVille', '+2349099500507', 'ymaryam@example.net', NULL, '$2y$12$XxYKIwGmCuHJZQCjxzJ6wey/XwO73o9pYma8vHiqLwMVDalaz42SC', 'teacher', NULL, '2025-07-07 07:09:40', '2025-07-07 07:09:40', NULL, NULL),
(4, 'Adegoke', 'Onyinyechukwu', 'female', 'https://via.placeholder.com/640x480.png/00ccee?text=et', '1990-06-23', '37 Isaac Street 70 900 IfunanyaVille', '0818 850 0912', 'cbamisebi@example.com', NULL, '$2y$12$evCqr8yukC9/zJW6ttyGieFc0CeDCuaB6cwruWNEdKUcJaRDacMPW', 'teacher', 'MfSkDT3EDTzoZCTDZkYVc7NCinWaF49LRUcaO24tkka14pAlAlKTOIQz4aWH', '2025-07-07 07:09:40', '2025-07-07 07:09:40', NULL, NULL),
(5, 'Tobiloba', 'Amaechi', 'male', 'https://via.placeholder.com/640x480.png/00ee00?text=ut', '1992-05-10', '64 Chidozie Street 22212 AugustinaVille', '+234 704 802 2177', 'omawunmi.oluwatosin@example.com', NULL, '$2y$12$FNAnB9Y2xwFoDrTCmmWcouKDVxgRFUmt/A9q/CV/2eLCfsA2.zSwm', 'teacher', 'nnkn1BJjV9Ivu6r9KMwE6jBOkMDNZV5HA4siF0P08wLLGJof7ewo8IRwarg0', '2025-07-07 07:09:41', '2025-07-07 07:09:41', NULL, NULL),
(6, 'Rasheedah', 'Salami', 'female', 'https://via.placeholder.com/640x480.png/009933?text=vero', '1981-02-08', '81 Olufeyikemi Street 93 730 TitilayoVille', '+2348027380609', 'adewale.ifeoma@example.net', NULL, '$2y$12$wJkXL22XFg8WKbFK7yORyeP81CUzMU7WrIXwwQPI3ErgJqlAhrH.a', 'teacher', NULL, '2025-07-07 07:09:41', '2025-07-07 07:09:41', NULL, NULL),
(7, 'Shalewa', 'Muinat', 'male', 'https://via.placeholder.com/640x480.png/0033bb?text=earum', '2002-12-29', '50 Adeoluwa Street 33 450 SumayyahVille', '0808 243 8703', 'rotimi.oyebola@example.com', NULL, '$2y$12$4sMzu8MLtifVYCODJ7YiHuuLxbhtXHAkpcbDDZiFfyHVpRzsFCw2e', 'student', NULL, '2025-07-07 07:09:42', '2025-07-07 07:09:42', NULL, NULL),
(8, 'Tobiloba', 'Abiodun', 'male', 'https://via.placeholder.com/640x480.png/00bbee?text=sequi', '2004-11-16', '85 Sylvester Street 94 718 TitiVille', '0814 579 7189', 'isarah@example.org', NULL, '$2y$12$HmNY8y84O8FJgLzy4hElWueRpontOW2DHsHoh8udm0orjTt6nI/H2', 'student', 'RaFuEfBomt7TFj3VJQmfsAbK6ptL6AsMoh6uAGsUDKGw5z4S2ZG0y0hlPGWu', '2025-07-07 07:09:42', '2025-07-07 07:09:42', NULL, NULL),
(9, 'Sekinat', 'Maryam', 'male', 'https://via.placeholder.com/640x480.png/005577?text=fugiat', '2000-09-02', '13 Omobolaji Street 84 013 EbiereVille', '0817 813 5267', 'gngozi@example.com', NULL, '$2y$12$AARVK.MtTeohEo4KJ6v3nOD6PrKWzf.FDYqmQuJuvwVZeDVUt15Ky', 'student', NULL, '2025-07-07 07:09:42', '2025-07-07 07:09:42', NULL, NULL),
(10, 'Isioma', 'David', 'female', 'https://via.placeholder.com/640x480.png/00aabb?text=consequatur', '1996-05-26', '20 Onose Street 07833 KubraVille', '0814 783 3712', 'alade77@example.com', NULL, '$2y$12$I63CJRFzSOfYIfR3DUC2MeSG99jsVBV3TiGkc6dDY8ZD1cFZGktBq', 'student', NULL, '2025-07-07 07:09:43', '2025-07-07 07:09:43', NULL, NULL),
(11, 'Olumide', 'Sylvester', 'male', 'https://via.placeholder.com/640x480.png/0033ee?text=ab', '2000-06-01', '70 Maryjane Street 71 567 BuchiVille', '07069408884', 'hbabalola@example.com', NULL, '$2y$12$hNCwrMbdi9Yj1Ib0ZMFhouikOC7C3dx6sRH2v0Gr81oBfV2NMJ/ZW', 'student', NULL, '2025-07-07 07:09:43', '2025-07-07 07:09:43', NULL, NULL),
(12, 'Obioma', 'Adeyemo', 'male', 'https://via.placeholder.com/640x480.png/00aadd?text=et', '1996-06-09', '34 Jamiu Street 13 685 IretiVille', '+2348062752650', 'vadeyemo@example.org', NULL, '$2y$12$Wx9aKUvNJtNRVQWMffROs.VG34jlbhEVoyUMI7pl2bv4J/mfY.UDC', 'student', NULL, '2025-07-07 07:09:43', '2025-07-07 07:09:43', NULL, NULL),
(13, 'Chiamaka', 'Obiageli', 'male', 'https://via.placeholder.com/640x480.png/007700?text=sunt', '2000-03-27', '39 Ogunwande Street 90978 EbioweiVille', '+234 809 463 2222', 'ifeanyichukwu.oluwatosin@example.com', NULL, '$2y$12$ZkRZK25Rd7RNWZmk.nJoie0hi0uDioJtxycOqwk.xGYGuMFYMeVzm', 'student', NULL, '2025-07-07 07:09:44', '2025-07-07 07:09:44', NULL, NULL),
(14, 'Zainab', 'Akerele', 'male', 'https://via.placeholder.com/640x480.png/00bbcc?text=doloribus', '1996-08-01', '73 Adebayo Street 30 647 EbioweiVille', '0905 124 5790', 'wobiageli@example.org', NULL, '$2y$12$RYxgm0dQVvl.g1mkIGA1Ju9bD.2JmY2QvyrUoXtCf1u/Wg663R.eu', 'student', NULL, '2025-07-07 07:09:44', '2025-07-07 07:09:44', NULL, NULL),
(15, 'Omolara', 'Sabdat', 'female', 'https://via.placeholder.com/640x480.png/007799?text=aut', '1999-02-05', '92 Emmanuel Street 90353 DanjumaVille', '+2348044546167', 'sumayyah54@example.org', NULL, '$2y$12$NqBqWWJ3hDqHtdaKmVKxnu4INmXB24Kqu/7a3ee8/OyXlVZSQHRA6', 'student', NULL, '2025-07-07 07:09:45', '2025-07-07 07:09:45', NULL, NULL),
(16, 'Wale', 'Olawale', 'male', 'https://via.placeholder.com/640x480.png/007799?text=aut', '1998-12-19', '81 Okunola Street 17 522 CherechiVille', '+2347044513762', 'omolara93@example.net', NULL, '$2y$12$3PZsb0jT7kNOkfiiQBsUde6tbFdZgcaz4zoR17Ro0jhJMNAHLIHyK', 'student', NULL, '2025-07-07 07:09:45', '2025-07-07 07:09:45', NULL, NULL),
(17, 'Olaide', 'Abosede', 'female', 'https://via.placeholder.com/640x480.png/0044aa?text=quos', '2000-03-20', '52 Omolara Street 22735 IkennaVille', '08100799826', 'rasheedah43@example.net', NULL, '$2y$12$7ggrSe6hP7.6sodIhDk6JusLLKE1.sG8vP/tmSIV7C.z.CUFtiU3q', 'student', NULL, '2025-07-07 07:09:45', '2025-07-07 07:09:45', NULL, NULL),
(18, 'Rasheedah', 'Funmilayo', 'female', 'https://via.placeholder.com/640x480.png/004455?text=ut', '2007-01-06', '30 Chidinma Street 42770 MusaVille', '0813 970 0193', 'smaryam@example.org', NULL, '$2y$12$0oSdssWCa1iv71t6DyWmYO1q3W3BWkeJzUsVUXpR2jw/r9wzdPCuu', 'student', NULL, '2025-07-07 07:09:46', '2025-07-07 07:09:46', NULL, NULL),
(19, 'Chisom', 'Hanifat', 'female', 'https://via.placeholder.com/640x480.png/006611?text=id', '1998-05-09', '93 Oyebola Street 15180 AminuVille', '+234 909 995 4183', 'oyinkansola.ifunanya@example.net', NULL, '$2y$12$ViJdbB0m2vZVPF20tRN4kedQTWmXNnf2V9c6hrKV3hJx5mKPtvLim', 'student', NULL, '2025-07-07 07:09:46', '2025-07-07 07:09:46', NULL, NULL),
(20, 'Jolayemi', 'Lawal', 'female', 'https://via.placeholder.com/640x480.png/004411?text=hic', '2003-02-16', '30 Peter Street 21593 OlaideVille', '+234 807 515 5390', 'katherine.chizoba@example.com', NULL, '$2y$12$Pz02APIG/6baxUMCsjqkpeosveTV18dBi4rMw0p8zBj8/2gkprHWe', 'student', NULL, '2025-07-07 07:09:47', '2025-07-07 07:09:47', NULL, NULL),
(21, 'Adegoke', 'Clare', 'male', 'https://via.placeholder.com/640x480.png/003377?text=reiciendis', '2006-07-11', '16 Oyebola Street 70594 ChimamandaVille', '0908 075 1701', 'samuel.jolayemi@example.com', NULL, '$2y$12$kmFYcdxMxOL9.80sHQP83uEsCSlMyKqAd0Rt.ACEpiQBJnGB0hbe2', 'student', NULL, '2025-07-07 07:09:47', '2025-07-07 07:09:47', NULL, NULL),
(22, 'Akande', 'Elizabeth', 'female', 'https://via.placeholder.com/640x480.png/0022dd?text=nam', '2003-07-22', '24 Adewura Street 32429 SnameVille', '08099854955', 'ayebatari38@example.org', NULL, '$2y$12$ZDVCfKMgyocM58Ia6kiopOlHYtUFK7ZBiYYdz4jLZ9/MsFVg8EIrO', 'student', 'NE3maZM0YM3HFODNYXZ8HX0aV4Cc8B6rRgJdFWEgPV1xLgN5ytYJAw6BBrlv', '2025-07-07 07:09:47', '2025-07-07 07:09:47', NULL, NULL),
(23, 'Toluwani', 'Abosede', 'female', 'https://via.placeholder.com/640x480.png/0022ff?text=reprehenderit', '2004-08-18', '63 Omobolanle Street 35223 WaleVille', '0908 308 0569', 'olubunmi.adaugo@example.org', NULL, '$2y$12$miQyfkwL2si46VixoHJ0leX/zLPanLOXRyoW8W/rBMtgSu6rSuTam', 'student', NULL, '2025-07-07 07:09:48', '2025-07-07 07:09:48', NULL, NULL),
(24, 'Habiba', 'Gbadamosi', 'female', 'https://via.placeholder.com/640x480.png/00cc22?text=sed', '2002-12-14', '90 Elizabeth Street 82617 TopeVille', '0816 854 2764', 'efe79@example.net', NULL, '$2y$12$WpNzFpiQz6wrh7w7ugBl/OjVd1cxBObOI2F5ee237Y39SoIOK3016', 'student', 'GOvdLOw06MCkU1SUkw3ndz5ftYYVyVfPbQirFFrReacY1wXUuAXvLg1iSdfw', '2025-07-07 07:09:48', '2025-07-07 07:09:48', NULL, NULL),
(25, 'Oluwunmi', 'Nwachukwu', 'female', 'https://via.placeholder.com/640x480.png/0066dd?text=natus', '2001-05-05', '11 Gbadamosi Street 20910 TitiVille', '0705 157 0472', 'ayinde.adeoluwa@example.net', NULL, '$2y$12$6/LMCA1DEZ8l93BqqCs8FePhje7gTowMukVh2JihlI3a/EdzFN1xi', 'student', NULL, '2025-07-07 07:09:49', '2025-07-07 07:09:49', NULL, NULL),
(26, 'Fatima', 'Babalola', 'female', 'https://via.placeholder.com/640x480.png/001133?text=tenetur', '1998-07-04', '41 Okunola Street 07 606 JolayemiVille', '+234 803 269 7956', 'fatima62@example.net', NULL, '$2y$12$WXrKkMDYaKHKgkOeBL6RoeZz2KxcMBSOrs0Lpr/V0XxroEr2RRwtO', 'student', NULL, '2025-07-07 07:09:49', '2025-07-07 07:09:49', NULL, NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admins_admin_id_foreign` (`admin_id`);

--
-- Index pour la table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Index pour la table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Index pour la table `des`
--
ALTER TABLE `des`
  ADD PRIMARY KEY (`id`),
  ADD KEY `des_de_id_foreign` (`de_id`);

--
-- Index pour la table `equipments`
--
ALTER TABLE `equipments`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `equipments_formations`
--
ALTER TABLE `equipments_formations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `equipments_formations_formation_id_foreign` (`formation_id`),
  ADD KEY `equipments_formations_equipment_id_foreign` (`equipment_id`);

--
-- Index pour la table `equipment_orders`
--
ALTER TABLE `equipment_orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `equipment_orders_order_id_foreign` (`order_id`),
  ADD KEY `equipment_orders_equipment_id_foreign` (`equipment_id`);

--
-- Index pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Index pour la table `formations`
--
ALTER TABLE `formations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `formations_user_id_foreign` (`user_id`);

--
-- Index pour la table `formation_students`
--
ALTER TABLE `formation_students`
  ADD PRIMARY KEY (`id`),
  ADD KEY `formation_students_formation_id_foreign` (`formation_id`),
  ADD KEY `formation_students_student_id_foreign` (`student_id`);

--
-- Index pour la table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Index pour la table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lessons_module_id_foreign` (`module_id`);

--
-- Index pour la table `meetings`
--
ALTER TABLE `meetings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `meetings_formation_id_foreign` (`formation_id`),
  ADD KEY `meetings_teacher_id_foreign` (`teacher_id`);

--
-- Index pour la table `meeting_student`
--
ALTER TABLE `meeting_student`
  ADD PRIMARY KEY (`id`),
  ADD KEY `meeting_student_meeting_id_foreign` (`meeting_id`),
  ADD KEY `meeting_student_student_id_foreign` (`student_id`);

--
-- Index pour la table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Index pour la table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Index pour la table `modules`
--
ALTER TABLE `modules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `modules_formation_id_foreign` (`formation_id`);

--
-- Index pour la table `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `options_question_id_foreign` (`question_id`);

--
-- Index pour la table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_student_id_foreign` (`student_id`);

--
-- Index pour la table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Index pour la table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Index pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Index pour la table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `questions_quiz_id_foreign` (`quiz_id`);

--
-- Index pour la table `quizzes`
--
ALTER TABLE `quizzes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quizzes_formation_id_foreign` (`formation_id`);

--
-- Index pour la table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Index pour la table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Index pour la table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Index pour la table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD KEY `students_student_id_foreign` (`student_id`);

--
-- Index pour la table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teachers_teacher_id_foreign` (`teacher_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `des`
--
ALTER TABLE `des`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `equipments`
--
ALTER TABLE `equipments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `equipments_formations`
--
ALTER TABLE `equipments_formations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `equipment_orders`
--
ALTER TABLE `equipment_orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `formations`
--
ALTER TABLE `formations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `formation_students`
--
ALTER TABLE `formation_students`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT pour la table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT pour la table `meetings`
--
ALTER TABLE `meetings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `meeting_student`
--
ALTER TABLE `meeting_student`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT pour la table `modules`
--
ALTER TABLE `modules`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `options`
--
ALTER TABLE `options`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=201;

--
-- AUTO_INCREMENT pour la table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT pour la table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT pour la table `quizzes`
--
ALTER TABLE `quizzes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `students`
--
ALTER TABLE `students`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `admins`
--
ALTER TABLE `admins`
  ADD CONSTRAINT `admins_admin_id_foreign` FOREIGN KEY (`admin_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `des`
--
ALTER TABLE `des`
  ADD CONSTRAINT `des_de_id_foreign` FOREIGN KEY (`de_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `equipments_formations`
--
ALTER TABLE `equipments_formations`
  ADD CONSTRAINT `equipments_formations_equipment_id_foreign` FOREIGN KEY (`equipment_id`) REFERENCES `equipments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `equipments_formations_formation_id_foreign` FOREIGN KEY (`formation_id`) REFERENCES `formations` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `equipment_orders`
--
ALTER TABLE `equipment_orders`
  ADD CONSTRAINT `equipment_orders_equipment_id_foreign` FOREIGN KEY (`equipment_id`) REFERENCES `equipments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `equipment_orders_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `formations`
--
ALTER TABLE `formations`
  ADD CONSTRAINT `formations_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `formation_students`
--
ALTER TABLE `formation_students`
  ADD CONSTRAINT `formation_students_formation_id_foreign` FOREIGN KEY (`formation_id`) REFERENCES `formations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `formation_students_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `lessons`
--
ALTER TABLE `lessons`
  ADD CONSTRAINT `lessons_module_id_foreign` FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `meetings`
--
ALTER TABLE `meetings`
  ADD CONSTRAINT `meetings_formation_id_foreign` FOREIGN KEY (`formation_id`) REFERENCES `formations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `meetings_teacher_id_foreign` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `meeting_student`
--
ALTER TABLE `meeting_student`
  ADD CONSTRAINT `meeting_student_meeting_id_foreign` FOREIGN KEY (`meeting_id`) REFERENCES `meetings` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `meeting_student_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `modules`
--
ALTER TABLE `modules`
  ADD CONSTRAINT `modules_formation_id_foreign` FOREIGN KEY (`formation_id`) REFERENCES `formations` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `options`
--
ALTER TABLE `options`
  ADD CONSTRAINT `options_question_id_foreign` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_quiz_id_foreign` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `quizzes`
--
ALTER TABLE `quizzes`
  ADD CONSTRAINT `quizzes_formation_id_foreign` FOREIGN KEY (`formation_id`) REFERENCES `formations` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `teachers`
--
ALTER TABLE `teachers`
  ADD CONSTRAINT `teachers_teacher_id_foreign` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
