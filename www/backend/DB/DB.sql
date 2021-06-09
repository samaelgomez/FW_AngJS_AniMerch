DROP TABLE if exists figures;
DROP TABLE if exists shops;
DROP TABLE if exists images;
DROP TABLE if exists cart;
DROP TABLE if exists liked;
DROP TABLE if exists purchases;

CREATE DATABASE if not exists figure_db;

CREATE TABLE if not exists shops (
   shopName varchar(200) PRIMARY KEY
);

INSERT INTO shops (shopName)
VALUES ("Alter"),
	   ("Aniplex"),
       ("GoodSmile"),
       ("Kadokawa");

CREATE TABLE if not exists figures (
	id INT auto_increment,
	figureName VARCHAR(200),
	type VARCHAR(15),
    price FLOAT,
    image VARCHAR(200),
    brand VARCHAR(200),
    franchise VARCHAR(200),
    visits INT,
    stock INT,
    likes INT DEFAULT 0,
    PRIMARY KEY (id),
    FOREIGN KEY (brand) REFERENCES shops(shopName)
);

CREATE TABLE if not exists images (
	name VARCHAR(200),
	path VARCHAR(200)
);

INSERT INTO figures (figureName, type, price, image, brand, franchise, visits, stock)
VALUES ("Zoro", "Standard", "39", "view/images/Zoro.png", "Kadokawa", "OnePiece", 9, 24),
	   ("Madara", "Statue", "999", "view/images/Madara.png", "GoodSmile", "Naruto", 14, 8),
       ("2B", "Nendoroid", "59", "view/images/2B.png", "Alter", "Nier", 8, 19),
       ("Miku", "Standard", "44", "view/images/Miku.png", "Aniplex", "Vocaloid", 11, 36),
	   ("Kirishima", "Nendoroid", "69", "view/images/Kirishima.png", "Kadokawa", "BNHA", 5, 14),
	   ("Ichigo", "Statue", "1399", "view/images/Ichigo.png", "GoodSmile", "Bleach", 22, 6);
       
INSERT INTO images (name, path)
VALUES ("Banner1", "frontend/view/images/Banner1.png"),
	   ("Banner2", "frontend/view/images/Banner2.png"),
       ("Banner3", "frontend/view/images/Banner3.png"),
       ("Category1", "frontend/view/images/Levi_Banner.png"),
       ("Category2", "frontend/view/images/Ichigo_Banner.png"),
       ("Category3", "frontend/view/images/Kirby_Banner.png"),
       ("Category4", "frontend/view/images/Levi_Banner.png"),
       ("Category5", "frontend/view/images/Ichigo_Banner.png"),
       ("Category6", "frontend/view/images/Kirby_Banner.png");

CREATE TABLE if not exists cart (
	user VARCHAR(200),
	figure VARCHAR(200)
);

CREATE TABLE if not exists liked (
	figureName VARCHAR(200),
	username VARCHAR(200)
);

CREATE TABLE if not exists purchases (
	id INT auto_increment,
	user VARCHAR(200),
    figure VARCHAR(200),
    PRIMARY KEY (id)
);