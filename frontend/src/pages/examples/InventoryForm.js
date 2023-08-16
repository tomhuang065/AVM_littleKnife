import React, { useState } from "react";
import { Modal, Button, Form } from '@themesberg/react-bootstrap';
import axios from "axios";
import { useChat } from "../../api/context";


const RawMaterialFormModal = ({ show, onClose, onSave }) => {
  const instance = axios.create({baseURL:'http://localhost:5000/api/avm'});
  const {mat, setMat} = useChat();

  const [rawMaterialData, setRawMaterialData] = useState({
    productCode: "",
    productName: "",
    date: "",
    openingQuantity: "",
    openingUnit: "",
    openingUnitPrice: "",
    openingCost: "",
    // Add other fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRawMaterialData({
      ...rawMaterialData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    rawMaterialData.openingCost = `${Number(rawMaterialData.openingQuantity)*Number(rawMaterialData.openingUnitPrice)}`
    console.log(rawMaterialData.openingCost)
    onSave(rawMaterialData);
    console.log(rawMaterialData)
    const response = await instance.post('/add_inventory', {
      ID:JSON.stringify(rawMaterialData)
    }
  )
  alert("已新增期初庫存資料")
  setMat(response.data)
  setRawMaterialData({
    productCode: "",
    productName: "",
    date: "",
    openingQuantity: "",
    openingUnit: "",
    openingUnitPrice: "",
    openingCost: "",
  })
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>新增原物料</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="productCode">
            <Form.Label>產品/材料代碼</Form.Label>
            <Form.Control
              type="text"
              name="productCode"
              value={rawMaterialData.productCode}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="productName">
            <Form.Label>產品/材料名稱</Form.Label>
            <Form.Control
              type="text"
              name="productName"
              value={rawMaterialData.productName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="date">
            <Form.Label>日期</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={rawMaterialData.date}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="openingQuantity">
            <Form.Label>期初數量</Form.Label>
            <Form.Control
              type="number"
              name="openingQuantity"
              value={rawMaterialData.openingQuantity}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="openingUnit">
            <Form.Label>期初單位</Form.Label>
            <Form.Control
              type="text"
              name="openingUnit"
              value={rawMaterialData.openingUnit}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="openingUnitPrice">
            <Form.Label>期初單價</Form.Label>
            <Form.Control
              type="number"
              name="openingUnitPrice"
              value={rawMaterialData.openingUnitPrice}
              onChange={handleChange}
              required
            />
          </Form.Group>
          {/* <Form.Group controlId="openingCost">
            <Form.Label>期初成本</Form.Label>
            <Form.Control
              type="<Form.Group controlId="openingCost">
            <Form.Label>期初成本</Form.Label>
            <Form.Control
              type="number"
              name="openingCost"
              value={rawMaterialData.openingCost}
              onChange={handleChange}
              required
            />
          </Form.Group>number"
              name="openingCost"
              value={rawMaterialData.openingCost}
              onChange={handleChange}
              required
            />
          </Form.Group> */}
          {/* Add other input fields for raw material details */}
          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              取消
            </Button>
            <Button type="submit" variant="primary">
              新增
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RawMaterialFormModal;
