
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

import { useChat } from "../api/context";

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
  const [placeHolder, setPlaceHolder] = useState("")
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

  const editAccountSubject = (content) =>{
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

  const modifyAccountSubject = (event) =>{
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
    console.log(removeModal)
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
              <Dropdown.Item onClick={() => {editAccountSubject("三階代碼")}}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> 三階代碼
              </Dropdown.Item>
              <Dropdown.Item onClick={() => {editAccountSubject("三階科目中文名稱")}}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> 三階科目中文名稱
              </Dropdown.Item>
              <Dropdown.Item onClick={() => {editAccountSubject("三階科目英文名稱")}}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> 三階科目英文名稱
              </Dropdown.Item>
              <Dropdown.Item onClick={() => {editAccountSubject("四階代碼")}}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> 四階代碼
              </Dropdown.Item>
              <Dropdown.Item onClick={() => {editAccountSubject("四階科目中文名稱")}}>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> 四階科目中文名稱
              </Dropdown.Item>
              <Dropdown.Item onClick={() => {editAccountSubject("四階科目英文名稱")}}>
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
              <Form.Control type="text" onClick ={e => modifyAccountSubject(e)} onChange={e => console.log(e.target.value)} />
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
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
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
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
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

export const TransactionsTable2 = (props) => {

  const totalTransactions = props.length;
  const {supplier} = props;
  console.log(supplier)

  const TableRow = (props) => {
    const { supplier_num, supplier_name, id, update_user,  update_time } = props;
    //const statusVariant = status === "Paid" ? "success"
    //: status === "Due" ? "warning"
      //: status === "Canceled" ? "danger" : "primary";

    return (
      <tr>
        <td>
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
            {id}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {parseFloat(update_user).toFixed(0)}
          </span>
        </td>
        {/* <td>
          <span className={`fw-normal text-${statusVariant}`}>
            //{status}
          </span>
        </td> */}
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
              {/* <th className="border-bottom">供應商狀態</th> */}
              <th className="border-bottom">Action</th>
            </tr>
          </thead>
          <tbody>
            {supplier.map(t => <TableRow key={`transaction-${t.id}`} {...t} />)}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
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
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
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

  const Acc = props.rawMaterials;
  console.log(Acc);

  const TableRow = (props) => {
    const {
      id,
      p_id,
      p_name,
      date,
      start_quantity,
      start_unit,
      start_unit_price,
      start_cost,
    } = props;

    return (
      <tr>
        <td>{id}</td>
        <td>{p_id}</td>
        <td>{p_name}</td>
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
    <div>
      {typeof Acc === 'undefined' ? (
        <div></div>
      ) : (
        <Card border="light" className="table-wrapper table-responsive shadow-sm">
          <Card.Body className="pt-0">
            <Table hover className="user-table align-items-center">
              <thead>
                <tr>
                  <th className="border-bottom">ID</th>
                  <th className="border-bottom">P_ID</th>
                  <th className="border-bottom">P_Name</th>
                  <th className="border-bottom">Date</th>
                  <th className="border-bottom">Start Quantity</th>
                  <th className="border-bottom">Start Unit</th>
                  <th className="border-bottom">Start Unit Price</th>
                  <th className="border-bottom">Start Cost</th>
                  <th className="border-bottom">Options</th>
                </tr>
              </thead>
              <tbody>
                {Acc.map((t) => (
                  <TableRow key={`transaction-${t.id}`} {...t} />
                ))}
              </tbody>
            </Table>
            <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
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
        </Card>
      )}
    </div>
  );
};
