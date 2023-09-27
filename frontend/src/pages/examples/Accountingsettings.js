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
  const {stat, setStat} = useChat();
  const [searchInd, setSearchInd] = useState("")
  const [filteredResult, setFilteredResult] = useState([]);
  const [deleteInd, setDeleteInd] = useState(false)



  const handleViewDeletion = () =>{
    setDeleteInd(!deleteInd)
  }

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
    const res = await instance.get('/sel_account_subjects')
    setResult(res.data)
    if(searchInd === ''){
      setFilteredResult(res.data)
    }
    if(result !== "undefined"){
      handleSearchIndFilter()
    }
  }

  const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
        alert('請選擇一個Excel檔案');
        return;
    }

    const formData = new FormData();
    formData.append('excelFile', selectedFile);

    
    instance.post('/upload_account', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(function (response) {
        // 處理成功的回應
        alert('上傳成功');
        console.log('上傳成功', response.data);
    })
    .catch(function (error) {
        // 處理錯誤
        alert('上傳失敗，請重新上傳');
        console.error('上傳失敗', error);
    });
};

  const handleSearchIndChange = (e) => {
    setSearchInd(e.target.value)
  };

  const handleSearchIndFilter = () => {
    console.log("searchInd", searchInd)
    var filteredObject = result.map(obj => ({...obj}));
      for(var i = 0; i < filteredObject.length; i++){
        if(!filteredObject[i].third_subjects_cn.includes(searchInd) &&
        !filteredObject[i].third_subjects_cn.includes(searchInd) &&
        !filteredObject[i].fourth_subjects_eng.includes(searchInd)&& 
        !filteredObject[i].fourth_subjects_cn.includes(searchInd)&&
        !String(filteredObject[i].third).includes(searchInd)&&
        !String(filteredObject[i].fourth).includes(searchInd)
        ){
          filteredObject.splice(i, 1)
          i--;
         }
      }
    setFilteredResult(filteredObject)
    console.log(filteredObject)
    // setSearchInd("")
  };
  useEffect(()=>{
    handleViewAccount()
    console.log("called ")
    console.log(filteredResult)
  },[stat])

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
                <div className="d-flex flex-wrap flex-md-nowrap align-items-center py-3">
                  {/* <Button icon={faFileAlt} className="me-2" variant="light" >
                    <FontAwesomeIcon icon={faDownload} className="me-2" />
                    下載
                  </Button> */}
                  
                  <Form className="d-flex me-2" style ={{position: "Absolute", top: 172, right: 7, width:300 }} >
                    <Form.Control
                      type="search"
                      placeholder="搜尋會計科目"
                      className="me-2"
                      aria-label="Search"
                      onChange={handleSearchIndChange}
                      value={searchInd}
                    />
                    {/* <Button variant="primary"className="me-2" onClick={handleSearchIndFilter} style ={{width: 100 }} >搜尋</Button> */}
                  </Form>
                  <Button icon={faFileAlt} className="me-2" variant="primary" onClick={handleViewDeletion}>
                    <FontAwesomeIcon  className="me-2" />{deleteInd?"查看顯示會科":"查看未顯示會科"}
                  </Button>
                  <br></br>
                </div>
               
                <AccountTable accounts={result} search ={searchInd} deleteInd={deleteInd}/>
              </Tab.Pane>
              <Tab.Pane eventKey="upload">
                <div className="d-flex justify-content-center align-items-center mb-3">
                  <Col xs={12} xl={5}>
                    <Form.Group>
                      <Form.Label>上傳excel</Form.Label>
                      <Form.Control type="file" accept=".xlsx,.xls" onChange={handleFileChange} />
                    </Form.Group>
                  </Col>
                </div>
                <div className="d-flex justify-content-center align-items-center mb-3">
                <Col xs={12} xl={5}>
                <Button icon={faFileAlt} id = "download" className="me-2" variant="primary" onClick={onHandleAccountDownload}>
                  <FontAwesomeIcon icon={faDownload} className="me-2" />
                  下載範例
                </Button>
                <Button icon={faFileAlt} className="me-2" variant="primary" onClick={handleUpload}>
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