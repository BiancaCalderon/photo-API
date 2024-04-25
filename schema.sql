CREATE USER IF NOT EXISTS 'blog_bianca'@'%' IDENTIFIED BY 'zipfest_123';
GRANT ALL PRIVILEGES ON blog_bianca.* TO 'blog_bianca'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

USE blog_bianca;

CREATE TABLE IF NOT EXISTS blog_photo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    banner TEXT NOT NULL,
    author VARCHAR(255) NOT NULL,
    publishDate DATETIME NOT NULL,
    tags VARCHAR(255) NOT NULL
);
