import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faCartArrowDown, faChartPie, faChevronDown, faClipboard, faCommentDots, faDownload, faFileAlt, faPlus, faRocket, faStore } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, Form } from '@themesberg/react-bootstrap';
import { ChoosePhotoWidget, ProfileCardWidget } from "../../components/Widgets";
import { GeneralInfoForm } from "../../components/Forms";

import Profile3 from "../../assets/img/team/profile-picture-3.jpg";

export default () => {
  const [excelFile, setExcelFile] = useState(null);

  const handleExcelUpload = (event) => {
    const file = event.target.files[0];
    setExcelFile(file);
  };

  const handleSingleAdd = () => {
    // 在這裡處理單筆新增的邏輯
    // 可以使用表單資料或其他資料來源
  };

  return (
    <>

      <Row>
        <Col xs={12} xl={10}>
          {/*<GeneralInfoForm />*/}

          {/* Excel 上傳 */}
          <Col xs={12} xl={5}>
          <Form.Group>
            <Form.Label>上傳excel</Form.Label>
            <Form.Control type="file" accept=".xlsx,.xls" onChange={handleExcelUpload} />
          </Form.Group>
          </Col>

              {/* 分隔線 */}
          <hr />
          
          {/* 單筆新增按鈕 */}
          <Button icon={faFileAlt} className="me-2" variant="primary" onClick={handleSingleAdd}>
              <FontAwesomeIcon icon={faDownload} className="me-2" />
              下載
          </Button>
        <hr />
            <Row className="justify-content-between align-items-center">
              <Col xs={9} lg={4} className="d-flex">
                <Form.Select className="w-100 me-2 mb-2 mb-lg-0">
                  <option>三階</option>
                  <option value="1">Supplier</option>
                  <option value="2">Customer</option>
                  <option value="3">Partner</option>
                  <option value="4">Investor</option>
                </Form.Select>
                <Form.Select className="w-100">
                  <option>四階</option>
                  <option value="1">Last Month</option>
                  <option value="2">Last Year</option>
                </Form.Select>
              </Col>
              <Col xs={3} lg={8} className="text-end">
                <Dropdown>
                  <Dropdown.Toggle split as={Button} variant="link" className="text-dark m-0 p-0">
                    <span className="icon icon-sm icon-gray">
                      <FontAwesomeIcon />
                    </span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu-right">
                    <Dropdown.Item className="fw-bold text-dark">Show</Dropdown.Item>
                    <Dropdown.Item className="d-flex fw-bold">
                      10 <span className="icon icon-small ms-auto"><FontAwesomeIcon /></span>
                    </Dropdown.Item>
                    <Dropdown.Item className="fw-bold">20</Dropdown.Item>
                    <Dropdown.Item className="fw-bold">30</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
        </Col>
      </Row>






    </>
  );
};
