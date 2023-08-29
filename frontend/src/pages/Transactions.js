import React from "react";
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



export default () => {
  const {val, setVal, sendValue, signIn, suppliers} = useChat();
  const [resultP, setResultP] = useState([]);
  const [resultC, setResultC] = useState([]);
  const [resultM, setResultM] = useState([]);
  const instance = axios.create({baseURL:'http://localhost:5000/api/avm'});
  const [type, setType] = useState("")
  const [formType, setFormType] = useState("text")
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [salesData, setSalesData] = useState({
    productCode: "",
    productName: "",
    date: moment(new Date()).format('MM/DD/YYYY'),
    openingQuantity: "",
    openingUnit: "",
    openingUnitPrice: "",
    openingCost: "",
    // Add other fields as needed
  });

  const handleSalesChange = (e) => {
    const { name, value } = e.target;
    setSalesData({
      ...salesData,
      [name]: value,
    });
  };
  const handleCurrentDate = (e) => {
    // const { name, value } = e.target;
    setFormType("date");
  };

  const handleCloseValueTargetModal = () => {
    setShowModal(false);
  };

  const handleSaveValueTarget = (ValueTargetData) => {
    // Handle the logic to save the ValueTarget data
    console.log("Value Target Data:", ValueTargetData);
    setShowModal(false);
  };

  const handleViewValueTarget= async (task) => {
    console.log("task", task)
    setShowModal(true);

    switch(task){
      case "原料":{
        setResultM(await instance.get('/sel_value_target_material'));
        setType("原料")
        // console.log(type)
      }
      case "顧客":{
        setResultC(await instance.get('/sel_value_target_customer'));
        setType("顧客")
        // console.log(type)

      }
      case "產品":{
        setResultP(await instance.get('/sel_value_target_product'));
        setType("產品")
        // console.log(type)
      }
      default:{
        break;
      }
    }
    // console.log(resultP);
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
const ValueFormModal = ({ show, onClose, onSave, result }) => {
    const [supplierData, setSupplierData] = useState({
      name: "",
      supplierCode: "", // Updated field name to "供應商代碼"
      // Add other fields as needed
    });
  const Acc =  result.data;
  console.log(Acc)
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setSupplierData({
        ...supplierData,
        [name]: value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(supplierData);
    };
    const TableRow = (props) => {
      const {
        target_num,
        target_name,

      } = props;
  
      return (
        <tr>
          <td>{target_num}</td>
          <td>{target_name}</td>
          <td>
            {/* <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
                <span className="icon icon-sm">
                  <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu> */}
              <Button variant="submit" onClick={onClose}>
                選擇
              </Button>
              {/* </Dropdown.Menu> */}
            {/* </Dropdown> */}
          </td>
        </tr>
      );
    };
  
  
    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>選擇價值標的</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* <Form.Group controlId="supplierName">
              <Form.Label>價值標的名稱</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={supplierData.name}
                onChange={handleChange}
                required
              />
            </Form.Group> */}
            <Table hover className="user-table align-items-center table-striped">
              <thead>
                <tr>
                  <th className="border-bottom">價值標的名稱</th>
                  <th className="border-bottom">價值標的代碼</th>
                </tr>
                
              </thead>
              <tbody>
                {typeof(Acc) === "undefined"?null: Acc.map((t) => (
                  <TableRow key={`transaction-${t.id}`} {...t} />
                ))}
              </tbody>
            </Table>
            <Modal.Footer>
              <Button variant="secondary" onClick={onClose}>
                取消
              </Button>
              <Button type="submit" variant="primary">
                確定
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };

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
              <Nav.Item>
                <Nav.Link eventKey="browse" >瀏覽</Nav.Link>
              </Nav.Item>
            </Nav>

            {/* Tab Content */}
            <Tab.Content >
              <Tab.Pane eventKey="browse" > 
                  {/* <AccountTable accounts={result.data}/> */}
              </Tab.Pane>
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
                    <Form.Group controlId="valueTargetName">
                      <Form.Label>名稱</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        // value={valueTargetData.name}
                        // onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="valueTargetName">
                      <Form.Label>會計科目</Form.Label>
                      <br></br>
                      <Dropdown className = "btn-group dropleft"id = "dropdown-button-drop-start" as={ButtonGroup}>
                        <Dropdown.Toggle as={Button} split variant="link"  className="text-dark m-0 p-0" style ={{color :"red"}}>
                          <Button variant="outline-primary" >選擇三階會計科目代碼</Button>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => { console.log("產品")}}>
                            <FontAwesomeIcon  className="me-2" /> 411 銷貨收入
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => {  console.log("顧客")}}>
                            <FontAwesomeIcon  className="me-2" /> 417 銷貨退回
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => {  console.log("原料")}}>
                            <FontAwesomeIcon  className="me-2" /> 419 銷貨折讓
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => {  console.log("原料")}}>
                            <FontAwesomeIcon  className="me-2" /> 461 勞務收入
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => {  console.log("原料")}}>
                            <FontAwesomeIcon  className="me-2" /> 471 業務收入
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      <div> </div>
                      <Dropdown className = "btn-group dropleft"id = "dropdown-button-drop-start" as={ButtonGroup}>
                        <Dropdown.Toggle as={Button} split variant="link"  className="text-dark m-0 p-0" style ={{color :"red"}}>
                          <Button variant="outline-primary" >選擇四階會計科目代碼</Button>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => { console.log("產品")}}>
                            <FontAwesomeIcon  className="me-2" /> 411 銷貨收入
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => {  console.log("顧客")}}>
                            <FontAwesomeIcon  className="me-2" /> 417 銷貨退回
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => {  console.log("原料")}}>
                            <FontAwesomeIcon  className="me-2" /> 419 銷貨折讓
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => {  console.log("原料")}}>
                            <FontAwesomeIcon  className="me-2" /> 461 勞務收入
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => {  console.log("原料")}}>
                            <FontAwesomeIcon  className="me-2" /> 471 業務收入
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Form.Group>
                    
                    <Form.Group controlId="openingQuantity">
                      <Form.Label>數量</Form.Label>
                      <Form.Control
                        type="number"
                        name="openingQuantity"
                        // value={rawMaterialData.openingQuantity}
                        // onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="openingQuantity">
                      <Form.Label>總價</Form.Label>
                      <Form.Control
                        type="number"
                        name="openingQuantity"
                        // value={rawMaterialData.openingQuantity}
                        // onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="valueTargetCode">
                      <Form.Label>價值標的</Form.Label>
                      <br></br>
                      <Dropdown className = "btn-group dropleft"id = "dropdown-button-drop-start" as={ButtonGroup}>
                        <Dropdown.Toggle as={Button} split variant="link"  className="text-dark m-0 p-0" style ={{color :"red"}}>
                          <Button variant="outline-primary" >選擇價值標的</Button>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => { handleViewValueTarget("產品")}}>
                            <FontAwesomeIcon  className="me-2" /> 產品
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => { handleViewValueTarget("顧客")}}>
                            <FontAwesomeIcon  className="me-2" /> 顧客
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => { handleViewValueTarget("原料")}}>
                            <FontAwesomeIcon  className="me-2" /> 原料
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Form.Group>
                  </Form>
                  <row>
                    <br></br>
                    <Button type="submit" variant="primary">
                      儲存
                    </Button>
                  </row> 
                 <ValueFormModal
                  show={showModal}
                  type={type}
                  result = {resultP}
                  onClose={handleCloseValueTargetModal}
                  onSave={handleSaveValueTarget}
                  
                />
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
     
      {/* onSubmit={handleSubmit} */}
     
    </>
  );
};
