import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faCartArrowDown, faChartPie, faChevronDown, faClipboard, faCommentDots, faDownload, faFileAlt, faPlus, faRocket, faStore, faUpload } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, Form, Tab, Nav } from '@themesberg/react-bootstrap';

import api from "../../api/api";

//import excel_subjects from "../../api/index"

import Profile3 from "../../assets/img/team/profile-picture-3.jpg";




function obj_to_dict(data) {
  let arr = []
  data.forEach(element => {
    let transformedData = {};
    Object.entries(element).forEach(([key, value]) => {
      transformedData[key.trim()] = typeof value === 'string' ? value.trim() : value;
    });
    arr.push(transformedData)
  })

  return (arr)
}

export default () => {
  const [excelFile, setExcelFile] = useState(null);

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

  const handleDownload = () => {
    // 在這裡處理下載的邏輯
    // 可以使用表單資料或其他資料來源
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
                <Button icon={faFileAlt} className="me-2" variant="primary" onClick={handleDownload}>
                  <FontAwesomeIcon icon={faDownload} className="me-2" />
                  下載範例
                </Button>
              </Tab.Pane>
              <Tab.Pane eventKey="browse">
                {/* Browse content here */}
                {/* You can display a table or a list of files here */}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};