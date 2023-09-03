import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFileAlt,  faPlus,  faUpload } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Form , Tab ,Nav } from '@themesberg/react-bootstrap';
import { SupplierTable } from "../../components/SupplierTable";
// import api from "../../api/api";
import ExcelJs from "exceljs";
import SupplierFormModal from './SupplierFormModal';
import { useChat } from "../../api/context";



export default () => {
  const [excelFile, setExcelFile] = useState(null);
  const {sup, setSup} = useChat();
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [result, setResult] = useState("")
  const instance = axios.create({baseURL:'http://localhost:5000/api/avm'});
  const [searchInd, setSearchInd] = useState("")



  const handleSearchIndChange = (e) => {
    setSearchInd(e.target.value)
  };

  const handleExcelUpload = (event) => {
    const file = event.target.files[0];
    setExcelFile(file);
  };

  const handleExcelUploadSubmit = async () => {
    const formData = new FormData();
  };

  const handleExceldownload = async () => {
    const workbook = new ExcelJs.Workbook(); // 創建試算表檔案
    const sheet = workbook.addWorksheet('供應商'); //在檔案中新增工作表 參數放自訂名稱

		sheet.addTable({ // 在工作表裡面指定位置、格式並用columsn與rows屬性填寫內容
	    name: 'table名稱',  // 表格內看不到的，讓你之後想要針對這個table去做額外設定的時候，可以指定到這個table
	    ref: 'A1', // 從A1開始
	    columns: [{ name: '供應商代碼' }, { name: '供應商名稱' }],
        rows: [
            ['0001', '小刀測試1'],
            ['0002', '小刀測試2']
        ]
		});

    // 表格裡面的資料都填寫完成之後，訂出下載的callback function
		// 異步的等待他處理完之後，創建url與連結，觸發下載
	  workbook.xlsx.writeBuffer().then((content) => {
		const link = document.createElement("a");
	    const blobData = new Blob([content], {
	      type: "application/vnd.ms-excel;charset=utf-8;"
	    });
	    link.download = '供應商.xlsx';
	    link.href = URL.createObjectURL(blobData);
	    link.click();
	  });
      
  }


  const handleSingleAdd = () => {
    setShowSupplierModal(true);
  };

  const handleCloseSupplierModal = () => {
    setShowSupplierModal(false);
  };

  const handleSaveSupplier = (supplierData) => {
    console.log("Supplier Data:", supplierData);
    setShowSupplierModal(false);
  };
  const handleViewSupplier= async () => {

    setResult(await instance.get('/sel_supplier'));
    console.log(result);
  }

  useEffect(()=>{
      handleViewSupplier()
      setSup(null)
  },[sup])



  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-3">
        <h2 className="fw-bold">
          供應商基本資料設定
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
              <Nav.Item onClick={handleViewSupplier}>
                <Nav.Link eventKey="browse">瀏覽</Nav.Link>
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

              <Tab.Pane eventKey="browse">
              {/* Browse content here */}
              {/* You can display a table or a list of files here */}
              <div className="d-flex flex-wrap flex-md-nowrap align-items-center py-3">
                <Form className="d-flex me-2" style ={{position: "Absolute", top: 170, right: 7, width:300 }} >
                  <Form.Control
                    type="search"
                    placeholder="搜尋供應商"
                    className="me-2"
                    aria-label="Search"
                    onChange={handleSearchIndChange}
                    value={searchInd}
                  />
                </Form>
                <Button icon={faFileAlt} className="me-2" variant="primary" onClick={handleSingleAdd}>
                  <FontAwesomeIcon icon={faPlus} className="me-2" />單筆新增
                </Button>
                <br></br>
              </div>
              <SupplierTable supplier = {result.data} searchInd={searchInd} />
            </Tab.Pane>
            </Tab.Content>
          </Col>

        </Row>
      </Tab.Container>

      {/* Supplier Form Modal */}
      <SupplierFormModal
        show={showSupplierModal}
        onClose={handleCloseSupplierModal}
        onSave={handleSaveSupplier}
      />
    </>
  );
};

 
