CREATE DATABASE social_app;
USE social_app;
-- users table
CREATE TABLE users (
	id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- password history table
CREATE TABLE password_history (
	id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
-- Posts table
CREATE TABLE posts (
	id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    visibility ENUM('public', 'private') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
 -- for testing
	-- get all public post
SELECT p.id, u.username, p.content, p.visibility, p.created_at
FROM posts p
JOIN users u ON p.user_id = u.id
WHERE p.visibility = 'public';
SELECT * FROM posts WHERE user_id = 1;
ALTER TABLE users DROP COLUMN password;
SELECT * FROM posts;
ALTER TABLE post MODIFY visibility VARCHAR(10);
UPDATE posts SET visibility = UPPER(visibility);
COMMIT;
SELECT visibility FROM posts;
SELECT id, visibility FROM posts;
DELIMITER &
CREATE TRIGGER before_posts_insert
BEFORE INSERT ON posts
FOR EACH ROW
BEGIN
	SET NEW.visibility = UPPER(NEW.visibility);
END;&

CREATE TRIGGER after_posts_insert
BEFORE UPDATE ON posts
FOR EACH ROW
BEGIN 
	SET NEW.visibility = UPPER(NEW.visibility);
END; &
DELIMITER ;
-- ALTER TABLE posts ADD CONSTRAINT check_visibility_enum CHECK (visibility IN ('PUBLIC', 'PRIVATE'));
-- DROP TRIGGER after_posts_insert;
-- DELIMITER $
-- CREATE TRIGGER before_posts_update
-- BEFORE UPDATE ON posts
-- FOR EACH ROW
-- BEGIN
-- 	SET NEW.visibility = UPPER(NEW.visibility);
-- END; $
-- DELIMITER ;`social_app`
