import React, { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFileAlt, faUpload } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Modal,Table, Nav, Tab, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';
import axios from "axios";
import { useChat } from "../api/context";
import accRows from "./data/accountData"
import moment from "moment";
import ExcelJs from "exceljs";
var xlsx = require("xlsx")

// FontAwesome.library.add(faCheckSquare, faCoffee);


export default () => {
  const {val, setVal, sendValue, signIn, userData} = useChat();

  const [valueResult, setValueResult] = useState([]);
  const instance = axios.create({baseURL:'http://localhost:5000/api/avm'});
  const [type, setType] = useState("選擇價值標的種類")
  const [formType, setFormType] = useState("text")
  const [selectedFile, setSelectedFile] = useState(null);
  const [accountResult, setAccountResult] = useState([]);
  const [thirdAccountResult, setThirdAccountResult] = useState([]);
  const [accountThird, setAccountThird] = useState({third :"", thirdCn : "選擇三階會計科目代碼"})
  // const [accountFourth, setAccountFourth] = useState({fourth: "", fourthCn :"選擇四階會計科目代碼"})
  // const [valueTarget, setValueTarget] = useState({tarNum:"", tarName:"選擇價值標的"})
  const [searchInd3, setSearchInd3] = useState("")
  const [searchInd4, setSearchInd4] = useState("")
  const [searchIndV, setSearchIndV] = useState("")
  const [searchIndS, setSearchIndS] = useState("")

  const [supplierResult, setSupplierResult] = useState([]);
  const [salesData, setSalesData] = useState({
    fourthAccountCode: "",
    fourth:"選擇四階會計科目",
    date: moment(new Date()).format('MM/DD/YYYY'),
    quantity: "",
    price: "",
    unit:"",
    comment: "",
    target_num:"",
    target_name:"選擇價值標的",
    supplier_num:"",
    supplier_name:"選擇供應商",
    // user: userData.Username,
    // Add other fields as needed
  });



  const handleSearchInd3Change = (e) => {
    setSearchInd3(e.target.value)
  };
  const handleSearchInd4Change = (e) => {
    setSearchInd4(e.target.value)
  };
  const handleSearchIndVChange = (e) => {
    setSearchIndV(e.target.value)
  };
  const handleSearchIndSChange = (e) => {
    setSearchIndS(e.target.value)
  };

  // const filteredData = data.filter(item => item.age > 25);

  const handleSalesChange = (e) => {
    const { name, value } = e.target;
    setSalesData({
      ...salesData,
      [name]: value,
    });
  };

  const handleViewSupplier= async () => {
    const sup = await instance.get('/sel_supplier')
    setSupplierResult(sup.data);
    console.log(supplierResult);
  }

  const handleClickType= (type) =>{
    setType(type)
    setSalesData({...salesData, target_num:"", target_name:"選擇價值標的"})
  }

  const handleCurrentDate = (e) => {
    setFormType("date");
  };

  const handleViewValueTarget= async () => {
    if(type === "選擇價值標的種類"){
      alert("尚未選擇價值標的種類")
    }
    else{
      switch(type){
        case "原料":{
          const resM = await instance.get('/sel_value_target_material')
          setValueResult(resM.data)
          break;
        }
        case "顧客":{
          const resC = await instance.get('/sel_value_target_customer')
          setValueResult(resC.data)
          break;
        }
        case "產品":{
          const resP = await instance.get('/sel_value_target_product')
          setValueResult(resP.data)
          break;
        }
        case "部門":{
          const resD = await instance.get('/sel_value_target_department')
          setValueResult(resD.data)
          break;
        }
        default:
          break;
        }

    }
    
  }

  const handleExcelUpload = (event) => {
    setSelectedFile(event.target.files[0]);

  };
  const onHandleAccountDownload = async () => {
    const workbook = new ExcelJs.Workbook(); // 創建試算表檔案
    const sheet = workbook.addWorksheet('財會系統'); //在檔案中新增工作表 參數放自訂名稱

		sheet.addTable({ // 在工作表裡面指定位置、格式並用columsn與rows屬性填寫內容
	    name: 'table名稱',  // 表格內看不到的，讓你之後想要針對這個table去做額外設定的時候，可以指定到這個table
	    ref: 'A1', // 從A1開始
	    columns: [{ name: '三階代碼' },
        { name: '三階中文名' },
        { name: '三階英文名' },
        { name: '四階代碼' },
        { name: '四階中文名' },
        { name: '四階英文名' }
    ],
	    rows: accRows,
		});

    // 表格裡面的資料都填寫完成之後，訂出下載的callback function
		// 異步的等待他處理完之後，創建url與連結，觸發下載
	  workbook.xlsx.writeBuffer().then((content) => {
		const link = document.createElement("a");
	    const blobData = new Blob([content], {
	      type: "application/vnd.ms-excel;charset=utf-8;"
	    });
	    link.download = '財會系統.xlsx';
	    link.href = URL.createObjectURL(blobData);
	    link.click();
	  });
      
  }

  const handleViewAccount = async()=>{
    const dat = await instance.get('/sel_account_subjects')
    var account = dat.data[0].third
    if(thirdAccountResult !== []){
      setThirdAccountResult(thirdAccountResult => [...thirdAccountResult, dat.data[0]])
    }
    for(var i = 1; i < dat.data.length; i ++){
      if(dat.data[i].third !== account && thirdAccountResult.length < 1){
        setThirdAccountResult(thirdAccountResult => [...thirdAccountResult,dat.data[i]])
        account = dat.data[i].third
      }
    }
    setAccountResult(dat.data)
    console.log(accountResult)
  }

  const handleExcelUploadSubmit = async () => {
    if (selectedFile) {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(selectedFile);
      fileReader.onload = async (event) => {
        try {
          const { result } = event.target;
          const workbook = xlsx.read(result, { type: "binary" });
          const rows = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
          console.log(rows);
          await instance.post('/upload',rows)
          alert('上傳成功')
        } catch (e) {
          console.log("error", e);
        }
      };
    }
  }

  const checkGetThird =()=>{
    if(accountThird.third === ""){
      alert("請先選擇三階會計科目")
    }
  }

  const ThirdAccountRow = (props) => {
    // console.log(props)
    return (
      <>
          <Dropdown.Item onClick={() => setAccountThird({third : props.third, thirdCn : props.third_subjects_cn})}>
              <div className = "me-2">{props.third} {props.third_subjects_cn}</div>
          </Dropdown.Item>
          {/* <Form className="d-flex me-2"  >
            <Form.Control
              type="search"
              placeholder="搜尋供應商"
              className="me-2"
              aria-label="Search"
              // onChange={handleSearchIndChange}
              // value={searchInd}
            />
          </Form> */}
      </>
      
    );
  }

  const valTar = ["原料", "產品", "顧客", "部門"]

  const handleSalesSubmit = async()=>{
    // console.log(typeof(salesData.price))
    if(salesData.fourth ==="" || salesData.fourthAccountCode === ""){
        alert("尚未選擇會計科目")
    }
    else{
      if(salesData.target_num ===""){
        alert("尚未選擇價值標的")
      }
      else{
        if(salesData.price === ""){
          alert("尚未填寫單價")
        }
        else if(salesData.unit === "" && type === "原料"){
          alert("尚未填寫單位")
        }
        else if(salesData.supplier_num === "" && type === "原料"){
          alert("尚未選擇供應商")
        }
        else if(salesData.quantity === ""){
          alert("尚未填寫數量")
        }
        else if(!Number.isInteger(Number(salesData.quantity)) ||!Number.isInteger(Number(salesData.price)) ){
          alert("數量與單價欄位皆須為數字")
        }
        else if( Number(salesData.quantity) < 0){
          alert("數量不可小於零")
        }
        else{
          // salesData.fourthAccountCode = accountFourth.fourth;

          salesData.price = String(Number(salesData.price)*Number(salesData.quantity))
          // salesData.user = moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          // console.log(userData.Username)
          // console.log(salesData)
          const jsonData = {
            date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            account_subjects_num: `${salesData.fourthAccountCode}`,
            purchase_id: `${salesData.target_num}`,
            purchase_name: `${salesData.target_name}`,
            purchase_quantity: `${salesData.quantity}`,
            purchase_unit: `${salesData.unit}`,
            purchase_price: `${salesData.price}`,
            supplier_num: `${salesData.supplier_num}`,
            // supplier_name: `${salesData.supplier_name}`,
            remark:`${salesData.comment}`,
            create_user:userData.Username,
          };
          console.log(jsonData)
          const response = await instance.post('/add_purchase', {
            ID:JSON.stringify(jsonData)
          })
          console.log(response)
          alert("已新增銷售資料 ")
          setSalesData({
            ...salesData,
            fourthAccountCode: "",
            quantity: "",
            price: "",
            unit:'',
            comment: "",
            target_num:"",
            target_name:"選擇價值標的",
            fourth:"選擇四階會計科目代碼",
            supplier_num:"",
            supplier_name:"選擇供應商",

          });
          setType("選擇價值標的種類")
          setAccountThird({third :"", thirdCn : "選擇三階會計科目代碼"})
          setSearchInd3("")
          setSearchInd4("")
          setSearchIndV("")
          setSearchIndS("")
          // setValueTarget({tarNum:"", tarName:"選擇價值標的"})
        }
      }
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-3">
        <h2 className="fw-bold">
          財會系統
        </h2>
      </div>
      <Tab.Container className = "overflow-auto" style = {{backGroundColor:"red"}}defaultActiveKey="upload">
        <Row>
          <Col xs={20} xl={10}>
            {/* Nav for Tabs */}
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="upload">上傳</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="add" >單筆新增</Nav.Link>
              </Nav.Item>
              {/* <Nav.Item>
                <Nav.Link eventKey="browse" >瀏覽</Nav.Link>
              </Nav.Item> */}
            </Nav>

            {/* Tab Content */}
            <Tab.Content >
              <Tab.Pane eventKey="add" > 
                <Form >
                    <Form.Group controlId="date">
                      <Form.Label>日期</Form.Label>
                      <Form.Control
                        type={formType}
                        name="date"
                        value={salesData.date}
                        placeholder={salesData.date}
                        onChange={handleSalesChange}
                        onClick={handleCurrentDate}
                      />
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="valueTargetName">
                      <Form.Label>會計科目</Form.Label>
                      <br></br>
                      <div>
                        <Dropdown className = "btn-group dropleft"id = "dropdown-button-drop-start" as={ButtonGroup}>
                          <Dropdown.Toggle as={Button} split variant="link"  className="text-dark m-0 p-0" style ={{color :"red"}}>
                            <Button variant="outline-primary" onClick={handleViewAccount}>{accountThird.third} {accountThird.thirdCn}</Button>
                          </Dropdown.Toggle>  
                          <Dropdown.Menu>
                            {thirdAccountResult === []? null:
                            <>
                              <Form className="mx-3 my-2 w-auto"  >
                                <Form.Control
                                  type="search"
                                  placeholder="搜尋三階會科代碼"
                                  className="me-2"
                                  aria-label="Search"
                                  onChange={handleSearchInd3Change}
                                  value={searchInd3}
                                  onClick = {()=> console.log(thirdAccountResult[0].third)}
                                />
                              </Form>
                              {thirdAccountResult.filter((acc) => 
                                    String(acc.third).includes(searchInd3) ||
                                    String(acc.third_subjects_cn).includes(searchInd3)).map(t => <ThirdAccountRow  {...t} />)
                              }
                            </>
                            }
                          </Dropdown.Menu>
                        </Dropdown>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        {accountThird.third === ""?null:
                        <Dropdown className = "btn-group dropleft"id = "dropdown-button-drop-start" as={ButtonGroup}>
                          <Dropdown.Toggle as={Button} split variant="link"  className="text-dark m-0 p-0" style ={{color :"red"}}>
                            <Button variant="outline-primary" onClick={checkGetThird}>{salesData.fourthAccountCode} {salesData.fourth} </Button>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                          {accountResult === []? null : 
                          <>
                            <Form className="mx-3 my-2 w-auto"  >
                              <Form.Control
                                type="search"
                                placeholder="搜尋四階會科代碼"
                                className="me-2"
                                aria-label="Search"
                                onChange={handleSearchInd4Change}
                                value={searchInd4}
                                onClick = {()=> console.log(thirdAccountResult[0].third)}
                              />
                            </Form>
                            {accountResult.filter(account => (account.third===accountThird.third)&&((String(account.fourth).includes(searchInd4))||((String(account.fourth_subjects_cn).includes(searchInd4))))).map(account=> (
                              <Dropdown.Item onClick={()=> setSalesData({...salesData, fourth: account.fourth_subjects_cn, fourthAccountCode : account.fourth})}>
                                  <div className = "me-2">{account.fourth} {account.fourth_subjects_cn}</div>
                              </Dropdown.Item>
                            ))}
                          </>
                          }
                          </Dropdown.Menu>
                        </Dropdown>
                        }
                      </div>
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="openingQuantity">
                      <Form.Label>數量</Form.Label>
                      <Form.Control
                        type="number"
                        name="quantity"
                        value={salesData.quantity}
                        placeholder={salesData.quantity}
                        onChange={handleSalesChange}
                        required
                      />
                    </Form.Group>
                    <br></br>
                    <Form.Group controlId="openingQuantity">
                      <Form.Label>單價</Form.Label>
                      <Form.Control
                        type="number"
                        name="price"
                        value={salesData.price}
                        placeholder={salesData.price}
                        onChange={handleSalesChange}
                        required
                      />
                    </Form.Group>
                 
                    <br></br>
                    <Form.Group controlId="openingQuantity">
                      {((Number(salesData.price)>0)&&(Number(salesData.quantity)>0))?<p style={{fontSize: 18}}><b>總價: {Number(salesData.price)*Number(salesData.quantity)}</b></p>:<p style={{fontSize: 17}}>總價:</p>}
                    </Form.Group>
                    {/* <br></br> */}
                    <Form.Group controlId="valueTargetCode">
                      <Form.Label>價值標的</Form.Label>
                      <br></br>
                      <Dropdown className = "btn-group dropleft"id = "dropdown-button-drop-start" as={ButtonGroup}>
                        <Dropdown.Toggle as={Button} split variant="link"  className="text-dark m-0 p-0" style ={{color :"red"}}>
                          <Button variant="outline-primary" >{type}</Button>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {valTar.map(v => {
                                return (
                                  <Dropdown.Item onClick={()=> handleClickType(v)} >
                                  <div className = "me-2">{v} </div>
                                </Dropdown.Item>
                                )
                              })}
                        </Dropdown.Menu>
                      </Dropdown>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      {type ==="選擇價值標的種類"?
                        null
                        :
                        <Dropdown className = "btn-group dropleft"id = "dropdown-button-drop-start" as={ButtonGroup}>
                          <Dropdown.Toggle as={Button} split variant="link"  className="text-dark m-0 p-0" style ={{color :"red"}}>
                            <Button variant="outline-primary" onClick={handleViewValueTarget} >{salesData.target_num} {salesData.target_name}</Button>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            {typeof(valueResult) ==="undefined"? null : 
                            <>
                              <Form className="mx-3 my-2 w-auto"  >
                                <Form.Control
                                  type="search"
                                  placeholder="搜尋價值標的"
                                  className="me-2"
                                  aria-label="Search"
                                  onChange={handleSearchIndVChange}
                                  value={searchIndV}
                                  // onClick = {()=> console.log(thirdAccountResult[0].third)}
                                />
                              </Form>
                              {valueResult.filter(value => (value.category===type)&&((String(value.target_num).includes(searchIndV))||(String(value.target_name).includes(searchIndV)))).map(value=> (
                                <Dropdown.Item onClick={()=> setSalesData({...salesData, target_num: value.target_num, target_name:value.target_name})}>
                                    <div className = "me-2">{value.target_num} {value.target_name}</div>
                                </Dropdown.Item>
                              ))}
                            </>
                            }
                          </Dropdown.Menu>
                        </Dropdown>
                      }
                    </Form.Group>
                    <br></br>
                    {type === "原料"? 
                    <>
                      <Form.Group controlId="openingQuantity">
                        <Form.Label>單位</Form.Label>
                        <Form.Control
                          type="text"
                          name="unit"
                          value={salesData.unit}
                          placeholder={salesData.unit}
                          onChange={handleSalesChange}
                          required
                        />
                      </Form.Group>
                      <br></br>
                      <Form.Group controlId="valueTargetName">
                        <Form.Label>供應商</Form.Label> 
                        <br></br>
                        <Dropdown className = "btn-group dropleft"id = "dropdown-button-drop-start" as={ButtonGroup}>
                          <Dropdown.Toggle as={Button} split variant="link"  className="text-dark m-0 p-0" style ={{color :"red"}}>
                            <Button variant="outline-primary" onClick={handleViewSupplier}>{salesData.supplier_num} {salesData.supplier_name}</Button>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                          {supplierResult === []? null:
                          <>
                           <Form className="mx-3 my-2 w-auto"  >
                              <Form.Control
                                type="search"
                                placeholder="搜尋供應商"
                                className="me-2"
                                aria-label="Search"
                                onChange={handleSearchIndSChange}
                                value={searchIndS}
                                // onClick = {()=> console.log(thirdAccountResult[0].third)}
                              />
                            </Form>
                            {supplierResult.filter(sup => String(sup.supplier_num).includes(searchIndS)||String(sup.supplier_name).includes(searchIndS)).map(t => 
                              <Dropdown.Item onClick={() => setSalesData({...salesData, supplier_num : t.supplier_num, supplier_name : t.supplier_name})}>
                                  <div className = "me-2">{t.supplier_num} {t.supplier_name}</div>
                              </Dropdown.Item>)}
                          </>
                          }
                          </Dropdown.Menu>
                        </Dropdown>
                      </Form.Group>
                    </>
                      :
                      null}
                   
                    <br></br>

                    <Form.Group controlId="comment">
                      <Form.Label>備註</Form.Label>
                      <Form.Control
                        type="text"
                        name="comment"
                        value={salesData.comment}
                        placeholder={salesData.comment}
                        onChange={handleSalesChange}
                        required
                      />
                    </Form.Group>
                  </Form>
                  <row>
                    <br></br>
                    <Button type="submit" variant="primary" onClick={handleSalesSubmit}>
                      儲存
                    </Button>
                  </row> 
              </Tab.Pane>
              <Tab.Pane eventKey="upload">
                <br></br>
                <div className="d-flex justify-content-center align-items-center mb-3">
                  <Col xs={0} xl={0}>
                    <Form.Group>
                      <Form.Label>上傳excel</Form.Label>
                      <Form.Control type="file" accept=".xlsx,.xls" onChange={handleExcelUpload} />
                    </Form.Group>
                  </Col>
                </div>
                <div className="d-flex justify-content-center align-items-center mb-3">
                <Col xs={0} xl={0}>
                <Button icon={faFileAlt} id = "download" className="me-2" variant="primary" onClick={onHandleAccountDownload}>
                  <FontAwesomeIcon icon={faDownload} className="me-2" />
                  下載範例
                </Button>
                <Button icon={faFileAlt} className="me-2" variant="primary" onClick={handleExcelUploadSubmit}>
                    <FontAwesomeIcon icon={faUpload} className="me-2" />
                    上傳
                </Button>
                </Col>
                </div>
              </Tab.Pane>
              {/* <Tab.Pane eventKey="browse" >
                <div className="d-flex flex-wrap flex-md-nowrap align-items-center py-3">
瀏覽
                </div>
               
              </Tab.Pane> */}
              
            </Tab.Content >
          </Col>
        </Row>
      </Tab.Container>
     
    </>
  );
};
