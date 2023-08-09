import ExcelJS from "exceljs";
import XLSX from 'xlsx';
import mysql from 'mysql2';


const connection = mysql.createConnection({
    host: 'localhost', // 資料庫主機名稱
    user: 'root', // 資料庫使用者名稱
    password: '', // 資料庫密碼
    database: 'avm_little_knife', // 資料庫名稱
});

// 測試連線
connection.connect((error) => {
    if (error) {
        console.error('無法連接到資料庫：', error);
    } else {
        console.log('已成功連接到資料庫');
    }
});

const sendData = (data, ws) => {
    console.log("wsc ready", ws.readyState)
    ws.send(JSON.stringify(data));
}

const sendValue = async (payload, ws) => {
    connection.query('SELECT * FROM supplier', (err, results) => {
        if (err) throw err;
        console.log(results)
        sendData(['getSupplier', { val: 300, sup: results }], ws);
    })
}



//會計科目excel
const excel_subjects = (paylaod, ws)  => {
    const account_subjects = new ExcelJS.Workbook();
    const sheet = account_subjects.addWorksheet('會計科目');
    sheet.addTable({
        ref: 'A1',
        columns: [
            { name: '三階代碼' },
            { name: '三階中文名' },
            { name: '三階英文名' },
            { name: '四階代碼' },
            { name: '四階中文名' },
            { name: '四階英文名' }
        ],
        rows: [
            ['411', '銷貨收入 ', 'sales revenue', '4111', '銷貨收入 ', 'sales revenue']
            ,
            ['411', '銷貨收入 ', 'sales revenue', '4112', '分期付款銷貨收入 ', 'installment sales revenue']
            ,
            ['417', '銷貨退回 ', 'sales return', '4171', '銷貨退回 ', 'sales return']
            ,
            ['419', '銷貨折讓 ', 'sales discounts and allowances', '4191', '銷貨折讓 ', 'sales discounts and allowances']
            ,
            ['461', '勞務收入 ', 'service revenue', '4611', '勞務收入 ', 'service revenue']
            ,
            ['471', '業務收入 ', 'agency revenue', '4711', '業務收入 ', 'agency revenue']
            ,
            ['488', '其他營業收入－其他 ', 'other operating revenue', '4888', '其他營業收入－其他other ', 'operating revenue']
            ,
            ['511', '銷貨成本 ', 'cost of goods sold', '5111', '銷貨成本 ', 'cost of goods sold']
            ,
            ['511', '銷貨成本 ', 'cost of goods sold', '5112', '分期付款銷貨成本 ', 'installment cost of goods sold']
            ,
            ['512', '進貨 ', 'purchases', '5121', '進貨 ', 'purchases']
            ,
            ['512', '進貨 ', 'purchases', '5122', '進貨費用 ', 'purchase expenses']
            ,
            ['512', '進貨 ', 'purchases', '5123', '進貨退出 ', 'purchase returns']
            ,
            ['512', '進貨 ', 'purchases', '5124', '進貨折讓 ', 'purchase discounts and allowances']
            ,
            ['513', '進料 ', 'material purchased ', '5131', '進料 ', 'material purchased ']
            ,
            ['513', '進料 ', 'material purchased ', '5132', '進料費用 ', 'charges on purchased material']
            ,
            ['513', '進料 ', 'material purchased ', '5133', '進料退出 ', 'material purchase returns']
            ,
            ['513', '進料 ', 'material purchased ', '5134', '進料折讓 ', 'material purchase discounts and allowances']
            ,
            ['514', '直接人工 ', 'direct labor', '5141', '直接人工 ', 'direct labor']
            ,
            ['515', '製造費用 ', 'manufacturing overhead', '5151', '間接人工 ', 'indirect labor']
            ,
            ['515', '製造費用 ', 'manufacturing overhead', '5152', '租金支出 ', 'rent expense']
            ,
            ['515', '製造費用 ', 'manufacturing overhead', '5153', '文具用品 ', 'supplies expense']
            ,
            ['515', '製造費用 ', 'manufacturing overhead', '5154', '旅費 ', 'travelling expense']
            ,
            ['515', '製造費用 ', 'manufacturing overhead', '5155', '運費 ', 'shipping expenses']
            ,
            ['515', '製造費用 ', 'manufacturing overhead', '5156', '郵電費 ', 'postage expenses']
            ,
            ['515', '製造費用 ', 'manufacturing overhead', '5157', '修繕費 ', 'repair(s) and maintenance expense']
            ,
            ['515', '製造費用 ', 'manufacturing overhead', '5158', '包裝費 ', 'packing expenses']
            ,
            ['516', '製造費用 ', 'manufacturing overhead', '5161', '水電瓦斯費 ', 'utilities expense']
            ,
            ['516', '製造費用 ', 'manufacturing overhead', '5162', '保險費 ', 'insurance expense']
            ,
            ['516', '製造費用 ', 'manufacturing overhead', '5163', '加工費 ', 'manufacturing overhead – outsourced']
            ,
            ['516', '製造費用 ', 'manufacturing overhead', '5166', '稅捐 ', 'taxes']
            ,
            ['516', '製造費用 ', 'manufacturing overhead', '5168', '折舊 ', 'depreciation expense']
            ,
            ['516', '製造費用 ', 'manufacturing overhead', '5169', '各項耗竭及攤提 ', 'various amortization']
            ,
            ['517', '製造費用 ', 'manufacturing overhead', '5172', '伙食費 ', 'meal expenses']
            ,
            ['517', '製造費用 ', 'manufacturing overhead', '5173', '職工福利 ', 'employee benefits/welfare']
            ,
            ['517', '製造費用 ', 'manufacturing overhead', '5176', '訓練費 ', 'training (expense)']
            ,
            ['517', '製造費用 ', 'manufacturing overhead', '5177', '間接材料 ', 'indirect materials']
            ,
            ['518', '製造費用 ', 'manufacturing overhead', '5188', '其他製造費用 ', 'other manufacturing expenses']
            ,
            ['561', '勞務成本 ', 'service costs', '5611', '勞務成本 ', 'service costs']
            ,
            ['571', '業務成本 ', 'agency costs', '5711', '業務成本 ', 'agency costs']
            ,
            ['588', '其他營業成本—其他 ', 'other operating costs', '5888', '其他營業成本—其他 ', 'other operating costs']
            ,
            ['615', '推銷費用 ', 'selling expenses', '6151', '薪資支出 ', 'payroll expense']
            ,
            ['615', '推銷費用 ', 'selling expenses', '6152', '租金支出 ', 'rent expense']
            ,
            ['615', '推銷費用 ', 'selling expenses', '6153', '文具用品 ', 'supplies expense']
            ,
            ['615', '推銷費用 ', 'selling expenses', '6154', '旅費 ', 'travelling expense']
            ,
            ['615', '推銷費用 ', 'selling expenses', '6155', '運費 ', 'shipping expenses']
            ,
            ['615', '推銷費用 ', 'selling expenses', '6156', '郵電費 ', 'postage expenses']
            ,
            ['615', '推銷費用 ', 'selling expenses', '6157', '修繕費 ', 'repair(s) and maintenance (expense)']
            ,
            ['615', '推銷費用 ', 'selling expenses', '6159', '廣告費 ', 'advertisement expense, advertisement']
            ,
            ['616', '推銷費用 ', 'selling expenses', '6161', '水電瓦斯費 ', 'utilities expense']
            ,
            ['616', '推銷費用 ', 'selling expenses', '6162', '保險費 ', 'insurance expense']
            ,
            ['616', '推銷費用 ', 'selling expenses', '6164', '交際費 ', 'entertainment expense']
            ,
            ['616', '推銷費用 ', 'selling expenses', '6165', '捐贈 ', 'donation expense']
            ,
            ['616', '推銷費用 ', 'selling expenses', '6166', '稅捐 ', 'taxes']
            ,
            ['616', '推銷費用 ', 'selling expenses', '6167', '呆帳損失 ', 'loss on uncollectible accounts']
            ,
            ['616', '推銷費用 ', 'selling expenses', '6168', '折舊 ', 'depreciation expense']
            ,
            ['616', '推銷費用 ', 'selling expenses', '6169', '各項耗竭及攤提 ', 'various amortization']
            ,
            ['617', '推銷費用 ', 'selling expenses', '6172', '伙食費 ', 'meal expenses']
            ,
            ['617', '推銷費用 ', 'selling expenses', '6173', '職工福利 ', 'employee benefits/welfare']
            ,
            ['617', '推銷費用 ', 'selling expenses', '6175', '佣金支出 ', 'commission expense']
            ,
            ['617', '推銷費用 ', 'selling expenses', '6176', '訓練費 ', 'Training expense']
            ,
            ['618', '推銷費用 ', 'selling expenses', '6188', '其他推銷費用 ', 'other selling expenses']
            ,
            ['625', '管理及總務費用 ', 'general & administrative expenses', '6251', '薪資支出 ', 'payroll expense']
            ,
            ['625', '管理及總務費用 ', 'general & administrative expenses', '6252', '租金支出 ', 'rent expense']
            ,
            ['625', '管理及總務費用 ', 'general & administrative expenses', '6253', '文具用品 ', 'supplies expense']
            ,
            ['625', '管理及總務費用 ', 'general & administrative expenses', '6254', '旅費 ', 'travelling expense']
            ,
            ['625', '管理及總務費用 ', 'general & administrative expenses', '6255', '運費 ', 'shipping expenses']
            ,
            ['625', '管理及總務費用 ', 'general & administrative expenses', '6256', '郵電費 ', 'postage expenses']
            ,
            ['625', '管理及總務費用 ', 'general & administrative expenses', '6257', '修繕費 ', 'repair(s) and maintenance (expense)']
            ,
            ['625', '管理及總務費用 ', 'general & administrative expenses', '6259', '廣告費 ', 'advertisement expense, advertisement']
            ,
            ['626', '管理及總務費用 ', 'general & administrative expenses', '6261', '水電瓦斯費 ', 'utilities expense']
            ,
            ['626', '管理及總務費用 ', 'general & administrative expenses', '6262', '保險費 ', 'insurance expense']
            ,
            ['626', '管理及總務費用 ', 'general & administrative expenses', '6264', '交際費 ', 'entertainment expense']
            ,
            ['626', '管理及總務費用 ', 'general & administrative expenses', '6265', '捐贈 ', 'donation expense']
            ,
            ['626', '管理及總務費用 ', 'general & administrative expenses', '6266', '稅捐 ', 'taxes']
            ,
            ['626', '管理及總務費用 ', 'general & administrative expenses', '6267', '呆帳損失 ', 'loss on uncollectible accounts']
            ,
            ['626', '管理及總務費用 ', 'general & administrative expenses', '6268', '折舊 ', 'depreciation expense']
            ,
            ['626', '管理及總務費用 ', 'general & administrative expenses', '6269', '各項耗竭及攤提 ', 'various amortization']
            ,
            ['627', '管理及總務費用 ', 'general & administrative expenses', '6271', '外銷損失 ', 'loss on export sales']
            ,
            ['627', '管理及總務費用 ', 'general & administrative expenses', '6272', '伙食費 ', 'meal expenses']
            ,
            ['627', '管理及總務費用 ', 'general & administrative expenses', '6273', '職工福利 ', 'employee benefits/welfare']
            ,
            ['627', '管理及總務費用 ', 'general & administrative expenses', '6274', '研究發展費用 ', 'research and development expense']
            ,
            ['627', '管理及總務費用 ', 'general & administrative expenses', '6275', '佣金支出 ', 'commission expense']
            ,
            ['627', '管理及總務費用 ', 'general & administrative expenses', '6276', '訓練費 ', 'Training expense']
            ,
            ['627', '管理及總務費用 ', 'general & administrative expenses', '6278', '勞務費 ', 'professional service fees']
            ,
            ['628', '管理及總務費用 ', 'general & administrative expenses', '6288', '其他管理及總務費用 ', 'other general and administrative expenses']
            ,
            ['635', '研究及發展費用 ', 'research and development expenses', '6351', '薪資支出 ', 'payroll expense']
            ,
            ['635', '研究及發展費用 ', 'research and development expenses', '6352', '租金支出 ', 'rent expense']
            ,
            ['635', '研究及發展費用 ', 'research and development expenses', '6353', '文具用品 ', 'supplies expense']
            ,
            ['635', '研究及發展費用 ', 'research and development expenses', '6354', '旅費 ', 'travelling expense']
            ,
            ['635', '研究及發展費用 ', 'research and development expenses', '6355', '運費 ', 'shipping expenses']
            ,
            ['635', '研究及發展費用 ', 'research and development expenses', '6356', '郵電費 ', 'postage expenses']
            ,
            ['635', '研究及發展費用 ', 'research and development expenses', '6357', '修繕費 ', 'repair(s) and maintenance (expense)']
            ,
            ['636', '研究及發展費用 ', 'research and development expenses', '6361', '水電瓦斯費 ', 'utilities expense']
            ,
            ['636', '研究及發展費用 ', 'research and development expenses', '6362', '保險費 ', 'insurance expense']
            ,
            ['636', '研究及發展費用 ', 'research and development expenses', '6364', '交際費 ', 'entertainment expense']
            ,
            ['636', '研究及發展費用 ', 'research and development expenses', '6366', '稅捐 ', 'taxes']
            ,
            ['636', '研究及發展費用 ', 'research and development expenses', '6368', '折舊 ', 'depreciation expense']
            ,
            ['636', '研究及發展費用 ', 'research and development expenses', '6369', '各項耗竭及攤提 ', 'various amortization']
            ,
            ['637', '研究及發展費用 ', 'research and development expenses', '6372', '伙食費 ', 'meal expenses']
            ,
            ['637', '研究及發展費用 ', 'research and development expenses', '6373', '職工福利 ', 'employee benefits/welfare']
            ,
            ['637', '研究及發展費用 ', 'research and development expenses', '6376', '訓練費 ', 'Training expense']
            ,
            ['637', '研究及發展費用 ', 'research and development expenses', '6378', '其他研究發展費用 ', 'other research and development expenses']
            ,
            ['711', '利息收入 ', 'interest revenue', '7111', '利息收入 ', 'interest revenue/income']
            ,
            ['715', '兌換利益 ', 'foreign exchange gain', '7151', '兌換利益 ', 'foreign exchange gain']
            ,
            ['716', '處分投資收益 ', 'gain on disposal of investments', '7161', '處分投資收益 ', 'gain on disposal of investments']
            ,
            ['717', '處分資產溢價收入 ', 'gain on disposal of assets', '7171', '處分資產溢價收入 ', 'gain on disposal of assets']
            ,
            ['748', '其他營業外收益 ', 'other non-operating revenue', '7481', '捐贈收入 ', 'donation income']
            ,
            ['748', '其他營業外收益 ', 'other non-operating revenue', '7482', '租金收入 ', 'rent revenue/income']
            ,
            ['748', '其他營業外收益 ', 'other non-operating revenue', '7483', '佣金收入 ', 'commission revenue/income']
            ,
            ['748', '其他營業外收益 ', 'other non-operating revenue', '7484', '出售下腳及廢料收入 ', 'revenue from sale of scraps']
            ,
            ['748', '其他營業外收益 ', 'other non-operating revenue', '7485', '存貨盤盈 ', 'gain on physical inventory']
            ,
            ['748', '其他營業外收益 ', 'other non-operating revenue', '7487', '壞帳轉回利益 ', 'gain on reversal of bad debts']
            ,
            ['748', '其他營業外收益 ', 'other non-operating revenue', '7488', '其他營業外收益－其他 ', 'other non-operating revenue– other items']
            ,
            ['751', '利息費用 ', 'interest expense', '7511', '利息費用 ', 'interest expense']
            ,
            ['753', '投資損失 ', 'investment loss', '7531', '金融資產評價損失 ', 'loss on valuation of financial asset']
            ,
            ['748', '其他營業外收益 ', 'other non-operating revenue', '7485', '存貨盤盈 ', 'gain on physical inventory']
            ,
            ['748', '其他營業外收益 ', 'other non-operating revenue', '7487', '壞帳轉回利益 ', 'gain on reversal of bad debts']
            ,
            ['748', '其他營業外收益 ', 'other non-operating revenue', '7488', '其他營業外收益－其他 ', 'other non-operating revenue– other items']
            ,
            ['751', '利息費用 ', 'interest expense', '7511', '利息費用 ', 'interest expense']
            ,
            ['753', '投資損失 ', 'investment loss', '7531', '金融資產評價損失 ', 'loss on valuation of financial asset']
            ,
            ['753', '投資損失 ', 'investment loss', '7532', '金融負債評價損失 ', 'loss on valuation of financial liability']
            ,
            ['753', '投資損失 ', 'investment loss', '7533', '採權益法認列之投資損失 ', 'investment loss recognized under equity method']
            ,
            ['754', '兌換損失 ', 'foreign exchange loss', '7541', '兌換損失 ', 'foreign exchange loss']
            ,
            ['755', '處分資產損失 ', 'loss on disposal of assets', '7551', '處分資產損失 ', 'loss on disposal of assets']
            ,
            ['756', '處分投資損失 ', 'loss on disposal of investments', '7561', '處分投資損失 ', 'loss on disposal of investments']
            ,
            ['788', '其他營業外費損 ', 'other non-operating expenses', '7881', '停工損失 ', 'loss on work stoppages']
            ,
            ['788', '其他營業外費損 ', 'other non-operating expenses', '7882', '災害損失 ', 'casualty loss']
            ,
            ['788', '其他營業外費損 ', 'other non-operating expenses', '7885', '存貨盤損 ', 'loss on physical inventory']
            ,
            ['788', '其他營業外費損 ', 'other non-operating expenses', '7886', '存貨跌價及呆滯損失 ', 'loss for market price decline and obsolete and slow-moving inventories']
            ,
            ['788', '其他營業外費損 ', 'other non-operating expenses', '7888', '其他營業外費損－其他 ', 'other non-operating expenses– other']
            ,
            ['791', '稅前純益（或純損） ', 'income before tax', '7911', '稅前純益（或純損） ', 'income before tax']
            ,
            ['811', '所得稅費用(或利益) ', 'income tax expense (or benefit)', '8111', '所得稅費用(或利益) ', 'income tax expense (or benefit)']
            ,
            ['821', '稅後純益（或純損） ', 'income after tax', '8211', '稅後純益（或純損） ', 'income after tax']
        ]

        
    });
    account_subjects.xlsx.writeBuffer().then((content) => {
        const link = document.createElement("a");
          const blobData = new Blob([content], {
            type: "application/vnd.ms-excel;charset=utf-8;"
          });
          link.download = '會計科目.xlsx';
          link.href = URL.createObjectURL(blobData);
    });

    
    // sendData(['getAccountDownload', { Acc: account_subjects.xlsx.writeBuffer(), link: link }], ws);
    sendData(['getAccountDownload', { link: account_subjects }], ws);
    //等前端處理
    // return account_subjects.xlsx.writeBuffer();
}

//供應商excel
function excel_supplier() {
    const supplier = new ExcelJS.Workbook();
    const sheet = supplier.addWorksheet('供應商');
    sheet.addTable({
        ref: 'A1',
        columns: [{ name: '供應商代碼' }, { name: '供應商名稱' }],
        rows: [
            ['0001', '小刀測試1'],
            ['0002', '小刀測試2']
        ]
    })
    //等前端處理
    return supplier.xlsx.writeBuffer();
}

//價值標的excel
function excel_target() {
    const value_target = new ExcelJS.Workbook();
    const sheet = value_target.addWorksheet('價值標的');
    sheet.addTable({
        ref: 'A1',
        columns: [{ name: '標的種類(只可填"顧客"、"原料"或"產品")' }, { name: '標的代碼' }, { name: '標的名稱' }],
        rows: [
            ["顧客", 'C001', '小刀測試1'],
            ["原料", 'M001', '小刀測試2'],
            ["產品", 'P001', '小刀測試3']
        ]
    })
    //等前端處理
    // value_target.xlsx.writeBuffer().then((content) => {
    //     const link = document.createElement("a");
    //     const blobData = new Blob([content], {
    //     type: "application/vnd.ms-excel;charset=utf-8;"
    //     });
    //     link.download = '價值標的.xlsx';
    //     link.href = URL.createObjectURL(blobData);
    // });
}

//期初庫存excel
function excel_inventory() {
    const inventory = new ExcelJS.Workbook();
    const sheet = inventory.addWorksheet('期初庫存');
    sheet.addTable({
        ref: 'A1',
        columns: [
            { name: '材料代碼' },
            { name: '材料名稱' },
            { name: '期初數量' },
            { name: '期初單位' },
            { name: '期初單價' },
        ],
        rows: [
            ["M001", '材料1', '30', '瓶', '100'],
            ["M002", '材料2', '40', '包', '50'],
            ["M003", '材料3', '50', '罐', '25'],
        ]
    })
    //等前端處理
    // inventory.xlsx.writeBuffer().then((content) => {
    //     const link = document.createElement("a");
    //     const blobData = new Blob([content], {
    //     type: "application/vnd.ms-excel;charset=utf-8;"
    //     });
    //     link.download = '期初庫存.xlsx';
    //     link.href = URL.createObjectURL(blobData);
    // });

}

function excel_bom() {
    const bom = new ExcelJS.Workbook();
    const sheet = bom.addWorksheet('BOM表設定');
    sheet.addTable({
        ref: 'A1',
        columns: [
            { name: '一階產品代碼' },
            { name: '一階產品名稱' },
            { name: '二階產品代碼' },
            { name: '二階產品名稱' },
            { name: '二階產品使用量(每一單位一階產品)' },
            { name: '三階產品代碼' },
            { name: '三階產品名稱' },
            { name: '三階產品使用量(每一單位二階產品)' },
        ],
        rows: [
            ["P001", "小刀產品1", "P001 - 1", "小刀產品1- 1", "5", "M001", "2"],
            ["P001", "小刀產品1", "P001 - 1", "小刀產品1- 1", "5", "M002", "3"],
            ["P001", "小刀產品1", "P001 - 2", "小刀產品1- 2", "6", "M001", "2"],
            ["P001", "小刀產品1", "P001 - 2", "小刀產品1- 2", "6", "M002", "3"],
            ["P001", "小刀產品1", "P001 - 2", "小刀產品1- 2", "6", "M003", "1"],
        ]
    })
    //等前端處理
    // supplier.xlsx.writeBuffer().then((content) => {
    //     const link = document.createElement("a");
    //     const blobData = new Blob([content], {
    //     type: "application/vnd.ms-excel;charset=utf-8;"
    //     });
    //     link.download = 'BOM表設定.xlsx';
    //     link.href = URL.createObjectURL(blobData);
    // });
}

//m_purchase(大量新增要上傳excel)
function material_excel() {
    const m_purchase = new ExcelJS.Workbook();
    const sheet = m_purchase.addWorksheet('材料採購');
    sheet.addTable({
        ref: 'A1',
        columns: [
            { name: '日期(請符合範例格式yyyy-mm-dd)' },
            { name: '材料代碼' },
            { name: '材料名稱' },
            { name: '採購數量' },
            { name: '採購單位' },
            { name: '採購成本' }
        ],
        rows: [
            ['2023-0809', 'M001', '小刀材料1', '100', '包', '10000'],
            ['2023-0809', 'M002', '小刀材料2', '50', '瓶', '8000'],
            ['2023-0809', 'M003', '小刀材料3', '75', '罐', '9000'],
            ['2023-0809', 'M004', '小刀材料4', '90', '箱', '3600'],
            ['2023-0809', 'M005', '小刀材料5', '100', '箱', '12000']
        ]
    })
    //等前端處理
    // m_purchase.xlsx.writeBuffer().then((content) => {
    //     const link = document.createElement("a");
    //     const blobData = new Blob([content], {
    //     type: "application/vnd.ms-excel;charset=utf-8;"
    //     });
    //     link.download = '材料採購.xlsx';
    //     link.href = URL.createObjectURL(blobData);
    // });
}
//*************************** 

//讀取excel資料(需要前端傳filename)
function read_excel(name) {
    const parseExcel = (filename) => {
        console.log(`Reading file: ${filename}`);

        const excelData = XLSX.readFile(filename, { encoding: "big-5" });

        return Object.keys(excelData.Sheets).map(name => ({
            name,
            data: XLSX.utils.sheet_to_json(excelData.Sheets[name]),
        }));
    };

    let tmp = []
    parseExcel(`${name}.xlsx`).forEach(element => {
        element.data.forEach(item => {
            tmp.push(item);
        });
    });

    let arr = obj_to_dict(tmp)
    // console.log(arr)
    // console.log(arr[0]['third'])
    return (arr)
};

//匯入資料庫
//************************** 

//會計科目
function upload_account_subject(name) {
    let arr = read_excel(name)

    //將column name改成英文
    const updatedArr = arr.map((item) => {
        const updatedItem = {};

        Object.keys(item).forEach((key) => {
            if (key === '三階代碼') {
                updatedItem['third'] = item[key];
            } else if (key === '三階中文名') {
                updatedItem['third_subjects_cn'] = item[key];
            } else if (key === '三階英文名') {
                updatedItem['third_subjects_eng'] = item[key];
            } else if (key === '四階代碼') {
                updatedItem['fourth'] = item[key];
            } else if (key === '四階中文名') {
                updatedItem['fourth_subjects_cn'] = item[key];
            } else if (key === '四階英文名') {
                updatedItem['fourth_subjects_eng'] = item[key];
            } else {
                updatedItem[key] = item[key];
            }
        });
        return updatedItem;
    })

    const stat = 1;
    const user = "test"

    const insertValues = updatedArr.map(element => [
        element.third,
        element.third_subjects_cn,
        element.third_subjects_eng,
        element.fourth,
        element.fourth_subjects_cn,
        element.fourth_subjects_eng,
        stat,
        user
    ]);

    const query = 'INSERT INTO account_subjects (third, third_subjects_cn, third_subjects_eng, fourth, fourth_subjects_cn, fourth_subjects_eng, status, update_user) VALUES ?';
    connection.query(query, [insertValues], (error, results, fields) => {
        if (error) {
            console.error('寫入資料庫錯誤：', error);
            return;//這邊看你們要return什麼給前端
        }
        console.log('已成功將資料寫入資料庫');
    });

}

//供應商
function upload_supplier(name) {
    console.log(name)
    let arr = read_excel(name)

    //將column name改成英文
    const updatedArr = arr.map((item) => {
        const updatedItem = {};

        Object.keys(item).forEach((key) => {
            if (key === '供應商代碼') {
                updatedItem['supplier_num'] = item[key];
            } else if (key === '供應商名稱') {
                updatedItem['supplier_name'] = item[key];
            } else {
                updatedItem[key] = item[key];
            }
        });
        return updatedItem;
    })
    // console.log(updatedArr)

    const update_user = 'test';
    const now = new Date();
    const sqlDatetime = now.toISOString().slice(0, 19).replace('T', ' ');

    const insertValues = updatedArr.map(element => [element.supplier_num, element.supplier_name, update_user, sqlDatetime]);

    const query = 'INSERT INTO supplier (supplier_num, supplier_name, update_user, update_time) VALUES ?';
    connection.query(query, [insertValues], (error, results, fields) => {
        if (error) {
            console.error('寫入資料庫錯誤：', error);
            return;//這邊看你們要return什麼給前端
        }
        console.log('已成功將資料寫入資料庫');
    });

}

//價值標的
function upload_target(name) {
    let arr = read_excel(name)

    //將column name改成英文
    const updatedArr = arr.map((item) => {
        const updatedItem = {};

        Object.keys(item).forEach((key) => {
            if (key === '標的種類(只可填"顧客"、"原料"或"產品")') {
                updatedItem['category'] = item[key];
            } else if (key === '標的代碼') {
                updatedItem['target_num'] = item[key];
            } else if (key === '標的名稱') {
                updatedItem['target_name'] = item[key];
            }
            else {
                updatedItem[key] = item[key];
            }
        });
        return updatedItem;
    })
    // console.log(updatedArr)

    const stat = 1;

    const now = new Date();
    const sqlDatetime = now.toISOString().slice(0, 19).replace('T', ' ');

    const insertValues = updatedArr.map(element => [
        element.category,
        element.target_num,
        element.target_name,
        stat,
        sqlDatetime]);

    const query = 'INSERT INTO value_target (category, target_num, target_name, target_status, update_time) VALUES ?';
    connection.query(query, [insertValues], (error, results, fields) => {
        if (error) {
            console.error('寫入資料庫錯誤：', error);
            return; //這邊看你們要return什麼給前端
        }
        console.log('已成功將資料寫入資料庫');
    });

}

//期初庫存
function upload_inventory(name) {
    let arr = read_excel(name)

    //將column name改成英文
    const updatedArr = arr.map((item) => {
        const updatedItem = {};

        Object.keys(item).forEach((key) => {
            if (key === '材料代碼') {
                updatedItem['m_id'] = item[key];
            } else if (key === '材料名稱') {
                updatedItem['m_name'] = item[key];
            } else if (key === '期初數量') {
                updatedItem['start_quantity'] = item[key];
            } else if (key === '期初單位') {
                updatedItem['start_unit'] = item[key];
            } else if (key === '期初單價') {
                updatedItem['start_unit_price'] = item[key];
            } else {
                updatedItem[key] = item[key];
            }
        });
        return updatedItem;
    })
    // console.log(updatedArr)

    const updatedArrWithCost = updatedArr.map(item => ({
        ...item,
        start_cost: item.start_quantity * item.start_unit_price
    }));

    const myDate = new Date();
    const sqlDate = myDate.toISOString().substring(0, 10);

    const insertValues = updatedArrWithCost.map(element => [
        element.m_id,
        element.m_name,
        element.start_quantity,
        element.start_unit,
        element.start_unit_price,
        element.start_cost,
        sqlDate,
    ]);

    const query = 'INSERT INTO m_inventory_setup (m_id, m_name, start_quantity, start_unit, start_unit_price, start_cost, date) VALUES ?';
    connection.query(query, [insertValues], (error, results, fields) => {
        if (error) {
            console.error('寫入資料庫錯誤：', error);
            return;//這邊看你們要return什麼給前端
        }
        console.log('已成功將資料寫入資料庫');
    });

}

//BOM表設定
function upload_bom(name) {
    let arr = read_excel(name)

    //將column name改成英文
    const updatedArr = arr.map((item) => {
        const updatedItem = {};

        Object.keys(item).forEach((key) => {
            if (key === '一階產品代碼') {
                updatedItem['product_id'] = item[key];
            } else if (key === '一階產品名稱') {
                updatedItem['product_name'] = item[key];
            } else if (key === '二階產品代碼') {
                updatedItem['product_sec_id'] = item[key];
            } else if (key === '二階產品名稱') {
                updatedItem['product_sec_name'] = item[key];
            } else if (key === '二階產品使用量(每一單位一階產品)') {
                updatedItem['sec_use_quantity'] = item[key];
            } else if (key === '三階產品代碼') {
                updatedItem['product_thr_id'] = item[key];
            } else if (key === '三階產品使用量(每一單位二階產品)') {
                updatedItem['thr_use_quantity'] = item[key];
            } else {
                updatedItem[key] = item[key];
            }
        });
        return updatedItem;
    })

    // console.log(updatedArr)

    const myDate = new Date();
    const sqlDate = myDate.toISOString().substring(0, 10);
    const user = "測試人員"

    const insert_first = updatedArr.map(element => [
        element.product_id,
        element.product_name,
        element.product_sec_id,
        element.sec_use_quantity,
        sqlDate,
        user
    ]);

    console.log(insert_first)
    const unique_first = Array.from(new Set(insert_first.map(JSON.stringify)), JSON.parse);

    console.log(unique_first);

    const insert_second = updatedArr.map(element => [
        element.product_id,
        element.product_sec_id,
        element.product_sec_name,
        element.product_thr_id,
        element.thr_use_quantity,
        sqlDate,
        user
    ]);

    const first_query = 'INSERT INTO bom_first (`product_id`, `product_name`, `product_sec_id`, `use_quantity`, `update_user`, `update_time`) VALUES ?';
    const second_query = 'INSERT INTO bom_second ( `product_id`, `product_sec_id`, `product_sec_name`, `material_id`, `use_quantity`, `update_user`, `update_time`) VALUES ?';


    connection.query(first_query, [unique_first], (error, results, fields) => {
        if (error) {
            console.error('寫入資料庫錯誤：', error);
            return;//這邊看你們要return什麼給前端
        }
        console.log('已成功將資料寫入資料庫');
    });

    connection.query(second_query, [insert_second], (error, results, fields) => {
        if (error) {
            console.error('寫入資料庫錯誤：', error);
            return;//這邊看你們要return什麼給前端
        }
        console.log('已成功將資料寫入資料庫');
    });

}

//材料採購匯入
function upload_material(name) {
    let arr = read_excel(name)

    //將column name改成英文
    const updatedArr = arr.map((item) => {
        const updatedItem = {};

        Object.keys(item).forEach((key) => {
            if (key === '日期(請符合範例格式yyyy-mm-dd)') {
                updatedItem['date'] = item[key];
            } else if (key === '材料代碼') {
                updatedItem['purchase_id'] = item[key];
            } else if (key === '材料名稱') {
                updatedItem['purchase_name'] = item[key];
            } else if (key === '採購數量') {
                updatedItem['purchase_quantity'] = item[key];
            } else if (key === '採購單位') {
                updatedItem['purchase_unit'] = item[key];
            } else if (key === '採購成本') {
                updatedItem['purchase_price'] = item[key];
            } else {
                updatedItem[key] = item[key];
            }
        });
        return updatedItem;
    })
    // console.log(updatedArr)

    const insertValues = updatedArr.map(element => [
        element.date,
        element.purchase_id,
        element.purchase_name,
        element.purchase_quantity,
        element.purchase_unit,
        element.purchase_price,
    ]);

    const query = 'INSERT INTO m_purchase (date, purchase_id, purchase_name, purchase_quantity, purchase_unit, purchase_price) VALUES ?';
    connection.query(query, [insertValues], (error, results, fields) => {
        if (error) {
            console.error('寫入資料庫錯誤：', error);
            return;//這邊看你們要return什麼給前端
        }
        console.log('已成功將資料寫入資料庫');
    });

}
//***********************

//呈現會科
function sel_account_subjects() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM account_subjects', (error, results, fields) => {
            if (error) {
                console.error('查詢錯誤：', error);
                reject(error);
            } else {
                let arr = obj_to_dict(results);
                console.log('查詢結果：', arr);
                resolve(arr);
            }
        });
    });
}

//呈現供應商
function sel_supplier() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM supplier', (error, results, fields) => {
            if (error) {
                console.error('查詢錯誤：', error);
                reject(error);
            } else {
                let arr = obj_to_dict(results)
                console.log('查詢結果：', arr);
                resolve(arr);
            }
        });
    });
}

//呈現價值標的
function sel_target() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM value_target', (error, results, fields) => {
            if (error) {
                console.error('查詢錯誤：', error);
                reject(error);
            } else {
                let arr = obj_to_dict(results)
                console.log('查詢結果：', arr);
                resolve(arr);
            }
        });
    })
}

//呈現期初庫存
function sel_inventory() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM m_inventory_setup', (error, results, fields) => {
            if (error) {
                console.error('查詢錯誤：', error);
                reject(error);
            } else {
                let arr = obj_to_dict(results)
                console.log('查詢結果：', arr);
                resolve(arr);
            }
        });
    })
}

// 計算BOM成本&呈現
// 計算BOM成本&呈現
async function calculateProductCost() {
    try {
        const bomFirstData = await getBomFirstData();
        const bomSecondData = await getBomSecondData();
        const mInventorySetupData = await getInventorySetupData();

        // 第一階產品成本
        const productCosts = {};
        // 第二階產品成本
        const productCosts_sec = {};
        // 第三階產品成本
        const productCosts_third = {};

        bomFirstData.forEach((row) => {
            const { product_id, product_name, product_sec_id, use_quantity } = row;
            const productKey = `${product_id}-${product_name}`;
            if (!productCosts[productKey]) {
                productCosts[productKey] = {
                    product_name: product_name,
                    product_cost: 0,
                };
            }

            const bomSecondRows = bomSecondData.filter((bomSecondRow) => bomSecondRow.product_sec_id === product_sec_id);
            bomSecondRows.forEach((bomSecondRow) => {
                const { product_sec_id, product_sec_name, material_id, use_quantity: bomSecondUseQuantity } = bomSecondRow;
                const productKey_sec = `${productKey}:${product_sec_id}-${product_sec_name}`;
                if (!productCosts_sec[productKey_sec]) {
                    productCosts_sec[productKey_sec] = {
                        product_sec_name: product_sec_name,
                        useage: 0,
                        unit_price: 0,
                        total_price: 0,
                    };
                }

                const mInventorySetupRow = mInventorySetupData.find((mInventoryRow) => mInventoryRow.m_id === material_id);
                if (mInventorySetupRow) {
                    const { m_name, start_unit_price } = mInventorySetupRow;
                    productCosts_sec[productKey_sec].useage += bomSecondUseQuantity;
                    productCosts_sec[productKey_sec].unit_price = start_unit_price;
                    productCosts_sec[productKey_sec].total_price += bomSecondUseQuantity * start_unit_price;
                    productCosts[productKey].product_cost += bomSecondUseQuantity * start_unit_price * use_quantity;

                    const productKey_third = `${productKey_sec}-${material_id}`;
                    if (!productCosts_third[productKey_third]) {
                        productCosts_third[productKey_third] = {
                            material_name: m_name,
                            useage: bomSecondUseQuantity,
                            unit_price: start_unit_price,
                            total_price: bomSecondUseQuantity * start_unit_price,
                        };
                    }
                }
            });
        });

        // 最終呈現結果
        console.log(productCosts);
        console.log(productCosts_sec);
        console.log(productCosts_third);

    } catch (error) {
        console.error(error);
    }
}

//供應商新增(data由前端拋來)
function add_supplier(data) {
    connection.query('INSERT INTO supplier SET ?', data, (error, results, fields) => {
        if (error) {
            console.error('查詢錯誤：', error);
        } else {
            let arr = obj_to_dict(results)
            console.log('查詢結果：', arr);
        }
    });
}

//供應商修改(條件、data由前端拋來)
function update_supplier(condition, updatedata) {
    const updateQuery = 'UPDATE supplier SET ? WHERE ?';
    connection.query(updateQuery, [updatedata, condition], (error, results, fields) => {
        if (error) {
            console.error('修改資料庫錯誤：', error);
        } else {
            console.log('已成功修改資料');
        }
    });
}

//供應商刪除(data條件由前端拋來)
function del_supplier(condition) {
    // const con = condition
    const deleteQuery = 'DELETE FROM supplier WHERE ?';
    connection.query(deleteQuery, condition, (error, results, fields) => {
        if (error) {
            console.error('刪除資料庫錯誤：', error);
        } else {
            console.log('已成功刪除資料');
        }
    });
}

//價值標的新增(data由前端拋來)
function add_target(data) {
    connection.query('INSERT INTO value_target SET ?', data, (error, results, fields) => {
        if (error) {
            console.error('查詢錯誤：', error);
        } else {
            let arr = obj_to_dict(results)
            console.log('查詢結果：', arr);
        }
    });
}

//價值標的修改(條件、data由前端傳回來)
function update_target(condition, updatedata) {
    const updateQuery = 'UPDATE value_target SET ? WHERE ?';
    connection.query(updateQuery, [updatedata, condition], (error, results, fields) => {
        if (error) {
            console.error('修改資料庫錯誤：', error);
        } else {
            console.log('已成功修改資料');
        }
    });
}

//價值標的刪除()
function del_target(condition, updatedata) {
    const updateQuery = 'UPDATE value_target SET ? WHERE ?';
    connection.query(updateQuery, [updatedata, condition], (error, results, fields) => {
        if (error) {
            console.error('修改資料庫錯誤：', error);
        } else {
            console.log('已成功修改資料');
        }
    });
}

//期初庫存新增(data由前端傳回來)
function add_inventory(data) {
    connection.query('INSERT INTO m_inventory_setup SET ?', data, (error, results, fields) => {
        if (error) {
            console.error('查詢錯誤：', error);
        } else {
            let arr = obj_to_dict(results)
            console.log('查詢結果：', arr);
        }
    });
}

//期初庫存修改(條件、updatedata(希望是array)由前端傳回來)
function update_inventory(condition, updatedata) {
    const data = updatedata.map(item => ({
        ...item,
        start_cost: item.start_quantity * item.start_unit_price
    }));
    const updateQuery = 'UPDATE m_inventory_setup SET ? WHERE ?';
    connection.query(updateQuery, [data, condition], (error, results, fields) => {
        if (error) {
            console.error('修改資料庫錯誤：', error);
        } else {
            console.log('已成功修改資料');
        }
    });
}

//期初庫存刪除(條件由前端傳回來)
function del_inventory(condition) {
    const deleteQuery = 'DELETE FROM m_inventory_setup WHERE ?';
    connection.query(deleteQuery, condition, (error, results, fields) => {
        if (error) {
            console.error('刪除資料庫錯誤：', error);
        } else {
            console.log('已成功刪除資料');
        }
    });
}

//obj轉dict{}
function obj_to_dict(data) {
    let arr = []
    data.forEach(element => {
        let transformedData = {};
        Object.entries(element).forEach(([key, value]) => {
            transformedData[key.trim()] = typeof value === 'string' ? value.trim() : value;
        });
        arr.push(transformedData)
    })

    return (arr)
}

//取bom_first_id
function getBomFirstData() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM bom_first', (error, results, fields) => {
            if (error) {
                console.error('查詢 bom_first 錯誤：', error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

//取bom_second_id
function getBomSecondData() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM bom_second', (error, results, fields) => {
            if (error) {
                console.error('查詢 bom_second 錯誤：', error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

//取m_invetory_setup
function getInventorySetupData() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM m_inventory_setup', (error, results, fields) => {
            if (error) {
                console.error('查詢 m_inventory_setup 錯誤：', error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

//BOM第一階新增(對應到bom_first table)
function add_bom_first(data) {
    connection.query('INSERT INTO bom_first SET ?', data, (error, results, fields) => {
        if (error) {
            console.error('新增錯誤', error);
        } else {
            // let arr = obj_to_dict(results)
            console.log('新增成功');
        }
    });
}

//BOM第二階新增(對應到bom_second table)
function add_bom_second(data) {
    connection.query('INSERT INTO bom_second SET ?', data, (error, results, fields) => {
        if (error) {
            console.error('新增錯誤', error);
        } else {
            // let arr = obj_to_dict(results)
            console.log('新增成功');
        }
    });

}

//BOM第一階修改(對應到bom_first table)
function update_bom_first(condition, updatedata) {
    const updateQuery = 'UPDATE bom_first SET ? WHERE ?';
    connection.query(updateQuery, [updatedata, condition], (error, results, fields) => {
        if (error) {
            console.error('修改資料庫錯誤：', error);
        } else {
            console.log('已成功修改資料');
        }
    });
}

//BOM第二階修改(對應到bom_second table)
function update_bom_second(condition, updatedata){
    const updateQuery = 'UPDATE bom_second SET ? WHERE ?';
    connection.query(updateQuery, [updatedata, condition], (error, results, fields) => {
        if (error) {
            console.error('修改資料庫錯誤：', error);
        } else {
            console.log('已成功修改資料');
        }
    });
}

//BOM第一階刪除(對應到bom_first table)
function del_bom_first(condition){
    const deleteQuery = 'DELETE FROM bom_first WHERE ?';
    connection.query(deleteQuery, condition, (error, results, fields) => {
        if (error) {
            console.error('刪除資料庫錯誤：', error);
        } else {
            console.log('已成功刪除資料');
        }
    });
}

//BOM第二階刪除(對應到bom_second table)
function del_bom_second(condition){
    const deleteQuery = 'DELETE FROM bom_second WHERE ?';
    connection.query(deleteQuery, condition, (error, results, fields) => {
        if (error) {
            console.error('刪除資料庫錯誤：', error);
        } else {
            console.log('已成功刪除資料');
        }
    });
}


export default {
    onMessage: (ws, wss) => (
        ws.onmessage = async function (byteString) {
            const { data } = byteString
            const [task, payload] = JSON.parse(data)
            console.log(task);
            console.log(payload);
            switch (task) {
                case 'sendVal': {
                    sendValue(payload, ws);
                    break;
                }
                case 'accountDownload': {
                    excel_subjects(payload, ws);
                    break;
                }
            }
        }
    )
}
