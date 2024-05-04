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

-- Dumping data for table iwave-uat.accounts: ~427 rows (approximately)
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` (`id`, `member_id`, `currency`, `balance`, `locked`, `created_at`, `updated_at`, `in`, `out`, `default_withdraw_fund_source_id`, `referral_commissions`) VALUES
	(1, 1, 1, 0.0000000000000000, 0.0000000000000000, '2022-03-02 22:39:40', '2022-03-02 22:39:40', 0.0000000000000000, 0.0000000000000000, NULL, 0.0000000000000000),
	(2, 1, 2, 0.0000000000000000, 0.0000000000000000, '2022-03-02 22:39:40', '2022-03-02 22:39:40', 0.0000000000000000, 0.0000000000000000, NULL, 0.0000000000000000),
	(3, 1, 6, 0.0000000000000000, 0.0000000000000000, '2022-03-02 22:39:40', '2022-03-02 22:39:40', 0.0000000000000000, 0.0000000000000000, NULL, 0.0000000000000000),
	(4, 1, 7, 0.0000000000000000, 0.0000000000000000, '2022-03-02 22:39:40', '2022-03-02 22:39:40', 0.0000000000000000, 0.0000000000000000, NULL, 0.0000000000000000),
	(5, 1, 8, 0.0000000000000000, 0.0000000000000000, '2022-03-02 22:39:40', '2022-03-02 22:39:40', 0.0000000000000000, 0.0000000000000000, NULL, 0.0000000000000000),
	(6, 2, 1, 0.0000000000000000, 0.0000000000000000, '2022-03-02 22:40:52', '2022-03-02 22:40:52', 0.0000000000000000, 0.0000000000000000, NULL, 0.0000000000000000),
	(7, 2, 2, 0.0000000000000000, 0.0000000000000000, '2022-03-02 22:40:52', '2022-03-02 22:40:52', 0.0000000000000000, 0.0000000000000000, NULL, 0.0000000000000000),
	(8, 2, 6, 0.0000000000000000, 0.0000000000000000, '2022-03-02 22:40:52', '2022-03-02 22:40:52', 0.0000000000000000, 0.0000000000000000, NULL, 0.0000000000000000),
	(9, 2, 7, 0.0000000000000000, 0.0000000000000000, '2022-03-02 22:40:52', '2022-03-02 22:40:52', 0.0000000000000000, 0.0000000000000000, NULL, 0.0000000000000000),
	(10, 2, 8, 0.0000000000000000, 0.0000000000000000, '2022-03-02 22:40:52', '2022-03-02 22:40:52', 0.0000000000000000, 0.0000000000000000, NULL, 0.0000000000000000),
	(11, 3, 1, 0.0000000000000000, 0.0000000000000000, '2022-03-02 22:41:39', '2022-03-02 22:41:39', 0.0000000000000000, 0.0000000000000000, NULL, 0.0000000000000000),
	(12, 3, 2, 0.0000000000000000, 0.0000000000000000, '2022-03-02 22:41:39', '2022-03-02 22:41:39', 0.0000000000000000, 0.0000000000000000, NULL, 0.0000000000000000),
	(13, 3, 6, 0.0000000000000000, 0.0000000000000000, '2022-03-02 22:41:39', '2022-03-02 22:41:39', 0.0000000000000000, 0.0000000000000000, NULL, 0.0000000000000000),
	(14, 3, 7, 0.0000000000000000, 0.0000000000000000, '2022-03-02 22:41:39', '2022-03-02 22:41:39', 0.0000000000000000, 0.0000000000000000, NULL, 0.0000000000000000),
	(15, 3, 8, 0.0000000000000000, 0.0000000000000000, '2022-03-02 22:41:39', '2022-03-02 22:41:39', 0.0000000000000000, 0.0000000000000000, NULL, 0.0000000000000000),
	(16, 4, 1, 0.0000000000000000, 0.0000000000000000, '2022-03-03 17:18:17', '2022-03-03 17:18:17', 0.0000000000000000, 0.0000000000000000, NULL, 0.0000000000000000),
	(17, 4, 2, 0.0500000000000000, 0.0000000000000000, '2022-03-03 17:18:17', '2022-03-04 18:22:19', 0.0000000000000000, 0.0000000000000000, NULL, 0.0000000000000000),
	(18, 4, 6, 10.0000000000000000, 0.0000000000000000, '2022-03-03 17:18:17', '2022-03-04 18:22:06', 0.0000000000000000, 0.0000000000000000, NULL, 0.0000000000000000),
	(19, 4, 7, 500.0000000000000000, 0.0000000000000000, '2022-03-03 17:18:17', '2022-03-04 18:16:38', 0.0000000000000000, 0.0000000000000000, NULL, 0.0000000000000000),
	(20, 4, 8, 0.0000000000000000, 0.0000000000000000, '2022-03-03 17:18:17', '2022-03-04 18:23:42', 0.0000000000000000, 0.0000000000000000, NULL, 0.0000000000000000),
	(21, 5, 1, 0.0000000000000000, 0.0000000000000000, '2022-03-03 18:05:33', '2022-03-03 18:05:33', 0.0000000000000000, 0.0000000000000000, NULL, 0.0000000000000000),
	(22, 5, 2, 0.0500000000000000, 0.0000000000000000, '2022-03-03 18:05:33', '2022-03-03 18:27:22', 0.0000000000000000, 0.0000000000000000, NULL, 0.0000000000000000),
	(23, 5, 6, 50.0000000000000000, 0.0000000000000000, '2022-03-03 18:05:33', '2022-03-03 18:15:45', 0.0000000000000000, 0.0000000000000000, NULL, 0.0000000000000000),
	(24, 5, 7, 9000.0000000000000000, 0.0000000000000000, '2022-03-03 18:05:33', '2022-03-03 18:12:39', 0.0000000000000000, 0.0000000000000000, NULL, 0.0000000000000000),
	(25, 5, 8, 0.5000000000000000, 0.0000000000000000, '2022-03-03 18:05:33', '2022-03-03 18:27:51', 0.0000000000000000, 0.0000000000000000, NULL, 0.0000000000000000);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;

-- Dumping data for table iwave-uat.account_versions: ~29 rows (approximately)
/*!40000 ALTER TABLE `account_versions` DISABLE KEYS */;
-- `account_versions` not populated

-- Dumping data for table iwave-uat.api_tokens: ~14 rows (approximately)
/*!40000 ALTER TABLE `api_tokens` DISABLE KEYS */;
-- `api_tokens` not populated
/*!40000 ALTER TABLE `api_tokens` ENABLE KEYS */;

-- Dumping data for table iwave-uat.assets: ~50 rows (approximately)
/*!40000 ALTER TABLE `assets` DISABLE KEYS */;
-- `assets` not populated
/*!40000 ALTER TABLE `assets` ENABLE KEYS */;

-- Dumping data for table iwave-uat.audit_logs: ~52 rows (approximately)
/*!40000 ALTER TABLE `audit_logs` DISABLE KEYS */;
-- `audit_logs` not populated
/*!40000 ALTER TABLE `audit_logs` ENABLE KEYS */;

-- Dumping data for table iwave-uat.authentications: ~46 rows (approximately)
/*!40000 ALTER TABLE `authentications` DISABLE KEYS */;
-- TBD REMOVE FIRST AND SEE HOW
-- INSERT INTO `authentications` (`id`, `provider`, `uid`, `token`, `secret`, `member_id`, `created_at`, `updated_at`, `nickname`) VALUES
-- 	(1, 'identity', '1', NULL, NULL, 1, '2021-11-29 07:16:06', '2021-11-29 07:16:06', NULL),
-- 	(2, 'identity', '2', NULL, NULL, 2, '2021-11-29 07:16:06', '2021-11-29 07:16:06', NULL),
-- 	(3, 'identity', '3', NULL, NULL, 3, '2021-12-09 10:45:22', '2021-12-09 10:45:22', NULL),
-- 	(4, 'identity', '4', NULL, NULL, 4, '2021-12-12 23:40:42', '2021-12-12 23:40:42', NULL),
-- 	(5, 'identity', '5', NULL, NULL, 5, '2021-12-12 23:47:03', '2021-12-12 23:47:03', NULL),
-- 	(6, 'identity', '6', NULL, NULL, 6, '2021-12-20 13:21:11', '2021-12-20 13:21:11', NULL),
-- 	(7, 'identity', '7', NULL, NULL, 7, '2021-12-21 08:30:44', '2021-12-21 08:30:44', NULL),
-- 	(8, 'identity', '8', NULL, NULL, 8, '2021-12-21 09:58:59', '2021-12-21 09:58:59', NULL),
-- 	(9, 'identity', '9', NULL, NULL, 9, '2021-12-23 08:38:55', '2021-12-23 08:38:55', NULL),
-- 	(10, 'identity', '10', NULL, NULL, 10, '2021-12-29 08:37:33', '2021-12-29 08:37:33', NULL),
-- 	(11, 'identity', '11', NULL, NULL, 11, '2021-12-31 03:47:46', '2021-12-31 03:47:46', NULL),
-- 	(12, 'identity', '12', NULL, NULL, 12, '2021-12-31 03:51:49', '2021-12-31 03:51:49', NULL),
-- 	(13, 'identity', '13', NULL, NULL, 13, '2021-12-31 03:53:22', '2021-12-31 03:53:22', NULL),
-- 	(14, 'identity', '14', NULL, NULL, 14, '2021-12-31 06:42:00', '2021-12-31 06:42:00', NULL),
-- 	(15, 'identity', '15', NULL, NULL, 15, '2021-12-31 07:37:44', '2021-12-31 07:37:44', NULL),
-- 	(16, 'identity', '16', NULL, NULL, 16, '2022-01-03 05:04:51', '2022-01-03 05:04:51', NULL),
-- 	(17, 'identity', '17', NULL, NULL, 17, '2022-01-03 05:13:44', '2022-01-03 05:13:44', NULL),
-- 	(18, 'identity', '18', NULL, NULL, 18, '2022-01-03 10:45:40', '2022-01-03 10:45:40', NULL),
-- 	(19, 'identity', '19', NULL, NULL, 19, '2022-01-03 11:18:09', '2022-01-03 11:18:09', NULL),
-- 	(20, 'identity', '20', NULL, NULL, 20, '2022-01-04 09:49:52', '2022-01-04 09:49:52', NULL),
-- 	(21, 'identity', '21', NULL, NULL, 21, '2022-01-06 06:16:53', '2022-01-06 06:16:53', NULL),
-- 	(22, 'identity', '22', NULL, NULL, 22, '2022-01-06 15:03:21', '2022-01-06 15:03:21', NULL),
-- 	(23, 'identity', '23', NULL, NULL, 23, '2022-01-07 03:28:38', '2022-01-07 03:28:38', NULL),
-- 	(24, 'identity', '24', NULL, NULL, 24, '2022-01-07 04:38:14', '2022-01-07 04:38:14', NULL),
-- 	(25, 'identity', '25', NULL, NULL, 25, '2022-01-07 05:13:43', '2022-01-07 05:13:43', NULL),
-- 	(26, 'identity', '26', NULL, NULL, 26, '2022-01-12 07:24:48', '2022-01-12 07:24:48', NULL),
-- 	(27, 'identity', '27', NULL, NULL, 27, '2022-01-12 07:42:15', '2022-01-12 07:42:15', NULL),
-- 	(28, 'identity', '28', NULL, NULL, 28, '2022-01-20 10:11:22', '2022-01-20 10:11:22', NULL),
-- 	(29, 'identity', '29', NULL, NULL, 29, '2022-01-20 10:22:51', '2022-01-20 10:22:51', NULL),
-- 	(30, 'identity', '30', NULL, NULL, 30, '2022-02-07 07:42:13', '2022-02-07 07:42:13', NULL),
-- 	(31, 'identity', '31', NULL, NULL, 31, '2022-02-08 03:49:26', '2022-02-08 03:49:26', NULL),
-- 	(32, 'identity', '32', NULL, NULL, 32, '2022-02-08 10:24:16', '2022-02-08 10:24:16', NULL),
-- 	(33, 'identity', '33', NULL, NULL, 33, '2022-02-08 10:40:42', '2022-02-08 10:40:42', NULL),
-- 	(34, 'identity', '34', NULL, NULL, 34, '2022-02-09 02:26:52', '2022-02-09 02:26:52', NULL),
-- 	(35, 'identity', '35', NULL, NULL, 35, '2022-02-10 11:01:34', '2022-02-10 11:01:34', NULL),
-- 	(36, 'identity', '73', NULL, NULL, 73, '2022-02-24 14:20:15', '2022-02-24 14:20:15', NULL),
-- 	(37, 'identity', '74', NULL, NULL, 74, '2022-02-24 14:24:32', '2022-02-24 14:24:32', NULL),
-- 	(38, 'identity', '75', NULL, NULL, 75, '2022-02-25 02:14:36', '2022-02-25 02:14:36', NULL),
-- 	(39, 'identity', '76', NULL, NULL, 76, '2022-03-02 22:39:40', '2022-03-02 22:39:40', NULL),
-- 	(40, 'identity', '77', NULL, NULL, 77, '2022-03-02 22:40:52', '2022-03-02 22:40:52', NULL),
-- 	(41, 'identity', '78', NULL, NULL, 78, '2022-03-02 22:41:39', '2022-03-02 22:41:39', NULL),
-- 	(42, 'identity', '79', NULL, NULL, 79, '2022-03-03 17:18:17', '2022-03-03 17:18:17', NULL),
-- 	(43, 'identity', '80', NULL, NULL, 80, '2022-03-03 18:05:33', '2022-03-03 18:05:33', NULL),
-- 	(44, 'identity', '81', NULL, NULL, 81, '2022-03-03 18:41:50', '2022-03-03 18:41:50', NULL),
-- 	(45, 'identity', '82', NULL, NULL, 82, '2022-03-04 16:45:22', '2022-03-04 16:45:22', NULL),
-- 	(46, 'identity', '83', NULL, NULL, 83, '2022-03-04 17:19:22', '2022-03-04 17:19:22', NULL),
-- 	(47, 'identity', '84', NULL, NULL, 84, '2022-03-04 18:22:25', '2022-03-04 18:22:25', NULL);
/*!40000 ALTER TABLE `authentications` ENABLE KEYS */;

-- Dumping data for table iwave-uat.bots: ~0 rows (approximately)
/*!40000 ALTER TABLE `bots` DISABLE KEYS */;
/*!40000 ALTER TABLE `bots` ENABLE KEYS */;

-- Dumping data for table iwave-uat.comments: ~7 rows (approximately)
-- `comments` not populated
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;

-- Dumping data for table iwave-uat.deposits: ~13 rows (approximately)
/*!40000 ALTER TABLE `deposits` DISABLE KEYS */;
-- `deposits` partially populated
INSERT INTO `deposits` (`id`, `account_id`, `member_id`, `currency`, `amount`, `fee`, `fund_uid`, `fund_extra`, `txid`, `state`, `aasm_state`, `created_at`, `updated_at`, `done_at`, `confirmations`, `type`, `payment_transaction_id`, `txout`, `bank_code`) VALUES
	(1, 32, 6, 2, 0.0020000000000000, 0.0000000000000000, NULL, NULL, '0x345006b3c096f9c976bca1b6382a8a1419755f642622f39bb80962751c2aec59', NULL, 'accepted', '2022-01-21 11:20:22', '2022-01-21 11:20:22', NULL, '0', 'Deposits::Ether', 1, 1, NULL),
	(2, 32, 6, 2, 0.1000000000000000, 0.0000000000000000, NULL, NULL, '0x3f6109dc820b5e2f2391e3e43a923395a30385c3ab9b5e2280ec3e7d47045040', NULL, 'accepted', '2022-02-02 10:41:39', '2022-02-02 10:41:39', NULL, '18', 'Deposits::Ether', 2, 1, NULL),
	(3, 129, 9, 7, 500.0000000000000000, 0.0000000000000000, NULL, NULL, '0x7450c440d1d998ac89d67f8f8be756f35758df2cdb2eecde93168377180bbca4', NULL, 'accepted', '2022-02-03 08:42:26', '2022-02-03 08:42:26', NULL, '-14643619', 'Deposits::Totoz', 3, 1, NULL),
	(4, 50, 9, 2, 0.0100000000000000, 0.0000000000000000, NULL, NULL, '0xdaa08b7d9bdf273a4055d87219d8ff8364841538ba5bc3200bc4d7fc9723ca63', NULL, 'accepted', '2022-02-07 03:04:05', '2022-02-07 03:04:06', NULL, '0', 'Deposits::Ether', 4, 1, NULL),
	(5, 54, 9, 6, 10.0000000000000000, 0.0000000000000000, NULL, NULL, '0x153db2a7eb6a70a608cd1422fc59392008ed4838bab7c1099b6ddc93690295f8', NULL, 'accepted', '2022-02-14 08:25:33', '2022-02-14 08:27:02', NULL, '7', 'Deposits::Usdt', 5, 1, NULL);
/*!40000 ALTER TABLE `deposits` ENABLE KEYS */;

-- Dumping data for table iwave-uat.documents: ~0 rows (approximately)
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;

-- Dumping data for table iwave-uat.document_translations: ~0 rows (approximately)
/*!40000 ALTER TABLE `document_translations` DISABLE KEYS */;
/*!40000 ALTER TABLE `document_translations` ENABLE KEYS */;

-- Dumping data for table iwave-uat.exchange_commissions: ~0 rows (approximately)
/*!40000 ALTER TABLE `exchange_commissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `exchange_commissions` ENABLE KEYS */;

-- Dumping data for table iwave-uat.fees: ~0 rows (approximately)
/*!40000 ALTER TABLE `fees` DISABLE KEYS */;
INSERT INTO `fees` (`id`, `min`, `max`, `taker`, `maker`, `created_at`, `updated_at`) VALUES
	(2, 0.0001, 1000000.0000, 0.0001, 0.0001, '2022-01-24 14:54:34', '2022-01-24 15:00:34');
/*!40000 ALTER TABLE `fees` ENABLE KEYS */;

-- Dumping data for table iwave-uat.fund_sources: ~23 rows (approximately)
/*!40000 ALTER TABLE `fund_sources` DISABLE KEYS */;
-- `fund_sources` not populated
/*!40000 ALTER TABLE `fund_sources` ENABLE KEYS */;

-- Dumping data for table iwave-uat.holder_discounts: ~0 rows (approximately)
/*!40000 ALTER TABLE `holder_discounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `holder_discounts` ENABLE KEYS */;

-- Dumping data for table iwave-uat.identities: ~81 rows (approximately)
/*!40000 ALTER TABLE `identities` DISABLE KEYS */;
INSERT INTO `identities` (`id`, `email`, `password_digest`, `roles`, `is_active`, `retry_count`, `is_locked`, `locked_at`, `last_verify_at`, `created_at`, `updated_at`) VALUES
	(1, 'ozadmin1@oz.finance', '$2a$12$rDcy6HHWwxFeKPsfXywHaete/uQ/AerIxGdZnlxzyAH6TRO5i9vJ6', 'user,admin', NULL, NULL, NULL, NULL, NULL, '2022-03-02 22:39:40', '2022-03-02 22:39:40'),
	(2, 'ozadmin2@oz.finance', '$2a$12$se2KFph7t1cQVRiz8EY8gevOf2Om7fL8QkKcYvLpuw0NzYYwCPbVm', 'user,admin', NULL, NULL, NULL, NULL, NULL, '2022-03-02 22:40:52', '2022-03-02 22:40:52'),
	(3, 'ozadmin3@oz.finance', '$2a$12$j2FoccM9ZkUpUU63Vu6rBuYEVaQOf9rrcqhlSYOu6R3cJ7xYXu4TS', 'user,admin', NULL, NULL, NULL, NULL, NULL, '2022-03-02 22:41:39', '2022-03-02 22:41:39'),
	(4, 'cece.lu+001@visiongroup.co', '$2a$12$YYUImrXnlz2kdO0GilLO0u8wE/NkODxuTdfYx3JCHRTR7SM7.V0Ke', 'user', NULL, NULL, NULL, NULL, NULL, '2022-03-03 17:18:17', '2022-03-03 17:18:17'),
	(5, 'cece.lu+002@visiongroup.co', '$2a$12$Q56n0PoqnH4k6YIBGuEKkON9jv8di2ZyHIUSmOYmG/AvfVsGAGmEy', 'user', NULL, NULL, NULL, NULL, NULL, '2022-03-03 18:05:33', '2022-03-03 18:05:33');
/*!40000 ALTER TABLE `identities` ENABLE KEYS */;

-- Dumping data for table iwave-uat.id_documents: ~81 rows (approximately)
/*!40000 ALTER TABLE `id_documents` DISABLE KEYS */;
INSERT INTO `id_documents` (`id`, `id_document_type`, `first_name`, `id_document_number`, `member_id`, `created_at`, `updated_at`, `birth_date`, `address`, `city`, `country`, `zipcode`, `id_bill_type`, `aasm_state`, `note`, `last_name`) VALUES
	(1, NULL, 'admin1', NULL, 1, '2022-03-02 22:39:40', '2022-03-02 22:39:40', NULL, NULL, NULL, NULL, NULL, NULL, 'verified', NULL, 'oz'),
	(2, NULL, 'admin2', NULL, 2, '2022-03-02 22:40:52', '2022-03-02 22:40:52', NULL, NULL, NULL, NULL, NULL, NULL, 'verified', NULL, 'oz'),
	(3, NULL, 'admin3', NULL, 3, '2022-03-02 22:41:39', '2022-03-02 22:41:39', NULL, NULL, NULL, NULL, NULL, NULL, 'verified', NULL, 'oz'),
	(4, 1, 'Cece', '123', 4, '2022-03-03 17:18:17', '2022-03-03 17:20:13', '1988-03-03', '123', '132', 'SG', '123', 0, 'verified', NULL, 'Lu'),
	(5, 0, 'Cece', '123', 5, '2022-03-03 18:05:33', '2022-03-03 18:07:09', '1993-04-08', '123', '123', 'SG', '123', 0, 'verified', NULL, 'Lu');
/*!40000 ALTER TABLE `id_documents` ENABLE KEYS */;

-- Dumping data for table iwave-uat.lendings: ~0 rows (approximately)
/*!40000 ALTER TABLE `lendings` DISABLE KEYS */;
/*!40000 ALTER TABLE `lendings` ENABLE KEYS */;

-- Dumping data for table iwave-uat.lending_auto_transfers: ~0 rows (approximately)
/*!40000 ALTER TABLE `lending_auto_transfers` DISABLE KEYS */;
/*!40000 ALTER TABLE `lending_auto_transfers` ENABLE KEYS */;

-- Dumping data for table iwave-uat.lending_durations: ~0 rows (approximately)
/*!40000 ALTER TABLE `lending_durations` DISABLE KEYS */;
/*!40000 ALTER TABLE `lending_durations` ENABLE KEYS */;

-- Dumping data for table iwave-uat.lending_redeems: ~0 rows (approximately)
/*!40000 ALTER TABLE `lending_redeems` DISABLE KEYS */;
/*!40000 ALTER TABLE `lending_redeems` ENABLE KEYS */;

-- Dumping data for table iwave-uat.lending_subscriptions: ~0 rows (approximately)
/*!40000 ALTER TABLE `lending_subscriptions` DISABLE KEYS */;
/*!40000 ALTER TABLE `lending_subscriptions` ENABLE KEYS */;

-- Dumping data for table iwave-uat.lending_types: ~0 rows (approximately)
/*!40000 ALTER TABLE `lending_types` DISABLE KEYS */;
/*!40000 ALTER TABLE `lending_types` ENABLE KEYS */;

-- Dumping data for table iwave-uat.liquidity_histories: ~0 rows (approximately)
/*!40000 ALTER TABLE `liquidity_histories` DISABLE KEYS */;
/*!40000 ALTER TABLE `liquidity_histories` ENABLE KEYS */;

-- Dumping data for table iwave-uat.liquidity_statuses: ~0 rows (approximately)
/*!40000 ALTER TABLE `liquidity_statuses` DISABLE KEYS */;
/*!40000 ALTER TABLE `liquidity_statuses` ENABLE KEYS */;

-- Dumping data for table iwave-uat.loginhistories: ~1,135 rows (approximately)
/*!40000 ALTER TABLE `loginhistories` DISABLE KEYS */;
-- `loginhistories` not populated
/*!40000 ALTER TABLE `loginhistories` ENABLE KEYS */;

-- Dumping data for table iwave-uat.members: ~81 rows (approximately)
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` (`id`, `sn`, `email`, `identity_id`, `created_at`, `updated_at`, `state`, `activated`, `country_code`, `phone_number`, `disabled`, `api_disabled`, `referral_code`, `referred_by_id`, `referral_completed_at`, `referral_count`, `trade_volume`) VALUES
	(1, '', 'ozadmin1@oz.finance', NULL, '2022-03-02 22:39:40', '2022-03-02 22:39:40', NULL, 0, 65, '88675543', 0, 0, 'l09o0ll0', NULL, NULL, 1, 0.00),
	(2, '', 'ozadmin2@oz.finance', NULL, '2022-03-02 22:40:52', '2022-03-02 22:40:52', NULL, 0, 65, '88478856', 0, 0, 'l09o255x', NULL, NULL, 0, 0.00),
	(3, '', 'ozadmin3@oz.finance', NULL, '2022-03-02 22:41:39', '2022-03-02 22:41:39', NULL, 0, 65, '88471122', 0, 0, 'l09o355s', NULL, NULL, 0, 0.00),
	(4, '', 'cece.lu+001@visiongroup.co', NULL, '2022-03-03 17:18:17', '2022-03-03 17:18:17', NULL, 1, 65, '96811741', 0, 0, 'l0arz51b', NULL, NULL, 0, 0.00),
	(5, '', 'cece.lu+002@visiongroup.co', NULL, '2022-03-03 18:05:33', '2022-03-03 18:05:33', NULL, 1, 65, '96811741', 0, 0, 'l0atnxs7', 76, NULL, 0, 0.00);
/*!40000 ALTER TABLE `members` ENABLE KEYS */;

-- Dumping data for table iwave-uat.member_stake_coins: ~0 rows (approximately)
/*!40000 ALTER TABLE `member_stake_coins` DISABLE KEYS */;
/*!40000 ALTER TABLE `member_stake_coins` ENABLE KEYS */;

-- Dumping data for table iwave-uat.member_stake_coin_credit_histories: ~0 rows (approximately)
/*!40000 ALTER TABLE `member_stake_coin_credit_histories` DISABLE KEYS */;
/*!40000 ALTER TABLE `member_stake_coin_credit_histories` ENABLE KEYS */;

-- Dumping data for table iwave-uat.oauth_access_grants: ~0 rows (approximately)
/*!40000 ALTER TABLE `oauth_access_grants` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_access_grants` ENABLE KEYS */;

-- Dumping data for table iwave-uat.oauth_access_tokens: ~0 rows (approximately)
/*!40000 ALTER TABLE `oauth_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_access_tokens` ENABLE KEYS */;

-- Dumping data for table iwave-uat.oauth_applications: ~0 rows (approximately)
/*!40000 ALTER TABLE `oauth_applications` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_applications` ENABLE KEYS */;

-- Dumping data for table iwave-uat.orders: ~0 rows (approximately)
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;

-- Dumping data for table iwave-uat.partial_trees: ~0 rows (approximately)
/*!40000 ALTER TABLE `partial_trees` DISABLE KEYS */;
/*!40000 ALTER TABLE `partial_trees` ENABLE KEYS */;

-- Dumping data for table iwave-uat.payment_addresses: ~298 rows (approximately)
/*!40000 ALTER TABLE `payment_addresses` DISABLE KEYS */;
INSERT INTO `payment_addresses` (`id`, `account_id`, `address`, `created_at`, `updated_at`, `currency`, `secret`, `details`, `private_key`) VALUES
	(1, 1, '18jHti7tu7ZfkyWMxZ6NwoqZt16m2D7pSi', '2022-03-02 22:39:40', '2022-03-02 22:39:40', 1, NULL, NULL, 'bc451b99ef30218658b5375917106f038e5873f5334a4158bb661e7cea728545'),
	(2, 2, '0x84DCE4Be57951EBe4a18aD3F81F9C7C5229c8A66', '2022-03-02 22:39:40', '2022-03-02 22:39:40', 2, NULL, NULL, 'e10003dd8df4b6f512ebb2a3ef65f1f0ee28791db71d9516a366b0e6e36e258e'),
	(3, 3, '0x84DCE4Be57951EBe4a18aD3F81F9C7C5229c8A66', '2022-03-02 22:39:40', '2022-03-02 22:39:40', 6, NULL, NULL, 'e10003dd8df4b6f512ebb2a3ef65f1f0ee28791db71d9516a366b0e6e36e258e'),
	(4, 4, '0x84DCE4Be57951EBe4a18aD3F81F9C7C5229c8A66', '2022-03-02 22:39:40', '2022-03-02 22:39:40', 7, NULL, NULL, 'e10003dd8df4b6f512ebb2a3ef65f1f0ee28791db71d9516a366b0e6e36e258e'),
	(5, 5, '0x84DCE4Be57951EBe4a18aD3F81F9C7C5229c8A66', '2022-03-02 22:39:40', '2022-03-02 22:39:40', 8, NULL, NULL, 'e10003dd8df4b6f512ebb2a3ef65f1f0ee28791db71d9516a366b0e6e36e258e'),
	(6, 6, '1HGzQvaz5CWizaJngiVWHyaKQhm7Zw4xbT', '2022-03-02 22:40:52', '2022-03-02 22:40:52', 1, NULL, NULL, 'edcab1588661e9401c51954586642b46cec6673664045448608077ebc17f502a'),
	(7, 7, '0x4cA4Cc3CE0122D8e8d37b061D0f955F825C9C7c6', '2022-03-02 22:40:52', '2022-03-02 22:40:52', 2, NULL, NULL, '8a53c9f86724f2b8557a421cd0ce73d9fd507c226f5b4a09c238c902d037d959'),
	(8, 8, '0x4cA4Cc3CE0122D8e8d37b061D0f955F825C9C7c6', '2022-03-02 22:40:52', '2022-03-02 22:40:52', 6, NULL, NULL, '8a53c9f86724f2b8557a421cd0ce73d9fd507c226f5b4a09c238c902d037d959'),
	(9, 9, '0x4cA4Cc3CE0122D8e8d37b061D0f955F825C9C7c6', '2022-03-02 22:40:52', '2022-03-02 22:40:52', 7, NULL, NULL, '8a53c9f86724f2b8557a421cd0ce73d9fd507c226f5b4a09c238c902d037d959'),
	(10, 10, '0x4cA4Cc3CE0122D8e8d37b061D0f955F825C9C7c6', '2022-03-02 22:40:52', '2022-03-02 22:40:52', 8, NULL, NULL, '8a53c9f86724f2b8557a421cd0ce73d9fd507c226f5b4a09c238c902d037d959'),
	(11, 11, '14DSBiwkPt5eHx717D8wpVJXczZGGjumjZ', '2022-03-02 22:41:39', '2022-03-02 22:41:39', 1, NULL, NULL, '6975557948e935c636227591fc1b1b08bb279095f8d06e1811cb9fe738f34df2'),
	(12, 12, '0xb081334452Dee107CC4572DE0875F4903C925e80', '2022-03-02 22:41:39', '2022-03-02 22:41:39', 2, NULL, NULL, '58a84269848536ed1fdd490a73af8bf291d2980ef4a1597c20356e434994b2dc'),
	(13, 13, '0xb081334452Dee107CC4572DE0875F4903C925e80', '2022-03-02 22:41:39', '2022-03-02 22:41:39', 6, NULL, NULL, '58a84269848536ed1fdd490a73af8bf291d2980ef4a1597c20356e434994b2dc'),
	(14, 14, '0xb081334452Dee107CC4572DE0875F4903C925e80', '2022-03-02 22:41:39', '2022-03-02 22:41:39', 7, NULL, NULL, '58a84269848536ed1fdd490a73af8bf291d2980ef4a1597c20356e434994b2dc'),
	(15, 15, '0xb081334452Dee107CC4572DE0875F4903C925e80', '2022-03-02 22:41:39', '2022-03-02 22:41:39', 8, NULL, NULL, '58a84269848536ed1fdd490a73af8bf291d2980ef4a1597c20356e434994b2dc'),
	(16, 16, '1HbkmUpHaHRnVgJ6qxZERYvfb4wuEuvjN2', '2022-03-03 17:18:17', '2022-03-03 17:18:17', 1, NULL, NULL, 'c4a9b6394a3211dee247422b15d3bdc4b7cc1d756ed223467191d46539a3c380'),
	(17, 17, '0x0705f2BB4e4e03D23fB98c66B076E4D131Bc734c', '2022-03-03 17:18:17', '2022-03-03 17:18:17', 2, NULL, NULL, '4e1f47c1d582847601ca6a741dbe2a1f62a25ff63d2fa994637878b169f42d0f'),
	(18, 18, '0x0705f2BB4e4e03D23fB98c66B076E4D131Bc734c', '2022-03-03 17:18:17', '2022-03-03 17:18:17', 6, NULL, NULL, '4e1f47c1d582847601ca6a741dbe2a1f62a25ff63d2fa994637878b169f42d0f'),
	(19, 19, '0x0705f2BB4e4e03D23fB98c66B076E4D131Bc734c', '2022-03-03 17:18:17', '2022-03-03 17:18:17', 7, NULL, NULL, '4e1f47c1d582847601ca6a741dbe2a1f62a25ff63d2fa994637878b169f42d0f'),
	(20, 20, '0x0705f2BB4e4e03D23fB98c66B076E4D131Bc734c', '2022-03-03 17:18:17', '2022-03-03 17:18:17', 8, NULL, NULL, '4e1f47c1d582847601ca6a741dbe2a1f62a25ff63d2fa994637878b169f42d0f'),
	(21, 21, '1JF8cXE74jU8MYZaK9JrnqmViVuoa41d9s', '2022-03-03 18:05:33', '2022-03-03 18:05:33', 1, NULL, NULL, '4d785cc716554bb47b2dde8dcde05c1258335f07e5b99404cbacfde3d37f387e'),
	(22, 22, '0xC264Ea848B2b74Cc7a58B99c1D37b6F3439a0238', '2022-03-03 18:05:33', '2022-03-03 18:05:33', 2, NULL, NULL, '5ae6cee626ed50bdcd579448710e2f531d2ea23a51f1eb5c92698a9bd71583be'),
	(23, 23, '0xC264Ea848B2b74Cc7a58B99c1D37b6F3439a0238', '2022-03-03 18:05:33', '2022-03-03 18:05:33', 6, NULL, NULL, '5ae6cee626ed50bdcd579448710e2f531d2ea23a51f1eb5c92698a9bd71583be'),
	(24, 24, '0xC264Ea848B2b74Cc7a58B99c1D37b6F3439a0238', '2022-03-03 18:05:33', '2022-03-03 18:05:33', 7, NULL, NULL, '5ae6cee626ed50bdcd579448710e2f531d2ea23a51f1eb5c92698a9bd71583be'),
	(25, 25, '0xC264Ea848B2b74Cc7a58B99c1D37b6F3439a0238', '2022-03-03 18:05:33', '2022-03-03 18:05:33', 8, NULL, NULL, '5ae6cee626ed50bdcd579448710e2f531d2ea23a51f1eb5c92698a9bd71583be');
/*!40000 ALTER TABLE `payment_addresses` ENABLE KEYS */;

-- Dumping data for table iwave-uat.payment_transactions: ~24 rows (approximately)
/*!40000 ALTER TABLE `payment_transactions` DISABLE KEYS */;
-- `payment_transactions` not populated
/*!40000 ALTER TABLE `payment_transactions` ENABLE KEYS */;

-- Dumping data for table iwave-uat.proofs: ~0 rows (approximately)
/*!40000 ALTER TABLE `proofs` DISABLE KEYS */;
/*!40000 ALTER TABLE `proofs` ENABLE KEYS */;

-- Dumping data for table iwave-uat.read_marks: ~95 rows (approximately)
/*!40000 ALTER TABLE `read_marks` DISABLE KEYS */;
-- `read_marks` not populated
/*!40000 ALTER TABLE `read_marks` ENABLE KEYS */;

-- Dumping data for table iwave-uat.referral_commissions: ~4 rows (approximately)
/*!40000 ALTER TABLE `referral_commissions` DISABLE KEYS */;
-- `referral_commissions` not populated
/*!40000 ALTER TABLE `referral_commissions` ENABLE KEYS */;

-- Dumping data for table iwave-uat.running_accounts: ~0 rows (approximately)
/*!40000 ALTER TABLE `running_accounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `running_accounts` ENABLE KEYS */;

-- Dumping data for table iwave-uat.schema_migrations: ~26 rows (approximately)
/*!40000 ALTER TABLE `schema_migrations` DISABLE KEYS */;
INSERT INTO `schema_migrations` (`version`) VALUES
	('20200924150329'),
	('20201012143241'),
	('20201020170250'),
	('20201020170840'),
	('20201101143836'),
	('20201207141049'),
	('20201208112858'),
	('20201208113256'),
	('20201210031523'),
	('20201216121340'),
	('20201216121527'),
	('20201216121540'),
	('20201216121652'),
	('20201216121741'),
	('20201217132034'),
	('20201221022148'),
	('20201223150536'),
	('20210102055124'),
	('20210219122506'),
	('20210225115600'),
	('20211025092515'),
	('20220110123252'),
	('20220110131122'),
	('20220110131234'),
	('20220110140703'),
	('20220111080112');
/*!40000 ALTER TABLE `schema_migrations` ENABLE KEYS */;

-- Dumping data for table iwave-uat.signup_histories: ~615 rows (approximately)
/*!40000 ALTER TABLE `signup_histories` DISABLE KEYS */;
-- `signup_histories` not populated
/*!40000 ALTER TABLE `signup_histories` ENABLE KEYS */;

-- Dumping data for table iwave-uat.simple_captcha_data: ~0 rows (approximately)
/*!40000 ALTER TABLE `simple_captcha_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `simple_captcha_data` ENABLE KEYS */;

-- Dumping data for table iwave-uat.stake_coins: ~2 rows (approximately)
/*!40000 ALTER TABLE `stake_coins` DISABLE KEYS */;
-- `signup_histories` not populated
/*!40000 ALTER TABLE `stake_coins` ENABLE KEYS */;

-- Dumping data for table iwave-uat.taggings: ~0 rows (approximately)
/*!40000 ALTER TABLE `taggings` DISABLE KEYS */;
/*!40000 ALTER TABLE `taggings` ENABLE KEYS */;

-- Dumping data for table iwave-uat.tags: ~0 rows (approximately)
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;

-- Dumping data for table iwave-uat.tickets: ~13 rows (approximately)
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
-- `tickets` not populated
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;

-- Dumping data for table iwave-uat.tokens: ~72 rows (approximately)
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
-- `tokens` not populated
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;

-- Dumping data for table iwave-uat.trades: ~0 rows (approximately)
/*!40000 ALTER TABLE `trades` DISABLE KEYS */;
/*!40000 ALTER TABLE `trades` ENABLE KEYS */;

-- Dumping data for table iwave-uat.two_factors: ~113 rows (approximately)
/*!40000 ALTER TABLE `two_factors` DISABLE KEYS */;
INSERT INTO `two_factors` (`id`, `member_id`, `otp_secret`, `last_verify_at`, `activated`, `type`, `refreshed_at`, `sms_check_activated`) VALUES
	(1, 1, 'AFPBWFDFHJQBQUL6', NULL, NULL, 'TwoFactor::App', '2022-03-02 22:39:40', 0),
	(2, 2, 'GM7FKHZPJ4PX2MCC', NULL, NULL, 'TwoFactor::App', '2022-03-02 22:40:52', 0),
	(3, 3, 'AYNUGVCENZTR24TF', NULL, NULL, 'TwoFactor::App', '2022-03-02 22:41:39', 0),
	(4, 4, 'PF3XE43EARTGSDZF', '2022-03-03 17:22:20', 1, 'TwoFactor::App', '2022-03-03 17:18:17', 0),
	(5, 5, 'F4XFCVJVEF7TQUKN', '2022-03-03 18:08:28', 1, 'TwoFactor::App', '2022-03-03 18:05:33', 0);
/*!40000 ALTER TABLE `two_factors` ENABLE KEYS */;

-- Dumping data for table iwave-uat.variable_apy: ~5 rows (approximately)
/*!40000 ALTER TABLE `variable_apy` DISABLE KEYS */;
-- `variable_apy` not populated
/*!40000 ALTER TABLE `variable_apy` ENABLE KEYS */;

-- Dumping data for table iwave-uat.versions: ~57 rows (approximately)
/*!40000 ALTER TABLE `versions` DISABLE KEYS */;
-- `versions` not populated
/*!40000 ALTER TABLE `versions` ENABLE KEYS */;

-- Dumping data for table iwave-uat.whitelistings: ~0 rows (approximately)
/*!40000 ALTER TABLE `whitelistings` DISABLE KEYS */;
/*!40000 ALTER TABLE `whitelistings` ENABLE KEYS */;

-- Dumping data for table iwave-uat.withdraws: ~29 rows (approximately)
/*!40000 ALTER TABLE `withdraws` DISABLE KEYS */;
-- `withdraws` not populated
/*!40000 ALTER TABLE `withdraws` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
