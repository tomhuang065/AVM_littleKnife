import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch, faEllipsisH,faEdit } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Modal,Table, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';
import axios from "axios";

import { useChat } from "../api/context";
// import ChatContext from "../api/context";

export default () => {
  var [value, setValue] = useState("");
  const {val, setVal, sendValue, signIn, suppliers} = useChat();
  const [resultP, setResultP] = useState([]);
  const [resultC, setResultC] = useState([]);
  const [resultM, setResultM] = useState([]);
  const instance = axios.create({baseURL:'http://localhost:5000/api/avm'});
  const [type, setType] = useState("")
  const [showModal, setShowModal] = useState(false);

  const onSendValue = async () => {
    console.log(value)
    if(!value){
        throw console.error("Some field missing");
    }

    const payload = {
        val : value,  
    }
    // signIn(payload);
    sendValue(payload);
    console.log(payload)

  }
  const handleCloseValueTargetModal = () => {
    setShowModal(false);
  };

  const handleSaveValueTarget = (ValueTargetData) => {
    // Handle the logic to save the ValueTarget data
    console.log("Value Target Data:", ValueTargetData);
    setShowModal(false);
  };

  const handleViewValueTarget= async (task) => {
    console.log("task", task)
    setShowModal(true);

    switch(task){
      case "原料":{
        setResultM(await instance.get('/sel_value_target_material'));
        setType("原料")
        // console.log(type)
      }
      case "顧客":{
        setResultC(await instance.get('/sel_value_target_customer'));
        setType("顧客")
        // console.log(type)

      }
      case "產品":{
        setResultP(await instance.get('/sel_value_target_product'));
        setType("產品")
        // console.log(type)
      }
      default:{
        break;
      }
    }
    // console.log(resultP);
  }
  const ValueFormModal = ({ show, onClose, onSave, result }) => {
    const [supplierData, setSupplierData] = useState({
      name: "",
      supplierCode: "", // Updated field name to "供應商代碼"
      // Add other fields as needed
    });
  const Acc =  result.data;
  console.log(Acc)
    
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
    const TableRow = (props) => {
      const {
        target_num,
        target_name,

      } = props;
  
      return (
        <tr>
          <td>{target_num}</td>
          <td>{target_name}</td>
          <td>
            {/* <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
                <span className="icon icon-sm">
                  <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu> */}
              <Button variant="submit" onClick={onClose}>
                選擇
              </Button>
              {/* </Dropdown.Menu> */}
            {/* </Dropdown> */}
          </td>
        </tr>
      );
    };
  
  
    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>選擇價值標的</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* <Form.Group controlId="supplierName">
              <Form.Label>價值標的名稱</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={supplierData.name}
                onChange={handleChange}
                required
              />
            </Form.Group> */}
            <Table hover className="user-table align-items-center table-striped">
              <thead>
                <tr>
                  <th className="border-bottom">價值標的名稱</th>
                  <th className="border-bottom">價值標的代碼</th>
                </tr>
                
              </thead>
              <tbody>
                {typeof(Acc) === "undefined"?null: Acc.map((t) => (
                  <TableRow key={`transaction-${t.id}`} {...t} />
                ))}
              </tbody>
            </Table>
            <Modal.Footer>
              <Button variant="secondary" onClick={onClose}>
                取消
              </Button>
              <Button type="submit" variant="primary">
                確定
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-3">
        <h2 className="fw-bold">
          財會系統
        </h2>
      </div>

     
      {/* onSubmit={handleSubmit} */}
      <Form >
          <Form.Group controlId="date">
            <Form.Label>進貨日期</Form.Label>
            <Form.Control
              type="date"
              name="date"
              // value={rawMaterialData.date}
              // onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="valueTargetName">
            <Form.Label>供應商</Form.Label>
            <br></br>
            <Dropdown className = "btn-group dropleft"id = "dropdown-button-drop-start" as={ButtonGroup}>
              <Dropdown.Toggle as={Button} split variant="link"  className="text-dark m-0 p-0" style ={{color :"red"}}>
                <Button variant="outline-primary" >選擇供應商</Button>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {/* <Dropdown.Item onClick={() => { console.log("產品")}}>
                  <FontAwesomeIcon  className="me-2" /> 411 銷貨收入
                </Dropdown.Item>
                <Dropdown.Item onClick={() => {  console.log("顧客")}}>
                  <FontAwesomeIcon  className="me-2" /> 417 銷貨退回
                </Dropdown.Item>
                <Dropdown.Item onClick={() => {  console.log("原料")}}>
                  <FontAwesomeIcon  className="me-2" /> 419 銷貨折讓
                </Dropdown.Item>
                <Dropdown.Item onClick={() => {  console.log("原料")}}>
                  <FontAwesomeIcon  className="me-2" /> 461 勞務收入
                </Dropdown.Item>
                <Dropdown.Item onClick={() => {  console.log("原料")}}>
                  <FontAwesomeIcon  className="me-2" /> 471 業務收入
                </Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
          <Form.Group controlId="valueTargetName">
            <Form.Label>原料名稱</Form.Label>
            <Form.Control
              type="text"
              name="name"
              // value={valueTargetData.name}
              // onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="openingQuantity">
            <Form.Label>數量</Form.Label>
            <Form.Control
              type="number"
              name="openingQuantity"
              // value={rawMaterialData.openingQuantity}
              // onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="openingQuantity">
            <Form.Label>單價</Form.Label>
            <Form.Control
              type="number"
              name="openingQuantity"
              // value={rawMaterialData.openingQuantity}
              // onChange={handleChange}
              required
            />
          </Form.Group>
          {/* <Form.Group controlId="valueTargetCode">
            <Form.Label>價值標的</Form.Label>
            <br></br>
            <Dropdown className = "btn-group dropleft"id = "dropdown-button-drop-start" as={ButtonGroup}>
              <Dropdown.Toggle as={Button} split variant="link"  className="text-dark m-0 p-0" style ={{color :"red"}}>
                <Button variant="outline-primary" >選擇價值標的</Button>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => { handleViewValueTarget("產品")}}>
                  <FontAwesomeIcon  className="me-2" /> 產品
                </Dropdown.Item>
                <Dropdown.Item onClick={() => { handleViewValueTarget("顧客")}}>
                  <FontAwesomeIcon  className="me-2" /> 顧客
                </Dropdown.Item>
                <Dropdown.Item onClick={() => { handleViewValueTarget("原料")}}>
                  <FontAwesomeIcon  className="me-2" /> 原料
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group> */}
          {/* <Form.Group controlId="openingQuantity">
            <Form.Label>總價</Form.Label>
            {resultM}{resultC}{resultP} 
           
          </Form.Group> */}
          
          {/* Add other input fields for valueTarget details */}
          
        </Form>
      <row>
            <br></br>
          {/* <Button variant="secondary" >
            取消
          </Button> */}
          <Button type="submit" variant="primary"
            >
            儲存
          </Button>
        </row> 
      {/* <TransactionsTable suppliers={suppliers}/> */}

      {/* <TransactionsTable2 suppliers={suppliers}/>  */}
      <ValueFormModal
        show={showModal}
        type={type}
        result = {resultP}
        onClose={handleCloseValueTargetModal}
        onSave={handleSaveValueTarget}
        
      />
    </>
  );
};
