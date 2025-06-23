-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : lun. 23 juin 2025 à 10:25
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
-- Base de données : `next`
--

-- --------------------------------------------------------

--
-- Structure de la table `admins`
--

CREATE TABLE `admins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `animators`
--

CREATE TABLE `animators` (
  `id` bigint(20) UNSIGNED NOT NULL,
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
('laravel_cache_euphrasie@gmail.com|127.0.0.1', 'i:2;', 1749882106),
('laravel_cache_euphrasie@gmail.com|127.0.0.1:timer', 'i:1749882106;', 1749882106),
('laravel_cache_fanoudanae@gmail.cm|127.0.0.1', 'i:1;', 1750410524),
('laravel_cache_fanoudanae@gmail.cm|127.0.0.1:timer', 'i:1750410522;', 1750410522),
('laravel_cache_fanoudanaz@gmail.cm|127.0.0.1', 'i:1;', 1750410513),
('laravel_cache_fanoudanaz@gmail.cm|127.0.0.1:timer', 'i:1750410512;', 1750410512),
('laravel_cache_fatou.kone@exam|127.0.0.1', 'i:1;', 1749871494),
('laravel_cache_fatou.kone@exam|127.0.0.1:timer', 'i:1749871493;', 1749871493),
('laravel_cache_fatou.kone@gmail.com|127.0.0.1', 'i:1;', 1749880305),
('laravel_cache_fatou.kone@gmail.com|127.0.0.1:timer', 'i:1749880305;', 1749880305),
('laravel_cache_gloria@gmail.com|127.0.0.1', 'i:1;', 1749908822),
('laravel_cache_gloria@gmail.com|127.0.0.1:timer', 'i:1749908821;', 1749908821),
('laravel_cache_kabi@gmail.com|127.0.0.1', 'i:4;', 1749880951),
('laravel_cache_kabi@gmail.com|127.0.0.1:timer', 'i:1749880950;', 1749880950),
('laravel_cache_marie@gmail.com|127.0.0.1', 'i:2;', 1749854435),
('laravel_cache_marie@gmail.com|127.0.0.1:timer', 'i:1749854435;', 1749854435);

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
  `quantity` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `description` text DEFAULT NULL,
  `details` longtext DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `equipments`
--

INSERT INTO `equipments` (`id`, `name`, `picture`, `quantity`, `price`, `status`, `description`, `details`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Ordinateur Portable Dell XPS 13', 'images/equipments/pc.jpg', 15, 800000, 1, 'Ordinateur portable haute performance pour développement', 'Intel Core i7, 16GB RAM, 512GB SSD, écran 13.3\" Full HD', 'images/equipments/dell-xps13.jpg', '2025-06-11 14:13:02', '2025-06-11 14:13:02'),
(2, 'MacBook Pro 14\"', 'images/equipments/pc2.jpg', 8, 1200000, 1, 'MacBook Pro pour développement iOS et design', 'Apple M2 Pro, 16GB RAM, 1TB SSD, écran Retina 14.2\"', 'images/equipments/macbook-pro.jpg', '2025-06-11 14:13:02', '2025-06-11 14:13:02'),
(3, 'Tablette Graphique Wacom', 'images/equipments/pc3.jpg', 20, 150000, 1, 'Tablette graphique pour design et illustration', 'Wacom Intuos Pro Medium, stylet inclus, surface de travail 224x148mm', 'images/equipments/wacom-intuos.jpg', '2025-06-11 14:13:02', '2025-06-11 14:13:02'),
(4, 'Écran 4K Samsung', 'images/equipments/pc4.jpg', 12, 300000, 1, 'Moniteur 4K pour développement et design', '27 pouces, résolution 3840x2160, USB-C, réglable en hauteur', 'images/equipments/samsung-4k.jpg', '2025-06-11 14:13:02', '2025-06-11 14:13:02'),
(5, 'Casque Audio Sony WH-1000XM4', 'images/equipments/pc5.jpg', 25, 80000, 1, 'Casque noise-cancelling pour concentration', 'Réduction de bruit active, autonomie 30h, Bluetooth 5.0', 'images/equipments/sony-headphones.jpg', '2025-06-11 14:13:02', '2025-06-11 14:13:02'),
(6, 'Caméra Logitech C920', 'images/equipments/pc6.jpg', 30, 45000, 0, 'Webcam HD pour cours en ligne', 'Full HD 1080p, autofocus, microphone intégré', 'images/equipments/logitech-c920.jpg', '2025-06-11 14:13:02', '2025-06-11 14:13:02'),
(7, 'Pare-feu', '/tmp/phpXtiW1n', 20, 20000, 1, 'wsxdfcgbjhnk,l;m:', 'cfvbjhnk,lm;:!ù*!,kjnh', NULL, '2025-06-13 16:14:24', '2025-06-13 16:14:24');

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
(1, 1, 1, '2025-06-11 14:13:03', '2025-06-11 14:13:03'),
(2, 1, 4, '2025-06-11 14:13:03', '2025-06-11 14:13:03'),
(3, 1, 6, '2025-06-11 14:13:03', '2025-06-11 14:13:03'),
(4, 2, 1, '2025-06-11 14:13:03', '2025-06-11 14:13:03'),
(5, 2, 2, '2025-06-11 14:13:03', '2025-06-11 14:13:03'),
(6, 2, 4, '2025-06-11 14:13:03', '2025-06-11 14:13:03'),
(7, 3, 1, '2025-06-11 14:13:03', '2025-06-11 14:13:03'),
(8, 3, 2, '2025-06-11 14:13:03', '2025-06-11 14:13:03'),
(9, 3, 5, '2025-06-11 14:13:03', '2025-06-11 14:13:03'),
(10, 4, 2, '2025-06-11 14:13:03', '2025-06-11 14:13:03'),
(11, 4, 3, '2025-06-11 14:13:03', '2025-06-11 14:13:03'),
(12, 4, 4, '2025-06-11 14:13:03', '2025-06-11 14:13:03');

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
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `formations`
--

INSERT INTO `formations` (`id`, `name`, `prerequisites`, `price`, `formation_details`, `picture`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 'Développement Web Frontend', 'Notions de base en informatique', 50000, 'Apprenez à créer des sites web modernes avec HTML5, CSS3, JavaScript, Bootstrap et Tailwind CSS.', 'images/formations/frontend.jpg', 12, '2025-06-11 14:13:01', '2025-06-11 14:13:01'),
(2, 'Développement Web Backend avec Laravel', 'Bases en PHP et MySQL', 75000, 'Maîtrisez Laravel pour créer des applications web sécurisées avec Eloquent, les migrations, les API RESTful et l’authentification.', 'images/formations/backend.jpg', 5, '2025-06-11 14:13:01', '2025-06-11 14:13:01'),
(3, 'Graphisme & Design UI/UX', 'Créativité et esprit artistique', 65000, 'Découvrez le design d’interface avec Figma, les principes UI/UX, la création de maquettes et l’expérience utilisateur.', 'images/formations/design.jpg', 5, '2025-06-11 14:13:01', '2025-06-11 14:13:01'),
(4, 'Photographie et Retouche d’image', 'Aucune expérience requise', 40000, 'Initiez-vous à la photographie numérique et à la retouche photo avec Photoshop et Lightroom.', 'images/formations/photo.jpg', 11, '2025-06-11 14:13:01', '2025-06-11 14:13:01'),
(5, 'Marketing Digital', 'Connaissance basique de l’internet', 60000, 'Apprenez les bases du marketing digital, du SEO, du marketing de contenu, des réseaux sociaux et du copywriting.', 'images/formations/marketing.jpg', 13, '2025-06-11 14:13:01', '2025-06-11 14:13:01'),
(6, 'Initiation à la programmation', 'Aucun', 30000, 'Formation pour débutants : algorithmes de base, Python, logique de programmation.', 'images/formations/initiation.jpg', 5, '2025-06-11 14:13:01', '2025-06-11 14:13:01'),
(7, 'Développement Mobile avec Flutter', 'Bonne maîtrise de la logique de programmation', 80000, 'Créez des applications mobiles performantes pour Android et iOS avec Flutter et Dart.', 'images/formations/flutter.jpg', 2, '2025-06-11 14:13:01', '2025-06-11 14:13:01'),
(8, 'Cybersécurité de base', 'Utilisation courante de l’ordinateur', 70000, 'Comprenez les bases de la sécurité informatique : antivirus, phishing, mots de passe, VPN, etc.', 'images/formations/cyber.jpg', 2, '2025-06-11 14:13:01', '2025-06-11 14:13:01'),
(9, 'Bureautique (Word, Excel, PowerPoint)', 'Utilisation de base d’un ordinateur', 25000, 'Formation complète pour maîtriser les logiciels bureautiques indispensables pour le travail ou les études.', 'images/formations/bureautique.jpg', NULL, '2025-06-11 14:13:01', '2025-06-11 14:13:01'),
(10, 'Création de contenu & Réseaux sociaux', 'Utilisation de Facebook ou Instagram', 55000, 'Apprenez à produire du contenu viral, gérer une page, utiliser Canva et automatiser la publication.', 'images/formations/social.jpg', NULL, '2025-06-11 14:13:01', '2025-06-11 14:13:01');

-- --------------------------------------------------------

--
-- Structure de la table `formations_teachers`
--

CREATE TABLE `formations_teachers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `teacher_id` bigint(20) UNSIGNED NOT NULL,
  `formation_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `formation_student`
--

CREATE TABLE `formation_student` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `formation_id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `formation_students`
--

CREATE TABLE `formation_students` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `formation_id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `formation_students`
--

INSERT INTO `formation_students` (`id`, `formation_id`, `student_id`, `created_at`, `updated_at`) VALUES
(1, 2, 1, '2025-06-19 14:16:44', '2025-06-19 14:16:44'),
(2, 9, 1, '2025-06-19 14:16:45', '2025-06-19 14:16:45'),
(3, 3, 6, '2025-06-19 14:16:45', '2025-06-19 14:16:45'),
(4, 8, 6, '2025-06-19 14:16:45', '2025-06-19 14:16:45'),
(5, 9, 6, '2025-06-19 14:16:45', '2025-06-19 14:16:45'),
(6, 7, 9, '2025-06-19 14:16:45', '2025-06-19 14:16:45'),
(7, 10, 9, '2025-06-19 14:16:45', '2025-06-19 14:16:45'),
(8, 3, 10, '2025-06-19 14:16:45', '2025-06-19 14:16:45'),
(9, 8, 10, '2025-06-19 14:16:45', '2025-06-19 14:16:45'),
(10, 6, 14, '2025-06-19 14:16:45', '2025-06-19 14:16:45'),
(11, 5, 18, '2025-06-19 14:16:45', '2025-06-19 14:16:45'),
(12, 7, 20, '2025-06-19 14:16:45', '2025-06-19 14:16:45'),
(13, 8, 20, '2025-06-19 14:16:45', '2025-06-19 14:16:45');

-- --------------------------------------------------------

--
-- Structure de la table `formation_teacher`
--

CREATE TABLE `formation_teacher` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `formation_id` bigint(20) UNSIGNED NOT NULL,
  `teacher_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
  `video` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `lessons`
--

INSERT INTO `lessons` (`id`, `module_id`, `title`, `contents`, `video`, `created_at`, `updated_at`) VALUES
(1, 1, 'Structure HTML de base', 'Introduction aux balises HTML essentielles : html, head, body, titre, paragraphes...', 'videos/html/lesson1.mp4', '2025-06-11 14:13:02', '2025-06-11 14:13:02'),
(2, 1, 'Formulaires HTML', 'Création de formulaires interactifs avec input, textarea, select...', 'videos/html/lesson2.mp4', '2025-06-11 14:13:02', '2025-06-11 14:13:02'),
(3, 2, 'Sélecteurs CSS', 'Comprendre les différents types de sélecteurs CSS et leur priorité', 'videos/css/lesson1.mp4', '2025-06-11 14:13:02', '2025-06-11 14:13:02'),
(4, 2, 'Flexbox et Grid', 'Mise en page moderne avec Flexbox et CSS Grid', 'videos/css/lesson2.mp4', '2025-06-11 14:13:02', '2025-06-11 14:13:02'),
(5, 3, 'Variables et fonctions', 'Déclaration de variables et création de fonctions en JavaScript', 'videos/js/lesson1.mp4', '2025-06-11 14:13:02', '2025-06-11 14:13:02'),
(6, 3, 'DOM Manipulation', 'Interaction avec les éléments HTML via JavaScript', 'videos/js/lesson2.mp4', '2025-06-11 14:13:02', '2025-06-11 14:13:02'),
(7, 4, 'Classes et Objets', 'Programmation orientée objet en PHP : classes, propriétés, méthodes', 'videos/php/lesson1.mp4', '2025-06-11 14:13:02', '2025-06-11 14:13:02'),
(8, 5, 'Routes et Contrôleurs', 'Configuration des routes et création de contrôleurs Laravel', 'videos/laravel/lesson1.mp4', '2025-06-11 14:13:02', '2025-06-11 14:13:02'),
(9, 5, 'Models et Relations', 'Création de modèles Eloquent et définition des relations', 'videos/laravel/lesson2.mp4', '2025-06-11 14:13:02', '2025-06-11 14:13:02');

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
(14, '2025_05_05_080243_create_animators_table', 1),
(15, '2025_05_05_080408_create_request_courses_table', 1),
(16, '2025_05_05_114100_create_order_details_table', 1),
(17, '2025_05_05_114200_create_registers_formations_table', 1),
(18, '2025_05_05_114429_create_formations_teachers_table', 1),
(19, '2025_05_05_131012_create_permission_tables', 1),
(20, '2025_05_28_152622_add_image_to_equipments_table', 1),
(21, '2025_06_03_164223_create_formation_student_table', 1),
(22, '2025_06_03_165011_create_formation_teacher_table', 1),
(23, '2025_06_06_154430_create_equipements_formations_table', 1),
(24, '2025_06_19_151035_create_formation_students_table', 2);

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
(1, 1, 'Introduction au HTML', 'Bases du langage HTML et structure des pages web', '2025-06-11 14:13:02', '2025-06-11 14:13:02'),
(2, 1, 'CSS et Design', 'Stylisation des pages web avec CSS', '2025-06-11 14:13:02', '2025-06-11 14:13:02'),
(3, 1, 'JavaScript Fondamentaux', 'Programmation JavaScript côté client', '2025-06-11 14:13:02', '2025-06-11 14:13:02'),
(4, 2, 'PHP Avancé', 'Concepts avancés de PHP orienté objet', '2025-06-11 14:13:02', '2025-06-11 14:13:02'),
(5, 2, 'Laravel Framework', 'Développement avec le framework Laravel', '2025-06-11 14:13:02', '2025-06-11 14:13:02'),
(6, 2, 'Base de données et Eloquent', 'Gestion des données avec Eloquent ORM', '2025-06-11 14:13:02', '2025-06-11 14:13:02'),
(7, 3, 'React Basics', 'Composants et JSX en React', '2025-06-11 14:13:02', '2025-06-11 14:13:02'),
(8, 3, 'State Management', 'Gestion d\'état avec hooks et Redux', '2025-06-11 14:13:02', '2025-06-11 14:13:02'),
(9, 4, 'Photoshop Essentials', 'Retouche photo et création graphique', '2025-06-11 14:13:02', '2025-06-11 14:13:02'),
(10, 4, 'Illustrator Vector', 'Création de logos et illustrations vectorielles', '2025-06-11 14:13:02', '2025-06-11 14:13:02');

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sum` int(11) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `path_facture` varchar(255) NOT NULL,
  `order_status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`id`, `sum`, `user_id`, `path_facture`, `order_status`, `created_at`, `updated_at`) VALUES
(1, 1100000, 1, 'invoices/order_001.pdf', 1, '2025-06-11 14:13:02', '2025-06-11 14:13:02'),
(2, 1500000, 2, 'invoices/order_002.pdf', 1, '2025-06-11 14:13:02', '2025-06-11 14:13:02');

-- --------------------------------------------------------

--
-- Structure de la table `order_details`
--

CREATE TABLE `order_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `equipment_id` bigint(20) UNSIGNED DEFAULT NULL,
  `formation_id` bigint(20) UNSIGNED DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `order_details`
--

INSERT INTO `order_details` (`id`, `order_id`, `equipment_id`, `formation_id`, `quantity`, `created_at`, `updated_at`) VALUES
(1, 1, 1, NULL, 1, '2025-06-11 14:13:02', '2025-06-11 14:13:02'),
(2, 2, 2, NULL, 1, '2025-06-11 14:13:02', '2025-06-11 14:13:02'),
(4, 1, 4, NULL, 1, '2025-06-11 14:13:02', '2025-06-11 14:13:02'),
(5, 2, 3, NULL, 2, '2025-06-11 14:13:02', '2025-06-11 14:13:02');

-- --------------------------------------------------------

--
-- Structure de la table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `password_reset_tokens`
--

INSERT INTO `password_reset_tokens` (`email`, `token`, `created_at`) VALUES
('fatou.kone@example.com', '$2y$12$36P5OTZOUlXpeKmnlFst2uyy9Iitib9Me6425T/N0qNzGZA4kRkjW', '2025-06-12 10:28:21');

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

-- --------------------------------------------------------

--
-- Structure de la table `registers_formations`
--

CREATE TABLE `registers_formations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `student_id` bigint(20) UNSIGNED NOT NULL,
  `formation_id` bigint(20) UNSIGNED NOT NULL,
  `sum_paid` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `request_courses`
--

CREATE TABLE `request_courses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `path_pdf` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `request_courses`
--

INSERT INTO `request_courses` (`id`, `user_id`, `path_pdf`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'requests/request_001.pdf', 'approved', '2025-06-11 14:13:02', '2025-06-11 14:13:02'),
(2, 2, 'requests/request_002.pdf', 'pending', '2025-06-11 14:13:02', '2025-06-11 14:13:02');

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
('8WPuwxKGsbHpWmQRVyK1vZ7oAnb3tI4MzFy9aSAy', NULL, '127.0.0.1', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:139.0) Gecko/20100101 Firefox/139.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibU1seXBwd2puN0F4b05ZdEV3UE1qdEU1N1JXTVZYczExV1c0YWdyMyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750424966),
('ar4CNuU7rXyDvpAOmyaSgORAToXBoM3NlJ6GWk7C', NULL, '127.0.0.1', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:139.0) Gecko/20100101 Firefox/139.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOTBtd3VjRXlyUUtjanBQc0w1S0d3VWNxT0NRTXVwbFU2dWhpQkZxSCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750425497),
('CQpbccNkQdYmeWpfCwqfCI941uyW55j9GFSjSqCx', NULL, '127.0.0.1', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:139.0) Gecko/20100101 Firefox/139.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOEViOHRUcXd3VWNoeDhNWTRIdkVLbDNaaWdpWlJ6ak9JbFVmVWtDMyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750423650),
('dESLnqqY4Z674XkASmm2HesbWaqNvPow90QSJSZz', NULL, '127.0.0.1', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:139.0) Gecko/20100101 Firefox/139.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSEI5amZHQXRuTWtXanNGRzNmeU9ubTY5QWJCQ1VZRzNXU0ZGa2pxSiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750425498),
('FpCcYSbXRPCb2vrHcTruXsSC3EufJaakPOxJC1Zs', NULL, '127.0.0.1', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:139.0) Gecko/20100101 Firefox/139.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQ0lhSTVlNHF3Nk1DZHdsdzRYMWhIaExjbnZwU21LN3lHSkdrbkc3cSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750423630),
('GrBvrvtfisKMDnU68Vb71qU5rV3cBBYa4nqQY7zT', NULL, '127.0.0.1', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:139.0) Gecko/20100101 Firefox/139.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiV0J0MHh0OTgzcEpzV0ZISDZ1UUcwenN4dHRZN1g3MktkRW9jY0VDciI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750423647),
('KtdHj8mDcrYybuZNyeZi2gk9PFsdgLtPCTJ8I5QR', NULL, '127.0.0.1', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:139.0) Gecko/20100101 Firefox/139.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaXA0QjJJdFViVUwxamlMcHVKREdpV3V1Q01hcmt1TUdnTHBaTTI3VSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750423651),
('RU6OtlRQK2bLeSwjuUiCkYKUtHAxbyrtwWFfh7Ii', NULL, '127.0.0.1', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:139.0) Gecko/20100101 Firefox/139.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRkg5UjNuQ29PVGQ4cTRINHFPY3lDQ2xwOVpMNFVPSnJ5UjVhRlhWUyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750423359),
('rVJxEzoIiNpKDmv5yMiklKq89m7a1McIYwwfAgSn', NULL, '127.0.0.1', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:139.0) Gecko/20100101 Firefox/139.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaVFBZVhxWjBvY3kzZDhDc085MHExRlJ6cTVjaXBQTUV4VXRUTXJkUSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750423360),
('Rx4edBwCWNyEMPbmpkxYShyo4MPxEl6A9ceoWJqS', NULL, '127.0.0.1', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:139.0) Gecko/20100101 Firefox/139.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOXFsNzFORGxFdDlWM01Oak13WnY2VEtYWDlkdEIyQlpnWE9aeUw2dyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750423647),
('vAhAn1N17OUrERpQ4LbMOFf90oRCGgXGqOQcviih', NULL, '127.0.0.1', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:139.0) Gecko/20100101 Firefox/139.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicDNuMnI2MmpQUUJDV1RmbnpLbW5tMjJPMmlQNThJNzNrSU5PQzlNdSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750424966),
('vim2cP371SjKfDValylKUY77MEBq4rWDh8FrzkTJ', 20, '127.0.0.1', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:139.0) Gecko/20100101 Firefox/139.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoidmRKMlByM0FqcmFJd1RHdEsxMWZvcGJQWjRUck9kZkdmZlBOTHU1TyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MjA7czoxNzoicGFzc3dvcmRfaGFzaF93ZWIiO3M6NjA6IiQyeSQxMiR6RWtCT01xQWxUWjNyS1NucC5pb2NlNjV4TkdkUGVvdC9wUmdqaVZiYVQ1anh2NUJ6bFBpUyI7fQ==', 1750436391),
('zNZRT2m3F5nqQ5Enkg7QuedRWMUOy5UvOB1oB3at', NULL, '127.0.0.1', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:139.0) Gecko/20100101 Firefox/139.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSEFQM1hyc1lDTGdXOFA4T3pLMUU5cXdCdTJSaU9CbkFaR1pUY0JHTiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvZm9ybWF0aW9ucyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1750423630);

-- --------------------------------------------------------

--
-- Structure de la table `students`
--

CREATE TABLE `students` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `teachers`
--

CREATE TABLE `teachers` (
  `id` bigint(20) UNSIGNED NOT NULL,
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
(1, 'CODJOVI', 'Jean', 'M', 'images/users/jean_dupont.jpg', '1990-05-15', '123 Rue de la Paix, Cotonou, Bénin', '+22996123456', 'jean@gmail.com', '2025-06-11 14:12:59', '$2y$12$folGS//8xZyAZzmCnFy8CuLyEO8p7.PlMaotvkiSV9tY..xZoagC.', 'student', 'LuIPFkj3qXwBgM9IYeZfkpuo9WQoIsQLINnCzKCS9CPPZZEZK9kRNem550U7', '2025-06-11 14:12:59', '2025-06-13 12:34:40', NULL, NULL),
(2, 'DOBONOU', 'Martin', 'F', 'images/users/marie_martin.jpg', '1988-12-03', '456 Avenue de l\'Indépendance, Porto-Novo, Bénin', '+22997234567', 'martin@gmail.com', '2025-06-11 14:12:59', '$2y$12$EM4pDoYaXXBOZLzJoulNLOY52pII5wOjKCRKw0ggov8FsgTbvYQiG', 'teacher', NULL, '2025-06-11 14:13:00', '2025-06-13 13:17:18', NULL, NULL),
(4, 'Fatou', 'Kone', 'F', 'images/users/fatou_kone.jpg', '1992-03-10', '321 Rue des Cocotiers, Ouidah, Bénin', '+22999456789', 'fatou.kone@example.com', '2025-06-11 14:13:00', '$2y$12$wd8f.u7QSIpuz2jaZxL7.ebBjSdeO57991tgR8pfAN5e4ghaA.542', 'admin', 'A3z9ovOn67qHWXH1wlMARsr3qhzWOoq2oOaXBw2VhG0Jkn8xsVziedNvbXdI', '2025-06-11 14:13:00', '2025-06-11 14:13:00', NULL, NULL),
(5, 'Kofi', 'Adjovi', 'M', 'images/users/kofi_adjovi.jpg', '1987-11-18', '654 Quartier Zongo, Natitingou, Bénin', '+22990567890', 'kofi.adjovi@example.com', '2025-06-11 14:13:00', '$2y$12$UPzP8B8LWqfxglX/KeahUuwJJJ.Eo5S8oN81Uhfgv3Op6wqdGFMfO', 'teacher', NULL, '2025-06-11 14:13:00', '2025-06-11 14:13:00', NULL, NULL),
(6, 'Aïcha', 'Biokou', 'F', NULL, '1993-07-05', '987 Rue de la République, Abomey, Bénin', '+22991678901', 'aicha.biokou@example.com', '2025-06-11 14:13:00', '$2y$12$qb3xJxjhXuDwGmsPdbKfKuwdp5MOmp3plBeoSrvuyGZWdztMHimiq', 'student', NULL, '2025-06-11 14:13:01', '2025-06-11 14:13:01', NULL, NULL),
(7, 'Admin', 'System', 'M', 'images/users/admin.jpg', '1985-01-01', '000 Centre Administratif, Cotonou, Bénin', '+22900000000', 'admin@system.com', '2025-06-11 14:13:01', '$2y$12$uenGRlBijZ27PhU566hs4erlTpUmVqqacKM9ACwHlOiA6.1KKagBi', 'super_admin', NULL, '2025-06-11 14:13:01', '2025-06-11 14:13:01', NULL, NULL),
(9, 'Obed', 'ADIFON', 'male', 'profile-pictures/N3tKDNiMZVf5noXEmJESkMPf1ewtyWJo3LDKms8V.jpg', '2004-02-02', '2024- Mairie- Calavi- Atlantique- Botswana', '00099001803', 'obed@gmail.com', NULL, '$2y$12$NHB05upKDVn9YBoHjBbkzeNphheveB8h.iHs8F4ro8fx9laBbfxim', 'student', 'Zp6IUEsAQvlibqgooXUXx9FCZcaaMSLYZlljehVQyzeIDSLbuT9wn1H1WExU', '2025-06-12 10:43:19', '2025-06-12 10:43:19', NULL, NULL),
(10, 'ADIFON', 'Gloria', 'female', NULL, '2000-02-02', 'wer00- dan- May- Angola', '00099001803', 'golria@gmail.com', NULL, '$2y$12$zGOOYhwhoQz8yuyTwhYdpec4Wr7FGy0x00RCFooaJjE9wgkxbkf9m', 'student', NULL, '2025-06-12 11:48:58', '2025-06-12 11:48:58', NULL, NULL),
(11, 'Kabir', 'ALADJIBONI', 'male', NULL, '1990-05-20', 'Cotonou, Bénin', '22997001122', 'kabi@gmail.com', NULL, '$2y$12$iDx97CoXjoRsZ6rZAqBMaOBL5TkzN.33ko4psglXPF0i4ZI8w4hq2', 'teacher', NULL, '2025-06-12 12:57:07', '2025-06-12 12:57:07', NULL, NULL),
(12, 'Koudousse', 'ALADJIBONI', 'male', NULL, '1990-05-20', 'Cotonou, Bénin', '22997001122', 'koudousse@gmail.com', NULL, '$2y$12$5xzIVwM2WRA8Wh.FJCmey.utSmBpx6eN6bBjZRLVMY3oYOBPD8jGK', 'teacher', NULL, '2025-06-12 15:23:47', '2025-06-12 15:23:47', NULL, NULL),
(13, 'FANOU', 'Joseph', 'male', NULL, '2009-02-02', 'Bénin, Atlantique, Calavi, Agmandin', '0140479728', 'joseph@gmail.com', NULL, '$2y$12$3N3DPR4zM.mCRZkcPWeCgeNv3S8a5yjBvcLcs.NAf9bT2X8HTTtbG', 'teacher', 'KOmKlpwalMhWmIyP7W1xrKttv2yGjguKy38scdZqim9bpLvBTrsWv3NUhkb3', '2025-06-13 10:42:07', '2025-06-13 10:42:07', NULL, NULL),
(14, 'FANOU', 'Marie', 'female', NULL, '2009-02-02', 'Bénin, Atlantique, Calavi, Agmandin', '0140479728', 'marie@gmail.com', NULL, '$2y$12$MrY5.CqjInXD0TxFYdnbPe3CDd52ivh9l6uPH5ay8l0wasNj3lc1m', 'student', NULL, '2025-06-13 11:00:27', '2025-06-13 11:00:27', NULL, NULL),
(15, 'FANOU', 'Marie', 'female', NULL, '2009-02-02', 'Bénin, Atlantique, Calavi, Agmandin', '0140479728', 'mariette@gmail.com', NULL, '$2y$12$GwUkHbe4wRGhoZyfr4OnWezq6hsqTs2PFDttTWDCv6D4Tugd7lOeS', 'student', NULL, '2025-06-13 11:01:02', '2025-06-13 11:01:02', NULL, NULL),
(16, 'LOTOU', 'Déo-Gratias', 'male', NULL, '2005-02-02', 'mairie', '0140479728', 'gratias@gmail.com', NULL, '$2y$12$ozp3G2R6MmdIMuUB9mVehuoKBQCK4BVuzt9gILrL0rwUk5A3qrCXi', 'student', 'avCBb6ObbyQKLtn2oVQS711yOOGJdmdQBM9fwFyvRZXFji1pJlPFqvbdseSs', '2025-06-13 11:51:09', '2025-06-13 11:51:09', NULL, NULL),
(17, 'MEDJOTIN', 'Euphrasie', 'female', NULL, '2005-05-02', 'Calavi, mairie', '99785789', 'euphrasie@gmail', NULL, '$2y$12$nJyXG49Nx6fTAtcRBFlDPekkdtpB0QdqhkQe0eK6.kjIpA8i4R1N6', 'student', NULL, '2025-06-13 12:05:04', '2025-06-13 12:05:04', NULL, NULL),
(18, 'CAPO', 'Danièle', 'female', NULL, '2008-02-02', 'Allada, Bénin', '97858497', 'danielle@gmail.com', NULL, '$2y$12$cyZk9tUKuy/1v4mMC7F5h.IKIHESzrx.0Xt4cklMw8JCeebtvj6SW', 'student', NULL, '2025-06-13 13:20:20', '2025-06-13 13:20:20', NULL, NULL),
(19, 'GBAGUIDI', 'Kone', 'male', NULL, '20007-02-02', 'Mairiz- Calavi, Bénin- Atlantique- Bénin', '+22996123456', 'kone@gmail.xn--cm-fsa', NULL, '$2y$12$6LB6pGDxjZlEkZ3S92USeOgIHtw/uO0N7Zx9muiiHtmyhwtJTW0eS', 'student', NULL, '2025-06-13 21:53:08', '2025-06-13 21:53:08', NULL, NULL),
(20, 'FANOU', 'Christopher', 'male', NULL, '2005-02-02', 'Bénin, Atlantique, Calavi, Agmandin', '+22997234567', 'fanoudanae@gmail.com', NULL, '$2y$12$zEkBOMqAlTZ3rKSnp.ioce65xNGdPeot/pRgjiVbaT5jxv5BzlPiS', 'student', NULL, '2025-06-14 15:11:19', '2025-06-14 15:11:19', NULL, NULL);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `animators`
--
ALTER TABLE `animators`
  ADD PRIMARY KEY (`id`);

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
  ADD PRIMARY KEY (`id`);

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
-- Index pour la table `formations_teachers`
--
ALTER TABLE `formations_teachers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `formations_teachers_teacher_id_foreign` (`teacher_id`),
  ADD KEY `formations_teachers_formation_id_foreign` (`formation_id`);

--
-- Index pour la table `formation_student`
--
ALTER TABLE `formation_student`
  ADD PRIMARY KEY (`id`),
  ADD KEY `formation_student_formation_id_foreign` (`formation_id`),
  ADD KEY `formation_student_student_id_foreign` (`student_id`);

--
-- Index pour la table `formation_students`
--
ALTER TABLE `formation_students`
  ADD PRIMARY KEY (`id`),
  ADD KEY `formation_students_formation_id_foreign` (`formation_id`),
  ADD KEY `formation_students_student_id_foreign` (`student_id`);

--
-- Index pour la table `formation_teacher`
--
ALTER TABLE `formation_teacher`
  ADD PRIMARY KEY (`id`),
  ADD KEY `formation_teacher_formation_id_foreign` (`formation_id`),
  ADD KEY `formation_teacher_teacher_id_foreign` (`teacher_id`);

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
-- Index pour la table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_user_id_foreign` (`user_id`);

--
-- Index pour la table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_details_order_id_foreign` (`order_id`),
  ADD KEY `order_details_equipment_id_foreign` (`equipment_id`),
  ADD KEY `order_details_formation_id_foreign` (`formation_id`);

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
-- Index pour la table `registers_formations`
--
ALTER TABLE `registers_formations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `registers_formations_student_id_foreign` (`student_id`),
  ADD KEY `registers_formations_formation_id_foreign` (`formation_id`);

--
-- Index pour la table `request_courses`
--
ALTER TABLE `request_courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `request_courses_user_id_foreign` (`user_id`);

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
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT pour la table `animators`
--
ALTER TABLE `animators`
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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `equipments_formations`
--
ALTER TABLE `equipments_formations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `formations`
--
ALTER TABLE `formations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `formations_teachers`
--
ALTER TABLE `formations_teachers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `formation_student`
--
ALTER TABLE `formation_student`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `formation_students`
--
ALTER TABLE `formation_students`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `formation_teacher`
--
ALTER TABLE `formation_teacher`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT pour la table `modules`
--
ALTER TABLE `modules`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `registers_formations`
--
ALTER TABLE `registers_formations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `request_courses`
--
ALTER TABLE `request_courses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `equipments_formations`
--
ALTER TABLE `equipments_formations`
  ADD CONSTRAINT `equipments_formations_equipment_id_foreign` FOREIGN KEY (`equipment_id`) REFERENCES `equipments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `equipments_formations_formation_id_foreign` FOREIGN KEY (`formation_id`) REFERENCES `formations` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `formations`
--
ALTER TABLE `formations`
  ADD CONSTRAINT `formations_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `formations_teachers`
--
ALTER TABLE `formations_teachers`
  ADD CONSTRAINT `formations_teachers_formation_id_foreign` FOREIGN KEY (`formation_id`) REFERENCES `formations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `formations_teachers_teacher_id_foreign` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `formation_student`
--
ALTER TABLE `formation_student`
  ADD CONSTRAINT `formation_student_formation_id_foreign` FOREIGN KEY (`formation_id`) REFERENCES `formations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `formation_student_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `formation_students`
--
ALTER TABLE `formation_students`
  ADD CONSTRAINT `formation_students_formation_id_foreign` FOREIGN KEY (`formation_id`) REFERENCES `formations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `formation_students_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `formation_teacher`
--
ALTER TABLE `formation_teacher`
  ADD CONSTRAINT `formation_teacher_formation_id_foreign` FOREIGN KEY (`formation_id`) REFERENCES `formations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `formation_teacher_teacher_id_foreign` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `lessons`
--
ALTER TABLE `lessons`
  ADD CONSTRAINT `lessons_module_id_foreign` FOREIGN KEY (`module_id`) REFERENCES `modules` (`id`) ON DELETE CASCADE;

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
-- Contraintes pour la table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_equipment_id_foreign` FOREIGN KEY (`equipment_id`) REFERENCES `equipments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_details_formation_id_foreign` FOREIGN KEY (`formation_id`) REFERENCES `formations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_details_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `registers_formations`
--
ALTER TABLE `registers_formations`
  ADD CONSTRAINT `registers_formations_formation_id_foreign` FOREIGN KEY (`formation_id`) REFERENCES `formations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `registers_formations_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `request_courses`
--
ALTER TABLE `request_courses`
  ADD CONSTRAINT `request_courses_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
