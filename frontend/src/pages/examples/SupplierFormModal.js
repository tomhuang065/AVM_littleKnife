import React, { useState } from "react";
import { Modal, Button, Form } from '@themesberg/react-bootstrap';

const SupplierFormModal = ({ show, onClose, onSave }) => {
  const [supplierData, setSupplierData] = useState({
    name: "",
    supplierCode: "", // Updated field name to "供應商代碼"
    // Add other fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplierData({
      ...supplierData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(supplierData);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>新增供應商</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="supplierName">
            <Form.Label>供應商名稱</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={supplierData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="supplierCode">
            <Form.Label>供應商代碼</Form.Label>
            <Form.Control
              type="text"
              name="supplierCode"
              value={supplierData.supplierCode}
              onChange={handleChange}
              required
            />
          </Form.Group>
          {/* Add other input fields for supplier details */}
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              取消
            </Button>
            <Button type="submit" variant="primary">
              儲存
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SupplierFormModal;
