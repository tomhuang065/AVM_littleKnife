import React from "react";
import axios from 'axios';
import {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Form, Nav, Card, Button, Table, Dropdown, ProgressBar,  InputGroup, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import moment from "moment";
import { useChat } from "../api/context";



import { Routes } from "../routes";
import transactions from "../data/transactions";


export const SupplierTable = (props) => {
    const instance = axios.create({baseURL:'http://localhost:5000/api/avm'});
    const [removeModal, setRemoveModal] = useState(false);
    const [editing, setEditing] = useState(false)
    const [index, setIndex] = useState("選擇修改項目")
    const [state, setState] = useState("")

    const [supName, setSupName] = useState("")
    const [supNum, setSupNum] = useState("")
    const [updateUsr, setUpdateUsr] = useState("")
    const [updateTime, setUpdateTime] = useState("")
    const [orig, setOrig] = useState("")

    const {sup, setSup} = useChat();



    const totalTransactions = props.length;
    // const {supplier} = props;
    // console.log(supplier)
    console.log(props.supplier)
    const supplier = props.supplier

    const handleRowEdit = (supNum, supName, updateUsr, updateTime) => {
        console.log("edit row")
        setState("editing")
        setRemoveModal(true);
        setSupName (supName)
        setSupNum(supNum)
        setUpdateTime(updateTime)
        setUpdateUsr(updateUsr)
        setRemoveModal(true);
        setOrig(supNum)
    }
    const handleRowDelete = (supNum, supName,  updateUsr, updateTime) => {
        setState("deleting")
        setRemoveModal(true);
        setSupName(supName)
        setSupNum(supNum)
        setUpdateTime(updateTime)
        setUpdateUsr(updateUsr)
        setOrig(supNum)

      }

    const editSupplier = (content) =>{
        setEditing(true)
        switch(content) {
          case "供應商代碼" :{
            setIndex(content)
            break;
          }
          case "供應商名稱" :{
            setIndex(content)
            break;
          }
          case "更新人員" :{
            setIndex(content)
            break;
          }
          case "更新時間" :{
            setIndex(content)
            break;
          }
          default:{
            break;
          }
        }
      }

      const modifySupplier = (event) =>{
        // setEditing(false);
        console.log(event.target.value)
        if(event !== ""){
          switch(index) {
            case "供應商代碼" :{
                setSupNum(event.target.value)
                // setPlaceHolder("")
              break;
            }
            case "供應商名稱" :{
                setSupName(event.target.value)
                // setPlaceHolder("")
              break;
            }
            case "更新人員" :{
                setUpdateUsr(event.target.value)
                // setPlaceHolder("")
              break;
            }
            case "更新時間" :{
                setUpdateTime(event.target.value)
                // setPlaceHolder("")
              break;
            }
            default:{
              break;
            }
        }
        
        }
    
      }

      const handleClick = (response) =>{
        alert("已變更供應商狀態");
        // window.location.reload(false)
        
      }
      const handleDeleteSupplier= async()=>{
        // console.log(fourth)
        const jsonData = {
          content: `${supNum}`
        };
        const response = await instance.post('/del_supplier', {
          ID:JSON.stringify(jsonData)
        }
      )
        console.log(response.data)
        setRemoveModal(false)
        handleClick(response.data);
        setSup(null)
    
      }
    
      const handleEditSupplier = async(sup)=>{
        console.log("sup", sup)
        const jsonData = {
          orig: `${orig}`,
          status:`${sup}`

        };
        const response = await instance.post('/update_supplier', {
          ID:JSON.stringify(jsonData)
        }
      )
        console.log(response.data)
        // console.log(orig, " ", third ," ", thirdCn, " ", thirdEng, " ", fourth, " ", fourthCn, " ", fourthEng)
        setRemoveModal(false)
        setEditing(false);
        setIndex("選擇修改項目")
        handleClick(response.data);
    
    
      }

      const handleChangeState = (supNum, supName, updateUsr, updateTime, status) =>{
        setOrig(supNum)
        setSupName(supName)
        setSupNum(supNum)
        setUpdateTime(updateTime)
        setUpdateUsr(updateUsr)
        if(status === 1){
          setSup(false)
        }
        else{
          setSup(true)
        }
      }

      useEffect(()=>{
        console.log(sup)
        if(orig !== ''){
          handleEditSupplier(sup)
        }
        setOrig("")    
      },[sup])
  
    const TableRow = (props) => {
      const { supplier_num, supplier_name, id, update_user,  update_time, status } = props;
      //const statusVariant = status === "Paid" ? "success"
      //: status === "Due" ? "warning"
        //: status === "Canceled" ? "danger" : "primary";
  
      return (
        <tr >
          <td >
            <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
              {supplier_num}
            </Card.Link>
          </td>
          <td>
            <span className="fw-normal">
              {supplier_name}
            </span>
          </td>
          
          <td>
            <span className="fw-normal">
            {update_time === null?"---":moment(update_time).format('YYYY-MM-DD HH:mm:ss')}
            </span>
          </td>
          <td>
            <span className="fw-normal">
            {parseFloat(update_user).toFixed(0)}
            </span>
          </td>
          <td>
            <span className="fw-normal">
              {status}
            </span>
          </td>
          <td>
          <Button variant="outline-primary" onClick={() => {handleChangeState(supplier_num, supplier_name, update_user, update_time, status)}}>變更</Button>

            {/* <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
                <span className="icon icon-sm">
                  <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => {handleChangeState(supplier_num, supplier_name, update_user, update_time, status)}}>
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> Change
                </Dropdown.Item>
                <Dropdown.Item onClick={() => {handleRowEdit(supplier_num, supplier_name, update_user, update_time)}}>
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                </Dropdown.Item>

                <Dropdown.Item className="text-danger"onClick={() => {handleRowDelete(supplier_num, supplier_name, update_user, update_time)}} >
                  <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
          </td>
        </tr>
      );
    };
  
    const RemoveModal = ({ onHide, show, state }) =>{

        return(
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            {...{ onHide, show }}
    
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {state === "deleting" ? "確定要刪除此供應商？" : "你正在編輯供應商資訊"}
            </Modal.Title>
          </Modal.Header>
          {state === "deleting"?
            <Modal.Body>
              供應商名稱 : {supName} / 供應商代碼 : {supNum} <br></br> 更新人員 : {updateUsr} / 更新時間 : {updateTime} 
            </Modal.Body>
            :
            <Modal.Body>
              <Dropdown className = "btn-group dropleft"id = "dropdown-button-drop-start" as={ButtonGroup}>
                <Dropdown.Toggle as={Button} split variant="link"  className="text-dark m-0 p-0" style ={{color :"red"}}>
                  {/* <span className="icon icon-sm">
                    <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                      "選擇修改項目"
                  </span> */}
                  <Button variant="outline-primary" >{index}</Button>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => {editSupplier("供應商代碼")}}>
                    <FontAwesomeIcon icon={faEdit} className="me-2" /> 供應商代碼
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => {editSupplier("供應商名稱")}}>
                    <FontAwesomeIcon icon={faEdit} className="me-2" /> 供應商名稱
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => {editSupplier("更新人員")}}>
                    <FontAwesomeIcon icon={faEdit} className="me-2" /> 更新人員
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => {editSupplier("更新時間")}}>
                    <FontAwesomeIcon icon={faEdit} className="me-2" /> 更新時間
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {editing? 
              <Form >
                <InputGroup >
                  <InputGroup.Text>
                    <FontAwesomeIcon  />
                  </InputGroup.Text>
                  <Form.Control type="text" onClick ={e => modifySupplier(e)} onChange={e => console.log(e.target.value)} />
                  {/* <FontAwesomeIcon icon={faEdit} className="me-2" />  */}
                </InputGroup>
              </Form>:null}
            </Modal.Body>
          }
          <Modal.Footer>
            {state === "deleting"?<Button variant="outline-secondary" onClick={handleDeleteSupplier}>確認</Button> :<Button variant="outline-secondary" onClick={handleEditSupplier}>修改</Button>  }
            <Button variant="outline-primary" onClick={() => {setRemoveModal(false)}}>取消</Button>
          </Modal.Footer>
        </Modal>
        )
      };

    return (
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
        <Card.Body className="pt-0">
          <Table hover className="user-table align-items-center table-striped">
            <thead>
              <tr>
                <th className="border-bottom">供應商代碼</th>
                <th className="border-bottom">供應商名稱</th>
                <th className="border-bottom">更新時間</th>
                <th className="border-bottom">更新人員</th>
                <th className="border-bottom">供應商狀態(1:顯示)</th>
                <th className="border-bottom">變更供應商狀態</th>
              </tr>
            </thead>
            <tbody>
              {typeof(supplier) === "undefined" ? null : supplier.map(t => <TableRow key={`transaction-${t.id}`} {...t} />)}
            </tbody>
          </Table>
          <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-event.target.value-between">
            <Nav>
              <Pagination className="mb-2 mb-lg-0">
                <Pagination.Prev>
                  Previous
                </Pagination.Prev>
                <Pagination.Item active>1</Pagination.Item>
                <Pagination.Item>2</Pagination.Item>
                <Pagination.Item>3</Pagination.Item>
                <Pagination.Item>4</Pagination.Item>
                <Pagination.Item>5</Pagination.Item>
                <Pagination.Next>
                  Next
                </Pagination.Next>
              </Pagination>
            </Nav>
            <small className="fw-bold">
              Showing <b>{totalTransactions}</b> out of <b>25</b> entries
            </small>
          </Card.Footer>
        </Card.Body>
        {removeModal?
          <RemoveModal /** 編輯視窗 */
            show={removeModal}
            onHide={() => setRemoveModal(false)}
            state={state}
        />:<div></div>}
      </Card>
    );
  };
  