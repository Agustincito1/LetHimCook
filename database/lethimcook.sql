-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-10-2025 a las 04:47:24
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
-- Estructura de tabla para la tabla `cantidad_ingredientes`
--

CREATE TABLE `cantidad_ingredientes` (
  `id_cantidadIng` int(5) NOT NULL,
  `cantidad` text NOT NULL,
  `id_ingrediente` int(5) DEFAULT NULL,
  `id_receta` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cantidad_ingredientes`
--

INSERT INTO `cantidad_ingredientes` (`id_cantidadIng`, `cantidad`, `id_ingrediente`, `id_receta`) VALUES
(1, '2', 953, 45),
(2, '2', 10414, 45);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingredientes`
--

CREATE TABLE `ingredientes` (
  `id_ingrediente` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `id_tipoUnidad` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ingredientes`
--

INSERT INTO `ingredientes` (`id_ingrediente`, `nombre`, `id_tipoUnidad`) VALUES
(1, 'Pimienta fresco', 11),
(2, 'Rúcula fresco', 6),
(3, 'Batata en cubos', 6),
(4, 'Albahaca en rodajas', 19),
(5, 'Clavo picado', 11),
(6, 'Salsa de tomate fresco', 16),
(7, 'Trucha seco', 2),
(8, 'Harina de garbanzo en rodajas', 1),
(9, 'Harina de maíz seco', 1),
(10, 'Caldo de verduras fresco', 1),
(11, 'Salsa soja en cubos', 16),
(12, 'Laurel entero', 19),
(13, 'Agua', 5),
(14, 'Mayonesa', 16),
(15, 'Sandía fresco', 6),
(16, 'Manzana triturado', 6),
(17, 'Leche de almendras entero', 5),
(18, 'Leche de almendras en rodajas', 5),
(19, 'Mandarina fresco', 6),
(20, 'Canela en cubos', 11),
(21, 'Harina integral en rodajas', 1),
(22, 'Leche de avena entero', 5),
(23, 'Cereal rallado', 2),
(24, 'Ciruela rallado', 6),
(25, 'Durazno en rodajas', 6),
(26, 'Cereal picado', 2),
(27, 'Salsa picante picado', 16),
(28, 'Mandarina rallado', 6),
(29, 'Mora triturado', 6),
(30, 'Carne de res seco', 2),
(31, 'Manzana en rodajas', 6),
(32, 'Caldo de pollo', 1),
(33, 'Carne de cerdo seco', 2),
(34, 'Papa en cubos', 6),
(35, 'Fideo fresco', 2),
(36, 'Leche de almendras en cubos', 5),
(37, 'Calamar', 2),
(38, 'Miel en rodajas', 1),
(39, 'Mora rallado', 6),
(40, 'Calabaza', 6),
(41, 'Romero fresco', 19),
(42, 'Batata picado', 6),
(43, 'Arroz rallado', 2),
(44, 'Menta entero', 19),
(45, 'Leche', 4),
(46, 'Harina de trigo', 1),
(47, 'Trucha picado', 2),
(48, 'Mayonesa seco', 16),
(50, 'Frutilla', 6),
(51, 'Zanahoria fresco', 6),
(52, 'Huevo fresco', 6),
(53, 'Jengibre triturado', 11),
(54, 'Merluza triturado', 2),
(55, 'Menta', 19),
(56, 'Romero picado', 19),
(57, 'Pomelo en cubos', 6),
(58, 'Miel en cubos', 1),
(59, 'Huevo', 6),
(60, 'Cilantro picado', 19),
(61, 'Vino tinto entero', 5),
(62, 'Huevo de codorniz entero', 6),
(63, 'Repollo picado', 6),
(64, 'Harina de trigo fresco', 1),
(65, 'Leche en cubos', 4),
(66, 'Pavo seco', 2),
(67, 'Huevo en rodajas', 6),
(68, 'Arroz seco', 2),
(69, 'Sandía entero', 6),
(70, 'Chocolate en rodajas', 1),
(71, 'Pepino triturado', 6),
(72, 'Salmón fresco', 2),
(73, 'Cereza entero', 6),
(74, 'Kiwi en rodajas', 6),
(75, 'Pera en cubos', 6),
(76, 'Frambuesa fresco', 6),
(77, 'Batata en rodajas', 6),
(78, 'Huevo de codorniz en rodajas', 6),
(79, 'Cúrcuma fresco', 11),
(80, 'Albahaca seco', 19),
(81, 'Aceite de girasol triturado', 8),
(82, 'Salsa de tomate entero', 16),
(83, 'Pavo entero', 2),
(85, 'Repollo rallado', 6),
(86, 'Vino blanco en rodajas', 5),
(87, 'Banana en cubos', 6),
(88, 'Naranja en cubos', 6),
(89, 'Calabaza fresco', 6),
(90, 'Agua en rodajas', 5),
(91, 'Trucha rallado', 2),
(92, 'Menta rallado', 19),
(93, 'Fideo seco', 2),
(94, 'Nuez moscada picado', 11),
(95, 'Garbanzos en rodajas', 2),
(96, 'Nuez moscada seco', 11),
(97, 'Papa seco', 6),
(98, 'Harina de trigo entero', 1),
(101, 'Espinaca en rodajas', 6),
(102, 'Cereza en rodajas', 6),
(103, 'Batata', 6),
(104, 'Repollo entero', 6),
(105, 'Polvo de hornear en rodajas', 1),
(106, 'Pavo', 2),
(107, 'Gelatina', 1),
(108, 'Poroto triturado', 2),
(112, 'Pomelo en rodajas', 6),
(114, 'Menta seco', 19),
(115, 'Espinaca', 6),
(118, 'Agua fresco', 5),
(119, 'Comino en rodajas', 11),
(120, 'Coliflor rallado', 6),
(121, 'Calamar en cubos', 2),
(123, 'Naranja triturado', 6),
(125, 'Cereza en cubos', 6),
(126, 'Cacao en polvo en rodajas', 1),
(127, 'Sal', 11),
(128, 'Manzana rallado', 6),
(129, 'Calabaza en cubos', 6),
(130, 'Aceite de girasol fresco', 8),
(131, 'Mayonesa en rodajas', 16),
(132, 'Salsa barbacoa triturado', 16),
(133, 'Bechamel triturado', 16),
(134, 'Cordero fresco', 2),
(135, 'Salsa pesto en rodajas', 16),
(136, 'Manteca picado', 4),
(137, 'Cereza rallado', 6),
(138, 'Crema seco', 4),
(139, 'Harina de garbanzo triturado', 1),
(140, 'Atún picado', 2),
(141, 'Mejillón fresco', 2),
(142, 'Salsa de tomate picado', 16),
(143, 'Leche de almendras', 5),
(144, 'Pavo en cubos', 2),
(145, 'Manteca en cubos', 4),
(146, 'Salsa barbacoa rallado', 16),
(147, 'Chocolate triturado', 1),
(148, 'Carne de res en cubos', 2),
(149, 'Salmón', 2),
(150, 'Rúcula entero', 6),
(151, 'Langostino picado', 2),
(152, 'Harina de garbanzo fresco', 1),
(153, 'Leche de soja rallado', 5),
(154, 'Pollo en cubos', 2),
(155, 'Aceite vegetal rallado', 8),
(156, 'Salsa picante fresco', 16),
(158, 'Naranja en rodajas', 6),
(159, 'Frutilla entero', 6),
(160, 'Carne de cerdo triturado', 2),
(161, 'Aceite de oliva rallado', 8),
(162, 'Sal rallado', 11),
(163, 'Orégano fresco', 19),
(164, 'Aceite de girasol en rodajas', 8),
(166, 'Cúrcuma en rodajas', 11),
(167, 'Perejil fresco', 19),
(168, 'Jengibre en cubos', 11),
(169, 'Aceite vegetal seco', 8),
(170, 'Harina de avena picado', 1),
(171, 'Clavo entero', 11),
(172, 'Azafrán rallado', 11),
(173, 'Salsa barbacoa en cubos', 16),
(174, 'Coco rallado', 1),
(175, 'Caldo de verduras en rodajas', 1),
(176, 'Leche de soja en cubos', 5),
(177, 'Albahaca entero', 19),
(178, 'Durazno triturado', 6),
(179, 'Nuez moscada rallado', 11),
(180, 'Sardina en rodajas', 2),
(181, 'Salsa de tomate en rodajas', 16),
(182, 'Pepino', 6),
(185, 'Leche de soja fresco', 5),
(186, 'Leche de soja picado', 5),
(187, 'Arroz en rodajas', 2),
(188, 'Mayonesa en cubos', 16),
(189, 'Yogur fresco', 4),
(191, 'Harina de garbanzo', 1),
(192, 'Pollo', 2),
(193, 'Tomillo triturado', 19),
(194, 'Pimienta en rodajas', 11),
(195, 'Laurel triturado', 19),
(196, 'Polvo de hornear entero', 1),
(197, 'Azúcar rallado', 1),
(198, 'Gelatina rallado', 1),
(200, 'Pomelo', 6),
(201, 'Albahaca en cubos', 19),
(202, 'Caldo de pollo en cubos', 1),
(203, 'Leche picado', 4),
(204, 'Cerveza', 5),
(205, 'Durazno fresco', 6),
(206, 'Vino blanco', 5),
(207, 'Manteca rallado', 4),
(208, 'Salsa barbacoa en rodajas', 16),
(209, 'Pera', 6),
(210, 'Pimienta triturado', 11),
(211, 'Pimiento picado', 6),
(212, 'Perejil en cubos', 19),
(213, 'Mayonesa picado', 16),
(214, 'Mandarina', 6),
(215, 'Melón picado', 6),
(216, 'Harina de avena en cubos', 1),
(217, 'Agua seco', 5),
(218, 'Poroto entero', 2),
(219, 'Arándano', 6),
(220, 'Pepino entero', 6),
(222, 'Mandarina picado', 6),
(224, 'Queso picado', 4),
(225, 'Chocolate en cubos', 1),
(227, 'Cebolla fresco', 6),
(228, 'Harina de garbanzo seco', 1),
(229, 'Pimiento rallado', 6),
(230, 'Pomelo picado', 6),
(231, 'Aceite de oliva fresco', 8),
(232, 'Arándano fresco', 6),
(233, 'Sal en rodajas', 11),
(234, 'Espinaca rallado', 6),
(235, 'Aceite vegetal entero', 8),
(236, 'Laurel en cubos', 19),
(237, 'Romero', 19),
(238, 'Coliflor picado', 6),
(239, 'Pavo picado', 2),
(240, 'Naranja entero', 6),
(243, 'Merluza entero', 2),
(244, 'Menta en rodajas', 19),
(245, 'Pollo entero', 2),
(246, 'Cereal', 2),
(247, 'Frambuesa rallado', 6),
(248, 'Gelatina en cubos', 1),
(249, 'Pavo en rodajas', 2),
(250, 'Arroz triturado', 2),
(251, 'Miel', 1),
(252, 'Bechamel rallado', 16),
(253, 'Poroto en cubos', 2),
(254, 'Atún triturado', 2),
(255, 'Azafrán picado', 11),
(256, 'Sandía en cubos', 6),
(258, 'Carne de cerdo en cubos', 2),
(259, 'Salsa barbacoa fresco', 16),
(260, 'Jarabe de arce rallado', 1),
(261, 'Aceite vegetal fresco', 8),
(262, 'Crema picado', 4),
(263, 'Laurel fresco', 19),
(264, 'Cacao en polvo triturado', 1),
(266, 'Aceite de girasol entero', 8),
(267, 'Lechuga fresco', 6),
(268, 'Melón triturado', 6),
(269, 'Acelga seco', 6),
(270, 'Poroto picado', 2),
(271, 'Durazno entero', 6),
(272, 'Zanahoria', 6),
(275, 'Lenteja picado', 2),
(276, 'Vino blanco picado', 5),
(277, 'Banana rallado', 6),
(278, 'Polvo de hornear rallado', 1),
(279, 'Mejillón en rodajas', 2),
(280, 'Miel triturado', 1),
(281, 'Leche de avena rallado', 5),
(283, 'Gelatina triturado', 1),
(284, 'Poroto fresco', 2),
(285, 'Cordero', 2),
(287, 'Jarabe de arce fresco', 1),
(288, 'Papa en rodajas', 6),
(289, 'Quinoa entero', 2),
(291, 'Ciruela entero', 6),
(293, 'Leche de soja en rodajas', 5),
(294, 'Cilantro en rodajas', 19),
(296, 'Tomillo rallado', 19),
(297, 'Perejil entero', 19),
(298, 'Tomillo', 19),
(299, 'Pepino en rodajas', 6),
(300, 'Zanahoria rallado', 6),
(301, 'Higo entero', 6),
(302, 'Albahaca picado', 19),
(303, 'Huevo seco', 6),
(304, 'Salmón rallado', 2),
(305, 'Frutilla en cubos', 6),
(306, 'Jengibre en rodajas', 11),
(308, 'Azúcar picado', 1),
(309, 'Cilantro entero', 19),
(311, 'Salsa pesto fresco', 16),
(313, 'Romero en cubos', 19),
(314, 'Manzana en cubos', 6),
(315, 'Canela picado', 11),
(317, 'Jengibre picado', 11),
(318, 'Cilantro', 19),
(319, 'Gelatina picado', 1),
(320, 'Higo triturado', 6),
(321, 'Azúcar en rodajas', 1),
(322, 'Huevo de codorniz fresco', 6),
(323, 'Cacao en polvo picado', 1),
(324, 'Pomelo rallado', 6),
(325, 'Papa rallado', 6),
(328, 'Canela en rodajas', 11),
(329, 'Mora en cubos', 6),
(330, 'Azúcar entero', 1),
(331, 'Leche de almendras picado', 5),
(332, 'Durazno en cubos', 6),
(333, 'Cacao en polvo fresco', 1),
(334, 'Azafrán en rodajas', 11),
(336, 'Higo rallado', 6),
(337, 'Trucha fresco', 2),
(342, 'Repollo', 6),
(346, 'Atún fresco', 2),
(347, 'Perejil en rodajas', 19),
(348, 'Harina de avena entero', 1),
(349, 'Harina integral seco', 1),
(350, 'Azúcar fresco', 1),
(352, 'Harina de maíz', 1),
(353, 'Acelga en cubos', 6),
(354, 'Batata triturado', 6),
(355, 'Pera en rodajas', 6),
(357, 'Ciruela picado', 6),
(360, 'Vino blanco rallado', 5),
(361, 'Laurel en rodajas', 19),
(362, 'Merluza seco', 2),
(363, 'Cordero seco', 2),
(366, 'Espinaca picado', 6),
(367, 'Harina de avena seco', 1),
(369, 'Brócoli entero', 6),
(370, 'Crema rallado', 4),
(372, 'Pera seco', 6),
(373, 'Harina de trigo en rodajas', 1),
(374, 'Carne de res en rodajas', 2),
(375, 'Yogur en cubos', 4),
(376, 'Agua triturado', 5),
(378, 'Gelatina fresco', 1),
(379, 'Lechuga en cubos', 6),
(380, 'Coliflor en cubos', 6),
(381, 'Calamar entero', 2),
(382, 'Jengibre rallado', 11),
(383, 'Queso en rodajas', 4),
(389, 'Langostino en rodajas', 2),
(390, 'Gelatina en rodajas', 1),
(391, 'Polvo de hornear picado', 1),
(392, 'Jarabe de arce triturado', 1),
(393, 'Naranja', 6),
(397, 'Orégano entero', 19),
(398, 'Cordero en cubos', 2),
(399, 'Bechamel entero', 16),
(400, 'Acelga fresco', 6),
(402, 'Tomillo fresco', 19),
(403, 'Aceite de oliva triturado', 8),
(406, 'Quinoa', 2),
(407, 'Tomillo entero', 19),
(409, 'Banana', 6),
(410, 'Canela rallado', 11),
(411, 'Menta triturado', 19),
(412, 'Calabaza en rodajas', 6),
(414, 'Aceite de oliva en rodajas', 8),
(415, 'Sal fresco', 11),
(418, 'Arándano rallado', 6),
(420, 'Pollo fresco', 2),
(422, 'Yogur picado', 4),
(423, 'Merluza rallado', 2),
(424, 'Zanahoria triturado', 6),
(425, 'Laurel seco', 19),
(427, 'Durazno seco', 6),
(428, 'Cereal fresco', 2),
(429, 'Harina de trigo rallado', 1),
(430, 'Pimiento seco', 6),
(432, 'Papa entero', 6),
(433, 'Sal en cubos', 11),
(435, 'Harina de avena', 1),
(436, 'Aceite de oliva en cubos', 8),
(437, 'Sandía picado', 6),
(439, 'Caldo de pollo entero', 1),
(440, 'Garbanzos triturado', 2),
(441, 'Salsa soja fresco', 16),
(442, 'Fideo triturado', 2),
(445, 'Nuez moscada en cubos', 11),
(446, 'Mejillón en cubos', 2),
(447, 'Agua rallado', 5),
(448, 'Cerveza en rodajas', 5),
(449, 'Brócoli en cubos', 6),
(451, 'Cilantro seco', 19),
(454, 'Harina de maíz rallado', 1),
(455, 'Jengibre fresco', 11),
(460, 'Cúrcuma seco', 11),
(464, 'Cereza', 6),
(465, 'Merluza fresco', 2),
(466, 'Caldo de verduras seco', 1),
(468, 'Pavo triturado', 2),
(469, 'Brócoli rallado', 6),
(470, 'Aceite vegetal en rodajas', 8),
(471, 'Repollo en rodajas', 6),
(472, 'Harina integral entero', 1),
(473, 'Agua en cubos', 5),
(474, 'Harina integral rallado', 1),
(475, 'Harina integral triturado', 1),
(476, 'Leche de soja entero', 5),
(478, 'Queso', 4),
(479, 'Cerveza fresco', 5),
(482, 'Bechamel', 16),
(483, 'Cereal seco', 2),
(485, 'Merluza en cubos', 2),
(487, 'Carne de res entero', 2),
(490, 'Calabaza seco', 6),
(492, 'Acelga rallado', 6),
(493, 'Calamar fresco', 2),
(494, 'Coco rallado picado', 1),
(499, 'Huevo picado', 6),
(501, 'Carne de res triturado', 2),
(502, 'Aceite vegetal', 8),
(503, 'Cacao en polvo rallado', 1),
(504, 'Harina de trigo en cubos', 1),
(505, 'Vino blanco seco', 5),
(507, 'Orégano seco', 19),
(509, 'Cacao en polvo seco', 1),
(511, 'Leche de soja', 5),
(513, 'Arroz picado', 2),
(514, 'Harina de avena triturado', 1),
(516, 'Papa picado', 6),
(518, 'Romero en rodajas', 19),
(519, 'Canela fresco', 11),
(520, 'Salmón seco', 2),
(521, 'Coco rallado entero', 1),
(522, 'Lechuga', 6),
(524, 'Cordero rallado', 2),
(526, 'Cebolla triturado', 6),
(528, 'Manteca', 4),
(530, 'Caldo de pollo fresco', 1),
(531, 'Leche seco', 4),
(534, 'Melón en cubos', 6),
(535, 'Clavo', 11),
(536, 'Pimiento en rodajas', 6),
(539, 'Tomillo picado', 19),
(542, 'Salsa de tomate triturado', 16),
(544, 'Aceite vegetal picado', 8),
(546, 'Yogur', 4),
(547, 'Carne de res', 2),
(551, 'Langostino triturado', 2),
(552, 'Queso entero', 4),
(553, 'Trucha entero', 2),
(554, 'Merluza picado', 2),
(555, 'Canela', 11),
(556, 'Zanahoria entero', 6),
(557, 'Clavo triturado', 11),
(561, 'Comino fresco', 11),
(562, 'Miel entero', 1),
(563, 'Lenteja en rodajas', 2),
(564, 'Leche de soja seco', 5),
(565, 'Lechuga entero', 6),
(566, 'Lenteja entero', 2),
(567, 'Durazno rallado', 6),
(569, 'Leche fresco', 4),
(570, 'Manteca seco', 4),
(571, 'Cerveza picado', 5),
(574, 'Crema triturado', 4),
(575, 'Melón rallado', 6),
(576, 'Mora picado', 6),
(580, 'Acelga triturado', 6),
(581, 'Yogur en rodajas', 4),
(583, 'Jarabe de arce picado', 1),
(585, 'Papa triturado', 6),
(586, 'Pimiento en cubos', 6),
(591, 'Ciruela triturado', 6),
(592, 'Durazno picado', 6),
(593, 'Naranja rallado', 6),
(595, 'Mostaza en cubos', 16),
(597, 'Aceite de oliva seco', 8),
(598, 'Albahaca', 19),
(599, 'Atún rallado', 2),
(600, 'Aceite de girasol en cubos', 8),
(601, 'Miel fresco', 1),
(602, 'Mora entero', 6),
(604, 'Tomillo en rodajas', 19),
(608, 'Mostaza triturado', 16),
(613, 'Salsa picante entero', 16),
(614, 'Fideo', 2),
(617, 'Calabaza rallado', 6),
(618, 'Polvo de hornear triturado', 1),
(620, 'Mejillón rallado', 2),
(621, 'Caldo de verduras', 1),
(624, 'Caldo de pollo triturado', 1),
(627, 'Pimiento triturado', 6),
(628, 'Quinoa picado', 2),
(631, 'Jarabe de arce', 1),
(632, 'Comino triturado', 11),
(633, 'Cúrcuma triturado', 11),
(635, 'Menta picado', 19),
(637, 'Salsa barbacoa seco', 16),
(640, 'Mejillón seco', 2),
(643, 'Manzana entero', 6),
(647, 'Sardina en cubos', 2),
(648, 'Brócoli fresco', 6),
(650, 'Crema', 4),
(653, 'Lechuga picado', 6),
(654, 'Cereal en cubos', 2),
(657, 'Canela seco', 11),
(658, 'Clavo fresco', 11),
(659, 'Manzana', 6),
(662, 'Acelga entero', 6),
(663, 'Pollo picado', 2),
(664, 'Arándano seco', 6),
(666, 'Rúcula', 6),
(667, 'Garbanzos seco', 2),
(673, 'Orégano rallado', 19),
(674, 'Arándano picado', 6),
(675, 'Kiwi triturado', 6),
(680, 'Aceite de girasol picado', 8),
(684, 'Salsa picante seco', 16),
(686, 'Naranja seco', 6),
(688, 'Leche triturado', 4),
(692, 'Azúcar en cubos', 1),
(694, 'Carne de cerdo rallado', 2),
(696, 'Cerveza rallado', 5),
(697, 'Chocolate seco', 1),
(698, 'Cerveza en cubos', 5),
(699, 'Romero seco', 19),
(700, 'Salmón en cubos', 2),
(701, 'Cordero en rodajas', 2),
(703, 'Perejil rallado', 19),
(704, 'Cordero entero', 2),
(705, 'Sandía seco', 6),
(707, 'Sal entero', 11),
(710, 'Higo fresco', 6),
(711, 'Brócoli en rodajas', 6),
(717, 'Fideo picado', 2),
(718, 'Mora seco', 6),
(720, 'Garbanzos en cubos', 2),
(726, 'Bechamel seco', 16),
(727, 'Garbanzos entero', 2),
(729, 'Quinoa triturado', 2),
(730, 'Repollo en cubos', 6),
(733, 'Pollo en rodajas', 2),
(735, 'Mandarina entero', 6),
(736, 'Calabaza picado', 6),
(737, 'Repollo fresco', 6),
(738, 'Carne de cerdo entero', 2),
(739, 'Leche de almendras rallado', 5),
(745, 'Azafrán triturado', 11),
(748, 'Banana seco', 6),
(749, 'Trucha', 2),
(751, 'Frambuesa en cubos', 6),
(752, 'Leche de almendras fresco', 5),
(753, 'Batata seco', 6),
(761, 'Albahaca triturado', 19),
(763, 'Polvo de hornear seco', 1),
(764, 'Salmón picado', 2),
(767, 'Arroz entero', 2),
(769, 'Salsa soja rallado', 16),
(771, 'Higo en rodajas', 6),
(774, 'Pomelo fresco', 6),
(776, 'Mostaza entero', 16),
(779, 'Kiwi', 6),
(781, 'Nuez moscada en rodajas', 11),
(783, 'Rúcula en cubos', 6),
(784, 'Pomelo entero', 6),
(787, 'Harina de maíz en cubos', 1),
(788, 'Cebolla picado', 6),
(789, 'Comino rallado', 11),
(790, 'Huevo en cubos', 6),
(792, 'Acelga picado', 6),
(796, 'Mayonesa entero', 16),
(797, 'Kiwi en cubos', 6),
(798, 'Leche de avena fresco', 5),
(799, 'Azúcar triturado', 1),
(805, 'Espinaca en cubos', 6),
(806, 'Caldo de verduras rallado', 1),
(807, 'Garbanzos rallado', 2),
(809, 'Polvo de hornear fresco', 1),
(812, 'Mostaza fresco', 16),
(816, 'Mostaza en rodajas', 16),
(818, 'Laurel picado', 19),
(819, 'Garbanzos', 2),
(820, 'Mora en rodajas', 6),
(821, 'Lenteja triturado', 2),
(825, 'Calamar en rodajas', 2),
(829, 'Cilantro rallado', 19),
(830, 'Salsa picante', 16),
(832, 'Leche de almendras seco', 5),
(834, 'Higo', 6),
(835, 'Acelga', 6),
(839, 'Cilantro en cubos', 19),
(840, 'Banana triturado', 6),
(841, 'Ternera seco', 2),
(842, 'Perejil', 19),
(844, 'Clavo en cubos', 11),
(847, 'Harina de trigo seco', 1),
(849, 'Espinaca fresco', 6),
(850, 'Canela triturado', 11),
(859, 'Coco rallado seco', 1),
(861, 'Harina de trigo picado', 1),
(862, 'Sardina seco', 2),
(864, 'Frambuesa', 6),
(869, 'Azúcar', 1),
(873, 'Harina de garbanzo en cubos', 1),
(875, 'Vino tinto', 5),
(876, 'Caldo de pollo seco', 1),
(882, 'Agua entero', 5),
(883, 'Lechuga triturado', 6),
(886, 'Quinoa en rodajas', 2),
(889, 'Polvo de hornear en cubos', 1),
(890, 'Albahaca rallado', 19),
(891, 'Manteca fresco', 4),
(893, 'Sal picado', 11),
(897, 'Bechamel en rodajas', 16),
(899, 'Salsa de tomate rallado', 16),
(900, 'Pollo triturado', 2),
(903, 'Langostino seco', 2),
(904, 'Mora', 6),
(905, 'Huevo de codorniz rallado', 6),
(907, 'Arroz en cubos', 2),
(908, 'Crema entero', 4),
(910, 'Cúrcuma entero', 11),
(916, 'Pera rallado', 6),
(920, 'Crema fresco', 4),
(921, 'Arroz fresco', 2),
(922, 'Sardina entero', 2),
(925, 'Aceite vegetal en cubos', 8),
(926, 'Miel picado', 1),
(927, 'Calabaza triturado', 6),
(931, 'Cacao en polvo en cubos', 1),
(935, 'Kiwi seco', 6),
(937, 'Caldo de verduras en cubos', 1),
(939, 'Mejillón triturado', 2),
(942, 'Melón en rodajas', 6),
(943, 'Manteca entero', 4),
(948, 'Sardina', 2),
(953, 'Aceite de girasol', 8),
(956, 'Jarabe de arce entero', 1),
(963, 'Salsa pesto', 16),
(967, 'Cereza fresco', 6),
(968, 'Lechuga en rodajas', 6),
(969, 'Perejil triturado', 19),
(972, 'Frambuesa seco', 6),
(975, 'Mostaza seco', 16),
(976, 'Cúrcuma rallado', 11),
(982, 'Papa fresco', 6),
(986, 'Miel rallado', 1),
(989, 'Manteca triturado', 4),
(990, 'Salsa soja picado', 16),
(992, 'Carne de cerdo', 2),
(993, 'Coliflor fresco', 6),
(996, 'Cerveza entero', 5),
(1000, 'Cebolla seco', 6),
(1003, 'Queso triturado', 4),
(1004, 'Pimiento fresco', 6),
(1017, 'Crema en rodajas', 4),
(1020, 'Calabaza entero', 6),
(1024, 'Salsa soja triturado', 16),
(1030, 'Mostaza rallado', 16),
(1038, 'Huevo de codorniz', 6),
(1040, 'Polvo de hornear', 1),
(1041, 'Kiwi entero', 6),
(1042, 'Aceite de oliva entero', 8),
(1044, 'Brócoli seco', 6),
(1049, 'Fideo rallado', 2),
(1055, 'Azafrán en cubos', 11),
(1056, 'Salsa pesto entero', 16),
(1058, 'Mandarina seco', 6),
(1059, 'Poroto en rodajas', 2),
(1061, 'Calamar picado', 2),
(1067, 'Atún', 2),
(1070, 'Sandía en rodajas', 6),
(1073, 'Caldo de pollo en rodajas', 1),
(1077, 'Atún entero', 2),
(1078, 'Pimienta entero', 11),
(1079, 'Leche de almendras triturado', 5),
(1086, 'Coco rallado en rodajas', 1),
(1088, 'Jarabe de arce seco', 1),
(1089, 'Queso fresco', 4),
(1097, 'Atún en cubos', 2),
(1099, 'Jarabe de arce en cubos', 1),
(1105, 'Huevo entero', 6),
(1106, 'Orégano triturado', 19),
(1107, 'Leche de avena en rodajas', 5),
(1108, 'Higo en cubos', 6),
(1111, 'Sandía rallado', 6),
(1112, 'Mejillón picado', 2),
(1118, 'Salsa soja en rodajas', 16),
(1119, 'Leche rallado', 4),
(1125, 'Ternera triturado', 2),
(1137, 'Frutilla fresco', 6),
(1138, 'Ciruela en rodajas', 6),
(1139, 'Vino tinto fresco', 5),
(1140, 'Leche de avena seco', 5),
(1142, 'Coliflor en rodajas', 6),
(1145, 'Pomelo triturado', 6),
(1146, 'Zanahoria en cubos', 6),
(1150, 'Cebolla en rodajas', 6),
(1154, 'Salsa picante triturado', 16),
(1156, 'Gelatina entero', 1),
(1165, 'Brócoli triturado', 6),
(1166, 'Azafrán seco', 11),
(1170, 'Sal triturado', 11),
(1171, 'Orégano picado', 19),
(1176, 'Salmón triturado', 2),
(1178, 'Poroto rallado', 2),
(1180, 'Pollo rallado', 2),
(1181, 'Comino picado', 11),
(1186, 'Mejillón', 2),
(1192, 'Harina de maíz en rodajas', 1),
(1193, 'Manzana seco', 6),
(1194, 'Rúcula en rodajas', 6),
(1201, 'Huevo de codorniz seco', 6),
(1202, 'Vino blanco triturado', 5),
(1206, 'Arándano entero', 6),
(1208, 'Ternera rallado', 2),
(1213, 'Frutilla rallado', 6),
(1214, 'Bechamel picado', 16),
(1215, 'Melón', 6),
(1216, 'Arroz', 2),
(1217, 'Brócoli', 6),
(1218, 'Frambuesa en rodajas', 6),
(1219, 'Arándano en cubos', 6),
(1222, 'Vino tinto seco', 5),
(1224, 'Coco rallado triturado', 1),
(1226, 'Vino blanco fresco', 5),
(1227, 'Salsa picante en cubos', 16),
(1229, 'Brócoli picado', 6),
(1231, 'Harina de garbanzo picado', 1),
(1233, 'Langostino rallado', 2),
(1237, 'Batata rallado', 6),
(1240, 'Lechuga seco', 6),
(1241, 'Pepino en cubos', 6),
(1243, 'Pera triturado', 6),
(1245, 'Yogur rallado', 4),
(1246, 'Quinoa en cubos', 2),
(1247, 'Chocolate fresco', 1),
(1249, 'Salsa barbacoa entero', 16),
(1250, 'Sal seco', 11),
(1252, 'Calamar triturado', 2),
(1258, 'Coliflor entero', 6),
(1266, 'Sardina triturado', 2),
(1267, 'Harina de garbanzo entero', 1),
(1274, 'Poroto', 2),
(1279, 'Harina de avena rallado', 1),
(1282, 'Cereal en rodajas', 2),
(1284, 'Pimienta seco', 11),
(1289, 'Frambuesa picado', 6),
(1291, 'Sardina rallado', 2),
(1295, 'Salsa barbacoa', 16),
(1296, 'Naranja fresco', 6),
(1303, 'Mostaza', 16),
(1305, 'Menta fresco', 19),
(1307, 'Vino tinto picado', 5),
(1310, 'Cereza seco', 6),
(1314, 'Mandarina en cubos', 6),
(1328, 'Pera fresco', 6),
(1330, 'Clavo en rodajas', 11),
(1334, 'Aceite de oliva', 8),
(1353, 'Rúcula seco', 6),
(1358, 'Aceite de girasol seco', 8),
(1362, 'Ciruela en cubos', 6),
(1364, 'Coco rallado en cubos', 1),
(1372, 'Ternera entero', 2),
(1377, 'Carne de res fresco', 2),
(1378, 'Higo seco', 6),
(1379, 'Chocolate picado', 1),
(1386, 'Clavo seco', 11),
(1388, 'Quinoa rallado', 2),
(1393, 'Lenteja seco', 2),
(1405, 'Salsa picante en rodajas', 16),
(1417, 'Manzana picado', 6),
(1418, 'Salsa pesto rallado', 16),
(1425, 'Fideo entero', 2),
(1426, 'Rúcula triturado', 6),
(1427, 'Leche entero', 4),
(1428, 'Cereza picado', 6),
(1439, 'Tomillo en cubos', 19),
(1452, 'Tomillo seco', 19),
(1455, 'Jarabe de arce en rodajas', 1),
(1459, 'Harina integral fresco', 1),
(1462, 'Ternera en rodajas', 2),
(1463, 'Zanahoria seco', 6),
(1464, 'Harina de avena en rodajas', 1),
(1495, 'Cebolla', 6),
(1499, 'Pollo seco', 2),
(1502, 'Chocolate', 1),
(1503, 'Huevo triturado', 6),
(1504, 'Salsa soja', 16),
(1505, 'Aceite vegetal triturado', 8),
(1516, 'Melón seco', 6),
(1518, 'Orégano en cubos', 19),
(1520, 'Bechamel en cubos', 16),
(1525, 'Naranja picado', 6),
(1542, 'Pimienta', 11),
(1544, 'Carne de cerdo en rodajas', 2),
(1545, 'Aceite de oliva picado', 8),
(1546, 'Batata fresco', 6),
(1554, 'Harina de maíz picado', 1),
(1555, 'Cebolla en cubos', 6),
(1557, 'Clavo rallado', 11),
(1561, 'Salsa pesto triturado', 16),
(1575, 'Carne de res picado', 2),
(1577, 'Yogur triturado', 4),
(1585, 'Coliflor', 6),
(1598, 'Mayonesa rallado', 16),
(1604, 'Comino entero', 11),
(1612, 'Langostino', 2),
(1614, 'Pavo fresco', 2),
(1616, 'Atún en rodajas', 2),
(1617, 'Zanahoria en rodajas', 6),
(1618, 'Coco rallado rallado', 1),
(1620, 'Pomelo seco', 6),
(1623, 'Chocolate entero', 1),
(1628, 'Frutilla picado', 6),
(1630, 'Canela entero', 11),
(1645, 'Coco rallado fresco', 1),
(1646, 'Rúcula rallado', 6),
(1651, 'Pimienta en cubos', 11),
(1659, 'Mora fresco', 6),
(1665, 'Harina de garbanzo rallado', 1),
(1686, 'Merluza', 2),
(1689, 'Ciruela', 6),
(1699, 'Mandarina triturado', 6),
(1709, 'Cilantro fresco', 19),
(1716, 'Huevo de codorniz en cubos', 6),
(1721, 'Mejillón entero', 2),
(1722, 'Perejil picado', 19),
(1724, 'Comino en cubos', 11),
(1725, 'Manteca en rodajas', 4),
(1726, 'Romero entero', 19),
(1737, 'Aceite de girasol rallado', 8),
(1743, 'Crema en cubos', 4),
(1747, 'Cordero picado', 2),
(1760, 'Gelatina seco', 1),
(1769, 'Salmón en rodajas', 2),
(1789, 'Frutilla triturado', 6),
(1793, 'Pimienta rallado', 11),
(1799, 'Lenteja fresco', 2),
(1804, 'Nuez moscada entero', 11),
(1805, 'Salsa pesto picado', 16),
(1806, 'Rúcula picado', 6),
(1810, 'Trucha en cubos', 2),
(1812, 'Salsa soja seco', 16),
(1820, 'Kiwi picado', 6),
(1824, 'Langostino fresco', 2),
(1828, 'Salsa pesto seco', 16),
(1829, 'Nuez moscada fresco', 11),
(1840, 'Huevo rallado', 6),
(1851, 'Sardina fresco', 2),
(1854, 'Manzana fresco', 6),
(1855, 'Lenteja rallado', 2),
(1866, 'Arándano en rodajas', 6),
(1868, 'Harina de maíz triturado', 1),
(1869, 'Salsa soja entero', 16),
(1877, 'Atún seco', 2),
(1884, 'Huevo de codorniz triturado', 6),
(1888, 'Ternera fresco', 2),
(1890, 'Vino blanco entero', 5),
(1894, 'Cerveza triturado', 5),
(1895, 'Yogur seco', 4),
(1900, 'Harina integral en cubos', 1),
(1905, 'Carne de cerdo picado', 2),
(1907, 'Banana en rodajas', 6),
(1921, 'Batata entero', 6),
(1922, 'Fideo en rodajas', 2),
(1924, 'Lenteja', 2),
(1927, 'Chocolate rallado', 1),
(1932, 'Banana entero', 6),
(1941, 'Azafrán entero', 11),
(1944, 'Pepino picado', 6),
(1948, 'Perejil seco', 19),
(1949, 'Queso seco', 4),
(1960, 'Leche de soja triturado', 5),
(1978, 'Espinaca seco', 6),
(1989, 'Salsa de tomate seco', 16),
(1995, 'Espinaca triturado', 6),
(2005, 'Azúcar seco', 1),
(2006, 'Harina de trigo triturado', 1),
(2009, 'Trucha en rodajas', 2),
(2010, 'Nuez moscada triturado', 11),
(2023, 'Albahaca fresco', 19),
(2036, 'Harina integral picado', 1),
(2040, 'Carne de cerdo fresco', 2),
(2050, 'Vino tinto rallado', 5),
(2094, 'Orégano en rodajas', 19),
(2107, 'Laurel rallado', 19),
(2109, 'Ternera picado', 2),
(2117, 'Pimiento', 6),
(2128, 'Mandarina en rodajas', 6),
(2147, 'Salsa de tomate en cubos', 16),
(2152, 'Quinoa fresco', 2),
(2165, 'Caldo de pollo rallado', 1),
(2174, 'Lechuga rallado', 6),
(2186, 'Leche de avena triturado', 5),
(2198, 'Cebolla entero', 6),
(2213, 'Banana picado', 6),
(2218, 'Cúrcuma en cubos', 11),
(2220, 'Pepino rallado', 6),
(2227, 'Quinoa seco', 2),
(2238, 'Salsa picante rallado', 16),
(2254, 'Mayonesa triturado', 16),
(2256, 'Leche en rodajas', 4),
(2261, 'Repollo seco', 6),
(2269, 'Cúrcuma', 11),
(2271, 'Repollo triturado', 6),
(2282, 'Azafrán', 11),
(2289, 'Sardina picado', 2),
(2310, 'Coliflor triturado', 6),
(2326, 'Calamar rallado', 2),
(2333, 'Acelga en rodajas', 6),
(2337, 'Leche de avena en cubos', 5),
(2342, 'Comino seco', 11),
(2378, 'Ternera', 2),
(2381, 'Pera entero', 6),
(2382, 'Romero triturado', 19),
(2400, 'Menta en cubos', 19),
(2456, 'Cebolla rallado', 6),
(2466, 'Pepino seco', 6),
(2472, 'Comino', 11),
(2479, 'Salsa pesto en cubos', 16),
(2485, 'Coliflor seco', 6),
(2524, 'Miel seco', 1),
(2558, 'Melón entero', 6),
(2571, 'Vino blanco en cubos', 5),
(2581, 'Mayonesa fresco', 16),
(2593, 'Nuez moscada', 11),
(2604, 'Cúrcuma picado', 11),
(2686, 'Caldo de verduras picado', 1),
(2719, 'Fideo en cubos', 2),
(2724, 'Frutilla seco', 6),
(2738, 'Caldo de verduras triturado', 1),
(2748, 'Jengibre seco', 11),
(2756, 'Huevo de codorniz picado', 6),
(2764, 'Frutilla en rodajas', 6),
(2767, 'Papa', 6),
(2802, 'Queso en cubos', 4),
(2803, 'Cacao en polvo', 1),
(2805, 'Yogur entero', 4),
(2815, 'Caldo de pollo picado', 1),
(2824, 'Salsa barbacoa picado', 16),
(2827, 'Pimiento entero', 6),
(2857, 'Leche de avena', 5),
(2889, 'Salmón entero', 2),
(2910, 'Azafrán fresco', 11),
(2917, 'Queso rallado', 4),
(2932, 'Kiwi fresco', 6),
(2938, 'Poroto seco', 2),
(2949, 'Trucha triturado', 2),
(2953, 'Cacao en polvo entero', 1),
(2983, 'Romero rallado', 19),
(2987, 'Langostino en cubos', 2),
(3003, 'Cereza triturado', 6),
(3021, 'Harina de maíz fresco', 1),
(3037, 'Zanahoria picado', 6),
(3041, 'Calamar seco', 2),
(3048, 'Pimienta picado', 11),
(3057, 'Ciruela fresco', 6),
(3063, 'Agua picado', 5),
(3072, 'Carne de res rallado', 2),
(3124, 'Vino tinto en cubos', 5),
(3268, 'Arándano triturado', 6),
(3298, 'Ciruela seco', 6),
(3330, 'Jengibre', 11),
(3367, 'Banana fresco', 6),
(3368, 'Harina de avena fresco', 1),
(3380, 'Langostino entero', 2),
(3422, 'Pavo rallado', 2),
(3433, 'Salsa de tomate', 16),
(3512, 'Merluza en rodajas', 2),
(3551, 'Vino tinto en rodajas', 5),
(3568, 'Laurel', 19),
(3590, 'Cordero triturado', 2),
(3593, 'Kiwi rallado', 6),
(3657, 'Harina integral', 1),
(3738, 'Pepino fresco', 6),
(3767, 'Leche de avena picado', 5),
(3790, 'Mostaza picado', 16),
(3798, 'Espinaca entero', 6),
(3819, 'Cereal triturado', 2),
(3837, 'Garbanzos fresco', 2),
(3858, 'Harina de maíz entero', 1),
(3983, 'Frambuesa triturado', 6),
(3988, 'Bechamel fresco', 16),
(4290, 'Frambuesa entero', 6),
(4331, 'Pera picado', 6),
(4381, 'Lenteja en cubos', 2),
(4404, 'Sandía', 6),
(4685, 'Sandía triturado', 6),
(4739, 'Jengibre entero', 11),
(4825, 'Melón fresco', 6),
(4838, 'Vino tinto triturado', 5),
(4890, 'Durazno', 6),
(5065, 'Orégano', 19),
(5091, 'Higo picado', 6),
(5177, 'Cereal entero', 2),
(5269, 'Ternera en cubos', 2),
(5542, 'Cerveza seco', 5),
(5685, 'Caldo de verduras entero', 1),
(7031, 'Cilantro triturado', 19),
(7150, 'Garbanzos picado', 2),
(10001, 'Champiñones frescos', 6),
(10002, 'Setas variadas', 6),
(10003, 'Portobello', 6),
(10004, 'Nueces', 1),
(10005, 'Almendras', 1),
(10006, 'Avellanas', 1),
(10007, 'Castañas', 1),
(10008, 'Maní', 1),
(10009, 'Semillas de girasol', 1),
(10010, 'Semillas de calabaza', 1),
(10011, 'Pipas de girasol', 1),
(10014, 'Canela molida', 11),
(10015, 'Clavo de olor', 11),
(10018, 'Pimienta negra', 11),
(10019, 'Pimienta blanca', 11),
(10020, 'Sal gruesa', 1),
(10021, 'Sal fina', 1),
(10024, 'Cúrcuma fresca', 13),
(10025, 'Ajo fresco', 13),
(10026, 'Ajo en rodajas', 14),
(10027, 'Limón', 6),
(10028, 'Lima', 6),
(10038, 'Arándanos', 6),
(10040, 'Moras', 6),
(10046, 'Aceitunas verdes', 12),
(10047, 'Aceitunas negras', 12),
(10048, 'Alcaparras', 12),
(10049, 'Pepinillos', 12),
(10050, 'Champiñones en conserva', 12),
(10052, 'Salsa bechamel', 16),
(10053, 'Salsa carbonara', 16),
(10054, 'Mayonesa light', 16),
(10055, 'Mostaza dijon', 16),
(10056, 'Gelatina neutra', 17),
(10057, 'Gelatina sabor frutal', 17),
(10058, 'Polvo para hornear', 1),
(10059, 'Sémola de trigo', 1),
(10062, 'Café instantáneo', 17),
(10063, 'Té negro', 17),
(10064, 'Té verde', 17),
(10065, 'Café molido', 1),
(10066, 'Chocolate amargo', 1),
(10067, 'Chocolate con leche', 1),
(10068, 'Cacao en grano', 1),
(10069, 'Azúcar glas', 1),
(10070, 'Manteca de maní', 9),
(10071, 'Mermelada de frutilla', 9),
(10072, 'Mermelada de durazno', 9),
(10073, 'Sirope de chocolate', 9),
(10074, 'Sirope de caramelo', 9),
(10076, 'Vino rosado', 5),
(10078, 'Cerveza rubia', 5),
(10079, 'Cerveza negra', 5),
(10080, 'Agua mineral', 5),
(10081, 'Agua con gas', 5),
(10082, 'Agua saborizada', 5),
(10085, 'Crema batida', 4),
(10086, 'Crema chantilly', 4),
(10087, 'Huevos duros', 6),
(10088, 'Huevos revueltos', 6),
(10089, 'Huevo de gallina', 6),
(10092, 'Pechuga de pollo', 2),
(10093, 'Muslo de pollo', 2),
(10094, 'Carne de res molida', 2),
(10095, 'Bistec de res', 2),
(10096, 'Lomo de cerdo', 2),
(10097, 'Costilla de cerdo', 2),
(10098, 'Chuleta de cerdo', 2),
(10100, 'Filete de pescado', 2),
(10401, 'Harina', 1),
(10406, 'Huevos', 6),
(10407, 'Limones', 7),
(10410, 'Avena', 10),
(10412, 'Pan', 12),
(10413, 'Ajo', 13),
(10414, 'Tomate', 14),
(10415, 'Caldo en cubo', 15),
(10416, 'Vinagre', 16),
(10424, 'Fideos', 2),
(10425, 'Carne molida', 2),
(10426, 'Azúcar impalpable', 3),
(10427, 'Bicarbonato de sodio', 3),
(10428, 'Leche condensada', 4),
(10429, 'Crema de leche', 4),
(10435, 'Bananas', 7),
(10436, 'Naranjas', 7),
(10438, 'Extracto de vainilla', 8),
(10439, 'Salsa de soja', 9),
(10440, 'Mermelada', 9),
(10445, 'Jamón', 12),
(10451, 'Salsa inglesa', 16),
(10452, 'Sopa instantánea', 17),
(10459, 'Cebollín', 19),
(10460, 'Eneldo', 19);

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
(45, 1, '123', '[{\"paso\":\"2\",\"description\":\"2\"}]', '2', '{\"principal\":\"..\\/uploads\\/receta_68f5a0cda0e8f.webp\",\"pasos\":[\"..\\/uploads\\/paso_68f5a0cda0f9e.webp\"]}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recetaguardada`
--

CREATE TABLE `recetaguardada` (
  `id_recetaGuardada` int(5) NOT NULL,
  `id_usuario` int(5) DEFAULT NULL,
  `id_receta` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `recetaguardada`
--

INSERT INTO `recetaguardada` (`id_recetaGuardada`, `id_usuario`, `id_receta`) VALUES
(6, 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_unidad`
--

CREATE TABLE `tipo_unidad` (
  `id_tipoUnidad` int(11) NOT NULL,
  `unidad` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_unidad`
--

INSERT INTO `tipo_unidad` (`id_tipoUnidad`, `unidad`) VALUES
(1, 'gramos'),
(2, 'kilogramos'),
(3, 'miligramos'),
(4, 'mililitros'),
(5, 'litros'),
(6, 'unidad'),
(7, 'docena'),
(8, 'cucharadita'),
(9, 'cucharada'),
(10, 'taza'),
(11, 'pizca'),
(12, 'rebanada'),
(13, 'diente'),
(14, 'rodaja'),
(15, 'cubo'),
(16, 'chorrito'),
(17, 'sobre'),
(18, 'hoja'),
(19, 'rama');

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
(1, 'Gus', '123', 2, 'agustinlazari594@gmail.com'),
(2, 'lazarito', '123', 1, 'elgordito@gmail.com');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cantidad_ingredientes`
--
ALTER TABLE `cantidad_ingredientes`
  ADD PRIMARY KEY (`id_cantidadIng`),
  ADD KEY `id_ingrediente` (`id_ingrediente`,`id_receta`),
  ADD KEY `id_receta` (`id_receta`);

--
-- Indices de la tabla `ingredientes`
--
ALTER TABLE `ingredientes`
  ADD PRIMARY KEY (`id_ingrediente`),
  ADD KEY `id_tipoUnidad` (`id_tipoUnidad`);

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
-- Indices de la tabla `tipo_unidad`
--
ALTER TABLE `tipo_unidad`
  ADD PRIMARY KEY (`id_tipoUnidad`);

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
-- AUTO_INCREMENT de la tabla `cantidad_ingredientes`
--
ALTER TABLE `cantidad_ingredientes`
  MODIFY `id_cantidadIng` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `ingredientes`
--
ALTER TABLE `ingredientes`
  MODIFY `id_ingrediente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10461;

--
-- AUTO_INCREMENT de la tabla `opinion`
--
ALTER TABLE `opinion`
  MODIFY `id_opinion` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `receta`
--
ALTER TABLE `receta`
  MODIFY `id_receta` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de la tabla `recetaguardada`
--
ALTER TABLE `recetaguardada`
  MODIFY `id_recetaGuardada` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tipo_unidad`
--
ALTER TABLE `tipo_unidad`
  MODIFY `id_tipoUnidad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `tipo_usuario`
--
ALTER TABLE `tipo_usuario`
  MODIFY `id_tipoUsuario` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cantidad_ingredientes`
--
ALTER TABLE `cantidad_ingredientes`
  ADD CONSTRAINT `cantidad_ingredientes_ibfk_1` FOREIGN KEY (`id_ingrediente`) REFERENCES `ingredientes` (`id_ingrediente`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `cantidad_ingredientes_ibfk_2` FOREIGN KEY (`id_receta`) REFERENCES `receta` (`id_receta`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `ingredientes`
--
ALTER TABLE `ingredientes`
  ADD CONSTRAINT `ingredientes_ibfk_1` FOREIGN KEY (`id_tipoUnidad`) REFERENCES `tipo_unidad` (`id_tipoUnidad`) ON DELETE SET NULL ON UPDATE CASCADE;

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
