CREATE USER IF NOT EXISTS 'blog_bianca'@'%' IDENTIFIED BY 'bianca';
GRANT ALL PRIVILEGES ON blog_db.* TO 'blog_bianca'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

USE blog_db;

CREATE TABLE IF NOT EXISTS blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    banner TEXT NOT NULL,
    author VARCHAR(255) NOT NULL,
    publish_date DATETIME NOT NULL,
    tags VARCHAR(255) NOT NULL
);
