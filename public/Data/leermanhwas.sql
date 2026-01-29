-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-01-2026 a las 17:55:17
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `leermanhwas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `capitulos`
--
-- Creación: 02-10-2025 a las 20:03:44
--

CREATE TABLE `capitulos` (
  `id` int(11) NOT NULL,
  `manhwa_id` int(11) NOT NULL,
  `numero` varchar(20) NOT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `fecha_publicacion` date DEFAULT NULL,
  `contenido` text DEFAULT NULL,
  `imagenes` text DEFAULT NULL COMMENT 'JSON array con las rutas de las imágenes del capítulo',
  `num_imagenes` int(11) DEFAULT 0 COMMENT 'Número total de imágenes en el capítulo',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `capitulos`
--

INSERT INTO `capitulos` (`id`, `manhwa_id`, `numero`, `titulo`, `fecha_publicacion`, `contenido`, `imagenes`, `num_imagenes`, `created_at`, `updated_at`) VALUES
(1, 26, '1', 'Capitulo 1', '2025-06-04', '', '[\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/2-683f9e0ebda7e-2.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/3-683f9e0ebe0a3-3.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/61-683f9e0ebe4f7-61.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/60-683f9e0ebea49-60.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/52-683f9e0ebefc6-52.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/53-683f9e0ebf552-53.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/54-683f9e0ebf9c2-54.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/55-683f9e0ebfcf4-55.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/56-683f9e0ec00cc-56.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/57-683f9e0ec0535-57.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/58-683f9e0ec0a95-58.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/59-683f9e0ec0f44-59.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/50-683f9e0ec1431-50.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/51-683f9e0ec18d8-51.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/48-683f9e0ec1d53-48.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/49-683f9e0ec21f1-49.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/46-683f9e0ec267f-46.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/47-683f9e0ec2b91-47.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/44-683f9e0ec302c-44.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/45-683f9e0ec34ac-45.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/42-683f9e0ec392a-42.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/43-683f9e0ec3de8-43.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/40-683f9e0ec42aa-40.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/41-683f9e0ec4b20-41.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/38-683f9e0ec52c8-38.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/39-683f9e0ec585f-39.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/36-683f9e0ec5e04-36.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/37-683f9e0ec62bb-37.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/34-683f9e0ec677d-34.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/35-683f9e0ec6c24-35.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/32-683f9e0ec7098-32.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/33-683f9e0ec7539-33.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/30-683f9e0ec79a8-30.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/31-683f9e0ec7e22-31.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/27-683f9e0ec8302-27.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/28-683f9e0ec8987-28.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/29-683f9e0ec918d-29.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/25-683f9e0ec9707-25.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/26-683f9e0ec9bc7-26.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/23-683f9e0eca076-23.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/24-683f9e0eca4e6-24.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/21-683f9e0eca96b-21.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/22-683f9e0ecade6-22.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/19-683f9e0ecb314-19.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/20-683f9e0ecb79a-20.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/17-683f9e0ecbc2d-17.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/18-683f9e0ecc0bc-18.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/15-683f9e0ecc594-15.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/16-683f9e0eccce6-16.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/12-683f9e0ecd536-12.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/13-683f9e0ecdbdc-13.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/14-683f9e0ece33a-14.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/9-683f9e0ece8c9-9.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/10-683f9e0ecede4-10.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/11-683f9e0ecf2fc-11.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/6-683f9e0ecf8f7-6.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/7-683f9e0ecfe07-7.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/8-683f9e0ed028c-8.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/4-683f9e0ed06db-4.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/5-683f9e0ed0cb5-5.jpg\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/26\\/capitulo1\\/1-683f9e0ed1224-1.jpg\"]', 61, '2025-06-04 01:14:54', '2025-06-04 20:02:44'),
(4, 28, '1', 'Capitulo 1', '2025-06-04', '', '[\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/1-6840d4694e52e-0.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/2-6840d4694ed83-01_01.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/3-6840d4694f790-01_02.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/4-6840d46950037-01_03.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/5-6840d469507de-01_04.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/6-6840d46950ea0-01_05.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/7-6840d469514b6-02_01.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/8-6840d46951bdf-02_02.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/9-6840d46952142-02_03.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/10-6840d46952780-02_04.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/11-6840d46952dcf-02_05.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/12-6840d4695340b-03_01.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/13-6840d469539ba-03_02.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/14-6840d46953f0f-03_03.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/15-6840d46954457-04_01.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/16-6840d469549f2-04_02.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/17-6840d46954f9b-04_03.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/18-6840d469555e9-05_01.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/19-6840d46955be7-05_02.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/20-6840d469561b5-05_03.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/21-6840d469568b0-06_01.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/22-6840d46956ee3-06_02.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/23-6840d46957467-06_03.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/24-6840d46957a51-07_01.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/25-6840d4695807c-07_02.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/26-6840d4695866b-07_03.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/27-6840d46958c79-08_01.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/28-6840d46959233-08_02.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/29-6840d46959857-08_03.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/30-6840d46959ece-09_01.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/31-6840d4695a570-09_02.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/32-6840d4695abd8-09_03.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/33-6840d4695b205-10_01.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/34-6840d4695b7c1-10_02.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/35-6840d4695bd4d-10_03.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/36-6840d4695c300-11_01.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/37-6840d4695c8c9-11_02.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/38-6840d4695cf69-11_03.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/39-6840d4695d66e-12_01.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/40-6840d4695dcc2-12_02.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/41-6840d4695e213-12_03.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/42-6840d4695e7e5-13_01.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/43-6840d4695ee28-13_02.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/44-6840d4695f43a-13_03.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/45-6840d4695fa1f-14_01.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/46-6840d469600fd-14_02.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/47-6840d46960670-14_03.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/48-6840d46960b94-15_01.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/49-6840d46961097-15_02.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/50-6840d469615ab-15_03.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/51-6840d46961b04-16_01.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/52-6840d4696209e-16_02.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/53-6840d4696261d-16_03.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/54-6840d46962c81-17_01.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/55-6840d4696330a-17_02.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/56-6840d46963907-17_03.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/57-6840d46963f20-18_01.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/58-6840d4696453a-18_02.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/59-6840d46964b87-18_03.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/60-6840d4696512d-19_01.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/61-6840d4696563d-19_02.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/62-6840d46965bab-19_03.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/63-6840d4696616d-20_01.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/64-6840d46966646-20_02.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/65-6840d46966b50-20_03.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/66-6840d46967059-21_01.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/67-6840d469675c6-21_02.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/68-6840d46967a8a-21_03.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/69-6840d46967ed6-22_01.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/70-6840d46968366-22_02.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/71-6840d469687d0-22_03.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/72-6840d46968f31-23_01.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/73-6840d4696946b-23_02.webp\",\"http:\\/\\/localhost:8060\\/backend-mhw\\/public\\/uploads\\/images\\/28\\/capitulo1\\/74-6840d469698f3-23_03.webp\"]', 74, '2025-06-04 23:19:05', '2025-06-04 23:19:05');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `generos`
--
-- Creación: 02-10-2025 a las 20:03:44
--

CREATE TABLE `generos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `generos`
--

INSERT INTO `generos` (`id`, `nombre`, `descripcion`, `created_at`, `updated_at`) VALUES
(1, 'Acción', 'Género centrado en escenas dinámicas y combates.', '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(2, 'Fantasía', 'Género que incluye elementos mágicos y mundos imaginarios.', '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(3, 'Aventura', 'Género que sigue a los personajes en viajes emocionantes y exploraciones de nuevos mundos.', '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(4, 'Romance', 'Género que se enfoca en relaciones amorosas y emociones románticas entre personajes.', '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(5, 'Ciencia Ficción', 'Género que explora conceptos futuristas, tecnología avanzada y viajes espaciales.', '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(6, 'Comedia', 'Género que busca entretener al público con situaciones humorísticas y diálogos divertidos.', '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(7, 'Drama', 'Género que se centra en emociones intensas, conflictos personales y tramas serias.', '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(8, 'Horror', 'Género que busca generar miedo, tensión y sensación de peligro en el lector.', '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(9, 'Misterio', 'Género que involucra enigmas, investigaciones y revelaciones inesperadas.', '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(10, 'Deportes', 'Género que gira en torno a competiciones deportivas y el desarrollo de habilidades atléticas.', '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(11, 'Sobrenatural', 'Género que incluye fenómenos inexplicables, poderes ocultos y eventos paranormales.', '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(12, 'Histórico', 'Género ambientado en épocas pasadas, con un enfoque en eventos y contextos históricos.', '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(13, 'Psicológico', 'Género que explora la mente humana, emociones complejas y dilemas éticos.', '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(14, 'Mecha', 'Género que incluye robots gigantes pilotados por humanos, generalmente en batallas épicas.', '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(15, 'Slice of Life', 'Género que retrata la vida cotidiana de los personajes de manera realista y relatable.', '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(16, 'Thriller', 'Género que mantiene al lector al borde de su asiento con tramas llenas de suspense y emoción.', '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(17, 'Ecchi', 'Género que incluye contenido sugestivo o ligeramente sexual, pero no explícito.', '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(18, 'Magia', 'Género que se centra en el uso de poderes mágicos, hechizos y habilidades sobrenaturales.', '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(19, 'Superpoderes', 'Género que se centra en personajes con habilidades sobrehumanas, como fuerza excepcional, control de elementos, telequinesis u otros poderes especiales.', '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(20, 'Josei', 'Género dirigido a mujeres adultas, con tramas más realistas y maduras.', '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(21, 'Reencarnación', 'Género que explora la idea de renacer o reencarnarse en un nuevo cuerpo, mundo o vida, a menudo con conocimientos o habilidades del pasado.', '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(22, 'Apocalíptico', 'Género que explora escenarios post-apocalípticos, donde la civilización ha colapsado debido a catástrofes, invasiones o eventos catastróficos.', '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(23, 'Supervivencia', 'Género que explora la lucha por sobrevivir en entornos hostiles, situaciones extremas o escenarios donde la vida está en constante peligro.', '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(24, 'Artes Marciales', 'Género que se centra en el uso de técnicas de combate cuerpo a cuerpo, disciplinas tradicionales o estilos únicos, a menudo combinados con elementos de acción y entrenamiento.', '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(25, 'Tragedia', 'Género que explora eventos desgarradores, pérdidas irreparables o situaciones que provocan emociones profundas como tristeza, desesperación o sacrificio.', '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(26, 'Escolar', 'Género que se desarrolla en un entorno educativo, explorando la vida estudiantil, las relaciones entre compañeros y los desafíos académicos o sociales.', '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(27, 'Harem', 'Es una trama donde un protagonista (generalmente masculino) está rodeado de varios personajes (generalmente femeninos) que muestran interés romántico o afectivo hacia él.', '2025-04-01 02:21:30', '2025-04-01 02:21:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `manhwas`
--
-- Creación: 02-10-2025 a las 20:03:44
-- Última actualización: 29-01-2026 a las 16:50:08
--

CREATE TABLE `manhwas` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `autor` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `estado` enum('En curso','Finalizado','Cancelado','Hiatus') DEFAULT 'En curso',
  `fecha_publicacion` date NOT NULL,
  `portada_url` varchar(255) DEFAULT NULL,
  `portada` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `manhwas`
--

INSERT INTO `manhwas` (`id`, `titulo`, `autor`, `descripcion`, `estado`, `fecha_publicacion`, `portada_url`, `portada`, `created_at`, `updated_at`) VALUES
(1, 'The Beginning After The End', 'Arthur Leywin', 'Un rey renacido en un mundo de magia.', 'En curso', '2018-01-01', 'https://otakuteca.com/images/books/cover/5ddde8a92558c.webp', NULL, '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(2, 'Solo Leveling', 'Chugong', 'Un cazador débil se convierte en el más fuerte tras un evento misterioso.', 'Finalizado', '2016-03-04', 'https://otakuteca.com/images/books/cover/5c2efcd42cd5e.webp', NULL, '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(3, 'Tower of God', 'SIU', 'Un joven llamado Bam escala una torre misteriosa para encontrar a su amiga perdida.', 'En curso', '2010-06-30', 'https://otakuteca.com/images/books/cover/5e94b820e3a4c.webp', NULL, '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(4, 'The Gamer', 'Sung Sang-Yeong', 'La vida cotidiana de un estudiante que descubre que puede usar habilidades de videojuegos en la realidad.', 'Finalizado', '2013-05-15', 'https://manhwa18.cc/manga/the-gamer-71.jpg', NULL, '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(5, 'Noblesse', 'Son Jae-Ho', 'Un noble vampiro despierta después de 820 años de sueño y debe proteger a su clan.', 'Finalizado', '2007-12-01', 'https://cdn2.penguin.com.au/covers/original/9781990778940.jpg', NULL, '2025-04-01 02:21:30', '2026-01-29 16:50:08'),
(6, 'Lookism', 'Park Tae-Joon', 'Un estudiante víctima de bullying descubre que puede intercambiar su cuerpo entre dos formas: una extremadamente atractiva y otra menos convencional. Esto le permite explorar temas de apariencia, discriminación y autoestima.', 'En curso', '2014-09-01', 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh1ZykXwdZJeoi45OP5mYof6neeOH8ZHlv2TLbPnBiE9RMzn-MXn1BkYxy1oVcp4PIspSczWmUDQAsoKt0PDlHxXx46cSDEq0FsZdvBdd-0kTlFtMpZ-Xw7hNhYHZv5PcsKkqQXlkzeRyM/s1600/1675670005053653-1.png', NULL, '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(7, 'Sweet Home', 'Youngchan Hwang\" (escritor) y \"Carnby Kim\" (ilustrador)', 'Un grupo de personas lucha por sobrevivir en un mundo donde los humanos se convierten en monstruos.', 'Finalizado', '2017-09-01', 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1664994196i/62889023.jpg', NULL, '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(8, 'Girls of the Wild\'s', 'Hun', 'Un joven se une a una academia exclusiva para mujeres y descubre secretos inesperados.', 'En curso', '2011-04-15', 'https://4.bp.blogspot.com/-rzUCKwDfoOU/WIZdjGo1F1I/AAAAAAAAAew/kLrBobHEygct0P3QC50aSRNfUEKimiO5gCLcB/s1600/3221911-girls%252Bof%252Bthe%252Bwild%2527s.jpg', NULL, '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(9, 'DICE: The Cube that Changes Everything', 'Yoon Hyun-Seok', 'Un estudiante común obtiene un cubo mágico que le otorga poderes especiales.', 'Finalizado', '2013-09-20', 'https://misskick.vn/wp-content/uploads/2022/07/top-truyen-manhwa-hay-nhat-cua-han-quoc-nen-xem-ngay-11.jpg', NULL, '2025-04-01 02:21:30', '2025-06-08 00:10:28'),
(10, 'Trace', 'Lee Jong-Beom', 'Un joven con habilidades únicas es perseguido por una organización secreta.', 'En curso', '2014-07-10', 'https://th.bing.com/th/id/OIP.oV9GpX_z07g04DMGph9WmwHaKR?w=577&h=800&rs=1&pid=ImgDetMain', NULL, '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(11, 'Second Life Ranker', 'Seok Jeong-Hyun', 'Un hombre regresa a su infancia para corregir sus errores y alcanzar el éxito.', 'En curso', '2016-08-01', 'https://th.bing.com/th/id/OIP.AL5fN4whMqbNf-KHvsQFAwHaLH?rs=1&pid=ImgDetMain', NULL, '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(12, 'Omniscient Reader\'s Viewpoint', 'Sing Shong (novela original), dibujado por SuHo Ahn', 'Kim Dokja es un bibliotecario común que ha dedicado su vida a leer novelas web. Un día, descubre que el mundo real ha comenzado a transformarse en la trama de una novela que leyó hace años: \"Regresión del Fin del Mundo\". Sin embargo, esta vez, él ya no es solo un espectador. Kim Dokja tiene conocimientos privilegiados sobre los eventos futuros, pero pronto se da cuenta de que el destino está cambiando y no todo será como lo recordaba.', 'En curso', '2020-01-01', 'https://gg.asuracomic.net/storage/media/105/conversions/9b59fdec-optimized.webp', NULL, '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(26, 'El Arquitecto de mazmorras', 'Desconocido', 'Kang Chiwoo perdió la vida en un accidente y se reencarnó en el hijo de un gran señor de los demonios en otro mundo. A diferencia de su vida anterior como diseñador de mapas, ahora es un perdedor llamado Kella.', 'En curso', '2025-04-08', 'https://dashboard.olympusbiblioteca.com/storage/comics/covers/1504/ChatGPT%20Image%208%20ene%202026,%2008_23_53%20p.m.-xl.webp', '', '2025-04-08 19:07:20', '2026-01-29 16:48:55'),
(27, 'La Novia de Obsidiana', 'Chung purm', 'Durante toda su vida, la pobre Lueri tuvo que soportar incontables injusticias, pero la situación llega a su punto álgido cuando es obligada a casarse y se encuentra atrapada en un matrimonio sin amor. Sin embargo, quizás por obra del destino, una invitación llega a sus manos y le ofrece la oportunidad de escapar de sus desdichas. Para ello, tendrá que entrar al Cofre de las Joyas y mezclarse con la élite del imperio. Allí, en el lugar menos pensado, encontrará valiosos amigos y, tal vez, aquello que siempre anheló... su verdadero amor.', 'En curso', '2024-05-24', 'https://th.bing.com/th/id/OIP.yLExteYD1p1dexpbXwn-3gAAAA?rs=1&pid=ImgDetMain', '', '2025-04-08 19:41:28', '2025-05-28 19:13:05'),
(28, 'El más fuerte del mundo de supervivencia', 'Desconocido ', 'Jin Seoun, que llevaba varios meses desempleado tras terminar el servicio militar, estaba completamente enganchado al juego battle royale «Royal Ground».\nUn día, una misteriosa luz lo transporta repentinamente a un mundo desconocido: Cloyd Survival.\nPronto se da cuenta de que este lugar se parece mucho al juego que solía disfrutar.', 'En curso', '2025-05-01', 'https://dashboard.olympusbiblioteca.com/storage/comics/covers/1519/01-xl.webp', NULL, '2025-05-01 22:00:32', '2025-05-01 22:01:36'),
(30, 'El Regreso Del Archimago Mítico', 'Desconocido', 'El pináculo de la tecnología mágica moderna, un inadaptado incapaz de integrar la inteligencia artificial. Shin Hayul, el mago genio que ha sido desechado. Ante él aparece un libro.\n\n‘Al descendiente que pueda oír esta voz, que posea la misma constitución que la mía, yo, Ray Bell Bytner, le dejo este libro’.\n\nJunto al libro dejado por el legendario archimago, el tiempo detenido de un genio comienza a moverse una vez más', 'En curso', '2025-05-01', 'http://localhost:8060/backend-mhw/public/uploads/portadas/manhwa_30_b099a0c0e6390ea0.jpg', NULL, '2025-05-01 22:20:41', '2025-05-01 22:20:41'),
(31, 'Pick me up, Gacha Infinito', 'Desconocdio', '¡Por el estudio que te trajo Solo Leveling y El Regreso del Héroe de Clase Desastre y Punto de Vista del Lector Omnisciente! El juego gacha para móviles es conocido por ser brutalmente difícil, y nadie ha sido capaz de despejar una mazmorra. Loki, el quinto entre todos los maestros del mundo, pierde el conocimiento mientras intenta despejar la mazmorra. Al despertar, Loki se encuentra convertido en un héroe de nivel 1, \"Islat Han\". \"¡Es él! Estoy seguro de que es él quien me ha traído aquí\". Para volver a la Tierra, ¡debe guiar a maestros novatos y héroes y atravesar el piso 100 de la mazmorra! \"Te metiste con la persona equivocada\". Esta es la historia del maestro Loki, que se ve obligado a llevar a todos a la victoria y no puede permitirse ni una sola derrota.', 'En curso', '2025-06-07', 'https://dashboard.olympusbiblioteca.com/storage/comics/covers/94/gacha-xl.webp', NULL, '2025-06-07 18:26:28', '2025-10-02 20:19:58'),
(32, 'Everyone Loves Her', 'Char Srira', 'La vida de Kang Min-ah ha dado un vuelco debido a su repentina capacidad para teletransportarse. Ahora se enfrenta a una serie de acontecimientos irreversibles provocados por una única decisión. Entre la ira, la confusión y un reprimido sentido de la justicia, Min-Ah se embarca en un nuevo viaje mientras intenta decidir como utilizar su poder. ¿En qué dirección la llevará su poder y qué decisionestomará?', 'En curso', '2025-06-20', 'https://preview.redd.it/everyone-loves-her-anyone-have-anything-like-this-where-v0-eeyvta7lq3ze1.jpeg?auto=webp&s=4539efdfa8a49fe51dd3ab220196cec41fb37ad2', NULL, '2025-06-20 20:14:09', '2025-10-02 20:18:48'),
(33, 'El Mejor Ingeniero del Mundo', 'BK_Moon', 'Cuando el estudiante de ingeniería civil Suho Kim se queda dormido leyendo una novela de fantasía, ¡se despierta como un personaje del libro! Suho se encuentra ahora en el cuerpo de Lloyd Frontera, un noble perezoso al que le encanta beber y cuya familia está sumida en una montaña de deudas. Utilizando sus conocimientos de ingeniería, Suho diseña inventos para evitar el terrible futuro que le aguarda. Con la ayuda de un hámster gigante, un caballero y la magia del mundo, ¿podrá Suho sacar a su nueva familia de las deudas y construir un futuro mejor?', 'Finalizado', '2025-10-02', 'https://gg.asuracomic.net/storage/media/163/conversions/fc6b81ea-optimized.webp', NULL, '2025-10-02 20:30:40', '2025-10-02 20:30:40');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `manhwa_genre`
--
-- Creación: 02-10-2025 a las 20:03:44
--

CREATE TABLE `manhwa_genre` (
  `manhwa_id` int(11) NOT NULL,
  `genero_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `manhwa_genre`
--

INSERT INTO `manhwa_genre` (`manhwa_id`, `genero_id`, `created_at`) VALUES
(1, 1, '2025-04-01 02:21:30'),
(1, 2, '2025-04-01 02:21:30'),
(1, 6, '2025-04-01 02:21:30'),
(1, 7, '2025-04-01 02:21:30'),
(1, 18, '2025-04-01 02:21:30'),
(1, 19, '2025-04-01 02:21:30'),
(1, 21, '2025-04-01 02:21:30'),
(2, 1, '2025-04-01 02:21:30'),
(2, 4, '2025-04-01 02:21:30'),
(2, 6, '2025-04-01 02:21:30'),
(2, 11, '2025-04-01 02:21:30'),
(2, 18, '2025-04-01 02:21:30'),
(2, 21, '2025-04-01 02:21:30'),
(2, 22, '2025-04-01 02:21:30'),
(3, 1, '2025-04-01 02:21:30'),
(3, 2, '2025-04-01 02:21:30'),
(3, 3, '2025-04-01 02:21:30'),
(3, 7, '2025-04-01 02:21:30'),
(3, 9, '2025-04-01 02:21:30'),
(3, 13, '2025-04-01 02:21:30'),
(3, 23, '2025-04-01 02:21:30'),
(3, 24, '2025-04-01 02:21:30'),
(4, 1, '2025-04-01 02:21:30'),
(4, 2, '2025-04-01 02:21:30'),
(4, 6, '2025-04-01 02:21:30'),
(4, 15, '2025-04-01 02:21:30'),
(4, 19, '2025-04-01 02:21:30'),
(4, 23, '2025-04-01 02:21:30'),
(4, 26, '2025-04-01 02:21:30'),
(5, 1, '2025-04-01 02:21:30'),
(5, 2, '2025-04-01 02:21:30'),
(5, 3, '2025-04-01 02:21:30'),
(5, 6, '2025-04-01 02:21:30'),
(5, 7, '2025-04-01 02:21:30'),
(5, 11, '2025-04-01 02:21:30'),
(6, 1, '2025-04-01 02:21:30'),
(6, 6, '2025-04-01 02:21:30'),
(6, 7, '2025-04-01 02:21:30'),
(6, 13, '2025-04-01 02:21:30'),
(6, 15, '2025-04-01 02:21:30'),
(6, 26, '2025-04-01 02:21:30'),
(7, 1, '2025-04-01 02:21:30'),
(7, 7, '2025-04-01 02:21:30'),
(7, 8, '2025-04-01 02:21:30'),
(7, 13, '2025-04-01 02:21:30'),
(7, 16, '2025-04-01 02:21:30'),
(7, 22, '2025-04-01 02:21:30'),
(8, 1, '2025-04-01 02:21:30'),
(8, 4, '2025-04-01 02:21:30'),
(8, 6, '2025-04-01 02:21:30'),
(8, 7, '2025-04-01 02:21:30'),
(8, 10, '2025-04-01 02:21:30'),
(8, 17, '2025-04-01 02:21:30'),
(8, 23, '2025-04-01 02:21:30'),
(8, 24, '2025-04-01 02:21:30'),
(8, 26, '2025-04-01 02:21:30'),
(9, 1, '2025-04-01 02:21:30'),
(9, 2, '2025-04-01 02:21:30'),
(9, 3, '2025-04-01 02:21:30'),
(9, 5, '2025-04-01 02:21:30'),
(9, 7, '2025-04-01 02:21:30'),
(9, 23, '2025-04-01 02:21:30'),
(10, 1, '2025-04-01 02:21:30'),
(10, 5, '2025-04-01 02:21:30'),
(10, 7, '2025-04-01 02:21:30'),
(10, 9, '2025-04-01 02:21:30'),
(10, 23, '2025-04-01 02:21:30'),
(11, 1, '2025-04-01 02:21:30'),
(11, 2, '2025-04-01 02:21:30'),
(11, 3, '2025-04-01 02:21:30'),
(11, 5, '2025-04-01 02:21:30'),
(11, 7, '2025-04-01 02:21:30'),
(11, 21, '2025-04-01 02:21:30'),
(11, 23, '2025-04-01 02:21:30'),
(12, 1, '2025-04-01 02:21:30'),
(12, 2, '2025-04-01 02:21:30'),
(12, 3, '2025-04-01 02:21:30'),
(12, 5, '2025-04-01 02:21:30'),
(12, 6, '2025-04-01 02:21:30'),
(12, 7, '2025-04-01 02:21:30'),
(12, 21, '2025-04-01 02:21:30'),
(12, 23, '2025-04-01 02:21:30'),
(26, 1, '2025-04-08 19:07:20'),
(26, 2, '2025-04-08 19:07:20'),
(26, 18, '2025-04-08 19:07:20'),
(26, 21, '2025-04-08 19:07:20'),
(27, 4, '2025-04-08 19:41:28'),
(27, 7, '2025-04-08 19:41:28'),
(27, 9, '2025-04-08 19:41:28'),
(27, 20, '2025-04-08 19:41:28'),
(28, 1, '2025-05-01 22:00:32'),
(28, 2, '2025-05-01 22:00:32'),
(28, 3, '2025-05-01 22:00:32'),
(28, 18, '2025-05-01 22:00:32'),
(28, 23, '2025-05-01 22:00:32'),
(28, 24, '2025-05-01 22:00:32'),
(30, 1, '2025-05-01 22:20:41'),
(30, 2, '2025-05-01 22:20:41'),
(30, 3, '2025-05-01 22:20:41'),
(30, 18, '2025-05-01 22:20:41'),
(31, 1, '2025-06-07 18:26:28'),
(31, 2, '2025-06-07 18:26:28'),
(31, 3, '2025-06-07 18:26:28'),
(31, 5, '2025-06-07 18:26:28'),
(31, 11, '2025-06-07 18:26:28'),
(31, 23, '2025-06-07 18:26:28'),
(32, 2, '2025-06-20 20:14:09'),
(32, 3, '2025-06-20 20:14:09'),
(32, 7, '2025-06-20 20:14:09'),
(32, 9, '2025-06-20 20:14:09'),
(32, 11, '2025-06-20 20:14:09'),
(32, 19, '2025-06-20 20:14:09'),
(32, 25, '2025-06-20 20:14:09'),
(33, 1, '2025-10-02 20:30:40'),
(33, 3, '2025-10-02 20:30:40'),
(33, 6, '2025-10-02 20:30:40'),
(33, 7, '2025-10-02 20:30:40'),
(33, 18, '2025-10-02 20:30:40'),
(33, 21, '2025-10-02 20:30:40');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `capitulos`
--
ALTER TABLE `capitulos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `manhwa_id` (`manhwa_id`);

--
-- Indices de la tabla `generos`
--
ALTER TABLE `generos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`),
  ADD KEY `idx_generos_nombre` (`nombre`);

--
-- Indices de la tabla `manhwas`
--
ALTER TABLE `manhwas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `titulo` (`titulo`),
  ADD KEY `idx_manhwas_estado` (`estado`),
  ADD KEY `idx_manhwas_fecha` (`fecha_publicacion`);
ALTER TABLE `manhwas` ADD FULLTEXT KEY `idx_busqueda` (`titulo`,`descripcion`);

--
-- Indices de la tabla `manhwa_genre`
--
ALTER TABLE `manhwa_genre`
  ADD PRIMARY KEY (`manhwa_id`,`genero_id`),
  ADD KEY `idx_genero` (`genero_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `capitulos`
--
ALTER TABLE `capitulos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `generos`
--
ALTER TABLE `generos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `manhwas`
--
ALTER TABLE `manhwas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `capitulos`
--
ALTER TABLE `capitulos`
  ADD CONSTRAINT `capitulos_ibfk_1` FOREIGN KEY (`manhwa_id`) REFERENCES `manhwas` (`id`);

--
-- Filtros para la tabla `manhwa_genre`
--
ALTER TABLE `manhwa_genre`
  ADD CONSTRAINT `manhwa_genre_ibfk_1` FOREIGN KEY (`manhwa_id`) REFERENCES `manhwas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `manhwa_genre_ibfk_2` FOREIGN KEY (`genero_id`) REFERENCES `generos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
