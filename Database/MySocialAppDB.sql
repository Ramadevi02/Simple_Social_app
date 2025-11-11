-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: social_app
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `post_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK2jovqhqo324cubdomovkex03b` (`user_id`,`post_id`),
  KEY `FKry8tnr4x2vwemv2bb0h5hyl0x` (`post_id`),
  CONSTRAINT `FKry8tnr4x2vwemv2bb0h5hyl0x` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (25,13,5),(30,16,5),(45,13,8),(44,16,8),(43,20,8);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_history`
--

DROP TABLE IF EXISTS `password_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_history` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `password_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_history`
--

LOCK TABLES `password_history` WRITE;
/*!40000 ALTER TABLE `password_history` DISABLE KEYS */;
INSERT INTO `password_history` VALUES (1,1,'oldpass1','2025-10-06 11:01:07'),(2,1,'oldpass2','2025-10-06 11:01:07'),(3,1,'oldpass3','2025-10-06 11:01:07'),(4,3,'$2a$10$lTDxydXVPiWbO3euzjsSMeOKity9F1MW9GR19SIr/us2J.djNSgV.','2025-10-08 11:11:15'),(5,3,'$2a$10$DGd423cvGKKHQKXsIYYck.1lj5NMdW3nwuAxea4te7cjlSOXYLfl2','2025-10-08 11:25:55'),(6,4,'$2a$10$bkEDfyJfp9v6eD0Pd6QXk.n44FOoqTPcKZuVJzjbjvc4OAb0MAvd6','2025-10-10 12:23:24'),(7,5,'$2a$10$PSWwGcpZPSbP8ZRMvybKgOteFYbpsq8TjC6ltD.14cGVVxU8sdme2','2025-10-15 11:45:49'),(10,5,'$2a$10$aB3obq5PPVwp3HhSxcMZKeuOQmXqEDnfKVv9WC2oDS0jNueRj4s76','2025-11-09 05:07:03'),(11,5,'$2a$10$b5b9stHTr3X8VXDiw/OyCeTTjSfKch3zUYThbOLmC2bK9cgEJAERW','2025-11-09 15:12:57'),(12,5,'$2a$10$/O1utS5LSVOBCuQJu8o/eeYk4YCeI3LvpaKohqRhjEtOp3udIlFWC','2025-11-09 15:20:09'),(13,8,'$2a$10$Q4EGJoeZ7wjyG.gSvvVqYOrUJcrEQ/8PX32Ll3rmlF4UFtviUXFVm','2025-11-10 11:14:42');
/*!40000 ALTER TABLE `password_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `content` text NOT NULL,
  `visibility` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `post_image` varchar(500) DEFAULT NULL,
  `profile_picture` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `check_visibility_enum` CHECK ((`visibility` in (_utf8mb4'PUBLIC',_utf8mb4'PRIVATE')))
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (5,1,'Hello everyone','PUBLIC','2025-10-06 11:15:35',NULL,NULL),(6,1,'Hello everyone','PRIVATE','2025-10-06 11:15:35',NULL,NULL),(7,2,'Hello everyone','PUBLIC','2025-10-06 11:15:35',NULL,NULL),(8,3,'Hello','PUBLIC','2025-10-08 11:27:53',NULL,NULL),(11,2,'Hello world','PRIVATE','2025-10-09 11:45:12',NULL,NULL),(12,2,'Hello world','PRIVATE','2025-10-09 11:46:05',NULL,NULL),(13,4,'My forst post','PUBLIC','2025-10-13 10:49:41',NULL,NULL),(14,4,'My private post','PRIVATE','2025-10-13 10:50:21',NULL,NULL),(16,5,'People who want to see you win, will help you win.\nRemember that.','PUBLIC','2025-11-03 10:44:55',NULL,NULL),(18,2,'Hello world','PRIVATE','2025-11-06 12:09:36',NULL,NULL),(20,5,'Never let yesterday use up too much of today. ','PUBLIC','2025-11-08 05:04:13',NULL,NULL);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `profile_picture` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'alice','alice@example.com','password123','2025-10-06 10:52:49',NULL),(2,'bob','bob@example.com','password@123','2025-10-06 10:52:49',NULL),(3,'ram','ram@example.com','$2a$10$DGd423cvGKKHQKXsIYYck.1lj5NMdW3nwuAxea4te7cjlSOXYLfl2','2025-10-08 11:11:14',NULL),(4,'Arjun','arjun@example.com','$2a$10$bkEDfyJfp9v6eD0Pd6QXk.n44FOoqTPcKZuVJzjbjvc4OAb0MAvd6','2025-10-10 12:23:22',NULL),(5,'Arun Vishal','arunvarman@gmail.com','$2a$10$/O1utS5LSVOBCuQJu8o/eeYk4YCeI3LvpaKohqRhjEtOp3udIlFWC','2025-10-15 11:45:34','/uploads/1762680857526_adele.jpeg'),(8,'Nivetha','nivetha@example.cpm','$2a$10$Q4EGJoeZ7wjyG.gSvvVqYOrUJcrEQ/8PX32Ll3rmlF4UFtviUXFVm','2025-11-10 11:14:27',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-11 17:00:57
