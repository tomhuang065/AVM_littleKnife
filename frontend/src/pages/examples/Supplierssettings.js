import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faCartArrowDown, faChartPie, faChevronDown, faClipboard, faCommentDots, faDownload, faFileAlt, faMagic, faPlus, faRocket, faStore, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, Form } from '@themesberg/react-bootstrap';
import { ChoosePhotoWidget, ProfileCardWidget } from "../../components/Widgets";
import { GeneralInfoForm } from "../../components/Forms";
import { PageTrafficTable, RankingTable } from "../../components/Tables";
import api from "../../api/api";

import Profile3 from "../../assets/img/team/profile-picture-3.jpg";

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

  const handleExceldownload = () => {
    // 在這裡處理下載的邏輯
    // 可以使用表單資料或其他資料來源
  };

  const handleSingleAdd = () => {
    // 在這裡處理單筆新增的邏輯
    // 可以使用表單資料或其他資料來源
  };

  const handlemodify = () => {
    // 在這裡處理修改的邏輯
    // 可以使用表單資料或其他資料來源
  };

  const handledelete = () => {
    // 在這裡處理刪除的邏輯
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

          {/* Excel 上傳按鈕 */}
          <Col xs={12} xl={5}>
          <Button variant="primary" onClick={handleExcelUploadSubmit}>
            <FontAwesomeIcon icon={faUpload} className="me-2" />
            上傳
          </Button>
          </Col>

              {/* 分隔線 */}
          <hr />
          
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          {/* 單筆新增按鈕 */}
          <Button icon={faFileAlt} className="me-2" variant="primary" onClick={handleSingleAdd}>
              <FontAwesomeIcon icon={faPlus} className="me-2" />
              單筆新增
          </Button>

          {/* Excel 下載按鈕 */}
          <Button icon={faFileAlt} className="me-2" variant="primary" onClick={handleExceldownload}>

              <FontAwesomeIcon icon={faDownload} className="me-2" />
              Excel 下載
          </Button>
          
      
          {/* 修改按鈕 */}
          <Button icon={faFileAlt} className="me-2" variant="primary" onClick={handlemodify}>
              <FontAwesomeIcon icon={faMagic} className="me-2" />
              修改
          </Button>


          {/* 刪除按鈕 */}
          <Button icon={faFileAlt} className="me-2" variant="primary" onClick={handledelete}>

              <FontAwesomeIcon icon={faTrash} className="me-2" />
              刪除
          </Button>

        </div>


        </Col>
      </Row>

      <PageTrafficTable />






    </>
  );
};
