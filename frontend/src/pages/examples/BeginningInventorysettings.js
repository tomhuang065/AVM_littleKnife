import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFileAlt, faMagic, faPlus, faRocket, faSearch, faStore, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, Form, Tab ,Nav } from '@themesberg/react-bootstrap';
import { RawMaterialInventoryTable } from "../../components/InventoryTable";
// import api from "../../api/api";
import RawMaterialFormModal from "./BeginningInventoryAddForm";
import ExcelJs from "exceljs";
import axios from "axios";
import { useChat } from "../../api/context";



export default () => {
  const [excelFile, setExcelFile] = useState(null);
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const instance = axios.create({baseURL:'http://localhost:5000/api/avm'});
  const [result, setResult] = useState([]);
  const [filteredResult, setFilteredResult] = useState([]);
  const [searchInd, setSearchInd] = useState("")
  const {mat, setMat} = useChat();
  const [deleteInd, setDeleteInd] = useState(false)


  const handleViewDeletion = () =>{
    setDeleteInd(!deleteInd)
  }
  const handleExcelUpload = (event) => {
    const file = event.target.files[0];
    setExcelFile(file);
  };

  const handleExcelUploadSubmit = async () => {
    const formData = new FormData();

  };

  const handleExceldownload = async () => {
    const workbook = new ExcelJs.Workbook(); // 創建試算表檔案
    const sheet = workbook.addWorksheet('期初庫存'); //在檔案中新增工作表 參數放自訂名稱

		sheet.addTable({ // 在工作表裡面指定位置、格式並用columsn與rows屬性填寫內容
	    name: 'table名稱',  // 表格內看不到的，讓你之後想要針對這個table去做額外設定的時候，可以指定到這個table
	    ref: 'A1', // 從A1開始
	    columns: [
        { name: '材料代碼' },
        { name: '材料名稱' },
        { name: '期初數量' },
        { name: '期初單位' },
        { name: '期初單價' },
    ],
    rows: [
        ["M001", '材料1', '30', '瓶', '100'],
        ["M002", '材料2', '40', '包', '50'],
        ["M003", '材料3', '50', '罐', '25'],
    ]
		});

    // 表格裡面的資料都填寫完成之後，訂出下載的callback function
		// 異步的等待他處理完之後，創建url與連結，觸發下載
	  workbook.xlsx.writeBuffer().then((content) => {
		const link = document.createElement("a");
	    const blobData = new Blob([content], {
	      type: "application/vnd.ms-excel;charset=utf-8;"
	    });
	    link.download = '期初庫存.xlsx';
	    link.href = URL.createObjectURL(blobData);
	    link.click();
	  });
      
  }


  const [showModal, setShowModal] = useState(false);

  // Function to open the modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleViewInventory = async () => {
    setResult(await instance.get('/sel_inventory'));
    setFilteredResult(result.data)
    console.log(result.data);
  }

  const handleSearchIndChange = (e) => {
    setSearchInd(e.target.value)
  };

  useEffect(()=>{
    handleViewInventory()
  },[mat])

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-3">
        <h2 className="fw-bold">
          原物料期初庫存設定
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
              <Nav.Item>
                <Nav.Link eventKey="browse" onClick={handleViewInventory}>瀏覽</Nav.Link>
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
              <div className="d-flex  flex-wrap flex-md-nowrap align-items-center  py-4">
                <Button icon={faFileAlt} className="me-2" variant="primary" onClick={handleOpenModal}>
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  單筆新增
                </Button>
                {/* &nbsp;&nbsp; 
                <Button icon={faFileAlt} className="me-2" variant="primary" onClick={handleViewDeletion}>
                  <FontAwesomeIcon  className="me-2" />
                  {deleteInd?"查看未失效資料":"查看失效資料"}
                </Button> */}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Form className="d-flex"  style ={{position: "Absolute", top: 180, right: 15, width:300 }}>
                  <Form.Control
                    type="search"
                    placeholder="搜尋原物料"
                    className="me-2"
                    aria-label="Search"
                    onChange={handleSearchIndChange}
                    value={searchInd}
                  />
                </Form>
              </div>
              
              <RawMaterialInventoryTable rawMaterials={result} searchInd={searchInd} deleteInd= {deleteInd}/>
            </Tab.Pane>
            </Tab.Content>

          </Col>

        </Row>
      </Tab.Container>

      <RawMaterialFormModal
        show={showModal}
        onClose={handleCloseModal}
        onSave={handleCloseModal}

      />
    </>
  );
};

