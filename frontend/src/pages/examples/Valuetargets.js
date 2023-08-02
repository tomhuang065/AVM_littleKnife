import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faCartArrowDown, faChartPie, faChevronDown, faClipboard, faCommentDots, faDownload, faFileAlt, faMagic, faPlus, faRocket, faStore, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, Form, Tab ,Nav } from '@themesberg/react-bootstrap';
import { ValuetargetsTable, RankingTable , TransactionsTable} from "../../components/Tables";
import api from "../../api/api";
import SupplierFormModal from './SupplierFormModal';


import Profile3 from "../../assets/img/team/profile-picture-3.jpg";


export default () => {
  const [excelFile, setExcelFile] = useState(null);
  const [showSupplierModal, setShowSupplierModal] = useState(false);

  const handleExcelUpload = (event) => {
    const file = event.target.files[0];
    setExcelFile(file);
  };

  const handleExcelUploadSubmit = async () => {
    const formData = new FormData();
    formData.append("file", excelFile);
    const res = await api.post("/api/excel", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);
  };

  const handleExceldownload = () => {
    // 在這裡處理下載的邏輯
    // 可以使用表單資料或其他資料來源
  };


  const handleSingleAdd = () => {
    setShowSupplierModal(true);
  };

  const handleCloseSupplierModal = () => {
    setShowSupplierModal(false);
  };

  const handleSaveSupplier = (supplierData) => {
    // Handle the logic to save the supplier data
    console.log("Supplier Data:", supplierData);
    setShowSupplierModal(false);
  };



  return (
    <>
      <Tab.Container defaultActiveKey="upload">
        <Row>
          <Col xs={12} xl={10}>
            {/* Nav for Tabs */}
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="upload">上傳</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="download">下載範例</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="browse">瀏覽</Nav.Link>
              </Nav.Item>
            </Nav>

            {/* Tab Content */}
            <Tab.Content>
              <Tab.Pane eventKey="upload">
                <Col xs={12} xl={5}>
                  <Form.Group>
                    <Form.Label>上傳excel</Form.Label>
                    <Form.Control type="file" accept=".xlsx,.xls" onChange={handleExcelUpload} />
                  </Form.Group>
                </Col>
                <Button icon={faFileAlt} className="me-2" variant="primary" onClick={handleExcelUploadSubmit}>
                  <FontAwesomeIcon icon={faUpload} className="me-2" />
                  上傳
                </Button>
              </Tab.Pane>
              <Tab.Pane eventKey="download">
                {/* Download content here */}
                <Button icon={faFileAlt} className="me-2" variant="primary" onClick={handleExceldownload}>
                  <FontAwesomeIcon icon={faDownload} className="me-2" />
                  下載範例
                </Button>
              </Tab.Pane>
              <Tab.Pane eventKey="browse">
              {/* Browse content here */}
              {/* You can display a table or a list of files here */}
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                {/* 單筆新增按鈕 */}
                <Button icon={faFileAlt} className="me-2" variant="primary" onClick={handleSingleAdd}>
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  單筆新增
                </Button>
              </div>
              <ValuetargetsTable />
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

