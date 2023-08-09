import express from 'express';
import ExcelJS from "exceljs";
import mysql from 'mysql2';
import bodyParser from "body-parser";
// import { genNumber, getNumber } from '../core/getNumber'

const router = express.Router();
// router.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost', // 資料庫主機名稱
    user: 'root', // 資料庫使用者名稱
    password: '', // 資料庫密碼
    database: 'avm_little_knife', // 資料庫名稱
    // database:"AVM"
  });

router.get('/sel_account_subjects', async (req, res) => {
    try {const result = await sel_account_subjects();
        res.json(result);
    } catch (error) {
        console.error('發生錯誤：', error);
        res.status(500).send('伺服器發生錯誤');
    }
});
router.post('/del_account_subjects', async (req, res) => {
    await del_account_subjects(JSON.parse(req.body.ID).content)
    res.send('已成功刪除會計科目資料');
});

router.post('/mod_account_subjects', async (req, res) => {
    await update_account_subjects(JSON.parse(req.body.ID))
    res.send('已成功更新會計科目資料');
});

router.get('/sel_inventory', async (req, res) => {
    try {
        const result = await sel_inventory();
        res.json(result);
    } catch (error) {
        console.error('發生錯誤：', error);
        res.status(500).send('伺服器發生錯誤');

    }
});


export default router

function del_account_subjects(condition) {
    console.log(condition)
    const deleteQuery = "DELETE FROM `account_subjects` WHERE `account_subjects`.`fourth` = ?";
    
    connection.query(deleteQuery,condition,(error, results, fields) => {
        if (error) {
            console.error('刪除資料庫錯誤：', error);
        } else {
            console.log('已成功刪除資料');
        }
    });
}
function sel_account_subjects() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM account_subjects', (error, results, fields) => {
            if (error) {
                console.error('查詢錯誤：', error);
                reject(error);
            } else {
                let arr = obj_to_dict(results);
                // console.log('查詢結果：', arr);
                resolve(arr);
            }
        });
    });
}
function update_account_subjects(updatedata) {
    const condition = updatedata.orig
    let updateQuery = 'UPDATE `account_subjects` SET third = ? WHERE `account_subjects`.`fourth` = ?';
    console.log(updatedata)
    connection.query(updateQuery, [updatedata.third, condition], (error, results, fields) => {
        if (error) {
            console.error('修改資料庫錯誤：', error);
        } else {
            console.log('已成功修改資料');
        }
    });
    updateQuery = 'UPDATE `account_subjects` SET third_subjects_cn = ? WHERE `account_subjects`.`fourth` = ?';
    connection.query(updateQuery, [updatedata.thirdCn, condition], (error, results, fields) => {
        if (error) {
            console.error('修改資料庫錯誤：', error);
        } else {
            console.log('已成功修改資料');
        }
    });
    updateQuery = 'UPDATE `account_subjects` SET third_subjects_eng = ? WHERE `account_subjects`.`fourth` = ?';
    connection.query(updateQuery, [updatedata.thirdEng, condition], (error, results, fields) => {
        if (error) {
            console.error('修改資料庫錯誤：', error);
        } else {
            console.log('已成功修改資料');
        }
    });
    updateQuery = 'UPDATE `account_subjects` SET fourth = ? WHERE `account_subjects`.`fourth` = ?';
    connection.query(updateQuery, [updatedata.fourth, condition], (error, results, fields) => {
        if (error) {
            console.error('修改資料庫錯誤：', error);
        } else {
            console.log('已成功修改資料');
        }
    });
    updateQuery = 'UPDATE `account_subjects` SET fourth_subjects_cn = ? WHERE `account_subjects`.`fourth` = ?';
    connection.query(updateQuery, [updatedata.fourthCn, condition], (error, results, fields) => {
        if (error) {
            console.error('修改資料庫錯誤：', error);
        } else {
            console.log('已成功修改資料');
        }
    });
    updateQuery = 'UPDATE `account_subjects` SET fourth_subjects_eng = ? WHERE `account_subjects`.`fourth` = ?';
    connection.query(updateQuery, [updatedata.fourthEng, condition], (error, results, fields) => {
        if (error) {
            console.error('修改資料庫錯誤：', error);
        } else {
            console.log('已成功修改資料');
        }
    });
}

function sel_inventory() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM p_inventory_setup', (error, results, fields) => {
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



