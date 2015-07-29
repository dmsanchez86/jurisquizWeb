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
INSERT INTO `jur_game_mode` (`id`, `name`, `description`, `number_questions`, `time_question`, `points_question`, `state`) VALUES (1,'Carrera','Esta es la descripción del modo de juego',20,10000,1,'active'),(2,'Examen','Esta es la descripción del modo de juego',20,10000,1,'active'),(3,'Especialidad','Esta es la descripción del modo de juego',20,10000,0,'active'),(4,'Litigio','Esta es la descripción del modo de juego',20,10000,0,'active'),(5,'Duelo','Esta es la descripción del modo de juego',20,10000,0,'active');
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jur_level_category`
--

LOCK TABLES `jur_level_category` WRITE;
/*!40000 ALTER TABLE `jur_level_category` DISABLE KEYS */;
INSERT INTO `jur_level_category` (`id`, `id_level_game`, `name`, `description`) VALUES (1,1,'Alcalde','Esta es la descripcion'),(2,1,'Gobernador','Esta es la descripcion'),(3,1,'Presidente','Esta es la descripcion'),(4,2,'Concejal','Esta es la descripcion'),(5,2,'Diputado','Esta es la descripcion'),(6,2,'Congresista','Esta es la descripcion'),(7,3,'Juez Municipal','Esta es la descripcion'),(8,3,'Juez Circuito','Esta es la descripcion'),(9,3,'Juez MAgistrado','Esta es la descripcion');
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
INSERT INTO `jur_level_game` (`id`, `id_game_mode`, `name`, `description`) VALUES (1,1,'Ejecutiva','Esta es la descripcion del nivel del modo carrera'),(2,1,'Legislativa','Esta es la descripcion del nivel del modo carrera'),(3,1,'Judicial','Esta es la descripcion del nivel del modo carrera'),(4,2,'Examen','Esta es la descripcion del nivel del modo carrera'),(5,3,'Tematica','Esta es la descripcion del nivel del modo carrera'),(6,5,'Duelo','Esta es la descripcion del nivel del modo carrera'),(7,4,'Caso','Esta es la descripcion del nivel del modo carrera');
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
  `id_level_game` int(10) NOT NULL,
  `id_mode_game` int(10) NOT NULL,
  `id_level_category` int(10) NOT NULL,
  `question` text NOT NULL,
  `type_question` enum('1','2','3') NOT NULL DEFAULT '1',
  `structure_question` text NOT NULL,
  `correct_answer` text NOT NULL,
  `state` enum('active','inactive') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jur_questions`
--

LOCK TABLES `jur_questions` WRITE;
/*!40000 ALTER TABLE `jur_questions` DISABLE KEYS */;
INSERT INTO `jur_questions` (`id`, `id_level_game`, `id_mode_game`, `id_level_category`, `question`, `type_question`, `structure_question`, `correct_answer`, `state`) VALUES (7,2,1,4,'Esta es la pregunta del modo carrera','1','1','Respuesta unica','inactive'),(8,2,1,4,'Pregunta de las leyes judiciales','2','2','no','inactive'),(9,4,2,0,'Cual es el orden correcto','3','3','Levantarse,BaÃ±arse,Desayunar,Cepillarse','active'),(10,3,1,8,'Cual es la capital de caldas?','1','1','Manizales','inactive'),(11,1,1,1,'El CÃ³digo Civil Colombiano comprende las disposiciones legales sustantivas que determinan especialmente los derechos de:','1','1','Los particulares, por razÃ³n del estado de las personas, de sus bienes, obligaciones, contratos y acciones civiles','active'),(12,1,1,1,'El carÃ¡cter general de la ley es:','1','1','Mandar, prohibir, permitir o castigar.','active'),(13,4,2,0,'Ley es una declaraciÃ³n de la voluntad soberana manifestada en:','1','1','La forma prevenida en la ConstituciÃ³n Nacional.','active'),(14,3,1,8,'La sanciÃ³n legal no es sÃ³lo la pena sino tambiÃ©n la recompensa... (complete)','1','1','','active'),(16,2,1,5,'La sanciÃ³n constitucional que el poder ejecutivo de la uniÃ³n da a los proyectos acordados por el congreso, para elevarlos a la categorÃ­a de leyes, es:','1','1','Cosa distinta de la sanciÃ³n legal.','active'),(17,4,2,0,'El CÃ³digo General del Proceso regula la actividad procesal en los siguientes asuntos:','1','1','Civiles, comerciales, de familia y agrarios. Se aplica, ademÃ¡s, a todos los asuntos de cualquier jurisdicciÃ³n o especialidad y a las actuaciones de particulares y autoridades administrativas, cuando ejerzan funciones jurisdiccionales, en cuanto no estÃ©n regulados expresamente en otras leyes.','active'),(18,5,3,0,'SegÃºn el CÃ³digo General del Proceso los tÃ©rminos procesales se observarÃ¡n con diligencia y su incumplimiento injustificado serÃ¡:','1','1','Sancionado','active'),(19,1,1,1,'Las actuaciones que regula el CÃ³digo General del Proceso se cumplirÃ¡n:','1','1','En forma oral, pÃºblica y en audiencias.','active'),(20,4,2,0,'SegÃºn el Principio de Igualdad de las Partes del CÃ³digo General del Proceso: ','1','1','El juez debe hacer uso de los poderes que el cÃ³digo le otorga para lograr la igualdad real de las partes.','active'),(21,5,3,0,'SegÃºn el Principio de ConcentraciÃ³n del CÃ³digo General del Proceso el juez:','1','1','No podrÃ¡ aplazar una audiencia o diligencia, ni suspenderla, salvo por las razones que expresamente autoriza este cÃ³digo','active'),(22,1,1,3,'SegÃºn el CÃ³digo Penal Colombiano la imposiciÃ³n de la pena o de la medida de seguridad responderÃ¡ a los principios de:','1','1','Necesidad, proporcionalidad y razonabilidad.','active'),(23,4,2,0,'SegÃºn el CÃ³digo Penal Colombiano la pena no cumplirÃ¡ una de las siguientes funciones:','1','1','Definir la polÃ­tica criminal.','active'),(24,3,1,9,'SegÃºn el CÃ³digo Penal Colombiano durante las medidas de seguridad operan las funciones de:','1','1','','active'),(25,4,2,0,'La definiciÃ³n que seÃ±ala â€œnadie podrÃ¡ ser juzgado sino conforme a las leyes preexistentes al acto que se le imputa, ante el juez o tribunal competente y con la observancia de la plenitud de las formas propias de cada juicioâ€; corresponde al principio de:','1','1','Legalidad','active'),(26,2,1,5,'La definiciÃ³n que indica â€œla ley penal se aplicarÃ¡ a las personas sin tener en cuenta consideraciones diferentes a las establecidas en ella. El funcionario judicial tendrÃ¡ especial consideraciÃ³n cuando se trate de valorar el injusto, la culpabilidad y las consecuencias jurÃ­dicas del delito, en relaciÃ³n con las personas que se encuentren en las situaciones descritas en el inciso final del artÃ­culo 13 de la ConstituciÃ³n PolÃ­ticaâ€; corresponde al principio de:','1','1','Igualdad','active'),(27,2,1,6,'La definiciÃ³n â€œEs obligaciÃ³n de los servidores judiciales hacer efectiva la igualdad de los intervinientes en el desarrollo de la actuaciÃ³n procesal y proteger, especialmente, a aquellas personas que por su condiciÃ³n econÃ³mica, fÃ­sica o mental, se encuentren en circunstancias de debilidad manifiestaâ€; que se encuentra en el CÃ³digo el CÃ³digo de Procedimiento Penal Colombiano corresponde al principio de:','1','1','Igualdad','active'),(28,4,2,0,'Una consecuencia del Principio de PresunciÃ³n de inocencia e in dubio pro reo del CÃ³digo de Procedimiento Penal Colombiano se dirige a que:','1','1','CorresponderÃ¡ al Ã³rgano de persecuciÃ³n penal la carga de la prueba acerca de la responsabilidad penal.','active'),(29,5,3,0,'SegÃºn el Principio de PresunciÃ³n de inocencia e in dubio pro reo del CÃ³digo de Procedimiento Penal Colombiano:','1','1','En ningÃºn caso podrÃ¡ invertirse esta carga probatoria.','active'),(30,2,1,5,'En la Ley Penal Colombiana para proferir sentencia condenatoria deberÃ¡ existir convencimiento de la responsabilidad penal del acusado:','1','1','MÃ¡s allÃ¡ de toda duda','active'),(31,5,3,0,'Cual de las siguientes no es una excepciÃ³n al Principio de Publicidad de las actuaciones procesales en Derecho Penal.','1','1','Los casos en que se deba reconstruir el expediente','active'),(32,4,2,0,'Cual no es una forma de manifestaciÃ³n de la AdministraciÃ³n PÃºblica:','1','1','AcciÃ³n de tutela','active'),(33,2,1,5,'CuÃ¡les son las formas de manifestaciÃ³n de la AdministraciÃ³n PÃºblica:','1','1','Operaciones, omisiones, hechos y actos administrativos, contratos administrativos y vÃ­as de hecho.','active'),(34,4,2,0,'La definiciÃ³n: â€œManifestaciÃ³n unilateral de voluntad de la AdministraciÃ³n orientada a la producciÃ³n de efectos jurÃ­dicos, creando, modificando o alterando la situaciÃ³n jurÃ­dica del destinatario y produciendo efectos jurÃ­dicos individuales;â€ corresponde a:','1','1','Acto administrativo','active'),(35,2,1,5,'En la ley administrativa colombiana es la violaciÃ³n ostensible y flagrante de las competencias otorgadas a la AdministraciÃ³n PÃºblica.','1','1','VÃ­a de echo','active'),(36,5,3,0,'En la ley administrativa colombiana la transferencia del ejercicio de funciones a sus colaboradores o a otras autoridades, con funciones afines o complementarias es:','1','1','DelegaciÃ³n','active'),(37,2,1,4,'Las normas de la Parte Primera del CÃ³digo de Procedimiento Administrativo y de lo Contencioso Administrativo se aplican:','1','1','A todos los organismos y entidades que conforman las ramas del poder pÃºblico en sus distintos Ã³rdenes, sectores y niveles, a los Ã³rganos autÃ³nomos e independientes del Estado y a los particulares, cuando cumplan funciones administrativas. A todos ellos se les darÃ¡ el nombre de autoridades.','active'),(38,5,3,0,'SegÃºn el CÃ³digo de Procedimiento Administrativo y de lo Contencioso Administrativo, todos los organismos y entidades que conforman las ramas del poder pÃºblico en sus distintos Ã³rdenes, sectores y niveles, a los Ã³rganos autÃ³nomos e independientes del Estado y a los particulares, cuando cumplan funciones administrativas se les darÃ¡ el nombre de:','1','1','Autoridades','active'),(39,2,1,5,'Las disposiciones de la Parte Primera del CÃ³digo de Procedimiento Administrativo y de lo Contencioso Administrativo se aplicarÃ¡:','1','1','A todos los organismos y entidades que conforman las ramas del poder pÃºblico en sus distintos Ã³rdenes, sectores y niveles, a los Ã³rganos autÃ³nomos e independientes del Estado y a los particulares, cuando cumplan funciones administrativas. A todos ellos se les darÃ¡ el nombre de autoridades.','active'),(40,4,2,0,'SegÃºn el CÃ³digo de Procedimiento Administrativo y de lo Contencioso Administrativo la definiciÃ³n: â€œlas actuaciones administrativas se adelantarÃ¡n de conformidad con las normas de procedimiento y competencia establecidas en la ConstituciÃ³n y la ley, con plena garantÃ­a de los derechos de representaciÃ³n, defensa y contradicciÃ³nâ€; corresponde al principio de:','1','1','Debido proceso','active'),(41,3,1,7,'En materia administrativa sancionatoria, cuÃ¡l de los siguientes no es un principio adicional a los principios de cualquier actuaciÃ³n administrativa.','1','1','La costumbre en ningÃºn caso tiene fuerza contra ley.','active'),(42,5,3,0,'La JurisdicciÃ³n de lo Contencioso Administrativo estÃ¡ instituida para conocer, ademÃ¡s de lo dispuesto en la ConstituciÃ³n PolÃ­tica y en leyes especiales, de las controversias y litigios originados en actos, contratos, hechos, omisiones y operaciones, sujetos al derecho administrativo, en los que estÃ©n:','1','1','Involucradas las entidades pÃºblicas o los particulares cuando ejerzan funciÃ³n administrativa','active'),(44,5,3,0,'Para los efectos del CÃ³digo de Procedimiento Administrativo y de lo Contencioso Administrativo, se entiende por entidad pÃºblica todo Ã³rgano, organismo o entidad estatal, con independencia de su denominaciÃ³n; las sociedades o empresas en las que el Estado tenga una participaciÃ³n igual o superior al:','1','1','50% de su capital; y los entes con aportes o participaciÃ³n estatal igual o superior al 50%. ','active'),(45,5,3,0,'La JurisdicciÃ³n de lo Contencioso Administrativo conocerÃ¡ de  los siguientes procesos:','1','1','','active'),(46,5,3,0,'La JurisdicciÃ³n de lo Contencioso Administrativo conocerÃ¡ de  los siguientes procesos:','1','1','Los recursos extraordinarios contra laudos arbitrales que definan conflictos relativos a contratos celebrados por entidades pÃºblicas o por particulares en ejercicio de funciones propias del Estado.','active'),(47,4,2,0,'La JurisdicciÃ³n de lo Contencioso Administrativo estÃ¡ integrada por:','1','1','El Consejo de Estado, los Tribunales Administrativos y los juzgados administrativos.','active'),(48,5,3,0,'El CÃ³digo Sustantivo del Trabajo de Colombia regula las relaciones de:','1','1','Derecho individual del Trabajo de carÃ¡cter particular, y las de derecho colectivo del Trabajo, oficiales y particulares.','active'),(49,5,3,0,'El CÃ³digo Sustantivo del Trabajo colombiano rige en todo el territorio de la RepÃºblica para todos sus habitantes, y para:','1','1','Todas las personas sin consideraciÃ³n a su nacionalidad.','active'),(50,4,2,0,'En el CÃ³digo Sustantivo del Trabajo de Colombia el trabajo es:','1','1','Socialmente obligatorio','active'),(51,2,1,4,'La definiciÃ³n â€œNadie puede impedir el trabajo a los demÃ¡s, ni que se dediquen a la profesiÃ³n, industria o comercio que les plazca, siendo lÃ­cito su ejercicio, sino mediante resoluciÃ³n de autoridad competente encaminada a tutelar los derechos de los trabajadores o de la sociedad, en los casos que se prevean en la leyâ€; se adapta al principio de:','1','1','Libertad del Trabajo.','active'),(52,3,1,7,'La definiciÃ³n: â€œEl trabajo goza de la protecciÃ³n del Estado, en la forma prevista en la ConstituciÃ³n Nacional y las leyes. Los funcionarios pÃºblicos estÃ¡n obligados a prestar a los trabajadores una debida y oportuna protecciÃ³n para la garantÃ­a y eficacia de sus derechos, de acuerdo con sus atribucionesâ€; se adapta al principio de:','1','1','ProtecciÃ³n al trabajo','active'),(53,1,1,1,'La JurisdicciÃ³n Ordinaria, en su especialidad laboral y de seguridad social  no conoce de:','1','1','Los  conflictos que se originen en actos polÃ­ticos o de gobierno.','active'),(54,5,3,0,'En el CÃ³digo de Procedimiento Laboral y de la Seguridad Social la competencia territorial se determina por:','1','1','Por el Ãºltimo lugar donde se haya prestado el servicio, o por el domicilio del demandado, a elecciÃ³n del demandante.','active'),(55,1,1,0,'El texto: â€œLas acciones contenciosas contra la NaciÃ³n, las entidades territoriales y cualquiera otra entidad de la administraciÃ³n pÃºblica sÃ³lo podrÃ¡n iniciarse cuando se haya agotado la reclamaciÃ³n administrativa. Esta reclamaciÃ³n consiste en el simple reclamo escrito del servidor pÃºblico o trabajador sobre el derecho que pretenda, y se agota cuando se haya decidido o cuando transcurrido un mes desde su presentaciÃ³n no ha sido resueltaâ€; corresponde a:','1','1','','active'),(56,5,3,0,'SegÃºn el CÃ³digo de Procedimiento Laboral y de la Seguridad Social en los procesos que se sigan contra la NaciÃ³n serÃ¡ competente el juez laboral del circuito de:','1','1','','active'),(57,1,1,0,'SegÃºn el CÃ³digo de Procedimiento Laboral y de la Seguridad Social en los lugares donde no haya Juez Laboral, conocerÃ¡ de estos procesos:','1','1','','active'),(58,4,2,0,'SegÃºn el CÃ³digo de Comercio Colombiano a las cuestiones comerciales que no pudieren regularse conforme a su normativa se  les aplicarÃ¡ la legislaciÃ³n:','1','1','Civil','active'),(59,4,2,0,'SegÃºn el CÃ³digo de Comercio Colombiano la costumbre mercantil:','1','1','Tiene la misma autoridad que la ley comercial, siempre que no la contrarÃ­e manifiesta o tÃ¡citamente.','active'),(60,4,2,0,'SegÃºn el CÃ³digo de Comercio Colombiano, para que la costumbre tenga la misma autoridad que la ley no debe contrariarla manifiesta o tÃ¡citamente y ademÃ¡s sus hechos constitutivos deben ser:','1','1','PÃºblicos, uniformes y reiterados en el lugar donde hayan de cumplirse las prestaciones','active'),(61,3,1,0,'SegÃºn el CÃ³digo de Comercio Colombiano son comerciantes:','1','1','Las personas que profesionalmente se ocupan en alguna de las actividades que la ley considera mercantiles.','active'),(62,5,3,0,'Para todos los efectos legales del CÃ³digo de Comercio Colombiano una de las siguientes no es una presunciÃ³n de ejercicio del comercio:','1','1','Cuando una persona ejecute ocasionalmente operaciones mercatiles.','active'),(63,4,2,0,'El cÃ³digo que regula la actividad procesal en materia comercial es el:','1','1','CÃ³digo General del Proceso','active'),(64,2,1,6,'El CÃ³digo General del Proceso al seÃ±alar: â€œCorresponde a la jurisdicciÃ³n ordinaria, el conocimiento de todo asunto que no estÃ© atribuido expresamente por la ley a otra jurisdicciÃ³n. Corresponde a la jurisdicciÃ³n ordinaria en su especialidad civil, el conocimiento de todo asunto que no estÃ© atribuido expresamente por la ley a otra especialidad jurisdiccional ordinaria. Corresponde a los jueces civiles del circuito todo asunto que no estÃ© atribuido expresamente por la ley a otro juez civil.â€; establece:','1','1','La clÃ¡usula general o residual de competencia.','active'),(65,5,3,0,'SegÃºn el CÃ³digo General del Proceso la jurisdicciÃ³n y la competencia por los factores subjetivo y funcional son:','1','1','Improrrogables','active'),(66,4,2,0,'SegÃºn el CÃ³digo General del Proceso la falta de competencia por factores distintos del subjetivo o funcional es:','1','1','Prorrogable','active'),(67,5,3,0,'De acuerdo al CÃ³digo General del Proceso cuando la competencia se determine por la cuantÃ­a, los procesos son de:','1','1','Mayor, de menor y de mÃ­nima cuantÃ­a.','active'),(68,4,2,0,'SegÃºn el CÃ³digo Civil Colombiano los esponsales o desposorios, o sea la promesa de matrimonio mutuamente aceptada, es un hecho privado que las leyes someten enteramente al honor y ciencia del individuo, y que:','1','1','No produce obligaciÃ³n alguna ante la ley civil.','active'),(69,5,3,0,'De conformidad con el CÃ³digo Civil Colombiano el Matrimonio es:','1','1','Un contrato','active'),(70,3,1,7,'SegÃºn el CÃ³digo Civil Colombiano cual es la edad para que las personas puedan contraer matrimonio libremente.','1','1','Mayores de 14 aÃ±os','active'),(71,4,2,0,'En la Ley Colombiana el matrimonio civil se disuelve por:','1','1','La muerte real o presunta de uno de los cÃ³nyuges o por divorcio judicialmente decretado.','active'),(72,5,3,0,'En la Ley Colombiana  en el juicio de divorcio son partes:','1','1','Ãšnicamente los cÃ³nyugues','active'),(73,5,3,0,'El cÃ³digo que regula la actividad procesal en los asuntos de familia es:','1','1','CÃ³digo general del proceso','active'),(74,4,2,0,'Las actuaciones que regula el CÃ³digo General del Proceso en asuntos de familia se surtirÃ¡n:','1','1','En forma oral, pÃºblica y en audiencias.','active'),(75,5,3,0,'No son asuntos de competencia de los Jueces de Familia en Ãºnica instancia:','1','1','De la celebraciÃ³n del matrimonio civil, sin perjuicio de la competencia atribuida a los notarios.','active'),(76,2,1,0,'No son asuntos de competencia de los Jueces de Familia en primera instancia:','1','1','De las acciones populares y de grupo no atribuidas a la jurisdicciÃ³n de lo contencioso administrativo.','active'),(77,4,2,0,'Cuando el CÃ³digo General del Proceso de Colombia seÃ±ala â€œEntregada por el notario al juzgado la cubierta del testamento y la copia de lo actuado ante aquel, una vez reconocidas las firmas, se extenderÃ¡ acta sobre el estado en que aquella se encuentre, con expresiÃ³n de sus marcas, sellos y demÃ¡s circunstancias de interÃ©s y se seÃ±alarÃ¡ fecha y hora para audiencia, con el fin de resolver sobre la oposiciÃ³nâ€; estÃ¡ hablando de:','1','1','La apertura judicial del testamento.','active'),(79,1,1,1,'En el PreÃ¡mbulo de la ConstituciÃ³n PolÃ­tica de 1991 se:','1','1','Formulan las directrices que inspiran su promulgaciÃ³n.','active'),(80,4,2,0,'El conjunto de normas en que se establecen los derechos y obligaciones de los ciudadanos, la estructura y organizaciÃ³n del Estado y su ordenamiento jurÃ­dico es:','1','1','La ConstituciÃ³n PolÃ­tica.','active'),(81,3,1,7,'SegÃºn la ConstituciÃ³n PolÃ­tica Colombia es:','1','1','Un Estado Social de Derecho.','active');
/*!40000 ALTER TABLE `jur_questions` ENABLE KEYS */;
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
  `points` varchar(50) DEFAULT NULL,
  `level` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jur_users`
--

LOCK TABLES `jur_users` WRITE;
/*!40000 ALTER TABLE `jur_users` DISABLE KEYS */;
INSERT INTO `jur_users` (`id`, `role`, `name`, `image`, `image_biography`, `username`, `email`, `password`, `points`, `level`) VALUES (1,'admin','Daniel Sanchez','11693802_759355874186210_7492641497454904237_n.jpg','car.jpg','Administrador','dmsanchez86@misena.edu.co','dd81e8031be5f4bc4362c6b7382c9c04','0','1'),(16,'user','Camila',NULL,NULL,NULL,'admin@gmail.com','e10adc3949ba59abbe56e057f20f883e','0','2'),(19,'user','herman','contact.jpg','iphone.jpg','heanfig','heanfig@misena.edu.co','e10adc3949ba59abbe56e057f20f883e','0','1'),(20,'user','oscar','default_user.png','','oscardavid','oscardavid@zoppagency.com','4fe14e1599589ceecd0a19b59845f2e4','0','1'),(21,'user','Mauro','default_user.png','default.jpg','dmsanchez2015','dmsanchez2015@gmail.com','e10adc3949ba59abbe56e057f20f883e','0','1'),(23,'user','Muro Avila','defaul_user.png','default.png','dmsanchez86','dmsanchez86@gmail.com','e10adc3949ba59abbe56e057f20f883e','0','1');
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

-- Dump completed on 2015-07-28 23:04:58
