
import React from "react";
import axios from 'axios';
import {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Form, Nav, Card, Button, Table, Dropdown, ProgressBar,  InputGroup, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { useChat } from "../api/context";
import moment from "moment";
import RemoveModal from "../pages/examples/BeginningInventoryEditForm"


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
  const [orig, setOrig] = useState("") 
  const {stat, setStat} = useChat();

  const Acc = props.accounts
  const Search = props.search
  const deleteInd = props.deleteInd

  useEffect(()=>{
    // console.log(stat)
    if(orig !== ''){
      handleEditAccount(stat)
    }
    setOrig("")    
  },[stat])


  const handleChangeState = (orig, status) =>{
    // console.log(orig, status)
    setOrig(orig)
    if(status === 1){
      setStat(false)
    }
    else{
      setStat(true)
    }

  }

  const handleEditAccount = async(stat)=>{
    // console.log("editacc", stat)
    const jsonData = {
      orig: `${orig}`,
      status:`${stat}`,
    };
    const response = await instance.post('/mod_account_subjects', {
      ID:JSON.stringify(jsonData)
    }
    )

    alert(response.data);
    setStat(null)
  }


 
      
  const TableRow = (props) => {
    const { third, third_subjects_cn, third_subjects_eng, fourth, fourth_subjects_cn, fourth_subjects_eng,status} = props;

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
            {status === 1? "開啟":"關閉"}
          </span>
        </td>
        <td>
          <Button variant="outline-primary" onClick={() => {handleChangeState(fourth, status)}}>變更</Button>
        </td> 
        
      </tr>
    );
  };

  return (
  <div>
    {typeof(Acc)=== 'undefined' ?<div></div>:<Card border="light" className="overflow-auto table-wrapper table-responsive shadow-sm" style ={{width:"120%"}}>
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center table-striped">
          <thead>
            <tr>
              <th className="border-bottom">三階代碼</th>
              <th className="border-bottom">三階科目中文名稱</th>
              {/* <th className="border-bottom">三階科目英文名稱</th> */}
              <th className="border-bottom">四階代碼</th>
              <th className="border-bottom">四階科目中文名稱</th>
              {/* <th className="border-bottom">四階科目英文名稱</th> */}
              <th className="border-bottom">顯示狀態</th>
              <th className="border-bottom">編輯顯示狀態</th>
            </tr>
          </thead>
          <tbody>
            {deleteInd?Acc.filter((acc) => (acc.status === 0)&&(acc.third_subjects_cn.includes(Search) ||
                                 acc.third_subjects_cn.includes(Search) ||
                                 acc.fourth_subjects_eng.includes(Search) ||
                                 acc.fourth_subjects_cn.includes(Search) ||
                                 String(acc.third).includes(Search) ||
                                 String(acc.fourth).includes(Search))
                                 ).map(t => <TableRow className = "overflow-auto" key={`transaction-${t.id}`} {...t} />)
                      :Acc.filter((acc) => (acc.status === 1)&& (acc.third_subjects_cn.includes(Search) ||
                                 acc.third_subjects_cn.includes(Search) ||
                                 acc.fourth_subjects_eng.includes(Search) ||
                                 acc.fourth_subjects_cn.includes(Search) ||
                                 String(acc.third).includes(Search) ||
                                 String(acc.fourth).includes(Search))
                      ).map(t => <TableRow className = "overflow-auto" key={`transaction-${t.id}`} {...t} />)}

          </tbody>
        </Table>
      </Card.Body>
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
        <Table hover className="user-table align-items-center table-striped">
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
        {/* <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-event.target.value-between">
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
        </Card.Footer> */}
      </Card.Body>
    </Card>
  );
};







export const BomTable = (props) => {

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
    <Card border="light" className="table-wrapper table-responsive shadow-sm" style ={{width:"120%"}}>
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center table-striped">
          <thead>
            <tr>
              <th className="border-bottom">編號</th>
              <th className="border-bottom">產品名稱</th>
              <th className="border-bottom">二階產品代碼</th>
              <th className="border-bottom">使用量</th>
              <th className="border-bottom">更新人員</th>
              {/* <th className="border-bottom">供應商狀態</th> */}
              <th className="border-bottom">Action</th>
            </tr>
          </thead>
          <tbody>
            {supplier.map(t => <TableRow key={`transaction-${t.id}`} {...t} />)}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-event.target.value-between">
          {/* <Nav>
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
          </Nav> */}
          {/* <small className="fw-bold">
            Showing <b>{totalTransactions}</b> out of <b>25</b> entries
          </small> */}
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};