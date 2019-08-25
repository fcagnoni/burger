DROP DATABASE IF EXISTS burger_db;
CREATE DATABASE burger_db;

USE burger_db;

create table burgers (
  id int(1) NOT NULL AUTO_INCREMENT,
  burger_name varchar(255) DEFAULT NULL,
  devoured boolean NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY ID_UNIQUE (id)
)
