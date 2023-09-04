
import React from "react";
import axios from 'axios';
import {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Form, Nav, Card, Button, Table, Dropdown, ProgressBar,  InputGroup, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import RemoveModal from "../pages/examples/ValueTargetEditModal"
import moment from "moment";
import { useChat } from "../api/context";


import { Routes } from "../routes";
import transactions from "../data/transactions";



export const ValuetargetsTable = (props) => {
    const instance = axios.create({baseURL:'http://localhost:5000/api/avm'});
    const [orig, setOrig] = useState("")
    const {val, setVal, valType, setValType} = useChat()
    const value = props.valueTarget.data
    const type = props.type
    const Search = props.search

    const handleChangeState = (orig, status) =>{
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
          {/* <td>
            <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
              {id}
            </Card.Link>
          </td> */}
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
              {target_status === 1?"開啟":"關閉"}
            </span>
          </td>
          <td>
            <Button variant="outline-primary" onClick={() => {handleChangeState(target_num, target_status)}}>變更</Button>
          </td>
          <td>
            <span className="fw-normal">
              {update_time === null?"---":moment(update_time).format('YYYY-MM-DD HH:mm:ss')}
            </span>
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
                <th className="border-bottom">{type === "原料"?"原料":type === "產品"?"產品":"顧客"}代碼</th>
                <th className="border-bottom">{type === "原料"?"原料":type === "產品"?"產品":"顧客"}名稱</th>
                <th className="border-bottom">{type === "原料"?"原料":type === "產品"?"產品":"顧客"}狀態</th>
                <th className="border-bottom">變更{type === "原料"?"原料":type === "產品"?"產品":"顧客"}狀態</th>
                <th className="border-bottom">更新時間</th>
              </tr>
            </thead>
            <tbody>
              {typeof(value) === "undefined"? null:value.filter((acc) => 
                                   acc.target_num.includes(Search) ||
                                   acc.target_name.includes(Search))
                                  .map(t => <TableRow  {...t} />)}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  };

  // acc.start_unit.includes(Search) ||
  // acc.date.includes(Search) ||
  // String(acc.start_cost).includes(Search) ||
  // String(acc.start_quantity).includes(Search) ||
  // String(acc.start_unit_price).includes(Search) ||
  // String(acc.id).includes(Search))