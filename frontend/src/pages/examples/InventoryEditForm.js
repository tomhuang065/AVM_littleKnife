
import React, { useState } from "react";
import axios from "axios";
import { useChat } from "../../api/context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, Form, Nav, Card, Button, Table, Dropdown, ProgressBar,  InputGroup, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';


const RemoveModal = ({ onHide, show, states, inventory, origs }) =>{

    const instance = axios.create({baseURL:'http://localhost:5000/api/avm'});
    const [placeHolder, setPlaceHolder] = useState("")
    const [editing, setEditing] = useState(false)
    const [index, setIndex] = useState("選擇修改項目")
    const {mat, setMat} = useChat();
    const [newInventory, setNewInventory] = useState({
        id: inventory.id,
        mid: inventory.mid,
        mname:inventory.mname,
        date: inventory.date,
        startC: inventory.startC,
        startU: inventory.startU,
        startP: inventory.startP,
        startQ: inventory.startQ,
      });

    const handleInventoryChange =(e) =>{
        const { name, value } = e.target;
        console.log(name, value)
        setNewInventory({
            ...newInventory,
            [name]: value,
        });
    }

    const editMaterialInventory = (content) =>{
        setEditing(true)
        switch(content) {
          case "編號" :{
            setIndex(content)
            setPlaceHolder("id")
            break;
          }
          case "材料代碼" :{
            setIndex(content)
            setPlaceHolder("mid")
            break;
          }
          case "材料名稱" :{
            setIndex(content)
            setPlaceHolder("mname")
            break;
          }
          case "日期" :{
            setIndex(content)
            setPlaceHolder("date")
            break;
          }
          case "期初數量" :{
            setPlaceHolder("startQ")
            setIndex(content)
            break;
          }
          case "期初單位" :{
            setPlaceHolder("startU")
            setIndex(content)
            break;
          }
          case "期初單價" :{
            setPlaceHolder("startP")
            setIndex(content)
            break;
          }
          case "期初成本" :{
            setPlaceHolder("startC")
            setIndex(content)
            break;
          }
          default:{
            break;
          }
        }
      }

      const handleDeleteInventory = async()=>{
        const jsonData = {
          mid: `${newInventory.mid}`
        };
        const response = await instance.post('/del_inventory', {
          ID:JSON.stringify(jsonData)
        }
      )
        alert(response.data);
        onHide()
        setEditing(false); //not to show the input bar
        setMat("del")
      }
    
      const handleEditInventory = async()=>{
        const jsonData = {
          orig: `${origs}`,
          id: `${newInventory.id}`,
          mid: `${newInventory.mid}`,
          mname: `${newInventory.mname}`,
          startC: `${newInventory.startC}`,
          startP: `${newInventory.startP}`,
          startQ: `${newInventory.startQ}`,
          startU: `${newInventory.startU}`,
        };
        const response = await instance.post('/update_inventory', {
          ID:JSON.stringify(jsonData)
        }
      )
        setEditing(false); //not to show the input bar
        setPlaceHolder("") //placeholder in the modal input bar
        setIndex("選擇修改項目") //the index button in the 
        alert(response.data);
        setMat("edit")
        onHide()
      }
    return(
    <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        {...{ onHide, show }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {states === "deleting" ? "確定要刪除此原料？" : "你正在編輯期初原料"}
        </Modal.Title>
      </Modal.Header>
      {states === "deleting"?
        <Modal.Body>
          {/* 三階代碼 : {third} / 三階科目中文名稱 : {thirdCn} / 三階科目英文名稱 : {thirdEng} /<br></br> 四階代碼 : {fourth} / 四階科目中文名稱 : {fourthCn} / 四階科目英文名稱 :{fourthEng} */}
          編號：{newInventory.id} / 材料代碼 : {newInventory.mid} / 材料名稱 : {newInventory.mname} <br></br> 期初數量 : {newInventory.startQ} / 期初單位 : {newInventory.startU} <br></br> 期初單價 : {newInventory.startP} / 期初成本 : {newInventory.startC}
        </Modal.Body>
        :
        <Modal.Body className="d-flex flex-wrap flex-md-nowrap align-items-center  py-4">
          <Dropdown className = "btn-group dropleft" id = "dropdown-button-drop-start" as={ButtonGroup}>
            <Dropdown.Toggle as={Button} split variant="link"  className="text-dark m-0 p-0" style ={{color :"red"}}>
              <Button variant="outline-primary" >{index}</Button>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => {editMaterialInventory("材料代碼")}}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> 材料代碼
              </Dropdown.Item>
              <Dropdown.Item onClick={() => {editMaterialInventory("材料名稱")}}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> 材料名稱
              </Dropdown.Item>
              <Dropdown.Item onClick={() => {editMaterialInventory("期初數量")}}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> 期初數量
              </Dropdown.Item>
              <Dropdown.Item onClick={() => {editMaterialInventory("期初單位")}}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> 期初單位
              </Dropdown.Item>
              <Dropdown.Item onClick={() => {editMaterialInventory("期初單價")}}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> 期初單價
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          &nbsp;
          &nbsp;
      
          {editing? 
          <Form >
            <InputGroup >
              <InputGroup.Text>
                <FontAwesomeIcon  />
              </InputGroup.Text>
              <Form.Control type="text" style ={{width : 500}} placeholder = {placeHolder} name={placeHolder}  onChange={handleInventoryChange} />
            </InputGroup>
          </Form>:null}
        </Modal.Body>
      }
      <Modal.Footer>
        {states === "deleting"?<Button variant="outline-secondary" onClick={handleDeleteInventory}>確認</Button> :<Button variant="outline-secondary" onClick={handleEditInventory}>修改</Button>  }
        <Button variant="outline-primary">取消</Button>
      </Modal.Footer>
    </Modal>
    )
  };

export default RemoveModal;
