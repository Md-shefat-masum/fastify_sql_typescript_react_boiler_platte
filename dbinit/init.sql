CREATE DATABASE IF NOT EXISTS institute_management;

USE institute_management;

DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name varchar(100) DEFAULT NULL,
    email varchar(100) DEFAULT NULL,
    password varchar(100) DEFAULT NULL,
    token varchar(100) DEFAULT NULL,
    forget_code varchar(10) DEFAULT NULL,
    user_agent varchar(150) DEFAULT NULL,
    status tinyint DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT NULL,

    PRIMARY KEY (id),
    CONSTRAINT UQ_Users_Email UNIQUE (email)
) AUTO_INCREMENT = 1;

DELIMITER //
CREATE PROCEDURE create_and_return(IN name VARCHAR(100), IN email VARCHAR(100))
BEGIN

    INSERT INTO users(name, email) VALUES ('user1', 'user1@gmail.com');
    INSERT INTO users(name, email) VALUES ('user2', 'user2@gmail.com');

    SET @USER_ID = LAST_INSERT_ID();

    SELECT * FROM users WHERE id=@USER_ID;

END //
DELIMITER ;