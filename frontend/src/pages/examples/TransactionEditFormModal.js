
import React, { useState } from "react";
import axios from "axios";
import { useChat } from "../../api/context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, Form, Nav, Card, Button, Table, Dropdown, ProgressBar,  InputGroup, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';


const RemoveModal = ({ onHide,show, states, transaction, orig }) =>{

    const instance = axios.create({baseURL:'http://localhost:5000/api/avm'});
    const [placeHolder, setPlaceHolder] = useState("")
    const [editing, setEditing] = useState(false)
    const [index, setIndex] = useState("選擇修改項目")
    const {val, setVal, valType, setValType} = useChat()
    const [forChange, setForChange] = useState("")
    const [newTransaction, setNewTransaction] = useState({
        target_status: transaction.target_status,
        target_name: transaction.target_name,
        target_num:transaction.target_num,
        category : transaction.category,
        
      });

    const handletransactionChange =(e) =>{
        const { name, value } = e.target;
        // console.log(name, value)
        setNewTransaction({
            ...newTransaction,
            [name]: value,
        });
    }

    const edittransaction = (content) =>{
        console.log(forChange, placeHolder)
        // setForChange("")
        // setPlaceHolder("")
        setEditing(true)
        switch(content) {
          case "價值標的狀態" :{
            setIndex(content)
            setPlaceHolder(newTransaction.target_status)
            setForChange('target_status')
            break;
          }
          case "價值標的代碼" :{
            setPlaceHolder(newTransaction.target_num)
            setIndex(content)
            setForChange("target_num")
            break;
          }
          case "價值標的名稱" :{
            setIndex(content)
            setPlaceHolder(newTransaction.target_name)
            setForChange("target_name")
            break;
          }
          default:{
            break;
          }
        }
      }

      const handleDeletetransaction = async()=>{
        const jsonData = {
          target_num: `${newTransaction.target_num}`
        };
        console.log(jsonData)
        setValType(null)
        const response = await instance.post('/del_value_target', {
          ID:JSON.stringify(jsonData)
        }
      )
        alert(response.data);
        onHide()
        setEditing(false); //not to show the input bar
        setValType(newTransaction.category)
      }
    
      const handleEdittransaction = async()=>{
        const jsonData = {
          orig: `${orig}`,
          target_num: `${newTransaction.target_num}`,
          target_name: `${newTransaction.target_name}`,
          target_status: `${newTransaction.target_status}`,
        };
        setValType(null)

        const response = await instance.post('/mod_value_target', {
          ID:JSON.stringify(jsonData)
        }
      )
        // onSave(newTransaction.target_num, newTransaction.target_name)
        setValType(newTransaction.category)
        setEditing(false); //not to show the input bar
        setPlaceHolder("") //placeholder in the modal input bar
        setForChange("")
        setIndex("選擇修改項目") //the index button in the 
        alert("已變更價值標的");
        // setMat("edit")
        onHide()
      }

    const transactionArray = ['價值標的代碼','價值標的名稱']

    return(
    <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        {...{ onHide, show }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {states === "deleting" ? "刪除價值標的" : "編輯價值標的"}
        </Modal.Title>
      </Modal.Header>
      {states === "deleting"?
        <Modal.Body>
          {/* 三階代碼 : {third} / 三階科目中文名稱 : {thirdCn} / 三階科目英文名稱 : {thirdEng} /<br></br> 四階代碼 : {fourth} / 四階科目中文名稱 : {fourthCn} / 四階科目英文名稱 :{fourthEng} */}
          價值標的代碼：{newTransaction.target_num} <br></br> 價值標的名稱 : {newTransaction.target_name}  
        </Modal.Body>
        :
        <Modal.Body className="d-flex flex-wrap flex-md-nowrap align-items-center  py-4">
          <Dropdown className = "btn-group dropleft" id = "dropdown-button-drop-start" as={ButtonGroup}>
            <Dropdown.Toggle as={Button} split variant="link"  className="text-dark m-0 p-0" style ={{color :"red"}}>
              <Button variant="outline-primary" >{index}</Button>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {transactionArray.map((inv) =>  (
                    <Dropdown.Item onClick={() => {edittransaction(inv)}}>
                        <FontAwesomeIcon  className="me-2" /> {inv}
                    </Dropdown.Item> 
                  ))}
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
              <Form.Control type="text" style ={{width : 500}} placeholder = {placeHolder} name={forChange}  onChange={handletransactionChange} />
            </InputGroup>
          </Form>:null}
        </Modal.Body>
      }
      <Modal.Footer>
        {states === "deleting"?<Button variant="outline-secondary" onClick={handleDeletetransaction}>確認</Button> :<Button variant="outline-secondary" onClick={handleEdittransaction}>修改</Button>  }
        <Button variant="outline-primary">取消</Button>
      </Modal.Footer>
    </Modal>
    )
  };

export default RemoveModal;
