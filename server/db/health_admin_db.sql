SET
  NAMES UTF8;

DROP DATABASE IF EXISTS health_admin_db;

CREATE DATABASE health_admin_db CHARSET = UTF8;

USE health_admin_db;

/**热量与体重**/
CREATE TABLE my_weight(
  -- fid INT PRIMARY KEY AUTO_INCREMENT,
  date VARCHAR(32),
  weight INT,
  caloric INT,
  training VARCHAR(64),
  sporttime INT
);

/******数据导入******/
-- INSERT INTO
--   my_weight
-- VALUES
--   ("2022-7-1", 120, 220, null, 20);