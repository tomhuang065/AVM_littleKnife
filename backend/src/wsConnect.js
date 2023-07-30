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
    console.log("wsc ready",ws.readyState )
    ws.send(JSON.stringify(data)); 
}
const sendValue =async (payload,ws) => {
    // console.log(payload)
    console.log("111111111111")
    // sendData(['test',payload]);
    connection.query('SELECT * FROM supplier', (err, results) => {
        if(err) throw err;
        console.log(results)
        sendData(['getSupplier',{val:300, sup:results}],ws);
    })
    
    
}

export default {
    onMessage: (ws,wss) => (
        ws.onmessage =async function(byteString) {
            const { data } = byteString
            const [task, payload] = JSON.parse(data)
            console.log(task);
            console.log(payload);
            switch (task) {
                case 'sendVal': {
                    sendValue(payload,ws);
                    break;
                }
            }
        }
    )
}
