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
-- Table structure for table `tabla_proveedor`
--

DROP TABLE IF EXISTS `tabla_proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tabla_proveedor` (
  `ID` int NOT NULL,
  `Nombre_Proveedor` varchar(100) NOT NULL,
  `Fecha_Entrega` datetime NOT NULL,
  `Tipo_Producto` varchar(45) NOT NULL,
  `Precio` int NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tabla_proveedor`
--

LOCK TABLES `tabla_proveedor` WRITE;
/*!40000 ALTER TABLE `tabla_proveedor` DISABLE KEYS */;
INSERT INTO `tabla_proveedor` VALUES (1,'Bimbo','2023-05-16 00:00:00','Pan',45),(2,'Sula','0000-00-00 00:00:00','Queso',200),(3,'Breadco','0000-00-00 00:00:00','Baguette',120),(4,'Bimbo ','2023-04-30 00:00:00','Pan Dulce',110),(5,'Bimbo','2012-05-23 00:00:00','Pan Integral',98),(6,'La Casitas','2023-04-16 00:00:00','Pan Largo',60),(7,'Sula','2023-01-16 00:00:00','Pan Molde',135),(8,'Breadco','2023-08-25 00:00:00','Calleta de lengua',35),(9,'Bimbo','2023-05-16 00:00:00','Pan blanco',45);
/*!40000 ALTER TABLE `tabla_proveedor` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-31 21:49:17
