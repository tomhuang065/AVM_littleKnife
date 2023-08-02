import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFileAlt, faMagic, faPlus, faRocket, faStore, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, Form, Tab ,Nav } from '@themesberg/react-bootstrap';
import { RawMaterialInventoryTable } from "../../components/Tables";
import api from "../../api/api";
import RawMaterialFormModal from "./InventoryForm";

export default () => {
  const [excelFile, setExcelFile] = useState(null);
  const [showInventoryModal, setShowInventoryModal] = useState(false);

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


  const [showModal, setShowModal] = useState(false);

  // Function to open the modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to handle saving the form data from the modal
  const handleSaveModalData = (rawMaterialData) => {
    // Perform saving logic here, e.g., call API or update state
    console.log("Raw material data:", rawMaterialData);

    // Close the modal after saving
    handleCloseModal();
  };

  const rawMaterials = [
    {
      productCode: "P001",
      productName: "Product A",
      date: "2023-07-27",
      openingQuantity: 100,
      openingUnit: "kg",
      openingUnitPrice: 10.5,
      openingCost: 1050,
    },
    {
      productCode: "P003",
      productName: "Product A",
      date: "2023-07-27",
      openingQuantity: 100,
      openingUnit: "kg",
      openingUnitPrice: 10.5,
      openingCost: 1050,
    },
    // Add more raw material data as needed
  ];



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
                <Button icon={faFileAlt} className="me-2" variant="primary" onClick={handleOpenModal}>
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  單筆新增
                </Button>
              </div>
              <RawMaterialInventoryTable rawMaterials={rawMaterials} />
            </Tab.Pane>
            </Tab.Content>

          </Col>

        </Row>
      </Tab.Container>

      {/* Supplier Form Modal */}
      <RawMaterialFormModal
        show={showModal}
        onClose={handleCloseModal}
        onSave={handleSaveModalData}
      />
    </>
  );
};

