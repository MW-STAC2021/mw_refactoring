CREATE DATABASE mw_db;

CREATE TABLE user_tb (
    id VARCHAR(15) PRIMARY KEY,
    name VARCHAR(10) NOT NULL,
    email VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
	join_date DATETIME
);

CREATE TABLE information_tb(
	-- primary key | id 자동 생성
	id INT PRIMARY KEY AUTO_INCREMENT,
	--  여성, 생활 정보(female(=0), life(=1))
	category CHAR(6) NOT NULL,
	-- 여성(00), 생활 이미지 (10, 11, 12)
	category_icon char(2) NOT NULL,
	-- 제목
	title VARCHAR(30) NOT NULL,
	-- 썸네일
	thumbnail_path VARCHAR(255) NOT NULL,
	-- 글 추가 날짜
	posting_time DATE,
	-- 콘텐트 주소 저장
	content_path VARCHAR(255) NOT NULL,
	-- 내부 이미지
	inside_img_path VARCHAR(255) NOT NULL
);

CREATE TABLE information_keep_tb(
	id INT PRIMARY KEY AUTO_INCREMENT,
	user_id VARCHAR(15) NOT NULL,
	info_id INT NOT NULL,
	create_date DATETIME,
	FOREIGN KEY (user_id)
    REFERENCES user(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE info_recently_view(
	id INT PRIMARY KEY AUTO_INCREMENT,
	user_id VARCHAR(15) NOT NULL,
	info_id INT NOT NULL,
	date DATETIME,
	FOREIGN KEY (user_id)
    REFERENCES user(id) ON UPDATE CASCADE ON DELETE CASCADE
);
