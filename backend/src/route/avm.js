import express from 'express';
import ExcelJS from "exceljs";
import mysql from 'mysql2';
import bodyParser from "body-parser";
import multer from 'multer';
// import { genNumber, getNumber } from '../core/getNumber'

// 配置文件上传
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // 存储上传的文件的目录
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // 使用原始文件名作为存储文件名
    }
  });
  
const upload = multer({ storage });



const router = express.Router();
// router.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost', // 資料庫主機名稱
    port: 3308,
    user: 'root', // 資料庫使用者名稱
    password: '', // 資料庫密碼
    database: 'avm_little_knife', // 資料庫名稱
    // database:"AVM"
  });

router.post('/upload', (req, res) => {
    const data = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ error: 'Invalid data format' });
    }

    const insertValues = data.map(element => [
        element.third,
        element.third_subjects_cn,
        element.third_subjects_eng,
        element.fourth,
        element.fourth_subjects_cn,
        element.fourth_subjects_eng,
        element.status
    ]);

    const query = 'INSERT INTO account_subjects (third, third_subjects_cn, third_subjects_eng, fourth, fourth_subjects_cn, fourth_subjects_eng, status) VALUES ?';
    connection.query(query, [insertValues], (error, results, fields) => {
        if (error) {
            console.error('寫入資料庫錯誤：', error);
            return res.status(500).json({ error: 'Database error' });
        }
        console.log('已成功將資料寫入資料庫');
        return res.status(200).json({ message: 'Data inserted successfully' });
    });
});



router.get('/sel_account_subjects', async (req, res) => {
    try {const result = await sel_account_subjects();
        res.json(result);
    } catch (error) {
        console.error('發生錯誤：', error);
        res.status(500).send('伺服器發生錯誤');
    }
});


router.post('/mod_account_subjects', async (req, res) => {
    await update_account_subjects(JSON.parse(req.body.ID))
    res.send('已成功修改會計科目狀態');
});

router.post('/mod_value_target', async (req, res) => {
    await update_value_target(JSON.parse(req.body.ID))
    res.send('已成功修改價值標的狀態');
});


router.get('/sel_value_target_customer', async (req, res) => {
    try {
        const result = await sel_value_target("顧客");
        res.json(result);
    } catch (error) {
        console.error('發生錯誤：', error);
        res.status(500).send('伺服器發生錯誤');

    }
});
router.get('/sel_value_target_material', async (req, res) => {
    try {
        const result = await sel_value_target("原料");
        res.json(result);
    } catch (error) {
        console.error('發生錯誤：', error);
        res.status(500).send('伺服器發生錯誤');

    }
});
router.get('/sel_value_target_product', async (req, res) => {
    try {
        const result = await sel_value_target("產品");
        res.json(result);
    } catch (error) {
        console.error('發生錯誤：', error);
        res.status(500).send('伺服器發生錯誤');

    }
});

router.post('/add_value_target', async (req, res) => {
    console.log(JSON.parse(req.body.ID))
    await add_value_target(JSON.parse(req.body.ID))
    res.send(JSON.parse(req.body.ID).category);
});

router.post('/del_value_target', async (req, res) => {
    await del_value_target(JSON.parse(req.body.ID).content)
    res.send('已成功刪除價值標的');
})


router.get('/sel_supplier', async (req, res) => {
    try {
        const result = await sel_supplier();
        res.json(result);
    } catch (error) {
        console.error('發生錯誤：', error);
        res.status(500).send('伺服器發生錯誤');

    }
});
router.post('/del_supplier', async (req, res) => {
    await del_supplier(JSON.parse(req.body.ID).content)
    res.send('已成功刪除供應商');
})

router.post('/update_supplier', async(req, res) => {
    console.log(JSON.parse(req.body.ID))
    await update_supplier(JSON.parse(req.body.ID))
    res.send('已成功修改期初庫存資料');

});
router.post('/add_supplier', async (req, res) => {
    console.log(JSON.parse(req.body.ID).supplierCode)
    await add_supplier(JSON.parse(req.body.ID))
    res.send('已成功新增供應商');
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

router.post('/add_inventory', async (req, res) => {
    console.log(JSON.parse(req.body.ID).supplierCode)
    await add_inventory(JSON.parse(req.body.ID))
    res.send('已成功期初庫存');
});

router.get('/get_bom', async (req, res) => {
    try {
        const result = await get_getBomFirstData();
        res.json(result);
    } catch (error) {
        console.error('發生錯誤：', error);
        res.status(500).send('伺服器發生錯誤');

    }
});

// // 期初庫存修改
router.post('/update_inventory', async(req, res) => {
    console.log(JSON.parse(req.body.ID))
    await update_inventory(JSON.parse(req.body.ID))
    res.send('已成功修改期初庫存資料');

});

// 期初庫存刪除
router.post('/del_inventory', async (req, res) => {
    // const condition = req.body; // 假設客戶端以 JSON 格式傳送刪除條件
    // del_inventory(condition);
    console.log(JSON.parse(req.body.ID))
    await del_inventory(JSON.parse(req.body.ID).mid)
    res.send('已成功刪除庫存資料');
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

function del_supplier(condition) {
    console.log(condition)
    const deleteQuery = "DELETE FROM `supplier` WHERE `supplier`.`supplier_num` = ?";
    
    connection.query(deleteQuery,condition,(error, results, fields) => {
        if (error) {
            console.error('刪除資料庫錯誤：', error);
        } else {
            console.log('已成功刪除資料');
        }
    });
}

function del_value_target(condition) {
    console.log(condition)
    const deleteQuery = "DELETE FROM `value_target` WHERE `value_target`.`target_num` = ?";
    
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

function sel_value_target(task) {

    console.log(task)
    const findingQuery = 'SELECT * FROM `value_target` WHERE `value_target`.`category` = ?';
    return new Promise((resolve, reject) => {
        connection.query(findingQuery, task, (error, results, fields) => {
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
function add_supplier(data) {

    const id = '0';
    // console.log(data.productCode);
    const status = '1';
    connection.query('INSERT INTO supplier (`id`, `supplier_name`, `supplier_num`, `update_user`, `update_time`, `status`) VALUES (?, ?, ?, ?, ?, ?)', [id, data.name, data.supplierCode, data.updateUsr, data.updateTime, status], (error, results, fields) => {
        if (error) {
            console.error('查詢錯誤：', error);
        } else {
            console.log("added")
            // let arr = obj_to_dict(results)
            // console.log('查詢結果：', arr);
        }
    });
}

function add_value_target(data) {

    const id = '0';
    const status = '1'
    // console.log(data.productCode);
    connection.query('INSERT INTO value_target (`id`, `category`, `target_num`, `target_name`, `target_status`, `update_time`) VALUES (?, ?, ?, ?, ?, ?)', [id, data.category, data.valueTargetCode, data.name, status, data.updateTime], (error, results, fields) => {
        if (error) {
            console.error('查詢錯誤：', error);
        } else {
            console.log("added")
            // let arr = obj_to_dict(results)
            // console.log('查詢結果：', arr);
        }
    });
}

//期初庫存新增(data由前端傳回來)
function add_inventory(data) {

    const id = '0';
    console.log(data.productCode);
    connection.query('INSERT INTO m_inventory_setup (`id`, `m_id`, `m_name`, `date`, `start_quantity`, `start_unit`, `start_unit_price`, `start_cost`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [id, data.productCode, data.productName, data.date, data.openingQuantity, data.openingUnit, data.openingUnitPrice, data.openingCost], (error, results, fields) => {
        if (error) {
            console.error('查詢錯誤：', error);
        } else {
            console.log("added")
            // let arr = obj_to_dict(results)
            // console.log('查詢結果：', arr);
        }
    });
}
function del_inventory(condition) {
    console.log(condition)
    const deleteQuery = 'DELETE FROM `m_inventory_setup` WHERE `m_inventory_setup`.`m_id` = ?';
    connection.query(deleteQuery, condition, (error, results, fields) => {
        if (error) {
            console.error('刪除資料庫錯誤：', error);
        } else {
            console.log('已成功刪除資料');
        }
    });
}
function update_account_subjects(updatedata) {
    const condition = updatedata.orig
    let updateQuery = 'UPDATE `account_subjects` SET status = ? WHERE `account_subjects`.`fourth` = ?';
    console.log(updatedata)
    var status = "1";
    if(updatedata.status === 'false'){
        status = "0";
    }
    console.log("status",status)
    connection.query(updateQuery, [status, condition], (error, results, fields) => {
        if (error) {
            console.error('修改資料庫錯誤：', error);
        } else {
            console.log('已成功修改資料');
        }
    });
    
}

function update_supplier(updatedata) {
    const condition = updatedata.orig
    
    let updateQuery = 'UPDATE `supplier` SET status = ? WHERE `supplier`.`supplier_num` = ?';
    var stat = "1";
    if(updatedata.status ==='false'){
        stat = '0';
    }
    connection.query(updateQuery, [stat, condition], (error, results, fields) => {
        if (error) {
            console.error('修改資料庫錯誤：', error);
        } else {
            console.log('已成功修改資料');
        }
    });
}

function update_value_target(updatedata) {
    const condition = updatedata.orig
    console.log(condition, " ", updatedata.status)
    let updateQuery = 'UPDATE `value_target` SET target_status = ? WHERE `value_target`.`target_num` = ?';
    var stat = "1";
    if(updatedata.status ==='false'){
        stat = '0';
    }
    connection.query(updateQuery, [stat, condition], (error, results, fields) => {
        if (error) {
            console.error('修改資料庫錯誤：', error);
        } else {
            console.log('已成功修改資料');
        }
    });
}

function update_inventory(updatedata) {
    const condition = updatedata.orig
    console.log(updatedata)
    let updateQuery = 'UPDATE `m_inventory_setup` SET id = ? WHERE `m_inventory_setup`.`id` = ?';
    console.log(updatedata)
    connection.query(updateQuery, [updatedata.id, condition], (error, results, fields) => {
        if (error) {
            console.error('修改資料庫錯誤：', error);
        } else {
            console.log('已成功修改資料');
        }
    });
    updateQuery = 'UPDATE `m_inventory_setup` SET m_id = ? WHERE `m_inventory_setup`.`id` = ?';
    connection.query(updateQuery, [updatedata.mid, condition], (error, results, fields) => {
        if (error) {
            console.error('修改資料庫錯誤：', error);
        } else {
            console.log('已成功修改資料');
        }
    });
    updateQuery = 'UPDATE `m_inventory_setup` SET date = ? WHERE `m_inventory_setup`.`id` = ?';
    connection.query(updateQuery, [updatedata.date, condition], (error, results, fields) => {
        if (error) {
            console.error('修改資料庫錯誤：', error);
        } else {
            console.log('已成功修改資料');
        }
    });
    updateQuery = 'UPDATE `m_inventory_setup` SET m_name = ? WHERE `m_inventory_setup`.`id` = ?';
    connection.query(updateQuery, [updatedata.mname, condition], (error, results, fields) => {
        if (error) {
            console.error('修改資料庫錯誤：', error);
        } else {
            console.log('已成功修改資料');
        }
    });
    updateQuery = 'UPDATE `m_inventory_setup` SET start_quantity = ? WHERE `m_inventory_setup`.`id` = ?';
    connection.query(updateQuery, [updatedata.startQ, condition], (error, results, fields) => {
        if (error) {
            console.error('修改資料庫錯誤：', error);
        } else {
            console.log('已成功修改資料');
        }
    });
    updateQuery = 'UPDATE `m_inventory_setup` SET start_unit = ? WHERE `m_inventory_setup`.`id` = ?';
    connection.query(updateQuery, [updatedata.startU, condition], (error, results, fields) => {
        if (error) {
            console.error('修改資料庫錯誤：', error);
        } else {
            console.log('已成功修改資料');
        }
    });
    updateQuery = 'UPDATE `m_inventory_setup` SET start_unit_price = ? WHERE `m_inventory_setup`.`id` = ?';
    connection.query(updateQuery, [updatedata.startP, condition], (error, results, fields) => {
        if (error) {
            console.error('修改資料庫錯誤：', error);
        } else {
            console.log('已成功修改資料');
        }
    });
    updateQuery = 'UPDATE `m_inventory_setup` SET start_cost = ? WHERE `m_inventory_setup`.`id` = ?';
    connection.query(updateQuery, [updatedata.startC, condition], (error, results, fields) => {
        if (error) {
            console.error('修改資料庫錯誤：', error);
        } else {
            console.log('已成功修改資料');
        }
    });
}
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
