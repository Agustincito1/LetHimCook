-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-10-2025 a las 19:41:13
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
-- Base de datos: `lethimcook`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `opinion`
--

CREATE TABLE `opinion` (
  `id_opinion` int(5) NOT NULL,
  `id_usuario` int(5) DEFAULT NULL,
  `id_receta` int(5) DEFAULT NULL,
  `mensaje` varchar(1000) NOT NULL,
  `puntaje` float NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `receta`
--

CREATE TABLE `receta` (
  `id_receta` int(5) NOT NULL,
  `id_usuario` int(5) DEFAULT NULL,
  `titulo` varchar(50) NOT NULL,
  `pasos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`pasos`)),
  `descripcion` varchar(1000) NOT NULL,
  `imagenes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`imagenes`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `receta`
--

INSERT INTO `receta` (`id_receta`, `id_usuario`, `titulo`, `pasos`, `descripcion`, `imagenes`) VALUES
(29, 1, 'empadanas', '\"123213\"', '123123', '{\"principal\":\"..\\/uploads\\/receta_68dc10b45c3c2.png\",\"pasos\":[]}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recetaguardada`
--

CREATE TABLE `recetaguardada` (
  `id_recetaGuardada` int(5) NOT NULL,
  `id_usuario` int(5) DEFAULT NULL,
  `id_receta` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_usuario`
--

CREATE TABLE `tipo_usuario` (
  `id_tipoUsuario` int(5) NOT NULL,
  `tipo` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_usuario`
--

INSERT INTO `tipo_usuario` (`id_tipoUsuario`, `tipo`) VALUES
(1, 'Admin'),
(2, 'Comun');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(5) NOT NULL,
  `nombreUsuario` varchar(20) NOT NULL,
  `contraseña` varchar(30) NOT NULL,
  `id_tipoUsuario` int(5) DEFAULT NULL,
  `gmail` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombreUsuario`, `contraseña`, `id_tipoUsuario`, `gmail`) VALUES
(1, 'Gus', '123', 2, 'agustinlazari594@gmail.com');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `opinion`
--
ALTER TABLE `opinion`
  ADD PRIMARY KEY (`id_opinion`),
  ADD KEY `id_usuario` (`id_usuario`,`id_receta`),
  ADD KEY `id_receta` (`id_receta`);

--
-- Indices de la tabla `receta`
--
ALTER TABLE `receta`
  ADD PRIMARY KEY (`id_receta`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `recetaguardada`
--
ALTER TABLE `recetaguardada`
  ADD PRIMARY KEY (`id_recetaGuardada`),
  ADD KEY `id_usuario` (`id_usuario`,`id_receta`),
  ADD KEY `id_receta` (`id_receta`);

--
-- Indices de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  ADD PRIMARY KEY (`id_tipoUsuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `id_tipoUsuario` (`id_tipoUsuario`),
  ADD KEY `id_tipoUsuario_2` (`id_tipoUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `opinion`
--
ALTER TABLE `opinion`
  MODIFY `id_opinion` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `receta`
--
ALTER TABLE `receta`
  MODIFY `id_receta` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `recetaguardada`
--
ALTER TABLE `recetaguardada`
  MODIFY `id_recetaGuardada` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  MODIFY `id_tipoUsuario` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `opinion`
--
ALTER TABLE `opinion`
  ADD CONSTRAINT `opinion_ibfk_1` FOREIGN KEY (`id_receta`) REFERENCES `receta` (`id_receta`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `opinion_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `receta`
--
ALTER TABLE `receta`
  ADD CONSTRAINT `receta_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `recetaguardada`
--
ALTER TABLE `recetaguardada`
  ADD CONSTRAINT `recetaGuardada_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `recetaGuardada_ibfk_2` FOREIGN KEY (`id_receta`) REFERENCES `receta` (`id_receta`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_tipoUsuario`) REFERENCES `tipo_usuario` (`id_tipoUsuario`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
