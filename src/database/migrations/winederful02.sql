-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: winederful
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.33-MariaDB

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
-- Dumping data for table `adresses`
--

LOCK TABLES `adresses` WRITE;
/*!40000 ALTER TABLE `adresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `adresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `buyer_users`
--

LOCK TABLES `buyer_users` WRITE;
/*!40000 ALTER TABLE `buyer_users` DISABLE KEYS */;
INSERT INTO `buyer_users` VALUES (1,'Gabi','Rubin',12345678,'gabi@winederful.com','$2b$10$EMbhbfXEFvSLsIkoKesj8uVoZFHvAL4CgcnyhWGVt/pCc42ewThWS','170ea88e6197bd5a7f10e8e18c1f0a01');
/*!40000 ALTER TABLE `buyer_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `cellar_users`
--

LOCK TABLES `cellar_users` WRITE;
/*!40000 ALTER TABLE `cellar_users` DISABLE KEYS */;
INSERT INTO `cellar_users` VALUES (1,'VeroBodega','VeroBodega SA',30123456781,'Argentina','Buenos Aires','vero@winederful.com','$2b$10$gsnp3GxQ/iEHlwcKKlG6F.2QW73k5QoyeMkGNPSULeBz/BhzArv92','c3937ecb5e5bcd9211d08c8533992098');
/*!40000 ALTER TABLE `cellar_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `orders_products`
--

LOCK TABLES `orders_products` WRITE;
/*!40000 ALTER TABLE `orders_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Vino A','Merlot','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non neque vel tellus efficitur viverra. Nulla scelerisque scelerisque semper. Nam ac sagittis purus. Integer hendrerit tristique sapien. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur hendrerit ante ut quam fermentum ultricies. Cras nec mi id turpis tincidunt rutrum at quis quam. Phasellus vitae condimentum velit. Morbi luctus nunc malesuada felis viverra, nec pharetra lorem faucibus. Cras accumsan tellus sed est convallis, ut elementum leo maximus. Morbi mollis dui magna, in tempus massa cursus vel. Nam in interdum quam, non suscipit nibh. Maecenas sed tellus vel purus maximus vulputate. Suspendisse congue nisl lectus, nec feugiat tellus rhoncus non. Sed vestibulum massa velit, sagittis tempor dolor varius at.','2019','2','19',1200,100,'f3667f68ad1cbc899ebfe9ef738b1603',0,1),(2,'Vino B','Syrah','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non neque vel tellus efficitur viverra. Nulla scelerisque scelerisque semper. Nam ac sagittis purus. Integer hendrerit tristique sapien. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur hendrerit ante ut quam fermentum ultricies. Cras nec mi id turpis tincidunt rutrum at quis quam. Phasellus vitae condimentum velit. Morbi luctus nunc malesuada felis viverra, nec pharetra lorem faucibus. Cras accumsan tellus sed est convallis, ut elementum leo maximus. Morbi mollis dui magna, in tempus massa cursus vel. Nam in interdum quam, non suscipit nibh. Maecenas sed tellus vel purus maximus vulputate. Suspendisse congue nisl lectus, nec feugiat tellus rhoncus non. Sed vestibulum massa velit, sagittis tempor dolor varius at.','2018','3','18',300,2,'f65cf241004f1c2aac12989016755108',0,1),(3,'Vino C','Blend','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non neque vel tellus efficitur viverra. Nulla scelerisque scelerisque semper. Nam ac sagittis purus. Integer hendrerit tristique sapien. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur hendrerit ante ut quam fermentum ultricies. Cras nec mi id turpis tincidunt rutrum at quis quam. Phasellus vitae condimentum velit. Morbi luctus nunc malesuada felis viverra, nec pharetra lorem faucibus. Cras accumsan tellus sed est convallis, ut elementum leo maximus. Morbi mollis dui magna, in tempus massa cursus vel. Nam in interdum quam, non suscipit nibh. Maecenas sed tellus vel purus maximus vulputate. Suspendisse congue nisl lectus, nec feugiat tellus rhoncus non. Sed vestibulum massa velit, sagittis tempor dolor varius at.','2020','5','17',1000,1000,'055a74cba83c84ca586afd32b4f5ff19',0,1),(4,'Vino D','Malbec','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non neque vel tellus efficitur viverra. Nulla scelerisque scelerisque semper. Nam ac sagittis purus. Integer hendrerit tristique sapien. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur hendrerit ante ut quam fermentum ultricies. Cras nec mi id turpis tincidunt rutrum at quis quam. Phasellus vitae condimentum velit. Morbi luctus nunc malesuada felis viverra, nec pharetra lorem faucibus. Cras accumsan tellus sed est convallis, ut elementum leo maximus. Morbi mollis dui magna, in tempus massa cursus vel. Nam in interdum quam, non suscipit nibh. Maecenas sed tellus vel purus maximus vulputate. Suspendisse congue nisl lectus, nec feugiat tellus rhoncus non. Sed vestibulum massa velit, sagittis tempor dolor varius at.','2019','0','18',900,100,'10d62447359ccfdb7e089709e121805b',0,1),(5,'Vino E','Merlot','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non neque vel tellus efficitur viverra. Nulla scelerisque scelerisque semper. Nam ac sagittis purus. Integer hendrerit tristique sapien. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur hendrerit ante ut quam fermentum ultricies. Cras nec mi id turpis tincidunt rutrum at quis quam. Phasellus vitae condimentum velit. Morbi luctus nunc malesuada felis viverra, nec pharetra lorem faucibus. Cras accumsan tellus sed est convallis, ut elementum leo maximus. Morbi mollis dui magna, in tempus massa cursus vel. Nam in interdum quam, non suscipit nibh. Maecenas sed tellus vel purus maximus vulputate. Suspendisse congue nisl lectus, nec feugiat tellus rhoncus non. Sed vestibulum massa velit, sagittis tempor dolor varius at.','2018','0','18',400,10,'443006425fcdff898b73b2713ef7259c',0,1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-23 20:30:54
