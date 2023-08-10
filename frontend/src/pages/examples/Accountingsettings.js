import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFileAlt, faUpload } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Form, Tab, Nav } from '@themesberg/react-bootstrap';
import { useChat } from "../../api/context";
import { AccountTable } from "../../components/Tables";
import ExcelJs from "exceljs";
import accRows from "../data/accountData"
import axios from 'axios';
var xlsx = require("xlsx")





export default () => {
  const [excelFile, setExcelFile] = useState(null);
  const instance = axios.create({baseURL:'http://localhost:5000/api/avm'});
  const [result, setResult] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);


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
    setResult(await instance.get('/sel_account_subjects'))
    console.log(result.data)
  }
   
  



  const handleDownload = () =>{
    const workbook = new ExcelJs.Workbook(); // 創建試算表檔案
    const sheet = workbook.addWorksheet('會計科目'); //在檔案中新增工作表 參數放自訂名稱
  
    sheet.addTable({ // 在工作表裡面指定位置、格式並用columsn與rows屬性填寫內容
      // name: 'table名稱',  // 表格內看不到的，讓你之後想要針對這個table去做額外設定的時候，可以指定到這個table
      ref: 'A1', // 從A1開始
      columns: [
        { name: '三階代碼' },
        { name: '三階中文名' },
        { name: '三階英文名' },
        { name: '四階代碼' },
        { name: '四階中文名' },
        { name: '四階英文名' }
    ],
      // rows: accRows,
      rows: [accRows],
    });

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

  const handleExcelUpload = (event) => {
    setSelectedFile(event.target.files[0]);

  };

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

  const handleExceldownload = () => {
    // 在這裡處理下載的邏輯
    // 可以使用表單資料或其他資料來源
  };

  

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-3">
        <h2 className="fw-bold">
          會計科目設定
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
                <Nav.Link eventKey="browse" onClick={handleViewAccount}>瀏覽</Nav.Link>
              </Nav.Item>
              
            </Nav>

            {/* Tab Content */}
            <Tab.Content >
              <Tab.Pane eventKey="browse" >
                  <AccountTable accounts={result.data}/>
              </Tab.Pane>
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