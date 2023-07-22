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

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE supplier (supplier_num VARCHAR(255), supplier_name VARCHAR(255))";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });