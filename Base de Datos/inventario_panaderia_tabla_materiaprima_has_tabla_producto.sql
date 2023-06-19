-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: inventario_panaderia
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tabla_materiaprima_has_tabla_producto`
--

DROP TABLE IF EXISTS `tabla_materiaprima_has_tabla_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tabla_materiaprima_has_tabla_producto` (
  `Tabla_MateriaPrima_ID` int NOT NULL,
  `Tabla_producto_ID` int NOT NULL,
  `Tabla_producto_Tabla_Proveedor_ID` int NOT NULL,
  `Tabla_producto_Tabla_Tipo_Panes_ID` int NOT NULL,
  PRIMARY KEY (`Tabla_MateriaPrima_ID`,`Tabla_producto_ID`,`Tabla_producto_Tabla_Proveedor_ID`,`Tabla_producto_Tabla_Tipo_Panes_ID`),
  KEY `fk_Tabla_MateriaPrima_has_Tabla_producto_Tabla_producto1_idx` (`Tabla_producto_ID`,`Tabla_producto_Tabla_Proveedor_ID`,`Tabla_producto_Tabla_Tipo_Panes_ID`),
  KEY `fk_Tabla_MateriaPrima_has_Tabla_producto_Tabla_MateriaPrima_idx` (`Tabla_MateriaPrima_ID`),
  CONSTRAINT `fk_Tabla_MateriaPrima_has_Tabla_producto_Tabla_MateriaPrima1` FOREIGN KEY (`Tabla_MateriaPrima_ID`) REFERENCES `tabla_materiaprima` (`ID`),
  CONSTRAINT `fk_Tabla_MateriaPrima_has_Tabla_producto_Tabla_producto1` FOREIGN KEY (`Tabla_producto_ID`, `Tabla_producto_Tabla_Proveedor_ID`, `Tabla_producto_Tabla_Tipo_Panes_ID`) REFERENCES `tabla_producto` (`ID`, `Tabla_Proveedor_ID`, `Tabla_Tipo_Panes_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tabla_materiaprima_has_tabla_producto`
--

LOCK TABLES `tabla_materiaprima_has_tabla_producto` WRITE;
/*!40000 ALTER TABLE `tabla_materiaprima_has_tabla_producto` DISABLE KEYS */;
INSERT INTO `tabla_materiaprima_has_tabla_producto` VALUES (2,1,2,3);
/*!40000 ALTER TABLE `tabla_materiaprima_has_tabla_producto` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-18 22:11:24
