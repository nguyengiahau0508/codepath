-- Create database if not exists
CREATE DATABASE IF NOT EXISTS codepath_db;

-- Grant all privileges to the user
GRANT ALL PRIVILEGES ON codepath_db.* TO 'codepath_user'@'%' IDENTIFIED BY '@Giahau2004';
GRANT ALL PRIVILEGES ON codepath_db.* TO 'codepath_user'@'localhost' IDENTIFIED BY '@Giahau2004';

-- Flush privileges
FLUSH PRIVILEGES;
