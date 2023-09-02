import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCog, faHome, faSearch, faEllipsisH,faEdit } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Form, Button, ButtonGroup, Modal,Table, Breadcrumb, InputGroup, Dropdown } from '@themesberg/react-bootstrap';
import axios from "axios";
import moment from "moment";

import { useChat } from "../api/context";
// import ChatContext from "../api/context";

export default () => {
  var [value, setValue] = useState("");
  const {val, setVal, sendValue, signIn, suppliers} = useChat();
  const [resultP, setResultP] = useState([]);
  const [resultC, setResultC] = useState([]);
  const [resultM, setResultM] = useState([]);
  const [formType, setFormType] = useState("text")

  const instance = axios.create({baseURL:'http://localhost:5000/api/avm'});
  const [type, setType] = useState("")
  const [showModal, setShowModal] = useState(false);
  const [supplierResult, setSupplierResult] = useState([]);
  const [supplier, setSupplier] = useState({supNum:"", supName:"選擇供應商"})
  const [material, setMaterial] = useState("選擇原料")

  const [inventoryData, setInventoryData] = useState({
    supplier: "",
    date: moment(new Date()).format('MM/DD/YYYY'),
    quantity: "",
    price: "",
    comment: "",
    material:"",
    // Add other fields as needed
  });
  const handleCurrentDate = (e) => {
    setFormType("date");
  };

  const handleInventoryChange = (e) => {
    const { name, value } = e.target;
    setInventoryData({
      ...inventoryData,
      [name]: value,
    });
  };

  const handleViewSupplier= async () => {
    const sup = await instance.get('/sel_supplier')
    setSupplierResult(sup.data);
    console.log(supplierResult);
  }
  const SupplierRow = (props) => {
    // console.log(props)
    return (
      <>
          <Dropdown.Item onClick={() => setSupplier({supNum : props.supplier_num, supName : props.supplier_name})}>
              <div className = "me-2">{props.supplier_num} {props.supplier_name}</div>
          </Dropdown.Item>
      </>
      
    );
  }
  const MaterialRow = (props) => {
    // console.log(props)
    return (
      <>
          <Dropdown.Item onClick={() => setMaterial(props)}>
              <div className = "me-2">{props}</div>
          </Dropdown.Item>
      </>
      
    );
  }

  const materialResult = ["小刀測試一","小刀測試二","小刀測試三","小刀測試四","小刀測試五" ]
  const handleInventorySubmit = ()=>{
    inventoryData.supplier = supplier
    inventoryData.material = material

    // console.log(typeof(salesData.price))
    if(inventoryData.supplier ===""){
        alert("尚未選擇供應商")
    }
    else{
      if(inventoryData.material ===""){
        alert("尚未選擇原料")
      }
      else{
        if(Number(inventoryData.price) < 0 || Number(inventoryData.quantity) < 0){
          alert("數量或單價不可小於零")
        }
        else{
          if(Number(inventoryData.price)% 1 !== 0|| Number(inventoryData.quantity)% 1 !== 0)
          {
            alert("數量或單價不可有小數點")
          }
          else{
            alert("已新增存貨資料")
            console.log(inventoryData)
            setInventoryData({
              supplier: "",
              date: moment(new Date()).format('MM/DD/YYYY'),
              quantity: "",
              price: "",
              comment: "",
              material:"",
            });
            setMaterial("選擇原料")
            setSupplier("選擇供應商")

          }
          
        }
      }  
    }
  }
  
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-3">
        <h2 className="fw-bold">
          進貨
        </h2>
      </div>

     
      {/* onSubmit={handleSubmit} */}
      <Form >
          <Form.Group controlId="date">
            <Form.Label>進貨日期</Form.Label>
            <Form.Control
              type={formType}
              name="date"
              value={inventoryData.date}
              placeholder={inventoryData.date}
              onChange={handleInventoryChange}
              onClick={handleCurrentDate}
            />
          </Form.Group>
          <br></br>
          <Form.Group controlId="valueTargetName">
            <Form.Label>供應商</Form.Label> 
            <br></br>
            <Dropdown className = "btn-group dropleft"id = "dropdown-button-drop-start" as={ButtonGroup}>
              <Dropdown.Toggle as={Button} split variant="link"  className="text-dark m-0 p-0" style ={{color :"red"}}>
                <Button variant="outline-primary" onClick={handleViewSupplier}>{supplier.supNum} {supplier.supName}</Button>
              </Dropdown.Toggle>
              <Dropdown.Menu>
               {supplierResult === []? null:supplierResult.map(t => <SupplierRow  {...t} />)}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
          <br></br>
          <Form.Group controlId="valueTargetName">
            <Form.Label>原料名稱</Form.Label>
            <br></br>
             <Dropdown className = "btn-group dropleft"id = "dropdown-button-drop-start" as={ButtonGroup}>
              <Dropdown.Toggle as={Button} split variant="link"  className="text-dark m-0 p-0" style ={{color :"red"}}>
                <Button variant="outline-primary" >{material}</Button>
              </Dropdown.Toggle>
              <Dropdown.Menu>
               {/* {materialResult === []? null:materialResult.map(t => <MaterialRow  {...t} />)}
                */}\
                 <Dropdown.Item onClick={()=> setMaterial("小刀測試一")}>
                      <div className = "me-2">小刀測試一</div>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={()=> setMaterial("小刀測試二")}>
                      <div className = "me-2">小刀測試二</div>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={()=> setMaterial("小刀測試三")}>
                      <div className = "me-2">小刀測試三</div>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={()=> setMaterial("小刀測試四")}>
                      <div className = "me-2">小刀測試四</div>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={()=> setMaterial("小刀測試五")}>
                      <div className = "me-2">小刀測試五</div>
                  </Dropdown.Item>
              </Dropdown.Menu>
             
            </Dropdown>
          </Form.Group>
          <br></br>
          <Form.Group controlId="openingQuantity">
            <Form.Label>數量</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              value={inventoryData.quantity}
              placeholder={inventoryData.quantity}
              onChange={handleInventoryChange}
              required
            />
          </Form.Group>
          <br></br>
          <Form.Group controlId="openingQuantity">
            <Form.Label>單價</Form.Label>
            <Form.Control
               type="number"
               name="price"
               value={inventoryData.price}
               placeholder={inventoryData.price}
               onChange={handleInventoryChange}
               required
            />
          </Form.Group>
          <Form.Group controlId="openingQuantity">
            {((Number(inventoryData.price)>0)&&(Number(inventoryData.quantity)>0))?<div>總價: {Number(inventoryData.price)*Number(inventoryData.quantity)}</div>:<div>總價:</div  >}
          </Form.Group>
          <br></br>
          <Form.Group controlId="comment">
              <Form.Label>備註</Form.Label>
              <Form.Control
                type="text"
                name="comment"
                value={inventoryData.comment}
                placeholder={inventoryData.comment}
                onChange={handleInventoryChange}
                required
              />
            </Form.Group>
        </Form>
      <row>
            <br></br>
          <Button type="submit" variant="primary" onClick={handleInventorySubmit}
            >
            儲存
          </Button>
      </row> 
    </>
  );
};
