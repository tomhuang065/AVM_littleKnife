import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faCartArrowDown, faChartPie, faChevronDown, faClipboard, faCommentDots, faDownload, faFileAlt, faMagic, faPlus, faRocket, faStore, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, Form, Tab ,Nav } from '@themesberg/react-bootstrap';
import { ValuetargetsTable} from "../../components/ValueTargetCustomerTable";
import { useChat } from "../../api/context";
// import api from "../../api/api";
import ExcelJs from "exceljs";
import axios from "axios";
import ValueTargetFormModal from './ValueTargetFormModal';



export default () => {
  const [excelFile, setExcelFile] = useState(null);
  const [showValueTargetModal, setShowValueTargetModal] = useState(false);
  const [resultP, setResultP] = useState([]);
  const [resultC, setResultC] = useState([]);
  const [resultM, setResultM] = useState([]);
  const [resultD, setResultD] = useState([]);

  const instance = axios.create({baseURL:'http://localhost:5000/api/avm'});
  const [type, setType] = useState("")
  
  const {val, task, setTask, valType, setValType} = useChat();

  const handleExcelUpload = (event) => {
    const file = event.target.files[0];
    setExcelFile(file);
  };

  useEffect(()=>{
    handleViewValueTarget(task)
  },[task])

  useEffect(()=>{
    console.log("get valType changed")
    handleViewValueTarget(valType) //from table, changing status
  },[val, valType])

  const handleExcelUploadSubmit = async () => {
    const formData = new FormData();
  };



  const handleSingleAdd = (task) => {
    console.log(task)
    setType(task)
    setShowValueTargetModal(true);
    
  };

  const handleCloseValueTargetModal = () => {
    setShowValueTargetModal(false);
  };

  const handleSaveValueTarget = (ValueTargetData) => {
    // Handle the logic to save the ValueTarget data
    console.log("Value Target Data:", ValueTargetData);
    setShowValueTargetModal(false);
  };

  const handleExceldownload = async () => {
    const workbook = new ExcelJs.Workbook(); // 創建試算表檔案
    const sheet = workbook.addWorksheet('價值標的'); //在檔案中新增工作表 參數放自訂名稱

		sheet.addTable({ // 在工作表裡面指定位置、格式並用columsn與rows屬性填寫內容
	    name: 'table名稱',  // 表格內看不到的，讓你之後想要針對這個table去做額外設定的時候，可以指定到這個table
	    ref: 'A1', // 從A1開始
	    columns: [{ name: '標的種類(只可填"顧客"、"原料"或"產品")' }, { name: '標的代碼' }, { name: '標的名稱' }],
        rows: [
            ["顧客", 'C001', '小刀測試1'],
            ["原料", 'M001', '小刀測試2'],
            ["產品", 'P001', '小刀測試3']
        ]
		});

	  workbook.xlsx.writeBuffer().then((content) => {
		const link = document.createElement("a");
	    const blobData = new Blob([content], {
	      type: "application/vnd.ms-excel;charset=utf-8;"
	    });
	    link.download = '價值標的.xlsx';
	    link.href = URL.createObjectURL(blobData);
	    link.click();
	  });
      
  }
  const handleViewValueTarget= async (task) => {
    console.log("task", task)
    switch(task){
      case "原料":{
        setResultM(await instance.get('/sel_value_target_material'));
        setType("原料")
      }
      case "顧客":{
        setResultC(await instance.get('/sel_value_target_customer'));
        setType("顧客")
      }
      case "產品":{
        setResultP(await instance.get('/sel_value_target_product'));
        setType("產品")
      }
      case "部門":{
        setResultD(await instance.get('/sel_value_target_department'));
        setType("部門")
      }
      default:{
        break;
      }
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-3">
        <h2 className="fw-bold">
          價值標的設定
        </h2>
      </div>
      <Tab.Container defaultActiveKey="upload">
        <Row>
          <Col xs={12} xl={10}>
            {/* Nav for Tabs */}
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="upload">上傳</Nav.Link>
              </Nav.Item>
              <Nav.Item onClick={() => {handleViewValueTarget("原料")}}>
                <Nav.Link eventKey="ingred">原料</Nav.Link>
              </Nav.Item>
              <Nav.Item onClick={() => {handleViewValueTarget("顧客")}}>
                <Nav.Link eventKey="customer">顧客</Nav.Link>
              </Nav.Item>
              <Nav.Item onClick={() => {handleViewValueTarget("產品")}}>
                <Nav.Link eventKey="product">產品</Nav.Link>
              </Nav.Item>
              <Nav.Item onClick={() => {handleViewValueTarget("部門")}}>
                <Nav.Link eventKey="department">部門</Nav.Link>
              </Nav.Item>
            </Nav>

            {/* Tab Content */}
            <Tab.Content>
              <Tab.Pane eventKey="upload">
                <div className="d-flex justify-content-center align-items-center mb-3">
                  <Col xs={12} xl={5}>
                    <Form.Group>
                      <Form.Label>上傳excel</Form.Label>
                      <Form.Control type="file" accept=".xlsx,.xls" onChange={handleExcelUpload} />
                    </Form.Group>
                  </Col>

                </div>
                <div className="d-flex justify-content-center align-items-center mb-3">
                <Col xs={12} xl={5}>
                <Button icon={faFileAlt} className="me-2" variant="primary" onClick={handleExceldownload}>
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
              <Tab.Pane eventKey="product">
              {/* Browse content here */}
              {/* You can display a table or a list of files here */}
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                {/* 單筆新增按鈕 */}
                <Button icon={faFileAlt} className="me-2" variant="primary" onClick={() => handleSingleAdd("產品")}>
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  單筆新增
                </Button>
              </div>
              <ValuetargetsTable valueTarget={resultP} type ={"產品"}/>
              </Tab.Pane>
              <Tab.Pane eventKey="ingred">
              {/* Browse content here */}
              {/* You can display a table or a list of files here */}
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                {/* 單筆新增按鈕 */}
                <Button icon={faFileAlt} className="me-2" variant="primary" onClick={() => handleSingleAdd("原料")}>
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  單筆新增
                </Button>
              </div>
              <ValuetargetsTable valueTarget={resultM} type ={"原料"}/>
              </Tab.Pane>
              <Tab.Pane eventKey="customer">
              {/* Browse content here */}
              {/* You can display a table or a list of files here */}
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                {/* 單筆新增按鈕 */}
                <Button icon={faFileAlt} className="me-2" variant="primary" onClick={() => handleSingleAdd("顧客")}>
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  單筆新增
                </Button>
              </div>
              <ValuetargetsTable valueTarget={resultC} type ={"顧客"}/>
              </Tab.Pane>
              <Tab.Pane eventKey="department">
              {/* Browse content here */}
              {/* You can display a table or a list of files here */}
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                {/* 單筆新增按鈕 */}
                <Button icon={faFileAlt} className="me-2" variant="primary" onClick={() => handleSingleAdd("部門")}>
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  單筆新增
                </Button>
              </div>
              <ValuetargetsTable valueTarget={resultD} type ={"部門"}/>
              </Tab.Pane>

            </Tab.Content>

          </Col>

        </Row>
      </Tab.Container>

      {/* Supplier Form Modal */}
      <ValueTargetFormModal
        show={showValueTargetModal}
        type={type}
        onClose={handleCloseValueTargetModal}
        onSave={handleSaveValueTarget}
        
      />
    </>
  );
};

