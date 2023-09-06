
import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faTrashAlt  } from '@fortawesome/free-solid-svg-icons';
import {Card, Button, Table } from '@themesberg/react-bootstrap';
import moment from "moment";
import RemoveModal from "../pages/examples/BeginningInventoryEditForm"

export const RawMaterialInventoryTable = (props) => {
    const [removeModal, setRemoveModal] = useState(false);
    const [origs, setOrigs] = useState("")
    const [states, setStates] = useState("")
    const [inventory, setInventory] = useState({
        id: "",
        mid: "",
        mname:"",
        date: "",
        startC: "",
        startU:"",
        startP: "",
        startQ: "",
      });

    const Acc = props.rawMaterials.data;
    const Search = props.searchInd;
  
    const handleRowEditDelete = (state, id, m_id, m_name, date, start_quantity,start_unit, start_unit_price, start_cost) => {
      setStates(state)
      setRemoveModal(true);
      setInventory({ id: id, mid: m_id, mname:m_name, date: date, startC: start_cost, startU : start_unit, startP: start_unit_price, startQ: start_quantity,});
      setOrigs(id)
    }


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
          {/* <td>{id}</td> */}
          <td>{m_id}</td>
          <td>{m_name}</td>
        
          <td>{start_quantity}</td>
          <td>{start_unit}</td>
          <td>{start_unit_price}</td>
          <td>{start_cost}</td>
          <td>{date === null?"---":moment(date).format('YYYY-MM-DD')}</td>
          <td>
            <Button variant = "link"onClick={() => {handleRowEditDelete("editing", id, m_id, m_name, date, start_quantity,start_unit, start_unit_price, start_cost)}}>
              <FontAwesomeIcon icon={faEdit} className="me-0.5" /> 
            </Button>
            <Button  variant = "link" className="text-danger" onClick={() => {handleRowEditDelete("deleting", id, m_id, m_name, date, start_quantity,start_unit, start_unit_price, start_cost)}}>
              <FontAwesomeIcon icon={faTrashAlt} className="me-0.5" /> 
            </Button>
          </td>
        </tr>
      );
    };
  
    return (
      <div>
        {typeof Acc === 'undefined' ? (
          <div></div>
        ) : (
          <Card border="light" className="table-wrapper table-responsive shadow-sm"style ={{width:"120%"}}>
            <Card.Body className="pt-0">
              <Table hover className="user-table align-items-center table-striped">
                <thead>
                  <tr>
                    {/* <th className="border-bottom">編號</th> */}
                    <th className="border-bottom">原物料代碼</th>
                    <th className="border-bottom">原物料名稱</th>
                   
                    <th className="border-bottom">期初數量</th>
                    <th className="border-bottom">期初單位</th>
                    <th className="border-bottom">期初單價</th>
                    <th className="border-bottom">期初成本</th>
                    <th className="border-bottom">建立日期</th>
                    <th className="border-bottom">  選項</th>
                  </tr>
                </thead>
                <tbody>
                  {Acc.filter((acc) => acc.m_id.includes(Search) ||
                                   acc.m_name.includes(Search) 
                                  //  acc.start_unit.includes(Search) ||
                                  //  acc.date.includes(Search) ||
                                  //  String(acc.start_cost).includes(Search) ||
                                  //  String(acc.start_quantity).includes(Search) ||
                                  //  String(acc.start_unit_price).includes(Search) ||
                                  //  String(acc.id).includes(Search)
                        ).map((t) => (
                    <TableRow key={`transaction-${t.id}`} {...t} />
                  ))}
                </tbody>
              </Table>
            </Card.Body>
            {removeModal?
                <RemoveModal /** 編輯視窗 */
                show={removeModal}
                onHide={() => setRemoveModal(false)}
                states={states}
                inventory={inventory}
                origs={origs}
                 />
            :
            <div></div>}
          </Card>
        )}
      </div>
    );
  };