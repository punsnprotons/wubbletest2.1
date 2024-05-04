-- --------------------------------------------------------
-- Host:                         rm-gs5vl5q0s90b3om68go.mysql.singapore.rds.aliyuncs.com
-- Server version:               8.0.25 - Source distribution
-- Server OS:                    Linux
-- HeidiSQL Version:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table iwave.accounts
DROP TABLE IF EXISTS `accounts`;
CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_id` int DEFAULT NULL,
  `currency` int DEFAULT NULL,
  `balance` decimal(32,16) DEFAULT '0.0000000000000000',
  `locked` decimal(32,16) DEFAULT '0.0000000000000000',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `in` decimal(32,16) DEFAULT '0.0000000000000000',
  `out` decimal(32,16) DEFAULT '0.0000000000000000',
  `default_withdraw_fund_source_id` int DEFAULT NULL,
  `referral_commissions` decimal(32,16) DEFAULT '0.0000000000000000',
  PRIMARY KEY (`id`),
  KEY `index_accounts_on_member_id_and_currency` (`member_id`,`currency`) USING BTREE,
  KEY `index_accounts_on_member_id` (`member_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.account_versions
DROP TABLE IF EXISTS `account_versions`;
CREATE TABLE IF NOT EXISTS `account_versions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_id` int DEFAULT NULL,
  `account_id` int DEFAULT NULL,
  `reason` int DEFAULT NULL,
  `balance` decimal(32,16) DEFAULT NULL,
  `locked` decimal(32,16) DEFAULT NULL,
  `fee` decimal(32,16) DEFAULT NULL,
  `amount` decimal(32,16) DEFAULT NULL,
  `modifiable_id` int DEFAULT NULL,
  `modifiable_type` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `currency` int DEFAULT NULL,
  `fun` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_account_versions_on_account_id_and_reason` (`account_id`,`reason`) USING BTREE,
  KEY `index_account_versions_on_account_id` (`account_id`) USING BTREE,
  KEY `index_account_versions_on_member_id_and_reason` (`member_id`,`reason`) USING BTREE,
  KEY `index_account_versions_on_modifiable_id_and_modifiable_type` (`modifiable_id`,`modifiable_type`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.api_tokens
DROP TABLE IF EXISTS `api_tokens`;
CREATE TABLE IF NOT EXISTS `api_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_id` int NOT NULL,
  `access_key` varchar(50) NOT NULL,
  `secret_key` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `trusted_ip_list` varchar(255) DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL,
  `oauth_access_token_id` int DEFAULT NULL,
  `expire_at` datetime DEFAULT NULL,
  `scopes` varchar(255) DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `api_type` varchar(255) DEFAULT 'web',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_api_tokens_on_access_key` (`access_key`) USING BTREE,
  UNIQUE KEY `index_api_tokens_on_secret_key` (`secret_key`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.assets
DROP TABLE IF EXISTS `assets`;
CREATE TABLE IF NOT EXISTS `assets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `attachable_id` int DEFAULT NULL,
  `attachable_type` varchar(255) DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.audit_logs
DROP TABLE IF EXISTS `audit_logs`;
CREATE TABLE IF NOT EXISTS `audit_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `operator_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `auditable_id` int DEFAULT NULL,
  `auditable_type` varchar(255) DEFAULT NULL,
  `source_state` varchar(255) DEFAULT NULL,
  `target_state` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_audit_logs_on_auditable_id_and_auditable_type` (`auditable_id`,`auditable_type`) USING BTREE,
  KEY `index_audit_logs_on_operator_id` (`operator_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.authentications
DROP TABLE IF EXISTS `authentications`;
CREATE TABLE IF NOT EXISTS `authentications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `provider` varchar(255) DEFAULT NULL,
  `uid` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `secret` varchar(255) DEFAULT NULL,
  `member_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_authentications_on_member_id` (`member_id`) USING BTREE,
  KEY `index_authentications_on_provider_and_uid` (`provider`,`uid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.bots
DROP TABLE IF EXISTS `bots`;
CREATE TABLE IF NOT EXISTS `bots` (
  `id` int NOT NULL AUTO_INCREMENT,
  `market_id` varchar(255) DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `start_sec` int DEFAULT NULL,
  `end_sec` int DEFAULT NULL,
  `start_sec_trade` int DEFAULT NULL,
  `end_sec_trade` int DEFAULT NULL,
  `best_price` decimal(32,16) DEFAULT '0.0000000000000000',
  `min_price` decimal(32,16) DEFAULT '0.0000000000000000',
  `max_price` decimal(32,16) DEFAULT '0.0000000000000000',
  `best_vol` decimal(32,16) DEFAULT '0.0000000000000000',
  `best_buy` decimal(32,16) DEFAULT '0.0000000000000000',
  `best_sell` decimal(32,16) DEFAULT '0.0000000000000000',
  `min_vol` decimal(32,16) DEFAULT '0.0000000000000000',
  `max_vol` decimal(32,16) DEFAULT '0.0000000000000000',
  `disabled` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.comments
DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text,
  `author_id` int DEFAULT NULL,
  `ticket_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.commit_rate
DROP TABLE IF EXISTS `commit_rate`;
CREATE TABLE IF NOT EXISTS `commit_rate` (
  `id` int NOT NULL AUTO_INCREMENT,
  `from` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `to` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `rate` decimal(32,16) DEFAULT NULL,
  `min` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `from` (`from`,`to`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Data exporting was unselected.

-- Dumping structure for table iwave.commit_records
DROP TABLE IF EXISTS `commit_records`;
CREATE TABLE IF NOT EXISTS `commit_records` (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_id` int DEFAULT NULL,
  `from` varchar(50) DEFAULT NULL,
  `from_amount` decimal(32,16) DEFAULT '0.0000000000000000',
  `to` varchar(50) DEFAULT NULL,
  `to_amount` decimal(32,16) DEFAULT '0.0000000000000000',
  `commit_rate` decimal(32,16) DEFAULT '0.0000000000000000',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Data exporting was unselected.

-- Dumping structure for table iwave.deposits
DROP TABLE IF EXISTS `deposits`;
CREATE TABLE IF NOT EXISTS `deposits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account_id` int DEFAULT NULL,
  `member_id` int DEFAULT NULL,
  `currency` int DEFAULT NULL,
  `amount` decimal(32,16) DEFAULT NULL,
  `fee` decimal(32,16) DEFAULT '0.0000000000000000',
  `address_to` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `address_from` varchar(255) DEFAULT NULL,
  `fund_uid` varchar(255) DEFAULT NULL,
  `fund_extra` varchar(255) DEFAULT NULL,
  `txid` varchar(255) DEFAULT NULL,
  `txid_external` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `state` int DEFAULT NULL,
  `aasm_state` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `done_at` datetime DEFAULT NULL,
  `confirmations` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `payment_transaction_id` int DEFAULT NULL,
  `txout` int DEFAULT NULL,
  `bank_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_deposits_on_txid_and_txout` (`txid`,`txout`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.documents
DROP TABLE IF EXISTS `documents`;
CREATE TABLE IF NOT EXISTS `documents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `body` text,
  `is_auth` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `desc` text,
  `keywords` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.document_translations
DROP TABLE IF EXISTS `document_translations`;
CREATE TABLE IF NOT EXISTS `document_translations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `document_id` int NOT NULL,
  `locale` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `body` text,
  `desc` text,
  `keywords` text,
  PRIMARY KEY (`id`),
  KEY `index_document_translations_on_document_id` (`document_id`) USING BTREE,
  KEY `index_document_translations_on_locale` (`locale`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.exchange_commissions
DROP TABLE IF EXISTS `exchange_commissions`;
CREATE TABLE IF NOT EXISTS `exchange_commissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `commission_type` varchar(255) DEFAULT NULL,
  `percentage` decimal(8,4) DEFAULT '0.0000',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.fees
DROP TABLE IF EXISTS `fees`;
CREATE TABLE IF NOT EXISTS `fees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `min` decimal(15,4) DEFAULT NULL,
  `max` decimal(15,4) DEFAULT NULL,
  `taker` decimal(8,4) DEFAULT '0.0000',
  `maker` decimal(8,4) DEFAULT '0.0000',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.fund_sources
DROP TABLE IF EXISTS `fund_sources`;
CREATE TABLE IF NOT EXISTS `fund_sources` (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_id` int DEFAULT NULL,
  `currency` int DEFAULT NULL,
  `extra` varchar(255) DEFAULT NULL,
  `uid` varchar(255) DEFAULT NULL,
  `is_locked` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `destination_tag` varchar(255) DEFAULT NULL,
  `bank_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.holder_discounts
DROP TABLE IF EXISTS `holder_discounts`;
CREATE TABLE IF NOT EXISTS `holder_discounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `min` decimal(15,4) DEFAULT NULL,
  `max` decimal(15,4) DEFAULT NULL,
  `percent` decimal(4,2) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.identities
DROP TABLE IF EXISTS `identities`;
CREATE TABLE IF NOT EXISTS `identities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password_digest` varchar(255) DEFAULT NULL,
  `roles` varchar(50) DEFAULT 'user',
  `is_active` tinyint(1) DEFAULT NULL,
  `retry_count` int DEFAULT NULL,
  `is_locked` tinyint(1) DEFAULT NULL,
  `locked_at` datetime DEFAULT NULL,
  `last_verify_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.id_documents
DROP TABLE IF EXISTS `id_documents`;
CREATE TABLE IF NOT EXISTS `id_documents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_document_type` int DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `id_document_number` varchar(255) DEFAULT NULL,
  `member_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `address` text,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `zipcode` varchar(255) DEFAULT NULL,
  `id_bill_type` int DEFAULT NULL,
  `aasm_state` varchar(255) DEFAULT NULL,
  `note` text,
  `last_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.lendings
DROP TABLE IF EXISTS `lendings`;
CREATE TABLE IF NOT EXISTS `lendings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `currency` varchar(255) DEFAULT NULL,
  `today_apy` decimal(8,4) DEFAULT '0.0000',
  `yesterday_apy` decimal(8,4) DEFAULT '0.0000',
  `published_on` date DEFAULT NULL,
  `max_subscription_amount` decimal(32,16) DEFAULT '0.0000000000000000',
  `lot_size` int DEFAULT NULL,
  `max_lot_size` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `lending_type_id` int DEFAULT NULL,
  `interest_rate` decimal(8,4) DEFAULT '0.0000',
  `duration_days` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.lending_auto_transfers
DROP TABLE IF EXISTS `lending_auto_transfers`;
CREATE TABLE IF NOT EXISTS `lending_auto_transfers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `currency` varchar(255) DEFAULT NULL,
  `is_auto_transfer` tinyint(1) DEFAULT NULL,
  `member_id` int DEFAULT NULL,
  `lending_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_lending_auto_transfers_on_member_id` (`member_id`),
  KEY `index_lending_auto_transfers_on_lending_id` (`lending_id`),
  CONSTRAINT `fk_rails_2a20f20a4d` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`),
  CONSTRAINT `fk_rails_e9c6e646e5` FOREIGN KEY (`lending_id`) REFERENCES `lendings` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.lending_durations
DROP TABLE IF EXISTS `lending_durations`;
CREATE TABLE IF NOT EXISTS `lending_durations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `currency` varchar(255) DEFAULT NULL,
  `duration_days` int DEFAULT NULL,
  `interest_rate` decimal(8,4) DEFAULT '0.0000',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.lending_redeems
DROP TABLE IF EXISTS `lending_redeems`;
CREATE TABLE IF NOT EXISTS `lending_redeems` (
  `id` int NOT NULL AUTO_INCREMENT,
  `lending_subscription_id` int DEFAULT NULL,
  `redeem_type` varchar(255) DEFAULT NULL,
  `redeem_date` datetime DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_lending_redeems_on_lending_subscription_id` (`lending_subscription_id`),
  CONSTRAINT `fk_rails_1609f037fd` FOREIGN KEY (`lending_subscription_id`) REFERENCES `lending_subscriptions` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.lending_subscriptions
DROP TABLE IF EXISTS `lending_subscriptions`;
CREATE TABLE IF NOT EXISTS `lending_subscriptions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_id` int DEFAULT NULL,
  `lending_id` int DEFAULT NULL,
  `lending_duration_id` int DEFAULT NULL,
  `amount` decimal(32,16) DEFAULT '0.0000000000000000',
  `subscription_date` date DEFAULT NULL,
  `interest_amount` decimal(8,4) DEFAULT '0.0000',
  `is_auto_transfer` tinyint(1) DEFAULT '0',
  `is_completed` tinyint(1) DEFAULT '0',
  `is_auto_renew` tinyint(1) DEFAULT '0',
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `index_lending_subscriptions_on_member_id` (`member_id`),
  KEY `index_lending_subscriptions_on_lending_id` (`lending_id`),
  KEY `index_lending_subscriptions_on_lending_duration_id` (`lending_duration_id`),
  CONSTRAINT `fk_rails_151d7c9608` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`),
  CONSTRAINT `fk_rails_8f00069ad4` FOREIGN KEY (`lending_id`) REFERENCES `lendings` (`id`),
  CONSTRAINT `fk_rails_d9abdbbe70` FOREIGN KEY (`lending_duration_id`) REFERENCES `lending_durations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.lending_types
DROP TABLE IF EXISTS `lending_types`;
CREATE TABLE IF NOT EXISTS `lending_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.liquidity_histories
DROP TABLE IF EXISTS `liquidity_histories`;
CREATE TABLE IF NOT EXISTS `liquidity_histories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `liquidity_status_id` int DEFAULT NULL,
  `detail` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.liquidity_statuses
DROP TABLE IF EXISTS `liquidity_statuses`;
CREATE TABLE IF NOT EXISTS `liquidity_statuses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `liquid_id` int DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_liquidity_statuses_on_order_id` (`order_id`) USING BTREE,
  CONSTRAINT `fk_rails_b1567b897d` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.loginhistories
DROP TABLE IF EXISTS `loginhistories`;
CREATE TABLE IF NOT EXISTS `loginhistories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_id` int DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `login_time` datetime DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `os` varchar(255) DEFAULT NULL,
  `browser` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.members
DROP TABLE IF EXISTS `members`;
CREATE TABLE IF NOT EXISTS `members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sn` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `identity_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `state` int DEFAULT NULL,
  `activated` tinyint(1) DEFAULT NULL,
  `country_code` int DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `disabled` tinyint(1) DEFAULT '0',
  `api_disabled` tinyint(1) DEFAULT '0',
  `referral_code` varchar(255) DEFAULT NULL,
  `referred_by_id` int DEFAULT NULL,
  `referral_completed_at` datetime DEFAULT NULL,
  `referral_count` int DEFAULT '0',
  `trade_volume` decimal(16,2) DEFAULT '0.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.member_stake_coins
DROP TABLE IF EXISTS `member_stake_coins`;
CREATE TABLE IF NOT EXISTS `member_stake_coins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_id` int DEFAULT NULL,
  `stake_coin_id` int DEFAULT NULL,
  `amount` decimal(32,16) DEFAULT NULL,
  `aasm_state` varchar(255) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.member_stake_coin_credit_histories
DROP TABLE IF EXISTS `member_stake_coin_credit_histories`;
CREATE TABLE IF NOT EXISTS `member_stake_coin_credit_histories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_stake_coin_id` int DEFAULT NULL,
  `credit_amount` decimal(32,16) DEFAULT NULL,
  `credit_percent` decimal(8,4) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.oauth_access_grants
DROP TABLE IF EXISTS `oauth_access_grants`;
CREATE TABLE IF NOT EXISTS `oauth_access_grants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `resource_owner_id` int NOT NULL,
  `application_id` int NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires_in` int NOT NULL,
  `redirect_uri` text NOT NULL,
  `created_at` datetime NOT NULL,
  `revoked_at` datetime DEFAULT NULL,
  `scopes` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_oauth_access_grants_on_token` (`token`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.oauth_access_tokens
DROP TABLE IF EXISTS `oauth_access_tokens`;
CREATE TABLE IF NOT EXISTS `oauth_access_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `resource_owner_id` int DEFAULT NULL,
  `application_id` int DEFAULT NULL,
  `token` varchar(255) NOT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `expires_in` int DEFAULT NULL,
  `revoked_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `scopes` varchar(255) DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_oauth_access_tokens_on_token` (`token`) USING BTREE,
  UNIQUE KEY `index_oauth_access_tokens_on_refresh_token` (`refresh_token`) USING BTREE,
  KEY `index_oauth_access_tokens_on_resource_owner_id` (`resource_owner_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.oauth_applications
DROP TABLE IF EXISTS `oauth_applications`;
CREATE TABLE IF NOT EXISTS `oauth_applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `uid` varchar(255) NOT NULL,
  `secret` varchar(255) NOT NULL,
  `redirect_uri` text NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_oauth_applications_on_uid` (`uid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.orders
DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bid` int DEFAULT NULL,
  `ask` int DEFAULT NULL,
  `currency` int DEFAULT NULL,
  `price` decimal(32,16) DEFAULT NULL,
  `volume` decimal(32,16) DEFAULT NULL,
  `origin_volume` decimal(32,16) DEFAULT NULL,
  `state` int DEFAULT NULL,
  `done_at` datetime DEFAULT NULL,
  `type` varchar(8) DEFAULT NULL,
  `member_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `sn` varchar(255) DEFAULT NULL,
  `source` varchar(255) NOT NULL,
  `ord_type` varchar(10) DEFAULT NULL,
  `locked` decimal(32,16) DEFAULT NULL,
  `origin_locked` decimal(32,16) DEFAULT NULL,
  `funds_received` decimal(32,16) DEFAULT '0.0000000000000000',
  `trades_count` int DEFAULT '0',
  `stop_price` decimal(32,16) DEFAULT NULL,
  `trigger_cond` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_orders_on_currency_and_state` (`currency`,`state`) USING BTREE,
  KEY `index_orders_on_member_id_and_state` (`member_id`,`state`) USING BTREE,
  KEY `index_orders_on_member_id` (`member_id`) USING BTREE,
  KEY `index_orders_on_state` (`state`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.partial_trees
DROP TABLE IF EXISTS `partial_trees`;
CREATE TABLE IF NOT EXISTS `partial_trees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `proof_id` int NOT NULL,
  `account_id` int NOT NULL,
  `json` text NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `sum` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.payment_addresses
DROP TABLE IF EXISTS `payment_addresses`;
CREATE TABLE IF NOT EXISTS `payment_addresses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `account_id` int DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `currency` int DEFAULT NULL,
  `secret` varchar(255) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  `private_key` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.payment_transactions
DROP TABLE IF EXISTS `payment_transactions`;
CREATE TABLE IF NOT EXISTS `payment_transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `txid` varchar(255) DEFAULT NULL,
  `amount` decimal(32,16) DEFAULT NULL,
  `confirmations` int DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `state` int DEFAULT NULL,
  `aasm_state` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `receive_at` datetime DEFAULT NULL,
  `dont_at` datetime DEFAULT NULL,
  `currency` int DEFAULT NULL,
  `type` varchar(60) DEFAULT NULL,
  `txout` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_payment_transactions_on_txid_and_txout` (`txid`,`txout`) USING BTREE,
  KEY `index_payment_transactions_on_type` (`type`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.proofs
DROP TABLE IF EXISTS `proofs`;
CREATE TABLE IF NOT EXISTS `proofs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `root` varchar(255) DEFAULT NULL,
  `currency` int DEFAULT NULL,
  `ready` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `sum` varchar(255) DEFAULT NULL,
  `addresses` text,
  `balance` varchar(30) DEFAULT NULL,
  `destination_tag` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.read_marks
DROP TABLE IF EXISTS `read_marks`;
CREATE TABLE IF NOT EXISTS `read_marks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `readable_id` int DEFAULT NULL,
  `member_id` int NOT NULL,
  `readable_type` varchar(20) NOT NULL,
  `timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_read_marks_on_member_id` (`member_id`) USING BTREE,
  KEY `index_read_marks_on_readable_type_and_readable_id` (`readable_type`,`readable_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.referral_commissions
DROP TABLE IF EXISTS `referral_commissions`;
CREATE TABLE IF NOT EXISTS `referral_commissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `min` int DEFAULT NULL,
  `max` int DEFAULT NULL,
  `fee_percent` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.running_accounts
DROP TABLE IF EXISTS `running_accounts`;
CREATE TABLE IF NOT EXISTS `running_accounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` int DEFAULT NULL,
  `income` decimal(32,16) NOT NULL DEFAULT '0.0000000000000000',
  `expenses` decimal(32,16) NOT NULL DEFAULT '0.0000000000000000',
  `currency` int DEFAULT NULL,
  `member_id` int DEFAULT NULL,
  `source_id` int DEFAULT NULL,
  `source_type` varchar(255) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_running_accounts_on_member_id` (`member_id`) USING BTREE,
  KEY `index_running_accounts_on_source_type_and_source_id` (`source_type`,`source_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.schema_migrations
DROP TABLE IF EXISTS `schema_migrations`;
CREATE TABLE IF NOT EXISTS `schema_migrations` (
  `version` varchar(255) NOT NULL,
  UNIQUE KEY `unique_schema_migrations` (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.signup_histories
DROP TABLE IF EXISTS `signup_histories`;
CREATE TABLE IF NOT EXISTS `signup_histories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_id` int DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `accept_language` varchar(255) DEFAULT NULL,
  `ua` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_signup_histories_on_member_id` (`member_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.simple_captcha_data
DROP TABLE IF EXISTS `simple_captcha_data`;
CREATE TABLE IF NOT EXISTS `simple_captcha_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key` varchar(40) DEFAULT NULL,
  `value` varchar(6) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_key` (`key`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.stake_coins
DROP TABLE IF EXISTS `stake_coins`;
CREATE TABLE IF NOT EXISTS `stake_coins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `currency` int DEFAULT NULL,
  `min_deposit` decimal(32,16) DEFAULT NULL,
  `max_deposit` decimal(32,16) DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `variable_apy_id` int DEFAULT NULL,
  `max_lot_size` decimal(32,16) DEFAULT NULL,
  `cur_lot_size` decimal(32,16) DEFAULT '0.0000000000000000',
  `lot_size_for_apy` decimal(32,16) DEFAULT '0.0000000000000000',
  `is_flexible` tinyint(1) DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.taggings
DROP TABLE IF EXISTS `taggings`;
CREATE TABLE IF NOT EXISTS `taggings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tag_id` int DEFAULT NULL,
  `taggable_id` int DEFAULT NULL,
  `taggable_type` varchar(255) DEFAULT NULL,
  `tagger_id` int DEFAULT NULL,
  `tagger_type` varchar(255) DEFAULT NULL,
  `context` varchar(128) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `taggings_idx` (`tag_id`,`taggable_id`,`taggable_type`,`context`,`tagger_id`,`tagger_type`) USING BTREE,
  KEY `index_taggings_on_context` (`context`) USING BTREE,
  KEY `index_taggings_on_tag_id` (`tag_id`) USING BTREE,
  KEY `index_taggings_on_taggable_id_and_taggable_type_and_context` (`taggable_id`,`taggable_type`,`context`) USING BTREE,
  KEY `taggings_idy` (`taggable_id`,`taggable_type`,`tagger_id`,`context`) USING BTREE,
  KEY `index_taggings_on_taggable_id` (`taggable_id`) USING BTREE,
  KEY `index_taggings_on_taggable_type` (`taggable_type`) USING BTREE,
  KEY `index_taggings_on_tagger_id_and_tagger_type` (`tagger_id`,`tagger_type`) USING BTREE,
  KEY `index_taggings_on_tagger_id` (`tagger_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.tags
DROP TABLE IF EXISTS `tags`;
CREATE TABLE IF NOT EXISTS `tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `taggings_count` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_tags_on_name` (`name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.tickets
DROP TABLE IF EXISTS `tickets`;
CREATE TABLE IF NOT EXISTS `tickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `aasm_state` varchar(255) DEFAULT NULL,
  `author_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.tokens
DROP TABLE IF EXISTS `tokens`;
CREATE TABLE IF NOT EXISTS `tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(255) DEFAULT NULL,
  `expire_at` datetime DEFAULT NULL,
  `member_id` int DEFAULT NULL,
  `is_used` tinyint(1) DEFAULT '0',
  `type` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_tokens_on_type_and_token_and_expire_at_and_is_used` (`type`,`token`,`expire_at`,`is_used`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.trades
DROP TABLE IF EXISTS `trades`;
CREATE TABLE IF NOT EXISTS `trades` (
  `id` int NOT NULL AUTO_INCREMENT,
  `price` decimal(32,16) DEFAULT NULL,
  `volume` decimal(32,16) DEFAULT NULL,
  `ask_id` int DEFAULT NULL,
  `bid_id` int DEFAULT NULL,
  `trend` int DEFAULT NULL,
  `currency` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `ask_member_id` int DEFAULT NULL,
  `bid_member_id` int DEFAULT NULL,
  `funds` decimal(32,16) DEFAULT NULL,
  `fetch_since_kraken_api` bigint DEFAULT NULL,
  `fetch_since_binance_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_trades_on_ask_id` (`ask_id`) USING BTREE,
  KEY `index_trades_on_ask_member_id` (`ask_member_id`) USING BTREE,
  KEY `index_trades_on_bid_id` (`bid_id`) USING BTREE,
  KEY `index_trades_on_bid_member_id` (`bid_member_id`) USING BTREE,
  KEY `index_trades_on_created_at` (`created_at`) USING BTREE,
  KEY `index_trades_on_currency` (`currency`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.two_factors
DROP TABLE IF EXISTS `two_factors`;
CREATE TABLE IF NOT EXISTS `two_factors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_id` int DEFAULT NULL,
  `otp_secret` varchar(255) DEFAULT NULL,
  `last_verify_at` datetime DEFAULT NULL,
  `activated` tinyint(1) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `refreshed_at` datetime DEFAULT NULL,
  `sms_check_activated` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.variable_apy
DROP TABLE IF EXISTS `variable_apy`;
CREATE TABLE IF NOT EXISTS `variable_apy` (
  `id` int NOT NULL AUTO_INCREMENT,
  `stake_coin_id` int DEFAULT NULL,
  `lot_size` decimal(32,16) DEFAULT '0.0000000000000000',
  `apy` decimal(8,4) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.versions
DROP TABLE IF EXISTS `versions`;
CREATE TABLE IF NOT EXISTS `versions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_type` varchar(255) NOT NULL,
  `item_id` int NOT NULL,
  `event` varchar(255) NOT NULL,
  `whodunnit` varchar(255) DEFAULT NULL,
  `object` text,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `index_versions_on_item_type_and_item_id` (`item_type`,`item_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.whitelistings
DROP TABLE IF EXISTS `whitelistings`;
CREATE TABLE IF NOT EXISTS `whitelistings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_id` int DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `expired_at` datetime DEFAULT NULL,
  `authorised_ip` tinyint(1) DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table iwave.withdraws
DROP TABLE IF EXISTS `withdraws`;
CREATE TABLE IF NOT EXISTS `withdraws` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sn` varchar(255) DEFAULT NULL,
  `account_id` int DEFAULT NULL,
  `member_id` int DEFAULT NULL,
  `currency` int DEFAULT NULL,
  `amount` decimal(32,16) DEFAULT NULL,
  `fee` decimal(32,16) DEFAULT NULL,
  `address_to` varchar(255) DEFAULT NULL,
  `address_from` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `fund_uid` varchar(255) DEFAULT NULL,
  `fund_extra` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `done_at` datetime DEFAULT NULL,
  `txid` varchar(255) DEFAULT NULL,
  `aasm_state` varchar(255) DEFAULT NULL,
  `sum` decimal(32,16) NOT NULL DEFAULT '0.0000000000000000',
  `type` varchar(255) DEFAULT NULL,
  `fund_tag` varchar(255) DEFAULT NULL,
  `bank_code` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
