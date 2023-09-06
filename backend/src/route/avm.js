import express from 'express';
import ExcelJS from "exceljs";
import mysql from 'mysql2';
import bodyParser from "body-parser";
import multer from 'multer';
//import { checkPrime } from 'crypto';
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
    await update_value_target(JSON.parse(req.body.ID))
    res.send('已成功變更價值標的狀態');
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
    await del_supplier(JSON.parse(req.body.ID).supplier_num)
    res.send('已成功刪除供應商');
})

router.post('/update_supplier', async(req, res) => {
    console.log(JSON.parse(req.body.ID))
    await update_supplier(JSON.parse(req.body.ID))
    res.send('已成功修改供應商資料');

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
        console.log('res',result)
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
                resolve(results);
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
                resolve(results);
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
                resolve(results);
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
                resolve(results);
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
    if(updatedata.task === "change_state"){
        connection.query(updateQuery, [stat, condition], (error, results, fields) => {
            if (error) {
                console.error('修改資料庫錯誤：', error);
                return('修改資料庫錯誤：', error)
            } else {
                console.log('已成功修改期初庫存資料');
                return('已成功修改期初庫存資料')
            }
        });
    }
    
    updateQuery = 'UPDATE `supplier` SET supplier_num = ? WHERE `supplier`.`supplier_num` = ?';
    connection.query(updateQuery, [updatedata.supplier_num, condition], (error, results, fields) => {
        if (error) {
            console.error('修改資料庫錯誤：', error);
            return('修改資料庫錯誤：', error)
        } else {
            console.log('已成功修改期初庫存資料');
            return('已成功修改期初庫存資料')
        }
    });
    updateQuery = 'UPDATE `supplier` SET supplier_name = ? WHERE `supplier`.`supplier_num` = ?';
    connection.query(updateQuery, [updatedata.supplier_name, condition], (error, results, fields) => {
        if (error) {
            console.error('修改資料庫錯誤：', error);
            return('修改資料庫錯誤：', error)
        } else {
            console.log('已成功修改期初庫存資料');
            return('已成功修改期初庫存資料')
        }
    });
}

function update_value_target(updatedata) {
    const condition = updatedata.orig
    console.log(updatedata)
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
    updateQuery = 'UPDATE `value_target` SET target_num = ? WHERE `value_target`.`target_num` = ?';
    connection.query(updateQuery, [updatedata.target_num, condition], (error, results, fields) => {
        if (error) {
            console.error('修改資料庫錯誤：', error);
        } else {
            console.log('已成功修改資料');
        }
    });
    updateQuery = 'UPDATE `value_target` SET target_name = ? WHERE `value_target`.`target_num` = ?';
    connection.query(updateQuery, [updatedata.target_name, condition], (error, results, fields) => {
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
                        prev_level_name: productKey,
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
                    productCosts_sec[productKey_sec].unit_price = bomSecondUseQuantity * start_unit_price;
                    productCosts_sec[productKey_sec].total_price += bomSecondUseQuantity * start_unit_price * use_quantity;
                    productCosts[productKey].product_cost += bomSecondUseQuantity * start_unit_price * use_quantity;

                    const productKey_third = `${productKey_sec}-${material_id}`;
                    if (!productCosts_third[productKey_third]) {
                        productCosts_third[productKey_third] = {
                            prev_level_name: productKey_sec,
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
        return {
            productCosts: productCosts,
            productCosts_sec: productCosts_sec,
            productCosts_third: productCosts_third
        };

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
