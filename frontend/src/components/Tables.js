
import React from "react";
import axios from 'axios';
import {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Form, Nav, Card, Button, Table, Dropdown, ProgressBar,  InputGroup, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

import { Routes } from "../routes";
import transactions from "../data/transactions";


const ValueChange = ({ value, suffix }) => {
  const valueIcon = value < 0 ? faAngleDown : faAngleUp;
  const valueTxtColor = value < 0 ? "text-danger" : "text-success";

  return (
    value ? <span className={valueTxtColor}>
      <FontAwesomeIcon icon={valueIcon} />
      <span className="fw-bold ms-1">
        {Math.abs(value)}{suffix}
      </span>
    </span> : "--"
  );
};

export const AccountTable = (props) => {
  const instance = axios.create({baseURL:'http://localhost:5000/api/avm'});
  const [removeModal, setRemoveModal] = useState(false);
  const totalTransactions = transactions.length;
  const [third, setThird] = useState("");
  const [thirdCn, setThirdCn] = useState("");
  const [thirdEng, setThirdEng] = useState("");
  const [fourth, setFourth] = useState("");
  const [fourthCn, setFourthCn] = useState("");
  const [fourthEng, setFourthEng] = useState("");

  const [state, setState] = useState("")
  const [editing, setEditing] = useState(false)
  const [index, setIndex] = useState("選擇修改項目")
  const [orig, setOrig] = useState("")
  
  const handleRowEdit = (third, third_subjects_cn, third_subjects_eng, fourth, fourth_subjects_cn, fourth_subjects_eng) => {
    console.log("edit row")
    setState("editing")
    setRemoveModal(true);
    setThird(third)
    setThirdCn(third_subjects_cn)
    setThirdEng(third_subjects_eng)
    setFourth(fourth)
    setFourthCn(fourth_subjects_cn)
    setFourthEng(fourth_subjects_eng)
    setRemoveModal(true);
    setOrig(fourth)
  }
  const handleClick = (response) =>{
    alert(response);
    window.location.reload(false)
    
  }
  const handleDeleteAccount = async()=>{
    console.log(fourth)
    const jsonData = {
      content: `${fourth}`
    };
    const response = await instance.post('/del_account_subjects', {
      ID:JSON.stringify(jsonData)
    }
  )
    console.log(response.data)
    setRemoveModal(false)
    handleClick(response.data);

  }

  const handleEditAccount = async()=>{
  //   console.log(fourth)
    const jsonData = {
      orig: `${orig}`,
      third: `${third}`,
      thirdCn: `${thirdCn}`,
      thirdEng: `${thirdEng}`,
      fourth: `${fourth}`,
      fourthCn: `${fourthCn}`,
      fourthEng: `${fourthEng}`,
      // orig: `${orig}`,
      // third: `third = "${third}"`,
      // thirdCn: `third_subjects_cn = "${thirdCn}"`,
      // thirdEng: `third_subjects_eng = "${thirdEng}"`,
      // fourth: `fourth = "${fourth}"`,
      // fourthCn: `fourth_subjects_cn = "${fourthCn}"`,
      // fourthEng: `fourth_subjects_eng = "${fourthEng}"`,
    };
    const response = await instance.post('/mod_account_subjects', {
      ID:JSON.stringify(jsonData)
    }
  )
    console.log(response.data)
    console.log(orig, " ", third ," ", thirdCn, " ", thirdEng, " ", fourth, " ", fourthCn, " ", fourthEng)
    setRemoveModal(false)
    setEditing(false);
    setIndex("選擇修改項目")
    handleClick(response.data);


  }

  const editMaterialInventory = (content) =>{
    setEditing(true)
    switch(content) {
      case "三階代碼" :{
        setIndex(content)
        break;
      }
      case "三階科目中文名稱" :{
        setIndex(content)
        break;
      }
      case "三階科目英文名稱" :{
        setIndex(content)
        break;
      }
      case "四階代碼" :{
        setIndex(content)
        break;
      }
      case "四階科目中文名稱" :{
        setIndex(content)
        break;
      }
      case "四階科目英文名稱" :{
        setIndex(content)
        break;
      }
      default:{
        break;
      }
    }
  }

  const modifyMaterialInventory = (event) =>{
    // setEditing(false);
    console.log(event.target.value)
    if(event !== ""){
      switch(index) {
        case "三階代碼" :{
          setThird(event.target.value)
          // setPlaceHolder("")
          break;
        }
        case "三階科目中文名稱" :{
          setThirdCn(event.target.value)
          // setPlaceHolder("")
          break;
        }
        case "三階科目英文名稱" :{
          setThirdEng(event.target.value)
          // setPlaceHolder("")
          break;
        }
        case "四階代碼" :{
          setFourth(event.target.value)
          // setPlaceHolder("")
          break;
        }
        case "四階科目中文名稱" :{
          setFourthCn(event.target.value)
          // setPlaceHolder("")
          break;
        }
        case "四階科目英文名稱" :{
          setFourthEng(event.target.value)
          break;
        }
        default:{
          break;
        }
    }
    
    }

  }

  const handleRowDelete = (third, third_subjects_cn, third_subjects_eng, fourth, fourth_subjects_cn, fourth_subjects_eng) => {
    console.log("delete row")
    setState("deleting")
    setRemoveModal(true);
    setThird(third)
    setThirdCn(third_subjects_cn)
    setThirdEng(third_subjects_eng)
    setFourth(fourth)
    setFourthCn(fourth_subjects_cn)
    setFourthEng(fourth_subjects_eng)
    setOrig(fourth)
    // console.log(removeModal)
  }
  const Acc = props.accounts
  // console.log(Acc)

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
          {state === "deleting" ? "確定要刪除此會計科目？" : "你正在編輯會計科目"}
        </Modal.Title>
      </Modal.Header>
      {state === "deleting"?
        <Modal.Body>
          三階代碼 : {third} / 三階科目中文名稱 : {thirdCn} / 三階科目英文名稱 : {thirdEng} /<br></br> 四階代碼 : {fourth} / 四階科目中文名稱 : {fourthCn} / 四階科目英文名稱 :{fourthEng}
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
              <Dropdown.Item onClick={() => {editMaterialInventory("三階代碼")}}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> 三階代碼
              </Dropdown.Item>
              <Dropdown.Item onClick={() => {editMaterialInventory("三階科目中文名稱")}}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> 三階科目中文名稱
              </Dropdown.Item>
              <Dropdown.Item onClick={() => {editMaterialInventory("三階科目英文名稱")}}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> 三階科目英文名稱
              </Dropdown.Item>
              <Dropdown.Item onClick={() => {editMaterialInventory("四階代碼")}}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> 四階代碼
              </Dropdown.Item>
              <Dropdown.Item onClick={() => {editMaterialInventory("四階科目中文名稱")}}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> 四階科目中文名稱
              </Dropdown.Item>
              <Dropdown.Item onClick={() => {editMaterialInventory("四階科目英文名稱")}}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> 四階科目英文名稱
              </Dropdown.Item>
              {/* <Dropdown.Item className="text-danger" onClick={console.log("button2")} >
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Option1 onClick={() => console.log("searching")} 
              </Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
          {editing? 
          <Form >
            <InputGroup >
              <InputGroup.Text>
                <FontAwesomeIcon  />
              </InputGroup.Text>
              <Form.Control type="text" onClick ={e => modifyMaterialInventory(e)} onChange={e => console.log(e.target.value)} />
              {/* <FontAwesomeIcon icon={faEdit} className="me-2" />  */}
            </InputGroup>
          </Form>:null}
        </Modal.Body>
      }
      <Modal.Footer>
        {state === "deleting"?<Button variant="outline-secondary" onClick={handleDeleteAccount}>確認</Button> :<Button variant="outline-secondary" onClick={handleEditAccount}>修改</Button>  }
        <Button variant="outline-primary" onClick={() => {setRemoveModal(false)}}>取消</Button>
      </Modal.Footer>
    </Modal>
    )
  };
      
  const TableRow = (props) => {
    // const { invoiceNumber, subscription, price, issueDate,  status } = props;
    const { third, third_subjects_cn, third_subjects_eng, fourth, fourth_subjects_cn, fourth_subjects_eng, } = props;
    // const statusVariant = status === "Paid" ? "success"
    //   : status === "Due" ? "warning"
    //     : status === "Canceled" ? "danger" : "primary";

    return (
      <tr>
        <td>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {third}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">
            {third_subjects_cn}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {third_subjects_eng}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {fourth}
          </span>
        </td>
        <td>
          <span className={`fw-normal`}>
          {fourth_subjects_cn}
          </span>
        </td>
        <td>
          <span className={`fw-normal`}>
            {fourth_subjects_eng}
          </span>
        </td>
        <td>
          <Dropdown className = "btn-group dropleft"id = "dropdown-button-drop-start" as={ButtonGroup}>
            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => {handleRowEdit(third, third_subjects_cn, third_subjects_eng, fourth, fourth_subjects_cn, fourth_subjects_eng)}}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item className="text-danger" onClick={() => {handleRowDelete(third, third_subjects_cn, third_subjects_eng, fourth, fourth_subjects_cn, fourth_subjects_eng)}} >
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td> 
        
      </tr>
    );
  };

  return (
  <div>
    {typeof(Acc)=== 'undefined' ?<div></div>:<Card border="light" className="overflow-auto table-wrapper table-responsive shadow-sm" style ={{width:"115%"}}>
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">三階代碼</th>
              <th className="border-bottom">三階科目中文名稱</th>
              <th className="border-bottom">三階科目英文名稱</th>
              <th className="border-bottom">四階代碼</th>
              <th className="border-bottom">四階科目中文名稱</th>
              <th className="border-bottom">四階科目英文名稱</th>
              <th className="border-bottom">選項</th>
            </tr>
          </thead>
          <tbody>
            {Acc.map(t => <TableRow className = "overflow-auto" key={`transaction-${t.invoiceNumber}`} {...t} />)}

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
    </Card>} 
  </div>
    
  );
};

export const TransactionsTable = () => {
  const totalTransactions = transactions.length;

  const TableRow = (props) => {
    const { invoiceNumber, subscription, price, issueDate,  status } = props;
    const statusVariant = status === "Paid" ? "success"
      : status === "Due" ? "warning"
        : status === "Canceled" ? "danger" : "primary";

    return (
      <tr>
        <td>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {invoiceNumber}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">
            {subscription}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {issueDate}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {parseFloat(price).toFixed(0)}
          </span>
        </td>
        <td>
          <span className={`fw-normal text-${statusVariant}`}>
            {status}
          </span>
        </td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item className="text-danger">
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">編號</th>
              <th className="border-bottom">供應商名稱</th>
              <th className="border-bottom">Issue Date</th>
              <th className="border-bottom">供應商代碼</th>
              <th className="border-bottom">供應商狀態</th>
              <th className="border-bottom">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(t => <TableRow key={`transaction-${t.invoiceNumber}`} {...t} />)}
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
    </Card>
  );
};


export const ValuetargetsTable = () => {
  const totalTransactions = transactions.length;

  const TableRow = (props) => {
    const { invoiceNumber, subscription, price, issueDate, dueDate, status } = props;
    const statusVariant = status === "Paid" ? "success"
      : status === "Due" ? "warning"
        : status === "Canceled" ? "danger" : "primary";

    return (
      <tr>
        <td>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {invoiceNumber}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">
            {subscription}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {issueDate}
          </span>
        </td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item className="text-danger">
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">編號</th>
              <th className="border-bottom">價值標的類型</th>
              <th className="border-bottom">Issue Date</th>
              <th className="border-bottom">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(t => <TableRow key={`transaction-${t.invoiceNumber}`} {...t} />)}
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
    </Card>
  );
};

export const RawMaterialInventoryTable = (props) => {
  const totalTransactions = transactions.length;
  console.log(props);

  const instance = axios.create({baseURL:'http://localhost:5000/api/avm'});
  const [removeModal, setRemoveModal] = useState(false);

  const [id, setId] = useState("")
  const [mid, setMid] = useState("")
  const [mname, setMname] = useState("")
  const [date, setDate] = useState("")
  const [startQ, setStartQ] = useState("")
  const [startU, setStartU] = useState("")
  const [startP, setStartP] = useState("")
  const [startC, setStartC] = useState("")
  const [orig, setOrig] = useState("")
  const [state, setState] = useState("")
  const [index, setIndex] = useState("選擇修改項目")

  
  const [editing, setEditing] = useState(false)
  const Acc = props.rawMaterials;
  console.log(Acc);
  const handleClick = (response) =>{
    alert(response);
    window.location.reload(false)
    
  }

  const editMaterialInventory = (content) =>{
    setEditing(true)
    switch(content) {
      case "編號" :{
        setIndex(content)
        break;
      }
      case "材料代碼" :{
        setIndex(content)
        break;
      }
      case "材料名稱" :{
        setIndex(content)
        break;
      }
      case "日期" :{
        setIndex(content)
        break;
      }
      case "期初數量" :{
        setIndex(content)
        break;
      }
      case "期初單位" :{
        setIndex(content)
        break;
      }
      case "期初單價" :{
        setIndex(content)
        break;
      }
      case "期初成本" :{
        setIndex(content)
        break;
      }
      default:{
        break;
      }
    }
  }
  const modifyMaterialInventory = (event) =>{
    // setEditing(false);
    console.log(event.target.value)
    if(event !== ""){
      switch(index) {
        case "編號" :{
          setId(event.target.value)
          // setPlaceHolder("")
          break;
        }
        case "材料代碼" :{
          setMid(event.target.value)
          // setPlaceHolder("")
          break;
        }
        case "材料名稱" :{
          setMname(event.target.value)
          // setPlaceHolder("")
          break;
        }
        case "日期" :{
          setDate(event.target.value)
          // setPlaceHolder("")
          break;
        }
        case "期初數量" :{
          setStartQ(event.target.value)
          break;
        }
        case "期初單位" :{
          setStartU(event.target.value)
          break;
        }
        case "期初單價" :{
          setStartP(event.target.value)
          break;
        }
        case "期初成本" :{
          setStartC(event.target.value)
          break;
        }
        default:{
          break;
        }
    }
    }

  }
  const handleDeleteInventory = async()=>{
    console.log(mid)
    const jsonData = {
      mid: `${mid}`
    };
    const response = await instance.post('/del_inventory', {
      ID:JSON.stringify(jsonData)
    }
  )
    console.log(response.data)
    setRemoveModal(false)
    handleClick(response.data);

  }

  const handleEditInventory = async()=>{
  //   console.log(fourth)
    const jsonData = {
      orig: `${orig}`,
      id: `${id}`,
      mid: `${mid}`,
      mname: `${mname}`,
      startC: `${startC}`,
      startP: `${startP}`,
      startQ: `${startQ}`,
      startU: `${startU}`,
    };
    const response = await instance.post('/update_inventory', {
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

  const handleRowEdit = (id, m_id, m_name, date, start_quantity,start_unit, start_unit_price, start_cost) => {
    console.log("edit row")
    setState("editing")
    setRemoveModal(true);
    setId(id)
    setMid(m_id)
    setMname(m_name)
    setDate(date)
    setStartC(start_cost)
    setStartP(start_unit_price)
    setStartQ(start_quantity)
    setStartU(start_unit)
    setOrig(id)
  }

  const handleRowDelete = (id, m_id, m_name, date, start_quantity,start_unit, start_unit_price, start_cost) => {
    console.log("delete row")
    setState("deleting")
    setRemoveModal(true);
    setId(id)
    setMid(m_id)
    setMname(m_name)
    setDate(date)
    setStartC(start_cost)
    setStartP(start_unit_price)
    setStartQ(start_quantity)
    setStartU(start_unit)
    setOrig(id)
  }
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
          {state === "deleting" ? "確定要刪除此原料？" : "你正在編輯期初原料"}
        </Modal.Title>
      </Modal.Header>
      {state === "deleting"?
        <Modal.Body>
          {/* 三階代碼 : {third} / 三階科目中文名稱 : {thirdCn} / 三階科目英文名稱 : {thirdEng} /<br></br> 四階代碼 : {fourth} / 四階科目中文名稱 : {fourthCn} / 四階科目英文名稱 :{fourthEng} */}
          編號：{id} / 材料代碼 : {mid} / 材料名稱 : {mname} <br></br> 期初數量 : {startQ} / 期初單位 : {startU} <br></br> 期初單價 : {startP} / 期初成本 : {startC}
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
              <Dropdown.Item onClick={() => {editMaterialInventory("編號")}}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> 編號
              </Dropdown.Item>
              <Dropdown.Item onClick={() => {editMaterialInventory("材料代碼")}}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> 材料代碼
              </Dropdown.Item>
              <Dropdown.Item onClick={() => {editMaterialInventory("材料名稱")}}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> 材料名稱
              </Dropdown.Item>
              <Dropdown.Item onClick={() => {editMaterialInventory("日期")}}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> 日期
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
              <Dropdown.Item onClick={() => {editMaterialInventory("期初成本")}}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> 期初成本
              </Dropdown.Item>
              {/* <Dropdown.Item className="text-danger" onClick={console.log("button2")} >
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Option1 onClick={() => console.log("searching")} 
              </Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
          {editing? 
          <Form >
            <InputGroup >
              <InputGroup.Text>
                <FontAwesomeIcon  />
              </InputGroup.Text>
              <Form.Control type="text" onClick ={e => modifyMaterialInventory(e)} onChange={e => console.log(e.target.value)} />
              {/* <FontAwesomeIcon icon={faEdit} className="me-2" />  */}
            </InputGroup>
          </Form>:null}
        </Modal.Body>
      }
      <Modal.Footer>
        {state === "deleting"?<Button variant="outline-secondary" onClick={handleDeleteInventory}>確認</Button> :<Button variant="outline-secondary" onClick={handleEditInventory}>修改</Button>  }
        <Button variant="outline-primary" onClick={() => {setRemoveModal(false)}}>取消</Button>
      </Modal.Footer>
    </Modal>
    )
  };

  const TableRow = (props) => {
    const {
      id,
      m_id,
      m_name,
      date,
      start_quantity,
      start_unit,
      start_unit_price,
      start_cost,
    } = props;

    return (
      <tr>
        <td>{id}</td>
        <td>{m_id}</td>
        <td>{m_name}</td>
        <td>{date}</td>
        <td>{start_quantity}</td>
        <td>{start_unit}</td>
        <td>{start_unit_price}</td>
        <td>{start_cost}</td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => {handleRowEdit(id, m_id, m_name, date, start_quantity,start_unit, start_unit_price, start_cost)}}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item className="text-danger"onClick={() => {handleRowDelete(id, m_id, m_name, date, start_quantity,start_unit, start_unit_price, start_cost)}}>
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <div>
      {typeof Acc === 'undefined' ? (
        <div></div>
      ) : (
        <Card border="light" className="table-wrapper table-responsive shadow-sm">
          <Card.Body className="pt-0">
            <Table hover className="user-table align-items-center">
              <thead>
                <tr>
                  <th className="border-bottom">編號</th>
                  <th className="border-bottom">材料代碼</th>
                  <th className="border-bottom">材料名稱</th>
                  <th className="border-bottom">日期</th>
                  <th className="border-bottom">期初數量</th>
                  <th className="border-bottom">期初單位</th>
                  <th className="border-bottom">期初單價</th>
                  <th className="border-bottom">期初成本</th>
                  <th className="border-bottom">選項</th>
                </tr>
                
              </thead>
              <tbody>
                {Acc.map((t) => (
                  <TableRow key={`transaction-${t.id}`} {...t} />
                ))}
              </tbody>
            </Table>
            <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-event.target.value-between">
              <Nav>
                <Pagination className="mb-2 mb-lg-0">
                  <Pagination.Prev>Previous</Pagination.Prev>
                  <Pagination.Item active>1</Pagination.Item>
                  <Pagination.Item>2</Pagination.Item>
                  <Pagination.Item>3</Pagination.Item>
                  <Pagination.Item>4</Pagination.Item>
                  <Pagination.Item>5</Pagination.Item>
                  <Pagination.Next>Next</Pagination.Next>
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
      )}
    </div>
  );
};
