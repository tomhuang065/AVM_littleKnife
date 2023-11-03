import express from 'express';
import ExcelJS from "exceljs";
import mysql from 'mysql2';
import bodyParser from "body-parser";
import multer from 'multer';
//import { checkPrime } from 'crypto';
// import { genNumber, getNumber } from '../core/getNumber'
import XLSX from 'xlsx';
import fs from 'fs';

if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// 配置文件上传
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // 保存的路径，备注：需要自己创建
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
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

router.post('/add_purchase', async (req, res) => {
    try {
        const result = await add_product_purchase(JSON.parse(req.body.ID));
        console.log(result)
        res.json(result);
    } catch (error) {
        console.error('發生錯誤：', error);
        res.status(500).send('伺服器發生錯誤');

    }
})
router.get('/sel_transaction', async (req, res) => {
    try {
        const result = await sel_transaction();
        res.json(result);
    } catch (error) {
        console.error('發生錯誤：', error);
        res.status(500).send('伺服器發生錯誤');

    }
});
router.post('/add_material', async(req, res) => {
    try {
        const result = await add_material_purchase(JSON.parse(req.body.ID));
        console.log(result)
        res.json(result);
    } catch (error) {
        console.error('發生錯誤：', error);
        res.status(500).send('伺服器發生錯誤');

    }
})

router.post('/add_user', async (req, res) => {
    try {
        const result = await register(JSON.parse(req.body.ID));
        console.log(result)
        res.json(result);
    } catch (error) {
        console.error('發生錯誤：', error);
        res.status(500).send('伺服器發生錯誤');

    }
});

router.post('/add_bom_first', async (req, res) => {
    try {
        const result = await add_bom_first(JSON.parse(req.body.ID));
        console.log(result)
        res.json(result);
    } catch (error) {
        console.error('發生錯誤：', error);
        res.status(500).send('伺服器發生錯誤');

    }
});

router.post('/add_bom_second', async (req, res) => {
    try {
        const result = await add_bom_second(JSON.parse(req.body.ID));
        console.log(result)
        res.json(result);
    } catch (error) {
        console.error('發生錯誤：', error);
        res.status(500).send('伺服器發生錯誤');
    }
});


router.post('/check_user', async (req, res) => {
    try {
        const task = await login(JSON.parse(req.body.ID));
        let result =[];
        if(task === '成功登入'){
            result = await getUserInfo(JSON.parse(req.body.ID).Account)
            console.log(result)
            res.json({result:result, task:task});
        }
        else{
            res.json({result:result, task:task});
        }
    } catch (error) {
        console.error('發生錯誤：', error);
        res.status(500).send('伺服器發生錯誤');

    }
});

router.post('/reset_user', async (req, res) => {
    try {
        const result = await resetUserInfo(JSON.parse(req.body.ID));
        console.log(result)
        res.json(result);
    } catch (error) {
        console.error('發生錯誤：', error);
        res.status(500).send('伺服器發生錯誤');

    }
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
    res.send('已成功變更會計科目狀態');
});

router.post('/mod_value_target', async (req, res) => {
    const result = await update_value_target(JSON.parse(req.body.ID))
    console.log(result)
    res.send(result);
});

router.post('/mod_transaction', async (req, res) => {
    const result = await update_transaction(JSON.parse(req.body.ID))
    console.log(result)
    res.send(result);
});

router.post('/del_transaction', async (req, res) => {
    const result = await del_transaction(JSON.parse(req.body.ID))
    console.log(result)
    res.send(result);
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

router.get('/sel_value_target_department', async (req, res) => {
    try {
        const result = await sel_value_target("部門");
        res.json(result);
    } catch (error) {
        console.error('發生錯誤：', error);
        res.status(500).send('伺服器發生錯誤');

    }
});
router.post('/add_value_target', async (req, res) => {
    console.log(JSON.parse(req.body.ID))
    const result = await add_value_target(JSON.parse(req.body.ID))
    res.send(result);
});

router.post('/del_value_target', async (req, res) => {
    await del_value_target(JSON.parse(req.body.ID).target_num);
    res.send('已成功刪除價值標的');
});


router.post('/upload_bom', upload.single('excelFile'), (req, res) => {
    try {
        // 確保上傳的檔案存在並處理檔案
        if (!req.file) {
            return res.status(400).json({ error: '未選擇檔案' });
        }
        console.log(req.file.filename);
        const result = upload_bom(req.file.filename);
        //console.log(result);
        


        // 此處可以進一步處理上傳的Excel檔案，例如解析數據等

        res.status(200).json({ message: '上傳成功' });
    } catch (error) {
        console.error('上傳失敗', error);
        res.status(500).json({ error: '上傳失敗' });
    }
});

router.post('/upload_account', upload.single('excelFile'), (req, res) => {
    try {
        // 確保上傳的檔案存在並處理檔案
        if (!req.file) {
            return res.status(400).json({ error: '未選擇檔案' });
        }
        console.log(req.file.filename);
        const result = upload_account_subject(req.file.filename);
        
        res.status(200).json({ message: '上傳成功' });
    } catch (error) {
        console.error('上傳失敗', error);
        res.status(500).json({ error: '上傳失敗' });
    }
});

router.post('/upload_target', upload.single('excelFile'), (req, res) => {
    try {
        // 確保上傳的檔案存在並處理檔案
        if (!req.file) {
            return res.status(400).json({ error: '未選擇檔案' });
        }
        console.log(req.file.filename);
        const result = upload_target(req.file.filename);

        res.status(200).json({ message: '上傳成功' });
    } catch (error) {
        console.error('上傳失敗', error);
        res.status(500).json({ error: '上傳失敗' });
    }
});


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
    await del_supplier(JSON.parse(req.body.ID).supplier_num)
    res.send('已成功刪除供應商');
})

router.post('/update_supplier', async(req, res) => {
    console.log(JSON.parse(req.body.ID))
    const result = await update_supplier(JSON.parse(req.body.ID))
    res.send(result);

});
router.post('/add_supplier', async (req, res) => {
    console.log(JSON.parse(req.body.ID))
    const result = await add_supplier(JSON.parse(req.body.ID))
    res.send(result);
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
    const result = await add_inventory(JSON.parse(req.body.ID))
    res.send(result);
});

router.get('/get_bom', async (req, res) => {
    try {
        const result = await calculateProductCost();
        //console.log('res',result)
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

router.post('/del_bom_first', async (req, res) => {
    // const condition = req.body; // 假設客戶端以 JSON 格式傳送刪除條件
    // del_inventory(condition);
    console.log('req.body.ID',JSON.parse(req.body.ID).product_id)
    console.log(JSON.parse(req.body.ID))    
    await del_bom_first(JSON.parse(req.body.ID).product_id)
    res.send('已成功刪除BOM第一階資料');
});

router.post('/del_bom_second', async (req, res) => {
    // const condition = req.body; // 假設客戶端以 JSON 格式傳送刪除條件
    // del_inventory(condition);
    console.log(JSON.parse(req.body.ID))
    await del_bom_second(JSON.parse(req.body.ID).product_first_id)
    res.send('已成功刪除BOM第二階資料');
});

router.post('/update_bom_first', async(req, res) => {
    console.log(JSON.parse(req.body.ID))
    await update_bom_first(JSON.parse(req.body.ID))
    res.send('已成功修改BOM第一階資料');

});


export default router

//BOM第一階刪除(對應到bom_first table)
function del_bom_first(condition) {
    const deleteQuery = 'UPDATE bom_first SET `status` = 0 WHERE ? ';
    connection.query(deleteQuery, condition, (error, results, fields) => {
        if (error) {
            console.error('刪除資料庫錯誤：', error);
        } else {
            console.log('已成功刪除資料');
        }
    });
}

//BOM第二階刪除(對應到bom_second table)
function del_bom_second(condition) {
    const deleteQuery = 'UPDATE bom_second SET `status` = 0 WHERE ?  ?';
    connection.query(deleteQuery, condition, (error, results, fields) => {
        if (error) {
            console.error('刪除資料庫錯誤：', error);
        } else {
            console.log('已成功刪除資料');
        }
    });
}

function del_bom_third(condition) {
    const deleteQuery = 'UPDATE bom_third SET `status` = 0 WHERE ?  ?';
    connection.query(deleteQuery, condition, (error, results, fields) => {
        if (error) {
            console.error('刪除資料庫錯誤：', error);
        } else {
            console.log('已成功刪除資料');
        }
    });
}

//BOM第一階修改(對應到bom_first table)
function update_bom_first(updatedata) {
    const condition = updatedata.orig;
    const updateQuery = 'UPDATE bom_first SET product_id = ?, product_name = ?, update_user = ?, update_time = ? WHERE product_id = ?';
    connection.query(updateQuery, [updatedata.product_id, updatedata.product_name, updatedata.update_user, updatedata.update_time, condition], (error, results, fields) => {
        if (error) {
            console.error('修改資料庫錯誤：', error);
        } else {
            console.log('已成功修改資料');
            console.log('results', results)
            console.log('product_id', updatedata.product_id)
        }
    });
}

//BOM第一階新增(對應到bom_first table)
async function add_bom_first(data) {
    try {
        console.log('data', data)
        const id = data.product_id;

        // const check = await bom_id_check(id)
        // if (check.length != 0) {
        //     console.log('已有此產品代碼存在，請重新輸入新的產品代碼')
        // } else {
            return new Promise((resolve, reject) => {
                const query = 'INSERT INTO `bom_first`(`product_id`, `product_name`, `update_user`) VALUES (?, ?, ?)'
                connection.query(query, [data.product_id, data.product_name, data.update_user], (error, results, fields) => {
                    if (error) {
                        reject(error)
                    }
                    else {
                        resolve(results)
                    }
                })
            })
        // }
    } catch (error) {
        console.log(error)
    }
}

//BOM第二階新增(對應到bom_second table)
async function add_bom_second(data) {
    try {
        console.log('data', data)
        const id = data.product_first_id;

        // const check = await bom_id_check(id)
        // if (check.length != 0) {
        //     console.log('已有此產品代碼存在，請重新輸入新的產品代碼')
        // } else {
            return new Promise((resolve, reject) => {
                const query = 'INSERT INTO `bom_second`(`product_id`, `product_sec_id`, `product_sec_name`, `use_quantity`,  `update_user`,  `update_time`, `status`) VALUES (?, ?, ?, ?, ?, ? ,1)'
                connection.query(query, [data.product_first_id, data.product_second_id, data.product_second_name, data.product_second_quantity, data.update_user, data.update_time], (error, results, fields) => {
                    if (error) {
                        reject(error)
                    }
                    else {
                        resolve(results)
                    }
                })
            })
        // }
    } catch (error) {
        console.log(error)
    }
}




//BOM一階代碼防呆
function bom_id_check(id) {
    const query = 'SELECT * FROM `bom_first` WHERE `product_id` = ?'
    return new Promise((resolve, reject) => {
        connection.query(query, id, (error, results, fields) => {
            if (error) {
                reject(error)
            }
            else {
                resolve(results)
            }
        })
    })
}


function add_product_purchase(data) {
    console.log(data)    
    const query = 'INSERT INTO `p_purchase`(`date`, `account_subjects_num`,`purchase_id`, `purchase_name`,`purchase_quantity`, `purchase_unit`, `purchase_price`, `supplier_num`,`remark`,`create_user`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'

    connection.query(query, [data.date, data.account_subjects_num, data.purchase_id, data.purchase_name,  data.purchase_quantity, data.purchase_unit, data.purchase_price, data.supplier_num, data.remark, data.create_user], (error, results, fields) => {
        if (error) {
            console.error(error);
        } else {
            // let arr = obj_to_dict(results)
            console.log('新增成功');
        }
    });
}
function add_material_purchase(data) {
    console.log(data)    
    const query = 'INSERT INTO `m_purchase`(`date`, `account_subjects_num`,`purchase_id`, `purchase_name`, `purchase_quantity`, `purchase_unit`, `purchase_price`, `supplier_num`, `remark`,`create_user`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'

    connection.query(query, [data.date, data.account_subjects_num, data.material_id, data.material_name, data.purchase_quantity, data.purchase_unit, data.purchase_price, data.supplier_num, data.remark, data.create_user], (error, results, fields) => {
        if (error) {
            console.error(error);
            return(error);
        } else {
            // let arr = obj_to_dict(results)
            console.log('新增存貨成功');
            return('新增存貨成功');

        }
    });
}

async function login(data) {
    try {
        console.log(data)
        const password = data.Password
        const account = data.Account
        const userinfo = await getUserInfo(account)
        // console.log(userinfo[0)

        if (userinfo.length > 0) {
            if(password === userinfo[0].password){
                console.log('成功登入') 
                return('成功登入')
            }
            else{
                console.log('密碼有誤，請重新輸入')
                return('密碼有誤，請重新輸入')

            }
        } else {
            console.log('無此帳號，請重新輸入')
            return('無此帳號，請重新輸入')
        }
    }
    catch (error) {
        console.log(error)
        return(error)
    }
}

function getUserInfo(data) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM user WHERE `account` = ?', data, (error, results, fields) => {
            if (error) {
                // console.error('帳號有誤：', error);
                reject(error);
            } else {
                // console.log(results)
                resolve(results);
            }
        });
    });
}

async function resetUserInfo(data) {
    console.log("reseting")
    const check_account = await find_account(data.Account)
    const check_old_password = await find_old_password(data.Account)

    if (data.Password !== data.Password2) {
        // console.log('密碼不一致，請重新填寫')
        return('新密碼不一致，請重新填寫')
    } else if (check_account.length === 0) {
        // console.log('帳號已被註冊，請重新填寫')
        return('無此帳號，請重新填寫')
    } else if (data.Password.length < 6) {
            // console.log('密碼長度至少需6位數字，請重新填寫')
            return('新密碼長度至少需6位數字，請重新填寫')
    } else if (check_old_password[0].password === data.Password) {
        // console.log('密碼長度至少需6位數字，請重新填寫')
        return('新密碼不可與舊密碼相同，請重新填寫')
    } else {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE `user` SET `password` = ? WHERE `user`.`account` = ?', [data.Password, data.Account], (error, results, fields) => {
                if (error) {
                    // console.error('帳號有誤：', error);
                    reject(error);
                } else {
                    // console.log(results)
                    resolve("修改成功，請重新登入");
                }
            });
        });
    }
}

function find_account(data) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM user WHERE `account` = ?', data, (error, results, fields) => {
            if (error) {
                // console.error('帳號有誤：', error);
                reject(error);
            } else {
                // console.log(results)
                resolve(results);
            }
        });
    });
}

function find_old_password(data) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM user WHERE `account` = ?', data, (error, results, fields) => {
            if (error) {
                // console.error('帳號有誤：', error);
                reject(error);
            } else {
                // console.log(results)
                resolve(results);
            }
        });
    });
}


function del_supplier(condition) {
    console.log("consition", condition)
    const deleteQuery = 'UPDATE `supplier` SET `status` = ? WHERE `supplier`.`supplier_num` = ?';
    
    
    connection.query(deleteQuery,[2, condition],(error, results, fields) => {
        if (error) {
            console.error('刪除資料庫錯誤：', error);
        } else {
            console.log('已成功刪除資料');
        }
    });
}

function del_transaction(condition) {
    console.log("condition", condition)
    const deleteQuery = 'UPDATE `p_purchase` SET `id` = ? WHERE `p_purchase`.`id` = ?';
    
    
    connection.query(deleteQuery,[0, condition.orig],(error, results, fields) => {
        if (error) {
            console.error('刪除資料庫錯誤：', error);
        } else {
            console.log('已成功刪除交易');
        }
    });
}
function update_transaction(condition) {
    console.log("condition", condition)
    let deleteQuery = 'UPDATE `p_purchase` SET `purchase_id` = ? WHERE `p_purchase`.`id` = ?';
    connection.query(deleteQuery,[condition.purchase_id, condition],(error, results, fields) => {
        if (error) {
            console.error('刪除資料庫錯誤：', error);
        } else {
            console.log('已成功修改交易代碼');
        }
    });

    deleteQuery = 'UPDATE `p_purchase` SET `purchase_name` = ? WHERE `p_purchase`.`id` = ?';
    connection.query(deleteQuery,[condition.purchase_name, condition],(error, results, fields) => {
        if (error) {
            console.error('刪除資料庫錯誤：', error);
        } else {
            console.log('已成功修改交易名稱');
        }
    });
}

function del_value_target(condition) {
    console.log("cond", condition)
    // const deleteQuery = "DELETE FROM `value_target` WHERE `value_target`.`target_num` = ?";
    const deleteQuery ='UPDATE `value_target` SET `target_status` = ? WHERE`value_target`.`target_num` = ?'
    connection.query(deleteQuery,[2, condition],(error, results, fields) => {
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

async function register(data) {
    console.log(data.Username)
    try {
        const username = data.Username
        const account = data.Account
        const password = data.Password
        const password2 = data.Password2
        const email = data.Email
        const permission = 1;
        const status = 1;
        const check_email = await register_indtical_email(email)
        const check_account = await register_indtical_account(account)
        const query = 'INSERT INTO `user`(`username`, `account`, `password`, `email`, `permission`, `status`) VALUES  (?, ?, ?, ?, ?, ?)';

        if (password !== password2) {
            // console.log('密碼不一致，請重新填寫')
            return('密碼不一致，請重新填寫')
        } else if (check_account.length > 0) {
            // console.log('帳號已被註冊，請重新填寫')
            return('帳號已被註冊，請重新填寫')
        } else if (password.length < 6) {
                // console.log('密碼長度至少需6位數字，請重新填寫')
                return('密碼長度至少需6位數字，請重新填寫')
        } else if(!isValidEmail(email)) {
            return('信箱格式錯誤，請重新填寫')
        }
        else {
            return new Promise((resolve, reject) => {
                connection.query(query, [username, account, password, email, permission, status], (error, results, fields) => {
                    if (error) {
                        console.error('註冊錯誤：', error);
                        reject(error);
                    } else {
                        resolve("註冊成功")
                    }
                });
            });
        }
    }
    catch (error) {
        return(error)
    }
}
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

//註冊檢查重複使用者名稱
function register_indtical_email(data) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM user WHERE `email` = ?', data, (error, results, fields) => {
            if (error) {
                // console.error('帳號有誤：', error);
                reject(error);
            } else {
                // console.log(results)
                resolve(results);
            }
        });
    });
}

//註冊檢查重複帳號
function register_indtical_account(data) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM user WHERE `account` = ?', data, (error, results, fields) => {
            if (error) {
                // console.error('帳號有誤：', error);
                reject(error);
            } else {
                // console.log(results)
                resolve(results);
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
                console.log('查詢結果：', arr);
                resolve(arr);
            }
        });
    });
}
function sel_transaction() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM p_purchase', (error, results, fields) => {
            if (error) {
                console.error('查詢錯誤：', error);
                reject(error);
            } else {
                let arr = obj_to_dict(results)
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
                // console.log('查詢結果：', arr);
                resolve(arr);
            }
        });
    });
}
async function add_supplier(data) {
    try {
        const id = '0';
        const status = '1';

        const check_supplier_code = await identical_supplier_num(data.supplier_num)
        const check_supplier_name = await identical_supplier_name(data.supplier_name)

        if (check_supplier_code.length > 0) {
            console.log('供應商代碼重複，請重新填寫')
            return('供應商代碼重複，請重新填寫')
        } else if (check_supplier_name.length > 0) {
                console.log('供應商名稱重複，請重新填寫')
                return('供應商名稱重複，請重新填寫')
        } else {
            return new Promise((resolve, reject) => {
                connection.query('INSERT INTO supplier (`id`, `supplier_name`, `supplier_num`, `update_user`, `update_time`, `status`) VALUES (?, ?, ?, ?, ?, ?)', [id, data.supplier_name, data.supplier_num, data.update_user, data.update_time, status], (error, results, fields) => {
                    if (error) {
                        console.error('新增供應商錯誤：', error);
                        reject(error);
                    } else {
                        console.log("供應商新增成功")
                        resolve("供應商新增成功")
                    }
                });
            });
        }
    }
    catch (error) {
        console.log(error)
        return(error)
    }
}

function identical_supplier_num(data) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM supplier WHERE `supplier_num` = ?', data, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.filter(t => t.status !== 2));
            }
        });
    });
}

function identical_supplier_name(data) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM supplier WHERE `supplier_name` = ?', data, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.filter(t => t.status !== 2));
            }
        });
    });
}


async function add_value_target(data) {

    try {
        const id = '0';
        const status = '1';

        const check_valuetarget_code = await identical_valuetarget_num(data.valueTargetCode)
        const check_valuetarget_name = await identical_valuetarget_name(data.name, data.category)

        if (check_valuetarget_code.length > 0) {
            console.log('價值標的代碼重複，請重新填寫')
            return('價值標的代碼重複，請重新填寫')
        } else if (check_valuetarget_name.length > 0) {
                console.log('價值標的名稱重複，請重新填寫')
                return('價值標的名稱重複，請重新填寫')
        } else {
            return new Promise((resolve, reject) => {
                connection.query('INSERT INTO value_target (`id`, `category`, `target_num`, `target_name`, `target_status`, `update_time`) VALUES (?, ?, ?, ?, ?, ?)', [id, data.category, data.valueTargetCode, data.name, status, data.updateTime], (error, results, fields) => {
                    if (error) {
                        console.error('新增價值標的錯誤：', error);
                        reject(error);
                    } else {
                        console.log("價值標的新增成功")
                        resolve("價值標的新增成功")
                    }
                });
            });
        }
    }
    catch (error) {
        console.log(error)
        return(error)
    }
}


function identical_valuetarget_num(data) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM value_target WHERE `target_num` = ?', data, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.filter(val => val.target_status !== 2));
            }
        });
    });
}

function identical_valuetarget_name(name, category) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM value_target WHERE `target_name` = ? AND category = ?', [name, category], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.filter(val => val.target_status !== 2));
            }
        });
    });
}

//期初庫存新增(data由前端傳回來)
async function add_inventory(data) {
    console.log(data)
    try {
        const id = '0';

        const check_material_code = await identical_material_num(data.productCode)
        const check_material_name = await identical_material_name(data.productName)

        if (check_material_code.length > 0) {
            console.log('原物料代碼重複，請重新填寫')
            return('原物料代碼重複，請重新填寫')
        } else if (check_material_name.length > 0) {
                console.log('原物料名稱重複，請重新填寫')
                return('原物料名稱重複，請重新填寫')
        } else {
            return new Promise((resolve, reject) => {
                connection.query('INSERT INTO m_inventory_setup (`id`, `m_id`, `m_name`, `date`, `start_quantity`, `start_unit`, `start_unit_price`, `start_cost`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [id, data.productCode, data.productName, data.date, data.openingQuantity, data.openingUnit, data.openingUnitPrice, data.openingCost], (error, results, fields) => {
                    if (error) {
                        console.error('新增期初原物料錯誤：', error);
                        reject(error);
                    } else {
                        console.log("期初原物料新增成功")
                        resolve("期初原物料新增成功")
                    }
                });
            });
        }
    }
    catch (error) {
        console.log(error)
        return(error)
    }
}

function identical_material_num(data) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM m_inventory_setup WHERE `m_id` = ?', data, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

function identical_material_name(name) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM m_inventory_setup WHERE `m_name` = ?', name, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}



function del_inventory(condition) {
    console.log(condition)
    const deleteQuery = 'DELETE FROM `m_inventory_setup` WHERE `m_inventory_setup`.`m_id` = ?';
    // const deleteQuery = 'UPDATE `m_inventory_setup` SET `status` = ? WHERE `m_inventory_setup`.`m_id` = ?';

    connection.query(deleteQuery,[2, condition] , (error, results, fields) => {
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

async function update_supplier(updatedata) {
    const condition = updatedata.orig

    const check_supplier_code = await identical_supplier_num(updatedata.supplier_num)
    const check_supplier_name = await identical_supplier_name(updatedata.supplier_name)
    
    let updateQuery = 'UPDATE `supplier` SET status = ? WHERE `supplier`.`supplier_num` = ? AND`supplier`.`status` <> ? ';
    var stat = "1";
    if(updatedata.status ==='1'){
        stat = '0';
    }
    if(updatedata.task === "change_state"){
        connection.query(updateQuery, [stat, condition, 2], (error, results, fields) => {
            if (error) {
                console.error('修改資料庫錯誤：', error);
                return('修改資料庫錯誤：', error)
            } else {
                console.log('已成功修改期初庫存資料');
                return('已成功修改期初庫存資料')
            }
        });
    }
    else if(updatedata.task === "modify"&& updatedata.orig === updatedata.num){
        if (check_supplier_name.length > 0 ) {
            return('供應商名稱重複或與原本相同，請重新填寫')      
        }
        else{
            updateQuery = 'UPDATE `supplier` SET supplier_name = ? WHERE `supplier`.`supplier_num` = ? AND`supplier`.`status` <> ? ';
            connection.query(updateQuery, [updatedata.supplier_name, condition, 2], (error, results, fields) => {
                if (error) {
                    console.error('修改資料庫錯誤：', error);
                    return('修改資料庫錯誤：', error)
                } else {
                    console.log('已成功修改期初庫存資料');
                    return('已成功修改期初庫存資料')
                }
             });
        }
    }
    else
    {
        if (check_supplier_code.length > 0 ) {
            return('供應商代碼重複或與原本相同，請重新填寫')    
            console.log("nulled")  
        }
        else{
            updateQuery = 'UPDATE `supplier` SET supplier_num = ? WHERE `supplier`.`supplier_num` = ? AND`supplier`.`status` <> ?';
            connection.query(updateQuery, [updatedata.supplier_num, condition, 2], (error, results, fields) => {
                if (error) {
                    console.error('修改資料庫錯誤：', error);
                    return('修改資料庫錯誤：', error)
                } else {
                    console.log('已成功修改期初庫存資料');
                    return('已成功修改期初庫存資料')
                }
            });
        }
    }
}

async function update_value_target(updatedata) {
    const condition = updatedata.orig
    console.log(updatedata)
    const check_valuetarget_code = await identical_valuetarget_num(updatedata.target_num)
    const check_valuetarget_name = await identical_valuetarget_name(updatedata.target_name, updatedata.category)
    
    console.log(check_valuetarget_code)
    console.log(check_valuetarget_name)

        let updateQuery = 'UPDATE `value_target` SET target_status = ? WHERE `value_target`.`target_num` = ? AND`value_target`.`target_status` <> ? ';
        var stat = "1";
        if(updatedata.status ==='false'){
            stat = '0';
        }
        if(updatedata.task === "change_state"){

            connection.query(updateQuery, [stat, condition, 2], (error, results, fields) => {
                if (error) {
                    console.error('修改資料庫錯誤：', error);
                        return('已成功修改價值標的狀態')
                } else {
                    console.log('已成功修改資料');
                        return('已成功修改價值標的狀態')
                }
            }
        )}
        else if(updatedata.task === "update_item" && updatedata.orig === updatedata.target_num){
            if (check_valuetarget_name.length > 0) {
                    return('價值標的名稱重複與原本相同，請重新填寫')      
            }
            else{
                updateQuery = 'UPDATE `value_target` SET target_name = ? WHERE `value_target`.`target_num` = ?  AND`value_target`.`target_status` <> ?';
                connection.query(updateQuery, [updatedata.target_name, condition, 2], (error, results, fields) => {
                    if (error) {
                        console.error('修改資料庫錯誤：', error);
                        return(error)
                    } else {
                        console.log('已成功價值標的名稱');
                        return('已成功修改價值標的名稱')
    
                    }
                });
            }

        }
        else{

            if(check_valuetarget_code.length > 0){
                return('價值標的代碼重複或與原本相同，請重新填寫')      
            }
            else{
                updateQuery = 'UPDATE `value_target` SET target_num = ? WHERE `value_target`.`target_num` = ? AND`value_target`.`target_status` <> ?';
                connection.query(updateQuery, [updatedata.target_num, condition, 2], (error, results, fields) => {
                    if (error) {
                        console.error('修改資料庫錯誤：', error);
                        return(error)
    
                    } else {
                        console.log('已成功修改價值標的代碼');
                        return('已成功修改價值標的代碼')
    
                    }
                });
            }
        }
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
                // console.log('查詢結果：', arr);
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

//bom_third_id
function getBomThirdData() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM bom_third', (error, results, fields) => {
            if (error) {
                console.error('查詢 bom_third 錯誤：', error);
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


// 計算BOM成本&呈現
async function calculateProductCost() {
    try {
        const bomFirstData = await getBomFirstData();
        const bomSecondData = await getBomSecondData();
        const bomThirdData = await getBomThirdData();
        const mInventorySetupData = await getInventorySetupData();

        // 第一階產品成本
        const productCosts = {};
        // 第二階產品成本
        const productCosts_sec = {};
        // 第三階產品成本
        const productCosts_third = {};

        bomFirstData.forEach((row) => {
            const { product_id, product_name, status, update_user, update_time } = row;
            const productKey = `${product_id}-${product_name}`;
            if (!productCosts[productKey]) {
                productCosts[productKey] = {
                    product_id: product_id,
                    product_name: product_name,
                    product_cost: 0,
                    status: status,
                    user: update_user,
                    time: update_time,
                    no_third: false
                };
            }

            //二階資料
            const bomSecondRows = bomSecondData.filter((bomSecondRow) => bomSecondRow.product_id === product_id);
            bomSecondRows.forEach((bomSecondRow) => {
                const { product_sec_id, product_sec_name, use_quantity: sec_use_quantity, status: sec_status, update_user: sec_user, update_time: sec_time } = bomSecondRow;
                const productKey_sec = `${productKey}:${product_sec_id}-${product_sec_name}`;
                if (!productCosts_sec[productKey_sec]) {
                    productCosts_sec[productKey_sec] = {
                        no_third: false,
                        prev_level_name: productKey,
                        product_sec_name: product_sec_name,
                        product_sec_id: product_sec_id,
                        useage: 0,
                        unit_price: 0,
                        total_price: 0,
                        status: sec_status,
                        user: sec_user,
                        time: sec_time
                    };
                }

                const bomThirdRows = bomThirdData.filter((bomThirdRow) => bomThirdRow.product_sec_id === product_sec_id);

                //假設有三階
                if (bomThirdRows.length != 0) {
                    bomThirdRows.forEach((bomThirdRow) => {
                        const { material_id, use_quantity: thr_use_quantity, status: thr_status, update_user: thr_user, update_time: thr_time } = bomThirdRow;
                        const mInventorySetupRow = mInventorySetupData.find((mInventoryRow) => mInventoryRow.m_id === material_id);
                        if (mInventorySetupRow) {
                            const { m_name, start_unit_price } = mInventorySetupRow;
                            productCosts_sec[productKey_sec].useage += thr_use_quantity;
                            productCosts_sec[productKey_sec].unit_price += thr_use_quantity * start_unit_price;
                            productCosts_sec[productKey_sec].total_price += thr_use_quantity * start_unit_price * sec_use_quantity;
                            productCosts[productKey].product_cost += thr_use_quantity * start_unit_price * sec_use_quantity;

                            const productKey_third = `${productKey_sec}-${material_id}`;
                            if (!productCosts_third[productKey_third]) {
                                productCosts_third[productKey_third] = {
                                    prev_level_name: productKey_sec,
                                    material_id: material_id,
                                    material_name: m_name,
                                    useage: thr_use_quantity,
                                    unit_price: start_unit_price,
                                    total_price: thr_use_quantity * start_unit_price,
                                    status: thr_status,
                                    update_user: thr_user,
                                    update_time: thr_time
                                };
                            }
                        }
                    })
                } else { //若沒有三階(直接對到原料)
                    let material_id = product_sec_id
                    const mInventorySetupRow = mInventorySetupData.find((mInventoryRow) => mInventoryRow.m_id === material_id);
                    if (mInventorySetupRow) {
                        const { m_name, start_unit_price } = mInventorySetupRow;
                        //直接計算bom一階成本
                        productCosts[productKey].product_cost += start_unit_price * sec_use_quantity;
                        //bom二階成本
                        const productKey_sec = `${productKey}:${product_sec_id}-${m_name}`;
                        productCosts_sec[productKey_sec] = {
                            no_third: true,
                            product_sec_id: product_sec_id,
                            prev_level_name: productKey,
                            product_sec_name: m_name,
                            useage: sec_use_quantity,
                            unit_price: start_unit_price,
                            total_price: sec_use_quantity * start_unit_price,
                            status: sec_status,
                            user: sec_user,
                            time: sec_time
                        };
                        productCosts[productKey].no_third = true;
                    }
                }
            }
            );


        });

        // 最終呈現結果
        console.log(productCosts);
        console.log(productCosts_sec);
        console.log(productCosts_third);

        return {
            productCosts: productCosts,
            productCosts_sec: productCosts_sec,
            productCosts_third: productCosts_third
        }

    } catch (error) {
        console.error(error);
    }
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
    parseExcel(`./uploads/${name}`).forEach(element => {
        element.data.forEach(item => {
            tmp.push(item);
        });
    });

    let arr = obj_to_dict(tmp)
    // console.log(arr)
    // console.log(arr[0]['third'])
    return (arr)
};


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