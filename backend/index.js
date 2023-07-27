const ExcelJS = require("exceljs");
const XLSX = require('xlsx');


const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost', // 資料庫主機名稱
  user: 'root', // 資料庫使用者名稱
  password: '', // 資料庫密碼
  // database: 'avm_little_knife', // 資料庫名稱
  database:"AVM"
});

// 測試連線
connection.connect((error) => {
  if (error) {
    console.error('無法連接到資料庫：', error);
  } else {
    console.log('已成功連接到資料庫');
  }
});

// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "CREATE TABLE supplier (supplier_num VARCHAR(255), supplier_name VARCHAR(255))";
//   connection.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   })
// });  

// setTimeout(function(){
//   console.log("Executed after 1 second");
// }, 1000);

//製作Excel表單(會計科目)
function excel_subjects() {
  const account_subjects = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('會計科目');
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

  //等前端處理
  // account_subject.xlsx.writeBuffer().then((content) => {
  //     const link = document.createElement("a");
  //     const blobData = new Blob([content], {
  //     type: "application/vnd.ms-excel;charset=utf-8;"
  //     });
  //     link.download = '會計科目.xlsx';
  //     link.href = URL.createObjectURL(blobData);
  // });
}
//等前端處理
// document.getElementById("downloadBtn").addEventListener("click", excel_subjects);

//供應商excel
function excel_supplier() {
  const supplier = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('供應商');
  sheet.addTable({
    ref: 'A1',
    columns: [{ name: '供應商代碼' }, { name: '供應商名稱' }],
    rows: [
      ['0001', '小刀測試1'],
      ['0002', '小刀測試2']
    ]
  })
  //等前端處理
  // supplier.xlsx.writeBuffer().then((content) => {
  //     const link = document.createElement("a");
  //     const blobData = new Blob([content], {
  //     type: "application/vnd.ms-excel;charset=utf-8;"
  //     });
  //     link.download = '會計科目.xlsx';
  //     link.href = URL.createObjectURL(blobData);
  // });
}

//讀取excel資料(需要前端傳filename)
function read_excel() {
  const parseExcel = (filename) => {

    const excelData = XLSX.readFile(filename, { encoding: "big-5" });

    return Object.keys(excelData.Sheets).map(name => ({
      name,
      data: XLSX.utils.sheet_to_json(excelData.Sheets[name]),
    }));
  };

  let tmp = []
  parseExcel("../供應商.xlsx").forEach(element => {
    element.data.forEach(item => {
      tmp.push(item);
    });
  });

  let arr = obj_to_dict(tmp)
  // console.log(arr)
  // console.log(arr[0]['third'])
  return (arr)
};
// read_excel()

//匯入資料庫(會科)
function upload_account_subject() {
  let arr = read_excel()

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

  arr.forEach(element => {
    connection.query('INSERT INTO account_subjects SET ?', element, (error, results, fields) => {
      if (error) {
        console.error('寫入資料庫錯誤：', error);
        return;
      }
      console.log('已成功將資料寫入資料庫');
    });

  })
}
upload_supplier();
//匯入資料庫(供應商)
function upload_supplier() {
  let arr = read_excel()

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
  });
  // console.log(updatedArr)


  updatedArr.forEach(element => {
    connection.query('INSERT INTO supplier SET ?', element, (error, results, fields) => {
      if (error) {
        console.error('寫入資料庫錯誤：', error);
        return;
      }
      console.log('已成功將資料寫入資料庫');
    });

  })

}

// async function upload(){
//   const num = await create_table();
//   const obj = await upload_supplier();
//   console.log(num, obj)

// }
// upload();


//呈現會科
function sel_account_subjects() {
  connection.query('SELECT * FROM account_subjects', (error, results, fields) => {
    if (error) {
      console.error('查詢錯誤：', error);
    } else {
      let arr = obj_to_dict(results)
      console.log('查詢結果：', arr);
    }
  });
}

//呈現供應商
function sel_supplier() {
  connection.query('SELECT * FROM supplier', (error, results, fields) => {
    if (error) {
      console.error('查詢錯誤：', error);
    } else {
      let arr = obj_to_dict(results)
      console.log('查詢結果：', arr);
    }
  });
}

//供應商新增(data由前端拋來)
function add_supplier() {
  connection.query('INSERT INTO supplier SET ?', data, (error, results, fields) => {
    if (error) {
      console.error('查詢錯誤：', error);
    } else {
      let arr = obj_to_dict(results)
      console.log('查詢結果：', arr);
    }
  });
}

//供應商修改(data由前端拋來)
function set_supplier() {
  connection.query('UPDATE table_name SET column_name = ? WHERE condition_column = ?', [newData, parameter], (error, results, fields) => {
    if (error) {
      console.error('修改錯誤：', error);
    } else {
      console.log('修改成功！');
    }
  });
}

// sel_supplier()

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