-- migrate:up
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT primary key,
    user_id varchar(50) NOT NULL,
    password varchar(255) NOT NULL,
    email VARCHAR(1000) NULL
);



-- migrate:down
DROP TABLE users;


