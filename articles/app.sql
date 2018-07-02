/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 50640
 Source Host           : *.*.*.*:3306
 Source Schema         : app

 Target Server Type    : MySQL
 Target Server Version : 50640
 File Encoding         : 65001

 Date: 02/07/2018 20:47:40
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `date` bigint(20) NULL DEFAULT NULL,
  `mblogid` bigint(20) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for mblog
-- ----------------------------
DROP TABLE IF EXISTS `mblog`;
CREATE TABLE `mblog`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `date` bigint(20) NOT NULL,
  `praise` int(11) NULL DEFAULT 0,
  `publish` int(1) UNSIGNED ZEROFILL NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- View structure for commentView
-- ----------------------------
DROP VIEW IF EXISTS `commentView`;
CREATE ALGORITHM = UNDEFINED DEFINER = `root`@`%` SQL SECURITY DEFINER VIEW `commentView` AS select `a`.`mblogid` AS `mblogid`,count(`a`.`mblogid`) AS `commentNum` from `comment` `a` group by `a`.`mblogid`;

-- ----------------------------
-- View structure for mblogView
-- ----------------------------
DROP VIEW IF EXISTS `mblogView`;
CREATE ALGORITHM = UNDEFINED DEFINER = `root`@`%` SQL SECURITY DEFINER VIEW `mblogView` AS select `b`.`id` AS `id`,`b`.`content` AS `content`,`b`.`date` AS `date`,`b`.`praise` AS `praise`,`b`.`publish` AS `publish`,`c`.`mblogid` AS `mblogid`,`c`.`commentNum` AS `commentNum` from (`mblog` `b` left join `commentView` `c` on((`b`.`id` = `c`.`mblogid`))) order by `b`.`date` desc;

SET FOREIGN_KEY_CHECKS = 1;
