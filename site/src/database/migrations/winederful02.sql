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

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
insert into addresses (id, streetName, streetNumber, apartment, city, zipCode) values (1, 'Golf View', '6', 1652, 'Belén de Escobar', 1406);
insert into addresses (id, streetName, streetNumber, apartment, city, zipCode) values (2, 'Rigney', '3633', 1123, 'Chicago', 1003);
insert into addresses (id, streetName, streetNumber, apartment, city, zipCode) values (3, 'Buena Vista', '1038', 3319, 'Guanyao', 1021);
insert into addresses (id, streetName, streetNumber, apartment, city, zipCode) values (4, 'Comanche', '8456', 1461, 'Aoyang', 1162);
insert into addresses (id, streetName, streetNumber, apartment, city, zipCode) values (5, 'Columbus', '422', 418, 'Lajas', 1018);
insert into addresses (id, streetName, streetNumber, apartment, city, zipCode) values (6, 'Burning Wood', '40758', 1953, 'Cut-cut Primero', 1031);
insert into addresses (id, streetName, streetNumber, apartment, city, zipCode) values (7, 'South', '69728', 2712, 'Huangqiao', 1175);
insert into addresses (id, streetName, streetNumber, apartment, city, zipCode) values (8, 'Evergreen', '91721', 80, 'Watulumbung', 1614);
insert into addresses (id, streetName, streetNumber, apartment, city, zipCode) values (9, 'Namekagon', '882', 2360, 'Ubatã', 1242);
insert into addresses (id, streetName, streetNumber, apartment, city, zipCode) values (10, 'Declaration', '112', 1484, 'Araçuaí', 1186);
insert into addresses (id, streetName, streetNumber, apartment, city, zipCode) values (11, 'Vahlen', '548', 1360, 'Quiriquire', 1092);
insert into addresses (id, streetName, streetNumber, apartment, city, zipCode) values (12, 'West', '90', 768, 'Daugavgrīva', 1070);
insert into addresses (id, streetName, streetNumber, apartment, city, zipCode) values (13, 'Spenser', '9418', 2793, 'Poręba Spytkowska', 1236);
insert into addresses (id, streetName, streetNumber, apartment, city, zipCode) values (14, 'Lake View', '4', 338, 'Tangxi', 1562);
insert into addresses (id, streetName, streetNumber, apartment, city, zipCode) values (15, 'Tony', '4', 1933, 'Yaroslavl', 1044);
insert into addresses (id, streetName, streetNumber, apartment, city, zipCode) values (16, 'Park Meadow', '6366', 3015, 'Vin’kivtsi', 1478);
insert into addresses (id, streetName, streetNumber, apartment, city, zipCode) values (17, 'Kenwood', '6', 2020, 'Dagou', 1233);
insert into addresses (id, streetName, streetNumber, apartment, city, zipCode) values (18, 'Spaight', '31', 1062, 'Labrang', 1150);
insert into addresses (id, streetName, streetNumber, apartment, city, zipCode) values (19, 'Ohio', '21', 2467, 'Carregado', 1722);
insert into addresses (id, streetName, streetNumber, apartment, city, zipCode) values (20, 'Haas', '0', 2373, 'Meijiang', 1260);
insert into addresses (id, streetName, streetNumber, apartment, city, zipCode) values (21, 'Nancy', '53793', 3747, 'Korets’', 1466);
insert into addresses (id, streetName, streetNumber, apartment, city, zipCode) values (22, 'Warrior', '775', 1456, 'Shiren', 1272);
insert into addresses (id, streetName, streetNumber, apartment, city, zipCode) values (23, 'Rockefeller', '88224', 3878, 'Bobrowice', 1354);
insert into addresses (id, streetName, streetNumber, apartment, city, zipCode) values (24, 'Anzinger', '5', 3700, 'Nazaré', 1709);
insert into addresses (id, streetName, streetNumber, apartment, city, zipCode) values (25, 'Chinook', '05406', 1393, 'Turangi', 1018);
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `buyer_users`
--

LOCK TABLES `buyer_users` WRITE;
/*!40000 ALTER TABLE `buyer_users` DISABLE KEYS */;

/*!40000 ALTER TABLE `buyer_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `cellar_users`
--

LOCK TABLES `cellar_users` WRITE;
/*!40000 ALTER TABLE `cellar_users` DISABLE KEYS */;

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
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
insert into products (id, productName, grapeId, description, year, aged, temperature, price, stock, image, discount, cellarUserId) values (1, 'ERGOCALCIFEROL', 1, 'Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.', 2007, 10, 17, 293, 136, 'http://dummyimage.com/200x300.jpg/cc0000/ffffff', 21, 1);
insert into products (id, productName, grapeId, description, year, aged, temperature, price, stock, image, discount, cellarUserId) values (2, 'Movate Carrot', 1, 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.', 1992, 8, 20, 732, 80, 'http://dummyimage.com/200x300.jpg/ff4444/ffffff', 22, 1);
insert into products (id, productName, grapeId, description, year, aged, temperature, price, stock, image, discount, cellarUserId) values (3, 'BETHANECHOL CHLORIDE', 1, 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.', 1997, 10, 19, 189, 78, 'http://dummyimage.com/200x300.png/ff4444/ffffff', 34, 1);
insert into products (id, productName, grapeId, description, year, aged, temperature, price, stock, image, discount, cellarUserId) values (4, 'Sanatos', 1, 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 2009, 9, 17, 714, 116, 'http://dummyimage.com/200x300.jpg/dddddd/000000', 7, 1);
insert into products (id, productName, grapeId, description, year, aged, temperature, price, stock, image, discount, cellarUserId) values (5, 'Hydrating Instant Hand Sanitizer', 1, 'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.', 1995, 10, 20, 846, 119, 'http://dummyimage.com/200x300.png/cc0000/ffffff', 6, 2);
insert into products (id, productName, grapeId, description, year, aged, temperature, price, stock, image, discount, cellarUserId) values (6, 'Specific Beauty Clarifying Wash Acne Treatment Cleanser', 2, 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', 2010, 10, 19, 812, 154, 'http://dummyimage.com/200x300.png/cc0000/ffffff', 21, 2);
insert into products (id, productName, grapeId, description, year, aged, temperature, price, stock, image, discount, cellarUserId) values (7, 'sunmark lice solution kit',2, 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.', 1999, 9, 19, 214, 62, 'http://dummyimage.com/200x300.bmp/5fa2dd/ffffff', 17, 2);
insert into products (id, productName, grapeId, description, year, aged, temperature, price, stock, image, discount, cellarUserId) values (8, 'Metoprolol Tartrate and Hydrochlorothiazide', 2, 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', 1998, 2, 18, 891, 53, 'http://dummyimage.com/200x300.jpg/ff4444/ffffff', 49, 3);
insert into products (id, productName, grapeId, description, year, aged, temperature, price, stock, image, discount, cellarUserId) values (9, 'Acremonium strictum', 3, 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', 1987, 2, 18, 789, 74, 'http://dummyimage.com/200x300.bmp/ff4444/ffffff', 3, 3);
insert into products (id, productName, grapeId, description, year, aged, temperature, price, stock, image, discount, cellarUserId) values (10, 'Pioglitazone Hydrochloride', 3, 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 2002, 8, 18, 936, 125, 'http://dummyimage.com/200x300.bmp/dddddd/000000', 37, 3);
insert into products (id, productName, grapeId, description, year, aged, temperature, price, stock, image, discount, cellarUserId) values (11, 'Ibuprofen and Pseudoephedrine Hydrochloride', 3, 'Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 2013, 3, 20, 921, 165, 'http://dummyimage.com/200x300.png/5fa2dd/ffffff', 16, 1);
insert into products (id, productName, grapeId, description, year, aged, temperature, price, stock, image, discount, cellarUserId) values (12, 'ACTONEL', 4, 'Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.', 2000, 3, 19, 606, 130, 'http://dummyimage.com/200x300.jpg/cc0000/ffffff', 38, 3);
insert into products (id, productName, grapeId, description, year, aged, temperature, price, stock, image, discount, cellarUserId) values (13, 'Benztropine Mesylate',3, 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', 1994, 6, 17, 842, 178, 'http://dummyimage.com/200x300.jpg/dddddd/000000', 37, 1);
insert into products (id, productName, grapeId, description, year, aged, temperature, price, stock, image, discount, cellarUserId) values (14, 'Miconazole 7', 4, 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', 1966, 1, 20, 761, 122, 'http://dummyimage.com/200x300.jpg/5fa2dd/ffffff', 2, 1);
insert into products (id, productName, grapeId, description, year, aged, temperature, price, stock, image, discount, cellarUserId) values (15, 'Coppertone waterBABIES Sunscreen', 4, 'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', 1988, 10, 18, 287, 153, 'http://dummyimage.com/200x300.jpg/cc0000/ffffff', 31, 3);
insert into products (id, productName, grapeId, description, year, aged, temperature, price, stock, image, discount, cellarUserId) values (16, 'Gabapentin', 4, 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', 1994, 7, 18, 271, 120, 'http://dummyimage.com/200x300.jpg/5fa2dd/ffffff', 40, 1);
insert into products (id, productName, grapeId, description, year, aged, temperature, price, stock, image, discount, cellarUserId) values (17, 'Visudyne', 5, 'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.', 1997, 9, 17, 255, 112, 'http://dummyimage.com/200x300.bmp/dddddd/000000', 8, 1);
insert into products (id, productName, grapeId, description, year, aged, temperature, price, stock, image, discount, cellarUserId) values (18, 'Hydrocortisone Valerate', 5, 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.', 1993, 2, 18, 537, 179, 'http://dummyimage.com/200x300.png/ff4444/ffffff', 40, 4);
insert into products (id, productName, grapeId, description, year, aged, temperature, price, stock, image, discount, cellarUserId) values (19, 'ANC Neverpain External Analgesic', 6, 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', 2008, 6, 19, 143, 155, 'http://dummyimage.com/200x300.png/ff4444/ffffff', 32, 4);
insert into products (id, productName, grapeId, description, year, aged, temperature, price, stock, image, discount, cellarUserId) values (20, 'Sulfamethoxazole and Trimethoprim', 6, 'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', 1997, 5, 19, 287, 75, 'http://dummyimage.com/200x300.jpg/cc0000/ffffff', 16, 4);
insert into products (id, productName, grapeId, description, year, aged, temperature, price, stock, image, discount, cellarUserId) values (21, 'Chlordiazepoxide Hydrochloride', 7, 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', 1987, 8, 18, 847, 64, 'http://dummyimage.com/200x300.bmp/ff4444/ffffff', 44, 4);
insert into products (id, productName, grapeId, description, year, aged, temperature, price, stock, image, discount, cellarUserId) values (22, 'PR Natal 400', 8, 'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.', 1993, 4, 19, 309, 63, 'http://dummyimage.com/200x300.jpg/dddddd/000000', 40, 5);
insert into products (id, productName, grapeId, description, year, aged, temperature, price, stock, image, discount, cellarUserId) values (23, 'SHISEIDO SHEER MATIFYING COMPACT (REFILL)', 8, 'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', 2011, 8, 19, 509, 144, 'http://dummyimage.com/200x300.bmp/dddddd/000000', 50, 5);
insert into products (id, productName, grapeId, description, year, aged, temperature, price, stock, image, discount, cellarUserId) values (24, 'METOPROLOL SUCCINATE', 8, 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', 2000, 6, 20, 210, 69, 'http://dummyimage.com/200x300.bmp/dddddd/000000', 26,5);
insert into products (id, productName, grapeId, description, year, aged, temperature, price, stock, image, discount, cellarUserId) values (25, 'Norepinephrine', 9, 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', 2000, 4, 19, 929, 135, 'http://dummyimage.com/200x300.jpg/ff4444/ffffff', 29, 5);
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
