-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.5.4-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;
/*!40101 SET NAMES utf8 */
;
/*!50503 SET NAMES utf8mb4 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
-- Dumping structure for table e_learning_system.answers
CREATE TABLE IF NOT EXISTS `answers` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`answerText` varchar(255) NOT NULL,
	`taskId` int(11) DEFAULT NULL,
	`answeredById` int(11) DEFAULT NULL,
	`courseId` int(11) DEFAULT NULL,
	PRIMARY KEY (`id`),
	KEY `FK_018afcdd2be2195bb3d721f285c` (`taskId`),
	KEY `FK_3184eed1fb2c03a43c2f55e2fd3` (`answeredById`),
	KEY `FK_baf4f5a68ff147b189abfc47c1b` (`courseId`),
	CONSTRAINT `FK_018afcdd2be2195bb3d721f285c` FOREIGN KEY (`taskId`) REFERENCES `tasks` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT `FK_3184eed1fb2c03a43c2f55e2fd3` FOREIGN KEY (`answeredById`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT `FK_baf4f5a68ff147b189abfc47c1b` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8;
-- Dumping data for table e_learning_system.answers: ~4 rows (approximately)
/*!40000 ALTER TABLE `answers` DISABLE KEYS */
;
INSERT INTO `answers` (
		`id`,
		`answerText`,
		`taskId`,
		`answeredById`,
		`courseId`
	)
VALUES (1, 'React, Angular, Vue', 5, 6, 5),
	(2, 'testing..', 3, 6, 1),
	(3, 'dddz', 3, 6, 1),
	(4, 'A programming language', 4, 6, 5);
/*!40000 ALTER TABLE `answers` ENABLE KEYS */
;
-- Dumping structure for table e_learning_system.courses
CREATE TABLE IF NOT EXISTS `courses` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`description` varchar(255) NOT NULL,
	`dayOfWeek` enum('1', '2', '3', '4', '5', '6', '7') NOT NULL,
	`startTime` varchar(255) NOT NULL,
	`endTime` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 15 DEFAULT CHARSET = utf8;
-- Dumping data for table e_learning_system.courses: ~12 rows (approximately)
/*!40000 ALTER TABLE `courses` DISABLE KEYS */
;
INSERT INTO `courses` (
		`id`,
		`name`,
		`description`,
		`dayOfWeek`,
		`startTime`,
		`endTime`
	)
VALUES (
		1,
		'Introduction to programming with C#',
		'An introductory course to programming with the language C#',
		'1',
		'10:00 AM',
		'12:00 AM'
	),
	(
		4,
		'Testing 101',
		'Testing software for beginners',
		'2',
		'13:30 PM',
		'15:00 PM'
	),
	(
		5,
		'JavaScript basics (by teacher1)',
		'JavaScript introductory course',
		'3',
		'10:00 AM',
		'11:00 AM'
	),
	(
		6,
		'Ruby basics (by teacher2)',
		'Ruby for beginners- Updated',
		'4',
		'14:20 PM',
		'16:00 PM'
	),
	(
		7,
		'Geometry Pt1',
		'Geometry introductory course',
		'1',
		'10:00 AM',
		'12:00 AM'
	),
	(
		8,
		'Algebra Pt1',
		'Algebra Intro',
		'5',
		'18:00 PM',
		'19:00 PM'
	),
	(
		9,
		'English B2+',
		'English language- Level B2+',
		'4',
		'16:00 PM',
		'17:30 PM'
	),
	(10, 'XXX', 'xxxx', '2', '08:45', '09:45'),
	(11, 'Y21', 'yyy NEWWW', '5', '09:50', '10:35'),
	(12, 'ZZZ', 'zzz', '2', '13:00', '14:15'),
	(
		13,
		'JavaScript Part 2',
		'Part 2 of the JS course ',
		'1',
		'',
		''
	),
	(
		14,
		'Java OOP',
		'OOP programming in Java',
		'2',
		'11:00',
		'00:00'
	);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */
;
-- Dumping structure for table e_learning_system.courses_participants_users
CREATE TABLE IF NOT EXISTS `courses_participants_users` (
	`coursesId` int(11) NOT NULL,
	`usersId` int(11) NOT NULL,
	PRIMARY KEY (`coursesId`, `usersId`),
	KEY `IDX_6a406122c5010e3294b4265fb7` (`coursesId`),
	KEY `IDX_1f216c93f0db10c7d43b6f5a32` (`usersId`),
	CONSTRAINT `FK_1f216c93f0db10c7d43b6f5a324` FOREIGN KEY (`usersId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
	CONSTRAINT `FK_6a406122c5010e3294b4265fb7d` FOREIGN KEY (`coursesId`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8;
-- Dumping data for table e_learning_system.courses_participants_users: ~19 rows (approximately)
/*!40000 ALTER TABLE `courses_participants_users` DISABLE KEYS */
;
INSERT INTO `courses_participants_users` (`coursesId`, `usersId`)
VALUES (1, 6),
	(4, 2),
	(4, 5),
	(4, 6),
	(5, 2),
	(5, 5),
	(5, 6),
	(6, 3),
	(6, 5),
	(6, 6),
	(7, 3),
	(8, 3),
	(9, 3),
	(10, 3),
	(11, 3),
	(12, 3),
	(12, 6),
	(13, 2),
	(14, 2);
/*!40000 ALTER TABLE `courses_participants_users` ENABLE KEYS */
;
-- Dumping structure for table e_learning_system.tasks
CREATE TABLE IF NOT EXISTS `tasks` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`description` varchar(255) NOT NULL,
	`availableFrom` varchar(255) NOT NULL,
	`availableTo` varchar(255) NOT NULL,
	`courseId` int(11) DEFAULT NULL,
	`isDeleted` tinyint(4) NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`),
	KEY `FK_331371fafbf20c7d9fe3e7b7499` (`courseId`),
	CONSTRAINT `FK_331371fafbf20c7d9fe3e7b7499` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 10 DEFAULT CHARSET = utf8;
-- Dumping data for table e_learning_system.tasks: ~8 rows (approximately)
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */
;
INSERT INTO `tasks` (
		`id`,
		`description`,
		`availableFrom`,
		`availableTo`,
		`courseId`,
		`isDeleted`
	)
VALUES (
		1,
		'How is Ruby different than Java?',
		'2021-12-14 10:45 AM',
		'2022-02-04 09:00 AM',
		6,
		1
	),
	(
		3,
		'How do you implement inheritance in C#?',
		'2022-01-10 10:45 AM',
		'2022-01-31 09:00 AM',
		1,
		0
	),
	(
		4,
		'What is JavaScript?',
		'2022-01-14 10:45 AM',
		'2022-01-25 09:00 AM',
		5,
		0
	),
	(
		5,
		'Name JS frameworks for front-end.',
		'2022-01-14 10:45 AM',
		'2022-01-25 09:00 AM',
		5,
		0
	),
	(
		6,
		'Why is JavaScript so popular?',
		'2022-02-07 10:00 PM',
		'2022-02-15 10:00 PM',
		5,
		0
	),
	(
		7,
		'What does the idiom "raining cats and dogs" mean?',
		'2022-01-30T21:34',
		'2022-02-07T22:04',
		9,
		0
	),
	(
		8,
		'testtt',
		'2022-01-30T21:41',
		'2022-02-11T22:11',
		9,
		1
	),
	(
		9,
		'test 2',
		'2022-01-30T21:41',
		'2022-01-30T22:11',
		9,
		0
	);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */
;
-- Dumping structure for table e_learning_system.token
CREATE TABLE IF NOT EXISTS `token` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`token` text NOT NULL,
	`blacklistedOn` datetime(6) NOT NULL DEFAULT current_timestamp(6),
	PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 51 DEFAULT CHARSET = utf8;
-- Dumping data for table e_learning_system.token: ~50 rows (approximately)
/*!40000 ALTER TABLE `token` DISABLE KEYS */
;
INSERT INTO `token` (`id`, `token`, `blacklistedOn`)
VALUES (
		1,
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ0ZWFjaGVyMSIsInBlcnNvbmFsTmFtZSI6IlRlYWNoZXIgVXNlciIsInJvbGUiOiJUZWFjaGVyIiwicmVnaXN0ZXJEYXRlIjoiMjAyMS0xMi0xOVQxNzoxMTozMi43MTZaIiwiaWF0IjoxNjM5OTU5NjM1LCJleHAiOjE2NDA1NjQ0MzV9.EVChAlclu8kizmtZFNiTMem1kcf5kbf5xo5fY4_TVCk',
		'2021-12-28 20:56:49.483341'
	),
	(
		2,
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ0ZWFjaGVyMSIsInBlcnNvbmFsTmFtZSI6IlRlYWNoZXIgVXNlciIsInJvbGUiOiJUZWFjaGVyIiwicmVnaXN0ZXJEYXRlIjoiMjAyMS0xMi0xOVQxNzoxMTozMi43MTZaIiwiaWF0IjoxNjM5OTU5NjM1LCJleHAiOjE2NDA1NjQ0MzV9.EVChAlclu8kizmtZFNiTMem1kcf5kbf5xo5fY4_TVCk',
		'2021-12-28 20:56:49.486652'
	),
	(3, '', '2021-12-28 20:56:49.712375'),
	(4, '', '2021-12-28 20:56:49.715819'),
	(
		5,
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ0ZWFjaGVyMiIsInBlcnNvbmFsTmFtZSI6IlRlYWNoZXIgVXNlciAyIiwicm9sZSI6IlRlYWNoZXIiLCJyZWdpc3RlckRhdGUiOiIyMDIxLTEyLTE5VDE3OjUzOjEzLjA2NloiLCJpYXQiOjE2NDA3MTc4ODcsImV4cCI6MTY0MTMyMjY4N30.Hw81aG1g-YV5Zf_NEwPipcqPw-3tyDiKWRQbPxqSqRE',
		'2022-01-03 20:37:29.399383'
	),
	(6, '', '2022-01-03 20:37:29.841651'),
	(
		7,
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ0ZWFjaGVyMiIsInBlcnNvbmFsTmFtZSI6IlRlYWNoZXIgVXNlciAyIiwicm9sZSI6IlRlYWNoZXIiLCJyZWdpc3RlckRhdGUiOiIyMDIxLTEyLTE5VDE3OjUzOjEzLjA2NloiLCJpYXQiOjE2NDEyMzUwODgsImV4cCI6MTY0MTgzOTg4OH0.Q9SFAZbusyna71uwJEp7-yKi5XYt7ngnZ8-WXmlva2s',
		'2022-01-06 00:00:33.452497'
	),
	(8, '', '2022-01-06 00:00:33.918433'),
	(
		9,
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJtYXJpZWxhX3N0dWRlbnQiLCJwZXJzb25hbE5hbWUiOiJNYXJpZWxhIFRpaG92YSIsInJvbGUiOiJTdHVkZW50IiwicmVnaXN0ZXJEYXRlIjoiMjAyMS0xMi0xOVQyMjoxMzozMy41ODhaIiwiaWF0IjoxNjQxNDIwMDUyLCJleHAiOjE2NDIwMjQ4NTJ9.hb88zm82kDVHCBrIBION2wCa9enOnNeyFKGGpJFfbzI',
		'2022-01-09 10:12:41.795809'
	),
	(10, '', '2022-01-09 10:12:42.080831'),
	(
		11,
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcm5hbWUiOiJtYXJpZWxhLnRpaG92YSIsInBlcnNvbmFsTmFtZSI6Ik1hcmllbGEgRW1pbG92YSBUaWhvdmEiLCJyb2xlIjoiQWRtaW4iLCJyZWdpc3RlckRhdGUiOiIyMDIyLTAxLTAzVDExOjE5OjAxLjc5OFoiLCJpYXQiOjE2NDE3MTYwMjIsImV4cCI6MTY0MjMyMDgyMn0.LPOI0FaZNBgR5QnaIRWFV_CAGHQX6hZo4URDHqghuu8',
		'2022-01-09 10:15:49.163758'
	),
	(
		12,
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcm5hbWUiOiJtYXJpZWxhLnRpaG92YSIsInBlcnNvbmFsTmFtZSI6Ik1hcmllbGEgRW1pbG92YSBUaWhvdmEiLCJyb2xlIjoiQWRtaW4iLCJyZWdpc3RlckRhdGUiOiIyMDIyLTAxLTAzVDExOjE5OjAxLjc5OFoiLCJpYXQiOjE2NDE3MTYwMjIsImV4cCI6MTY0MjMyMDgyMn0.LPOI0FaZNBgR5QnaIRWFV_CAGHQX6hZo4URDHqghuu8',
		'2022-01-09 10:15:49.172290'
	),
	(13, '', '2022-01-09 10:15:49.522464'),
	(14, '', '2022-01-09 10:15:49.527721'),
	(
		15,
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJtYXJpZWxhX3N0dWRlbnQiLCJwZXJzb25hbE5hbWUiOiJNYXJpZWxhIFRpaG92YSIsInJvbGUiOiJTdHVkZW50IiwicmVnaXN0ZXJEYXRlIjoiMjAyMS0xMi0xOVQyMjoxMzozMy41ODhaIiwiaWF0IjoxNjQxNzE2MTczLCJleHAiOjE2NDIzMjA5NzN9.1vGnfK4kT5SQ1pNltfL_1oB6-3sOgQovxaN7-wjVUZU',
		'2022-01-15 13:10:20.253925'
	),
	(16, '', '2022-01-15 13:10:20.469809'),
	(
		17,
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcm5hbWUiOiJtYXJpZWxhLnRpaG92YSIsInBlcnNvbmFsTmFtZSI6Ik1hcmllbGEgRW1pbG92YSBUaWhvdmEiLCJyb2xlIjoiQWRtaW4iLCJyZWdpc3RlckRhdGUiOiIyMDIyLTAxLTAzVDExOjE5OjAxLjc5OFoiLCJpYXQiOjE2NDM1NTM2MTYsImV4cCI6MTY0NDE1ODQxNn0.VF7dfJ_57aWGPt46wKVwd9HPIXaNHTlnlK4pNVnfNsg',
		'2022-01-30 16:40:29.626529'
	),
	(18, '', '2022-01-30 16:40:29.863610'),
	(
		19,
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJtYXJpZWxhX3N0dWRlbnQiLCJwZXJzb25hbE5hbWUiOiJNYXJpZWxhIFRpaG92YSIsInJvbGUiOiJTdHVkZW50IiwicmVnaXN0ZXJEYXRlIjoiMjAyMS0xMi0xOVQyMjoxMzozMy41ODhaIiwiaWF0IjoxNjQzNTU4NTI1LCJleHAiOjE2NDQxNjMzMjV9.ToYoE6dikPjXbC4EfeaSGeKHUyK8l5J1zxwVXdYxzMc',
		'2022-01-30 21:28:17.173458'
	),
	(20, '', '2022-01-30 21:28:17.891220'),
	(
		21,
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ0ZWFjaGVyMiIsInBlcnNvbmFsTmFtZSI6IlRlYWNoZXIgVXNlciAyIiwicm9sZSI6IlRlYWNoZXIiLCJyZWdpc3RlckRhdGUiOiIyMDIxLTEyLTE5VDE3OjUzOjEzLjA2NloiLCJpYXQiOjE2NDM1NzA5MjQsImV4cCI6MTY0NDE3NTcyNH0.OCXas7ZwkMj2iOtjD3D0ux2vzNjemLqRroF5c-81JvU',
		'2022-01-30 21:54:26.668562'
	),
	(22, '', '2022-01-30 21:54:27.191798'),
	(
		23,
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJtYXJpZWxhX3N0dWRlbnQiLCJwZXJzb25hbE5hbWUiOiJNYXJpZWxhIFRpaG92YSIsInJvbGUiOiJTdHVkZW50IiwicmVnaXN0ZXJEYXRlIjoiMjAyMS0xMi0xOVQyMjoxMzozMy41ODhaIiwiaWF0IjoxNjQzNTcyNDg1LCJleHAiOjE2NDQxNzcyODV9.X7o34FCPeC0tXmzCgMvLeusQK86ep8cE0JRDRwkJquI',
		'2022-01-31 21:03:13.309853'
	),
	(24, '', '2022-01-31 21:03:13.497988'),
	(
		25,
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ0ZWFjaGVyMiIsInBlcnNvbmFsTmFtZSI6IlRlYWNoZXIgVXNlciAyIiwicm9sZSI6IlRlYWNoZXIiLCJyZWdpc3RlckRhdGUiOiIyMDIxLTEyLTE5VDE3OjUzOjEzLjA2NloiLCJpYXQiOjE2NDM2NTU4NTQsImV4cCI6MTY0NDI2MDY1NH0.FuMGxQbRvO2yyn8K-g0RdGRyer_uCO-myV6dqfvYXZY',
		'2022-01-31 21:28:19.725702'
	),
	(26, '', '2022-01-31 21:28:19.945050'),
	(
		27,
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJtYXJpZWxhX3N0dWRlbnQiLCJwZXJzb25hbE5hbWUiOiJNYXJpZWxhIFRpaG92YSIsInJvbGUiOiJTdHVkZW50IiwicmVnaXN0ZXJEYXRlIjoiMjAyMS0xMi0xOVQyMjoxMzozMy41ODhaIiwiaWF0IjoxNjQzNjU3NjI4LCJleHAiOjE2NDQyNjI0Mjh9.CUhr4xvLiWiPxoqybU8RkNsksFyDOv-mkaPFYN093Fg',
		'2022-01-31 23:35:13.070654'
	),
	(28, '', '2022-01-31 23:35:13.171286'),
	(
		29,
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ0ZWFjaGVyMiIsInBlcnNvbmFsTmFtZSI6IlRlYWNoZXIgVXNlciAyIiwicm9sZSI6IlRlYWNoZXIiLCJyZWdpc3RlckRhdGUiOiIyMDIxLTEyLTE5VDE3OjUzOjEzLjA2NloiLCJpYXQiOjE2NDM2NjQ5NDIsImV4cCI6MTY0NDI2OTc0Mn0.TeDT-k0v3KO8xE6zVNkB1uDmp-Ak0qbQ7k1a41OE8ys',
		'2022-02-01 00:06:04.804715'
	),
	(30, '', '2022-02-01 00:06:05.210339'),
	(
		31,
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlcm5hbWUiOiJtYXJpZWxhLnRpaG92YSIsInBlcnNvbmFsTmFtZSI6Ik1hcmllbGEgRW1pbG92YSBUaWhvdmEiLCJyb2xlIjoiQWRtaW4iLCJyZWdpc3RlckRhdGUiOiIyMDIyLTAxLTAzVDExOjE5OjAxLjc5OFoiLCJpYXQiOjE2NDM2Njc0MjcsImV4cCI6MTY0NDI3MjIyN30.KXBWwTMKpVm0wTY0kVq7zl-XHnJs8gRuoKGQaV_V5DM',
		'2022-02-01 00:17:52.113974'
	),
	(32, '', '2022-02-01 00:17:52.585948'),
	(
		33,
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJtYXJpZWxhX3N0dWRlbnQiLCJwZXJzb25hbE5hbWUiOiJNYXJpZWxhIFRpaG92YSIsInJvbGUiOiJTdHVkZW50IiwicmVnaXN0ZXJEYXRlIjoiMjAyMS0xMi0xOVQyMjoxMzozMy41ODhaIiwiaWF0IjoxNjQzNjY3NDgzLCJleHAiOjE2NDQyNzIyODN9.eZn-sl4EFEr5yKF9PA39MTHImxh8DoC-bz_1kfzkLpw',
		'2022-02-01 00:18:08.260816'
	),
	(34, '', '2022-02-01 00:18:08.629151'),
	(
		35,
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJtYXJpZWxhX3N0dWRlbnQiLCJwZXJzb25hbE5hbWUiOiJNYXJpZWxhIFRpaG92YSIsInJvbGUiOiJTdHVkZW50IiwicmVnaXN0ZXJEYXRlIjoiMjAyMS0xMi0xOVQyMjoxMzozMy41ODhaIiwiaWF0IjoxNjQzNjY3NTAwLCJleHAiOjE2NDQyNzIzMDB9.pg0ORjjJV4m_lG5iY_9pHCqVckYL6oO_knSJ_-Bpr28',
		'2022-02-01 00:18:57.086068'
	),
	(36, '', '2022-02-01 00:18:57.206914'),
	(
		37,
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJtYXJpZWxhX3N0dWRlbnQiLCJwZXJzb25hbE5hbWUiOiJNYXJpZWxhIFRpaG92YSIsInJvbGUiOiJTdHVkZW50IiwicmVnaXN0ZXJEYXRlIjoiMjAyMS0xMi0xOVQyMjoxMzozMy41ODhaIiwiaWF0IjoxNjQzNjY3NTYwLCJleHAiOjE2NDQyNzIzNjB9.YemkQxR7pCf7-bZHkqMnpN58Kdu9r1tHXHndIN3Ptc4',
		'2022-02-01 21:24:41.382359'
	),
	(38, '', '2022-02-01 21:24:41.594569'),
	(
		39,
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJtYXJpZWxhX3N0dWRlbnQiLCJwZXJzb25hbE5hbWUiOiJNYXJpZWxhIFRpaG92YSIsInJvbGUiOiJTdHVkZW50IiwicmVnaXN0ZXJEYXRlIjoiMjAyMS0xMi0xOVQyMjoxMzozMy41ODhaIiwiaWF0IjoxNjQzNzQ1MDAzLCJleHAiOjE2NDQzNDk4MDN9.CTt13Vw9StvY000dcl30kEfaE52WEbQ6_qdik68qHvw',
		'2022-02-01 21:51:29.201440'
	),
	(40, '', '2022-02-01 21:51:29.544660'),
	(
		41,
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJtYXJpZWxhX3N0dWRlbnQiLCJwZXJzb25hbE5hbWUiOiJNYXJpZWxhIFRpaG92YSIsInJvbGUiOiJTdHVkZW50IiwicmVnaXN0ZXJEYXRlIjoiMjAyMS0xMi0xOVQyMjoxMzozMy41ODhaIiwiaWF0IjoxNjQzNzQ1MDk4LCJleHAiOjE2NDQzNDk4OTh9.yDcRVzcUBcPLG9cybNuh02KkVKcDwS4nGQqUG8QC5N8',
		'2022-02-01 22:13:03.077014'
	),
	(42, '', '2022-02-01 22:13:03.678716'),
	(
		43,
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ0ZWFjaGVyMSIsInBlcnNvbmFsTmFtZSI6IlRlYWNoZXIgVXNlciIsInJvbGUiOiJUZWFjaGVyIiwicmVnaXN0ZXJEYXRlIjoiMjAyMS0xMi0xOVQxNzoxMTozMi43MTZaIiwiaWF0IjoxNjQzNzQ2Mzk4LCJleHAiOjE2NDQzNTExOTh9.eQeSQ6ng__KtvtI9teSo8JsQ8PRD8lvaQIudlVMBc0k',
		'2022-02-01 22:46:25.113951'
	),
	(44, '', '2022-02-01 22:46:26.009271'),
	(
		45,
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwidXNlcm5hbWUiOiJtYXJpZWxhX3N0dWRlbnQiLCJwZXJzb25hbE5hbWUiOiJNYXJpZWxhIFRpaG92YSIsInJvbGUiOiJTdHVkZW50IiwicmVnaXN0ZXJEYXRlIjoiMjAyMS0xMi0xOVQyMjoxMzozMy41ODhaIiwiaWF0IjoxNjQzNzQ4Mzk4LCJleHAiOjE2NDQzNTMxOTh9.pnfScJlvu9hb24yJjq0snoW6MSDN67Pg_lFIoDMFuxU',
		'2022-02-01 22:54:32.661390'
	),
	(46, '', '2022-02-01 22:54:33.314459'),
	(
		47,
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ0ZWFjaGVyMSIsInBlcnNvbmFsTmFtZSI6IlRpZmZhbnkgWSIsInJvbGUiOiJUZWFjaGVyIiwicmVnaXN0ZXJEYXRlIjoiMjAyMS0xMi0xOVQxNzoxMTozMi43MTZaIiwiaWF0IjoxNjQzNzQ4ODg1LCJleHAiOjE2NDQzNTM2ODV9.Fhft8vqavZiupG4bx3C1Wc6ZOZ62PsaKjsF-0_zScJA',
		'2022-02-01 23:02:29.175324'
	),
	(48, '', '2022-02-01 23:02:29.439794'),
	(
		49,
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInBlcnNvbmFsTmFtZSI6IkFkbWluIFVzZXIiLCJyb2xlIjoiQWRtaW4iLCJyZWdpc3RlckRhdGUiOiIyMDIxLTEyLTE5VDE0OjMzOjA4LjM2MloiLCJpYXQiOjE2NDM3NDkzNjUsImV4cCI6MTY0NDM1NDE2NX0.KxZdtG_AueSFBHoE98zJbFAc9VihCTrVtrsoEHqmcxg',
		'2022-02-01 23:03:11.992828'
	),
	(50, '', '2022-02-01 23:03:12.233703');
/*!40000 ALTER TABLE `token` ENABLE KEYS */
;
-- Dumping structure for table e_learning_system.users
CREATE TABLE IF NOT EXISTS `users` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`username` varchar(255) NOT NULL,
	`personalName` varchar(30) NOT NULL,
	`password` varchar(255) NOT NULL,
	`registerDate` datetime(6) NOT NULL DEFAULT current_timestamp(6),
	`isDeleted` tinyint(4) NOT NULL DEFAULT 0,
	`role` enum('1', '2', '3') NOT NULL DEFAULT '1',
	`banEndDate` datetime DEFAULT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `IDX_fe0bb3f6520ee0469504521e71` (`username`)
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8;
-- Dumping data for table e_learning_system.users: ~11 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */
;
INSERT INTO `users` (
		`id`,
		`username`,
		`personalName`,
		`password`,
		`registerDate`,
		`isDeleted`,
		`role`,
		`banEndDate`
	)
VALUES (
		1,
		'admin',
		'Admin User',
		'$2b$10$bE.IIQCuEt5pKHPtqdo9ReSb/VxN0stPbKzhhIbHCOFAAQFnTqJyq',
		'2021-12-19 16:33:08.362114',
		0,
		'2',
		'2021-12-19 19:10:21'
	),
	(
		2,
		'teacher1',
		'Tiffany Y',
		'$2b$10$67jZBYUeV1yCbpQ21nMKau9ruE.gOxzBOxVADPYlNfjtuGZXM97zy',
		'2021-12-19 19:11:32.716416',
		0,
		'3',
		'2021-12-19 19:14:53'
	),
	(
		3,
		'teacher2',
		'Teacher User 2',
		'$2b$10$Pl0wTW4j1pyeaTpFOMQOqu41n5jXjjZO5aOab0Fy8Ll0kkkWRE9b.',
		'2021-12-19 19:53:13.066323',
		0,
		'3',
		NULL
	),
	(
		4,
		'david',
		'David Percy',
		'$2b$10$JmN2HanqVjTKsuJPvMaoI.UXiZgrUQ1Im58/.sd/9/SYNLFs9rrZ2',
		'2021-12-19 20:24:26.627242',
		0,
		'2',
		NULL
	),
	(
		5,
		'basic_student',
		'Jerry J',
		'$2b$10$AB/wOVOiSgfvTcrZmx2wNuUuT5Cij3ejXeJ3s94PqGlPsxe2LKoUq',
		'2021-12-19 23:33:54.844966',
		0,
		'1',
		NULL
	),
	(
		6,
		'mariela_student',
		'Mariela Tihova',
		'$2b$10$ayok.wtI.n.ZJK3GziOY6uIcAkz0ds/a3o7U8iGCliAl2RlW6lJK2',
		'2021-12-20 00:13:33.588785',
		0,
		'1',
		NULL
	),
	(
		7,
		'mariela.tihova',
		'Mariela Emilova Tihova',
		'$2b$10$Bok9qpb39kPqWFIIJCSWB./lbFY81Rm1te9D.OqHqM5xXekGBwfhS',
		'2022-01-03 13:19:01.798165',
		0,
		'2',
		NULL
	),
	(
		8,
		'katy.s',
		'katy.s',
		'$2b$10$XZD/lgxOtWbmHFI3N.Kq2us95oAnsfYXHOw0vEgFxn/Yrjr0YhEWC',
		'2022-02-01 21:29:10.617293',
		0,
		'1',
		NULL
	),
	(
		9,
		'bob.t',
		'bob.t',
		'$2b$10$kEDQpuU6YaCCTGurBCDhKOEXzpappmv8ckRA4RPBuoYR0Q7gHzNki',
		'2022-02-01 21:30:14.907031',
		0,
		'1',
		NULL
	),
	(
		10,
		'test_teacher',
		'test_teacher',
		'$2b$10$uJ4RxoJLKYlvNMA2tgpc7eZ7GGDhAgu67V0316sbWcCP2vV8ZrKo2',
		'2022-02-01 21:31:44.425809',
		0,
		'1',
		NULL
	),
	(
		11,
		'mimi_teacher',
		'mimi_teacher',
		'$2b$10$DLFyeu9PkGT9AkHmCkc2dOYG/e6WjFP2/CXQiYO/pa/Z3YaKzN03i',
		'2022-02-01 21:38:30.843237',
		0,
		'3',
		NULL
	);
/*!40000 ALTER TABLE `users` ENABLE KEYS */
;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */
;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;