-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-04-2025 a las 02:50:55
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
-- Creación: 01-04-2025 a las 04:38:55
--

CREATE TABLE `capitulos` (
  `id` int(11) NOT NULL,
  `manhwa_id` int(11) NOT NULL,
  `numero` decimal(5,1) NOT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `fecha_publicacion` date NOT NULL,
  `paginas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `generos`
--
-- Creación: 25-03-2025 a las 18:17:32
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
-- Creación: 01-04-2025 a las 04:39:14
-- Última actualización: 05-04-2025 a las 00:47:53
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
(5, 'Noblesse', 'Son Jae-Ho', 'Un noble vampiro despierta después de 820 años de sueño y debe proteger a su clan.', 'Finalizado', '2007-12-01', 'https://th.bing.com/th/id/OIP.xgJQu_yJ4-fcF8fVIiIcsAHaLF?rs=1&pid=ImgDetMain', NULL, '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(6, 'Lookism', 'Park Tae-Joon', 'Un estudiante víctima de bullying descubre que puede intercambiar su cuerpo entre dos formas: una extremadamente atractiva y otra menos convencional. Esto le permite explorar temas de apariencia, discriminación y autoestima.', 'En curso', '2014-09-01', 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh1ZykXwdZJeoi45OP5mYof6neeOH8ZHlv2TLbPnBiE9RMzn-MXn1BkYxy1oVcp4PIspSczWmUDQAsoKt0PDlHxXx46cSDEq0FsZdvBdd-0kTlFtMpZ-Xw7hNhYHZv5PcsKkqQXlkzeRyM/s1600/1675670005053653-1.png', NULL, '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(7, 'Sweet Home', 'Youngchan Hwang\" (escritor) y \"Carnby Kim\" (ilustrador)', 'Un grupo de personas lucha por sobrevivir en un mundo donde los humanos se convierten en monstruos.', 'Finalizado', '2017-09-01', 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1664994196i/62889023.jpg', NULL, '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(8, 'Girls of the Wild\'s', 'Hun', 'Un joven se une a una academia exclusiva para mujeres y descubre secretos inesperados.', 'En curso', '2011-04-15', 'https://4.bp.blogspot.com/-rzUCKwDfoOU/WIZdjGo1F1I/AAAAAAAAAew/kLrBobHEygct0P3QC50aSRNfUEKimiO5gCLcB/s1600/3221911-girls%252Bof%252Bthe%252Bwild%2527s.jpg', NULL, '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(9, 'DICE: The Cube that Changes Everything', 'Yoon Hyun-Seok', 'Un estudiante común obtiene un cubo mágico que le otorga poderes especiales.', 'Finalizado', '2013-09-20', 'https://misskick.vn/wp-content/uploads/2022/07/top-truyen-manhwa-hay-nhat-cua-han-quoc-nen-xem-ngay-11.jpg', NULL, '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(10, 'Trace', 'Lee Jong-Beom', 'Un joven con habilidades únicas es perseguido por una organización secreta.', 'En curso', '2014-07-10', 'https://th.bing.com/th/id/OIP.oV9GpX_z07g04DMGph9WmwHaKR?w=577&h=800&rs=1&pid=ImgDetMain', NULL, '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(11, 'Second Life Ranker', 'Seok Jeong-Hyun', 'Un hombre regresa a su infancia para corregir sus errores y alcanzar el éxito.', 'En curso', '2016-08-01', 'https://th.bing.com/th/id/OIP.AL5fN4whMqbNf-KHvsQFAwHaLH?rs=1&pid=ImgDetMain', NULL, '2025-04-01 02:21:30', '2025-04-01 02:21:30'),
(12, 'Omniscient Reader\'s Viewpoint', 'Sing Shong (novela original), dibujado por SuHo Ahn', 'Kim Dokja es un bibliotecario común que ha dedicado su vida a leer novelas web. Un día, descubre que el mundo real ha comenzado a transformarse en la trama de una novela que leyó hace años: \"Regresión del Fin del Mundo\". Sin embargo, esta vez, él ya no es solo un espectador. Kim Dokja tiene conocimientos privilegiados sobre los eventos futuros, pero pronto se da cuenta de que el destino está cambiando y no todo será como lo recordaba.', 'En curso', '2020-01-01', 'https://gg.asuracomic.net/storage/media/105/conversions/9b59fdec-optimized.webp', NULL, '2025-04-01 02:21:30', '2025-04-01 02:21:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `manhwa_genre`
--
-- Creación: 01-04-2025 a las 04:39:14
-- Última actualización: 05-04-2025 a las 00:47:53
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
(12, 23, '2025-04-01 02:21:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reseñas`
--
-- Creación: 01-04-2025 a las 04:38:26
--

CREATE TABLE `reseñas` (
  `id` int(11) NOT NULL,
  `manhwa_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `puntuacion` tinyint(4) NOT NULL CHECK (`puntuacion` between 1 and 5),
  `comentario` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--
-- Creación: 01-04-2025 a las 04:38:26
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `capitulos`
--
ALTER TABLE `capitulos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idx_manhwa_capitulo` (`manhwa_id`,`numero`);

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
-- Indices de la tabla `reseñas`
--
ALTER TABLE `reseñas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `manhwa_id` (`manhwa_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idx_email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `capitulos`
--
ALTER TABLE `capitulos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `generos`
--
ALTER TABLE `generos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `manhwas`
--
ALTER TABLE `manhwas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `reseñas`
--
ALTER TABLE `reseñas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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

--
-- Filtros para la tabla `reseñas`
--
ALTER TABLE `reseñas`
  ADD CONSTRAINT `reseñas_ibfk_1` FOREIGN KEY (`manhwa_id`) REFERENCES `manhwas` (`id`),
  ADD CONSTRAINT `reseñas_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
