import React, { useState } from "react";
import { Modal, Button, Form } from '@themesberg/react-bootstrap';

const ValueFormModal = ({ show, onClose, onSave }) => {
  const [productData, setProductData] = useState({
    product_id: "",
    product_name: "",
    product_sec_id: "",
    use_quantity: "",
    update_user: "",
    update_time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(productData);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>新增BOM</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="productId">
            <Form.Label>產品代碼</Form.Label>
            <Form.Control
              type="text"
              name="product_id"
              value={productData.product_id}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="productName">
            <Form.Label>產品名稱</Form.Label>
            <Form.Control
              type="text"
              name="product_name"
              value={productData.product_name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="productSecId">
            <Form.Label>二階產品代碼</Form.Label>
            <Form.Control
              type="text"
              name="product_sec_id"
              value={productData.product_sec_id}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="useQuantity">
            <Form.Label>使用量</Form.Label>
            <Form.Control
              type="text"
              name="use_quantity"
              value={productData.use_quantity}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="updateUser">
            <Form.Label>更新人員</Form.Label>
            <Form.Control
              type="text"
              name="update_user"
              value={productData.update_user}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="updateTime">
            <Form.Label>更新時間</Form.Label>
            <Form.Control
              type="text"
              name="update_time"
              value={productData.update_time}
              onChange={handleChange}
              required
            />
          </Form.Group>
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

export default ValueFormModal;