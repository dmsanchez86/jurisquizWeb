-- MySQL dump 10.13  Distrib 5.5.41, for debian-linux-gnu (x86_64)
--
-- Host: 0.0.0.0    Database: jurizquiz
-- ------------------------------------------------------
-- Server version	5.5.41-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `jur_current_state_game`
--

DROP TABLE IF EXISTS `jur_current_state_game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jur_current_state_game` (
  `id_user` int(11) NOT NULL,
  `id_game_mode` int(11) NOT NULL,
  `id_level_game` int(11) NOT NULL,
  `id_level_category` int(11) NOT NULL,
  `correct_answers` int(11) NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jur_current_state_game`
--

LOCK TABLES `jur_current_state_game` WRITE;
/*!40000 ALTER TABLE `jur_current_state_game` DISABLE KEYS */;
INSERT INTO `jur_current_state_game` VALUES (21,2,2,2,2),(23,1,3,1,0);
/*!40000 ALTER TABLE `jur_current_state_game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jur_duel`
--

DROP TABLE IF EXISTS `jur_duel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jur_duel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_win_user` int(10) NOT NULL,
  `id_user_1` int(11) NOT NULL,
  `id_user_2` int(11) NOT NULL,
  `total_corrects_answers_user_1` int(10) DEFAULT NULL,
  `total_corrects_answers_user_2` int(10) DEFAULT NULL,
  `date_duel` timestamp NULL DEFAULT NULL,
  `date_start` timestamp NULL DEFAULT NULL,
  `date_end` timestamp NULL DEFAULT NULL,
  `state_duel` enum('wait','reject','accept','close') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jur_duel`
--

LOCK TABLES `jur_duel` WRITE;
/*!40000 ALTER TABLE `jur_duel` DISABLE KEYS */;
/*!40000 ALTER TABLE `jur_duel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jur_game_mode`
--

DROP TABLE IF EXISTS `jur_game_mode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jur_game_mode` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` text,
  `number_questions` int(50) NOT NULL DEFAULT '0',
  `time_question` int(10) NOT NULL DEFAULT '0',
  `points_question` int(10) NOT NULL DEFAULT '0',
  `state` enum('active','inactive') DEFAULT 'active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jur_game_mode`
--

LOCK TABLES `jur_game_mode` WRITE;
/*!40000 ALTER TABLE `jur_game_mode` DISABLE KEYS */;
INSERT INTO `jur_game_mode` VALUES (1,'Carrera','Esta es la descripcion del juego',20,10000,1,'active'),(2,'Examen','Esta es la descripcion del juego',20,10000,1,'active'),(3,'Especialidad','Esta es la descripcion del juego',20,10000,0,'active'),(4,'Litigio','Esta es la descripcion del juego',20,10000,0,'active'),(5,'Duelo','Esta es la descripcion del juego',20,10000,0,'active');
/*!40000 ALTER TABLE `jur_game_mode` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jur_level_category`
--

DROP TABLE IF EXISTS `jur_level_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jur_level_category` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `id_level_game` int(10) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` text,
  `icon` varchar(30) NOT NULL,
  `number_questions` int(5) NOT NULL DEFAULT '20',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jur_level_category`
--

LOCK TABLES `jur_level_category` WRITE;
/*!40000 ALTER TABLE `jur_level_category` DISABLE KEYS */;
INSERT INTO `jur_level_category` VALUES (1,1,'Alcalde','Esta es la descripcion','mayor',20),(2,1,'Gobernador','Esta es la descripcion','governor',20),(3,1,'Presidente','Esta es la descripcion','president',20),(4,2,'Concejal','Esta es la descripcion','councilor',20),(5,2,'Diputado','Esta es la descripcion','deputy',20),(6,2,'Congresista','Esta es la descripcion','congressman',20),(7,3,'Juez Municipal','Esta es la descripcion','municipaljudge',20),(8,3,'Juez Circuito','Esta es la descripcion','circuitjudge',20),(9,3,'Juez Magistrado','Esta es la descripcion','magistrate',20);
/*!40000 ALTER TABLE `jur_level_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jur_level_game`
--

DROP TABLE IF EXISTS `jur_level_game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jur_level_game` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_game_mode` int(10) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jur_level_game`
--

LOCK TABLES `jur_level_game` WRITE;
/*!40000 ALTER TABLE `jur_level_game` DISABLE KEYS */;
INSERT INTO `jur_level_game` VALUES (1,1,'Ejecutiva','Esta es la descripcion del nivel del modo carrera'),(2,1,'Legislativa','Esta es la descripcion del nivel del modo carrera'),(3,1,'Judicial','Esta es la descripcion del nivel del modo carrera'),(4,2,'Examen','Esta es la descripcion del nivel del modo carrera'),(5,3,'Tematica','Esta es la descripcion del nivel del modo carrera'),(6,5,'Duelo','Esta es la descripcion del nivel del modo carrera'),(7,4,'Caso','Esta es la descripcion del nivel del modo carrera');
/*!40000 ALTER TABLE `jur_level_game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jur_questions`
--

DROP TABLE IF EXISTS `jur_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jur_questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_specialty` int(10) NOT NULL,
  `question` text NOT NULL,
  `type_question` enum('1','2','3') NOT NULL DEFAULT '1',
  `options_question` text NOT NULL,
  `correct_answer` text NOT NULL,
  `state` enum('active','inactive') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jur_questions`
--

LOCK TABLES `jur_questions` WRITE;
/*!40000 ALTER TABLE `jur_questions` DISABLE KEYS */;
INSERT INTO `jur_questions` VALUES (82,1,'En el PreÃ¡mbulo de la ConstituciÃ³n PolÃ­tica de 1991 se:','1','opcion 1,opcion 2,opcion 3,opcion 4','opcion 2','inactive'),(83,1,'El conjunto de normas en que se establecen los derechos y obligaciones de los ciudadanos, la estructura y organizaciÃ³n del Estado y su ordenamiento jurÃ­dico es:','1','El CÃ³digo Civil,El CÃ³digo Penal,La Jurisprudencia,La ConstituciÃ³n PolÃ­tica','La ConstituciÃ³n PolÃ­tica','active'),(84,2,'SegÃºn el CÃ³digo de Comercio Colombiano a las cuestiones comerciales que no pudieren regularse conforme a su normativa se  les aplicarÃ¡ la legislaciÃ³n:','3','Penal,Civil,Laboral,Tributaria,Obligatoria','Penal,Civil,Laboral,Tributaria,Obligatoria','active'),(85,1,'Manizales es la capital de caldas?','2','Si, No','si','inactive'),(86,2,'Esta es una pregunta de prueba','2','Si, No','si','active');
/*!40000 ALTER TABLE `jur_questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jur_specialty`
--

DROP TABLE IF EXISTS `jur_specialty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jur_specialty` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_game_mode` int(11) NOT NULL,
  `id_level_game` varchar(45) NOT NULL DEFAULT '0',
  `name` varchar(45) DEFAULT NULL,
  `state` enum('active','inactive') DEFAULT 'active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jur_specialty`
--

LOCK TABLES `jur_specialty` WRITE;
/*!40000 ALTER TABLE `jur_specialty` DISABLE KEYS */;
INSERT INTO `jur_specialty` VALUES (1,1,'2','Derecho Constitucional','active'),(2,1,'3','Derecho Comercial','active'),(3,2,'','Derechos de Familia','active');
/*!40000 ALTER TABLE `jur_specialty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jur_users`
--

DROP TABLE IF EXISTS `jur_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jur_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` enum('admin','user') DEFAULT 'user',
  `name` varchar(50) DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL,
  `image_biography` varchar(50) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(500) NOT NULL,
  `gender` enum('M','F') DEFAULT 'M',
  `points` varchar(50) DEFAULT NULL,
  `level` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jur_users`
--

LOCK TABLES `jur_users` WRITE;
/*!40000 ALTER TABLE `jur_users` DISABLE KEYS */;
INSERT INTO `jur_users` VALUES (1,'admin','Daniel Sanchez','8863296.jpg','car.jpg','Administrador','dmsanchez86@misena.edu.co','500214841e595d0995a5daaecf3f02a7','M','0','1'),(16,'user','Camila',NULL,NULL,NULL,'admin@gmail.com','e10adc3949ba59abbe56e057f20f883e','M','0','2'),(19,'user','herman','contact.jpg','iphone.jpg','heanfig','heanfig@misena.edu.co','e10adc3949ba59abbe56e057f20f883e','M','0','1'),(20,'user','oscar','default_user.png','','oscardavid','oscardavid@zoppagency.com','4fe14e1599589ceecd0a19b59845f2e4','M','0','1'),(21,'user','Mauro','default_user.png','default.jpg','dmsanchez2015','dmsanchez2015@gmail.com','e10adc3949ba59abbe56e057f20f883e','M','0','1'),(23,'user','Mauro Avila','IMG_20150718_214451.jpg','IMG_20150726_205135.jpg','dmsanchez86','dmsanchez86@gmail.com','e10adc3949ba59abbe56e057f20f883e','M','0','1'),(24,'user','MileÂ ','299cc9d885f7df1b3814308bb3d03d38.jpg','default.png','milenava1986','milenava1986@hotmail.com','aa3f4c8106368f43a578fdc91d184ea9','M','0','1'),(25,'user','juan camilo','Backtrack C_00000.jpg','harry-potter1.jpg','jquicenofranco','jquicenofranco@gmail.com','fcea920f7412b5da7be0cf42b8c93759','M','0','1'),(26,'user','Adriana Avila','defaul_user.png','default.png','adriana','adriana@outlook.com','e10adc3949ba59abbe56e057f20f883e','F','0','1');
/*!40000 ALTER TABLE `jur_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-08-04 12:59:27
