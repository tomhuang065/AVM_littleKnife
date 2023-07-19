-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2023-07-19 07:09:10
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
  `third_subjects_eng` varchar(25) NOT NULL COMMENT '三階科目英文名稱',
  `fourth` int(10) NOT NULL COMMENT '四階代碼',
  `fourth_subjects_cn` varchar(25) NOT NULL COMMENT '四階科目中文名稱',
  `fourth_subjects_eng` varchar(25) NOT NULL COMMENT '四階科目英文名稱',
  `status` int(11) NOT NULL COMMENT '(1=true,0=false)',
  `update_user` varchar(25) DEFAULT NULL COMMENT '修改者'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `account_subjects`
--

INSERT INTO `account_subjects` (`id`, `third`, `third_subjects_cn`, `third_subjects_eng`, `fourth`, `fourth_subjects_cn`, `fourth_subjects_eng`, `status`, `update_user`) VALUES
(386, 411, '銷貨收入', 'sales revenue', 4111, '銷貨收入', 'sales revenue', 1, NULL),
(387, 411, '銷貨收入', 'sales revenue', 4112, '分期付款銷貨收入', 'installment sales revenue', 1, NULL),
(388, 417, '銷貨退回', 'sales return', 4171, '銷貨退回', 'sales return', 1, NULL),
(389, 419, '銷貨折讓', 'sales discounts and allow', 4191, '銷貨折讓', 'sales discounts and allow', 1, NULL),
(390, 461, '勞務收入', 'service revenue', 4611, '勞務收入', 'service revenue', 1, NULL),
(391, 471, '業務收入', 'agency revenue', 4711, '業務收入', 'agency revenue', 1, NULL),
(392, 488, '其他營業收入－其他', 'other operating revenue', 4888, '其他營業收入－其他other', 'operating revenue', 1, NULL),
(393, 511, '銷貨成本', 'cost of goods sold', 5111, '銷貨成本', 'cost of goods sold', 1, NULL),
(394, 511, '銷貨成本', 'cost of goods sold', 5112, '分期付款銷貨成本', 'installment cost of goods', 1, NULL),
(395, 512, '進貨', 'purchases', 5121, '進貨', 'purchases', 1, NULL),
(396, 512, '進貨', 'purchases', 5122, '進貨費用', 'purchase expenses', 1, NULL),
(397, 512, '進貨', 'purchases', 5123, '進貨退出', 'purchase returns', 1, NULL),
(398, 512, '進貨', 'purchases', 5124, '進貨折讓', 'purchase discounts and al', 1, NULL),
(399, 513, '進料', 'material purchased', 5131, '進料', 'material purchased', 1, NULL),
(400, 513, '進料', 'material purchased', 5132, '進料費用', 'charges on purchased mate', 1, NULL),
(401, 513, '進料', 'material purchased', 5133, '進料退出', 'material purchase returns', 1, NULL),
(402, 513, '進料', 'material purchased', 5134, '進料折讓', 'material purchase discoun', 1, NULL),
(403, 514, '直接人工', 'direct labor', 5141, '直接人工', 'direct labor', 1, NULL),
(404, 515, '製造費用', 'manufacturing overhead', 5151, '間接人工', 'indirect labor', 1, NULL),
(405, 515, '製造費用', 'manufacturing overhead', 5152, '租金支出', 'rent expense', 1, NULL),
(406, 515, '製造費用', 'manufacturing overhead', 5153, '文具用品', 'supplies expense', 1, NULL),
(407, 515, '製造費用', 'manufacturing overhead', 5154, '旅費', 'travelling expense', 1, NULL),
(408, 515, '製造費用', 'manufacturing overhead', 5155, '運費', 'shipping expenses', 1, NULL),
(409, 515, '製造費用', 'manufacturing overhead', 5156, '郵電費', 'postage expenses', 1, NULL),
(410, 515, '製造費用', 'manufacturing overhead', 5157, '修繕費', 'repair(s) and maintenance', 1, NULL),
(411, 515, '製造費用', 'manufacturing overhead', 5158, '包裝費', 'packing expenses', 1, NULL),
(412, 516, '製造費用', 'manufacturing overhead', 5161, '水電瓦斯費', 'utilities expense', 1, NULL),
(413, 516, '製造費用', 'manufacturing overhead', 5162, '保險費', 'insurance expense', 1, NULL),
(414, 516, '製造費用', 'manufacturing overhead', 5163, '加工費', 'manufacturing overhead – ', 1, NULL),
(415, 516, '製造費用', 'manufacturing overhead', 5166, '稅捐', 'taxes', 1, NULL),
(416, 516, '製造費用', 'manufacturing overhead', 5168, '折舊', 'depreciation expense', 1, NULL),
(417, 516, '製造費用', 'manufacturing overhead', 5169, '各項耗竭及攤提', 'various amortization', 1, NULL),
(418, 517, '製造費用', 'manufacturing overhead', 5172, '伙食費', 'meal expenses', 1, NULL),
(419, 517, '製造費用', 'manufacturing overhead', 5173, '職工福利', 'employee benefits/welfare', 1, NULL),
(420, 517, '製造費用', 'manufacturing overhead', 5176, '訓練費', 'training (expense)', 1, NULL),
(421, 517, '製造費用', 'manufacturing overhead', 5177, '間接材料', 'indirect materials', 1, NULL),
(422, 518, '製造費用', 'manufacturing overhead', 5188, '其他製造費用', 'other manufacturing expen', 1, NULL),
(423, 561, '勞務成本', 'service costs', 5611, '勞務成本', 'service costs', 1, NULL),
(424, 571, '業務成本', 'agency costs', 5711, '業務成本', 'agency costs', 1, NULL),
(425, 588, '其他營業成本—其他', 'other operating costs', 5888, '其他營業成本—其他', 'other operating costs', 1, NULL),
(426, 615, '推銷費用', 'selling expenses', 6151, '薪資支出', 'payroll expense', 1, NULL),
(427, 615, '推銷費用', 'selling expenses', 6152, '租金支出', 'rent expense', 1, NULL),
(428, 615, '推銷費用', 'selling expenses', 6153, '文具用品', 'supplies expense', 1, NULL),
(429, 615, '推銷費用', 'selling expenses', 6154, '旅費', 'travelling expense', 1, NULL),
(430, 615, '推銷費用', 'selling expenses', 6155, '運費', 'shipping expenses', 1, NULL),
(431, 615, '推銷費用', 'selling expenses', 6156, '郵電費', 'postage expenses', 1, NULL),
(432, 615, '推銷費用', 'selling expenses', 6157, '修繕費', 'repair(s) and maintenance', 1, NULL),
(433, 615, '推銷費用', 'selling expenses', 6159, '廣告費', 'advertisement expense, ad', 1, NULL),
(434, 616, '推銷費用', 'selling expenses', 6161, '水電瓦斯費', 'utilities expense', 1, NULL),
(435, 616, '推銷費用', 'selling expenses', 6162, '保險費', 'insurance expense', 1, NULL),
(436, 616, '推銷費用', 'selling expenses', 6164, '交際費', 'entertainment expense', 1, NULL),
(437, 616, '推銷費用', 'selling expenses', 6165, '捐贈', 'donation expense', 1, NULL),
(438, 616, '推銷費用', 'selling expenses', 6166, '稅捐', 'taxes', 1, NULL),
(439, 616, '推銷費用', 'selling expenses', 6167, '呆帳損失', 'loss on uncollectible acc', 1, NULL),
(440, 616, '推銷費用', 'selling expenses', 6168, '折舊', 'depreciation expense', 1, NULL),
(441, 616, '推銷費用', 'selling expenses', 6169, '各項耗竭及攤提', 'various amortization', 1, NULL),
(442, 617, '推銷費用', 'selling expenses', 6172, '伙食費', 'meal expenses', 1, NULL),
(443, 617, '推銷費用', 'selling expenses', 6173, '職工福利', 'employee benefits/welfare', 1, NULL),
(444, 617, '推銷費用', 'selling expenses', 6175, '佣金支出', 'commission expense', 1, NULL),
(445, 617, '推銷費用', 'selling expenses', 6176, '訓練費', 'Training expense', 1, NULL),
(446, 618, '推銷費用', 'selling expenses', 6188, '其他推銷費用', 'other selling expenses', 1, NULL),
(447, 625, '管理及總務費用', 'general & administrative ', 6251, '薪資支出', 'payroll expense', 1, NULL),
(448, 625, '管理及總務費用', 'general & administrative ', 6252, '租金支出', 'rent expense', 1, NULL),
(449, 625, '管理及總務費用', 'general & administrative ', 6253, '文具用品', 'supplies expense', 1, NULL),
(450, 625, '管理及總務費用', 'general & administrative ', 6254, '旅費', 'travelling expense', 1, NULL),
(451, 625, '管理及總務費用', 'general & administrative ', 6255, '運費', 'shipping expenses', 1, NULL),
(452, 625, '管理及總務費用', 'general & administrative ', 6256, '郵電費', 'postage expenses', 1, NULL),
(453, 625, '管理及總務費用', 'general & administrative ', 6257, '修繕費', 'repair(s) and maintenance', 1, NULL),
(454, 625, '管理及總務費用', 'general & administrative ', 6259, '廣告費', 'advertisement expense, ad', 1, NULL),
(455, 626, '管理及總務費用', 'general & administrative ', 6261, '水電瓦斯費', 'utilities expense', 1, NULL),
(456, 626, '管理及總務費用', 'general & administrative ', 6262, '保險費', 'insurance expense', 1, NULL),
(457, 626, '管理及總務費用', 'general & administrative ', 6264, '交際費', 'entertainment expense', 1, NULL),
(458, 626, '管理及總務費用', 'general & administrative ', 6265, '捐贈', 'donation expense', 1, NULL),
(459, 626, '管理及總務費用', 'general & administrative ', 6266, '稅捐', 'taxes', 1, NULL),
(460, 626, '管理及總務費用', 'general & administrative ', 6267, '呆帳損失', 'loss on uncollectible acc', 1, NULL),
(461, 626, '管理及總務費用', 'general & administrative ', 6268, '折舊', 'depreciation expense', 1, NULL),
(462, 626, '管理及總務費用', 'general & administrative ', 6269, '各項耗竭及攤提', 'various amortization', 1, NULL),
(463, 627, '管理及總務費用', 'general & administrative ', 6271, '外銷損失', 'loss on export sales', 1, NULL),
(464, 627, '管理及總務費用', 'general & administrative ', 6272, '伙食費', 'meal expenses', 1, NULL),
(465, 627, '管理及總務費用', 'general & administrative ', 6273, '職工福利', 'employee benefits/welfare', 1, NULL),
(466, 627, '管理及總務費用', 'general & administrative ', 6274, '研究發展費用', 'research and development ', 1, NULL),
(467, 627, '管理及總務費用', 'general & administrative ', 6275, '佣金支出', 'commission expense', 1, NULL),
(468, 627, '管理及總務費用', 'general & administrative ', 6276, '訓練費', 'Training expense', 1, NULL),
(469, 627, '管理及總務費用', 'general & administrative ', 6278, '勞務費', 'professional service fees', 1, NULL),
(470, 628, '管理及總務費用', 'general & administrative ', 6288, '其他管理及總務費用', 'other general and adminis', 1, NULL),
(471, 635, '研究及發展費用', 'research and development ', 6351, '薪資支出', 'payroll expense', 1, NULL),
(472, 635, '研究及發展費用', 'research and development ', 6352, '租金支出', 'rent expense', 1, NULL),
(473, 635, '研究及發展費用', 'research and development ', 6353, '文具用品', 'supplies expense', 1, NULL),
(474, 635, '研究及發展費用', 'research and development ', 6354, '旅費', 'travelling expense', 1, NULL),
(475, 635, '研究及發展費用', 'research and development ', 6355, '運費', 'shipping expenses', 1, NULL),
(476, 635, '研究及發展費用', 'research and development ', 6356, '郵電費', 'postage expenses', 1, NULL),
(477, 635, '研究及發展費用', 'research and development ', 6357, '修繕費', 'repair(s) and maintenance', 1, NULL),
(478, 636, '研究及發展費用', 'research and development ', 6361, '水電瓦斯費', 'utilities expense', 1, NULL),
(479, 636, '研究及發展費用', 'research and development ', 6362, '保險費', 'insurance expense', 1, NULL),
(480, 636, '研究及發展費用', 'research and development ', 6364, '交際費', 'entertainment expense', 1, NULL),
(481, 636, '研究及發展費用', 'research and development ', 6366, '稅捐', 'taxes', 1, NULL),
(482, 636, '研究及發展費用', 'research and development ', 6368, '折舊', 'depreciation expense', 1, NULL),
(483, 636, '研究及發展費用', 'research and development ', 6369, '各項耗竭及攤提', 'various amortization', 1, NULL),
(484, 637, '研究及發展費用', 'research and development ', 6372, '伙食費', 'meal expenses', 1, NULL),
(485, 637, '研究及發展費用', 'research and development ', 6373, '職工福利', 'employee benefits/welfare', 1, NULL),
(486, 637, '研究及發展費用', 'research and development ', 6376, '訓練費', 'Training expense', 1, NULL),
(487, 637, '研究及發展費用', 'research and development ', 6378, '其他研究發展費用', 'other research and develo', 1, NULL),
(488, 711, '利息收入', 'interest revenue', 7111, '利息收入', 'interest revenue/income', 1, NULL),
(489, 715, '兌換利益', 'foreign exchange gain', 7151, '兌換利益', 'foreign exchange gain', 1, NULL),
(490, 716, '處分投資收益', 'gain on disposal of inves', 7161, '處分投資收益', 'gain on disposal of inves', 1, NULL),
(491, 717, '處分資產溢價收入', 'gain on disposal of asset', 7171, '處分資產溢價收入', 'gain on disposal of asset', 1, NULL),
(492, 748, '其他營業外收益', 'other non-operating reven', 7481, '捐贈收入', 'donation income', 1, NULL),
(493, 748, '其他營業外收益', 'other non-operating reven', 7482, '租金收入', 'rent revenue/income', 1, NULL),
(494, 748, '其他營業外收益', 'other non-operating reven', 7483, '佣金收入', 'commission revenue/income', 1, NULL),
(495, 748, '其他營業外收益', 'other non-operating reven', 7484, '出售下腳及廢料收入', 'revenue from sale of scra', 1, NULL),
(496, 748, '其他營業外收益', 'other non-operating reven', 7485, '存貨盤盈', 'gain on physical inventor', 1, NULL),
(497, 748, '其他營業外收益', 'other non-operating reven', 7487, '壞帳轉回利益', 'gain on reversal of bad d', 1, NULL),
(498, 748, '其他營業外收益', 'other non-operating reven', 7488, '其他營業外收益－其他', 'other non-operating reven', 1, NULL),
(499, 751, '利息費用', 'interest expense', 7511, '利息費用', 'interest expense', 1, NULL),
(500, 753, '投資損失', 'investment loss', 7531, '金融資產評價損失', 'loss on valuation of fina', 1, NULL),
(501, 753, '投資損失', 'investment loss', 7532, '金融負債評價損失', 'loss on valuation of fina', 1, NULL),
(502, 753, '投資損失', 'investment loss', 7533, '採權益法認列之投資損失', 'investment loss recognize', 1, NULL),
(503, 754, '兌換損失', 'foreign exchange loss', 7541, '兌換損失', 'foreign exchange loss', 1, NULL),
(504, 755, '處分資產損失', 'loss on disposal of asset', 7551, '處分資產損失', 'loss on disposal of asset', 1, NULL),
(505, 756, '處分投資損失', 'loss on disposal of inves', 7561, '處分投資損失', 'loss on disposal of inves', 1, NULL),
(506, 788, '其他營業外費損', 'other non-operating expen', 7881, '停工損失', 'loss on work stoppages', 1, NULL),
(507, 788, '其他營業外費損', 'other non-operating expen', 7882, '災害損失', 'casualty loss', 1, NULL),
(508, 788, '其他營業外費損', 'other non-operating expen', 7885, '存貨盤損', 'loss on physical inventor', 1, NULL),
(509, 788, '其他營業外費損', 'other non-operating expen', 7886, '存貨跌價及呆滯損失', 'loss for market price dec', 1, NULL),
(510, 788, '其他營業外費損', 'other non-operating expen', 7888, '其他營業外費損－其他', 'other non-operating expen', 1, NULL),
(511, 791, '稅前純益（或純損）', 'income before tax', 7911, '稅前純益（或純損）', 'income before tax', 1, NULL),
(512, 811, '所得稅費用(或利益)', 'income tax expense (or be', 8111, '所得稅費用(或利益)', 'income tax expense (or be', 1, NULL),
(513, 821, '稅後純益（或純損）', 'income after tax', 8211, '稅後純益（或純損）', 'income after tax', 1, NULL);

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
  `update_user` varchar(25) DEFAULT NULL COMMENT '更新人員',
  `update_time` datetime DEFAULT NULL COMMENT '更新時間'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- 資料表結構 `m_purchase`
--

CREATE TABLE `m_purchase` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL COMMENT '日期',
  `purchase_id` varchar(25) NOT NULL COMMENT '採購材料代碼	',
  `purchase_name` varchar(50) NOT NULL COMMENT '採購材料名稱	',
  `purchase_quantity` int(11) NOT NULL COMMENT '採購數量',
  `purchase_unit` varchar(25) NOT NULL COMMENT '採購單位	',
  `purchase_price` int(11) NOT NULL COMMENT '採購成本'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `usage_price` int(11) NOT NULL COMMENT '使用成本'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `p_inventory_setup`
--

CREATE TABLE `p_inventory_setup` (
  `id` int(11) NOT NULL,
  `p_id` varchar(25) NOT NULL COMMENT '產品代碼	',
  `p_name` varchar(25) NOT NULL COMMENT '產品名稱	',
  `date` date NOT NULL COMMENT '日期',
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
  `purchase_id` varchar(25) NOT NULL COMMENT '採購(生產)產品代碼',
  `purchase_name` varchar(25) NOT NULL COMMENT '採購(生產)產品名稱',
  `purchase_qunatity` int(11) NOT NULL COMMENT '採購(生產)數量',
  `purchase_unit` varchar(25) NOT NULL COMMENT '採購(生產)單位',
  `purchase_price` int(11) NOT NULL COMMENT '採購(生產)成本'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `usage_price` int(11) NOT NULL COMMENT '使用成本'
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
  `update_time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `supplier`
--

INSERT INTO `supplier` (`id`, `supplier_num`, `supplier_name`, `update_user`, `update_time`) VALUES
(1, '0001', '小刀測試1', NULL, NULL),
(2, '0002', '小刀測試2', NULL, NULL),
(3, '0003', '小刀測試3', NULL, NULL),
(4, '0004', '小刀測試4', NULL, NULL),
(5, '0005', '小刀測試5', NULL, NULL),
(6, '0006', '小刀測試6', NULL, NULL),
(7, '0007', '小刀測試7', NULL, NULL),
(8, '0008', '小刀測試8', NULL, NULL),
(9, '0009', '小刀測試9', NULL, NULL),
(10, '0010', '小刀測試10', NULL, NULL),
(11, '0011', '小刀測試11', NULL, NULL),
(12, '0012', '小刀測試12', NULL, NULL),
(13, '0013', '小刀測試13', NULL, NULL),
(14, '0014', '小刀測試14', NULL, NULL),
(15, '0015', '小刀測試15', NULL, NULL),
(16, '0016', '小刀測試16', NULL, NULL),
(17, '0017', '小刀測試17', NULL, NULL),
(18, '0018', '小刀測試18', NULL, NULL);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '編碼', AUTO_INCREMENT=514;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `bom_first`
--
ALTER TABLE `bom_first`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '編號';

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `bom_second`
--
ALTER TABLE `bom_second`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '編號';

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `m_inventory_setup`
--
ALTER TABLE `m_inventory_setup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '編號';

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `m_purchase`
--
ALTER TABLE `m_purchase`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `m_useage`
--
ALTER TABLE `m_useage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '編號';

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `p_inventory_setup`
--
ALTER TABLE `p_inventory_setup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `p_purchase`
--
ALTER TABLE `p_purchase`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '編號';

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `p_useage`
--
ALTER TABLE `p_useage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '編號';

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '編號', AUTO_INCREMENT=19;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `value_target`
--
ALTER TABLE `value_target`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
