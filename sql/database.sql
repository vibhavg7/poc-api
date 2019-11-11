CREATE DATABASE grostep_shopper_api;

CREATE TABLE posts
(
    id int(5) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

describe posts;
