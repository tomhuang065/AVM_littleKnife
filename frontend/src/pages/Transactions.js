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
  const {val, setVal, sendValue, signIn, suppliers} = useChat();

  const [valueResult, setValueResult] = useState([]);
  const instance = axios.create({baseURL:'http://localhost:5000/api/avm'});
  const [type, setType] = useState("選擇價值標種類")
  const [formType, setFormType] = useState("text")
  const [selectedFile, setSelectedFile] = useState(null);
  const [accountResult, setAccountResult] = useState([]);
  const [thirdAccountResult, setThirdAccountResult] = useState([]);
  const [accountThird, setAccountThird] = useState({third :"", thirdCn : "選擇三階會計科目代碼"})
  const [accountFourth, setAccountFourth] = useState({fourth: "", fourthCn :"選擇四階會計科目代碼"})
  const [valueTarget, setValueTarget] = useState({tarNum:"", tarName:"選擇價值標的"})

  const [salesData, setSalesData] = useState({
    fourthAccountCode: "",
    date: moment(new Date()).format('MM/DD/YYYY'),
    quantity: "",
    price: "",
    comment: "",
    valueTarget:"",
    // Add other fields as needed
  });

  // const filteredData = data.filter(item => item.age > 25);

  const handleSalesChange = (e) => {
    const { name, value } = e.target;
    setSalesData({
      ...salesData,
      [name]: value,
    });
  };
  const handleCurrentDate = (e) => {
    setFormType("date");
  };

  const handleViewValueTarget= async () => {
    setValueResult([])
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
      default:
        break;
    }
  }

  const handleExcelUpload = (event) => {
    setSelectedFile(event.target.files[0]);

  };
  const onHandleAccountDownload = async () => {
    const workbook = new ExcelJs.Workbook(); // 創建試算表檔案
    const sheet = workbook.addWorksheet('會計科目'); //在檔案中新增工作表 參數放自訂名稱

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
	    link.download = '會計科目.xlsx';
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

  const ThirdAccountRow = (props) => {
    // console.log(props)
    return (
      <>
          <Dropdown.Item onClick={() => setAccountThird({third : props.third, thirdCn : props.third_subjects_cn})}>
              <div className = "me-2">{props.third} {props.third_subjects_cn}</div>
          </Dropdown.Item>
      </>
      
    );
  }

  const valTar = ["原料", "產品", "顧客"]

  const handleSalesSubmit = ()=>{
    // console.log(typeof(salesData.price))
    if(accountFourth.fourth ===""){
        alert("會計科目尚未填寫")
    }
    else{
      if(valueTarget.valNum ===""){
        alert("會計科目尚未填寫")
      }
      else{
        if(Number(salesData.price) < 0 || Number(salesData.quantity) < 0){
          alert("數量或單價不可為零")
        }
        else{
          salesData.fourthAccountCode = accountFourth.fourth;
          salesData.valueTarget = valueTarget.valNum;
          alert("已新增銷售資料 : ")
          console.log(salesData)
          setSalesData({
            fourthAccountCode: "",
            date: moment(new Date()).format('MM/DD/YYYY'),
            quantity: "",
            price: "",
            comment: "",
            valueTarget:"",
          });
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
              {/* <Tab.Pane eventKey="browse" > 
                  <AccountTable accounts={result.data}/>
              </Tab.Pane> */}
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
                            {thirdAccountResult === []? null:thirdAccountResult.map(t => <ThirdAccountRow  {...t} />)}
                          </Dropdown.Menu>
                        </Dropdown>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Dropdown className = "btn-group dropleft"id = "dropdown-button-drop-start" as={ButtonGroup}>
                          <Dropdown.Toggle as={Button} split variant="link"  className="text-dark m-0 p-0" style ={{color :"red"}}>
                            <Button variant="outline-primary">{accountFourth.fourth} {accountFourth.fourthCn} </Button>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                          {accountResult === []? null : accountResult.filter(account => account.third===accountThird.third).map(account=> (
                            <Dropdown.Item onClick={()=> setAccountFourth({fourth: account.fourth, fourthCn:account.fourth_subjects_cn})}>
                                <div className = "me-2">{account.fourth} {account.fourth_subjects_cn}</div>
                            </Dropdown.Item>
                          ))}
                          </Dropdown.Menu>
                        </Dropdown>
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
                    
                    <Form.Group controlId="openingQuantity">
                      {((Number(salesData.price)>0)&&(Number(salesData.quantity)>0))?<div>總價: {Number(salesData.price)*Number(salesData.quantity)}</div>:<div>總價:</div  >}
                    </Form.Group>
                    <br></br>
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
                                  <Dropdown.Item onClick={()=> setType(v)} >
                                  <div className = "me-2">{v} </div>
                                </Dropdown.Item>
                                )
                              })}
                        </Dropdown.Menu>
                      </Dropdown>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <Dropdown className = "btn-group dropleft"id = "dropdown-button-drop-start" as={ButtonGroup}>
                        <Dropdown.Toggle as={Button} split variant="link"  className="text-dark m-0 p-0" style ={{color :"red"}}>
                          <Button variant="outline-primary" onClick={handleViewValueTarget} >{valueTarget.tarNum} {valueTarget.tarName}</Button>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {typeof(valueResult) ==="undefined"? null : valueResult.filter(value => value.category===type).map(value=> (
                            <Dropdown.Item onClick={()=> setValueTarget({tarNum: value.target_num, tarName:value.target_name})}>
                                <div className = "me-2">{value.target_num} {value.target_name}</div>
                            </Dropdown.Item>
                          ))}
                          {/* {valueResult} */}
                        </Dropdown.Menu>
                      </Dropdown>

                    </Form.Group>
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
              
            </Tab.Content >
          </Col>
        </Row>
      </Tab.Container>
     
    </>
  );
};
