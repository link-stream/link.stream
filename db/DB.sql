-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: db01.streamy.link    Database: streamy_dev
-- ------------------------------------------------------
-- Server version	5.7.26-log

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED='';

--
-- Table structure for table `st_early_access`
--

DROP TABLE IF EXISTS `st_early_access`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `st_early_access` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_early_access`
--

LOCK TABLES `st_early_access` WRITE;
/*!40000 ALTER TABLE `st_early_access` DISABLE KEYS */;
INSERT INTO `st_early_access` VALUES (12,'paolofq@gmail.com','3059705118','2020-01-13 21:37:25');
/*!40000 ALTER TABLE `st_early_access` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_streamy`
--

DROP TABLE IF EXISTS `st_streamy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `st_streamy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  `type_id` int(11) DEFAULT NULL,
  `priority_id` int(11) DEFAULT NULL,
  `genre_id` int(11) DEFAULT NULL,
  `public` int(11) DEFAULT '0',
  `publish_at` date DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  `audio_file` varchar(100) DEFAULT NULL,
  `coverart` varchar(45) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_streamy`
--

LOCK TABLES `st_streamy` WRITE;
/*!40000 ALTER TABLE `st_streamy` DISABLE KEYS */;
INSERT INTO `st_streamy` VALUES (35,'2019-12-23 13:12:50',3,'Go Hard Prod Silo1',1,1,2,16,1,'2019-12-23','https://soundcloud.com/iamstarinthesky/go-hard-prod-silo',NULL,NULL,NULL),(39,'2019-12-23 13:12:50',3,'Beat It',1,2,2,4,1,'2019-12-23','https://www.youtube.com/watch?v=oRdxUFDoQe0',NULL,NULL,NULL),(56,'2019-12-24 14:17:14',3,'My First Mp3',3,4,2,1,1,'2019-12-24','24d02f404ebbc7c4c2897247ee9b7647.mp3',NULL,'3b76ec8d337e4094722919fc9e7431f6.png',NULL),(59,'2019-12-27 00:28:40',3,'Etags',1,3,2,2,2,'2019-12-27','http://www.etags.com',NULL,NULL,NULL),(132,'2020-01-03 09:04:40',3,'Snow Angel',3,1,2,1,1,'2020-01-03','https://soundcloud.com/iamstarinthesky/snow-angel-feat-skele-and-shigaraki-prod-sogimura',NULL,NULL,NULL),(133,'2020-01-13 23:10:24',4,'Lane 8 - March Of The Forest Cat',1,1,2,16,1,NULL,'https://soundcloud.com/lane8music/march-of-the-forest-cat',NULL,NULL,NULL),(134,'2020-01-13 23:10:24',4,'Lane 8 - Brightest Lights feat. POLIÇA',1,2,2,1,1,NULL,'https://www.youtube.com/watch?v=CARHyGAsv6Y#action=share',NULL,NULL,NULL),(135,'2020-01-14 04:37:50',3,'Streamy',1,3,2,2,3,'2020-01-15','https://streamy-dev.streamy.link/',NULL,NULL,NULL),(136,'2020-01-14 04:57:42',3,'2pac feat Dr.Dre - California Love HD',1,2,1,3,1,'2020-01-14','https://www.youtube.com/watch?v=5wBTdfAkqGU',NULL,NULL,NULL),(137,'2020-01-14 23:22:54',4,NULL,1,NULL,NULL,NULL,NULL,'2020-01-14','',NULL,NULL,NULL),(138,'2020-01-14 23:24:22',4,NULL,1,NULL,NULL,NULL,NULL,'2020-01-14','',NULL,NULL,NULL),(139,'2020-01-15 00:38:08',3,'The Box',1,1,2,1,1,'2020-01-15','https://soundcloud.com/roddyricch/the-box',NULL,NULL,NULL),(140,'2020-01-15 00:41:33',3,'The Box',1,1,2,1,1,'2020-01-15','https://soundcloud.com/roddyricch/the-box',NULL,NULL,NULL),(141,'2020-01-15 01:20:43',20,'A',1,1,2,4,1,'2020-01-15','https://soundcloud.com/roddyricch/high-fashion-feat-mustard',NULL,NULL,NULL),(142,'2020-01-15 01:22:25',20,'aeas',1,4,2,1,1,'2020-01-15','c88e54fb004839b86ac5d096dfc9832f.mp3',NULL,'64318d7c7200b6a9c91ac0f32f321313.png',NULL),(143,'2020-01-15 02:12:46',4,NULL,1,NULL,NULL,NULL,NULL,'2020-01-15','',NULL,NULL,NULL);
/*!40000 ALTER TABLE `st_streamy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_streamy_genre`
--

DROP TABLE IF EXISTS `st_streamy_genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `st_streamy_genre` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `genre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_streamy_genre`
--

LOCK TABLES `st_streamy_genre` WRITE;
/*!40000 ALTER TABLE `st_streamy_genre` DISABLE KEYS */;
INSERT INTO `st_streamy_genre` VALUES (1,'None'),(2,'Custom'),(3,'Hip-hop &amp; Rap'),(4,'Alternative Rock'),(5,'Ambient'),(6,'Classical'),(7,'Country'),(8,'Dance & EDM'),(9,'Dancehall'),(10,'Deep House'),(11,'Disco'),(12,'Drum'),(13,'Dubstep'),(14,'Electronic'),(15,'Folk & Singer-Songwriter'),(16,'House'),(17,'Indie'),(18,'Jazz & Blues'),(19,'Latin'),(20,'Metal'),(21,'Piano'),(22,'Pop'),(23,'R & B & Soul'),(24,'Reggae'),(25,'Reggaeton'),(26,'Rock'),(27,'Soundtrack'),(28,'Techno'),(29,'Trance'),(30,'Trap'),(31,'Triphop'),(32,'World'),(33,'Audiobooks'),(34,'Business'),(35,'Comedy'),(36,'Entertainment'),(37,'Learning'),(38,'News & Politics'),(39,'Religion & Spirituality'),(40,'Science'),(41,'Sports'),(42,'Storytelling'),(43,'Technology');
/*!40000 ALTER TABLE `st_streamy_genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_streamy_priority`
--

DROP TABLE IF EXISTS `st_streamy_priority`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `st_streamy_priority` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `priority` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_streamy_priority`
--

LOCK TABLES `st_streamy_priority` WRITE;
/*!40000 ALTER TABLE `st_streamy_priority` DISABLE KEYS */;
INSERT INTO `st_streamy_priority` VALUES (1,'Spotlight'),(2,'Normal');
/*!40000 ALTER TABLE `st_streamy_priority` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_streamy_type`
--

DROP TABLE IF EXISTS `st_streamy_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `st_streamy_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(10) DEFAULT NULL,
  `active` int(11) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_streamy_type`
--

LOCK TABLES `st_streamy_type` WRITE;
/*!40000 ALTER TABLE `st_streamy_type` DISABLE KEYS */;
INSERT INTO `st_streamy_type` VALUES (1,'SoundCloud',1),(2,'YouTube',1),(3,'LinkStream',1),(4,'Streamy',1),(5,'TikTok',0);
/*!40000 ALTER TABLE `st_streamy_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_user`
--

DROP TABLE IF EXISTS `st_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `st_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) DEFAULT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `display_name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `email_confirmed` int(11) DEFAULT '0',
  `password` varchar(45) DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  `plan_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `url` varchar(45) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL,
  `banner` varchar(45) DEFAULT NULL,
  `about` varchar(45) DEFAULT NULL,
  `youtube` varchar(45) DEFAULT NULL,
  `facebook` varchar(45) DEFAULT NULL,
  `instagram` varchar(45) DEFAULT NULL,
  `twitter` varchar(45) DEFAULT NULL,
  `soundcloud` varchar(45) DEFAULT NULL,
  `email_paypal` varchar(45) DEFAULT NULL,
  `platform` varchar(10) DEFAULT NULL,
  `platform_id` varchar(45) DEFAULT NULL,
  `platform_token` varchar(200) DEFAULT NULL,
  `bio` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_user`
--

LOCK TABLES `st_user` WRITE;
/*!40000 ALTER TABLE `st_user` DISABLE KEYS */;
INSERT INTO `st_user` VALUES (3,'paolofq',NULL,NULL,'Paolo FQ','paolofq1@gmail.com',1,'968671695f00cd9a7c953a0d13f57a727b5e3468',1,3,'2019-12-23 10:06:03','paolofq',NULL,'1578974447.png','ba048692a1bd7fb319bc790c653b523d.png','The Hip Hop Master','www.youtube.com/paolo','www.facebook.com/paolo','www.instagram.com/paolo','www.twitter.com/paolo','www.soundcloud.com/paolo',NULL,'Streamy',NULL,NULL,'May I have your attention, please?                                     May I have your attention, please?                                     Will the real Slim Shady please stand up?                                     I repeat, will the real Slim Shady please stand up?                                     We\'re gonna have a problem here'),(4,'alyssa',NULL,NULL,'Alyssa T','alyssa.tucker@gmail.com',1,'968671695f00cd9a7c953a0d13f57a727b5e3468',1,1,'2020-01-13 16:27:30','alyssat',NULL,'avatar_example.jpg','banner_example.jpg','The Hip Hop Master','www.youtube.com/alyssat','www.facebook.com/alyssat','www.instagram.com/alyssat','www.twitter.com/alyssat','www.soundcloud.com/alyssat',NULL,'Streamy',NULL,NULL,'May I have your attention, please?                                     May I have your attention, please?                                     Will the real Slim Shady please stand up?                                     I repeat, will the real Slim Shady please stand up?                                     We\'re gonna have a problem here'),(18,'pp',NULL,NULL,'pp','paolofq@gmail.com',1,'968671695f00cd9a7c953a0d13f57a727b5e3468',1,1,'2020-01-15 00:54:19','pp',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Streamy',NULL,NULL,NULL),(19,'paulferra','Paul','Ferra','paulferra','paul@streamy.link',1,NULL,1,1,'2020-01-15 01:00:08','paulferra',NULL,'1579050008.png',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Google','117760544938043538049','eyJhbGciOiJSUzI1NiIsImtpZCI6IjVlZGQ5NzgyZDgyMDQwM2VlODUxOGM0YWFiYjJiOWZlMzEwY2FjMTIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiNTA4NjIwMzMyMDcxLWJsdTdzZDl0M29zZ2M1NnNnMWhucTltO',NULL),(20,'gabytagarces',NULL,NULL,'gabytagarces','',0,NULL,1,1,'2020-01-15 01:03:20','gabytagarces',NULL,'1579050198.png',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'IG','17841400070704336','IGQVJXS1o5cktiU2NhTEp1YTJJamVrempkSnVlMkJTb1NoekY0R1ZAWSXdHLVlXUzYxeHpGUmRDdWhfbDNET19rc2k3UXdYSTBpY09Gak04ek5IQVFOQTFZAbHgzR0pIUlhGblgtbEhkc29keHFfcWF3aWwwOTdtVlUtbmZAR',NULL),(21,'alyssat',NULL,NULL,'alyssat','alyssa@hydrokitty.com',1,'64a57955fa58e864dbe5b376e0c68bbbc5ccfa19',1,1,'2020-01-18 19:33:44','alyssat',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Streamy',NULL,NULL,NULL);
/*!40000 ALTER TABLE `st_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_user_log`
--

DROP TABLE IF EXISTS `st_user_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `st_user_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `event` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_user_log`
--

LOCK TABLES `st_user_log` WRITE;
/*!40000 ALTER TABLE `st_user_log` DISABLE KEYS */;
INSERT INTO `st_user_log` VALUES (1,1,'2019-12-11 23:02:15','Registered'),(2,2,'2019-12-11 23:08:35','Registered'),(3,3,'2019-12-12 15:57:50','Registered'),(4,3,'2019-12-12 16:10:28','Logged in'),(5,3,'2019-12-12 16:10:53','Logged in'),(6,3,'2019-12-12 16:12:02','Logged in'),(7,3,'2019-12-12 21:56:59','Logged in'),(8,3,'2019-12-12 23:13:43','Logged in'),(9,3,'2019-12-12 23:24:29','Logged in'),(10,3,'2019-12-12 23:29:14','Logged in'),(11,3,'2019-12-13 15:02:31','Logged in'),(12,3,'2019-12-13 15:03:38','Logged in'),(13,3,'2019-12-13 15:03:57','Logged in'),(14,3,'2019-12-13 15:04:15','Logged in'),(15,3,'2019-12-13 15:13:07','Logged in'),(16,3,'2019-12-13 16:12:59','Logged in'),(17,3,'2019-12-13 20:00:38','Logged in'),(18,3,'2019-12-13 20:05:34','Logged in'),(19,3,'2019-12-13 20:07:49','Logged in'),(20,3,'2019-12-13 20:11:15','Logged in'),(21,3,'2019-12-13 20:12:50','Logged in'),(22,3,'2019-12-13 20:14:24','Logged in'),(23,3,'2019-12-13 20:14:32','Logged in'),(24,3,'2019-12-13 20:22:09','Logged in'),(25,3,'2019-12-13 20:23:38','Logged in'),(26,3,'2019-12-14 15:02:11','Logged in'),(27,3,'2019-12-15 04:21:38','Logged in'),(28,4,'2019-12-15 04:22:20','Registered'),(29,5,'2019-12-15 04:23:24','Registered'),(30,5,'2019-12-15 04:25:37','Logged in'),(31,6,'2019-12-15 04:26:19','Registered'),(32,6,'2019-12-15 04:41:49','Logged in'),(33,4,'2019-12-15 17:17:28','Logged in'),(34,1,'2019-12-16 10:12:17','Registered'),(35,0,'2019-12-16 10:12:40','Confirmed Email'),(36,1,'2019-12-16 10:14:50','Confirmed Email'),(37,1,'2019-12-16 10:22:01','Confirmed Email'),(38,2,'2019-12-16 11:11:07','Registered'),(39,2,'2019-12-16 13:07:06','Logged in'),(40,2,'2019-12-16 14:52:41','Logged in'),(41,2,'2019-12-16 21:30:40','Logged in'),(42,2,'2019-12-17 11:15:52','Logged in'),(43,2,'2019-12-17 14:39:06','Logged in'),(44,2,'2019-12-17 15:46:58','Logged in'),(45,2,'2019-12-18 10:28:49','Logged in'),(46,2,'2019-12-19 11:03:48','Logged in'),(47,2,'2019-12-19 21:05:23','Logged in'),(48,2,'2019-12-21 12:53:11','Logged in'),(49,2,'2019-12-22 10:20:38','Logged in'),(50,2,'2019-12-22 17:53:10','Logged in'),(51,3,'2019-12-23 10:06:03','Registered'),(52,3,'2019-12-23 10:07:01','Confirmed Email'),(53,5,'2020-01-14 21:15:09','Registered'),(54,6,'2020-01-14 21:17:23','Registered'),(55,7,'2020-01-14 21:22:39','Registered'),(56,7,'2020-01-14 21:23:25','Confirmed Email'),(57,7,'2020-01-14 21:24:17','Confirmed Email'),(58,7,'2020-01-14 21:24:40','Confirmed Email'),(59,8,'2020-01-14 21:27:51','Registered'),(60,9,'2020-01-14 21:37:27','Registered'),(61,9,'2020-01-14 21:39:53','Logged in'),(62,9,'2020-01-14 21:40:28','Logged in'),(63,9,'2020-01-14 21:41:13','Logged in'),(64,9,'2020-01-14 21:42:40','Logged in'),(65,10,'2020-01-14 21:47:32','Registered'),(66,11,'2020-01-14 21:50:31','Registered'),(67,12,'2020-01-14 21:51:26','Registered'),(68,13,'2020-01-14 21:54:49','Registered'),(69,14,'2020-01-14 21:56:13','Registered'),(70,14,'2020-01-14 22:08:37','Logged in'),(71,15,'2020-01-14 22:12:49','Registered'),(72,16,'2020-01-14 22:14:12','Registered'),(73,17,'2020-01-14 22:14:47','Registered'),(74,17,'2020-01-14 22:17:06','Logged in'),(75,17,'2020-01-14 22:17:39','Logged in'),(76,14,'2020-01-15 00:50:59','Logged in'),(77,18,'2020-01-15 00:54:19','Registered'),(78,18,'2020-01-15 00:56:13','Confirmed Email'),(79,19,'2020-01-15 01:00:08','Registered'),(80,19,'2020-01-15 01:01:23','Logged in'),(81,20,'2020-01-15 01:03:20','Registered'),(82,20,'2020-01-17 21:39:25','Logged in'),(83,21,'2020-01-18 19:33:44','Registered'),(84,21,'2020-01-18 19:34:41','Confirmed Email');
/*!40000 ALTER TABLE `st_user_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_user_plan`
--

DROP TABLE IF EXISTS `st_user_plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `st_user_plan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `plan` varchar(25) DEFAULT NULL,
  `price` float(8,2) DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_user_plan`
--

LOCK TABLES `st_user_plan` WRITE;
/*!40000 ALTER TABLE `st_user_plan` DISABLE KEYS */;
INSERT INTO `st_user_plan` VALUES (1,'Free Client',0.00),(2,'Pro Client',4.95),(3,'Pro Client - Free',0.00);
/*!40000 ALTER TABLE `st_user_plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_user_status`
--

DROP TABLE IF EXISTS `st_user_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `st_user_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_user_status`
--

LOCK TABLES `st_user_status` WRITE;
/*!40000 ALTER TABLE `st_user_status` DISABLE KEYS */;
INSERT INTO `st_user_status` VALUES (1,'ACTIVE'),(2,'INACTIVE'),(3,'PENDING');
/*!40000 ALTER TABLE `st_user_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `st_user_streamy_order`
--

DROP TABLE IF EXISTS `st_user_streamy_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `st_user_streamy_order` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `st_user_streamy_order`
--

LOCK TABLES `st_user_streamy_order` WRITE;
/*!40000 ALTER TABLE `st_user_streamy_order` DISABLE KEYS */;
INSERT INTO `st_user_streamy_order` VALUES (1,3,1),(2,3,2),(3,3,3),(4,3,4);
/*!40000 ALTER TABLE `st_user_streamy_order` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-18 15:17:17
