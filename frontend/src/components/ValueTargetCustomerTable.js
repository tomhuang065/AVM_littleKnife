
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



export const ValuetargetsTable = (props) => {
    const totalTransactions = transactions.length;
    const instance = axios.create({baseURL:'http://localhost:5000/api/avm'});
    const value = props.valueTarget.data
    const type = props.type
    const [orig, setOrig] = useState("")
    const {val, setVal, valType, setValType} = useChat()

    const handleChangeState = (orig, status) =>{
      console.log("change state", status)
      console.log(type)
      setValType(type)
      setOrig(orig)
      if(status === 1){
        setVal(false)
      }
      else{
        setVal(true)
      }
    }

    useEffect(()=>{
      console.log(val)
      if(orig !== ''){
        handleEditValueTarget(val)
      }
      setOrig("")    
    },[val])

    const handleEditValueTarget = async(stat)=>{
      const jsonData = {
        orig: `${orig}`,
        status:`${stat}`,
      };
      const response = await instance.post('/mod_value_target', {
        ID:JSON.stringify(jsonData)
      }
      )
      alert(response.data);
      setVal(null)
    }
    const handleDeleteValueTarget = async(targetNum)=>{
      // console.log(fourth)
      const jsonData = {
        content: `${targetNum}`
      };
      const response = await instance.post('/del_value_target', {
        ID:JSON.stringify(jsonData)
      }
    )
      console.log("get repsonse dta",response.data)
      // setRemoveModal(false)
      alert("已刪除價值標的")
      // handleClick(response.data);
      setValType(type)
  
    }

    const TableRow = (props) => {
      const { id, target_num, target_name, target_status, update_time } = props;
  
      return (
        <tr>
          <td>
            <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
              {id}
            </Card.Link>
          </td>
          <td>
            <span className="fw-normal">
              {target_num}
            </span>
          </td>
          <td>
            <span className="fw-normal">
              {target_name}
            </span>
          </td>
          <td>
            <span className="fw-normal">
              {update_time === null?"---":moment(update_time).format('YYYY-MM-DD HH:mm:ss')}
            </span>
          </td>
          <td>
            <span className="fw-normal">
              {target_status === 1?"開啟":"關閉"}
            </span>
          </td>
          <td>
            <Button variant="outline-primary" onClick={() => {handleChangeState(target_num, target_status)}}>變更</Button>

            {/* <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
                <span className="icon icon-sm">
                  <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => {handleChangeState(target_num, target_status)}}>
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> 變更狀態
                </Dropdown.Item>
                <Dropdown.Item className="text-danger" onClick={() => {handleDeleteValueTarget(target_num)}}>
                  <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> 刪除
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
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
                <th className="border-bottom">{type === "原料"?"原料":type === "產品"?"產品":"顧客"}代碼</th>
                <th className="border-bottom">{type === "原料"?"原料":type === "產品"?"產品":"顧客"}名稱</th>
                <th className="border-bottom">更新時間</th>
                <th className="border-bottom">{type === "原料"?"原料":type === "產品"?"產品":"顧客"}狀態（1:顯示）</th>
                <th className="border-bottom">變更狀態</th>
              </tr>
            </thead>
            <tbody>
              {typeof(value) === "undefined"? null:value.map(t => <TableRow  {...t} />)}
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