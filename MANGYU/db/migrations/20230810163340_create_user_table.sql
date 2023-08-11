-- migrate:up
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT primary key,
    name varchar(50) NOT NULL,
    password varchar(255) NOT NULL
);



-- migrate:down
DROP TABLE users;