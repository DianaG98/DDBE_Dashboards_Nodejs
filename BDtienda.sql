-- phpMyAdmin SQL Dump
-- version 3.2.4
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 17-05-2020 a las 17:59:31
-- Versión del servidor: 5.1.41
-- Versión de PHP: 5.3.1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `tienda`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contadores`
--

CREATE TABLE IF NOT EXISTS `contadores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_contador` varchar(50) NOT NULL,
  `valor` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Volcar la base de datos para la tabla `contadores`
--

INSERT INTO `contadores` (`id`, `nombre_contador`, `valor`) VALUES
(1, 'contador1_abarrotes', 6),
(2, 'contador2_abarrotes', 1006),
(4, 'contador1_botanas', 4),
(3, 'contador3_abarrotes', 2006),
(5, 'contador2_botanas', 1005),
(6, 'contador3_botanas', 2001),
(7, 'contador1_bebidas', 1),
(8, 'contador2_bebidas', 1000),
(9, 'contador3_bebidas', 2000),
(10, 'contador1_jarcieria', 2),
(11, 'contador2_jarcieria', 1002),
(12, 'contador3_jarcieria', 2002);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `coordenadas`
--

CREATE TABLE IF NOT EXISTS `coordenadas` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `cadena` text NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Volcar la base de datos para la tabla `coordenadas`
--

INSERT INTO `coordenadas` (`Id`, `nombre`, `cadena`) VALUES
(1, 'abarrotes', '[\n  {\n    "x": 0,\n    "y": 0,\n    "width": 1,\n    "height": 1,\n    "id": "0"\n  },\n  {\n    "x": 2,\n    "y": 0,\n    "width": 5,\n    "height": 5,\n    "id": "2005"\n  },\n  {\n    "x": 2,\n    "y": 5,\n    "width": 5,\n    "height": 5,\n    "id": "1005"\n  },\n  {\n    "x": 2,\n    "y": 10,\n    "width": 5,\n    "height": 5,\n    "id": "5"\n  }\n]'),
(2, 'botanas', '[\n  {\n    "x": 0,\n    "y": 0,\n    "width": 1,\n    "height": 1,\n    "id": "0"\n  },\n  {\n    "x": 2,\n    "y": 10,\n    "width": 5,\n    "height": 5,\n    "id": "1004"\n  },\n  {\n    "x": 2,\n    "y": 15,\n    "width": 5,\n    "height": 5,\n    "id": "4"\n  },\n  {\n    "x": 2,\n    "y": 5,\n    "width": 5,\n    "height": 5,\n    "id": "1005"\n  },\n  {\n    "x": 2,\n    "y": 0,\n    "width": 5,\n    "height": 5,\n    "id": "2001"\n  }\n]'),
(3, 'bebidas', '[\n  {\n    "x": 0,\n    "y": 0,\n    "width": 0,\n    "height": 0,\n    "id": 0\n  }\n]'),
(4, 'jarcieria', '[\n  {\n    "x": 0,\n    "y": 0,\n    "width": 1,\n    "height": 1,\n    "id": "0"\n  },\n  {\n    "x": 2,\n    "y": 0,\n    "width": 5,\n    "height": 5,\n    "id": "2002"\n  },\n  {\n    "x": 2,\n    "y": 5,\n    "width": 5,\n    "height": 5,\n    "id": "1002"\n  }\n]'),
(5, 'default', '[\r\n  {\r\n    "x": 0,\r\n    "y": 0,\r\n    "width": 0,\r\n    "height": 0,\r\n    "id": 0\r\n  }\r\n]');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE IF NOT EXISTS `productos` (
  `id_producto` int(11) NOT NULL AUTO_INCREMENT,
  `id_tipo` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `cantidad` int(11) NOT NULL,
  PRIMARY KEY (`id_producto`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Volcar la base de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `id_tipo`, `nombre`, `cantidad`) VALUES
(1, 1, 'Aceite', 2),
(2, 1, 'Cafe soluble', 5),
(3, 1, 'Mayonesa', 5),
(4, 2, 'Cheetos Bolita', 5),
(5, 3, 'Coca Cola 2 lts', 50),
(6, 4, 'Escoba ', 24),
(7, 2, 'Sabritas limon', 10),
(8, 2, 'Rancheritos', 15),
(9, 3, 'Gatorade moras', 5),
(10, 3, 'Agua Ciel 1 lt', 15),
(11, 4, 'Fabuloso', 8),
(12, 4, 'Pinol', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `id_tipo` int(11) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `contrasena` varchar(50) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Volcar la base de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`Id`, `id_tipo`, `nombre_usuario`, `contrasena`) VALUES
(1, 1, 'DianaG', '12345678'),
(2, 2, 'JessicaB', '12345678');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE IF NOT EXISTS `ventas` (
  `id_venta` int(11) NOT NULL AUTO_INCREMENT,
  `id_tipo` int(11) NOT NULL,
  `vendedor` varchar(50) NOT NULL,
  `cantidad` int(11) NOT NULL,
  PRIMARY KEY (`id_venta`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Volcar la base de datos para la tabla `ventas`
--

INSERT INTO `ventas` (`id_venta`, `id_tipo`, `vendedor`, `cantidad`) VALUES
(1, 1, 'Juan Perez', 200),
(2, 1, 'Juan Perez', 100),
(3, 2, 'Laura Flores', 1000),
(4, 3, 'Sofia Reyes', 250),
(5, 3, 'Laura Flores', 1600),
(6, 4, 'Laura Flores', 2600),
(7, 4, 'Sofia Reyes', 1000);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
