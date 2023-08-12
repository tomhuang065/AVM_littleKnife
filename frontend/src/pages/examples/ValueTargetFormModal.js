import React, { useState } from "react";
import { Modal, Button, Form } from '@themesberg/react-bootstrap'
import axios from "axios";
import moment from "moment";


const ValueTargetFormModal = ({ show, type, onClose, onSave}) => {
  const instance = axios.create({baseURL:'http://localhost:5000/api/avm'});

  const [valueTargetData, setValueTargetData] = useState({
    name: "",
    valueTargetCode: "",
    category:"", // Updated field name to "供應商代碼"
    // Add other fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValueTargetData({
      ...valueTargetData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    console.log(type)
    // console.log(new Date().getFullYear)
    // const time = new Date().getFullYear +" "+new
    const date1 = new Date();
    var date = moment(date1 ).format('YYYY-MM-DD HH:mm:ss');
    console.log(date)
    valueTargetData.category = type;
    valueTargetData.updateTime = date;
    e.preventDefault();
    onSave(valueTargetData);
    console.log(typeof(valueTargetData))
    const response = await instance.post('/add_value_target', {
      ID:JSON.stringify(valueTargetData)
    }
  )
  alert("已新曾價值標的")
  window.location.reload(false)
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>新增價值標的</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="valueTargetName">
            <Form.Label>價值標的名稱</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={valueTargetData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="valueTargetCode">
            <Form.Label>價值標的代碼</Form.Label>
            <Form.Control
              type="text"
              name="valueTargetCode"
              value={valueTargetData.valueTargetCode}
              onChange={handleChange}
              required
            />
          </Form.Group>
          {/* Add other input fields for valueTarget details */}
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              取消
            </Button>
            <Button type="submit" variant="primary"
             >
              儲存
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ValueTargetFormModal;
