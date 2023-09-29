
import React from "react";
import axios from 'axios';
import {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Form, Nav, Card, Button, Table, Dropdown, ProgressBar,  InputGroup, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import RemoveModal from "../pages/examples/TransactionEditFormModal"
import moment from "moment";
import { useChat } from "../api/context";


export const TransactionTable = (props) => {
    const instance = axios.create({baseURL:'http://localhost:5000/api/avm'});
    const [orig, setOrig] = useState("")
    const {val, setVal, valType, setValType} = useChat()
    const [states, setStates] = useState("");
    const [removeModal, setRemoveModal] = useState(false)
    const [trans, setTrans] = useState({
      account_subjects_num:"",
      purchase_id:"", 
      purchase_name:"",
      purchase_quantity:"",
      purchase_unit:"", 
      purchase_price:"", 
      supplier_num :"",
      remark:"",
      create_user:"",
      // id:props.transaction.id,
  
    })
    
    const transaction = props.transaction
    const deleteInd = props.deleteInd
    const serachInd = props.searchInd

    const handleRowEditDelete = (stat, id, account_subjects_num, purchase_id, purchase_name, purchase_quantity, purchase_unit, purchase_price, supplier_num, remark,create_user) => {
      console.log(transaction)
      setRemoveModal(true);
      setTrans({  
        account_subjects_num: account_subjects_num,
        purchase_id:purchase_id, 
        purchase_name:purchase_name,
        purchase_quantity:purchase_quantity,
        purchase_unit:purchase_unit, 
        purchase_price:purchase_price, 
        supplier_num :supplier_num,
        remark:remark,
        create_user:create_user,
        
      });
      setOrig(id)
      setStates(stat)
    }
  
    const TableRow = (props) => {
      const { id, date, account_subjects_num, purchase_id, purchase_name, purchase_quantity, purchase_unit, purchase_price, supplier_num, remark,create_user} = props;
      return (
        <tr>
          <td>
            <span className="fw-normal">
              {account_subjects_num}
            </span>
          </td>
          <td>
            <span className="fw-normal">
              {purchase_id}
            </span>
          </td>
          <td>
            <span className="fw-normal">
              {purchase_name}
            </span>
          </td>
          <td>
            <span className="fw-normal">
              {purchase_quantity}
            </span>
          </td>
          <td>
            <span className="fw-normal">
              {purchase_price}
            </span>
          </td>
          <td>
            <span className="fw-normal">
              {purchase_unit=== null||purchase_unit=== ""?"---":purchase_unit}
            </span>
          </td>
          <td>
            <span className="fw-normal">
              {supplier_num=== "" ||supplier_num=== null ?"---":supplier_num}
            </span>
          </td>
          <td>
            <span className="fw-normal">
                {remark=== ""||remark === null ?"---":remark}
            </span>
          </td>
          <td>
            <span className="fw-normal">
              {create_user}
            </span>
          </td>
          <td>
            <span className="fw-normal">
              {date === null?"---":moment(date).format('YYYY-MM-DD')}
            </span>
          </td>
         
         
          <td>
            {/* <Button variant = "link"onClick={() => {handleRowEditDelete("editing",id,  account_subjects_num, purchase_id, purchase_name, purchase_quantity, purchase_unit, purchase_price, supplier_num, remark,create_user)}}>
              <FontAwesomeIcon icon={faEdit} className="me-0.5" /> 
            </Button> */}
            <Button  variant = "link" className="text-danger" onClick={() => {handleRowEditDelete("deleting",id,  account_subjects_num, purchase_id, purchase_name, purchase_quantity, purchase_unit, purchase_price, supplier_num, remark,create_user)}}>
              <FontAwesomeIcon icon={faTrashAlt} className="me-0.5" /> 
            </Button>
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
                {/* <th className="border-bottom">編號</th> */}
                <th className="border-bottom">四階代碼</th>
                <th className="border-bottom">價值標的代碼</th>
                <th className="border-bottom">價值標的名稱</th>
                <th className="border-bottom">數量</th>
                <th className="border-bottom">單價</th>
                <th className="border-bottom">單位</th>
                <th className="border-bottom">供應商代碼</th>
                <th className="border-bottom">備註</th>
                <th className="border-bottom">新增人員</th>
                <th className="border-bottom">新增時間</th>
                <th className="border-bottom">
                  選項
                </th>
              </tr>
            </thead>
            <tbody>
              {typeof(transaction) === "undefined"? null:deleteInd?transaction.filter(trans => trans.id === 0).map(t => <TableRow  {...t} />):transaction.filter(t => t.id !== 0).map(t => <TableRow  {...t} />)}
            </tbody>
          </Table>
        </Card.Body>
        {removeModal?
          <RemoveModal 
            show={removeModal}
            onHide={() => setRemoveModal(false)}
            states ={states}
            transaction ={transaction}
            orig={orig}
        />:<div></div>}
      </Card>
    );
  };

  // acc.start_unit.includes(Search) || 
//   .filter((acc) => 
//                                    acc.target_num.includes(Search) ||
//                                    acc.target_name.includes(Search))
  // acc.date.includes(Search) ||
  // String(acc.start_cost).includes(Search) ||
  // String(acc.start_quantity).includes(Search) ||
  // String(acc.start_unit_price).includes(Search) ||
  // String(acc.id).includes(Search))