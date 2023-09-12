-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2023-09-12 09:31:01
-- 伺服器版本： 10.4.27-MariaDB
-- PHP 版本： 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `avm_little_knife`
--

-- --------------------------------------------------------

--
-- 資料表結構 `account_subjects`
--

CREATE TABLE `account_subjects` (
  `id` int(11) NOT NULL COMMENT '編碼',
  `third` int(10) NOT NULL COMMENT '三階代碼',
  `third_subjects_cn` varchar(25) NOT NULL COMMENT '三階科目中文名稱',
  `third_subjects_eng` varchar(50) NOT NULL COMMENT '三階科目英文名稱',
  `fourth` int(10) NOT NULL COMMENT '四階代碼',
  `fourth_subjects_cn` varchar(25) NOT NULL COMMENT '四階科目中文名稱',
  `fourth_subjects_eng` varchar(50) NOT NULL COMMENT '四階科目英文名稱',
  `status` int(11) NOT NULL COMMENT '(1=true,0=false)',
  `update_user` varchar(25) DEFAULT NULL COMMENT '修改者'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `account_subjects`
--

INSERT INTO `account_subjects` (`id`, `third`, `third_subjects_cn`, `third_subjects_eng`, `fourth`, `fourth_subjects_cn`, `fourth_subjects_eng`, `status`, `update_user`) VALUES
(1, 411, '銷貨收入', 'sales revenue', 4111, '銷貨收入', 'sales revenue', 1, 'test'),
(2, 411, '銷貨收入', 'sales revenue', 4112, '分期付款銷貨收入', 'installment sales revenue', 1, 'test'),
(3, 417, '銷貨退回', 'sales return', 4171, '銷貨退回', 'sales return', 1, 'test'),
(4, 419, '銷貨折讓', 'sales discounts and allowances', 4191, '銷貨折讓', 'sales discounts and allowances', 1, 'test'),
(5, 461, '勞務收入', 'service revenue', 4611, '勞務收入', 'service revenue', 1, 'test'),
(6, 471, '業務收入', 'agency revenue', 4711, '業務收入', 'agency revenue', 1, 'test'),
(7, 488, '其他營業收入－其他', 'other operating revenue', 4888, '其他營業收入－其他other', 'operating revenue', 1, 'test'),
(8, 511, '銷貨成本', 'cost of goods sold', 5111, '銷貨成本', 'cost of goods sold', 1, 'test'),
(9, 511, '銷貨成本', 'cost of goods sold', 5112, '分期付款銷貨成本', 'installment cost of goods sold', 1, 'test'),
(10, 512, '進貨', 'purchases', 5121, '進貨', 'purchases', 1, 'test'),
(11, 512, '進貨', 'purchases', 5122, '進貨費用', 'purchase expenses', 1, 'test'),
(12, 512, '進貨', 'purchases', 5123, '進貨退出', 'purchase returns', 1, 'test'),
(13, 512, '進貨', 'purchases', 5124, '進貨折讓', 'purchase discounts and allowances', 1, 'test'),
(14, 513, '進料', 'material purchased', 5131, '進料', 'material purchased', 1, 'test'),
(15, 513, '進料', 'material purchased', 5132, '進料費用', 'charges on purchased material', 1, 'test'),
(16, 513, '進料', 'material purchased', 5133, '進料退出', 'material purchase returns', 1, 'test'),
(17, 513, '進料', 'material purchased', 5134, '進料折讓', 'material purchase discounts and allowances', 1, 'test'),
(18, 514, '直接人工', 'direct labor', 5141, '直接人工', 'direct labor', 1, 'test'),
(19, 515, '製造費用', 'manufacturing overhead', 5151, '間接人工', 'indirect labor', 1, 'test'),
(20, 515, '製造費用', 'manufacturing overhead', 5152, '租金支出', 'rent expense', 1, 'test'),
(21, 515, '製造費用', 'manufacturing overhead', 5153, '文具用品', 'supplies expense', 1, 'test'),
(22, 515, '製造費用', 'manufacturing overhead', 5154, '旅費', 'travelling expense', 1, 'test'),
(23, 515, '製造費用', 'manufacturing overhead', 5155, '運費', 'shipping expenses', 1, 'test'),
(24, 515, '製造費用', 'manufacturing overhead', 5156, '郵電費', 'postage expenses', 1, 'test'),
(25, 515, '製造費用', 'manufacturing overhead', 5157, '修繕費', 'repair(s) and maintenance expense', 1, 'test'),
(26, 515, '製造費用', 'manufacturing overhead', 5158, '包裝費', 'packing expenses', 1, 'test'),
(27, 516, '製造費用', 'manufacturing overhead', 5161, '水電瓦斯費', 'utilities expense', 1, 'test'),
(28, 516, '製造費用', 'manufacturing overhead', 5162, '保險費', 'insurance expense', 1, 'test'),
(29, 516, '製造費用', 'manufacturing overhead', 5163, '加工費', 'manufacturing overhead – outsourced', 1, 'test'),
(30, 516, '製造費用', 'manufacturing overhead', 5166, '稅捐', 'taxes', 1, 'test'),
(31, 516, '製造費用', 'manufacturing overhead', 5168, '折舊', 'depreciation expense', 1, 'test'),
(32, 516, '製造費用', 'manufacturing overhead', 5169, '各項耗竭及攤提', 'various amortization', 1, 'test'),
(33, 517, '製造費用', 'manufacturing overhead', 5172, '伙食費', 'meal expenses', 1, 'test'),
(34, 517, '製造費用', 'manufacturing overhead', 5173, '職工福利', 'employee benefits/welfare', 1, 'test'),
(35, 517, '製造費用', 'manufacturing overhead', 5176, '訓練費', 'training (expense)', 1, 'test'),
(36, 517, '製造費用', 'manufacturing overhead', 5177, '間接材料', 'indirect materials', 1, 'test'),
(37, 518, '製造費用', 'manufacturing overhead', 5188, '其他製造費用', 'other manufacturing expenses', 1, 'test'),
(38, 561, '勞務成本', 'service costs', 5611, '勞務成本', 'service costs', 1, 'test'),
(39, 571, '業務成本', 'agency costs', 5711, '業務成本', 'agency costs', 1, 'test'),
(40, 588, '其他營業成本—其他', 'other operating costs', 5888, '其他營業成本—其他', 'other operating costs', 1, 'test'),
(41, 615, '推銷費用', 'selling expenses', 6151, '薪資支出', 'payroll expense', 1, 'test'),
(42, 615, '推銷費用', 'selling expenses', 6152, '租金支出', 'rent expense', 1, 'test'),
(43, 615, '推銷費用', 'selling expenses', 6153, '文具用品', 'supplies expense', 1, 'test'),
(44, 615, '推銷費用', 'selling expenses', 6154, '旅費', 'travelling expense', 1, 'test'),
(45, 615, '推銷費用', 'selling expenses', 6155, '運費', 'shipping expenses', 1, 'test'),
(46, 615, '推銷費用', 'selling expenses', 6156, '郵電費', 'postage expenses', 1, 'test'),
(47, 615, '推銷費用', 'selling expenses', 6157, '修繕費', 'repair(s) and maintenance (expense)', 1, 'test'),
(48, 615, '推銷費用', 'selling expenses', 6159, '廣告費', 'advertisement expense, advertisement', 1, 'test'),
(49, 616, '推銷費用', 'selling expenses', 6161, '水電瓦斯費', 'utilities expense', 1, 'test'),
(50, 616, '推銷費用', 'selling expenses', 6162, '保險費', 'insurance expense', 1, 'test'),
(51, 616, '推銷費用', 'selling expenses', 6164, '交際費', 'entertainment expense', 1, 'test'),
(52, 616, '推銷費用', 'selling expenses', 6165, '捐贈', 'donation expense', 1, 'test'),
(53, 616, '推銷費用', 'selling expenses', 6166, '稅捐', 'taxes', 1, 'test'),
(54, 616, '推銷費用', 'selling expenses', 6167, '呆帳損失', 'loss on uncollectible accounts', 1, 'test'),
(55, 616, '推銷費用', 'selling expenses', 6168, '折舊', 'depreciation expense', 1, 'test'),
(56, 616, '推銷費用', 'selling expenses', 6169, '各項耗竭及攤提', 'various amortization', 1, 'test'),
(57, 617, '推銷費用', 'selling expenses', 6172, '伙食費', 'meal expenses', 1, 'test'),
(58, 617, '推銷費用', 'selling expenses', 6173, '職工福利', 'employee benefits/welfare', 1, 'test'),
(59, 617, '推銷費用', 'selling expenses', 6175, '佣金支出', 'commission expense', 1, 'test'),
(60, 617, '推銷費用', 'selling expenses', 6176, '訓練費', 'Training expense', 1, 'test'),
(61, 618, '推銷費用', 'selling expenses', 6188, '其他推銷費用', 'other selling expenses', 1, 'test'),
(62, 625, '管理及總務費用', 'general & administrative expenses', 6251, '薪資支出', 'payroll expense', 1, 'test'),
(63, 625, '管理及總務費用', 'general & administrative expenses', 6252, '租金支出', 'rent expense', 1, 'test'),
(64, 625, '管理及總務費用', 'general & administrative expenses', 6253, '文具用品', 'supplies expense', 1, 'test'),
(65, 625, '管理及總務費用', 'general & administrative expenses', 6254, '旅費', 'travelling expense', 1, 'test'),
(66, 625, '管理及總務費用', 'general & administrative expenses', 6255, '運費', 'shipping expenses', 1, 'test'),
(67, 625, '管理及總務費用', 'general & administrative expenses', 6256, '郵電費', 'postage expenses', 1, 'test'),
(68, 625, '管理及總務費用', 'general & administrative expenses', 6257, '修繕費', 'repair(s) and maintenance (expense)', 1, 'test'),
(69, 625, '管理及總務費用', 'general & administrative expenses', 6259, '廣告費', 'advertisement expense, advertisement', 1, 'test'),
(70, 626, '管理及總務費用', 'general & administrative expenses', 6261, '水電瓦斯費', 'utilities expense', 1, 'test'),
(71, 626, '管理及總務費用', 'general & administrative expenses', 6262, '保險費', 'insurance expense', 1, 'test'),
(72, 626, '管理及總務費用', 'general & administrative expenses', 6264, '交際費', 'entertainment expense', 1, 'test'),
(73, 626, '管理及總務費用', 'general & administrative expenses', 6265, '捐贈', 'donation expense', 1, 'test'),
(74, 626, '管理及總務費用', 'general & administrative expenses', 6266, '稅捐', 'taxes', 1, 'test'),
(75, 626, '管理及總務費用', 'general & administrative expenses', 6267, '呆帳損失', 'loss on uncollectible accounts', 1, 'test'),
(76, 626, '管理及總務費用', 'general & administrative expenses', 6268, '折舊', 'depreciation expense', 1, 'test'),
(77, 626, '管理及總務費用', 'general & administrative expenses', 6269, '各項耗竭及攤提', 'various amortization', 1, 'test'),
(78, 627, '管理及總務費用', 'general & administrative expenses', 6271, '外銷損失', 'loss on export sales', 1, 'test'),
(79, 627, '管理及總務費用', 'general & administrative expenses', 6272, '伙食費', 'meal expenses', 1, 'test'),
(80, 627, '管理及總務費用', 'general & administrative expenses', 6273, '職工福利', 'employee benefits/welfare', 1, 'test'),
(81, 627, '管理及總務費用', 'general & administrative expenses', 6274, '研究發展費用', 'research and development expense', 1, 'test'),
(82, 627, '管理及總務費用', 'general & administrative expenses', 6275, '佣金支出', 'commission expense', 1, 'test'),
(83, 627, '管理及總務費用', 'general & administrative expenses', 6276, '訓練費', 'Training expense', 1, 'test'),
(84, 627, '管理及總務費用', 'general & administrative expenses', 6278, '勞務費', 'professional service fees', 1, 'test'),
(85, 628, '管理及總務費用', 'general & administrative expenses', 6288, '其他管理及總務費用', 'other general and administrative expenses', 1, 'test'),
(86, 635, '研究及發展費用', 'research and development expenses', 6351, '薪資支出', 'payroll expense', 1, 'test'),
(87, 635, '研究及發展費用', 'research and development expenses', 6352, '租金支出', 'rent expense', 1, 'test'),
(88, 635, '研究及發展費用', 'research and development expenses', 6353, '文具用品', 'supplies expense', 1, 'test'),
(89, 635, '研究及發展費用', 'research and development expenses', 6354, '旅費', 'travelling expense', 1, 'test'),
(90, 635, '研究及發展費用', 'research and development expenses', 6355, '運費', 'shipping expenses', 1, 'test'),
(91, 635, '研究及發展費用', 'research and development expenses', 6356, '郵電費', 'postage expenses', 1, 'test'),
(92, 635, '研究及發展費用', 'research and development expenses', 6357, '修繕費', 'repair(s) and maintenance (expense)', 1, 'test'),
(93, 636, '研究及發展費用', 'research and development expenses', 6361, '水電瓦斯費', 'utilities expense', 1, 'test'),
(94, 636, '研究及發展費用', 'research and development expenses', 6362, '保險費', 'insurance expense', 1, 'test'),
(95, 636, '研究及發展費用', 'research and development expenses', 6364, '交際費', 'entertainment expense', 1, 'test'),
(96, 636, '研究及發展費用', 'research and development expenses', 6366, '稅捐', 'taxes', 1, 'test'),
(97, 636, '研究及發展費用', 'research and development expenses', 6368, '折舊', 'depreciation expense', 1, 'test'),
(98, 636, '研究及發展費用', 'research and development expenses', 6369, '各項耗竭及攤提', 'various amortization', 1, 'test'),
(99, 637, '研究及發展費用', 'research and development expenses', 6372, '伙食費', 'meal expenses', 1, 'test'),
(100, 637, '研究及發展費用', 'research and development expenses', 6373, '職工福利', 'employee benefits/welfare', 1, 'test'),
(101, 637, '研究及發展費用', 'research and development expenses', 6376, '訓練費', 'Training expense', 1, 'test'),
(102, 637, '研究及發展費用', 'research and development expenses', 6378, '其他研究發展費用', 'other research and development expenses', 1, 'test'),
(103, 711, '利息收入', 'interest revenue', 7111, '利息收入', 'interest revenue/income', 1, 'test'),
(104, 715, '兌換利益', 'foreign exchange gain', 7151, '兌換利益', 'foreign exchange gain', 1, 'test'),
(105, 716, '處分投資收益', 'gain on disposal of investments', 7161, '處分投資收益', 'gain on disposal of investments', 1, 'test'),
(106, 717, '處分資產溢價收入', 'gain on disposal of assets', 7171, '處分資產溢價收入', 'gain on disposal of assets', 1, 'test'),
(107, 748, '其他營業外收益', 'other non-operating revenue', 7481, '捐贈收入', 'donation income', 1, 'test'),
(108, 748, '其他營業外收益', 'other non-operating revenue', 7482, '租金收入', 'rent revenue/income', 1, 'test'),
(109, 748, '其他營業外收益', 'other non-operating revenue', 7483, '佣金收入', 'commission revenue/income', 1, 'test'),
(110, 748, '其他營業外收益', 'other non-operating revenue', 7484, '出售下腳及廢料收入', 'revenue from sale of scraps', 1, 'test'),
(111, 748, '其他營業外收益', 'other non-operating revenue', 7485, '存貨盤盈', 'gain on physical inventory', 1, 'test'),
(112, 748, '其他營業外收益', 'other non-operating revenue', 7487, '壞帳轉回利益', 'gain on reversal of bad debts', 1, 'test'),
(113, 748, '其他營業外收益', 'other non-operating revenue', 7488, '其他營業外收益－其他', 'other non-operating revenue– other items', 1, 'test'),
(114, 751, '利息費用', 'interest expense', 7511, '利息費用', 'interest expense', 1, 'test'),
(115, 753, '投資損失', 'investment loss', 7531, '金融資產評價損失', 'loss on valuation of financial asset', 1, 'test'),
(116, 753, '投資損失', 'investment loss', 7532, '金融負債評價損失', 'loss on valuation of financial liability', 1, 'test'),
(117, 753, '投資損失', 'investment loss', 7533, '採權益法認列之投資損失', 'investment loss recognized under equity method', 1, 'test'),
(118, 754, '兌換損失', 'foreign exchange loss', 7541, '兌換損失', 'foreign exchange loss', 1, 'test'),
(119, 755, '處分資產損失', 'loss on disposal of assets', 7551, '處分資產損失', 'loss on disposal of assets', 1, 'test'),
(120, 756, '處分投資損失', 'loss on disposal of investments', 7561, '處分投資損失', 'loss on disposal of investments', 1, 'test'),
(121, 788, '其他營業外費損', 'other non-operating expenses', 7881, '停工損失', 'loss on work stoppages', 1, 'test'),
(122, 788, '其他營業外費損', 'other non-operating expenses', 7882, '災害損失', 'casualty loss', 1, 'test'),
(123, 788, '其他營業外費損', 'other non-operating expenses', 7885, '存貨盤損', 'loss on physical inventory', 1, 'test'),
(124, 788, '其他營業外費損', 'other non-operating expenses', 7886, '存貨跌價及呆滯損失', 'loss for market price decline and obsolete and slo', 1, 'test'),
(125, 788, '其他營業外費損', 'other non-operating expenses', 7888, '其他營業外費損－其他', 'other non-operating expenses– other', 1, 'test'),
(126, 791, '稅前純益（或純損）', 'income before tax', 7911, '稅前純益（或純損）', 'income before tax', 1, 'test'),
(127, 811, '所得稅費用(或利益)', 'income tax expense (or benefit)', 8111, '所得稅費用(或利益)', 'income tax expense (or benefit)', 1, 'test'),
(128, 821, '稅後純益（或純損）', 'income after tax', 8211, '稅後純益（或純損）', 'income after tax', 1, 'test');

-- --------------------------------------------------------

--
-- 資料表結構 `bom_first`
--

CREATE TABLE `bom_first` (
  `id` int(11) NOT NULL COMMENT '編號',
  `product_id` varchar(25) NOT NULL COMMENT '產品代碼',
  `product_name` varchar(25) NOT NULL COMMENT '產品名稱',
  `product_sec_id` varchar(25) NOT NULL COMMENT '二階產品代碼',
  `use_quantity` int(11) NOT NULL COMMENT '使用量',
  `status` int(11) NOT NULL COMMENT '狀態(1:True,0:False)',
  `update_user` varchar(25) DEFAULT NULL COMMENT '更新人員',
  `update_time` datetime DEFAULT NULL COMMENT '更新時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `bom_first`
--

INSERT INTO `bom_first` (`id`, `product_id`, `product_name`, `product_sec_id`, `use_quantity`, `status`, `update_user`, `update_time`) VALUES
(1, 'P001', '小刀產品1', 'P001-1', 5, 1, '測試人員', '2023-09-12 00:00:00'),
(2, 'P001', '小刀產品1', 'P001-2', 6, 1, '測試人員', '2023-09-12 00:00:00'),
(3, 'P002', '小刀產品2', 'M001', 1, 1, '測試人員', '2023-09-12 00:00:00'),
(4, 'P002', '小刀產品2', 'M002', 2, 1, '測試人員', '2023-09-12 00:00:00');

-- --------------------------------------------------------

--
-- 資料表結構 `bom_second`
--

CREATE TABLE `bom_second` (
  `id` int(11) NOT NULL COMMENT '編號',
  `product_id` varchar(25) NOT NULL COMMENT '一階產品代碼	',
  `product_sec_id` varchar(25) NOT NULL COMMENT '二階產品代碼	',
  `product_sec_name` varchar(25) NOT NULL COMMENT '二階產品名稱	',
  `material_id` varchar(25) NOT NULL COMMENT '原物料代碼',
  `use_quantity` int(11) NOT NULL COMMENT '使用量',
  `update_user` varchar(25) DEFAULT NULL COMMENT '更新人員',
  `update_time` datetime DEFAULT NULL COMMENT '更新時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `bom_second`
--

INSERT INTO `bom_second` (`id`, `product_id`, `product_sec_id`, `product_sec_name`, `material_id`, `use_quantity`, `update_user`, `update_time`) VALUES
(1, 'P001', 'P001-1', '小刀產品1-1', 'M001', 2, '測試人員', '2023-09-12 00:00:00'),
(2, 'P001', 'P001-1', '小刀產品1-1', 'M002', 3, '測試人員', '2023-09-12 00:00:00'),
(3, 'P001', 'P001-2', '小刀產品1-2', 'M001', 2, '測試人員', '2023-09-12 00:00:00'),
(4, 'P001', 'P001-2', '小刀產品1-2', 'M002', 3, '測試人員', '2023-09-12 00:00:00'),
(5, 'P001', 'P001-2', '小刀產品1-2', 'M003', 1, '測試人員', '2023-09-12 00:00:00');

-- --------------------------------------------------------

--
-- 資料表結構 `customer_expense`
--

CREATE TABLE `customer_expense` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL COMMENT '日期',
  `account_subjects_num` int(11) NOT NULL COMMENT '會科代碼',
  `cust_num` varchar(50) NOT NULL COMMENT '顧客代碼',
  `cust_name` varchar(50) NOT NULL COMMENT '顧客名稱',
  `unit_price` int(11) NOT NULL COMMENT '單價',
  `service_time` int(11) NOT NULL COMMENT '服務次數',
  `total_expense` int(11) NOT NULL COMMENT '總花費',
  `remark` varchar(100) DEFAULT NULL COMMENT '備註',
  `create_user` varchar(50) NOT NULL COMMENT '使用者'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `m_inventory_setup`
--

CREATE TABLE `m_inventory_setup` (
  `id` int(11) NOT NULL COMMENT '編號',
  `m_id` varchar(25) NOT NULL COMMENT '材料代碼',
  `m_name` varchar(25) NOT NULL COMMENT '材料名稱',
  `date` date NOT NULL COMMENT '日期',
  `start_quantity` int(11) NOT NULL COMMENT '期初數量',
  `start_unit` varchar(25) NOT NULL COMMENT '期初單位',
  `start_unit_price` int(11) NOT NULL COMMENT '期初單價',
  `start_cost` int(11) NOT NULL COMMENT '期初成本'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `m_inventory_setup`
--

INSERT INTO `m_inventory_setup` (`id`, `m_id`, `m_name`, `date`, `start_quantity`, `start_unit`, `start_unit_price`, `start_cost`) VALUES
(1, 'M001', '材料1', '2023-08-30', 300, '瓶', 100, 30000),
(2, 'M002', '材料2', '2023-08-30', 100, '包', 50, 5000),
(3, 'M003', '材料3', '2023-08-30', 50, '罐', 25, 1250);

-- --------------------------------------------------------

--
-- 資料表結構 `m_purchase`
--

CREATE TABLE `m_purchase` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL COMMENT '日期',
  `account_subjects_num` int(11) NOT NULL COMMENT '會科代碼',
  `purchase_id` varchar(25) NOT NULL COMMENT '採購材料代碼	',
  `purchase_name` varchar(50) NOT NULL COMMENT '採購材料名稱	',
  `purchase_quantity` int(11) NOT NULL COMMENT '採購數量',
  `purchase_unit` varchar(25) NOT NULL COMMENT '採購單位	',
  `purchase_price` int(11) NOT NULL COMMENT '採購成本',
  `supplier_num` varchar(50) NOT NULL COMMENT '供應商代碼',
  `remark` varchar(100) DEFAULT NULL COMMENT '備註',
  `create_user` varchar(25) NOT NULL COMMENT '建立者'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `m_purchase`
--

INSERT INTO `m_purchase` (`id`, `date`, `account_subjects_num`, `purchase_id`, `purchase_name`, `purchase_quantity`, `purchase_unit`, `purchase_price`, `supplier_num`, `remark`, `create_user`) VALUES
(1, '2023-08-09', 4111, 'M001', '小刀材料1', 100, '包', 10000, '0001', NULL, 'test'),
(2, '2023-08-09', 4111, 'M002', '小刀材料2', 50, '瓶', 8000, '0002', NULL, 'test'),
(3, '2023-08-09', 4111, 'M003', '小刀材料3', 75, '罐', 9000, '0003', NULL, 'test'),
(4, '2023-08-09', 4111, 'M004', '小刀材料4', 90, '箱', 3600, '0004', NULL, 'test'),
(5, '2023-08-09', 4111, 'M005', '小刀材料5', 100, '箱', 12000, '0005', NULL, 'test');

-- --------------------------------------------------------

--
-- 資料表結構 `m_useage`
--

CREATE TABLE `m_useage` (
  `id` int(11) NOT NULL COMMENT '編號',
  `date` date NOT NULL COMMENT '日期',
  `usage_id` varchar(25) NOT NULL COMMENT '使用材料代碼',
  `usage_name` varchar(25) NOT NULL COMMENT '使用材料名稱	',
  `usage_quantity` int(11) NOT NULL COMMENT '使用量',
  `usage_unit` varchar(25) NOT NULL COMMENT '使用單位',
  `usage_price` int(11) NOT NULL COMMENT '使用成本',
  `remark` varchar(100) DEFAULT NULL COMMENT '備註',
  `create_user` varchar(25) NOT NULL COMMENT '建立者'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `m_useage`
--

INSERT INTO `m_useage` (`id`, `date`, `usage_id`, `usage_name`, `usage_quantity`, `usage_unit`, `usage_price`, `remark`, `create_user`) VALUES
(7, '2023-08-30', 'M001', '材料1', 44, '瓶', 4400, 'remark', 'test'),
(8, '2023-08-30', 'M002', '材料2', 66, '包', 3300, 'remark', 'test'),
(9, '2023-08-30', 'M003', '材料3', 12, '罐', 300, 'remark', 'test'),
(10, '2023-08-30', 'M001', '材料1', 44, '瓶', 4400, 'remark', 'test'),
(11, '2023-08-30', 'M002', '材料2', 66, '包', 3300, 'remark', 'test'),
(12, '2023-08-30', 'M003', '材料3', 12, '罐', 300, 'remark', 'test'),
(13, '2023-08-30', 'M001', '材料1', 44, '瓶', 4400, 'remark', 'test'),
(14, '2023-08-30', 'M002', '材料2', 66, '包', 3300, 'remark', 'test'),
(15, '2023-08-30', 'M003', '材料3', 12, '罐', 300, 'remark', 'test'),
(16, '2023-08-30', 'M001', '材料1', 44, '瓶', 4400, 'remark', 'test'),
(17, '2023-08-30', 'M002', '材料2', 66, '包', 3300, 'remark', 'test'),
(18, '2023-08-30', 'M003', '材料3', 12, '罐', 300, 'remark', 'test');

-- --------------------------------------------------------

--
-- 資料表結構 `p_inventory_setup`
--

CREATE TABLE `p_inventory_setup` (
  `id` int(11) NOT NULL,
  `p_id` varchar(25) NOT NULL COMMENT '產品代碼	',
  `p_name` varchar(25) NOT NULL COMMENT '產品名稱	',
  `date` date NOT NULL COMMENT '日期',
  `supplier_num` varchar(50) NOT NULL COMMENT '供應商代碼',
  `start_quantity` int(11) NOT NULL COMMENT '期初數量',
  `start_unit` varchar(25) NOT NULL COMMENT '期初單位	',
  `start_unit_price` int(11) NOT NULL COMMENT '期初單價	',
  `start_cost` int(11) NOT NULL COMMENT '期初成本	'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `p_purchase`
--

CREATE TABLE `p_purchase` (
  `id` int(11) NOT NULL COMMENT '編號',
  `date` date NOT NULL COMMENT '日期',
  `account_subjects_num` int(11) NOT NULL COMMENT '會科代碼',
  `purchase_id` varchar(25) NOT NULL COMMENT '採購(生產)產品代碼',
  `purchase_name` varchar(25) NOT NULL COMMENT '採購(生產)產品名稱',
  `purchase_quantity` int(11) NOT NULL COMMENT '採購(生產)數量',
  `purchase_unit` varchar(25) NOT NULL COMMENT '採購(生產)單位',
  `purchase_price` int(11) NOT NULL COMMENT '採購(生產)成本',
  `remark` varchar(100) DEFAULT NULL COMMENT '備註',
  `create_user` varchar(25) NOT NULL COMMENT '建立者'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `p_purchase`
--

INSERT INTO `p_purchase` (`id`, `date`, `account_subjects_num`, `purchase_id`, `purchase_name`, `purchase_quantity`, `purchase_unit`, `purchase_price`, `remark`, `create_user`) VALUES
(1, '2023-08-30', 4112, 'P001', '小刀產品1', 2, '個', 1000, 'remark', 'test'),
(2, '2023-08-30', 4112, 'P001', '小刀產品1', 2, '個', 8000, 'remark', 'test');

-- --------------------------------------------------------

--
-- 資料表結構 `p_useage`
--

CREATE TABLE `p_useage` (
  `id` int(11) NOT NULL COMMENT '編號',
  `date` date NOT NULL COMMENT '日期',
  `usage_id` varchar(25) NOT NULL COMMENT '使用產品代碼	',
  `usage_name` varchar(25) NOT NULL COMMENT '使用產品名稱',
  `usage_quantity` int(11) NOT NULL COMMENT '使用量',
  `usage_unit` varchar(25) NOT NULL COMMENT '使用單位',
  `usage_price` int(11) NOT NULL COMMENT '使用成本',
  `remark` varchar(100) DEFAULT NULL COMMENT '備註',
  `create_user` varchar(25) NOT NULL COMMENT '建立者'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `supplier`
--

CREATE TABLE `supplier` (
  `id` int(11) NOT NULL COMMENT '編號',
  `supplier_num` varchar(25) NOT NULL COMMENT '供應商代碼',
  `supplier_name` varchar(50) NOT NULL COMMENT '供應商名稱',
  `update_user` varchar(25) DEFAULT NULL COMMENT '更新人員',
  `update_time` datetime DEFAULT NULL,
  `status` int(11) NOT NULL COMMENT '狀態(1:true 0:false)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `supplier`
--

INSERT INTO `supplier` (`id`, `supplier_num`, `supplier_name`, `update_user`, `update_time`, `status`) VALUES
(75, '0001', '小刀測試1', 'test', '2023-07-25 09:35:17', 1),
(76, '0002', '小刀測試2', 'test', '2023-07-25 09:35:17', 1),
(77, '0003', '小刀測試3', 'test', '2023-07-25 09:35:17', 1),
(78, '0004', '小刀測試4', 'test', '2023-07-25 09:35:17', 1),
(79, '0005', '小刀測試5', 'test', '2023-07-25 09:35:17', 1),
(80, '0006', '小刀測試6', 'test', '2023-07-25 09:35:17', 1),
(81, '0007', '小刀測試7', 'test', '2023-07-25 09:35:17', 1),
(82, '0008', '小刀測試8', 'test', '2023-07-25 09:35:17', 1),
(83, '0009', '小刀測試9', 'test', '2023-07-25 09:35:17', 1),
(84, '0010', '小刀測試10', 'test', '2023-07-25 09:35:17', 1),
(85, '0011', '小刀測試11', 'test', '2023-07-25 09:35:17', 1),
(86, '0012', '小刀測試12', 'test', '2023-07-25 09:35:17', 1),
(87, '0013', '小刀測試13', 'test', '2023-07-25 09:35:17', 1),
(88, '0014', '小刀測試14', 'test', '2023-07-25 09:35:17', 1),
(89, '0015', '小刀測試15', 'test', '2023-07-25 09:35:17', 1),
(90, '0016', '小刀測試16', 'test', '2023-07-25 09:35:17', 1),
(91, '0017', '小刀測試17', 'test', '2023-07-25 09:35:17', 1),
(92, '0018', '小刀測試18', 'test', '2023-07-25 09:35:17', 1);

-- --------------------------------------------------------

--
-- 資料表結構 `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL COMMENT '使用者名稱',
  `account` varchar(50) NOT NULL COMMENT '帳號',
  `password` varchar(50) NOT NULL COMMENT '密碼',
  `email` varchar(50) NOT NULL COMMENT '信箱',
  `permission` int(11) NOT NULL COMMENT '權限',
  `status` int(11) NOT NULL COMMENT '狀態(1:true 0:false)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `user`
--

INSERT INTO `user` (`id`, `username`, `account`, `password`, `email`, `permission`, `status`) VALUES
(1, 'tester', 'testing', '123456', 'abc@gmail.com', 1, 1),
(2, 'tester2', 'test123', '111111', 'qax@gmail.com', 1, 1),
(3, 'tester3', 'test000', '000000', 'aaa@gmail.com', 1, 1),
(4, 'sean', 'tester', '777777', 'sean@gmail.com', 1, 1),
(5, '信箱測試', 'email_test', 'emailemail', 'email@email.com', 1, 1);

-- --------------------------------------------------------

--
-- 資料表結構 `value_target`
--

CREATE TABLE `value_target` (
  `id` int(11) NOT NULL,
  `category` varchar(11) NOT NULL COMMENT '種類',
  `target_num` varchar(25) NOT NULL COMMENT '標的代碼',
  `target_name` varchar(25) NOT NULL COMMENT '標的名稱',
  `target_status` int(1) NOT NULL COMMENT '狀態(0:false, 1:true)',
  `update_time` datetime DEFAULT NULL COMMENT '更新時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `value_target`
--

INSERT INTO `value_target` (`id`, `category`, `target_num`, `target_name`, `target_status`, `update_time`) VALUES
(1, '顧客', 'C001', '小刀測試1', 1, '2023-07-25 09:38:01'),
(2, '原料', 'M001', '小刀測試2', 1, '2023-08-02 09:38:01'),
(3, '產品', 'P001', '小刀測試3', 1, '2023-08-10 09:38:01'),
(4, '部門', 'D001', '小刀測試4', 1, '2023-09-03 09:24:07');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `account_subjects`
--
ALTER TABLE `account_subjects`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `bom_first`
--
ALTER TABLE `bom_first`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `bom_second`
--
ALTER TABLE `bom_second`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `customer_expense`
--
ALTER TABLE `customer_expense`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `m_inventory_setup`
--
ALTER TABLE `m_inventory_setup`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `m_purchase`
--
ALTER TABLE `m_purchase`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `m_useage`
--
ALTER TABLE `m_useage`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `p_inventory_setup`
--
ALTER TABLE `p_inventory_setup`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `p_purchase`
--
ALTER TABLE `p_purchase`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `p_useage`
--
ALTER TABLE `p_useage`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `value_target`
--
ALTER TABLE `value_target`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `account_subjects`
--
ALTER TABLE `account_subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '編碼', AUTO_INCREMENT=129;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `bom_first`
--
ALTER TABLE `bom_first`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '編號', AUTO_INCREMENT=5;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `bom_second`
--
ALTER TABLE `bom_second`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '編號', AUTO_INCREMENT=6;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `customer_expense`
--
ALTER TABLE `customer_expense`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `m_inventory_setup`
--
ALTER TABLE `m_inventory_setup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '編號', AUTO_INCREMENT=4;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `m_purchase`
--
ALTER TABLE `m_purchase`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `m_useage`
--
ALTER TABLE `m_useage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '編號', AUTO_INCREMENT=19;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `p_inventory_setup`
--
ALTER TABLE `p_inventory_setup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `p_purchase`
--
ALTER TABLE `p_purchase`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '編號', AUTO_INCREMENT=3;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `p_useage`
--
ALTER TABLE `p_useage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '編號';

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '編號', AUTO_INCREMENT=96;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `value_target`
--
ALTER TABLE `value_target`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
