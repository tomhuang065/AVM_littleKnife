import React from "react";
import axios from 'axios';
import {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Form, Nav, Card, Button, Table, Dropdown, ProgressBar,  InputGroup, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import RemoveModal from "../pages/examples/SupplierEditForm"
import moment from "moment";
import { useChat } from "../api/context";
import { Routes } from "../routes";


export const SupplierTable = (props) => {
    const instance = axios.create({baseURL:'http://localhost:5000/api/avm'});
    const [removeModal, setRemoveModal] = useState(false);
    const [states, setStates] = useState("")
    const [origs, setOrigs] = useState("")
    const [supplier, setSupplier] = useState({
      status:"",
      supplier_num: "",
      supplier_name:"",
      update_time: "",
      update_user:"",
    })

    const {sup, setSup} = useChat();

    const Acc = props.supplier
    const Search = props.searchInd

    const handleRowEditDelete = (states, supNum, supName, updateUsr, updateTime, status) => {
        setStates(states)
        setRemoveModal(true);
        setSupplier({ supplier_num: supNum, supplier_name:supName, update_time: updateTime, update_user: updateUsr, status:status});
        setOrigs(supNum)
    }
    
    const handleEditSupplier = async(sup)=>{
      console.log("sup", sup)
      const jsonData = {
        orig: `${origs}`,
        status:`${sup}`,
        update_user: `${supplier.update_user}`,
        update_time: `${supplier.update_time}`,
        supplier_num: `${supplier.supplier_num}`,
        supplier_name: `${supplier.supplier_name}`,
        task:"change_state"

      };
      const response = await instance.post('/update_supplier', {
        ID:JSON.stringify(jsonData)
      })
      console.log(response.data)
      alert("已成功修改供應商顯示狀態")
      setRemoveModal(false)

  
    }

    const handleChangeState = (supNum, supName, updateUsr, updateTime, status) =>{
      setOrigs(supNum)
      setSupplier({
        supplier_num: supNum,
        supplier_name:supName,
        update_time: updateTime,
        update_user:updateUsr,
      })
      console.log(status)
      if(status === 1){
        setSup(false)
      }
      else{
        setSup(true)
      }
    }

  useEffect(()=>{
    console.log(sup)
    if(origs !== ''){
      setSupplier({status :sup})
      handleEditSupplier(sup)
    }
    setOrigs("")    
  },[sup])
  
    const TableRow = (props) => {
      const { supplier_num, supplier_name, update_user,  update_time, status } = props;
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
              {status === 1? "開啟":"關閉"}
            </span>
          </td>
          <td>
            <Button variant="outline-primary" onClick={() => {handleChangeState(supplier_num, supplier_name, update_user, update_time, status)}}>變更</Button>
          </td>
          <td>
            <span className="fw-normal">
            {parseFloat(update_user).toFixed(0)}
            </span>
          </td>
          <td>
            <span className="fw-normal">
            {update_time === null?"---":moment(update_time).format('YYYY-MM-DD HH:mm:ss')}
            </span>
          </td>
          <td>
            <Button variant = "link"onClick={() => {handleRowEditDelete("editing", supplier_num, supplier_name, update_user,  update_time, status)}}>
              <FontAwesomeIcon icon={faEdit} className="me-0.5" /> 
            </Button>
            <Button  variant = "link" className="text-danger" onClick={() => {handleRowEditDelete("deleting",  supplier_num, supplier_name, update_user,  update_time, status)}}>
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
                <th className="border-bottom">供應商代碼</th>
                <th className="border-bottom">供應商名稱</th>
                <th className="border-bottom">供應商狀態</th>
                <th className="border-bottom">變更供應商狀態</th>
                <th className="border-bottom">更新人員</th>
                <th className="border-bottom">更新時間</th>
                <th className="border-bottom">  選項</th>
              </tr>
            </thead>
            <tbody>
              {typeof(Acc) === "undefined" ? null : Acc.filter((sup) =>  
                                   sup.supplier_num.includes(Search) ||
                                   sup.supplier_name.includes(Search))
                                .map(t => <TableRow key={`transaction-${t.id}`} {...t} />)}
            </tbody>
          </Table>
        </Card.Body>
        {removeModal?
          <RemoveModal /** 編輯視窗 */
            show={removeModal}
            onHide={() => setRemoveModal(false)}
            states ={states}
            supplier ={supplier}
            origs={origs}

        />:<div></div>}
      </Card>
    );
  };
  